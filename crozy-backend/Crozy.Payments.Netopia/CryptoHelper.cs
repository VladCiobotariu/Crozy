using Crozy.Payments.Netopia;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;

public class CryptoHelper
{
    public static EncryptedPaymentData EncryptWithCertThumbprint(string data, string certThumbprint)
    {
        // Load the certificate
        bool validOnly = false;

        using X509Store certStore = new X509Store(StoreName.My, StoreLocation.CurrentUser);
        certStore.Open(OpenFlags.ReadOnly);
        X509Certificate2Collection certCollection = certStore.Certificates.Find(
                              X509FindType.FindByThumbprint,
                              // Replace below with your certificate's thumbprint
                              certThumbprint,
                              validOnly);
        // Get the first cert with the thumbprint
        X509Certificate2? certificate = certCollection.OfType<X509Certificate2>().FirstOrDefault();
        if(certificate is null)
        {
            throw new InvalidOperationException($"Could not extract public key because certificate with thumbprint {certThumbprint} was not found");
        }

        RSA? rsaPublicKey = certificate.GetRSAPublicKey();

        return Encrypt(data, certificate);
    }

    public static EncryptedPaymentData Encrypt(string data, X509Certificate2 certificate)
    {
        RSA? rsaPublicKey = certificate.GetRSAPublicKey();

        if (rsaPublicKey is null)
        {
            throw new InvalidOperationException("Certificate does not have public key");
        }

        return Encrypt(data, rsaPublicKey);
    }

    public static EncryptedPaymentData EncryptWithPublicKeyString(string data, string publicKeyCertificate)
    {
        byte[] bytes = Encoding.ASCII.GetBytes(publicKeyCertificate);
        var certificate = new X509Certificate2(bytes);

        return Encrypt(data, certificate);
    }
    public static EncryptedPaymentData Encrypt(string data, RSA rsaPublicKey)
    {
        // Generate symmetric key and IV using AES
        using var aes = Aes.Create();
        aes.Mode = CipherMode.CBC;
        aes.KeySize = 256;
        aes.BlockSize = 128;
        aes.GenerateKey();
        aes.GenerateIV();

        // Encrypt data
        var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
        byte[] plainDataBytes = Encoding.UTF8.GetBytes(data);
        byte[] encryptedData = encryptor.TransformFinalBlock(plainDataBytes, 0, plainDataBytes.Length);

        // Encrypt the key with RSA using the public key from the certificate
        var encryptedKey = rsaPublicKey.Encrypt(aes.Key, RSAEncryptionPadding.Pkcs1);

        return new EncryptedPaymentData(
            Convert.ToBase64String(aes.IV),
            Convert.ToBase64String(encryptedKey),
            Convert.ToBase64String(encryptedData)
        );
    }

    public static string Decrypt(string privateKey, string iv, string envKey, string encryptedData)
    {
        // Decrypt the symmetric key using RSA
        var rsa = RSA.Create();
        rsa.ImportFromPem(privateKey);
        byte[] decryptedKey = rsa.Decrypt(Convert.FromBase64String(envKey), RSAEncryptionPadding.Pkcs1);

        // Decrypt the data
        using var aes = Aes.Create();
        aes.KeySize = 256;
        aes.BlockSize = 128;
        aes.Key = decryptedKey;
        aes.IV = Convert.FromBase64String(iv);
        var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
        byte[] decryptedData = decryptor.TransformFinalBlock(Convert.FromBase64String(encryptedData), 0, Convert.FromBase64String(encryptedData).Length);

        return Encoding.UTF8.GetString(decryptedData);
    }

    public static RSA GetPrivateKey(string filePath, string password = null)
    {
        using (var cert = new X509Certificate2(filePath, password))
        {
            return cert.GetRSAPrivateKey();
        }
    }

    public static RSA GetRSAPublicKey(string filePath)
    {
        // This is used for certs
        using (var cert = new X509Certificate2(filePath))
        {
            return cert.GetRSAPublicKey();
        }
    }
}

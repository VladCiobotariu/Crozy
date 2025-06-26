using System;
using System.Security.Cryptography;
using System.Text;

public class CryptoHelper
{
    public static (string iv, string envKey, string envData, string cipher) Encrypt(string publicKey, string data, string algorithm)
    {
        // Generate symmetric key and IV
        using var aes = Aes.Create();
        aes.KeySize = 256;
        aes.BlockSize = 128;
        aes.GenerateKey();
        aes.GenerateIV();

        // Encrypt data
        var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
        byte[] encryptedData = encryptor.TransformFinalBlock(Encoding.UTF8.GetBytes(data), 0, Encoding.UTF8.GetBytes(data).Length);

        // Encrypt the key with RSA using the public key
        var rsa = RSA.Create();
        rsa.ImportFromPem(publicKey);
        var encryptedKey = rsa.Encrypt(aes.Key, RSAEncryptionPadding.Pkcs1);

        return (
            Convert.ToBase64String(aes.IV),
            Convert.ToBase64String(encryptedKey),
            Convert.ToBase64String(encryptedData),
            algorithm
        );
    }

    public static string Decrypt(string privateKey, string iv, string envKey, string encryptedData, string algorithm)
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
}

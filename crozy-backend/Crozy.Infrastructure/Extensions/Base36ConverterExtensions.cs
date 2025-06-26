using System.Numerics;

namespace Crozy.Infrastructure.Extensions;

public static class Base36ConverterExtensions
{
    private const string Digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    public static long Decode(this Guid guid)
    {
        string value = guid.ToString();
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Empty value.");
        value = value.ToUpper();
        bool negative = false;
        if (value[0] == '-')
        {
            negative = true;
            value = value.Substring(1, value.Length - 1);
        }
        if (value.Any(c => !Digits.Contains(c)))
            throw new ArgumentException("Invalid value: \"" + value + "\".");
        var decoded = 0L;
        for (var i = 0; i < value.Length; ++i)
            decoded += Digits.IndexOf(value[i]) * (long)BigInteger.Pow(Digits.Length, value.Length - i - 1);
        return negative ? decoded * -1 : decoded;
    }

    public static string Encode(this Guid guid)
    {
        var bytes = guid.ToByteArray();
        long value = BitConverter.ToInt64(bytes, 0);
        
        if (value == long.MinValue)
        {
            //hard coded value due to error when getting absolute value below: "Negating the minimum value of a twos complement number is invalid.".
            return "-1Y2P0IJ32E8E8";
        }
        bool negative = value < 0;
        value = Math.Abs(value);
        string encoded = string.Empty;
        do
            encoded = Digits[(int)(value % Digits.Length)] + encoded;
        while ((value /= Digits.Length) != 0);
        return negative ? "-" + encoded : encoded;
    }
}
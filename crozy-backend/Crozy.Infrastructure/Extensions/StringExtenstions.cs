namespace Crozy.Infrastructure.Extensions;

public static class StringExtensions
{
    public static string FirstCharacterToLower(this string str)
    {
        if (String.IsNullOrEmpty(str) || Char.IsLower(str, 0))
        {
            return str;
        }

        return Char.ToLowerInvariant(str[0]) + str.Substring(1);
    }
    
    public static string TrimEndWithSubstring(this string inputText, string value, StringComparison comparisonType = StringComparison.CurrentCultureIgnoreCase)
    {
        if (!string.IsNullOrEmpty(value))
        {
            while (!string.IsNullOrEmpty(inputText) && inputText.EndsWith(value, comparisonType))
            {
                inputText = inputText.Substring(0, (inputText.Length - value.Length));
            }
        }

        return inputText;
    }
}
namespace Crozy.Payments.Netopia.Payments.Replays
{
    public class Crc
    {
        public const int CONFIRM_ERROR_TYPE_NONE = 0;
        public const int CONFIRM_ERROR_TYPE_TEMPORARY = 1;
        public const int CONFIRM_ERROR_TYPE_PERMANENT = 2;

        public const int ERROR_CONFIRM_LOAD_PRIVATE_KEY = 0x300000f0;
        public const int ERROR_CONFIRM_FAILED_DECODING_DATA = 0x300000f1;
        public const int ERROR_CONFIRM_FAILED_DECODING_ENVELOPE_KEY = 0x300000f2;
        public const int ERROR_CONFIRM_FAILED_DECRYPT_DATA = 0x300000f3;
        public const int ERROR_CONFIRM_INVALID_POST_METHOD = 0x300000f4;
        public const int ERROR_CONFIRM_INVALID_POST_PARAMETERS = 0x300000f5;
        public const int ERROR_CONFIRM_INVALID_ACTION = 0x300000f6;

        private Crc(int errorCode, int errorType, string message)
        {
            ErrorCode = errorCode;
            ErrorType = errorType;
            Message = message;
        }

        public int ErrorCode { get; private set; }

        public int ErrorType { get; private set; }

        public string Message { get; private set; }

        private Crc(string message)
        {
            Message = message;
            ErrorCode = 0;
            ErrorType = CONFIRM_ERROR_TYPE_NONE;
        }

        public static Crc Success(string message) => new Crc(message);

        public static Crc Error(int errorCode, string errorMessage, int errorType) => new Crc(errorCode, errorType, errorMessage);

        public static Crc InvalidPostMethodError() => new Crc(ERROR_CONFIRM_INVALID_POST_METHOD, CONFIRM_ERROR_TYPE_PERMANENT, "invalid request method for payment confirmation");

        public static Crc InvalidPostParametersError() => new Crc(ERROR_CONFIRM_INVALID_POST_PARAMETERS, CONFIRM_ERROR_TYPE_PERMANENT, "mobilpay.ro posted invalid parameters");
    }
}

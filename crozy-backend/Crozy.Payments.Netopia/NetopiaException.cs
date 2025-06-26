namespace Crozy.Payments.Netopia
{
    [Serializable]
    public class NetopiaException : Exception
    {
        public NetopiaException()
        {
        }

        public NetopiaException(string message, int errorCode)
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public NetopiaException(string message, int errorCode, Exception inner)
            : base(message, inner)
        {
            ErrorCode = errorCode;
        }

        public int ErrorCode { get; private set; }
    }
}

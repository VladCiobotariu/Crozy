namespace Crozy.Infrastructure.PostgreSQL.AppEnvironments
{
    public class AppEnvironment
    {
        private AppEnvironment(string name)
        {
            Name = name;
        }

        public string Name { get; }

        public static AppEnvironment Local = new AppEnvironment("local");
        public static AppEnvironment Local1 = new AppEnvironment("local1");
        public static AppEnvironment Local2 = new AppEnvironment("local2");
        public static AppEnvironment Local3 = new AppEnvironment("local3");
        public static AppEnvironment DEV = new AppEnvironment("dev");
        public static AppEnvironment DEV1 = new AppEnvironment("dev1");
        public static AppEnvironment DEV2 = new AppEnvironment("dev2");
        public static AppEnvironment DEV3 = new AppEnvironment("dev3");
        public static AppEnvironment SIT = new AppEnvironment("sit");
        public static AppEnvironment UAT = new AppEnvironment("uat");
        public static AppEnvironment Demo = new AppEnvironment("demo");
        public static AppEnvironment PROD = new AppEnvironment("prod");
        public static AppEnvironment STAGE = new AppEnvironment("stg");
        public static AppEnvironment PR = new AppEnvironment("pr");

        public static AppEnvironment From(string name) =>
            name switch
            {
                "local" => Local,
                "local1" => Local1,
                "local2" => Local2,
                "local3" => Local3,
                "dev" => DEV,
                "dev1" => DEV1,
                "dev2" => DEV2,
                "dev3" => DEV3,
                "sit" => SIT,
                "uat" => UAT,
                "demo" => Demo,
                "prod" => PROD,
                "stg" => STAGE,
                "pr" => PR,
                _ => throw new InvalidCastException($"{name} environment name is unknow environment")
            };

    }
}

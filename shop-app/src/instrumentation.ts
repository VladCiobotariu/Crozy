import { AzureMonitorOpenTelemetryOptions } from "@azure/monitor-opentelemetry";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { 
      useAzureMonitor: azureMonitor,
    } = await import("@azure/monitor-opentelemetry");

    const options: AzureMonitorOpenTelemetryOptions = {
      instrumentationOptions: {
          bunyan: { enabled: true },
      },
    };
    azureMonitor(options);
  }
}

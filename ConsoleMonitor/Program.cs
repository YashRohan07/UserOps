using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using Serilog;
using Serilog.Formatting.Compact;

class Program
{
    static void Main()
    {
        Directory.CreateDirectory("Logs");

        // Configure Serilog
        Log.Logger = new LoggerConfiguration()
            .WriteTo.Console()
            .WriteTo.File(new CompactJsonFormatter(), "Logs/log.json", rollingInterval: RollingInterval.Day)
            .CreateLogger();

        Log.Information("ConsoleMonitor started successfully.");

        // Performance counters for CPU and available memory
        var cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
        var memoryCounter = new PerformanceCounter("Memory", "Available MBytes");

        while (true)
        {
            float cpuUsage = cpuCounter.NextValue();
            float availableMemory = memoryCounter.NextValue();
            var timestamp = DateTime.UtcNow;

            Log.Information("System Metrics: {@Timestamp} | CPU={CPU}% | AvailableMemory={Memory}MB",
                            timestamp, Math.Round(cpuUsage, 2), availableMemory);

            Thread.Sleep(10000); // Wait 10 seconds
        }
    }
}

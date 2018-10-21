export type LogEventHandler = (message: string, args: any[]) => void;

export interface ILogger {
  addEventListener: (event: "log", handler: LogEventHandler) => void;
  removeEventListener: (event: "log", handler: LogEventHandler) => void;
}

export class Logger implements ILogger {
  private handlers: LogEventHandler[] = [];
  public removeEventListener(event: "log", handler: LogEventHandler): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }
  public addEventListener(event: "log", handler: LogEventHandler): void {
    this.handlers.push(handler);
  }

  public log(
    message: string,
    level: "Error" | "Warning" | "Info" | "Debug" | "Trace",
    category: string,
    args: any[]
  ): void {
    if (this.handlers.length === 0) {
      return;
    }

    for (const handler of this.handlers) {
      handler(message, args);
    }
  }
}

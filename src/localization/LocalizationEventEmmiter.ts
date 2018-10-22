import {
  ILocalizationEvent,
  LocalizationEventHandler
} from "./ILocalizationEvent";

export class LocalizationEventEmmiter {
  private missHandlers: LocalizationEventHandler[] = [];
  private hitHandlers: LocalizationEventHandler[] = [];

  public addListener(
    event: "miss" | "hit",
    handler: LocalizationEventHandler
  ): () => void;
  public addListener(event: string, handler: any): () => void {
    switch (event) {
      case "miss":
        this.missHandlers.push(handler);
        return () =>
          (this.missHandlers = this.missHandlers.filter(h => h !== handler));
      case "hit":
        this.hitHandlers.push(handler);
        return () =>
          (this.hitHandlers = this.hitHandlers.filter(h => h !== handler));
      default:
        throw Error(`${event} is not a valid LocalizationAuditor event.`);
    }
  }

  public emit(event: "miss" | "hit", args: ILocalizationEvent): void;
  public emit(event: string, args: any): void {
    switch (event) {
      case "miss":
        for (const handler of this.missHandlers) {
          handler(args);
        }
        break;
      case "hit":
        for (const handler of this.hitHandlers) {
          handler(args);
        }
      default:
        throw Error(`${event} is not a valid LocalizationAuditor event.`);
    }
  }
}

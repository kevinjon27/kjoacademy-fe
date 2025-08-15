import { formats } from "@/i18n/request";
import messages from "./src/messages/en";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

declare module "video.js" {
  export type VideoJsPlayer = {
    dispose: () => void;
    isDisposed: () => boolean;
    src: (sources: { src: string; type: string }[]) => void;
  };
}

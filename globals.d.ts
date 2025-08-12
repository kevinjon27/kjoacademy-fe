import { formats } from "@/i18n/request";
import messages from "./src/messages/en";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

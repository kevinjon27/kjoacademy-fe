import Link from "next/link";
import { getTranslations } from 'next-intl/server'
import { InstagramIcon, TwitterIcon, YouTubeIcon } from "./icons";

export async function Footer() {
  const t = await getTranslations('Footer')

  return (
    <footer className="bg-card border-t">
      <div className="min-h-[480px] lg:h-[480px] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 h-full">
            {/* Left Section - Message */}
            <div className="flex flex-col justify-center lg:justify-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  {t('title')}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('description')}
                </p>
              </div>

              {/* Contact/Support Info */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t('contact.email')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('contact.chat')}
                </p>
              </div>
            </div>

            {/* Right Section - Policy Links */}
            <div className="flex flex-col justify-center lg:justify-center space-y-6">
              <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-24">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    {t('policies.title')}
                  </h4>
                  <div className="space-y-3">
                    <Link
                      href="/terms-and-conditions"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('policies.terms')}
                    </Link>
                    <Link
                      href="/refund-policy"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('policies.refund')}
                    </Link>
                  </div>
                </div>

                {/* Additional Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    {t('additional.title')}
                  </h4>
                  <div className="space-y-3">
                    <Link
                      href="/privacy-policy"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('additional.privacy')}
                    </Link>
                    <Link
                      href="/about"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('additional.about')}
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('additional.contact')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  {t('social.title')}
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <TwitterIcon className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border w-full my-8 lg:my-12"></div>

          {/* Bottom Section - Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

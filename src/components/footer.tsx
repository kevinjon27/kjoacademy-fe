import Link from "next/link";
import { InstagramIcon, TwitterIcon, YouTubeIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="min-h-[480px] lg:h-[480px] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 h-full">
            {/* Left Section - Message */}
            <div className="flex flex-col justify-center lg:justify-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Punya pertanyaan sebelum gabung?
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ingin tahu lebih lanjut tentang komunitas, program, atau akses
                  premium? Kita siap bantu kamu mulai perjalanan tradingmu
                  dengan tepat.
                </p>
              </div>

              {/* Contact/Support Info */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Hubungi kami di: support@kjoacademy.com
                </p>
                <p className="text-sm text-muted-foreground">
                  Atau chat langsung dengan tim kami
                </p>
              </div>
            </div>

            {/* Right Section - Policy Links */}
            <div className="flex flex-col justify-center lg:justify-center space-y-6">
              <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-24">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    Kebijakan & Ketentuan
                  </h4>
                  <div className="space-y-3">
                    <Link
                      href="/terms-and-conditions"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Terms and Conditions
                    </Link>
                    <Link
                      href="/refund-policy"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Refund and Return Policy
                    </Link>
                  </div>
                </div>

                {/* Additional Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    Informasi Lainnya
                  </h4>
                  <div className="space-y-3">
                    <Link
                      href="/privacy-policy"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/about"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Tentang Kami
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Kontak
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Ikuti Kami
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
              © 2024 KJO Academy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

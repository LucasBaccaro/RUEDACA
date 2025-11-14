"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Palette, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/ruedacamila/", label: "LinkedIn" },
  { icon: Palette, href: "https://www.behance.net/ruedaca", label: "Behance" },
  { icon: Mail, href: "mailto:ruedaca97@gmail.com", label: "Email" },
];

const quickLinks = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "contact", href: "#contact" },
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[hsl(var(--foreground))] text-white py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[hsl(var(--primary)_/_0.1)] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <motion.h3
              className="text-2xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="gradient-text">Camila Rueda</span>
            </motion.h3>
            <p className="text-gray-400 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.connect")}</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[hsl(var(--primary))] flex items-center justify-center transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Camila Rueda. {t("footer.madeWith")}{" "}
            <Heart className="w-4 h-4 text-red-500 fill-current" /> {t("footer.and")} {t("footer.code")}.
          </p>
          <p className="text-gray-400 text-sm">
            {t("footer.designedBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}

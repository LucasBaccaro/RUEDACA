"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Code2, Palette, Sparkles, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const features = [
  {
    icon: Palette,
    titleKey: "about.feature1Title",
    descKey: "about.feature1Desc",
  },
  {
    icon: Code2,
    titleKey: "about.feature2Title",
    descKey: "about.feature2Desc",
  },
  {
    icon: Sparkles,
    titleKey: "about.feature3Title",
    descKey: "about.feature3Desc",
  },
  {
    icon: Users,
    titleKey: "about.feature4Title",
    descKey: "about.feature4Desc",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 md:py-20 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[hsl(var(--soft-bg))] to-transparent opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--foreground))] mb-6">
              {t("about.title")}{" "}
              <span className="gradient-text">{t("about.titleHighlight")}</span>
            </h2>
            <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
              {t("about.description")}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.titleKey} variants={itemVariants}>
                <Card
                  variant="elevated"
                  className="h-full group hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="p-8">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n-context";
import { Palette, Users, Lightbulb, Handshake, Code2 } from "lucide-react";

// Skills data organized by category
const skillCategories = [
  {
    id: 1,
    titleKey: "skills.category1",
    icon: Users,
    skills: [
      { nameKey: "skills.skill1_1" },
      { nameKey: "skills.skill1_2" },
      { nameKey: "skills.skill1_3" },
      { nameKey: "skills.skill1_4" },
      { nameKey: "skills.skill1_5" },
    ],
    color: "hsl(var(--primary))",
  },
  {
    id: 2,
    titleKey: "skills.category2",
    icon: Palette,
    skills: [
      { nameKey: "skills.skill2_1" },
      { nameKey: "skills.skill2_2" },
      { nameKey: "skills.skill2_3" },
      { nameKey: "skills.skill2_4" },
      { nameKey: "skills.skill2_5" },
    ],
    color: "hsl(var(--secondary))",
  },
  {
    id: 3,
    titleKey: "skills.category3",
    icon: Lightbulb,
    skills: [
      { nameKey: "skills.skill3_1" },
      { nameKey: "skills.skill3_2" },
      { nameKey: "skills.skill3_3" },
      { nameKey: "skills.skill3_4" },
      { nameKey: "skills.skill3_5" },
    ],
    color: "hsl(var(--accent))",
  },
  {
    id: 4,
    titleKey: "skills.category4",
    icon: Handshake,
    skills: [
      { nameKey: "skills.skill4_1" },
      { nameKey: "skills.skill4_2" },
      { nameKey: "skills.skill4_3" },
      { nameKey: "skills.skill4_4" },
      { nameKey: "skills.skill4_5" },
    ],
    color: "hsl(var(--primary))",
  },
  {
    id: 5,
    titleKey: "skills.category5",
    icon: Code2,
    skills: [
      { nameKey: "skills.skill5_1" },
      { nameKey: "skills.skill5_2" },
      { nameKey: "skills.skill5_3" },
      { nameKey: "skills.skill5_4" },
      { nameKey: "skills.skill5_5" },
    ],
    color: "hsl(var(--secondary))",
  },
];

function SkillBadge({ skill, color }: { skill: { nameKey: string }; color: string }) {
  const { t } = useI18n();

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-3 py-2 rounded-lg border-2 font-medium text-xs md:text-sm transition-all cursor-default"
      style={{
        borderColor: color,
        backgroundColor: `${color}10`,
        color: "hsl(var(--foreground))"
      }}
    >
      {t(skill.nameKey)}
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = skillCategories[activeCategory];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 md:py-20 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-[hsl(var(--accent)_/_0.08)] rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--foreground))] mb-6">
            {t("skills.title")} <span className="gradient-text">{t("skills.titleHighlight")}</span>
          </h2>
          <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
            {t("skills.description")}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === index;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(index)}
                  className="group relative px-4 py-3 md:px-6 md:py-4 rounded-2xl font-semibold text-sm md:text-base transition-all"
                  style={{
                    backgroundColor: isActive ? category.color : 'transparent',
                    border: `2px solid ${category.color}`,
                    color: isActive ? 'white' : 'hsl(var(--foreground))',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">{t(category.titleKey)}</span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Active Category Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <div className="p-6 md:p-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      className="w-16 h-16 min-w-[64px] rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: currentCategory.color }}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <currentCategory.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))]">
                      {t(currentCategory.titleKey)}
                    </h3>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentCategory.skills.map((skill) => (
                      <SkillBadge
                        key={skill.nameKey}
                        skill={skill}
                        color={currentCategory.color}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {t("skills.footer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

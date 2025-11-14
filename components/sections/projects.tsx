"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";

// Project data - Reordenado: Pausa Activa, Airbnb, Te-Visito, Legere
const projects = [
  {
    id: 1,
    titleKey: "projects.project1Title",
    descKey: "projects.project1Desc",
    tagsKey: "projects.project1Tags",
    image: "/projects/pausa-activa.jpeg",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]",
    behanceUrl: "https://www.behance.net/gallery/237381133/Pausa-Activa",
  },
  {
    id: 2,
    titleKey: "projects.project2Title",
    descKey: "projects.project2Desc",
    tagsKey: "projects.project2Tags",
    image: "/projects/airbnb.jpeg",
    gradient: "from-[hsl(var(--secondary))] to-[hsl(var(--accent))]",
    behanceUrl: "https://www.behance.net/gallery/235867707/Clon-de-Airbnb",
  },
  {
    id: 3,
    titleKey: "projects.project3Title",
    descKey: "projects.project3Desc",
    tagsKey: "projects.project3Tags",
    image: "/projects/tevisito.jpeg",
    gradient: "from-[hsl(var(--accent))] to-[hsl(var(--primary))]",
    behanceUrl: "https://www.behance.net/gallery/227053151/Te-Visito",
  },
  {
    id: 4,
    titleKey: "projects.project4Title",
    descKey: "projects.project4Desc",
    tagsKey: "projects.project4Tags",
    image: "/projects/legere2.jpeg",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
    behanceUrl: "https://www.behance.net/gallery/218134191/Legere-UX-UI-Camila-Rueda",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) {
      newIndex = projects.length - 1;
    } else if (newIndex >= projects.length) {
      newIndex = 0;
    }
    setDirection(newDirection);
    setCurrentIndex(newIndex);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
    }),
  };

  const swipeConfidenceThreshold = 15000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentProject = projects[currentIndex];

  // Memoizar traducciones para evitar recálculos innecesarios
  const tags = useMemo(
    () => t(currentProject.tagsKey) as unknown as string[],
    [currentProject.tagsKey, t]
  );

  return (
    <section
      id="projects"
      ref={ref}
      className="py-16 md:py-20 bg-gradient-to-b from-white to-[hsl(var(--soft-bg))] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 bg-[hsl(var(--primary)_/_0.05)] rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-[hsl(var(--accent)_/_0.05)] rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
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
            {t("projects.title")}{" "}
            <span className="gradient-text">{t("projects.titleHighlight")}</span>
          </h2>
          <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
            {t("projects.description")}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto px-8 md:px-0"
        >
          <div className="relative">
            {/* Project Card */}
            <div className="relative h-[320px] md:h-[450px] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute w-full"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Card
                    variant="static"
                    padding="none"
                    className="overflow-hidden"
                  >
                    {/* Mobile: Solo imagen clickeable */}
                    <div
                      className="md:hidden relative h-[320px] overflow-hidden bg-gradient-to-br from-[hsl(var(--soft-bg))] to-white cursor-pointer active:opacity-90 transition-opacity"
                      onClick={() => window.open(currentProject.behanceUrl, "_blank")}
                    >
                      <Image
                        src={currentProject.image}
                        alt={t(currentProject.titleKey)}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={currentIndex === 0}
                        quality={90}
                      />
                    </div>

                    {/* Desktop: Grid con imagen + info - Card clickeable */}
                    <div
                      className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-0 cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => window.open(currentProject.behanceUrl, "_blank")}
                    >
                      {/* Project Image */}
                      <div className="relative h-80 lg:h-full overflow-hidden bg-gradient-to-br from-[hsl(var(--soft-bg))] to-white">
                        <Image
                          src={currentProject.image}
                          alt={t(currentProject.titleKey)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 600px"
                          priority={currentIndex === 0}
                          quality={90}
                        />
                      </div>

                      {/* Project Info */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h3 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                            {t(currentProject.titleKey)}
                          </h3>
                          <p className="text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed text-lg">
                            {t(currentProject.descKey)}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium bg-[hsl(var(--soft-bg))] text-[hsl(var(--primary))] rounded-full border border-[hsl(var(--border))]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows - All screens (Outside Card) */}
            <div className="absolute z-10 top-1/2 -translate-y-1/2 -left-8 -right-8 md:left-[-4rem] md:right-[-4rem] flex justify-between pointer-events-none">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="pointer-events-auto"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-[hsl(var(--primary))] drop-shadow-lg" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="pointer-events-auto"
                aria-label="Next project"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-[hsl(var(--primary))] drop-shadow-lg" />
              </motion.button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentIndex) {
                    const newDirection = index > currentIndex ? 1 : -1;
                    setDirection(newDirection);
                    setCurrentIndex(index);
                  }
                }}
                className={`h-2.5 md:h-2 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentIndex
                    ? "w-10 md:w-8 bg-[hsl(var(--primary))]"
                    : "w-2.5 md:w-2 bg-[hsl(var(--border))] hover:bg-[hsl(var(--primary)_/_0.5)] active:bg-[hsl(var(--primary)_/_0.7)]"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Project Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {currentIndex + 1} / {projects.length}
            </p>
          </motion.div>
        </motion.div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://www.behance.net/ruedaca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors font-medium text-lg underline underline-offset-4"
          >
            {t("projects.viewAllProjects")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

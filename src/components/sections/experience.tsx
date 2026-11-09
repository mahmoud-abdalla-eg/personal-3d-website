import { EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { EXPERIENCE_ZH } from "@/data/translations";
import { useLanguage } from "@/contexts/i18n-context";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperienceSection = () => {
  const { isChinese, t } = useLanguage();
  const expList = isChinese ? (EXPERIENCE_ZH as unknown as typeof EXPERIENCE) : EXPERIENCE;

  return (
    <SectionWrapper
      id="about"
      className="flex flex-col items-center justify-center min-h-[120vh] py-20"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title={t("experience.title", "Experience")}
          desc={t("experience.subtitle", "My professional journey.")}
          className="relative mb-12 md:mb-20 mt-0"
        />

        <div className="flex flex-col gap-8 md:gap-12 relative">
          {/* Connector Line - simplified to a subtle border */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

          {expList.map((exp, index) => (
            <div key={exp.id} className="relative">
              <ExperienceCard experience={exp} index={index} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCE)[0];
  index: number;
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "group bg-card text-card-foreground border-border",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">
                {experience.title}
              </CardTitle>
              <div className="text-base font-medium text-muted-foreground">
                {experience.company}
              </div>
            </div>
            <ol className="relative flex flex-col gap-2.5 md:items-end">
              {experience.periods.length > 1 && (
                <span className="absolute left-[3.5px] md:left-auto md:right-[3.5px] top-2 bottom-2 w-px bg-border" />
              )}
              {experience.periods.map((p, i) => {
                const active = p.end === "Present" || p.end === "至今";
                return (
                  <li
                    key={i}
                    className={cn(
                      "relative flex items-center gap-2.5 md:flex-row-reverse font-mono text-xs",
                      active ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span className="relative flex size-2 shrink-0">
                      {active && (
                        <span className="absolute inset-0 rounded-full bg-emerald-500/60 motion-safe:animate-ping" />
                      )}
                      <span
                        className={cn(
                          "relative size-2 rounded-full",
                          active
                            ? "bg-emerald-500"
                            : "border border-muted-foreground/50 bg-card"
                        )}
                      />
                    </span>
                    {p.start} - {p.end === "Present" ? t("experience.present", "Present") : p.end}
                  </li>
                );
              })}
            </ol>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
            {experience.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-2">
            {experience.skills.map((skillName) => {
              const skill = SKILLS[skillName];
              if (!skill) return null;
              return (
                <Badge
                  key={skillName}
                  variant="secondary"
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium",
                    "bg-secondary/50 text-secondary-foreground",
                    "border border-border/50 hover:bg-secondary/80 transition-colors"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className="w-3.5 h-3.5 object-contain"
                  />
                  <span>{skill.label}</span>
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;

import {
  GraduationCap, BookOpen, Shield, HeartHandshake, Lightbulb, Smartphone, Cpu, Briefcase,
  Compass, Rocket, FlaskConical, BookOpenCheck, Sparkles, Building2, Users, MapPin, Trophy,
  CalendarClock, Package, Heart,
  type LucideIcon,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  GraduationCap, BookOpen, Shield, HeartHandshake, Lightbulb, Smartphone, Cpu, Briefcase,
  Compass, Rocket, FlaskConical, BookOpenCheck, Sparkles, Building2, Users, MapPin, Trophy,
  CalendarClock, Package, Heart,
};

export function getIcon(name: string | undefined, fallback: LucideIcon = Sparkles): LucideIcon {
  if (!name) return fallback;
  return REGISTRY[name] ?? fallback;
}

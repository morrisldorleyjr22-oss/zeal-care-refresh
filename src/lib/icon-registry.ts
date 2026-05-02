import {
  GraduationCap, BookOpen, Shield, ShieldCheck, HeartHandshake, Lightbulb, Smartphone, Cpu, Briefcase,
  Compass, Rocket, FlaskConical, BookOpenCheck, Sparkles, Building2, Users, MapPin, Trophy,
  CalendarClock, Package, Heart, Clock,
  type LucideIcon,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  GraduationCap, BookOpen, Shield, ShieldCheck, HeartHandshake, Lightbulb, Smartphone, Cpu, Briefcase,
  Compass, Rocket, FlaskConical, BookOpenCheck, Sparkles, Building2, Users, MapPin, Trophy,
  CalendarClock, Package, Heart, Clock,
};

export function getIcon(name: string | undefined, fallback: LucideIcon = Sparkles): LucideIcon {
  if (!name) return fallback;
  return REGISTRY[name] ?? fallback;
}

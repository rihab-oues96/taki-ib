import {
  BarChart3, BookOpen, Building2, CalendarCheck, Circle, Eye, FileText, Flag, FlaskConical, Globe2, GraduationCap,
  HeartPulse, Info, Languages, Lightbulb, ListChecks, MessageCircle, Palette, PenTool, Scale, Search, Sigma,
  Sparkles, Target, TrendingUp, Users, type LucideIcon,
} from "lucide-react";

/** Icons an editor can pick for the cards of the programme pages (the CMS stores the name). */
const ICONS: Record<string, LucideIcon> = {
  BarChart3, BookOpen, Building2, CalendarCheck, Eye, FileText, Flag, FlaskConical, Globe2, GraduationCap,
  HeartPulse, Info, Languages, Lightbulb, ListChecks, MessageCircle, Palette, PenTool, Scale, Search, Sigma,
  Sparkles, Target, TrendingUp, Users,
};

/** Unknown or empty names fall back to a neutral dot so a card never breaks. */
export function programmeIcon(name: string): LucideIcon {
  return ICONS[name] ?? Circle;
}

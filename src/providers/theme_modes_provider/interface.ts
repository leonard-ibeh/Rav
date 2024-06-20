import { ExtendEmotionTheme } from "@themes/emotion_theme";

export interface ThemeModesProviderProps {
  extendTheme?: Record<string, ExtendEmotionTheme>;
  children: React.ReactNode;
}

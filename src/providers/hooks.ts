import { useContext } from "react";
import { AppProviderContext } from "./main";
import { ThemeModeProviderContext } from "./theme_modes_provider";

export const useApp = () => useContext(AppProviderContext);
export const useThemeMode = () => useContext(ThemeModeProviderContext);

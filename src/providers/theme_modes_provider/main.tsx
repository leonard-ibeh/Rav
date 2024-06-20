import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { ThemeModesProviderProps } from "./interface";
import {
  EmotionTheme,
  EmotionThemeName,
  ExtendEmotionTheme,
} from "@themes/emotion_theme";
import { reactLocalStorage } from "reactjs-localstorage";
import { app_theme_color_storage } from "utils/constants";

export const ThemeModeProviderContext = createContext({
  theme: EmotionTheme.light,
  colors: EmotionTheme.light.colors,
  setTheme: (themeName: EmotionThemeName = EmotionThemeName.LIGHT) => {
    return EmotionTheme[themeName];
  },
});

export const ThemeModesProvider: React.FC<ThemeModesProviderProps> = ({
  extendTheme,
  children,
}) => {
  const lightTheme = { ...EmotionTheme.light, ...extendTheme?.light };
  const darkTheme = { ...EmotionTheme.dark, ...extendTheme?.dark };
  const [activeTheme, setActiveTheme] =
    useState<ExtendEmotionTheme>(lightTheme);

  useEffect(() => {
    const theme = window
      ? reactLocalStorage.get(app_theme_color_storage)
      : null;
    if (theme) {
      const defaultTheme =
        theme != null
          ? theme === "dark"
            ? darkTheme
            : lightTheme
          : lightTheme;
      setActiveTheme(defaultTheme);
    }
  }, []);

  const setTheme = (themeName: EmotionThemeName = EmotionThemeName.LIGHT) => {
    const emotionTheme = themeName === "dark" ? darkTheme : lightTheme;
    setActiveTheme(emotionTheme);

    if (window) {
      reactLocalStorage.set(app_theme_color_storage, themeName);
    }
    return emotionTheme;
  };

  return (
    <ThemeModeProviderContext.Provider
      value={{
        theme: activeTheme,
        colors: activeTheme.colors,
        setTheme,
      }}
    >
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemeModeProviderContext.Provider>
  );
};

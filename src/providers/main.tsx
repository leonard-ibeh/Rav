import "../assets/css/app.scss";
import React from "react";
import { createContext, useContext } from "react";
import { ChakraProviderLoader } from "./chakra_provider";
import { ThemeModesProvider } from "./theme_modes_provider";
import { UIMainProviderProps } from "./interface";

import { ModalProvider } from "mui-modal-provider";

type AppProviderProv = {};

export const AppProviderContext = createContext<AppProviderProv>({});

export const AppProvider: React.FC<UIMainProviderProps> = ({
  themeModesProviderProps,
  children,
}) => {
  return (
    <AppProviderContext.Provider value={{}}>
      <ModalProvider>
        <ChakraProviderLoader>
          <ThemeModesProvider {...themeModesProviderProps}>
            {children}
          </ThemeModesProvider>
        </ChakraProviderLoader>
      </ModalProvider>
    </AppProviderContext.Provider>
  );
};

export const useApp = () => useContext(AppProviderContext);

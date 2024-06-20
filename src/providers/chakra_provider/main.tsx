import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraTheme } from "@themes/chakra_theme";

export const ChakraProviderLoader: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "bottom",
          isClosable: true,
          containerStyle: {
            width: "100%",
            maxWidth: "100%",
            bottom: "0",
            marginBottom: "0",
            textAlign: "center",
            borderRadius: "0",
          },
        },
      }}
      theme={ChakraTheme}
    >
      {children}
    </ChakraProvider>
  );
};

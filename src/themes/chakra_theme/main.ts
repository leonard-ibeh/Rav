import { extendTheme } from "@chakra-ui/react";
import { EmothionThemeColorBase } from "..";
export const ChakraTheme = extendTheme({
  styles: {
    global: {
      a: {
        color: "#D429A4",
      },
    },
  },
  fonts: {
    heading: "Mulish",
    body: "Mulish",
  },
  colors: EmothionThemeColorBase,
  components: {
    Button: {
      baseStyle: {
        fontFamily: "Mulish-Medium",
        fontWeight: "bold", // Normally, it is "semibold"
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
      },
      variants: {
        primary: {
          textColor: "white", // Or any desired color
          backgroundColor: "#005E5E",
        },
        secondary: {
          textColor: "gray.700", // Or any desired color
        },
      },
      size: "lg",
    },
    Tabs: {
      variants: {
        line: {
          tab: {
            fontSize: "14px",

            _selected: {
              color: "primary",
              bg: "transparent",
            },
          },
          tabpanel: {
            border: "none",
          },
        },
      },
    },
  },
});

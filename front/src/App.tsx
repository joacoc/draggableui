import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import GirdLayout from "./GridLayout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher justifySelf="flex-end" />
    <GirdLayout />
  </ChakraProvider>
);

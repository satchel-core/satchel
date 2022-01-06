import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { CreateAccount } from "./pages/CreateAccount";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="Login" element={<Login />} />
        <Route path="CreateAccount" element={<CreateAccount />} />
      </Routes>
    </Router>
  </ChakraProvider>
)

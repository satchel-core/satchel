import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react"
import "@fontsource/inter";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { CreateAccount } from "./pages/CreateAccount";

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  colors: {
    satchel_blue: {
      50: "#e6f7fd",
      100: "#cceffc",
      200: "#99dff8",
      300: "#67cff5",
      400: "#34bff1",
      500: "#01afee",
      600: "#009feb",
      700: "#008fe7",
      800: "#007fe4",
      900: "#006fe0",
    }
  }
})

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

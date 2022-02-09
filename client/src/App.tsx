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
import { CreateAccount } from "./pages/createacc/CreateAccount";
import { Organization } from "./pages/org/Organization";
import { CommunityMember } from "./pages/commem/CommunityMember";
import { StateContext, DispatchContext } from "./utils/context";
import { useReducer } from "react";
import { loanInitialState, LoanReducer } from "./store/reducers/loan_reducer";

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
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
    },
    satchel_blue_notint: {
      50: "#01afee",
      100: "#01afee",
      200: "#01afee",
      300: "#01afee",
      400: "#01afee",
      500: "#01afee",
      600: "#01afee",
      700: "#01afee",
      800: "#01afee",
      900: "#01afee",
    }
  }
})

export const App = () => {
  const [loansState, loansDispatch] = useReducer(LoanReducer, loanInitialState);

  return (
    <ChakraProvider theme={theme}>
      <StateContext.Provider
        value={{
          loans: loansState
        }}>
        <DispatchContext.Provider
          value={{
            loans: loansDispatch
          }}>
          {/* <div>
            {JSON.stringify(loansState)}
          </div> */}
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="Login" element={<Login />} />
              <Route path="CreateAccount" element={<CreateAccount />} />
              <Route path="Org" element={<Organization />} />
              <Route path="ComMem" element={<CommunityMember />} />
            </Routes>
          </Router>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </ChakraProvider>
  )

}
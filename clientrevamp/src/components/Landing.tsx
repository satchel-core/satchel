import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Button,
  } from "@chakra-ui/react"
import { Logo } from "../Logo"
import { To, useNavigate } from "react-router-dom"
import { FunctionComponent } from "react";

export const Landing: FunctionComponent = () => {
  let navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }
  return <Box textAlign="center">
          <Grid minH="100vh" p={3}>
            <VStack spacing={2}>
              <Logo h="20vmin" pointerEvents="none" />
              <Text fontSize="14px">
                Satchel uplifts underbanked school communities by facilitating locally-governed projects & capital growth via DeFi-powered donations & financial primitives.
              </Text>
              <Button size="sm" bg="#01afee" color="white" variant="solid" onClick={handleClick("/CreateAccount")}>CREATE ACCOUNT</Button>
              <Button size="sm" borderColor="#01afee" color="#01afee" variant="outline" onClick={handleClick("/Login")}>LOGIN</Button>
            </VStack>
          </Grid>
        </Box>
}
import {
    Box,
    Text,
    VStack,
    Grid,
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
              <Button size="sm" colorScheme="satchel_blue" variant="solid" onClick={handleClick("/CreateAccount")}>CREATE ACCOUNT</Button>
              <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/Login")}>LOGIN</Button>
            </VStack>
          </Grid>
        </Box>
}

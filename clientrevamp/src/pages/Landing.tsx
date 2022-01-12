import {
    Text,
    Grid,
    GridItem,
    Button,
  } from "@chakra-ui/react"
import { Logo } from "../Logo"
import { To, useNavigate } from "react-router-dom"
import { FunctionComponent } from "react";

export const Landing: FunctionComponent = () => {
  const navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }
  return <Grid minH="37vh" p={3}>
              <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                <Logo h="20vmin" pointerEvents="none" />
              </GridItem>
              <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                <Text fontSize="14px">
                  Satchel uplifts underbanked school communities by facilitating locally-governed projects & capital growth via DeFi-powered donations & financial primitives.
                </Text>
              </GridItem>
              <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="solid" onClick={handleClick("/CreateAccount")}>CREATE ACCOUNT</Button>
              </GridItem>
              <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={1}>
                <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/Login")}>LOGIN</Button>
              </GridItem>
          </Grid>
}

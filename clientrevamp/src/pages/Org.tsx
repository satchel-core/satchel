import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../Logo"
import { FunctionComponent, useState } from "react";
import { SchoolLabel } from "../components/SchoolLabel";
import { OrganizationMenu } from "../components/OrganizationMenu";
import { To, useNavigate } from "react-router-dom"
import { TokenLabel } from "../components/TokenLabel";

export const Org: FunctionComponent = () => {
  const navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }

  const [page, setPage] = useState(0);
  const [school, setSchool] = useState("");
  switch (page) {
    case 0:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/Login")}>
                      LOG OUT
                    </Button>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Text fontSize="24px">
                    Organization Name
                  </Text>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline">ADD NEW SCHOOL</Button>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <SchoolLabel name="School A" city="CITY1" country="COUNTRY1" balance="1,234" setPage={setPage} setSchool={setSchool} />
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <SchoolLabel name="School B" city="CITY2" country="COUNTRY2" balance="2,345" setPage={setPage} setSchool={setSchool} />
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <SchoolLabel name="School C" city="CITY3" country="COUNTRY3" balance="3,456" setPage={setPage} setSchool={setSchool} />
                </GridItem>
                <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                  <SchoolLabel name="School D" city="CITY4" country="COUNTRY4" balance="4,567" setPage={setPage} setSchool={setSchool} />
                </GridItem>
              </Grid>
    case 1:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu />
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(0)}>RETURN TO ORGANIZATION</Button>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Text fontSize="24px">
                    {school}
                  </Text>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    Current Balance
                  </Text>
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <Text fontSize="48px">
                    $9,999
                  </Text>
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(10)}>WITHDRAW MONEY</Button>
                </GridItem>
                <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                  <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(20)}>DEPOSIT MONEY</Button>
                </GridItem>
                <GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    TOKENS HELD
                  </Text>
                </GridItem>
                <GridItem rowStart={9} rowEnd={9} colStart={1} colEnd={2}>
                  <TokenLabel name="BITCOIN" amount="80.00"></TokenLabel>
                </GridItem>
                <GridItem rowStart={10} rowEnd={10} colStart={1} colEnd={2}>
                  <TokenLabel name="DAI" amount="761.3"></TokenLabel>
                </GridItem>
                <GridItem rowStart={11} rowEnd={11} colStart={1} colEnd={2}>
                  <TokenLabel name="TETHER" amount="16.36"></TokenLabel>
                </GridItem>
                <GridItem rowStart={12} rowEnd={12} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    TRANSACTION HISTORY
                  </Text>
                </GridItem>
              </Grid>
    default:
      return <Text>Unimplemented page</Text>
  }
}

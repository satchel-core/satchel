import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../../Logo"
import React, { FunctionComponent } from "react";
import { SchoolLabel } from "../../components/SchoolLabel";
import { To, useNavigate } from "react-router-dom"

type OrgHomeProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setSchool: React.Dispatch<React.SetStateAction<string>>,
}

export const OrgHome: FunctionComponent<OrgHomeProps> = ({setPage, setSchool}) => {
  const navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }

  return <Grid p={3} gap={3}>
            <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
              <HStack>
                <Logo h="20vmin" pointerEvents="none" />
                <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/")}>
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
}

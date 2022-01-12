import {
  Text,
  Grid,
  GridItem,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  StatArrow,
  MenuButton,
  MenuList,
  MenuItem,
  Menu
} from "@chakra-ui/react"
import { Logo } from "../Logo"
import { To, useNavigate } from "react-router-dom"
import { FunctionComponent } from "react";
import { SchoolLabel } from "../components/SchoolLabel";

export const Org: FunctionComponent = () => {
  let navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }
  return <Grid p={3} gap={3}>
              <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                <Logo h="20vmin" pointerEvents="none" />
                <Menu>
                  <MenuButton as={Button}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                  </MenuList>
                </Menu>
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
                <SchoolLabel name="School A" city="CITY1" country="COUNTRY1" balance="1,234" />
              </GridItem>
              <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                <SchoolLabel name="School B" city="CITY2" country="COUNTRY2" balance="2,345" />
              </GridItem>
              <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                <SchoolLabel name="School C" city="CITY3" country="COUNTRY3" balance="3,456" />
              </GridItem>
              <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                <SchoolLabel name="School D" city="CITY4" country="COUNTRY4" balance="4,567" />
              </GridItem>
          </Grid>
}

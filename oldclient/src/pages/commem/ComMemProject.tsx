import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react"
import { Logo } from "../../Logo"
import { FunctionComponent } from "react";
import { OrganizationMenu } from "../../components/OrganizationMenu";
import { ComMemPages } from "./CommunityMember";

type ComMemProjectProps = {
  name: string,
  setPage: React.Dispatch<React.SetStateAction<number>>,
}

export const ComMemProject: FunctionComponent<ComMemProjectProps> = ({name, setPage}) => {
  return <Grid p={3} gap={3}>
            <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
              <HStack>
                <Logo h="20vmin" pointerEvents="none" />
                <OrganizationMenu setPage={setPage}/>
              </HStack>
            </GridItem>
            <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
              <Text fontSize="24px">
                {name}
              </Text>
            </GridItem>
            <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
              <Text fontSize="14px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </Text>
            </GridItem>
            <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
              <Text fontSize="12px">
                ATTACHMENTS
              </Text>
            </GridItem>
            <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
              <HStack>
                <Badge variant='outline'>
                  IMAGE.PNG
                </Badge>
                <Badge variant='outline'>
                  DETAILS.PDF
                </Badge>
                <Badge variant='outline'>
                  EMAIL.PNG
                </Badge>
              </HStack>
            </GridItem>
            <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
              <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(ComMemPages.Projects)}>GO BACK</Button>
            </GridItem>
          </Grid>
}

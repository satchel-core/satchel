import {
  Text,
  Grid,
  GridItem,
  HStack,
  Tag,
} from "@chakra-ui/react"
import { Logo } from "../../logo"
import { FunctionComponent } from "react";
import { OrganizationMenu } from "../../components/OrganizationMenu";

type OrgMembersProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>,
  school: string,
}

export const OrgMembers: FunctionComponent<OrgMembersProps> = ({setPage, school}) => {
  return <Grid p={3} gap={3}>
            <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
              <HStack>
                <Logo h="20vmin" pointerEvents="none" />
                <OrganizationMenu setPage={setPage}/>
              </HStack>
            </GridItem>
            <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
              <Text fontSize="24px">
                {school}
              </Text>
            </GridItem>
            <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
              <Text fontSize="12px">
                COMMUNITY MEMBERS
              </Text>
            </GridItem>
            <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
              <Grid templateColumns="1fr 1fr 1fr" gap={2}>
                <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
              </Grid>
            </GridItem>
          </Grid>
}

import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react"
import { Logo } from "../../Logo"
import { FunctionComponent, useState } from "react";
import { OrganizationMenu } from "../../components/OrganizationMenu";
import { OrgPages } from "./Organization";

export enum OrgProjectStatus {
  Pending, Current
}

type OrgProjectProps = {
  name: string,
  status: OrgProjectStatus,
  setPage: React.Dispatch<React.SetStateAction<number>>,
}

export const OrgProject: FunctionComponent<OrgProjectProps> = ({ name, status, setPage }) => {
  const [update, setUpdate] = useState(false);
  if (update) {
    return <Grid p={3} gap={3}>
      <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
        <HStack>
          <Logo h="20vmin" pointerEvents="none" />
          <OrganizationMenu setPage={setPage} />
        </HStack>
      </GridItem>
      <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
        <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(OrgPages.Projects)}>GO BACK</Button>
      </GridItem>
      <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
        <Text fontSize="12px">
          CURRENT PROJECT
        </Text>
      </GridItem>
      <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
        <Text fontSize="24px">
          {name}
        </Text>
      </GridItem>
      <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
        <Button size="sm" colorScheme="satchel_blue" variant="outline">UPLOAD MORE ATTACHMENTS</Button>
      </GridItem>
      <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
        <Text fontSize="12px">
          ATTACHMENTS
        </Text>
      </GridItem>
      <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
        <HStack>
          <Badge colorScheme="satchel_blue" variant="solid">
            IMAGE.PNG
          </Badge>
          <Badge colorScheme="satchel_blue" variant="solid">
            DETAILS.PDF
          </Badge>
          <Badge colorScheme="satchel_blue" variant="solid">
            EMAIL.PNG
          </Badge>
        </HStack>
      </GridItem>
      <HStack>
        <Button size="sm" colorScheme="satchel_blue" variant="solid" onClick={() => setUpdate(false)}>SAVE</Button>
      </HStack>
    </Grid>
  }
  return <Grid p={3} gap={3}>
    <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
      <HStack>
        <Logo h="20vmin" pointerEvents="none" />
        <OrganizationMenu setPage={setPage} />
      </HStack>
    </GridItem>
    <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
      <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(OrgPages.Projects)}>GO BACK</Button>
    </GridItem>
    <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
      <Text fontSize="12px">
        {status === OrgProjectStatus.Pending ? "PENDING" : "CURRENT"} PROJECT
      </Text>
    </GridItem>
    <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
      <Text fontSize="24px">
        {name}
      </Text>
    </GridItem>
    <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
      <Text fontSize="14px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
    </GridItem>
    <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
      <Text fontSize="12px">
        ATTACHMENTS
      </Text>
    </GridItem>
    <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
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
    <HStack>
      {status === OrgProjectStatus.Pending && <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="solid">APPROVE</Button>}
      {status === OrgProjectStatus.Pending && <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="outline">REJECT</Button>}
      {status === OrgProjectStatus.Current && <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setUpdate(true)}>UPDATE PROJECT</Button>}
    </HStack>
  </Grid>
}

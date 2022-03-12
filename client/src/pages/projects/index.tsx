import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../../Logo"
import React from "react";
import { ComMemMenu } from "../../components/ComMemMenu";
import { ProjectLabel } from "../../components/ProjectLabel";
import { handleClick } from "../../utils/common";
import { useRouter } from "next/router";

const Projects = () => {
  const router = useRouter();
  return <Grid p={3} gap={3}>
    <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
      <HStack>
        <Logo h="20vmin" pointerEvents="none" />
        <ComMemMenu />
      </HStack>
    </GridItem>
    <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
      <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => handleClick("/projects/project", router)}>PROPOSE PROJECT</Button>
    </GridItem>
    <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
      <Text fontSize="12px">
        CURRENT PROJECTS
      </Text>
    </GridItem>
    <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
      <ProjectLabel name="Project A" status="PROPOSED" moneyStatus="Budget: $9,999" likes={6} />
    </GridItem>
    <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
      <ProjectLabel name="Project B" status="IN PROGRESS" moneyStatus="Raised $1,234 of $5,678" likes={15} />
    </GridItem>
    <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
      <ProjectLabel name="Project C" status="REJECTED" moneyStatus="Budget: $10,000" likes={0} />
    </GridItem>
  </Grid>
}

export default Projects;
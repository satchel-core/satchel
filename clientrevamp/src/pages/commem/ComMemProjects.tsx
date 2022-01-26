import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../../Logo"
import React, { FunctionComponent } from "react";
import { ComMemMenu } from "../../components/ComMemMenu";
import { ProjectLabel } from "../../components/ProjectLabel";

type ComMemProjectsProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setProject: React.Dispatch<React.SetStateAction<string>>,
}

export const ComMemProjects: FunctionComponent<ComMemProjectsProps> = ({setPage, setProject}) => {
  return <Grid p={3} gap={3}>
            <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
              <HStack>
                <Logo h="20vmin" pointerEvents="none" />
                <ComMemMenu setPage={setPage}/>
              </HStack>
            </GridItem>
            <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
              <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(30)}>PROPOSE PROJECT</Button>
            </GridItem>
            <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
              <Text fontSize="12px">
                CURRENT PROJECTS
              </Text>
            </GridItem>
            <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
              <ProjectLabel name="Project A" status="PROPOSED" moneyStatus="Budget: $9,999" likes={6} setPage={setPage} setProject={setProject} />
            </GridItem>
            <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
              <ProjectLabel name="Project B" status="IN PROGRESS" moneyStatus="Raised $1,234 of $5,678" likes={15} setPage={setPage} setProject={setProject} />
            </GridItem>
            <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
              <ProjectLabel name="Project C" status="REJECTED" moneyStatus="Budget: $10,000" likes={0} setPage={setPage} setProject={setProject} />
            </GridItem>
          </Grid>
}

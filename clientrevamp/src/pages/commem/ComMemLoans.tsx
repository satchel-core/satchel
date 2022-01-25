import {
  Text,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../../Logo"
import { FunctionComponent } from "react";
import { ComMemMenu } from "../../components/ComMemMenu";
import { LoanLabel } from "../../components/LoanLabel";

type ComMemLoansProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>,
}

export const ComMemLoans: FunctionComponent<ComMemLoansProps> = ({setPage}) => {
  return <Grid p={3} gap={3}>
            <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
              <HStack>
                <Logo h="20vmin" pointerEvents="none" />
                <ComMemMenu setPage={setPage}/>
              </HStack>
            </GridItem>
            <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
              <Text fontSize="24px">
                Loans
              </Text>
            </GridItem>
            <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
              <Text fontSize="12px">
                CURRENT PROJECTS
              </Text>
            </GridItem>
            <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
              <LoanLabel status="PROCESSING" amount="$768.39" date="December 4, 2021" />
            </GridItem>
            <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
              <LoanLabel status="GRANTED" amount="$768.39" date="December 4, 2021" />
            </GridItem>
            <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
              <LoanLabel status="REJECTED" amount="$768.39" date="December 4, 2021" />
            </GridItem>
          </Grid>
}

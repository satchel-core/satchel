import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../../Logo"
import { FunctionComponent } from "react";
import { ComMemMenu } from "../../components/ComMemMenu";
import { TokenLabel } from "../../components/TokenLabel";
import { ComMemPages } from "./CommunityMember"

type ComMemHomeProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>,
  member: string,
}

export const ComMemHome: FunctionComponent<ComMemHomeProps> = ({setPage, member}) => {
  return <Grid p={3} gap={2}>
            <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
              <HStack>
                <Logo h="20vmin" pointerEvents="none" />
                <ComMemMenu setPage={setPage}/>
              </HStack>
            </GridItem>
            <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
              <Text fontSize="24px">
                Hi {member}!
              </Text>
            </GridItem>
            <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
              <Text fontSize="12px">
                CURRENT BALANCE
              </Text>
            </GridItem>
            <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
              <Text fontSize="48px">
                $9,999
              </Text>
            </GridItem>
            <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
              <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(ComMemPages.Withdraw)}>WITHDRAW MONEY</Button>
            </GridItem>
            <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
              <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(ComMemPages.Deposit)}>DEPOSIT MONEY</Button>
            </GridItem>
            <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
              <Text fontSize="12px">
                TOKENS HELD
              </Text>
            </GridItem>
            <GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
              <TokenLabel name="BITCOIN" amount="80.00"></TokenLabel>
            </GridItem>
            <GridItem rowStart={9} rowEnd={9} colStart={1} colEnd={2}>
              <TokenLabel name="DAI" amount="761.3"></TokenLabel>
            </GridItem>
            <GridItem rowStart={10} rowEnd={10} colStart={1} colEnd={2}>
              <TokenLabel name="TETHER" amount="16.36"></TokenLabel>
            </GridItem>
          </Grid>
}

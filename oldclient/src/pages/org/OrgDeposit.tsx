import {
  Text,
  Grid,
  GridItem,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Input,
  VStack,
  Stat,
  StatGroup,
  StatLabel,
} from "@chakra-ui/react"
import { FunctionComponent, useState } from "react";

import { Logo } from "../../Logo";
import { OrganizationMenu } from "../../components/OrganizationMenu";
import { TokenLabel } from "../../components/TokenLabel";
import { OrgPages } from "./Organization"

type OrgDepositProps = {
  origSetPage: React.Dispatch<React.SetStateAction<number>>,
}

enum DepositPages {
  Asset,
  Amount,
  Confirm,
  Congrats,
}

export const OrgDeposit: FunctionComponent<OrgDepositProps> = ({origSetPage}) => {
  const [page, setPage] = useState(DepositPages.Asset);
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("0");
  switch (page) {
    case DepositPages.Asset:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={origSetPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Text fontSize="24px">
                    Deposit Money
                  </Text>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    SELECT ASSET
                  </Text>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <TokenLabel name="BITCOIN" amount="80.00" onClick={() => {
                    setPage(DepositPages.Amount);
                    setAsset("BTC");
                  }} />
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <TokenLabel name="DAI" amount="761.3" onClick={() => {
                    setPage(DepositPages.Amount);
                    setAsset("DAI");
                  }} />
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <TokenLabel name="TETHER" amount="16.36" onClick={() => {
                    setPage(DepositPages.Amount);
                    setAsset("TETHER");
                  }} />
                </GridItem>
              </Grid>
    case DepositPages.Amount:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={origSetPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(DepositPages.Asset)}>
                    GO BACK
                  </Button>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Text fontSize="24px">
                    {asset}
                  </Text>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <StatGroup>
                    <Stat>
                      <StatLabel fontSize="12px">WALLET</StatLabel>
                      <StatLabel fontSize="36px">{amount}</StatLabel>
                      <StatLabel fontSize="18px">$350.00</StatLabel>
                    </Stat>
                    <Stat>
                      <Logo></Logo>
                    </Stat>
                    <Stat>
                      <StatLabel fontSize="12px">SATCHEL</StatLabel>
                      <StatLabel fontSize="36px">0.00</StatLabel>
                      <StatLabel fontSize="18px">$350.00</StatLabel>
                    </Stat>
                  </StatGroup>
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    SELECT AMOUNT TO DEPOSIT
                  </Text>
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <NumberInput
                    onChange={(amount) => setAmount(amount)}
                    value={amount + " " + asset}
                    max={5}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </GridItem>
                <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                  <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(DepositPages.Confirm)}>
                    NEXT
                  </Button>
                </GridItem>
              </Grid>
    case DepositPages.Confirm:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={origSetPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(DepositPages.Amount)}>
                    GO BACK
                  </Button>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Text fontSize="24px">
                    Preview
                  </Text>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    ASSET
                  </Text>
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <Input defaultValue={asset} isReadOnly></Input>
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    DEPOSIT AMOUNT
                  </Text>
                </GridItem>
                <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                  <Input defaultValue={amount} isReadOnly></Input>
                </GridItem>
                <GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
                  <Button size="sm" colorScheme="satchel_blue" variant="solid" onClick={() => setPage(DepositPages.Congrats)}>
                    CONFIRM DEPOSIT
                  </Button>
                </GridItem>
              </Grid>
    case DepositPages.Congrats:
      return <Grid p={3} gridTemplateRows="30vh auto">
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={origSetPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={3}>
                  <VStack spacing={2}>
                    <Text fontSize="18px" fontWeight="bold">
                      Congratulations!
                    </Text>
                    <Text textAlign="center">
                      The deposit has been processed. You should see the assets on Satchel within a few hours.
                    </Text>
                    <Button size="sm" colorScheme="satchel_blue" variant="solid" onClick={() => origSetPage(OrgPages.SchoolHome)}>
                      RETURN TO SCHOOL HOME
                    </Button>
                  </VStack>
                </GridItem>
              </Grid>
    default:
      return <Text>Unimplemented deposit page</Text>
  }
}

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

type OrgWithdrawProps = {
  origSetPage: React.Dispatch<React.SetStateAction<number>>,
}

enum WithdrawPages {
  Asset,
  Amount,
  Confirm,
  Congrats,
}

export const OrgWithdraw: FunctionComponent<OrgWithdrawProps> = ({origSetPage}) => {
  const [page, setPage] = useState(WithdrawPages.Asset);
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("0");
  switch (page) {
    case WithdrawPages.Asset:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={origSetPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Text fontSize="24px">
                    Withdraw Money
                  </Text>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    SELECT ASSET
                  </Text>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <TokenLabel name="BITCOIN" amount="80.00" onClick={() => {
                    setPage(WithdrawPages.Amount);
                    setAsset("BTC");
                  }} />
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <TokenLabel name="DAI" amount="761.3" onClick={() => {
                    setPage(WithdrawPages.Amount);
                    setAsset("DAI");
                  }} />
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <TokenLabel name="TETHER" amount="16.36" onClick={() => {
                    setPage(WithdrawPages.Amount);
                    setAsset("TETHER");
                  }} />
                </GridItem>
              </Grid>
    case WithdrawPages.Amount:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={origSetPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(WithdrawPages.Asset)}>
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
                      <StatLabel fontSize="12px">SATCHEL</StatLabel>
                      <StatLabel fontSize="36px">{amount}</StatLabel>
                      <StatLabel fontSize="18px">$350.00</StatLabel>
                    </Stat>
                    <Stat>
                      <Logo></Logo>
                    </Stat>
                    <Stat>
                      <StatLabel fontSize="12px">WALLET</StatLabel>
                      <StatLabel fontSize="36px">0.00</StatLabel>
                      <StatLabel fontSize="18px">$350.00</StatLabel>
                    </Stat>
                  </StatGroup>
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    SELECT AMOUNT TO WITHDRAW
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
                  <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(WithdrawPages.Confirm)}>
                    NEXT
                  </Button>
                </GridItem>
              </Grid>
    case WithdrawPages.Confirm:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={origSetPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(WithdrawPages.Amount)}>
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
                    WITHDRAW AMOUNT
                  </Text>
                </GridItem>
                <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                  <Input defaultValue={amount} isReadOnly></Input>
                </GridItem>
                <GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
                  <Button size="sm" colorScheme="satchel_blue" variant="solid" onClick={() => setPage(WithdrawPages.Congrats)}>
                    CONFIRM WITHDRAWAL
                  </Button>
                </GridItem>
              </Grid>
    case WithdrawPages.Congrats:
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
                      The withdrawal is being processed. You should see the assets in your wallet within a few hours.
                    </Text>
                    <Button size="sm" colorScheme="satchel_blue" variant="solid">
                      RETURN TO SCHOOL HOME
                    </Button>
                  </VStack>
                </GridItem>
              </Grid>
    default:
      return <Text>Unimplemented withdraw page</Text>
  }
}

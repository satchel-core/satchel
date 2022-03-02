import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../../Logo"
import { FunctionComponent } from "react";
import { OrganizationMenu } from "../../components/OrganizationMenu";
import { TokenLabel } from "../../components/TokenLabel";
import { TransactionLabel } from "../../components/TransactionLabel";
import { getKeys, goBack, handleClick, handleCustomUrl, makeAddress } from "../../utils/common";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { schoolType } from "../../store/reducers/school_reducer";
import { getSchoolBalance } from "../../store/actions/school_actions";

const OrgSchoolHome = ({ school }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const schoolState = useSelector((state: RootState) => state.school);

  // getSchoolBalance("0x6bf76B2668fF5446fbaDCb94231E2A44ba077bd6");
  console.log(schoolState.balance);
  console.log("TEST")

  return <Grid p={3} gap={3}>
    <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
      <HStack>
        <Logo h="20vmin" pointerEvents="none" />
        {/* <OrganizationMenu setPage={setPage}/> */}
      </HStack>
    </GridItem>
    <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
      <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={handleCustomUrl('/org/', school.orgAddress, router)}>RETURN TO ORGANIZATION</Button>
    </GridItem>
    <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
      <Text fontSize="24px">
        {school.name}
      </Text>
    </GridItem>
    <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
      <Text fontSize="12px">
        CURRENT BALANCE
      </Text>
    </GridItem>
    <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
      <Text fontSize="48px">
        ${JSON.stringify(schoolState)}
      </Text>
    </GridItem>
    <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
      <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline">WITHDRAW MONEY</Button>
    </GridItem>
    <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
      <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline">DEPOSIT MONEY</Button>
    </GridItem>
    <GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
      <Text fontSize="12px">
        TOKENS HELD
      </Text>
    </GridItem>
    <GridItem rowStart={9} rowEnd={9} colStart={1} colEnd={2}>
      <TokenLabel name="BITCOIN" amount="80.00"></TokenLabel>
    </GridItem>
    <GridItem rowStart={10} rowEnd={10} colStart={1} colEnd={2}>
      <TokenLabel name="DAI" amount="761.3"></TokenLabel>
    </GridItem>
    <GridItem rowStart={11} rowEnd={11} colStart={1} colEnd={2}>
      <TokenLabel name="TETHER" amount="16.36"></TokenLabel>
    </GridItem>
    <GridItem rowStart={12} rowEnd={12} colStart={1} colEnd={2}>
      <Text fontSize="12px">
        TRANSACTION HISTORY
      </Text>
    </GridItem>
    <GridItem rowStart={13} rowEnd={13} colStart={1} colEnd={2}>
      <TransactionLabel heading="Transfer from <Donor>" delta="+20.00 BTC" date="January 1, 2022"></TransactionLabel>
    </GridItem>
    <GridItem rowStart={14} rowEnd={14} colStart={1} colEnd={2}>
      <TransactionLabel heading="Initial Deposit" delta="+60.00 BTC" date="December 1, 2021"></TransactionLabel>
    </GridItem>
  </Grid>
}

export async function getServerSideProps(context) {
  const schoolAddress = makeAddress(context.query.index)
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/school/?address=${schoolAddress}`)
  const school = await res.json();

  return { props: { school } }
}

export default OrgSchoolHome
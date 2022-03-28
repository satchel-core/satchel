import {
  Text,
  Grid,
  GridItem,
  Button,
  Image
} from "@chakra-ui/react"
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { handleClick, handleCustomUrl } from "../utils/common";
import { RootState } from "../store";
import { deploySchool, depositSchool, getSchoolBalance } from "../store/actions/school_actions";
import assets from "../utils/assets.json";

const Index = (props) => {
  const counter = useSelector<RootState>((state) => state.loan);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Grid minH="37vh" p={3}>
      <div>{JSON.stringify(counter)}</div>
      <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
        <Image boxSize='100px' objectFit='cover' src={'/assets/satchel_tile.png'} alt='Satchel Tile' />
      </GridItem>
      <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
        <Text fontSize="14px">
          Satchel uplifts underbanked school communities by facilitating locally-governed projects & capital growth via DeFi-powered donations & financial primitives.
        </Text>
      </GridItem>
      <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
        <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="solid" onClick={handleClick("/CreateAccount", router)}>CREATE ACCOUNT</Button>
      </GridItem>
      <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={1}>
        <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/login", router)}>LOGIN</Button>
        {/* Works: */}
        {/* <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={deploySchool("New School TESTING", router, dispatch, props.app_server, props.contract_address)}>TEST</Button> */}
        {/* idk working on it */}
        <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => depositSchool("0x3a3a6677553bad5ae99ccdb64e714e54744a4bb3", 9, assets[0], dispatch)}>TEST</Button>
      </GridItem>
    </Grid>
  )
}

// TODO: I'm uncomfortable with this - Ritik
export async function getServerSideProps() {
  return { props: { app_server: process.env.REACT_APP_SERVER_URL, contract_address: process.env.REACT_APP_CONTRACT_ADDRESS } }
}


export default Index

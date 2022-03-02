import {
  Text,
  Grid,
  GridItem,
  Button,
  Image
} from "@chakra-ui/react"
import Tile from "../assets/satchel_tile.png"
import { FunctionComponent } from "react";
// import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from "../store/reducers";
import { getBorrowBalance } from "../store/actions/loan_actions";
import { useRouter } from "next/router";
import { handleClick } from "../utils/common";

export const Landing: FunctionComponent = () => {
  const router = useRouter();

  const counter = useSelector<RootState>((state) => state.loan);

  return <Grid minH="37vh" p={3}>
    <div>{JSON.stringify(counter)}</div>
    <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
      <Image boxSize='100px' objectFit='cover' src={Tile} alt='Satchel Tile' />
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
      <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/Login", router)}>LOGIN</Button>
      <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => getBorrowBalance("TEST")}>TEST</Button>
    </GridItem>
  </Grid>
}

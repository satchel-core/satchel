import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../../logo"
import React from "react";
import { SchoolLabel } from "../../components/SchoolLabel";
import { useRouter } from "next/router";
import { handleClick, makeAddress } from "../../utils/common";
import { schoolType } from "../../store/reducers/school_reducer";

const OrgHome = ({ data }) => {
  const router = useRouter();
  const schools : [schoolType] = data.schools

  return <Grid p={3} gap={3}>
    <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
      <HStack>
        <Logo h="20vmin" pointerEvents="none" />
        <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/", router)}>
          LOG OUT
        </Button>
      </HStack>
    </GridItem>
    <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
      <Text fontSize="24px">
        Organization Name
      </Text>
    </GridItem>
    <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
      <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline">ADD NEW SCHOOL</Button>
    </GridItem>

    {schools?.map((value, index) => {
      return <GridItem key={index} rowStart={index + 4} rowEnd={index + 4} colStart={1} colEnd={2}>
        <SchoolLabel school={value} balance="123" />
      </GridItem>
    })}
  </Grid>
}

export async function getServerSideProps(context) {
  const orgAddress = makeAddress(context.query.index)
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/org/getSchools?orgAddress=${orgAddress}`)
  const data = await res.json()

  return { props: { data } }
}

export default OrgHome
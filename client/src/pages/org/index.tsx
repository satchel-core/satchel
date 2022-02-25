import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Logo } from "../../logo"
import React, { FunctionComponent } from "react";
import { SchoolLabel } from "../../components/SchoolLabel";
import { useRouter } from "next/router";
import { handleClick } from "../../utils/common";

const OrgHome = ({ data }) => {
  const router = useRouter();
  const projects = data.projects

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

    {projects.map((value, index) => {
      return <GridItem rowStart={index + 4} rowEnd={index + 4} colStart={1} colEnd={2}>
        <SchoolLabel name={value.name} city="CITY1" country="COUNTRY1" balance={value.targetFunding} id={value._id} />
      </GridItem>
    })}
  </Grid>
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // TODO: change this from localhost
  const res = await fetch(`http://localhost:4000/api/project/allProjects?schoolAddress=0x3a3A6677553Bad5AE99cCDB64e714E54744A4bb3`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

// // This function gets called at build time
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

export default OrgHome
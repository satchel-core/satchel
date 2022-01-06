import {
    Box,
    Text,
    VStack,
    Grid,
    Button,
    HStack,
    Tag,
    Progress,
  } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { Logo } from "../Logo"

export const CreateAccount: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [slide, setSlide] = useState(0);
  switch (page) {
    case 0:
      return <Box textAlign="center">
              <Grid minH="100vh" p={3}>
                <Progress />
                <VStack spacing={2}>
                  <Text fontSize="20px">
                    Onboard Message
                  </Text>
                  <Text fontSize="14px">
                    orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Text>
                  <Logo boxSize={"200px"} />
                  <HStack>
                    <Tag bg={slide === 0 ? "#01afee" : "#edf2f7"} size="sm"></Tag>
                    <Tag bg={slide === 1 ? "#01afee" : "#edf2f7"} size="sm"></Tag>
                    <Tag bg={slide === 2 ? "#01afee" : "#edf2f7"} size="sm"></Tag>
                    <Tag bg={slide === 3 ? "#01afee" : "#edf2f7"} size="sm"></Tag>
                  </HStack>
                  <HStack>
                    <Button isFullWidth size="sm" borderColor="#01afee" color="#01afee" variant="outline" onClick={() => setPage(1)}>Get Started</Button>
                    <Button isFullWidth size="sm" bg="#01afee" color="white" variant="solid" onClick={() => setSlide((slide+1)%4)}>Next</Button>
                  </HStack>
                </VStack>
              </Grid>
            </Box>
    case 1:
      return <Box textAlign="center">
              <Grid minH="100vh" p={3}>
                <Progress value={25}></Progress>
                <VStack spacing={2}>
                  <Logo></Logo>
                  <Text fontSize="20px">
                    Are you an educational organization?
                  </Text>
                  <Button isFullWidth maxW="40vh" size="sm" borderColor="#01afee" color="#01afee" variant="outline" onClick={() => setPage(10)}>Yes</Button>
                  <Button isFullWidth maxW="40vh" size="sm" borderColor="#01afee" color="#01afee" variant="outline" onClick={() => setPage(2)}>No</Button>
                </VStack>
              </Grid>
            </Box>
    case 2:
      return <Box textAlign="center">
              <Grid minH="100vh" p={3}>
                <Progress value={25}></Progress>
                <VStack spacing={2}>
                  <Logo></Logo>
                  <Text fontSize="20px">
                    Are you a community member?
                  </Text>
                  <Button isFullWidth maxW="40vh" size="sm" borderColor="#01afee" color="#01afee" variant="outline" onClick={() => setPage(20)}>Yes</Button>
                  <Button isFullWidth maxW="40vh" size="sm" borderColor="#01afee" color="#01afee" variant="outline" onClick={() => setPage(3)}>No</Button>
                </VStack>
              </Grid>
            </Box>
    default:
      return <Text>Unimplemented page</Text>
  }
}

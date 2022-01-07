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
                  <Text fontSize="20px" fontWeight="bold">
                    Onboard Message
                  </Text>
                  <Text fontSize="14px">
                    orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Text>
                  <Logo boxSize={"200px"} />
                  <HStack>
                    <Tag colorScheme={slide === 0 ? "satchel_blue_notint" : "gray"} size="sm"></Tag>
                    <Tag colorScheme={slide === 1 ? "satchel_blue_notint" : "gray"} size="sm"></Tag>
                    <Tag colorScheme={slide === 2 ? "satchel_blue_notint" : "gray"} size="sm"></Tag>
                    <Tag colorScheme={slide === 3 ? "satchel_blue_notint" : "gray"} size="sm"></Tag>
                  </HStack>
                  <HStack>
                    <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(1)}>Get Started</Button>
                    <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="solid" onClick={() => setSlide((slide+1)%4)}>Next</Button>
                  </HStack>
                </VStack>
              </Grid>
            </Box>
    case 1:
      return <Box textAlign="center">
              <Grid minH="100vh" p={3}>
                <Progress value={25} colorScheme="satchel_blue"></Progress>
                <VStack spacing={2}>
                  <Logo></Logo>
                  <Text fontSize="20px" fontWeight="bold">
                    Are you an educational organization?
                  </Text>
                  <Button isFullWidth maxW="40vh" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(10)}>YES</Button>
                  <Button isFullWidth maxW="40vh" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(2)}>NO</Button>
                </VStack>
              </Grid>
            </Box>
    case 2:
      return <Box textAlign="center">
              <Grid minH="100vh" p={3}>
                <Progress value={25} colorScheme="satchel_blue"></Progress>
                <VStack spacing={2}>
                  <Logo></Logo>
                  <Text fontSize="20px" fontWeight="bold">
                    Are you a community member?
                  </Text>
                  <Button isFullWidth maxW="40vh" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(20)}>YES</Button>
                  <Button isFullWidth maxW="40vh" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(3)}>NO</Button>
                </VStack>
              </Grid>
            </Box>
    default:
      return <Text>Unimplemented page</Text>
  }
}

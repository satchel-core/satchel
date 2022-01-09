import {
    Text,
    VStack,
    Grid,
    Button,
    HStack,
    Tag,
    Progress,
    useToast,
    IconButton,
  } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { To, useNavigate } from "react-router-dom"
import { Logo } from "../Logo"

import { QuestionIcon } from '@chakra-ui/icons'

export const CreateAccount: FunctionComponent = () => {
  let navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }

  const toast = useToast();

  const [page, setPage] = useState(0);
  const [slide, setSlide] = useState(0);
  switch (page) {
    case 0:
      return <Grid minH="40vh" p={3} gap={20}>
                <Button maxW="20vw" size="sm" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/Login")}>SIGN IN</Button>
                <VStack spacing={2}>
                  <Text fontSize="20px" fontWeight="bold">
                    Onboard Message
                  </Text>
                  <Text fontSize="14px" textAlign="center">
                    orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Text>
                  <Logo boxSize={"200px"} />
                  <HStack>
                    <Tag colorScheme={slide === 0 ? "satchel_blue_notint" : "gray"} size="sm"></Tag>
                    <Tag colorScheme={slide === 1 ? "satchel_blue_notint" : "gray"} size="sm"></Tag>
                    <Tag colorScheme={slide === 2 ? "satchel_blue_notint" : "gray"} size="sm"></Tag>
                    <Tag colorScheme={slide === 3 ? "satchel_blue_notint" : "gray"} size="sm"></Tag>
                  </HStack>
                  <HStack minWidth="80vw">
                    <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(1)}>GET STARTED</Button>
                    <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="solid" onClick={() => setSlide((slide+1)%4)}>NEXT</Button>
                  </HStack>
                </VStack>
              </Grid>
    case 1:
      return <Grid minH="40vh" p={3} gap={3}>
                <HStack>
                  <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(0)}>GO BACK</Button>
                  <IconButton size="lg" aria-label="explanation" colorScheme="satchel_blue" icon={<QuestionIcon />} isRound variant="ghost"
                    onClick={() =>
                      toast({
                        title: 'Select if you are representing a school.',
                        status: 'info',
                        duration: 3000,
                        isClosable: true,
                      })
                    }
                  />
                </HStack>
                <Progress value={25} size="1px" colorScheme="satchel_blue"></Progress>
                <VStack spacing={2}>
                  <Logo></Logo>
                  <Text fontSize="20px" fontWeight="bold">
                    Are you an educational organization?
                  </Text>
                  <Button isFullWidth maxW="60vw" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(10)}>YES</Button>
                  <Button isFullWidth maxW="60vw" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(2)}>NO</Button>
                </VStack>
              </Grid>
    case 2:
      return <Grid minH="40vh" p={3} gap={3}>
                <HStack>
                  <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(1)}>GO BACK</Button>
                  <IconButton size="lg" aria-label="explanation" colorScheme="satchel_blue" icon={<QuestionIcon />} isRound variant="ghost"
                    onClick={() =>
                      toast({
                        title: 'idk what goes here',
                        status: 'info',
                        duration: 3000,
                        isClosable: true,
                      })
                    }
                  />
                </HStack>
                <Progress value={25} size="1px" colorScheme="satchel_blue"></Progress>
                <VStack spacing={2}>
                  <Logo></Logo>
                  <Text fontSize="20px" fontWeight="bold">
                    Are you a community member?
                  </Text>
                  <Button isFullWidth maxW="60vw" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(20)}>YES</Button>
                  <Button isFullWidth maxW="60vw" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(3)}>NO</Button>
                </VStack>
              </Grid>
    default:
      return <Text>Unimplemented page</Text>
  }
}

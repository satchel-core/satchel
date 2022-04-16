import {
    Grid,
    Button,
    VStack,
    Text,
    HStack,
    Tag
  } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { Logo } from "../../logo"
import { handleClick } from "../../utils/common";
import { CreateAccPages } from "./CreateAccount"

type CreateAccMainProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const CreateAccMain: FunctionComponent<CreateAccMainProps> = ({setPage}) => {

  const router = useRouter();
  const [slide, setSlide] = useState(0);

  return <Grid minH="40vh" p={3} gap={20}>
            <Button maxW="20vw" size="sm" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/Login", router)}>SIGN IN</Button>
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
                <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(CreateAccPages.IsOrg)}>GET STARTED</Button>
                <Button isFullWidth size="sm" colorScheme="satchel_blue" variant="solid" onClick={() => setSlide((slide+1)%4)}>NEXT</Button>
              </HStack>
            </VStack>
          </Grid>
}

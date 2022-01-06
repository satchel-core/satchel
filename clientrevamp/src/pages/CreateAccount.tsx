import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Button,
    Icon,
    HStack,
    Spacer,
    Tag,
    Progress,
  } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { Logo } from "../Logo"
import { WalletButton } from "../components/WalletButton"
import { Link as RouterLink } from "react-router-dom"

export const CreateAccount: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [slide, setSlide] = useState(0);

  if (page == 0) {
    return <Box textAlign="center">
            <Grid minH="100vh" p={3}>
              <VStack spacing={2}>
                <Text fontSize="20px">
                  Onboard Message
                </Text>
                <Text fontSize="14px">
                orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
                <Logo boxSize={"200px"} />
                <HStack>
                  <Tag bg={slide == 0 ? "#01afee" : "#edf2f7"} size="sm"></Tag>
                  <Tag bg={slide == 1 ? "#01afee" : "#edf2f7"} size="sm"></Tag>
                  <Tag bg={slide == 2 ? "#01afee" : "#edf2f7"} size="sm"></Tag>
                  <Tag bg={slide == 3 ? "#01afee" : "#edf2f7"} size="sm"></Tag>
                </HStack>
                <HStack>
                  <Button isFullWidth size="sm" borderColor="#01afee" color="#01afee" variant="outline" onClick={() => setPage(1)}>Get Started</Button>
                  <Button isFullWidth size="sm" bg="#01afee" color="white" variant="solid" onClick={() => setSlide((slide+1)%4)}>Next</Button>
                </HStack>
              </VStack>
            </Grid>
          </Box>
  } else {
    return <Box textAlign="center">
            <Grid minH="100vh" p={3}>
              <VStack spacing={2}>
                <Text fontSize="20px">
                  hi
                </Text>
              </VStack>
            </Grid>
          </Box>
  }
}
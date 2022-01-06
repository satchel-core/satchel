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
  } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { Logo } from "../Logo"
import { WalletButton } from "./WalletButton"

export const Login: FunctionComponent = () => <Box textAlign="center">
                                                <Grid minH="100vh" p={3}>
                                                  <VStack spacing={2}>
                                                    <Logo h="20vmin" pointerEvents="none" />
                                                    <Box borderWidth="1px" borderRadius="md" borderColor="black" padding="5px">
                                                      <VStack spacing={2}>
                                                        <Text fontSize="16px">
                                                          Connect to Wallet
                                                        </Text>
                                                        <WalletButton walletName="MetaMask" />
                                                        <WalletButton walletName="Coinbase" />
                                                        <WalletButton walletName="Portis" />
                                                        <WalletButton walletName="WalletConnect" />
                                                      </VStack>
                                                    </Box>
                                                    <Text fontSize="12px">
                                                      New? <Link color="#01afee">Create Account</Link>
                                                    </Text>
                                                  </VStack>
                                                </Grid>
                                              </Box>
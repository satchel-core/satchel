import {
    Box,
    Text,
    Link,
    VStack,
    Grid,
    Progress,
  } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { Logo } from "../Logo"
import { WalletButton } from "../components/WalletButton"
import { Link as RouterLink } from "react-router-dom"

export const Login: FunctionComponent = () => <Box textAlign="center">
                                                <Grid minH="100vh" p={3}>
                                                  <Progress />
                                                  <VStack spacing={2}>
                                                    <Logo h="20vmin" pointerEvents="none" />
                                                    <Box borderWidth="1px" borderRadius="md" borderColor="black" padding="5px">
                                                      <VStack spacing={2}>
                                                        <Text fontSize="16px" fontWeight="bold">
                                                          Connect to Wallet
                                                        </Text>
                                                        <WalletButton walletName="MetaMask" />
                                                        <WalletButton walletName="Coinbase" />
                                                        <WalletButton walletName="Portis" />
                                                        <WalletButton walletName="WalletConnect" />
                                                      </VStack>
                                                    </Box>
                                                    <Text fontSize="12px">
                                                      New? <Link as={RouterLink} to="/CreateAccount" color="#01afee">Create Account</Link>
                                                    </Text>
                                                  </VStack>
                                                </Grid>
                                              </Box>

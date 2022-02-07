import {
    Box,
    Text,
    Link,
    VStack,
    Grid,
    GridItem,
  } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { Logo } from "../Logo"
import { WalletButton } from "../components/WalletButton"
import { Link as RouterLink } from "react-router-dom"

export const Login: FunctionComponent = () => <Grid p={3} gridTemplateRows="27vh auto">
                                                <GridItem rowStart={2} rowEnd={3}>
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
                                                    <Text fontSize="12px" fontWeight="bold">
                                                      New? <Link as={RouterLink} to="/CreateAccount" color="satchel_blue.500">Create Account</Link>
                                                    </Text>
                                                  </VStack>
                                                </GridItem>
                                              </Grid>

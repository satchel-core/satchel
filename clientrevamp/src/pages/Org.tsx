import {
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
  Tag,
} from "@chakra-ui/react"
import { Logo } from "../Logo"
import { FunctionComponent, useState } from "react";
import { SchoolLabel } from "../components/SchoolLabel";
import { OrganizationMenu } from "../components/OrganizationMenu";
import { To, useNavigate } from "react-router-dom"
import { TokenLabel } from "../components/TokenLabel";
import { TransactionLabel } from "../components/TransactionLabel";
import { ProjectLabel } from "../components/ProjectLabel";

export const Org: FunctionComponent = () => {
  const navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }

  const [page, setPage] = useState(0);
  const [school, setSchool] = useState("");
  switch (page) {
    case 0:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <Button size="sm" colorScheme="satchel_blue" variant="outline" onClick={handleClick("/")}>
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
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <SchoolLabel name="School A" city="CITY1" country="COUNTRY1" balance="1,234" setPage={setPage} setSchool={setSchool} />
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <SchoolLabel name="School B" city="CITY2" country="COUNTRY2" balance="2,345" setPage={setPage} setSchool={setSchool} />
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <SchoolLabel name="School C" city="CITY3" country="COUNTRY3" balance="3,456" setPage={setPage} setSchool={setSchool} />
                </GridItem>
                <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                  <SchoolLabel name="School D" city="CITY4" country="COUNTRY4" balance="4,567" setPage={setPage} setSchool={setSchool} />
                </GridItem>
              </Grid>
    case 1:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={setPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(0)}>RETURN TO ORGANIZATION</Button>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Text fontSize="24px">
                    {school}
                  </Text>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    CURRENT BALANCE
                  </Text>
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <Text fontSize="48px">
                    $9,999
                  </Text>
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(10)}>WITHDRAW MONEY</Button>
                </GridItem>
                <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                  <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(20)}>DEPOSIT MONEY</Button>
                </GridItem>
                <GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    TOKENS HELD
                  </Text>
                </GridItem>
                <GridItem rowStart={9} rowEnd={9} colStart={1} colEnd={2}>
                  <TokenLabel name="BITCOIN" amount="80.00"></TokenLabel>
                </GridItem>
                <GridItem rowStart={10} rowEnd={10} colStart={1} colEnd={2}>
                  <TokenLabel name="DAI" amount="761.3"></TokenLabel>
                </GridItem>
                <GridItem rowStart={11} rowEnd={11} colStart={1} colEnd={2}>
                  <TokenLabel name="TETHER" amount="16.36"></TokenLabel>
                </GridItem>
                <GridItem rowStart={12} rowEnd={12} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    TRANSACTION HISTORY
                  </Text>
                </GridItem>
                <GridItem rowStart={13} rowEnd={13} colStart={1} colEnd={2}>
                  <TransactionLabel heading="Transfer from <Donor>" delta="+20.00 BTC" date="January 1, 2022"></TransactionLabel>
                </GridItem>
                <GridItem rowStart={14} rowEnd={14} colStart={1} colEnd={2}>
                  <TransactionLabel heading="Initial Deposit" delta="+60.00 BTC" date="December 1, 2021"></TransactionLabel>
                </GridItem>
              </Grid>
    case 2:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={setPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Text fontSize="24px">
                    {school}
                  </Text>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    COMMUNITY MEMBERS
                  </Text>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <Grid templateColumns="1fr 1fr 1fr" gap={2}>
                    <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Darya Kaviani</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Ritik Batra</Tag>
                    <Tag colorScheme="satchel_blue" variant="solid">Timothy Guo</Tag>
                  </Grid>
                </GridItem>
              </Grid>
    case 3:
      return <Grid p={3} gap={3}>
                <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
                  <HStack>
                    <Logo h="20vmin" pointerEvents="none" />
                    <OrganizationMenu setPage={setPage}/>
                  </HStack>
                </GridItem>
                <GridItem rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
                  <Button size="sm" minW="40vw" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(30)}>PROPOSE PROJECT</Button>
                </GridItem>
                <GridItem rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    PENDING PROJECTS
                  </Text>
                </GridItem>
                <GridItem rowStart={4} rowEnd={4} colStart={1} colEnd={2}>
                  <ProjectLabel name="Project A" status="PROPOSED" moneyStatus="Budget: $9,999" likes={6} />
                </GridItem>
                <GridItem rowStart={5} rowEnd={5} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    CURRENT PROJECTS
                  </Text>
                </GridItem>
                <GridItem rowStart={6} rowEnd={6} colStart={1} colEnd={2}>
                  <ProjectLabel name="Project B" status="IN PROGRESS" moneyStatus="Raised $1,234 of $5,678" likes={15} />
                </GridItem>
                <GridItem rowStart={7} rowEnd={7} colStart={1} colEnd={2}>
                  <Text fontSize="12px">
                    REVIEWED PROJECTS
                  </Text>
                </GridItem>
                <GridItem rowStart={8} rowEnd={8} colStart={1} colEnd={2}>
                  <ProjectLabel name="Project C" status="REJECTED" moneyStatus="Budget: $10,000" likes={0} />
                </GridItem>
              </Grid>
    default:
      return <Text>Unimplemented page</Text>
  }
}

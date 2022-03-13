import {
    Grid,
    Button,
    VStack,
    Text,
    HStack,
    IconButton,
    Progress,
    useToast,
  } from "@chakra-ui/react"
import { FunctionComponent } from "react";
import { Logo } from "../../logo"
import { CreateAccPages } from "./CreateAccount"
import { QuestionIcon } from '@chakra-ui/icons'

type CreateAccIsOrgProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const CreateAccIsOrg: FunctionComponent<CreateAccIsOrgProps> = ({setPage}) => {
  const toast = useToast();
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
      <Button isFullWidth maxW="60vw" size="sm" colorScheme="satchel_blue" variant="outline" onClick={() => setPage(CreateAccPages.IsCommunity)}>NO</Button>
  </VStack>
  </Grid>
}

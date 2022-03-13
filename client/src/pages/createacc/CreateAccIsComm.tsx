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
import { QuestionIcon } from '@chakra-ui/icons'

type CreateAccIsCommProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const CreateAccIsComm: FunctionComponent<CreateAccIsCommProps> = ({setPage}) => {
  const toast = useToast();
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
}
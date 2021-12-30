import { IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { AiOutlineMedium, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <VStack
      alignItems="center"
      as="footer"
      backgroundColor="#4A585E"
      color="white"
      height="180px"
      justifyContent="center"
      spacing={4}
      textAlign="center"
    >
      <Stack mt={4} direction="row" spacing="12px" justify="center">
        <IconButton
          variant="outline"
          colorScheme="white"
          aria-label="medium"
          size="lg"
          icon={<AiOutlineMedium />}
        />
        <IconButton
          variant="outline"
          colorScheme="white"
          aria-label="twitter"
          size="lg"
          icon={<AiOutlineTwitter />}
        />
      </Stack>
      <Text>© Satchel, 2021</Text>
    </VStack>
  )
}

export default Footer

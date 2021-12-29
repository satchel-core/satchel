import { Stack, Text, VStack } from '@chakra-ui/react'

const Footer = () => {
  return (
    <VStack
      alignItems="center"
      as="footer"
      backgroundColor="#4A585E"
      color="white"
      spacing={4}
      justifyContent="center"
      height="180px"
      textAlign="center"
    >
      <Stack mt={4} direction="row" spacing="12px" justify="center">
        <Text color="white">M</Text>
      </Stack>
      <Text>© Satchel, 2021</Text>
    </VStack>
  )
}

export default Footer

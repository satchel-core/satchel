import { Link, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
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
      <Text>Proudly made by &#x1F43B; in Berkeley, CA</Text>
      <Stack mt={4} direction="row" spacing="12px" justify="center">
        <Link href="https://medium.com/satchel-finance" isExternal>
          <IconButton
            variant="outline"
            colorScheme="white"
            aria-label="medium"
            size="lg"
            icon={<AiOutlineMedium />}
          />
        </Link>
        <Link href="https://twitter.com/satchelfinance" isExternal>
          <IconButton
            variant="outline"
            colorScheme="white"
            aria-label="twitter"
            size="lg"
            icon={<AiOutlineTwitter />}
          />
        </Link>
      </Stack>
    </VStack>
  )
}

export default Footer

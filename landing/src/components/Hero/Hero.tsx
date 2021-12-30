import {
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'
import { FiMail } from 'react-icons/fi'

const Hero = () => {
  return (
    <Flex>
      <Box direction="flex">
        <Stack direction="column" spacing={6}>
          <chakra.h1
            bgGradient="linear(to-l, #FFB5AA 30%, #01AFEE)"
            bgClip="text"
            maxW="12ch"
            fontSize={{ base: '1.25rem', sm: '2rem', lg: '3rem' }}
            fontFamily="heading"
            letterSpacing="tighter"
            fontWeight="extrabold"
            lineHeight="1.2"
          >
            Agency through crypto, education, &amp; community.
          </chakra.h1>
          <Text
            maxW="560px"
            fontSize={{ base: 'lg', lg: 'xl' }}
            fontWeight="medium"
          >
            Satchel uplifts underbanked school communities by facilitating
            locally-governed projects &amp; bootstrapping capital through
            DeFi-powered donations &amp; financial primitives.
          </Text>
          <Flex align="center">
            <InputGroup mr={1} width="50%">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiMail} color="gray.300" />}
              />
              <Input type="email" variant="filled" placeholder="Email" />
            </InputGroup>
            <Button backgroundColor="#01AFEE" color="white">
              Join Waitlist
            </Button>
          </Flex>
        </Stack>
      </Box>
      <Box alignSelf="center" direction="flex" flex={1}>
        <Player
          autoplay
          loop
          src="https://assets9.lottiefiles.com/packages/lf20_l7w71b5b.json"
          style={{ height: '100%' }}
        />
      </Box>
    </Flex>
  )
}

export default Hero

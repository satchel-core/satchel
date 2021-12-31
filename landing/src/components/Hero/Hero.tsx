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
import { useState } from 'react'
import { FiMail } from 'react-icons/fi'

import useAirtable from '../../hooks/useAirtable'

const Hero = () => {
  const { onAddEmail } = useAirtable()
  const [email, setEmail] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <Flex direction={{ sm: 'column', md: 'row' }}>
      <Flex mx="auto" mb={12}>
        <Stack direction="column" spacing={6}>
          <chakra.h1
            bgGradient="linear(to-l, #FFB5AA 30%, #01AFEE)"
            bgClip="text"
            maxW="12ch"
            fontSize={{ base: '2.25rem', lg: '3rem' }}
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
            locally-governed projects &amp; capital growth via DeFi-powered
            donations &amp; financial primitives.
          </Text>
          <Flex align="center">
            <InputGroup mr={1} width="50%">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiMail} color="gray.300" />}
              />
              <Input
                value={email}
                onChange={handleChange}
                type="email"
                variant="filled"
                placeholder="Email"
              />
            </InputGroup>
            <Button
              backgroundColor="#01AFEE"
              color="white"
              onClick={() => onAddEmail(email)}
            >
              Join Waitlist
            </Button>
          </Flex>
        </Stack>
      </Flex>
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

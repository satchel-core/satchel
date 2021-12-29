import { chakra, Flex, Text } from '@chakra-ui/react'

const Hero = () => {
  return (
    <Flex>
      <chakra.div>
        <chakra.h1
          maxW="16ch"
          // mx="auto"
          fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
          fontFamily="heading"
          letterSpacing="tighter"
          fontWeight="extrabold"
          mb="16px"
          lineHeight="1.2"
        >
          Agency through crypto, education, &amp; community.
        </chakra.h1>
        <Text maxW="560px" fontSize={{ base: 'lg', lg: 'xl' }} mt="6">
          Satchel uplifts underbanked school communities by facilitating
          locally-governed projects &amp; bootstrapping capital through
          DeFi-powered donations &amp; financial primitives.
        </Text>
      </chakra.div>
    </Flex>
  )
}

export default Hero

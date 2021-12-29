import { Box, chakra, Flex, Text } from '@chakra-ui/react'

import { ReactComponent as HeroBlob } from '../../assets/svg/hero.svg'

const Hero = () => {
  return (
    <Flex>
      <Box direction="flex" flex={2}>
        <chakra.div>
          <chakra.h1
            bgGradient="linear(to-l, #FFB5AA, #01AFEE)"
            bgClip="text"
            maxW="16ch"
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
      </Box>
      <Box direction="flex" flex={1}>
        <HeroBlob />
      </Box>
    </Flex>
  )
}

export default Hero

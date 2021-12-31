import { useEffect, useRef, useState } from 'react'
import { Fade, Box, chakra, SimpleGrid } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'

import Solution0 from '../../assets/png/solutions0.png'
import Solution1 from '../../assets/png/solutions1.png'
import Solution2 from '../../assets/png/solutions2.png'
import Solution3 from '../../assets/png/solutions3.png'

import Card from './components/Card'
import useOnScreen from '../../hooks/useOnScreen'

const cardText = [
  'Splits yield between individuals & schools for  socioeconomic mobility',
  'Governance over Satchel-wide decisions & locally-funded school projects',
  'Savings accounts & loans for underbanked school communities via key DeFi protocols',
  'Tax-deductible contributions to school communities in need around the world',
]

const Solutions = () => {
  const ref: any = useRef<HTMLDivElement>()
  const [show, setShow] = useState(false)
  const onScreen = useOnScreen<HTMLDivElement>(ref, '-200px')

  useEffect(() => {
    if (onScreen) {
      setShow(true)
    }
  }, [onScreen])

  return (
    <Fade in={show}>
      <Box maxW="760px" mx="auto" ref={ref} textAlign="center" mb="36px">
        <chakra.h2
          textStyle="heading"
          fontSize={{ base: '2.25rem', lg: '3rem' }}
          fontFamily="heading"
          letterSpacing="tighter"
          fontWeight="bold"
          lineHeight="1.2"
        >
          Core Features
        </chakra.h2>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box position="relative">
          <Box
            position="absolute"
            display={{ base: 'none', md: 'inline' }}
            top={-20}
            zIndex={2}
          >
            <Player
              autoplay
              loop
              src="https://assets8.lottiefiles.com/packages/lf20_50gmpyjw.json"
              style={{ height: '100px' }}
            />
          </Box>
          <Card image={Solution0}>{cardText[0]}</Card>
        </Box>
        <Card image={Solution1}>{cardText[1]}</Card>
        <Card image={Solution2}>{cardText[2]}</Card>
        <Box position="relative">
          <Box
            position="absolute"
            bottom={0}
            display={{ base: 'none', md: 'inline' }}
            right="-65px"
            zIndex={2}
          >
            <Player
              autoplay
              loop
              src="https://assets4.lottiefiles.com/packages/lf20_y0gnebqg.json"
              style={{ height: '100px' }}
            />
          </Box>
          <Card image={Solution3}>{cardText[3]}</Card>
        </Box>
      </SimpleGrid>
    </Fade>
  )
}

export default Solutions

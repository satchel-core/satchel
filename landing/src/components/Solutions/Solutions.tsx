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
          maxW="16ch"
          fontSize={{ base: '1.25rem', sm: '2rem', lg: '3rem' }}
          fontFamily="heading"
          letterSpacing="tighter"
          fontWeight="bold"
          lineHeight="1.2"
        >
          Core Values
        </chakra.h2>
      </Box>
      <SimpleGrid columns={2} spacing={10}>
        <Box position="relative">
          <Box position="absolute" top={-20} zIndex={2}>
            <Player
              autoplay
              loop
              src="https://assets3.lottiefiles.com/packages/lf20_xtct6zai.json"
              style={{ height: '100px' }}
            />
          </Box>
          <Card image={Solution0}>{cardText[0]}</Card>
        </Box>
        <Box position="relative">
          <Card image={Solution1}>{cardText[1]}</Card>
        </Box>
        <Card image={Solution2}>{cardText[2]}</Card>
        <Card image={Solution3}>{cardText[3]}</Card>
      </SimpleGrid>
    </Fade>
  )
}

export default Solutions

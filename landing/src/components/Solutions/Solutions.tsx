import { useEffect, useRef, useState } from 'react'
import { Box, chakra, Fade, SimpleGrid } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'
import ismobilejs from 'ismobilejs'

import Solution0 from '../../assets/png/solutions0.png'
import Solution1 from '../../assets/png/solutions1.png'
import Solution2 from '../../assets/png/solutions2.png'
import Solution3 from '../../assets/png/solutions3.png'
import useOnScreen from '../../hooks/useOnScreen'
import Card from './components/Card'

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

  const isMobile = ismobilejs(window.navigator).any

  useEffect(() => {
    if (onScreen) {
      setShow(true)
    }
  }, [onScreen])

  return (
    <Fade in={show || isMobile}>
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
            display={{ base: 'none', md: 'inline' }}
            left="-10pxpx"
            position="absolute"
            top="-81px"
            width="100px"
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
        <Box position="relative">
          <Card image={Solution1}>{cardText[1]}</Card>
        </Box>
        <Box position="relative">
          <Card image={Solution2}>{cardText[2]}</Card>
        </Box>
        <Box position="relative">
          <Box
            bottom={0}
            display={{ base: 'none', md: 'inline' }}
            position="absolute"
            right="-82px"
            width="100px"
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

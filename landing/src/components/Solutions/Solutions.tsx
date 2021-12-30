import { Box, chakra, SimpleGrid } from '@chakra-ui/react'

import Solution0 from '../../assets/png/solutions0.png'
import Solution1 from '../../assets/png/solutions1.png'
import Solution2 from '../../assets/png/solutions2.png'
import Solution3 from '../../assets/png/solutions3.png'

import Card from './components/Card'

const cardText = [
  'Splits yield between individuals & schools for individual & local socioeconomic mobility',
  'Enables community governance over Satchel-wide decisions & locally-funded school projects',
  'Savings accounts & loans for underbanked school communities via key DeFi protocols',
  'Tax-deductible contributions to school communities in need around the world',
]

const Solutions = () => {
  return (
    <>
      <Box maxW="760px" mx="auto" textAlign="center" mb="36px">
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
        <Card image={Solution0}>{cardText[0]}</Card>
        <Card image={Solution1}>{cardText[1]}</Card>
        <Card image={Solution2}>{cardText[2]}</Card>
        <Card image={Solution3}>{cardText[3]}</Card>
      </SimpleGrid>
    </>
  )
}

export default Solutions

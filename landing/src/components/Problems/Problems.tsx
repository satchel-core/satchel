import { chakra, Flex, Heading, Text } from '@chakra-ui/react'
import { FiGlobe, FiUser, FiUsers } from 'react-icons/fi'

import Row from './components/Row'

const Problems = () => {
  return (
    <Flex>
      <chakra.div>
        <Heading>
          Communities around the world lack trusted financial primitives and
          governance models
        </Heading>
        <Text maxW="560px" fontSize={{ base: 'lg', lg: 'xl' }} mt="6">
          Satchel uplifts underbanked school communities by facilitating
          locally-governed projects &amp; bootstrapping capital through
          DeFi-powered donations &amp; financial primitives.
        </Text>
        <Row
          RowIcon={FiUser}
          text={`Lack of trusted banks & hyperinflation restrict individual financial agency.`}
        />
        <Row
          RowIcon={FiUsers}
          text={`Governments limit individual agency in community decision-making.`}
        />
        <Row
          RowIcon={FiGlobe}
          text={`Bureaucratic financial & educational infrastructure deny users agency.`}
        />
      </chakra.div>
    </Flex>
  )
}

export default Problems

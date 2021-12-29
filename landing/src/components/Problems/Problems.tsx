import { Box, chakra, Flex, Heading, Text } from '@chakra-ui/react'
import { FiGlobe, FiUser, FiUsers } from 'react-icons/fi'

import { ReactComponent as ProblemBlob } from '../../assets/svg/problems.svg'

import Row from './components/Row'

const Problems = () => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Box direction="flex" flex={1} mr="24px">
        <ProblemBlob />
      </Box>
      <Box direction="flex" flex={2}>
        <div>
          <Heading size="lg">
            Communities around the world lack trusted financial primitives and
            governance models
          </Heading>
          <Row
            RowIcon={FiUser}
            text={`Lack of trusted banks & hyperinflation restrict individual financial agency.`}
            title="Individual"
          />
          <Row
            RowIcon={FiUsers}
            text={`Governments limit individual agency in community decision-making.`}
            title="Local"
          />
          <Row
            RowIcon={FiGlobe}
            text={`Bureaucratic financial & educational infrastructure deny users agency.`}
            title="Global"
          />
        </div>
      </Box>
    </Flex>
  )
}

export default Problems

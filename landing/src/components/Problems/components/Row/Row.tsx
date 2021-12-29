import { chakra, Flex, Icon, Heading, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface RowProps {
  RowIcon: IconType
  text: string
  title: string
}

const Row: React.FC<RowProps> = ({ RowIcon, text, title }) => {
  return (
    <Flex align="center">
      <Icon as={RowIcon} h={20} w={20} />
      <chakra.div ml="24px">
        <Heading as="h4" size="lg">
          {title}
        </Heading>

        <Text maxW="560px" fontSize={{ base: 'lg', lg: 'xl' }}>
          {text}
        </Text>
      </chakra.div>
    </Flex>
  )
}

export default Row

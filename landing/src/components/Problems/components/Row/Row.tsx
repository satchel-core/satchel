import { Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface RowProps {
  RowIcon: IconType
  text: string
}

const Row: React.FC<RowProps> = ({ RowIcon, text }) => {
  return (
    <Flex align="center" justify="space-between">
      <Icon as={RowIcon} h={20} w={20} />
      <Text maxW="560px" fontSize={{ base: 'lg', lg: 'xl' }}>
        {text}
      </Text>
    </Flex>
  )
}

export default Row

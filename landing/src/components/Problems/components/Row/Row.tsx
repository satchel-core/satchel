import { Image, chakra, Flex, Icon, Heading, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface RowProps {
  image: string
  text: string
  title: string
}

const Row: React.FC<RowProps> = ({ image, text, title }) => {
  return (
    <Flex align="center">
      <Image alt={title} height="48px" src={image} />
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

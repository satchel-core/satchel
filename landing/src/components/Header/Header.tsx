import { Box, chakra, Container, Flex } from '@chakra-ui/react'

import { ReactComponent as SatchelLogo } from '../../assets/svg/satchel-logo.svg'
import { ReactComponent as MediumLogo } from '../../assets/svg/medium-logo.svg'
import { ReactComponent as TwitterLogo } from '../../assets/svg/twitter-logo.svg'

interface Props {}

const Header = (props: Props) => {
  return (
    <chakra.header
      backgroundColor="white"
      left="0"
      pt="12px"
      right="0"
      top="0"
      transition="box-shadow 0.2s, background-color 0.2s"
      width="full"
      zIndex="3"
    >
      <Container maxW="container.lg">
        <Flex align="center" justify="space-between">
          <SatchelLogo height={64} />
          <Flex>
            <Box cursor="pointer" _hover={{ opacity: 0.75 }}>
              <MediumLogo height={48} />
            </Box>
            <Box cursor="pointer" _hover={{ opacity: 0.75 }}>
              <TwitterLogo height={48} />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </chakra.header>
  )
}

export default Header

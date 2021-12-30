import {
  IconButton,
  Box,
  chakra,
  Container,
  Flex,
  Link,
} from '@chakra-ui/react'

import { ReactComponent as SatchelLogo } from '../../assets/svg/satchel-logo.svg'

import { AiOutlineMedium, AiOutlineTwitter } from 'react-icons/ai'

const Header = () => {
  return (
    <chakra.header
      backgroundColor="white"
      left="0"
      pt="48px"
      right="0"
      top="0"
      transition="box-shadow 0.2s, background-color 0.2s"
      width="full"
      zIndex="3"
    >
      <Container maxW="container.lg">
        <Flex align="center" justify="space-between">
          <Link href="https://satchel.finance/">
            <SatchelLogo height={64} />
          </Link>
          <Flex>
            <Link href="https://medium.com/satchel-finance" isExternal>
              <IconButton
                borderColor="#01AFEE"
                color="#01AFEE"
                variant="outline"
                aria-label="medium"
                size="lg"
                icon={<AiOutlineMedium />}
                mr={3}
              />
            </Link>
            <Link href="https://twitter.com/satchelfinance" isExternal>
              <IconButton
                borderColor="#01AFEE"
                color="#01AFEE"
                variant="outline"
                aria-label="twitter"
                size="lg"
                icon={<AiOutlineTwitter />}
              />
            </Link>
          </Flex>
        </Flex>
      </Container>
    </chakra.header>
  )
}

export default Header

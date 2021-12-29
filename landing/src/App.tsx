import { Box, ChakraProvider, Container, theme } from '@chakra-ui/react'

import CTA from './components/CTA'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solutions from './components/Solutions'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box mb={20}>
      <Box as="section" pt="6rem" pb="96px">
        <Container centerContent maxW="container.xl">
          <Hero />
        </Container>
      </Box>
      <Box as="section" pt="48px" pb="96px">
        <Container centerContent maxW="container.xl">
          <Problems />
        </Container>
      </Box>
      <Box as="section" pt="48px" pb="96px">
        <Container>
          <Solutions />
        </Container>
      </Box>
      <Box as="section" pt="48px">
        <Container>
          <CTA />
        </Container>
      </Box>
    </Box>
    <Box as="footer">
      <Footer />
    </Box>
  </ChakraProvider>
)

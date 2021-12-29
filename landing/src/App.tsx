import { Box, ChakraProvider, Container, theme } from '@chakra-ui/react'

import CTA from './components/CTA'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solutions from './components/Solutions'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <Box mb={20}>
      <Box as="section" pt="6rem" pb="96px">
        <Container maxW="container.lg">
          <Hero />
        </Container>
      </Box>
      <Box as="section" pt="48px" pb="96px">
        <Container maxW="container.lg">
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

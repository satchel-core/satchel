import { useEffect } from 'react'
import { Box, ChakraProvider, Container, useColorMode } from '@chakra-ui/react'
import '@fontsource/inter/800.css'
import '@fontsource/inter/400.css'

import theme from './theme'

import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Problems from '../components/Problems'
import Solutions from '../components/Solutions'

const App = () => (
  <ChakraProvider theme={theme}>
    <Inner />
  </ChakraProvider>
)

const Inner = () => {
  const { colorMode, setColorMode } = useColorMode()

  useEffect(() => {
    if (colorMode === 'dark') setColorMode('light')
  }, [])
  return (
    <>
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
          <Container centerContent>
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
    </>
  )
}

export default App

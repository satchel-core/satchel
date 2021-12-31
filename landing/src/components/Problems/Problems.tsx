import { useEffect, useRef, useState } from 'react'
import { chakra, Fade, Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'

import useOnScreen from '../../hooks/useOnScreen'

import GlobalIcon from '../../assets/png/global.png'
import IndividualIcon from '../../assets/png/individual.png'
import LocalIcon from '../../assets/png/local.png'

import Row from './components/Row'

const Problems = () => {
  const ref: any = useRef<HTMLDivElement>()
  const [show, setShow] = useState(false)
  const onScreen = useOnScreen<HTMLDivElement>(ref, '-200px')

  useEffect(() => {
    if (onScreen) {
      setShow(true)
    }
  }, [onScreen])

  return (
    <Fade in={show}>
      <Flex
        alignItems="center"
        direction={{ base: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        ref={ref}
      >
        <Box alignSelf="center" direction="flex" flex={1} mx="auto">
          <Player
            autoplay
            loop
            src="https://assets7.lottiefiles.com/packages/lf20_wrkvuuof.json"
            style={{ height: '100%' }}
          />
        </Box>
        <Box
          direction="flex"
          margin={{ base: '0 auto 36px', md: '0 0 0 84px' }}
        >
          <Stack direction="column" maxW="560px" spacing={6}>
            <Heading mb="12px" size="lg">
              Communities around the world lack trusted financial primitives and
              governance models
            </Heading>
            <Row
              image={IndividualIcon}
              text={`Lack of trusted banks & hyperinflation restrict individual financial agency.`}
              title="Individual"
            />
            <Row
              image={LocalIcon}
              text={`Governments limit individual agency in community decision-making.`}
              title="Local"
            />
            <Row
              image={GlobalIcon}
              text={`Bureaucratic financial & educational infrastructure deny users agency.`}
              title="Global"
            />
          </Stack>
        </Box>
      </Flex>
    </Fade>
  )
}

export default Problems

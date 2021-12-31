import { Button, Center, Fade } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'
import { useEffect, useRef, useState } from 'react'

import useOnScreen from '../../hooks/useOnScreen'

const CTA = () => {
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
      <div ref={ref}>
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_ek8lrpx4.json"
          style={{ height: '200px' }}
        />
        <Center flexDirection="column">
          <Button
            as="a"
            href="mailto:contact@satchel.finance"
            borderColor="#01AFEE"
            color="#01AFEE"
            mt="48px"
            variant="outline"
          >
            Contact Us
          </Button>
        </Center>
      </div>
    </Fade>
  )
}

export default CTA

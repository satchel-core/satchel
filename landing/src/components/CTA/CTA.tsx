import { Button, Center } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'

const CTA = () => {
  return (
    <>
      <Player
        autoplay
        loop
        src="https://assets3.lottiefiles.com/packages/lf20_kl1ksggn.json"
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
    </>
  )
}

export default CTA
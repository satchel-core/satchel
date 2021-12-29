import { Button, Center, chakra, Flex, Heading, Text } from '@chakra-ui/react'

import { ReactComponent as CTABlob } from '../../assets/svg/cta.svg'

const CTA = () => {
  return (
    <Center flexDirection="column">
      <CTABlob />
      <Button mt="48px">Contact Us</Button>
    </Center>
  )
}

export default CTA

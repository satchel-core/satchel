import { Box, Center, chakra, Flex, Text } from '@chakra-ui/react'

const Solutions = () => {
  return (
    <>
      <Flex justifyContent="space-around" width="100%">
        <chakra.div
          backgroundColor="blue.300"
          borderRadius={96}
          cursor="pointer"
          height={24}
          width={24}
          _hover={{
            opacity: 0.5,
          }}
        />
        <chakra.div
          backgroundColor="blue.300"
          borderRadius={96}
          cursor="pointer"
          height={24}
          width={24}
          _hover={{
            opacity: 0.5,
          }}
        />
        <chakra.div
          backgroundColor="blue.300"
          borderRadius={96}
          cursor="pointer"
          height={24}
          width={24}
          _hover={{
            opacity: 0.5,
          }}
        />
        <chakra.div
          backgroundColor="blue.300"
          borderRadius={96}
          cursor="pointer"
          height={24}
          width={24}
          _hover={{
            opacity: 0.5,
          }}
        />
      </Flex>
      <Box
        position={'relative'}
        height={'300px'}
        rounded={'2xl'}
        boxShadow={'2xl'}
        width={'full'}
        overflow={'hidden'}
      >
        <Center height="100%" padding="60px" textAlign="center">
          <Text
            maxW="560px"
            fontSize={{ base: 'xl', lg: '2xl' }}
            fontWeight="bold"
          >
            Splits yield between individuals &amp; schools for individual &amp;
            local socioeconomic mobility
          </Text>
        </Center>
      </Box>
    </>
  )
}

export default Solutions

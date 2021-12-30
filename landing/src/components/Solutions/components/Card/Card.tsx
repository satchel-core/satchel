import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

import useHover from '../../../../hooks/useHover'

interface CardProps {
  title?: string
  image: string
}

const Card: React.FC<CardProps> = ({ title, image, children, ...props }) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  return (
    <Box
      backgroundColor="white"
      bg="gray.100"
      p="40px"
      position="relative"
      ref={hoverRef}
      rounded="12px"
      shadow="base"
      _before={
        isHovered
          ? {
              content: '""',
              position: 'absolute',
              zIndex: '-1',
              height: 'full',
              maxW: '640px',
              width: 'full',
              filter: 'blur(40px)',
              transform: 'scale(0.98)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              top: 0,
              left: 0,
              backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
            }
          : {}
      }
    >
      <Image alt="tax" boxSize={16} src={image} />
      <Text fontSize="lg" mt="12px" opacity={0.7}>
        {children}
      </Text>
    </Box>
  )
}

export default Card

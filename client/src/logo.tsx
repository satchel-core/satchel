import {
    chakra,
    ImageProps,
    forwardRef,
  } from "@chakra-ui/react"
  
  export const Logo = forwardRef<ImageProps, "img">((props, ref) => {

    const logo = "/assets/satchel_tile.png";
  
    return <chakra.img src={logo} ref={ref} {...props} />
  })
  
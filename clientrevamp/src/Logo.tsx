import * as React from "react"
import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef,
  usePrefersReducedMotion,
} from "@chakra-ui/react"
import logo from "./logo.svg"

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {

  return <chakra.img src={logo} ref={ref} {...props} />
})

import {
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  IconButton
} from "@chakra-ui/react"
import { FunctionComponent } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { handleClick } from "../utils/common";
import { useRouter } from "next/router";

export const ComMemMenu = () => {
  const router = useRouter();

  return <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon></HamburgerIcon>} />
            <MenuList>
              <MenuItem onClick={handleClick("/com", router)}>Home</MenuItem>
              <MenuItem onClick={handleClick("/projects", router)}>Projects</MenuItem>
              <MenuItem onClick={handleClick("/loans", router)}>Loans</MenuItem>
              <MenuItem onClick={handleClick("/", router)}>Log Out</MenuItem>
            </MenuList>
          </Menu>
}
  
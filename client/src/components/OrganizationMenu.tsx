import {
    MenuButton,
    MenuList,
    MenuItem,
    Menu,
    IconButton
  } from "@chakra-ui/react"
  import { FunctionComponent } from "react";
  import { HamburgerIcon } from "@chakra-ui/icons";

  type OrganizationMenuProps = {
    setPage: React.Dispatch<React.SetStateAction<number>>
  }
  
  export const OrganizationMenu: FunctionComponent<OrganizationMenuProps> = ({setPage}) => {
    return <Menu>
              <MenuButton as={IconButton} icon={<HamburgerIcon></HamburgerIcon>} />
              <MenuList>
                <MenuItem>Home</MenuItem>
                <MenuItem>Projects</MenuItem>
                <MenuItem>Community</MenuItem>
                <MenuItem>Back to Organization</MenuItem>
              </MenuList>
            </Menu>
  }
  
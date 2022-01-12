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
                <MenuItem onClick={() => setPage(1)}>Home</MenuItem>
                <MenuItem onClick={() => setPage(3)}>Projects</MenuItem>
                <MenuItem onClick={() => setPage(2)}>Community</MenuItem>
                <MenuItem onClick={() => setPage(0)}>Back to Organization</MenuItem>
              </MenuList>
            </Menu>
  }
  
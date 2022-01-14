import {
    MenuButton,
    MenuList,
    MenuItem,
    Menu,
    IconButton
  } from "@chakra-ui/react"
  import { FunctionComponent } from "react";
  import { HamburgerIcon } from "@chakra-ui/icons";

  import { OrgPages } from "../pages/Org"

  type OrganizationMenuProps = {
    setPage: React.Dispatch<React.SetStateAction<number>>
  }
  
  export const OrganizationMenu: FunctionComponent<OrganizationMenuProps> = ({setPage}) => {
    return <Menu>
              <MenuButton as={IconButton} icon={<HamburgerIcon></HamburgerIcon>} />
              <MenuList>
                <MenuItem onClick={() => setPage(OrgPages.SchoolHome)}>Home</MenuItem>
                <MenuItem onClick={() => setPage(OrgPages.Projects)}>Projects</MenuItem>
                <MenuItem onClick={() => setPage(OrgPages.Members)}>Community</MenuItem>
                <MenuItem onClick={() => setPage(OrgPages.Home)}>Back to Organization</MenuItem>
              </MenuList>
            </Menu>
  }
  
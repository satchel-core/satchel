import {
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  IconButton
} from "@chakra-ui/react"
import { FunctionComponent } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { ComMemPages } from "../pages/commem/CommunityMember"
import { To, useNavigate } from "react-router-dom"

type ComMemMenuProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const ComMemMenu: FunctionComponent<ComMemMenuProps> = ({setPage}) => {
  const navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }

  return <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon></HamburgerIcon>} />
            <MenuList>
              <MenuItem onClick={() => setPage(ComMemPages.Home)}>Home</MenuItem>
              <MenuItem onClick={() => setPage(ComMemPages.Projects)}>Projects</MenuItem>
              <MenuItem onClick={() => setPage(ComMemPages.Loans)}>Loans</MenuItem>
              <MenuItem onClick={handleClick("/")}>Log Out</MenuItem>
            </MenuList>
          </Menu>
}
  
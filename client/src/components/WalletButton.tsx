import { FunctionComponent } from "react"
import {
  Button,
  Icon,
} from "@chakra-ui/react"
import { To, useNavigate } from "react-router-dom"

type WalletButtonProps = {
  walletName: string
}

export const WalletButton: FunctionComponent<WalletButtonProps> = ({walletName}) => {
  const navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }
  return <Button isFullWidth size="sm" borderColor="satchel_blue.500" color="black" variant="outline" leftIcon={<Icon></Icon>} onClick={handleClick("/Org")}>{walletName}</Button>;
}

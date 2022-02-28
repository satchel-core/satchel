import { FunctionComponent } from "react"
import {
  Button,
  Icon,
} from "@chakra-ui/react"
import { handleClick } from "../utils/common";
import { useRouter } from "next/router";

type WalletButtonProps = {
  walletName: string
}

export const WalletButton: FunctionComponent<WalletButtonProps> = ({walletName}) => {
  const router = useRouter();
  // TODO: Remove this later
  const address_org = "6bf76B2668fF5446fbaDCb94231E2A44ba077bd6"

  return <Button isFullWidth size="sm" borderColor="satchel_blue.500" color="black" variant="outline" leftIcon={<Icon></Icon>} onClick={handleClick("/org/"+[address_org], router)}>{walletName}</Button>;
}

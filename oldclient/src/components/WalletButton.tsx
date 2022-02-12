import { FunctionComponent } from "react"
import {
  Button,
  Icon,
} from "@chakra-ui/react"
import { useRouter } from 'next/router';
import { handleClick } from "../utils/common";

type WalletButtonProps = {
  walletName: string
}

export const WalletButton: FunctionComponent<WalletButtonProps> = ({walletName}) => {
  const router = useRouter();

  return <Button isFullWidth size="sm" borderColor="satchel_blue.500" color="black" variant="outline" leftIcon={<Icon></Icon>} onClick={handleClick("/Org", router)}>{walletName}</Button>;
}

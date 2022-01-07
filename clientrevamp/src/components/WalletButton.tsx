import { FunctionComponent } from "react"
import {
  Button,
  Icon,
} from "@chakra-ui/react"

type WalletButtonProps = {
  walletName: string
}

export const WalletButton: FunctionComponent<WalletButtonProps> = ({walletName}) => <Button isFullWidth size="sm" borderColor="satchel_blue.500" color="black" variant="outline" leftIcon={<Icon></Icon>}>{walletName}</Button>

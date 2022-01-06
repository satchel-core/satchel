import { FunctionComponent } from "react"
import {
  Button,
  Icon,
} from "@chakra-ui/react"

type WalletButtonProps = {
  walletName: string
}

export const WalletButton: FunctionComponent<WalletButtonProps> = ({walletName}) => <Button isFullWidth size="sm" borderColor="#01afee" color="black" variant="outline" leftIcon={<Icon></Icon>}>{walletName}</Button>

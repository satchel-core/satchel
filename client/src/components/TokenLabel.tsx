import { FunctionComponent } from "react"
import {
    Stat,
    StatLabel,
    StatHelpText,
    StatGroup,
    StatArrow
} from "@chakra-ui/react"
import { Logo } from "../Logo"

type TokenLabelProps = {
  name: string,
  amount: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
}

export const TokenLabel: FunctionComponent<TokenLabelProps> = ({name, amount, onClick}) => {
  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1} onClick={onClick}>
            <Stat>
              <StatLabel fontSize="sm">{name}</StatLabel>
              <StatLabel fontSize="xl" fontWeight="bold">{amount}</StatLabel>
              <StatHelpText>
                <StatArrow type='increase' />
                23.36%
              </StatHelpText>
            </Stat>
            <Stat>
              <Logo maxH="80px"></Logo>
            </Stat>
          </StatGroup>
}

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
}

export const TokenLabel: FunctionComponent<TokenLabelProps> = ({name, amount}) => {
  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1}>
            <Stat>
              <StatLabel fontSize="14px">{name}</StatLabel>
              <StatLabel fontSize="20px" fontWeight="bold">{amount}</StatLabel>
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

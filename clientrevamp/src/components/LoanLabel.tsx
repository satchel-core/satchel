import { FunctionComponent } from "react"
import {
    Stat,
    StatLabel
} from "@chakra-ui/react"

type LoanLabelProps = {
  status: string,
  amount: string,
  date: string
}

export const LoanLabel: FunctionComponent<LoanLabelProps> = ({status, amount, date}) => {
  return <Stat borderWidth="1px" borderRadius="md" borderColor="black" padding={1}>
            <StatLabel fontSize="14px" fontWeight={700}>{status}</StatLabel>
            <StatLabel fontSize="24px" fontWeight="bold">{amount}</StatLabel>
            <StatLabel fontSize="14px">{date}</StatLabel>
          </Stat>
}

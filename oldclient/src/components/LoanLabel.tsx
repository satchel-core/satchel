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
            <StatLabel fontSize="sm" fontWeight={700}>{status}</StatLabel>
            <StatLabel fontSize="2xl" fontWeight="bold">{amount}</StatLabel>
            <StatLabel fontSize="sm">{date}</StatLabel>
          </Stat>
}

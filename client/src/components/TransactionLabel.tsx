import { FunctionComponent } from "react"
import {
    Stat,
    StatLabel
} from "@chakra-ui/react"

type TransactionLabelProps = {
  heading: string,
  delta: string,
  date: string
}

export const TransactionLabel: FunctionComponent<TransactionLabelProps> = ({heading, delta, date}) => {
  return <Stat borderWidth="1px" borderRadius="md" borderColor="black" padding={1}>
            <StatLabel fontSize="sm">{heading}</StatLabel>
            <StatLabel fontSize="2xl" fontWeight="bold">{delta}</StatLabel>
            <StatLabel fontSize="sm">{date}</StatLabel>
          </Stat>
}

import React, { FunctionComponent } from "react"
import {
  Stat,
  StatLabel,
  StatHelpText,
  StatGroup,
  StatArrow
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { handleClick } from "../utils/common"
import { schoolType } from "../store/reducers/school_reducer"

type SchoolLabelProps = {
  // TODO: any is bad vibes rip
  school: any
  balance: string,
}

export const SchoolLabel: FunctionComponent<SchoolLabelProps> = ({ school, balance }) => {
  const router = useRouter()
  const { address, city, country, name } = school

  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1}
    onClick={handleClick(`/school/${address}`, router)}
  >
    <Stat>
      <StatLabel fontSize="xl" fontWeight="bold">{name}</StatLabel>
      <StatHelpText>
        {city}, {country}
      </StatHelpText>
    </Stat>
    <Stat textAlign="right">
      <StatLabel fontSize="lg">${balance}</StatLabel>
      <StatHelpText>
        <StatArrow type='increase' />
        23.36%
      </StatHelpText>
    </Stat>
  </StatGroup>
}

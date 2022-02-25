import React, { FunctionComponent } from "react"
import {
  Stat,
  StatLabel,
  StatHelpText,
  StatGroup,
  StatArrow
} from "@chakra-ui/react"

type SchoolLabelProps = {
  name: string,
  city: string,
  country: string,
  balance: string,
  id: string,
}

export const SchoolLabel: FunctionComponent<SchoolLabelProps> = ({ name, city, country, balance, id }) => {
  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1}
  // onClick={() => {
  //   setPage(OrgPages.SchoolHome);
  //   setSchool(name);
  // }}
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

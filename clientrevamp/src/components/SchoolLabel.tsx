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
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setSchool: React.Dispatch<React.SetStateAction<string>>,
}

export const SchoolLabel: FunctionComponent<SchoolLabelProps> = ({name, city, country, balance, setPage, setSchool}) => {
  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1} onClick={() => {
    setPage(1);
    setSchool(name);
  }}>
            <Stat>
              <StatLabel fontSize="20px" fontWeight="bold">{name}</StatLabel>
              <StatHelpText>
              {city}, {country}
              </StatHelpText>
            </Stat>
            <Stat textAlign="right">
              <StatLabel fontSize="18px">${balance}</StatLabel>
              <StatHelpText>
              <StatArrow type='increase' />
                23.36%
              </StatHelpText>
            </Stat>
          </StatGroup>
}

import { FunctionComponent } from "react"
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatGroup,
    StatArrow
} from "@chakra-ui/react"
import { To, useNavigate } from "react-router-dom"

type SchoolLabelProps = {
  name: string,
  city: string,
  country: string,
  balance: string,
}

export const SchoolLabel: FunctionComponent<SchoolLabelProps> = ({name, city, country, balance}) => {
  let navigate = useNavigate();
  function handleClick(toRedirect: To) {
    return () => navigate(toRedirect);
  }
  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1}>
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

import { FunctionComponent } from "react"
import {
    Stat,
    StatLabel,
    StatGroup,
} from "@chakra-ui/react"

type ProjectLabelProps = {
  name: string,
  status: string,
  moneyStatus: string,
  likes: number,
}

export const ProjectLabel: FunctionComponent<ProjectLabelProps> = ({name, status, moneyStatus, likes}) => {
  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1}>
            <Stat>
              <StatLabel fontSize="14px" fontWeight={700}>{status}</StatLabel>
              <StatLabel fontSize="24px" fontWeight="bold">{name}</StatLabel>
              <StatLabel fontSize="12px">{moneyStatus}</StatLabel>
            </Stat>
            <Stat textAlign="right">
              <StatLabel fontSize="18px" fontWeight="bold">{likes}❤</StatLabel>
            </Stat>
          </StatGroup>
}

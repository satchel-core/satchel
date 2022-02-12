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
  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1} onClick={() => {

    // if (isOrg) {
    //   setPage(OrgPages.Project);
    // } else {
    //   setPage(ComMemPages.Project);
    // }
    // setProject(name);
  }}>
            <Stat>
              <StatLabel fontSize="sm" fontWeight={700}>{status}</StatLabel>
              <StatLabel fontSize="2xl" fontWeight="bold">{name}</StatLabel>
              <StatLabel fontSize="xs">{moneyStatus}</StatLabel>
            </Stat>
            <Stat textAlign="right">
              <StatLabel fontSize="lg" fontWeight="bold">{likes}❤</StatLabel>
            </Stat>
          </StatGroup>
}

import { FunctionComponent } from "react"
import {
  Stat,
  StatLabel,
  StatGroup,
} from "@chakra-ui/react"
import { OrgPages } from "../pages/org/Organization"
import { ComMemPages } from "../pages/commem/CommunityMember"

type ProjectLabelProps = {
  name: string,
  status: string,
  moneyStatus: string,
  likes: number,
  isOrg?: boolean,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setProject: React.Dispatch<React.SetStateAction<string>>,
}

export const ProjectLabel: FunctionComponent<ProjectLabelProps> = ({name, status, moneyStatus, likes, isOrg, setPage, setProject}) => {
  return <StatGroup borderWidth="1px" borderRadius="md" borderColor="black" padding={1} onClick={() => {
    if (isOrg) {
      setPage(OrgPages.Project);
    } else {
      setPage(ComMemPages.Project);
    }
    setProject(name);
  }}>
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

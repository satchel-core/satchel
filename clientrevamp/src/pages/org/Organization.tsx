import {
  Text,
} from "@chakra-ui/react"
import { FunctionComponent, useState } from "react";
import { OrgHome } from "./OrgHome";
import { OrgSchoolHome } from "./OrgSchoolHome";
import { OrgMembers } from "./OrgMembers";
import { OrgProjects } from "./OrgProjects";
import { OrgWithdraw } from "./OrgWithdraw";
import { OrgDeposit } from "./OrgDeposit";

export enum OrgPages {
  Home,
  SchoolHome,
  Members,
  Projects,
  Withdraw,
  Deposit,
}

export const Organization: FunctionComponent = () => {
  const [page, setPage] = useState(OrgPages.Home);
  const [school, setSchool] = useState("");
  switch (page) {
    case OrgPages.Home:
      return <OrgHome setPage={setPage} setSchool={setSchool} />
    case OrgPages.SchoolHome:
      return <OrgSchoolHome setPage={setPage} school={school} />
    case OrgPages.Members:
      return <OrgMembers setPage={setPage} school={school}/>
    case OrgPages.Projects:
      return <OrgProjects setPage={setPage} />
    case OrgPages.Withdraw:
      return <OrgWithdraw origSetPage={setPage} />
    case OrgPages.Deposit:
      return <OrgDeposit origSetPage={setPage} />
    default:
      return <Text>Unimplemented page</Text>
  }
}

import {
  Text,
} from "@chakra-ui/react"
import { FunctionComponent, useState } from "react";
import { ComMemHome } from "./ComMemHome";
import { ComMemLoans } from "./ComMemLoans";
import { ComMemProjects } from "./ComMemProjects";

export enum ComMemPages {
  Home,
  Projects,
  Loans,
  Withdraw,
  Deposit,
}

export const CommunityMember: FunctionComponent = () => {
  const [page, setPage] = useState(ComMemPages.Home);
  switch (page) {
    case ComMemPages.Home:
      return <ComMemHome setPage={setPage} member="Darya" />
    case ComMemPages.Projects:
      return <ComMemProjects setPage={setPage} />
    case ComMemPages.Loans:
      return <ComMemLoans setPage={setPage} />
    case ComMemPages.Withdraw:
      return <Text>Unimplemented page</Text>
    case ComMemPages.Deposit:
      return <Text>Unimplemented page</Text>
    default:
      return <Text>Unimplemented page</Text>
  }
}

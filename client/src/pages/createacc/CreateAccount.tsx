import { Text } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"

import { CreateAccMain } from "./CreateAccMain"
import { CreateAccIsOrg } from "./CreateAccIsOrg"
import { CreateAccIsComm } from "./CreateAccIsComm"

export enum CreateAccPages {
  Main,
  IsOrg,
  IsCommunity,
}

export const CreateAccount: FunctionComponent = () => {
  const [page, setPage] = useState(CreateAccPages.Main);
  switch (page) {
    case CreateAccPages.Main:
      return <CreateAccMain setPage={setPage}></CreateAccMain>
    case CreateAccPages.IsOrg:
      return <CreateAccIsOrg setPage={setPage}></CreateAccIsOrg>
    case CreateAccPages.IsCommunity:
      return <CreateAccIsComm setPage={setPage}></CreateAccIsComm>
    default:
      return <Text>Unimplemented page</Text>
  }
}

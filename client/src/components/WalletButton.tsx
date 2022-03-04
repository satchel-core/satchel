import { FunctionComponent } from "react"
import {
  Button,
  Icon,
} from "@chakra-ui/react"
import { handleClick } from "../utils/common";
import { NextRouter, useRouter } from "next/router";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

type WalletButtonProps = {
  walletName: string
}

export const WalletButton: FunctionComponent<WalletButtonProps> = ({walletName}) => {
  const router = useRouter();
  // TODO: Remove this later
  const address_org = "6bf76B2668fF5446fbaDCb94231E2A44ba077bd6"

  function handleLogin(publicAddress: any, router: NextRouter) {
    // --snip--
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`)
    .then(response => response.json())
    // If yes, retrieve it. If no, create it.
    .then(
      users => (users.length ? users[0] : this.handleSignup(publicAddress))
    )
    // Popup MetaMask confirmation modal to sign message
    .then(this.handleSignMessage)
    // Send signature to back end on the /auth route
    .then(this.handleAuthenticate)
    .then(user => {
      user.nonce = Math.floor(Math.random() * 1000000);
      return user.save();
    })
    return this.handleClick("/org/"+[publicAddress], router);
    // --snip--
  }
  
  function handleSignup(publicAddress) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());
  }
  
  function handleAuthenticate(publicAddress: any, signature: any ) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());
  };

  function handleSignMessage({ publicAddress, nonce }) {
    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
        }
      )
    );
  }

  return <Button 
            isFullWidth 
            size="sm" 
            borderColor="satchel_blue.500" 
            color="black" 
            variant="outline" 
            leftIcon={<Icon></Icon>} 
            onClick={handleLogin(address_org, router)}>
              {walletName}
          </Button>;
}



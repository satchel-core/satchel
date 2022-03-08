import { FunctionComponent } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { handleClick, stripAddress } from "../utils/common";
import { NextRouter, useRouter } from "next/router";
import Web3 from "web3";
let web3: Web3 | undefined = undefined; // Will hold the web3 instance

type WalletButtonProps = {
  walletName: string;
};

export const WalletButton: FunctionComponent<WalletButtonProps> = ({
  walletName,
}) => {
  const router = useRouter();
  // TODO: Remove this later
  const address_org = "6bf76B2668fF5446fbaDCb94231E2A44ba077bd6";

  const handleLogin = async () => {
    if (!(window as any).ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }
    if (!web3) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const publicAddress = coinbase.toLowerCase();

    // Look if org with current publicAddress is already present on backend
    fetch(
      `http://localhost:4000/api/org/?address=${stripAddress(publicAddress)}`
    )
      .then((response) => response.json())
      // If yes, retrieve it. If no, create it.
      .then((users) => (users.length ? users[0] : handleSignup(publicAddress)))
      // Popup MetaMask confirmation modal to sign message
      .then(handleSignMessage)
      // Send signature to backend on the /auth route
      .then(handleAuthenticate)
      .then(handleClick(publicAddress, router));
    // Pass accessToken back to parent component (to save it in localStorage)
    // .then(onLoggedIn)
    // .catch(err => {
    //   window.alert(err);
    //   this.setState({ loading: false });
    // }); test
  };

  const handleSignup = async (publicAddress: string) => {
    const response = await fetch(`http://localhost:4000/api/org/createOrg`, {
      body: JSON.stringify({
        name: "Your Mom",
        address: publicAddress,
        schools: [],
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    return response.json();
  };

  const handleAuthenticate = ({
    publicAddress,
    signature,
  }: {
    publicAddress: string;
    signature: string;
  }) =>
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleSignMessage = async ({
    publicAddress,
    nonce,
  }: {
    publicAddress: string;
    nonce: string;
  }) => {
    try {
      const signature = await web3!.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        "" // MetaMask will ignore the password argument here
      );

      return { publicAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  };

  return (
    <Button
      isFullWidth
      size="sm"
      borderColor="satchel_blue.500"
      color="black"
      variant="outline"
      leftIcon={<Icon></Icon>}
      onClick={handleLogin}
    >
      {walletName}
    </Button>
  );
};

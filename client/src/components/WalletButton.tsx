import { FunctionComponent } from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { handleClick } from '../utils/common';
import { useRouter } from 'next/router';
import Web3 from 'web3';
let web3: Web3 | undefined = undefined; // Will hold the web3 instance

type WalletButtonProps = {
	walletName: string;
};

export const WalletButton: FunctionComponent<WalletButtonProps> = ({ walletName }) => {
	const router = useRouter();
	// TODO: Remove this later

	const handleLogin = async () => {
		if (!(window as any).ethereum) {
			window.alert('Please install MetaMask first.');
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
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		const publicAddress = await web3.eth.getCoinbase();
		if (!publicAddress) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		// Look if org with current publicAddress is already present on backend
		fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/org?address=${publicAddress}`)
			.then((response) => response.json())
			// If yes, retrieve it. If no, create it.
			.then((org) => (org ? org : handleSignup(publicAddress)))
			// Popup MetaMask confirmation modal to sign message
			.then(handleSignMessage)
			// Send signature to backend on the /auth route
			.then(handleAuthenticate)
			.then(handleClick(`/org/${publicAddress}`, router))
			.catch((err) => {
				window.alert(err);
			});
	};

	const handleSignup = async (publicAddress: string) => {
		const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/org/createOrg`, {
			body: JSON.stringify({
				name: 'ritik test org', // TODO: Fix this later
				address: publicAddress,
				schools: [],
				nonce: 314,
			}),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});
		return response.json();
	};

	const handleAuthenticate = ({ address, signature }: { address: string; signature: string }) =>
		fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth`, {
			body: JSON.stringify({ address, signature }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());

	const handleSignMessage = async ({
		org,
	}: {
		org: any; // TODO: grr change this
	}) => {
		try {
			const address: string = org.address;
			const signature = await web3!.eth.personal.sign(
				`I am signing my one-time nonce: ${org.nonce}`,
				address,
				'', // MetaMask will ignore the password argument here
			);

			return { address, signature };
		} catch (err) {
			console.log(err);
			throw new Error('You need to sign the message to be able to log in.');
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

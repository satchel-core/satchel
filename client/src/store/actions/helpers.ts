import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

declare let window: any;

export const connectWallet = async () => {
	if (!window.ethereum) {
		console.log('Metamask not installed');
		const provider = new WalletConnectProvider({
			infuraId: process.env.REACT_APP_INFURA,
		});
		// await provider.disconnect();

		//  Enable session (triggers QR Code modal)
		await provider.enable();
		return new Web3(<any>provider);
	} else {
		await window.ethereum.request({
			method: 'eth_requestAccounts',
		});
		return new Web3(Web3.givenProvider);
	}
};

export const calculateInterest = (liquidityRate) => {
	const RAY = 10 ** 27; // 10 to the power 27
	const SECONDS_PER_YEAR = 31536000;

	// Deposit and Borrow calculations
	// APY and APR are returned here as decimals, multiply by 100 to get the percents

	let depositAPR = liquidityRate / RAY;
	let depositAPY = (1 + depositAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;
	return depositAPY * 100;
};

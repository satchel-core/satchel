require('dotenv').config();

import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import axios from 'axios';

export const getWeb3 = () => {
    const provider = new HDWalletProvider({
        mnemonic: {
            phrase: process.env.MNEMONIC!,
        },
        providerOrUrl: process.env.INFURA,
    });

    const web3 = new Web3(provider);
    return web3;
};

export const getTokenPrices = async (tokens: string) => {
    const prices = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        {
            params: {
                symbol: tokens,
            },
            headers: {
                'X-CMC_PRO_API_KEY': process.env.PRICES_API || '', // TODO: Handle errors here
            },
        }
    );

    return prices;
};

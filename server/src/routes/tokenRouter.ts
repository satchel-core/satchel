import express from 'express';

require('dotenv').config();
import { getWeb3, getTokenPrices } from '../common';
import { AbiItem } from 'web3-utils';

import axios from 'axios';
import schoolAbi from '../contracts/School.sol/School.json';
import assets from '../assets.json';

const router = express.Router();

router.get('/getTokenPrices', async (req, res) => {
    const { tokens } = req.query;
    if (!tokens) {
        return res.status(400).json({
            tokens: 'Tokens not found',
        });
    }

    const prices = await getTokenPrices(tokens as string);

    return res.status(200).json({ ...prices.data });
});

router.get('/getUserBalance', async (req, res) => {
    const { address, schoolAddress } = req.query;
    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    // In the future we would just get this from the user struct
    else if (!schoolAddress) {
        return res.status(400).json({
            schoolAddress: 'School Address not found',
        });
    }

    const web3 = getWeb3();
    let schoolContract = new web3.eth.Contract(schoolAbi.abi as AbiItem[], schoolAddress as string);

    try {
        const promises = assets.map(async (asset) => {
            return schoolContract.methods.getBalance(asset.aTokenAddress, address).call();
        });

        let data = await Promise.all(promises);
        const tokenBalances = {} as any;

        for (let i = 0; i < assets.length; i++) {
            tokenBalances[assets[i].symbol] = Number(
                (data[i] / 10 ** assets[i].decimals).toFixed(assets[i].decimals)
            );
        }
        console.log(tokenBalances);
        return res.status(200).json({ success: true, tokenBalances });
    } catch (e) {
        console.log(e);
        return res.status(500);
    }
});

module.exports = router;
export default router;

import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import { AbiItem } from 'web3-utils';

import express, { NextFunction, Request, Response } from 'express';
import Org from '../models/Org';
import * as dotenv from 'dotenv';
import School from '../models/School';
import satchelAbi from '../contracts/Satchel.sol/Satchel.json';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let org = {} as any;
    try {
        org = await Org.findOne({ address });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, org });
});

router.get('/allOrgs', async (req, res) => {
    let orgs = [];
    try {
        orgs = await Org.findOne();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, orgs });
});

router.get('/getSchools', async (req, res) => {
    const { orgAddress } = req.query;
    let schools = [];
    try {
        schools = await School.find({ orgAddress });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, schools });
});

router.post('/createOrg', async (req, res) => {
    const { name, ownerAddress } = req.body;

    // console.log(name, ownerAddress, schools);

    if (!name) {
        return res.status(400).json({
            name: 'Name not found',
        });
    } else if (!ownerAddress) {
        return res.status(400).json({
            ownerAddress: 'Address not found',
        });
    }

    console.log(process.env.MNEMONIC);
    const provider = new HDWalletProvider({
        mnemonic: {
            phrase: process.env.MNEMONIC!,
        },
        providerOrUrl: process.env.INFURA,
    });

    const web3 = new Web3(provider);

    const address = String(ownerAddress).toLowerCase();
    let newOrg = {} as any;
    try {
        newOrg = new Org({ name, schools: [], address, ownerAddress: address });
        await newOrg.save();

        const id = '0x' + newOrg._id.valueOf();

        const satchelContract = new web3.eth.Contract(
            satchelAbi.abi as AbiItem[],
            process.env.SATCHEL_ADDRESS!
        );

        const accounts = await web3.eth.getAccounts();
        await satchelContract.methods.createOrg(id, address).send({ from: accounts[0] });

        let orgAddress = await satchelContract.methods.orgs(id).call();

        newOrg.address = orgAddress.toLowerCase();
        await newOrg.save();
    } catch (e) {
        console.log(e);

        if (newOrg) {
            newOrg.remove();
        }
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
export default router;

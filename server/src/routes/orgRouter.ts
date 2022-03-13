import express, { NextFunction, Request, Response } from 'express';
import Org from '../models/Org';
import * as dotenv from 'dotenv';
import School from '../models/School';
import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let org = {};
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
    const { name, address, schools } = req.body;

    console.log(name, address, schools);

    // if (!name) {
    //     return res.status(400).json({
    //         email: 'Name not found',
    //     });
    // } else if (!schools) {
    //     return res.status(400).json({
    //         email: 'Schools not found',
    //     });
    // } else if (!address) {
    //     return res.status(400).json({
    //         address: 'Address not found',
    //     });
    // }

    try {
        let newOrg = new Org({ name, schools, address });
        await newOrg.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
export default router;

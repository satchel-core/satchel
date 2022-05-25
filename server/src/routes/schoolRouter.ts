import express from 'express';
import Org from '../models/Org';
import School from '../models/School';
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let school = {} as any;
    try {
        school = await School.findOne({ address });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, school });
});

router.get('/allSchools', async (req, res) => {
    let schools = [];
    try {
        schools = await School.findOne();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, schools });
});

router.post('/deploySchool', async (req, res) => {
    const { _id, address } = req.body;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    } else if (!_id) {
        return res.status(400).json({
            _id: 'Id not found',
        });
    }

    try {
        let school = await School.findOne({ _id });
        school.address = address.toLowerCase();
        await school.save();

        let org = await Org.findOne({ address: school.orgAddress });
        org.schools.push(school.address);
        await org.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
    return res.status(200).json({ success: true });
});

router.post('/createSchool', async (req, res) => {
    const { name, address, orgAddress, city, country } = req.body;

    if (!name) {
        return res.status(400).json({
            name: 'Name not found',
        });
    } else if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    } else if (!orgAddress) {
        return res.status(400).json({
            orgAddress: 'Org Address not found',
        });
    } else if (!city) {
        return res.status(400).json({
            city: 'City not found',
        });
    } else if (!country) {
        return res.status(400).json({
            country: 'Country not found',
        });
    }

    try {
        let newSchool = new School({
            name,
            address: address.toLowerCase(),
            orgAddress: orgAddress.toLowerCase(),
            city,
            country,
        });
        await newSchool.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
export default router;

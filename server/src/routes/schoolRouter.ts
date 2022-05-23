import express from 'express';
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
    const { schoolId, address } = req.body;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    try {
        let school = await School.findOne({ _id: schoolId });
        school.address = address.toLowerCase();
        await school.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

router.post('/createSchool', async (req, res) => {
    const { name, addressObj, orgAddressObj, city, country } = req.body;

    const address = String(addressObj).toLowerCase;
    const orgAddress = String(orgAddressObj).toLowerCase;

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
        let newSchool = new School({ name, address, orgAddress, city, country });
        await newSchool.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
export default router;

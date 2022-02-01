import express from 'express';
import ComMem from '../models/ComMem';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let user = {};
    try {
        user = await ComMem.findOne({ address });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, user });
});

router.post('/createUser', async (req, res) => { // TODO: handle duplicates?
    const { name, address, school } = req.body;

    if (!name) {
        return res.status(400).json({
            name: 'Name not found',
        });
    } else if (!school) {
        return res.status(400).json({
            school: 'School not found',
        });
    } else if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    try {
        const newUser = new ComMem({ name, address, school });
        await newUser.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
export default router;
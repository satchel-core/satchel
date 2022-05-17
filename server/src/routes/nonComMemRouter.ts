import express from 'express';
import NonComMem from '../models/NonComMem';
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let user = {} as any;
    try {
        user = await NonComMem.findOne({ address });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, user });
});

router.post('/createUser', async (req, res) => { // TODO: handle duplicates?
    const { name, address } = req.body;

    if (!name) {
        return res.status(400).json({
            name: 'Name not found',
        });
    } else if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    try {
        const newUser = new NonComMem({ name, address });
        await newUser.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
export default router;
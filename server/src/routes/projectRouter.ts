import express from 'express';
import Project from '../models/Project';
require('dotenv').config();

const router = express.Router();


router.get('/', async (req, res) => {
    const { schoolAddress } = req.query;

    if (!schoolAddress) {
        return res.status(400).json({
            address: 'School Address not found',
        });
    }

    let projects = [];
    try {
        projects = await Project.find({ school: schoolAddress });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, projects });
});

router.post('/createProject', async (req, res) => {
    const { name, description, targetFunding, schoolAddress } = req.body;

    if (!name) {
        return res.status(400).json({
            name: 'Name not found',
        });
    } else if (!description) {
        return res.status(400).json({
            description: 'Description not found',
        });
    } else if (!targetFunding) {
        return res.status(400).json({
            targetFunding: 'Target Funding not found',
        });
    } else if (!schoolAddress) { // TODO: Validate the school address to make sure that it is a valid address
        return res.status(400).json({
            schoolAddress: 'School address not found',
        });
    }

    try {
        let newProject = new Project({
            name,
            description,
            targetFunding,
            school: schoolAddress,
        });
        await newProject.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;

export default router;
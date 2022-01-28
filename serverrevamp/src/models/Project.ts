require('dotenv').config();
import * as mongoose from 'mongoose';
import validator from 'validator';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    targetFunding: {
        type: Number,
        required: true,
    },
    // Don't need funding breakdown yet
    // fundingBreakdown: {
    //     type: Array,
    //     required: true,
    // },
    school: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
    attachments: {
        type: [Buffer],
        required: true,
        default: [],
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

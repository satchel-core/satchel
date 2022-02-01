import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import validator from 'validator';

dotenv.config();

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
    // fundingBreakdown: {
    //     type: Array,
    //     required: true,
    // },
    school: {
        type: String,
        required: true,
        validate(value: string) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

export default Project;
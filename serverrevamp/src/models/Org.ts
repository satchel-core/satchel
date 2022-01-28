require('dotenv').config();
import schoolSchema from './School';
import * as mongoose from 'mongoose';
import validator from 'validator';

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
    schools: {
        type: [schoolSchema],
        required: true,
        default: [], // TODO: Check if we should be defaulting to an empty array
    }
});

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;

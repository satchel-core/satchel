import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as ethUtil from 'ethereumjs-util';
import validator from 'validator';

dotenv.config();

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        validate(value: string) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
    ownerAddress: {
        type: String,
        required: true,
        validate(value: string) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
    schools: {
        type: [String],
        required: true,
        validate(list: Array<string>) {
            for (const value of list) {
                if (!validator.isEthereumAddress(value)) {
                    throw new Error('School Address is invalid');
                }
            }
        },
        default: [], // TODO: Check if we should be defaulting to an empty array
    },
    nonce: {
        allowNull: false,
        type: Number,
        defaultValue: () => Math.floor(Math.random() * 1000000), // Initialize with a random nonce
    },
});

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;

export default Org;

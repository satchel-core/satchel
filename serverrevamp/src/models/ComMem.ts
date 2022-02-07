require('dotenv').config();
import * as mongoose from 'mongoose';
import validator from 'validator';

const comMemSchema = new mongoose.Schema({
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
    school: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
});

const ComMem = mongoose.model('ComMem', comMemSchema);

module.exports = ComMem;

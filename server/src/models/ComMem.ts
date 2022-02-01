import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import validator from 'validator';

dotenv.config();

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
        validate(value: string) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
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

const ComMem = mongoose.model('ComMem', comMemSchema);

module.exports = ComMem;

export default ComMem;
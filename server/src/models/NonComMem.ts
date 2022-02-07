import * as mongoose from 'mongoose';
import validator from 'validator';
import * as dotenv from 'dotenv';

dotenv.config();

const nonComMemSchema = new mongoose.Schema({
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
    }
});

const NonComMem = mongoose.model('NonComMem', nonComMemSchema);

module.exports = NonComMem;

export default NonComMem;
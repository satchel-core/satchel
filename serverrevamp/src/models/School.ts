import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import validator from 'validator';

dotenv.config()

const schoolSchema = new mongoose.Schema({
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
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;

export default schoolSchema;

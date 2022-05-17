import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

const ratePremiSchema = mongoose.Schema(
    {
        rate: {
            type: Number,
            required: true,
        },
        rateFor: {
            type: String,
            required: true,
        }
    }
);

// add plugin that converts mongoose to json
ratePremiSchema.plugin(toJSON);
ratePremiSchema.plugin(paginate);

/**
 * @typedef RatePremi
 */
const RatePremi = mongoose.model('RatePremi', ratePremiSchema);

export default RatePremi;
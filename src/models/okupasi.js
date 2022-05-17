import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

const okupasiSchema = mongoose.Schema(
    {
        namaOkupasi: {
            type: String,
            required: true
        },
        ratePremi: {
            type: Number,
            required: true,
        }
    }
);

// add plugin that converts mongoose to json
okupasiSchema.plugin(toJSON);
okupasiSchema.plugin(paginate);

/**
 * @typedef Okupasi
 */
const Okupasi = mongoose.model('Okupasi', okupasiSchema);

export default Okupasi;
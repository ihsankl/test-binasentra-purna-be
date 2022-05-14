import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

const requestSchema = mongoose.Schema(
    {
        nomorPolis: {
            type: String,
            required: true
        },
        jenisPenanggungan: {
            type: String,
            default: 'Asuransi Kebakaran'
        },
        nomorInvoice: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Sudah Dibayar', 'Belum Dibayar'],
            default: 'Belum Dibayar'
        }
    },
    {
        timestamps: true
    }
);

// add plugin that converts mongoose to json
requestSchema.plugin(toJSON);
requestSchema.plugin(paginate);

/**
 * @typedef Request
 */
const Request = mongoose.model('Request', requestSchema);

export default Request;
import { Boom } from '@hapi/boom';
import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

const asuransiSchema = mongoose.Schema(
    {
        jangkaWaktuPertanggungan: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0) {
                    throw Boom.badRequest('Jangka waktu pertanggungan tidak boleh negatif');
                }
                if (value > 10) {
                    throw Boom.badRequest('Jangka waktu pertanggungan tidak boleh lebih dari 10 tahun');
                }
            },
        },
        okupasi: {
            type: String,
            required: true,
        },
        hargaBangunan: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0) {
                    throw Boom.badRequest('Harga bangunan tidak boleh negatif');
                }
            }
        },
        konstruksi: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0) {
                    throw Boom.badRequest('Konstruksi tidak boleh negatif');
                }
                if (value > 3) {
                    throw Boom.badRequest('Konstruksi tidak boleh lebih dari 3');
                }
            }
        },
        alamat: {
            type: String,
        },
        provinsi: {
            type: String,
        },
        kota: {
            type: String,
        },
        kabupaten: {
            type: String,
        },
        daerah: {
            type: String,
        },
        gempa: {
            type: Boolean,
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
asuransiSchema.plugin(toJSON);
asuransiSchema.plugin(paginate);

/**
 * @typedef AsuransiKebakaran
 */
const AsuransiKebakaran = mongoose.model('AsuransiKebakaran', asuransiSchema);

export default AsuransiKebakaran;
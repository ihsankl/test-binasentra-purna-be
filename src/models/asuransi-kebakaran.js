import Boom from '@hapi/boom';
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
        },
        nomorPolis: {
            type: String,
            required: true,
            default: "Belum Terbit"
        },
        jenisPenanggungan: {
            type: String,
            default: 'Asuransi Kebakaran'
        },
        nomorInvoice: {
            type: String,
            required: true,
            // invoice number from invoice model
            validate(value) {
                // format: K.001.XXXXX
                if (!value.match(/^K\.[0-9]{3}\.\d{5}$/)) {
                    throw Boom.badRequest('Nomor invoice harus dalam format K.001.XXXXX');
                }
            }
        },
        status: {
            type: String,
            enum: ['Approve', 'Reject'],
        },
        statusPembayaran: {
            type: String,
            enum: ['Belum Dibayar', 'Sudah Dibayar'],
            default: 'Belum Dibayar'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        okupasi: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        premiDasar: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0) {
                    throw Boom.badRequest('Premi dasar tidak boleh negatif');
                }
            },
            // premiDasar = hargaBangunan x ratePremi /1000 x periode(in years)
        },
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
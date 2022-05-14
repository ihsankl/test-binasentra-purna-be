import { Boom } from '@hapi/boom';
import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

const invoiceSchema = mongoose.Schema(
    {
        nomorInvoice: {
            type: String,
            required: true,
            validate(value) {
                // format: K.001.XXXXX
                if (!value.match(/^K\.[0-9]{3}\.\d{5}$/)) {
                    throw Boom.badRequest('Nomor invoice harus dalam format K.001.XXXXX');
                }
            }
        },
        periode: {
            type: Number,
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
        premiDasar: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0) {
                    throw Boom.badRequest('Premi dasar tidak boleh negatif');
                }
            },
            // premiDasar = hargaBangunan x ratePremi /1000 x periode(in years)
            default: function () {
                return this.hargaBangunan * this.ratePremi / 1000 * this.periode;
            }
        },
        ratePremi: {
            type: Number,
            validate(value) {
                if (value < 0) {
                    throw Boom.badRequest('Rate premi tidak boleh negatif');
                }
            }
        }
    },
    {
        timestamps: true
    }
);

// add plugin that converts mongoose to json
invoiceSchema.plugin(toJSON);
invoiceSchema.plugin(paginate);

/**
 * @typedef Invoice
 */
const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
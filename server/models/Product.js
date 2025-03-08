import mongoose, { Schema } from "mongoose";
import { loadType } from "mongoose-currency";

const schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema= new Schema({
    price: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100
    },
    expense: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Transactions"
    }],
 
},
{timestamps:true, toJSON:{getters:true}}
);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
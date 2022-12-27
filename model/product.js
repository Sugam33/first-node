import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        productName : {
            type : String,
            required : true,
        },

        productBrand : {
            type : String,
            required : true,
        },

        productPrice : {
            type : Number,
            required : true,
        },

        supplierName : {
            type : String,
            required : true,
        }
    },
    {
        timeStamps : true,
    }
);

const Product = mongoose.model("Product", productSchema)

export default Product;
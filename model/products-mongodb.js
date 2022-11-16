import mongoose from "mongoose";
import DBMongoDB from "./DBMongoDB.js";


const productSchema = mongoose.Schema({
    'name': String,
    'price': Number,
    'stock': Number,
    'brand': String,
    'category': String,
    'short-description': String,
    'long-description': String,
    'free-shipping': Boolean,
    'age-type': String,
    'age-from': Number,
    'age-up-to': Number,
    'img': String,
});

const ProductsModel = mongoose.model('products', productSchema);


class ProductModelMongoDB {
    
    async createProduct(product) {
        if(! await DBMongoDB.connectMongoDB()) {
            return {};
        }
        try {
            const newProduct = new ProductsModel(product);
            await newProduct.save();
            return DBMongoDB.getObjectWidthId(newProduct.toObject());
        } catch (error) {
            console.error(`Error al intentar dar de alta el producto. Detalle: ${error.message}`);
            return {};
        }
    }


    async readProducts() {
        if(! await DBMongoDB.connectMongoDB()) {
            return [];
        }
        try {
            const products = await ProductsModel.find({}).lean();
            return DBMongoDB.getObjectWidthId(products);
        } catch (error) {
            console.error(`Error al intentar obtener los productos. Detalle: ${error.message}`);
            return[];
        }
    }

    async readProduct(id) {
        if(! await DBMongoDB.connectMongoDB()) {
            return {};
        }
        try {
            const product = await ProductsModel.findById(id).lean() || {};
            return DBMongoDB.getObjectWidthId(product);
        } catch (error) {
            console.error(`Error al intentar obtener el producto. Detalle: ${error.message}`);
            return {};
        }
    }

    async updateProduct(id, product) {
        if(! await DBMongoDB.connectMongoDB()) {
            return {};
        }
        try {
            const updatedProduct = await ProductsModel.findByIdAndUpdate(id, {$set: product},{
                returnDocument: 'after'
            }).lean();
            return DBMongoDB.getObjectWidthId(updatedProduct);
        } catch (error) {
            console.error(`Error al intentar actualizar el producto. Detalle: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        if(! await DBMongoDB.connectMongoDB()) {
            return {};
        }
        try {
            const deletedProduct = await ProductsModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWidthId(deletedProduct);
        } catch (error) {
            console.error(`Error al intentar borrar el producto. Detalle: ${error.message}`);
            return {};
        }
    }

};

const productModel = new ProductModelMongoDB();

export default productModel;
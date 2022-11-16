import productModel from "../model/products-MongoDb.js";


class ProductApi {

    async getProducts() {
        const products = await productModel.readProducts();
        return products;
    }

    async getProduct(id) {
        const product = await productModel.readProduct(id);
        return product;
    }

    async createProduct(product) {
        const createdProduct = await productModel.createProduct(product);
        return createdProduct;
    }

    async updateProduct(id, product) {
        const updatedProduct = await productModel.updateProduct(id, product);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await productModel.deleteProduct(id);
        return deletedProduct;
    }

}


const api = new ProductApi();

export default api;


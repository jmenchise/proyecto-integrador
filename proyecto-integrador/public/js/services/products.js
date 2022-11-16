import http from '../clients/http.client.js';

class ProductServices {

    PRODUCTS_URL = '/api/products/'
    PRODUCTIMG_URL = '/tmp/uploads/'

    async getProducts() {
        const products = await http.get(this.PRODUCTS_URL);
        return products;
    }
    
    async getProduct(id) {
        const product = await http.get(this.PRODUCTS_URL, id);
        return product;
    }

    async getProductImg(imgName) {
        const img = await http.get(this.PRODUCTIMG_URL, imgName);
        return img;
    }

    async saveProduct(product) {
        const savedProduct = await http.post(this.PRODUCTS_URL, product);
        return savedProduct;
    }

    async uploadProductImg(imgFile) {
        const uploadedProductImg = await http.post(this.PRODUCTIMG_URL, imgFile);
        return uploadedProductImg;
    }

    async updateProduct(id, product) {
        const  updatedProduct = await http.put(this.PRODUCTS_URL, id, product);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await http.delete(this.PRODUCTS_URL, id);
        return deletedProduct;
    }

    async deleteProductImg(img) {
        const deletedProductImg = await http.delete(this.PRODUCTIMG_URL, img);
        return deletedProductImg;
    }

}

const productServices = new ProductServices();

export default productServices;
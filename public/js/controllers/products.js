import productServices from '/js/services/products.js';

class ProductController {

    async getProducts() {
        const products = await productServices.getProducts();
        return products;
    }

    async getProduct(id) {
        const product = await productServices.getProduct(id);
        return product;
    }

    async getProductImg(imgName) {
        const img = await productServices.getProductImg(imgName);
        return img;
    }

    async saveProduct(product) {
        const savedProduct = await productServices.saveProduct(product);
        return savedProduct;
    }

    async uploadProductImg(imgFile) {
        const uploadedProductImg = await productServices.uploadProductImg(imgFile);
        return uploadedProductImg;
    }

    async updateProduct(id, product) {
        const updatedProduct = await productServices.updateProduct(id, product);
        return updatedProduct;
    }
    
    async deleteProduct(id) {
        const deletedProduct = await productServices.deleteProduct(id);
        return deletedProduct;
    }
    
    async deleteProductImg(img) {
        const uploadedImg = await productServices.deleteProductImg(img);
        return uploadedImg;
    }

}


const productController = new ProductController();

export default productController;
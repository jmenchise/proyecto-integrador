import cartProductModel from "../model/cart-products-fs.js";

class CartProductApi {

    async getCartProducts() {
        const cartProducts = await cartProductModel.readCartProducts();
        return cartProducts;
    }

    async getCartProduct(id) {
        const cartProduct = await cartProductModel.readCartProduct(id);
        return cartProduct;
    }

    async createCartProduct(product) {
        const createdCartProduct = await cartProductModel.createCartProduct(product);
        return createdCartProduct;
    }

    async updateCartProduct(id, product) {
        const updatedCartProduct = await cartProductModel.updateCartProduct(id, product);
        return updatedCartProduct;
    }

    async deleteCartProduct(id) {
        const deletedCartProduct = await cartProductModel.deleteCartProduct(id);
        return deletedCartProduct;
    }

}


const cartApi = new CartProductApi();

export default cartApi;


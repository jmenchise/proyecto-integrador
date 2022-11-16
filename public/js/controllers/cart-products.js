import cartProductServices from '/js/services/cart-products.js';

class CartProductController {

    async getCartProducts() {
        const cartProducts = await cartProductServices.getCartProducts();
        return cartProducts;
    }

    async getCartProduct(id) {
        const cartProduct = await cartProductServices.getCartProduct(id);
        return cartProduct;
    }

    async saveCartProduct(product) {
        const savedCartProduct = await cartProductServices.saveCartProduct(product);
        return savedCartProduct;
    }

    async updateCartProduct(id, product) {
        const updatedCartProduct = await cartProductServices.updateCartProduct(id, product);
        return updatedCartProduct;
    }
    
    async deleteCartProduct(id) {
        const deletedCartProduct = await cartProductServices.deleteCartProduct(id);
        return deletedCartProduct;
    }

}


const cartProductController = new CartProductController();

export default cartProductController;
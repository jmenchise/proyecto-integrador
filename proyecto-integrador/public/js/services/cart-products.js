import http from '../clients/http.client.js';

class CartProductServices {

    CARTPRODUCTS_URL = '/cart/products/'

    async getCartProducts() {
        const cartProducts = await http.get(this.CARTPRODUCTS_URL);
        return cartProducts;
    }
    
    async getCartProduct(id) {
        const cartProduct = await http.get(this.CARTPRODUCTS_URL, id);
        return cartProduct;
    }

    async saveCartProduct(product) {
        const savedCartProduct = await http.post(this.CARTPRODUCTS_URL, product);
        return savedCartProduct;
    }

    async updateCartProduct(id, product) {
        const  updatedCartProduct = await http.put(this.CARTPRODUCTS_URL, id, product);
        return updatedCartProduct;
    }

    async deleteCartProduct(id) {
        const deletedCartProduct = await http.delete(this.CARTPRODUCTS_URL, id);
        return deletedCartProduct;
    }

}

const cartProductServices = new CartProductServices();

export default cartProductServices;
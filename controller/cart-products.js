import cartApi from "../api/cart-products.js";



class CartProductController {

    async getCartProducts(req, res) {
        res.json(await cartApi.getCartProducts());
    };

    async getCartProduct(req, res) {
        const id = req.params.id;
        res.json(await cartApi.getCartProduct(id));
    }

    async postCartProduct(req, res) {
        let product = req.body;
        const newCartProduct = await cartApi.createCartProduct(product);
        console.log('newCartProduct:', newCartProduct);
        res.json(newCartProduct);
    }

    async putCartProduct(req, res) {
        const id = req.params.id;
        const product = req.body;
        const updatedCartProduct = await cartApi.updateCartProduct(id, product) || {};
        console.log('updatedCartProduct:', updatedCartProduct);
        res.json(updatedCartProduct);
    }

    async deleteCartProduct(req, res) {
        const id = req.params.id;
        const removedCartProduct = await cartApi.deleteCartProduct(id) || {};
        res.json(removedCartProduct);

    }


};

const cartProductsController = new CartProductController();

export default cartProductsController;
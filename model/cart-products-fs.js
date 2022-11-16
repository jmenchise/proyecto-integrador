import fs from 'fs';


class CartProductModelFile {

    cartProductsFile = 'cart-products.dat';
    charset = 'utf-8';

    async readCartFileProducts() {
        let cartProducts = [];
        try {
            const fileContent = await fs.promises.readFile(this.cartProductsFile, this.charset);
            cartProducts = JSON.parse(fileContent);
        } catch (error) {
            console.error(error.message);
        }
        return cartProducts;
    }


    async saveCartFileProducts(cartProducts) {
        await fs.promises.writeFile(this.cartProductsFile, JSON.stringify(cartProducts, null, '\t'));
    }


    async createCartProduct(product) {
        const cartProducts = await this.readCartFileProducts();

        cartProducts.push(product);
        await this.saveCartFileProducts(cartProducts);
        return product;
    }


    async readCartProducts() {
        const cartProducts = await this.readCartFileProducts();
        return cartProducts;
    }


    async readCartProduct(id) {
        const cartProducts = await this.readCartFileProducts();
        const product = cartProducts.find(product => product.id === id) || {};
        return product;
    }


    async updateCartProduct(id, product) {
        const cartProducts = await this.readCartFileProducts();

        const index = cartProducts.findIndex(product => product.id === id);
        if (index === -1) {
            return {};
        };
        cartProducts[index] = product;
        await this.saveCartFileProducts(cartProducts);
        return product;
    }


    async deleteCartProduct(id) {
        const cartProducts = await this.readCartFileProducts();

        const index = cartProducts.findIndex(product => product.id === id);
        if (index === -1) {
            return {};
        }
        const removedCartProduct = cartProducts.splice(index, 1)[0];
        await this.saveCartFileProducts(cartProducts);
        return removedCartProduct;
    }

}

const cartProductModel = new CartProductModelFile();

export default cartProductModel;

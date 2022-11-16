import api from "../api/products.js";



class ProductController {

    async getProducts(req, res) {
        res.json(await api.getProducts());
    };

    async getProduct(req, res) {
        const id = req.params.id;
        res.json(await api.getProduct(id));
    }

    async postProduct(req, res) {
        let product = req.body;
        const newProduct = await api.createProduct(product);
        res.json(newProduct);
    }

    async uploadImg(req, res) {
        const img = req.file;
        res.json(img);
    }

    async putProduct(req, res) {
        const id = req.params.id;
        const product = req.body;
        const updatedProduct = await api.updateProduct(id, product) || {};
        res.json(updatedProduct);
    }

    async deleteProduct(req, res) {
        const id = req.params.id;
        const removedProduct = await api.deleteProduct(id) || {};
        res.json(removedProduct);

    }


};

const productsController = new ProductController();

export default productsController;
import  express  from 'express';
import cartProductsController from '../controller/cart-products.js';






const cartRouterProducts = express.Router();

cartRouterProducts.get('/', cartProductsController.getCartProducts);
cartRouterProducts.get('/:id', cartProductsController.getCartProduct);
cartRouterProducts.post('/', cartProductsController.postCartProduct);
cartRouterProducts.put('/:id', cartProductsController.putCartProduct);
cartRouterProducts.delete('/:id', cartProductsController.deleteCartProduct);


export default cartRouterProducts;




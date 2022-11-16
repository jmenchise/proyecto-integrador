import cartProductController from "/js/controllers/cart-products.js";

class Cart {

    static cartBtn
    static cartModal 
    static cartButtonCountContainer
    static cartButtonCount
    static totalPrice


    static async renderTemplateCart(cartProducts) {
        const textToCompile = await fetch(`templates/cart-modal-product.hbs`).then(r => r.text());
        const template = Handlebars.compile(textToCompile);
        const html = template({cartProducts});
        document.querySelector('.cart-modal__content').innerHTML = html;
    }

    /* Transforma los nodeList en Array para poder utilizar los métodos find() y some() */
    static transformNodeListToArray() {
        const cardsCount = Cart.cartModal.querySelectorAll('.cart-modal__card');
        return Array.from(cardsCount);
    };

    /* Verifica si la card ya existe en el carrito o no
    -------------------------------------------------- */
    static findProductInCart(id) {
        const CartProductHtmlCollection = Cart.transformNodeListToArray();
        return CartProductHtmlCollection.some(product => product.dataset.id === id);
    };


    static getIdFromCard(e, selector) {
        const card = e.target.closest(selector);
        const {id} = card.dataset;
        return id;
    }


    static getCountNumberFromCard(e) {
        const card = e.target.closest('.cart-modal__card');
        const countElement = card.querySelector('.cart-modal__count');
        const countNumber = Number(countElement.innerHTML);
        return countNumber;
    }

    /* Suma la cuenta del producto
    ------------------------------------------------------- */
    static async addCountToProduct(id) {
        const product = await cartProductController.getCartProduct(id);
        product.count++
        const updatedCartProduct = await cartProductController.updateCartProduct(id, product);
        await Cart.cartProductsCounter();
        return updatedCartProduct;
    };

    /* Resta la cuenta del producto
    ------------------------------------------------------- */
    static async reduceCountToProduct(id) {
        const product = await cartProductController.getCartProduct(id);
        product.count--
        const updatedCartProduct = await cartProductController.updateCartProduct(id, product);
        await Cart.cartProductsCounter();
        return updatedCartProduct;
    };


    static async deleteCartProduct(id) {
        const deletedCartProduct = await cartProductController.deleteCartProduct(id);
        await Cart.cartProductsCounter();
        return deletedCartProduct;
    }


    static async saveCartProduct(product) {
        product.count = 1;
        const savedCartProduct = await cartProductController.saveCartProduct(product);
        await Cart.cartProductsCounter();
        return savedCartProduct;
    }

    /* Cuenta de productos del carrito
    -------------------------------------------------- */
    static async cartProductsCounter() {
        const cartProducts = await cartProductController.getCartProducts();
        await Cart.renderTemplateCart(cartProducts);
        const cartProductsHtmlCollection = Cart.transformNodeListToArray();
        const _cartButtonCount = document.querySelector('.main-header__cart-button-count');
        const _cartButtonCountContainer = document.querySelector('.main-header__cart-button-count-container');
        const _totalPrice = document.querySelector('.cart-modal__total-price-number');

        if (cartProducts.length === 0) {
            _cartButtonCount.innerHTML = '';
            _cartButtonCountContainer.classList.remove('main-header__cart-button-count-container--show');
            _totalPrice.innerHTML = '';
            return;
        };

        let newCounter = 0;
        let totalPriceNumber = 0;

        for (const product of cartProductsHtmlCollection) {
            const countElement = product.querySelector('.cart-modal__count');
            const priceElement = product.querySelector('.cart-modal__card-price-value');
            let countNumber = Number(countElement.innerHTML);
            const priceBaseProduct = Number(product.dataset.price);

            /* se multiplica el precio obtenido por la cantidad de ESE producto (card) */
            let priceNumber = priceBaseProduct * countNumber;
            /* Se actualiza el precio en la card y se hace la suma */
            priceElement.innerHTML = priceNumber;
            newCounter += countNumber;
            totalPriceNumber += priceNumber;
            /* Se actaliza la suma total y la cant total de elementos en el carrito */
            _cartButtonCount.innerHTML = newCounter;
            _totalPrice.innerHTML = totalPriceNumber;
        };

        _cartButtonCountContainer.classList.add('main-header__cart-button-count-container--show');
    };
    


    static addCartModalEvents() {
        let cartBtnClick = false;

        const cartModalToggle = e => {     // callback de muestra/cierre del cartModal
            if (!cartBtnClick) {
                Cart.cartBtn.classList.add('main-header__cart-button-container--toggle');
                Cart.cartModal.classList.add('cart-modal-container--show');
                cartBtnClick = true;
                e.stopPropagation();
                return;
            };
            if (cartBtnClick) {
                cartBtnClick = false;
                Cart.cartBtn.classList.remove('main-header__cart-button-container--toggle');
                Cart.cartModal.classList.remove('cart-modal-container--show');
                e.stopPropagation();
            };
        };
        /* eventos de muestra/cierre del cartModal */
        Cart.cartBtn.addEventListener('click', cartModalToggle);
        document.addEventListener('keydown', e => {
            let keyPressed = e.key;
            if (cartBtnClick && keyPressed === 'Escape') {
                cartModalToggle(e);
            };
        });
        /* Eventos de cierre del modal
        -------------------------------------------------- */
        Cart.cartModal.addEventListener('click',async e => {
            if (e.target.classList.contains('cart-modal-container__btn-img')) {
                cartModalToggle(e);
                return;
            };
            /* Elimina la card del carrito
            -------------------------------------------------- */
            if (e.target.classList.contains('cart-modal__delete-card-image')) {
                const id = Cart.getIdFromCard(e, '.cart-modal__card');
                const deletedCartProduct = await Cart.deleteCartProduct(id);
                console.log('deletedCartProduct:', deletedCartProduct)
            };
            /* Se suma una nueva card desde el carrito
            -------------------------------------------------- */
            if (e.target.classList.contains('cart-modal__btn-count-add')) {
                const id = Cart.getIdFromCard(e, '.cart-modal__card');
                const updatedProduct = await Cart.addCountToProduct(id);
                console.log('updatedProduct:', updatedProduct);
            };
            /* Se resta una card desde el carrito
            -------------------------------------------------- */
            if (e.target.classList.contains('cart-modal__btn-count-res')) {
                const id = Cart.getIdFromCard(e, '.cart-modal__card')
                if (Cart.getCountNumberFromCard(e) > 1) {
                    const updatedProduct = await Cart.reduceCountToProduct(id);
                    console.log('updatedProduct:', updatedProduct)
                };
            };
        });
    }




    static async init() {
        Cart.cartBtn = document.querySelector('.main-header__cart-button-container');
        Cart.cartModal = document.querySelector('.cart-modal-container');

        const cartProducts = await cartProductController.getCartProducts();
        console.log(`Se encontraron ${cartProducts.length} productos en el carrito.`);
        await Cart.renderTemplateCart(cartProducts);

        await Cart.cartProductsCounter();


        Cart.addCartModalEvents();
    }
}

export default Cart;




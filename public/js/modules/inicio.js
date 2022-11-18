import productController from   '/js/controllers/products.js';
import Cart from './cart.js';




class PageInicio {

    static cartNotification


    static async renderTemplateCard(ObjToRender, containerSelector, hbsFile) {
        const textToCompile = await fetch(`templates/${hbsFile}.hbs`).then(r => r.text());
        const template = Handlebars.compile(textToCompile);
        const html = template(ObjToRender);
        document.querySelector(containerSelector).innerHTML += html;
    }



    /********************************************/
    /*                                          */
    /*   CODIGO PARA LOS BOTONES DEL CAROUSEL   */
    /*                                          */
    /********************************************/



    static carousel() {

        const _carouselSlider = document.querySelector('.carousel__slider');
        const _carouselItems = document.querySelectorAll('.carousel__item');
        const totalCarouselItems = _carouselItems.length;
        const _carouselSliderShow = ['', 'carousel__slider--show-1', 'carousel__slider--show-2'];
        let indexCarousel = 0;

        let slideCarousel = direction => {
            if (direction === 'next') {
                indexCarousel++;
                if (indexCarousel === totalCarouselItems) {
                    indexCarousel = 0;
                };
            }else {
                indexCarousel = 0 ? indexCarousel = totalCarouselItems -1 : indexCarousel--;
            };

            _carouselSlider.classList.remove(_carouselSliderShow[1], _carouselSliderShow[2]);

            if(indexCarousel) {
                _carouselSlider.classList.add(_carouselSliderShow[indexCarousel]);
            };

        };

        // Carousel automático
        setInterval( () => slideCarousel('next'), 3000);

        //event Listener a los botones del carousel
        document.querySelector('.carousel').addEventListener('click', e => {
            if (e.target.id === 'next') {
                slideCarousel(e.target.id);
                return;
            };
            if (e.target.id === 'prev') {
                slideCarousel(e.target.id);
            };
        });
    }


    static showCartNotification() {
        const cartNotification = document.querySelector('.section-cards__cart-notification');
        cartNotification.classList.add('section-cards__cart-notification--visible');
        setTimeout( () => {
            cartNotification.classList.remove('section-cards__cart-notification--visible');
        }, 2500);

    }

    static cards() {

        document.querySelector('.section-cards').addEventListener('click', async e => {
            let card;

            /* Muestra descripción la de las cards 
            -------------------------------------------------- */
            if (e.target.dataset.action === 'open-description') {
                e.stopPropagation();
                card = e.target.closest('.card');
                card.classList.add('card--show');
            } else if (e.target.dataset.action === 'close-description') {
                e.stopPropagation();
                card = e.target.closest('.card');
                card.classList.remove('card--show');
            };

            /* Agrega la card al carrito
            -------------------------------------------------- */
            if (e.target.classList.contains('card__link')) {
                e.stopPropagation();
                e.preventDefault();
                e.target.closest('.card').classList.remove('card--show');
                const id = Cart.getIdFromCard(e,'.card');
                const product = await productController.getProduct(id);
                if(!Cart.findProductInCart(id)){
                    const savedCartProduct = await Cart.saveCartProduct(product);
                    console.log('savedCartProduct:', savedCartProduct);
                } else {
                    const updatedCartProduct = await Cart.addCountToProduct(id);
                    console.log('updatedCartProduct:', updatedCartProduct);
                };
                PageInicio.showCartNotification();
            };
        });
    }

    
    static async init() {
        console.warn('PageInicio.init() iniciado!');
        
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        await PageInicio.renderTemplateCard({products}, '.section-cards__all-cards-container', 'product-card');;
        PageInicio.carousel();
        PageInicio.cards();
    }

    // loadCards('.section-cards__sale-container', 'card', {cards: saleCards});
    // loadCards('.section-cards__popular-container', 'card', {cards: popularCards});



}

export default PageInicio;

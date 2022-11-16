import Cart from "./modules/cart.js";
class Main {

    /*=============================================
    =              Código de la SPA               =
    =============================================*/
    

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        };
        return id || 'inicio';
    }

    getUrlFromId(id) {
        return `views/${id}.html`;
    } 

    getModulesFromId(id) {
        return `./modules/${id}.js`;
    }

    async ajax(url) {
        return await fetch(url, { method: 'get' }).then(r => r.text());
    }
    

    setActiveLink(id) {
        const navLinks = document.querySelectorAll('.main-nav__link');
        navLinks.forEach(navLink => {
            if (navLink.getAttribute('href') === `#/${id}`) {
                navLink.classList.add('main-nav__link--active');
                navLink.ariaCurrent = 'page';
            } else {
                navLink.classList.remove('main-nav__link--active');
                navLink.removeAttribute('aria-current');
            }
        });
    }

    async initJS(id) {
        const moduleUrl = this.getModulesFromId(id);
        try {
            const  { default: module } = await import(moduleUrl);
            if (typeof module !== 'function') {
                console.error(`El módulo ${id} no posee un método init() asociado.`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`Error al intentar importar el módulo ${moduleUrl}. Detalle: ${error.message}`);
        }
    }

    async getTemplate() {
        const id = this.getIdFromHash();
        const url = this.getUrlFromId(id);

        const page = await this.ajax(url);
        document.querySelector('.main-content').innerHTML = page;

        this.setActiveLink(id);

        this.initJS(id);
    }


    async loadTemplates() {
        this.getTemplate();
        window.addEventListener('hashchange', () => this.getTemplate());
    }
    


    /***********************************************************************************/
    /*                                                                                 */
    /*                              CODIGO PARA LA MAIN NAV                            */
    /*                                                                                 */
    /***********************************************************************************/

    mainNav() {
        
        const _mainNavContainer = document.querySelector('.main-header__main-nav-container');
        const btnContainer = document.querySelector('.main-nav__button-container');

        document.body.addEventListener('click', e => {

            if(e.target === _mainNavContainer || e.target.classList.contains('main-nav__button')){
                _mainNavContainer.classList.add('main-header__main-nav-container--visible');
                btnContainer.classList.add('main-nav__button-container--show');
            } else {
                _mainNavContainer.classList.remove('main-header__main-nav-container--visible');
                btnContainer.classList.remove('main-nav__button-container--show');
            };
            
        });

        //////////////////////////////////////////////////////////////
        //                                                          //
        //    RESETEO POR SI EL HAMBURGER BUTTON QUEDA ACCIONADO    //
        //                                                          //
        //////////////////////////////////////////////////////////////

        window.addEventListener('resize', () => {

            if (innerWidth > 767) {
                document.querySelector('.main-nav-toggle').checked = false;
            } else {
                _mainNavContainer.classList.remove('main-header__main-nav-container--visible');
            };

        });




    }


    
    async start() {
        await this.loadTemplates();
        this.mainNav();
        Cart.init();
    }
    
    
};


const main = new Main();


main.start();


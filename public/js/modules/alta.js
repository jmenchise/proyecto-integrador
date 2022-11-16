import productController from '/js/controllers/products.js';

console.log('MODULO PAGEALTA CARGADO!!!!');


class PageAlta {

    static form
    static fields
    static btnCreate
    static btnUpdate
    static btnReset
    static typeText = 'register-row__input--type-text';
    static typeNumber = 'register-row__input--type-number';
    static fileField

    static validators = {
        'id': '',
        'name': {
            minLength: 3,
            maxLength: 30,
            regExp: /^[A-Z][\wáÁéÉíÍóÓúÚüÜñÑ .''""_-]{2,29}$/,
        },
        'price': {
            min: 0,
            max: 99999,
            regExp: /^[1-9]\d+(\.[1-9]{1,2})?$/,
        },
        'stock': {
            min: 0,
            max: 99999,
            regExp: /^[0-9]+$/,
        },
        'brand': {
            minLength: 3,
            maxLength: 40,
            regExp: /^[\wáÁéÉíÍóÓúÚüÜñ .''""_-]{2,39}$/,
        },
        'category': {
            minLength: 3,
            maxLength: 50,
            regExp: /^[\wáÁéÉíÍóÓúÚüÜñ .''""_-]{2,39}$/,
        },
        'short-description': {
            minLength: 3,
            maxLength: 80,
            regExp: /^[\wáéíóúüÁÉÍÓÚÜñ ¿?¡!''"".,:-]{2,79}$/,
        },
        'long-description': {
            minLength: 10,
            maxLength: 2000,
            regExp: /^[\wáéíóúüÁÉÍÓÚÜñ ¿?¡!''"".,:-]{9,1999}$/,
        },
        'age-from': {
            min: 0,
            max: 99,
            regExp: /^[0-9]+$/,
        },
        'age-up-to': {
            min: 0,
            max: 99,
            regExp: /^[0-9]+$/,
        },
    };

    
    static setLabelfileName(imgFile) {
        const fileSpan = document.querySelector('.register-row__label-file-name');
        fileSpan.innerHTML = imgFile.name || 'click en "foto" para seleccionar un archivo.'
    }
    

    static getFileNameFromLabel() {
        const fileSpan = document.querySelector('.register-row__label-file-name');
        return fileSpan.innerHTML;
    }


    static emptyForm() {
        PageAlta.fields.forEach(field => {
            field.value = ''
            field.closest('.register-form__row').classList.remove('register-form__row--show-content');
            if (field.type === 'checkbox') {
                field.checked = false;
            };
            if (field.id === 'radio-fields') {
                field.querySelector('input:checked').checked = false;
            };
        });
    }


    static completeForm(product) {
        PageAlta.fields.forEach(field => {
            field.value = product[field.name];
            field.closest('.register-form__row').classList.add('register-form__row--show-content');
        });
        //TODO Agregar que tanto el checkbox y el tipo de edad se carguen automáticamente.
    }


    static setCustomValidityForm(message, inputId) {
        const inputElement = document.querySelector(`#${inputId}`);
        const inputRow = inputElement.closest('.register-form__row');
        const errorDetail = inputRow.querySelector('.register-row__error-detail');
        errorDetail.innerHTML = message;
        inputRow.classList.toggle('error', message);
    };


    static validateRegExp(value, validator) {
        return validator.test(value);
    }


    static validateTextField(field, validator) {
        const inputId = field.id;
        let validatedRegExp = true;
        let message = ''
        const valueLength = field.value.length;
        validatedRegExp = PageAlta.validateRegExp(field.value, validator.regExp);

        if (valueLength === 0) {
            message = 'Este campo es obligatorio';
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }
        if (valueLength < validator.minLength) {
            message = `Este campo no puede ser menor a ${validator.minLength} caracteres.`;
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }
        if (valueLength > validator.maxLength) {
            message = `Este campo no puede ser mayor a ${validator.maxLength} caracteres.`;
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }
        if (!validatedRegExp) {
            message = 'Este campo no es válido.';
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }

        PageAlta.setCustomValidityForm(message, inputId);
        return true;
    }


    static validateNumberField(field, validator) {
        const inputId = field.id;
        let validatedRegExp = true;
        let message = ''
        validatedRegExp = PageAlta.validateRegExp(field.value, validator.regExp);

        if (field.value === '') {
            message = 'Este campo es obligatorio';
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }
        if (field.value < validator.min) {
            message = `Este campo no puede tener valores negativos`;
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }
        if (field.value > validator.max) {
            message = `Este valor es muy alto.`;
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }
        if (!validatedRegExp) {
            message = 'Este campo no es válido.'
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }

        PageAlta.setCustomValidityForm(message, inputId);
        return true;
    }


    static validateRadioField(field) {
        const inputId = field.id;
        const radioInput = field.querySelector('input:checked');
        if (!radioInput) {
            const message = 'Debe seleccionar un tipo de edad.';
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        };
        field.name = radioInput.name;
        field.value = radioInput.id;
        return true
    }


    static validateFileField(imgFile) {
        const inputId = PageAlta.fileField.id;
        let message = ''

        if (!imgFile) {
            message = 'Debe cargar la imagen.'
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }
        if (!imgFile.type.includes('image')) {
            message = 'El formato del archivo no es válido';
            PageAlta.setCustomValidityForm(message, inputId);
            return false;
        }

        PageAlta.setCustomValidityForm(message, inputId);
        return true;
    }


    static validateField(field, validator) {
        if (field.classList.contains(PageAlta.typeText)) {
            return PageAlta.validateTextField(field, validator);
        }
        if (field.classList.contains(PageAlta.typeNumber)) {
            return PageAlta.validateNumberField(field, validator);
        }
        if (field.classList.contains('register-row__checkbox')) {
            field.value = field.checked || false;
        }
        if (field.id === 'radio-fields') {
            return PageAlta.validateRadioField(field);
        }

        return true;
    }


    static validateForm() {
        const productToSave = {};
        let allValidated = true;

        for (const field of PageAlta.fields) {
            const fileValidated = PageAlta.validateField(field, PageAlta.validators[field.name]);
            if (!fileValidated) {
                allValidated = false;
            } else {
                productToSave[field.name] = field.value;
            }
        }

        if (!allValidated) {
            console.log('No se creó el objeto.');
            return false;
        }
        return productToSave;
    }


    static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        const products = await productController.getProducts();
        PageAlta.renderTemplateTable(products);
        return savedProduct;
    }


    static async uploadProductImg(imgFile) {
        const uploadedImg = await productController.uploadProductImg(imgFile);
        return uploadedImg;
    }


    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        PageAlta.renderTemplateTable(products);
        return updatedProduct;
    };


    static async addImgToProduct(product) {
        const imgFile = new FormData();
        const imgToUpload = PageAlta.fileField.files[0];
        if (!imgToUpload) {
            return product;
        };
        imgFile.append('img', imgToUpload);
        const uploadedProductImg = await PageAlta.uploadProductImg(imgFile);
        product.img = uploadedProductImg.filename;
        return product;
    }


    static addFormEvents() {
        PageAlta.form.addEventListener('focusout', e => {
            //TODO factorear todo este código urgente!!!!!!!
            const field = e.target;

            if (field.dataset.type === 'button') {
                return;
            };
            PageAlta.validateField(field, PageAlta.validators[field.name]);
            if (!field.value) {
                field.closest('.register-form__row').classList.remove('register-form__row--show-content');
            } else if (field.classList.contains(PageAlta.typeText) || field.classList.contains(PageAlta.typeNumber)){ 
                    field.closest('.register-form__row').classList.add('register-form__row--show-content');
            }
        });

        PageAlta.form.addEventListener('focusin', e => {
            const field = e.target;
            if (field.classList.contains(PageAlta.typeText) || field.classList.contains(PageAlta.typeNumber)) {
                field.closest('.register-form__row').classList.remove('register-form__row--show-content');
            }
        });

        PageAlta.form.addEventListener('submit', async e => {
            e.preventDefault();

            let productToSave = PageAlta.validateForm();
            const imgValidated = PageAlta.validateFileField(PageAlta.fileField.files[0]);

            if (productToSave && imgValidated) {
                productToSave = await PageAlta.addImgToProduct(productToSave);
                console.log('productToSave:', productToSave);
                const savedProduct = await PageAlta.saveProduct(productToSave);
                if (savedProduct) {
                    alert('Producto creado con éxito!');
                };
                console.log('savedProduct:', savedProduct);
                PageAlta.emptyForm();
                const imgFile = false;
                PageAlta.setLabelfileName(imgFile);
            }
        });

        PageAlta.form.addEventListener('reset', e => {
            const message = '';

            for(const field of PageAlta.fields) {
                PageAlta.setCustomValidityForm(message, field.id);
            };
            PageAlta.setCustomValidityForm(message, PageAlta.fileField.id);
            const imgFile = false;
            PageAlta.setLabelfileName(imgFile);
            PageAlta.btnCreate.disabled = false;
            PageAlta.btnUpdate.disabled = true;
            PageAlta.btnReset.value = 'Restablecer valores';
        });
        
        PageAlta.btnUpdate.addEventListener('click', async e => {
            let productToUpdate = PageAlta.validateForm();
            let imgValidated = true;

            if(PageAlta.fileField.files[0]) {
                imgValidated = PageAlta.validateFileField(PageAlta.fileField.files[0]);
            }

            if (productToUpdate && imgValidated) {
                //TODO separar en una función aparte. mucho código suelto.
                if (PageAlta.fileField.files[0]) {
                    const productName = productToUpdate.name;
                    const row = document.querySelector(`[data-name="${productName}"]`);
                    const { img } = row.dataset
                    const deletedProductImg = await productController.deleteProductImg(img);
                    console.log('deletedProductImg:', deletedProductImg)
                }
                productToUpdate = await PageAlta.addImgToProduct(productToUpdate);
                const updatedProduct = await PageAlta.updateProduct(productToUpdate);
                if (updatedProduct) {
                    alert('Producto modificado con éxito!');
                };
                console.log('updated Product:' , updatedProduct);
                PageAlta.emptyForm();
                const imgFile = false;
                PageAlta.setLabelfileName(imgFile);
                PageAlta.btnUpdate.disabled = true;
                PageAlta.btnCreate.disabled = false;
                PageAlta.btnReset.value = 'Restablecer valores';
            }
        });

        PageAlta.fileField.addEventListener('change', e => {
            const imgFile = e.target.files[0];
            PageAlta.setLabelfileName(imgFile);
        });
    }


    static async renderTemplateTable(products) {
        const textToCompile = await fetch(`templates/products-table.hbs`).then(r => r.text());
        const template = Handlebars.compile(textToCompile);
        const html = template({products});
        document.querySelector('.register-products__table-container').innerHTML = html;
    }


    static async addTableEvents() {
        const deleteProduct = async e => {
            if (!confirm('Estás seguro de eliminar el producto??')) {
                return;
            }
            const row = e.target.closest('tr');
            const { id, img } = row.dataset;
            const deletedProductImg = await productController.deleteProductImg(img);
            const deletedProduct = await productController.deleteProduct(id);
            console.log('deletedProductImg:', deletedProductImg)
            console.log('Producto eliminado:', deletedProduct);
            const products = await productController.getProducts();
            PageAlta.renderTemplateTable(products);
        };

        const editProduct = async e => {
            const row = e.target.closest('tr');
            const productToEdit = {
                'id': row.dataset.id,
                'name': row.dataset.name,
                'price': row.dataset.price,
                'stock': row.dataset.stock,
                'brand': row.dataset.brand,
                'category': row.dataset.category,
                'age-from': row.dataset.ageFrom,
                'age-up-to': row.dataset.ageUpTo,
                'short-description': row.dataset.shortDescription,
                'long-description': row.dataset.longDescription
            };
            PageAlta.completeForm(productToEdit);
            const imgFile = {'name': row.dataset.img};
            PageAlta.setLabelfileName(imgFile);
            PageAlta.btnUpdate.disabled = false;
            PageAlta.btnCreate.disabled = true;
            PageAlta.btnReset.value = 'Cancelar';
        }
        

        document.addEventListener('click', e => {
            if (e.target.classList.contains('table-body__btn-delete')) {
                deleteProduct(e);
                return;
            }
            if (e.target.classList.contains('table-body__btn-edit')) {
                editProduct(e);
                return;
            }
        })
    }


    static async init() {
        PageAlta.form = document.querySelector('.register-form');
        PageAlta.fields = PageAlta.form.querySelectorAll(
            `
                .register-row__input--type-text, 
                .register-row__input--type-number, 
                .register-row__input--type-hidden,
                .register-row__checkbox,
                #radio-fields
            `
        );
        PageAlta.btnCreate = PageAlta.form.querySelector('.register-form__submit-button');
        PageAlta.btnUpdate = PageAlta.form.querySelector('.register-form__update-button');
        PageAlta.btnReset = PageAlta.form.querySelector('.register-form__reset-button');
        PageAlta.fileField = PageAlta.form.querySelector('.register-row__input-file-type');
        PageAlta.addFormEvents();
        
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        await PageAlta.renderTemplateTable(products);
        PageAlta.addTableEvents();

    }


}

export default PageAlta;
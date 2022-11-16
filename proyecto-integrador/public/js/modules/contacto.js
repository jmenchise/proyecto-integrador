console.log('MODULO PAGECONTACTO CARGADO!!!!');


class PageContacto {

    static form
    static fields
    static typeText = 'contact-row__input--type-text';
    static typeEmail = 'contact-row__input--type-email';

    static validators = {
        'name': {
            minLength: 3,
            maxLength: 30,
            regExp: /^[A-Z][\wáÁéÉíÍóÓúÚüÜñÑ .''""_-]{2,29}$/,
        },
        'email': {
            regExp: /[a-z0-9\\._-]+@[a-z]+\.[a-z]{2,3}$/,
        },
        'comments': {
            minLength: 10,
            maxLength: 2000,
            regExp: /^[\wáéíóúüÁÉÍÓÚÜñ ¿?¡!''"".,:-]{9,1999}$/,
        },
    };


    static emptyForm() {
        PageContacto.fields.forEach(field => {
            field.value = ''
            field.closest('.contact-form__row').classList.remove('contact-form__row--show-content');
        });
    }


    static setCustomValidityForm(message, inputId) {
        const inputElement = document.querySelector(`#${inputId}`);
        const inputRow = inputElement.closest('.contact-form__row');
        const errorDetail = inputRow.querySelector('.contact-row__error-detail');
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
        validatedRegExp = PageContacto.validateRegExp(field.value, validator.regExp);

        if (valueLength === 0) {
            message = 'Este campo es obligatorio';
            PageContacto.setCustomValidityForm(message, inputId);
            return false;
        }
        if (valueLength < validator.minLength) {
            message = `Este campo no puede ser menor a ${validator.minLength} caracteres.`;
            PageContacto.setCustomValidityForm(message, inputId);
            return false;
        }
        if (valueLength > validator.maxLength) {
            message = `Este campo no puede ser mayor a ${validator.maxLength} caracteres.`;
            PageContacto.setCustomValidityForm(message, inputId);
            return false;
        }
        if (!validatedRegExp) {
            message = 'Este campo no es válido.';
            PageContacto.setCustomValidityForm(message, inputId);
            return false;
        }

        PageContacto.setCustomValidityForm(message, inputId);
        return true;
    }


    static validateEmailField(field, validator) {
        const inputId = field.id;
        let validatedRegExp = true;
        let message = ''
        validatedRegExp = PageContacto.validateRegExp(field.value, validator.regExp);

        if (field.value === 0) {
            message = `Este campo es obligatorio.`;
            PageContacto.setCustomValidityForm(message, inputId);
            return false;
        };
        if (!validatedRegExp) {
            message = 'Este campo no es válido';
            PageContacto.setCustomValidityForm(message, inputId);
            return false;
        };

        PageContacto.setCustomValidityForm(message, inputId);
        return true;
    }


    static validateField(field, validator) {
        if (field.classList.contains(PageContacto.typeText)) {
            return PageContacto.validateTextField(field, validator);
        }
        if (field.classList.contains(PageContacto.typeEmail)) {
            return PageContacto.validateEmailField(field, validator);
        }

        return true;
    }


    static validateForm() {
        let allValidated = true;

        for (const field of PageContacto.fields) {
            const fileValidated = PageContacto.validateField(field, PageContacto.validators[field.name]);
            if (!fileValidated) {
                allValidated = false;
            } 
        }

        if (!allValidated) {
            return false;
        }
        return true;
    }


    static addFormEvents() {
        PageContacto.form.addEventListener('focusout', e => {
            //TODO factorear todo este código urgente!!!!!!!
            const field = e.target;

            if (field.dataset.type === 'button') {
                return;
            };
            PageContacto.validateField(field, PageContacto.validators[field.name]);
            if (!field.value) {
                field.closest('.contact-form__row').classList.remove('contact-form__row--show-content');
            } else { 
                    field.closest('.contact-form__row').classList.add('contact-form__row--show-content');
            }
        });

        PageContacto.form.addEventListener('focusin', e => {
            const field = e.target;

            if (!field.dataset.type === 'button') {
                field.closest('.contact-form__row').classList.remove('contact-form__row--show-content');
            }
        });

        PageContacto.form.addEventListener('submit', e => {
            e.preventDefault();

            if (PageContacto.validateForm()) {
                    alert('Su comentario fue enviado con éxito!');
                PageContacto.emptyForm();
            }
        });

        PageContacto.form.addEventListener('reset', e => {
            const message = '';

            for(const field of PageContacto.fields) {
                PageContacto.setCustomValidityForm(message, field.id);
            };
        });
    }


    static init() {
        PageContacto.form = document.querySelector('.contact-form');
        PageContacto.fields = PageContacto.form.querySelectorAll(
            `
                .contact-row__input--type-text, 
                .contact-row__input--type-email 
            `
        );
        PageContacto.addFormEvents();

    }

}

export default PageContacto
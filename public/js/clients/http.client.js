
class Http {

    async get(url, id) {
        try {
            const response = await fetch (url + (id || ''));
            return response.url.includes('uploads') ? response.text() : response.json();
        } catch (error) {
            console.error(`Error al intentar conectar por [GET]. Detalle: ${error.message}`);
        };
    }

    async post(url, object) {
        if (url.includes('uploads')) {
            try {
                return await fetch(url, {
                    method: 'post',
                    body: object
                }).then(r => r.json());
            } catch (error) {
                console.error(`Error al intentar conectar por [POST]. Detalle: ${error.message}`);
            }
        } else {
            try {
                return await fetch(url, {
                    method: 'post',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(object)
                }).then(r => r.json());
            } catch (error) {
                console.error(`Error al intentar conectar por [POST]. Detalle: ${error.message}`);
            }
        }
    }

    async put(url, id, object) {
        try {
            return await fetch(url + id, {
                method: 'put',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(object)
            }).then(r => r.json());
        } catch (error) {
            console.error(`Error al intentar conectar por [PUT]. Detalle: ${error.message}`);
        }
    }

    async delete(url, id) {
        try {
            return await fetch(url + id, {method: 'delete'}).then(r => r.json());
        } catch (error) {
            console.error(`Error al intentar conectar por [DELETE]. Detalle: ${error.message}`);
        }
    }


};

const http = new Http();

export default http;
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import config from './config.js';
import routerProducts from './router/products.js';
import cartRouterProducts from './router/cart-products.js';
import upload from './upload-file-config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static('public', {extensions: ['html', 'htm']}));
app.use(express.json());


app.use('/api/products', routerProducts);
app.use('/cart/products', cartRouterProducts);



app.get('/tmp/uploads/:imgName', (req, res) => {
    const { imgName } = req.params;
    res.sendFile(`${__dirname}/tmp/uploads/${imgName}`);
});

app.post('/tmp/uploads', upload.single('img'), (req, res) => {
    const uploadedProductImg = req.file;
    res.json(uploadedProductImg);
})

app.delete('/tmp/uploads/:imgName', (req, res) => {
    const { imgName } = req.params;
    fs.unlink(`${__dirname}/tmp/uploads/${imgName}`, () => {
        res.json(`Archivo ${imgName} eliminado!`);
    });
});



const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando por el puerto ${PORT}.`));
server.on('error', (error) => console.error(`Error al intentar conectar el servidor. Detalle: ${error.message}`));




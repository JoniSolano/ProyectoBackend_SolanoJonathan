import express from 'express';
const app = express();
app.use(express.urlencoded({extended:true}));

import ProductManager from "../ProductManager.js";
const productManager = new ProductManager("../products.json");

app.get('/', async (req, res) => {
    let titulo = await '<h1>Actividad N°3</h1> <div>Comisión 47300</div> <div>Alumno: Solano Jonathan Ariel</div>';
    res.send(titulo)
})

app.get('/products', async (req, res) => {
    let products = await productManager.getProducts();

    let limit = req.query.limit
    if (limit) {
        res.send(products.slice(0, limit))
    } else {
        res.send(products)
    }
})

app.get('/products/:pid', async (req, res) => {
    const idProduct = req.params.pid;
    let productFound = await productManager.getProductById(parseInt(idProduct));
    if (!productFound) {
        res.send({Error : "Producto inexistente"})
    } else {
        res.send(productFound);
    }
})

app.listen(8080, () => console.log("Servidor corriendo en puerto http://localhost:8080/"))
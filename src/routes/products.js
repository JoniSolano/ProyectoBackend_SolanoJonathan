import express from 'express';
export const productsRouter = express.Router();
import ProductManager from "../functions/ProductManager.js";
const productManager = new ProductManager("../products.json");

productsRouter.use(express.json());
productsRouter.use(express.urlencoded({extended: true}));

productsRouter.get('/', async (req, res) => {
    let products = await productManager.getProducts();

    let limit = req.query.limit
    if (limit) {
        res.json(products.slice(0, limit))
    } else {
        res.json(products)
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const idProduct = req.params.pid;
    let productFound = await productManager.getProductById(parseInt(idProduct));
    if (!productFound) {
        res.send({Error : "Producto inexistente"})
    } else {
        res.status(200).json({
            status: "Success",
            msg: "Producto encontrado",
            data: productFound
        })
    }
})

productsRouter.post('/', (req, res) => {
    const prod = req.body;
    productManager.addProduct(prod);
    res.status(200).json({
        status: "Success",
        msg: `Producto creado`,
        data: prod
    })
})

productsRouter.put('/:pid', (req, res) => {
    const idProduct = req.params.pid;
    const prod = req.body;
    productManager.updateProduct(parseInt(idProduct), prod);
    res.status(200).json({
        status: "Success",
        msg: "Producto actualizado",
        data: prod
    })
})

productsRouter.delete('/:pid', (req, res) => {
    const idProduct = req.params.pid;
    let productFound = productManager.getProductById(parseInt(idProduct));
    productManager.deleteProduct(parseInt(idProduct));
    res.status(200).json({
        status: "Success",
        msg: "Producto eliminado",
        data: productFound
    })
})
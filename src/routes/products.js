import express from 'express';
const router = express.Router();
import ProductManager from "../functions/ProductManager.js";
const productManager = new ProductManager("../products.json");

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', async (req, res) => {
    let products = await productManager.getProducts();

    let limit = req.query.limit
    if (limit) {
        res.json(products.slice(0, limit))
    } else {
        res.json(products)
    }
})

router.get('/:pid', async (req, res) => {
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

router.post('/', (req, res) => {
    const prod = req.body;
    productManager.addProduct(prod);
    res.status(200).json({
        status: "Success",
        msg: `Producto creado`,
        data: prod
    })
})

router.put('/:pid', (req, res) => {
    const idProduct = req.params.pid;
    const prod = req.body;
    productManager.updateProduct(parseInt(idProduct), prod);
    res.status(200).json({
        status: "Success",
        msg: "Producto actualizado",
        data: prod
    })
})

router.delete('/:pid', (req, res) => {
    const idProduct = req.params.pid;
    let productFound = productManager.getProductById(parseInt(idProduct));
    productManager.deleteProduct(parseInt(idProduct));
    res.status(200).json({
        status: "Success",
        msg: "Producto eliminado",
        data: productFound
    })
})

export default router;
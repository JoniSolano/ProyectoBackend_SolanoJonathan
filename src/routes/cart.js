import express from 'express';
const router = express.Router();

import CartManager from "../functions/CartManager.js";
const cartManager = new CartManager("../carts.json")

import ProductManager from "../functions/ProductManager.js";
const productManager = new ProductManager("../products.json");

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/', (req, res) => {
    let newCart = cartManager.createCart();
    res.status(200).json({
        status: "Success",
        msg: "Carrito creado",
        data: newCart
    })
})

router.get('/', (req,res) => {
    let carts = cartManager.getCarts();
    res.status(200).json({
        status: "Success",
        msg : "Mostrando todos los carritos",
        data: carts
    })
})

router.get('/:cid', (req, res) => {
    const idCart = req.params.cid;
    let cartFound = cartManager.getCartById(parseInt(idCart));
    if (!cartFound) {
        res.status(400).json({
            status: "Error",
            error: `El carrito ${idCart} es inexistente` 
        })
    } else {
        res.status(200).json( {
            status: "Success",
            msg: `Carrito ${idCart} encontrado`,
            data: cartFound
        })
    }
})

router.post("/:cid/products/:pid", (req, res) => {
    let idCart = parseInt(req.params.cid);
    let idProduct = parseInt(req.params.pid);
    const cart = cartManager.getCartById(idCart);
    const product = productManager.getProductById(idProduct);
    if (!cart) {
        res.status(404).json({status: "error", error: `Carrito ${idCart} no econtrado`})
    } else if (!product) {
        res.status(404).json({status: "Error", error: `Producto ${idProduct} no encontrado`})
    }
    cartManager.addProductToCart(idCart, idProduct);
    res.status(200).json({
        status: "Success",
        msg: "Producto agregado al carrito",
        data: cart
    })

})

export default router;
import fs from "fs";

import ProductManager from "./ProductManager.js";
const productManager = new ProductManager("../products.json");

export default class CartManager {

    constructor (filePath) {
        this.path = filePath;
        this.carts = [];

        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        }catch (error) {
            this.carts = [];
        }
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf-8');
    }

    createCart() {
        const newCart = { id: this.carts.length +1, products: []}

        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCarts() {
        this.loadCarts();
        return this.carts;

    }

    getCartById(idCart) {
        this.loadCarts();
        const cartFound = this.carts.find(cart => cart.id === idCart);
        if(!cartFound) {
            console.log("Carrito inexistente");
            return null;
        }else{
            return cartFound;
        }
    }

    addProductToCart(idCart, idProduct) {
        const cart = this.carts.find((cart) => cart.id === idCart);
        const exitingProduct = cart.products.find((product) => product.id === idProduct);

        if(exitingProduct) {
            exitingProduct.quantity++;
        } else {
            cart.products.push({
                id: idProduct,
                quantity: 1
            });
        }

        this.saveCarts();
        console.log("Producto agregado correctamente")
    }
}
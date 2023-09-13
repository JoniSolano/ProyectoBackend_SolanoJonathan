import express from "express"
import ProductManager from "../functions/ProductManager.js";

export const homeRouter = express.Router()

const productManager = new ProductManager("products.json");


homeRouter.get('/', (req,res)=>{
    try{
        let products = productManager.getProducts()

        return res
        .status(200)
        .render('home', {title: "All products",style: "css/home.css", products})
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Error al obtener los productos" })
    }
    
})
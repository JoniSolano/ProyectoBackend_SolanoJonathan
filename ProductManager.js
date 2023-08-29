import fs from "fs";

export default class ProductManager {

    constructor (filePath) {
        this.path = filePath;
        this.products = [];

        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        }catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf-8');
    }

    getProducts() {
        this.loadProducts();
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const productoExistente = this.products.some((product) => product.code === code);

        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error! Complete todos los campos por favor")
        } else if (productoExistente){
            return console.error("Error! Producto ya existente");
        } else {
            this.products.push(newProduct);
            this.saveProducts();
            console.log("Producto agregado correctamente", newProduct)
        }
    }

    getProductById(idProduct) {
        this.loadProducts();
        const findProduct = this.products.find(product => product.id === idProduct);
        if(!findProduct) {
            console.log("Producto inexistente");
            return null;
        }else{
            return findProduct;
        }
    }

    updateProduct(id, modifiedProduct) {
        const prodIndex = this.products.findIndex(product => product.id === id);
        if (prodIndex !== -1) {
            this.products[prodIndex] = {
                ...this.products[prodIndex],
                ...modifiedProduct
            }
            this.saveProducts();
            console.log("Producto modificado", this.products[prodIndex]);
        } else {
            console.log("Producto no encontrado")
        }
    }

    deleteProduct(id) {
        const prodIndex = this.products.findIndex(product => product.id === id);
        if (prodIndex !== -1) {
            const deletedProd = this.products.splice(prodIndex, 1)[0];
            this.saveProducts();
            console.log("Producto eliminado:", deletedProd);
        } else {
            console.log("Producto no encontrado");
        }
    }
}



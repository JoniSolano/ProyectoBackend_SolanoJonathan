import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from "./functions/ProductManager.js";
import cartRoutes from './routes/cart.js';
import { homeRouter } from './routes/home.router.js';
import { productsRouter } from './routes/products.js';
import { realTimeProductsRouter } from './routes/realtimeproducts.router.js';
import { __dirname } from './utils.js';
const productManager = new ProductManager("products.json");

const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})

const socketServer = new Server(httpServer)
;
socketServer.on("connection", (socket) => {
  console.log(`New client: ${socket.id}`);

  socket.on("new-product", async (newProd) => {
    try {
      await productManager.addProduct({ ...newProd });

      // Actualizar lista después de agregar producto
      const productsList = await productManager.getProducts();
      console.log(productsList);

      socketServer.emit("products", productsList);
    } catch (err) {
      console.log(err);
    }
  });
  
  socket.on("delete-product", async (productId) => {
    try {
      await productManager.deleteProduct(productId);
  
      const productsList = await productManager.getProducts();
      console.log(productsList);
      socketServer.emit("products", productsList);
    } catch (err) {
      console.log(err);
    }
  });
});

app.use('/home', homeRouter)
app.use('/realtimeproducts', realTimeProductsRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRoutes);

app.get('/', async (req, res) => {
    let titulo = await '<h1>Desafío: Websockets + Handlebars</h1> <div>Comisión 47300</div> <div>Alumno: Solano Jonathan Ariel</div>';
    res.send(titulo)
})
import express from 'express';
import productsRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.get('/', async (req, res) => {
//     let titulo = await '<h1>Actividad N°3</h1> <div>Comisión 47300</div> <div>Alumno: Solano Jonathan Ariel</div>';
//     res.send(titulo)
// })

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartRoutes);

app.listen(8080, () => console.log("Servidor corriendo en puerto http://localhost:8080/"))
const socket = io();

const addProductform = document.getElementById("productForm");
const titleInput = document.getElementById("titleForm");
const descriptionInput = document.getElementById("descriptionForm");
const priceInput = document.getElementById("priceForm");
const codeInput = document.getElementById("codeForm");
const stockInput = document.getElementById("stockForm");
const imgInput = document.getElementById("imgForm");

addProductform.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: titleInput.value,
    description: descriptionInput.value,
    code: codeInput.value,
    thumbnail: imgInput.value,
    stock: stockInput.value,
    price: priceInput.value,
  };
  socket.emit("new-product", newProduct);
  addProductform.reset();
});

const deleteProductForm = document.getElementById("deleteProductForm");
const productId = document.getElementById("productId");

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("delete-product", parseInt(productId.value));
  deleteProductForm.reset();
});

socket.on("products", (productsList) => {
  document.getElementById("dinamic-list").innerHTML = productsList.map((product) => {
    return `
    <div class="card">
      <div class="title">
        <h2>${product.title}</h2>
      </div>
      <div class="details">
        <div>
            <img style="width: 50px; max-height: 50px" src=${product.thumbnail}/>
        </div>
        <div>
          <ul class="detail-list">
            <li>ID: ${product.id}</li>
            <li>${product.description}</li>
            <li>Código: ${product.code}</li>
            <li>Stock: ${product.stock}</li>
            <li>Precio: USD $${product.price}</li>
            <li>Status: ${product.status}</li>
          </ul>
        </div>
      </div>
    </div>`;
  })
  .join("");
});
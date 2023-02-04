const productForm = document.getElementById("productForm");
let id = document.getElementById("productId");
let modificar = document.getElementById("modificar");
let productName = document.getElementById('name');
let productDescription = document.getElementById('description');
let productCategory = document.getElementById('category');
let productPrice = document.getElementById('price');
let productStock = document.getElementById('stock');
let productThumbnail = document.getElementById('thumbnail');
let productCode = document.getElementById('code');

modificar.addEventListener("click", () => {
    getProduct(id.value)
});

const getProduct = (id) => {
  fetch(`/api/products/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      if(!data._id) { Swal.fire('ID no Valido o Inexistente') };
      productName.value = data.name;
      productDescription.value = data.description;
      productCategory.value = data.category;
      productPrice.value = data.price;
      productStock.value = data.stock;
      productCode.value = data.code;
    });
};

const handleSubmit = (evt, form, route) => {
  evt.preventDefault();
  let url = route+'/'+id.value;
  let formData = new FormData(form);
  fetch(url, {
    method: "PUT",
    body: formData,
  })
  .then((response) => response.json())
  .then((data) => {
    Swal.fire(data.message);
  })
  productForm.reset();
};





productForm.addEventListener("submit", (e) => {
  handleSubmit(e, e.target, "api/products");
});
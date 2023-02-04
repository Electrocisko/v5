const productForm = document.getElementById("productForm");
let code = document.getElementById("productCode");
let getByCode = document.getElementById("getByCode");
let productName = document.getElementById("name");
let productDescription = document.getElementById("description");
let productCategory = document.getElementById("category");
let productPrice = document.getElementById("price");
let productStock = document.getElementById("stock");
let productThumbnail = document.getElementById("thumbnail");
let productCode = document.getElementById("code");

getByCode.addEventListener("click", () => {
  getProduct(code.value);
});

const getProduct = (code) => {
  fetch(`/api/products/code/${code}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.code) {
        Swal.fire(data.message);
      }
      productName.value = data.name;
      productDescription.value = data.description;
      productCategory.value = data.category;
      productPrice.value = data.price;
      productStock.value = data.stock;
      productCode.value = data.code;
    });
};

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  fetch(`api/products/code/${code.value}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => Swal.fire(data.message))
    .catch((error) => console.log(error));
  productForm.reset();
});

const productForm = document.getElementById("productForm");

const handleSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form);
  fetch(route, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "succes") {
        Swal.fire("Agregado");
        productForm.reset();
      } else {
        Swal.fire(data.message);
      }
    });
};

productForm.addEventListener("submit", (e) => {
  handleSubmit(e, e.target, "api/products");
});

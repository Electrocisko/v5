let deletedProduct = document.getElementById("deleted");
let id = document.getElementById("productId");

deletedProduct.addEventListener("click", (e) => {
  Swal.fire({
    title: "Esta seguro?",
    text: "Esta operación no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Borrado!", "El producto fue eliminado.", "success");
      deleteProductById(id.value);
      id.value = "";
    }
  });
});

const deleteProductById = (item) => {
  let url = `/api/products/${item}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => showResult(data.status));
};

const showResult = (result) => {
  Swal.fire(result);
};

let eventList = document.querySelectorAll(".addCart");
let cartId = document.getElementById("cartId").textContent;
let eventDetail = document.querySelectorAll(".seeDetail");
let inStock;
let url = `/api/carts/${cartId}/products`;

const toast = new bootstrap.Toast(document.getElementById("liveToast"));
const stockToast = new bootstrap.Toast(document.getElementById("stockToast"));

const loadingData = (state) => {
  const loading  = document.getElementById('spinner')
  if (state) {
    loading.classList.remove('d-none');
  }
else {
  loading.classList.add('d-none');
}
}


eventList.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    let prodID = element.value;
    loadingData(true);
    ///////////////////////
    fetch(`/api/products/${prodID}`)
      .then((response) => response.json())
      .then((json) => {
        inStock = json.stock;
        if (inStock <= 0) {
          loadingData(false);
          stockToast.show();
        } else {
          console.log("con stock");
          fetch(url, {
            method: "PUT",
            body: JSON.stringify({
              product: prodID,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then(toast.show())
            .then(() => {
              fetch(`/api/products/${prodID}`, {
                method: "PUT",
                body: JSON.stringify({
                  stock: inStock - 1,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.json())
                .then(() => {
                  loadingData(false);
                    location.reload();
              
                });
            });
        }
      });
  });
});

eventDetail.forEach((product) => {
  product.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign(`/productdetail?productId=${product.value}`);
  });
});

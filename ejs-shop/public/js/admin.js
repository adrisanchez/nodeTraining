const deleteProduct = (btn) => {
  const prodId = btn.parentElement.querySelector("[name=productId]").value;
  const csrfToken = btn.parentElement.querySelector("[name=_csrf]").value;

  const productElement = btn.closest("article");
  
  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      "csrf-token": csrfToken,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      productElement.parentNode.removeChild(productElement);
    })
    .catch((err) => {
      console.log(err);
    });
};

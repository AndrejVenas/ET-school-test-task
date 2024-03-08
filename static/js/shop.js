let products = localStorageUtil.getProducts();
let buttons = document.querySelectorAll('.item-product__btn');

buttons.forEach(e => {
  let id = e.getAttribute('data-id');
  console.log(id);
  console.log(products.indexOf(id));
  if(-1 === products.indexOf(id))
    e.textContent = 'Add to cart';
  else
    e.textContent = 'Remove from cart';
});
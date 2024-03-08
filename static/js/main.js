class LocalStorageUtil {
  constructor() {
    this.keyName = 'products';
  }

  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);
    if(productsLocalStorage !== null)
      return JSON.parse(productsLocalStorage);
    return [];
  }

  putProducts(id) {
    let products = this.getProducts();
    let status = false;
    const index = products.indexOf(id);

    if(index === -1){
      products.push(id);
      status = true;
    }
    else
      products.splice(index, 1);

    localStorage.setItem(this.keyName, JSON.stringify(products));
    return {status, products}
  }

  deleteProducts(id) {
    let products = this.getProducts();
    const index = products.indexOf(id);
    products.splice(index, 1);
    localStorage.setItem(this.keyName, JSON.stringify(products));
  }
}

const localStorageUtil = new LocalStorageUtil();
const cartValue = document.querySelector('.cart__value')
cartValue.textContent = localStorageUtil.getProducts().length;

let btns = document.querySelectorAll('.item-product__btn');
btns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const id = btn.getAttribute('data-id');
    if(localStorageUtil.putProducts(id).status == true) {
      btn.textContent = 'Remove from cart';
    } else {
      btn.textContent = 'Add to cart';
    }
    cartValue.textContent = localStorageUtil.getProducts().length;
    console.log(localStorageUtil.getProducts().length);
  });
});
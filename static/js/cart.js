let data = localStorage.getItem('products');

console.log(data);

function renderCart(res)
{
  let box = document.querySelector('.cart__order-info');
  box.innerHTML = res;
}

function checkerCloseBtn() {
  let btnRemvoe = document.querySelectorAll('.order-card__close-btn');
    btnRemvoe.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const id = btn.getAttribute('data-id');
        localStorageUtil.deleteProducts(id);
        cartValue.textContent = localStorageUtil.getProducts().length;
        sendDataAxios(localStorage.getItem('products'));
      });
    });
}

function sendDataAxios(data) {
  console.log('data send!');
  axios.post('http://localhost:3000/cart', 
  {data: data},
  { headers: {
    'Content-Type': 'application/json'
  }}
  )
  .then(response => {
    renderCart(response.data.page);
    checkerCloseBtn();
    addProductCount();
    removeProductCount();
    sendForm();
  })
  .catch(error => {
    console.error('Failed to send data:', error);
  });
}

if(data) {
  sendDataAxios(data);
}

let cards = document.querySelectorAll('.order-card');

function addProductCount() {
  let btnsAdd = document.querySelectorAll('.order-count__add');
  btnsAdd.forEach(function(btnAdd) {
    btnAdd.addEventListener('click', function() {
      const id = this.getAttribute("data-id");
      let field = document.querySelector(`.order-count__num--${id}`);
      field.value++;
    });
  });
}

function removeProductCount() {
  let btnsRemove = document.querySelectorAll('.order-count__remove');
  btnsRemove.forEach(function(btnRemove) {
    btnRemove.addEventListener('click', function() {
      const id = this.getAttribute("data-id");
      let field = document.querySelector(`.order-count__num--${id}`);
      if(field.value > 1)
        field.value--;
    });
  });
}

function removeErrorSelection(object) {
  object.addEventListener('change', (e) => {
    object.classList.remove('cart-input-error');
  });
}

function sendForm() {
  const submitBtn = document.querySelector('.cart__button');
  submitBtn.addEventListener('click', function(e) {
  e.preventDefault();

  let fname = document.getElementById('fname');
  let lname = document.getElementById('lname');
  let mail = document.getElementById('mail');
  let phone = document.getElementById('phone');
  let adress = document.getElementById('adress');

  if (fname.value.trim() === '') {
    fname.classList.add('cart-input-error');
    removeErrorSelection(fname);
  } if (lname.value.trim() === '') {
    lname.classList.add('cart-input-error');
    removeErrorSelection(lname);
  } if (mail.value.trim() === '') {
    mail.classList.add('cart-input-error');
    removeErrorSelection(mail);
  } if (phone.value.trim() === '') {
    phone.classList.add('cart-input-error');
    removeErrorSelection(phone);
  } if (adress.value.trim() === '') {
    adress.classList.add('cart-input-error');
    removeErrorSelection(adress);  
  }

  fname = fname.value;
  lname = lname.value;
  mail = mail.value;
  phone = phone.value;
  adress = adress.value;

  if (!(fname.trim() === '' || lname.trim() === '' || mail.trim() === '' || phone.trim() === '' || adress.trim() === ''))
  {
    let dataOrder = {};
    localStorageUtil.getProducts().forEach(element => {
      const count = document.querySelector(`.order-count__num--${element}`);
      dataOrder[element] = count.value;
    });
    const data = {
      'tuname': fname,
      'tusurname': lname,
      'tumail': mail,
      'tuphone': phone,
      'tuadress': adress,
      'order': dataOrder
    };
  
    console.log(data);
    axios.post('http://localhost:3000/cartorder', 
    {data: data},
    { headers: {
      'Content-Type': 'application/json'
    }}
    )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('Failed to send data:', error);
    });
  }
  

})
}
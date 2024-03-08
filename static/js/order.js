let btn = document.querySelector('.order__form-btn');
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let data = document.querySelector('.order__form-input');
  if(data.value){
    axios.post('http://localhost:3000/order', 
    {data: data.value},
    { headers: {
      'Content-Type': 'application/json'
    }}
    )
    .then(res => {
      let box = document.querySelector('.order__inner');
      box.innerHTML += res.data;
      console.log(res.data);
    })
    .catch(error => {
      console.error('Failed to send data:', error);
  });
  }
  else {
    data.classList.add('red-input');
  } 
});


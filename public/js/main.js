const appendBtn = document.querySelectorAll('.appendBtn');
const category = document.getElementById('category');

const buttons = [...appendBtn];

buttons.forEach((btn) => {
  btn.addEventListener('click', async (event) => {
    const response = await fetch(`/category/${event.target.dataset.category_index}`, {
      method: 'POST',
    });
    const data = await response.text();
    category.innerHTML = data;
  });
});



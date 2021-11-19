// const buyButtons = document.querySelectorAll('.buyBtn');
const categoryContainer = document.getElementById('categoryContainer');

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('buyBtn')) {
    // console.log(event.target.dataset.id);
    const response = await fetch(`/api/buy/${event.target.dataset.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // id:
      }),
    });
    const responseJSON = await response.json();
  }
});

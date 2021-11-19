const productsDiv = document.getElementById('product-list-container');
const { editForm } = document;

editForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {
    action,
    title,
    price,
    discount,
    latitude,
    longitude,
    categoryName,
  } = event.target;

  console.log(action);

  const response = await fetch(action, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.value,
      price: price.value,
      discount: discount.value,
      latitude: latitude.value,
      longitude: longitude.value,
      categoryName: categoryName.value,
    }),
  });

  const responseJson = await response.json();
  window.alert('✅ Продукт изменён ✅');
  window.location.href = '/';
});

productsDiv?.addEventListener('click', async (event) => {
  if (event.target.classList.contains('deleteBtn')) {
    const productId = event.target.dataset.delbtn_id;

    const response = await fetch(`/api/edit/delete/${productId}`, {
      method: 'DELETE',
    });

    // const responseJson = await response.json();
    window.alert('⛔️ Продукт удалён ⛔️');
    document.location.reload();
  }
});

// TODO: edit btn, create adv, multer, styles

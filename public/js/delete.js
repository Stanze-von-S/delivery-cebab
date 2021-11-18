const productsDiv = document.getElementById('product-list-container');

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

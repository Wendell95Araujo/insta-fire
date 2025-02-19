$(document).ready(() => {
  const totalImages = 12;
  const galleryContainer = $("#gallery");

  for (let i = 1; i <= totalImages; i++) {
    const imageUrl = `assets/img/${i}.webp`;
    galleryContainer.append(`
        <div class="gallery-item">
          <img src="${imageUrl}" alt="Foto ${i}" data-id="${i}" class="gallery-img">
        </div>
      `);
  }

  // Ao clicar, redireciona para a página de visualização
  $(".gallery-img").click(function () {
    const imageId = $(this).data("id");
    window.location.href = `photo.html?id=${imageId}`;
  });
});

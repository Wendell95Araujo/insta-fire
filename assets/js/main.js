$(document).ready(() => {
  const totalImages = 12;
  const galleryContainer = $("#gallery");

  for (let i = 1; i <= totalImages; i++) {
    const imageUrl = `assets/img/${i}.webp`;

    const postRef = firebase.firestore().collection("posts").doc(String(i));
    postRef.get().then((doc) => {
      const data = doc.exists ? doc.data() : { likes: 0, comments: [] };
      const likes = data.likes || 0;
      const comments = data.comments?.length || 0;

      galleryContainer.append(`
        <div class="gallery-item">
          <img src="${imageUrl}" alt="Foto ${i}" data-id="${i}" class="gallery-img">
          <div class="image-overlay">
            <span><i class="fas fa-fire"></i> ${likes}</span>
            <span><i class="far fa-comment"></i> ${comments}</span>
          </div>
        </div>
      `);
    });
  }

  // Ao clicar, redireciona para a página de visualização
  $(".gallery-img").click(function () {
    const imageId = $(this).data("id");
    window.location.href = `photo.html?id=${imageId}`;
  });
});

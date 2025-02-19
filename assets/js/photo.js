$(document).ready(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) return;

  const postRef = db.collection("posts").doc(postId);
  const localStorageKey = `liked_${postId}`;

  // Verifica se o usuário já curtiu
  let isLiked = localStorage.getItem(localStorageKey) === "true";

  // Atualizar em tempo real
  postRef.onSnapshot((doc) => {
    if (!doc.exists) {
      alert("Foto não encontrada!");
      return;
    }

    const data = doc.data();
    const imageUrl = `assets/img/${postId}.webp`;
    $("#photo").attr("src", imageUrl);
    $("#likes").text(data.likes || 0);
    $("#comments").text(data.comments?.length || 0);

    // Exibir se já está curtido
    if (isLiked) {
      $("#like-btn").addClass("fire-gradient");
    } else {
      $("#like-btn").removeClass("fire-gradient");
    }

    // Atualizar lista de comentários
    const commentsList = $("#comments-list").empty();
    $.each(data.comments || [], (index, comment) => {
      commentsList.append(
        `<li><strong>${comment.user}:</strong> ${comment.text}</li>`
      );
    });
  });

  // Alternar curtida (curtir/descurtir)
  $("#like-btn").click(async () => {
    isLiked = !isLiked;
    localStorage.setItem(localStorageKey, isLiked); // Salva no localStorage

    await postRef.update({
      likes: firebase.firestore.FieldValue.increment(isLiked ? 1 : -1),
    });

    // Atualiza a cor do ícone
    $("#like-btn i").toggleClass("fire-gradient", isLiked);
  });

  async function commentSubmit() {
    const commentText = $("#comment-input").val();
    if (!commentText) return;

    const newComment = {
      user: "Anônimo",
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    await postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(newComment),
    });

    $("#comment-input").val("");
  }
  // Adicionar comentário
  $("#comment-form").submit((event) => {
    event.preventDefault();
    commentSubmit();
  });

  $("#back-button").click(() => {
    window.location.href = "index.html";
  });
});

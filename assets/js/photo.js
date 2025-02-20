$(document).ready(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) return;

  const postRef = db.collection("posts").doc(postId);
  const localStorageKey = `liked_${postId}`;

  let isLiked = localStorage.getItem(localStorageKey) === "true";
 
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
   
    if (isLiked) {
      $("#like-btn").addClass("fire-gradient");
    } else {
      $("#like-btn").removeClass("fire-gradient");
    }
   
    const commentsList = $("#comments-list").empty();
    $.each(data.comments || [], (index, comment) => {
      commentsList.append(
        `<li><strong>${comment.user}:</strong> ${comment.text}</li>`
      );
    });
  });
 
  $("#like-btn").click(async () => {
    isLiked = !isLiked;
    localStorage.setItem(localStorageKey, isLiked);

    await postRef.update({
      likes: firebase.firestore.FieldValue.increment(isLiked ? 1 : -1),
    });
   
    $("#like-btn i").toggleClass("fire-gradient", isLiked);
  });

  async function commentSubmit() {
    const commentText = $("#comment-input").val();
    const username = localStorage.getItem("username");
    if (!commentText) return;

    const newComment = {
      user: username ?? "Anônimo",
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    await postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(newComment),
    });

    $("#comment-input").val("");
  }
 
  $("#comment-form").submit((event) => {
    event.preventDefault();
    commentSubmit();
  });

  $("#back-button").click(() => {
    window.location.href = "index.html";
  });
});

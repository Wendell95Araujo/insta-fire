$(document).ready(() => {
  const savedUsername = localStorage.getItem("username");
  const hideLogin = sessionStorage.getItem("hideLogin");

  if (!savedUsername && hideLogin !== "true") {
    console.log(savedUsername, hideLogin);
    $("#login-modal").css("display", "flex");
    $("#login").show();
  } else if(!savedUsername && hideLogin === "true") {
    $("#login").show();
  } else {
    $("#login").hide();
    $("#logout").show();
    $("#comment-input").attr("placeholder", `@${savedUsername}: Adicione um comentário...`);
  }

  $("#login-form").on("submit", (e) => {
    e.preventDefault();

    let username = $("#username").val().trim().toLowerCase();
    const password = $("#password").val();

    if (username === "" || username.includes(" ")) {
      alert("O nome de usuário não pode ter espaços.");
      return;
    }

    if (password === "") {
      alert("Digite uma senha.");
      return;
    }

    username = username.charAt(0).toUpperCase() + username.slice(1);
    localStorage.setItem("username", username);

    $("#login").hide();
    $("#logout").show();
    $("#login-form")[0].reset();
    $("#login-modal").hide();
    $("#comment-input").attr("placeholder", `@${username}: Adicione um comentário...`);
  });

  $("#close-modal").on("click", () => {
    $("#login-modal").hide();
    $("#login-form")[0].reset();
    sessionStorage.setItem("hideLogin", "true");
  });

  $("#logout").on("click", () => {
    localStorage.removeItem("username");
    $("#login").show();
    $("#logout").hide();
    $("#comment-input").attr("placeholder", "@Anônimo: Adicione um comentário...");
  });

  $("#login").on("click", () => {
    $("#login-modal").css("display", "flex");
  })
});

const form = document.getElementById("registerForm");
const pass = document.getElementById("password");
const pass2 = document.getElementById("passwordCheck");

const succes = (data) => {
  if (data.status === "error") {
    window.location.assign("/errorregister");
  } else {
    form.reset();
    window.location.assign("/login");
    console.log(data);
  }
};

const handleSubmit = (evt, target, route) => {
  evt.preventDefault();
  let formData = new FormData(target);
  if (formData.get("password") !== formData.get("passwordCheck")) {
    Swal.fire("Passwords no coinciden");
  } else {
    fetch(route, {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then((json) => {
        succes(json);
      });
  }
};

form.addEventListener("submit", (e) => {
  handleSubmit(e, e.target, "/api/sessions/register");
});

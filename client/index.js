const h1 = document.getElementById("my-name");
const form = document.getElementById("myForm");

function handleSubmit(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;

  pcaptcha.ready(function () {
    pcaptcha.execute("submit").then(async (token) => {
      if (token) {
        const response = await fetch("http://localhost:8000/pcaptcha/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        });
        const data = await response.json();

        if (data.success) {
          h1.innerText = `My Name: ${fullName} is Human and the score is ${data.score}`;
        } else {
         
        
          h1.innerText = `My Name: ${fullName} is Bot and the score is ${data.score}`;
         alert(`Alert: My Name: ${fullName} is Bot and the score is ${data.score}`);


        }
      } else {
        console.log("Something wen't wrong");
      }
    });
  });
}

form.addEventListener("submit", handleSubmit);

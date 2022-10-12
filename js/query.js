const date = new Date()
document.querySelector("#mainjs").src = "http://localhost:8000/js/main.js?" + date.getTime() + "=" + Math.random()

document.querySelector("#stylecss").href = "http://localhost:8000/styles/style.css?" + date.getTime() + "=" + Math.random()
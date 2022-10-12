const date = new Date()
const mainjs = document.querySelectorAll("#mainjs")
const loginjs = document.querySelectorAll("#loginjs")

mainjs.forEach(element => {
    element.src = "http://localhost:8000/panel/js/main.js?" + date.getTime() + "=" + Math.random()
})


loginjs.forEach(element => {
    element.src = "http://localhost:8000/panel/js/login.js"
});
document.querySelector("#stylecss").href = "http://localhost:8000/styles/style.css?" + date.getTime() + "=" + Math.random()
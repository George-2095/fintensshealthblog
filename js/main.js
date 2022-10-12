fetch("http://localhost:8000/server/Posts.php").then(response => response.json()).then(data => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i]
        const datacontainer = document.querySelector("#datacontainer")
        const item = document.createElement("div")
        item.classList.add('post')
        item.innerHTML = element.post
        datacontainer.appendChild(item)
    }
})
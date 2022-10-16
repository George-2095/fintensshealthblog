fetch("http://localhost:8000/server/Auth.php").then(response => response.json()).then(data => {
    if (data.length !== 1) {
        document.location.href = 'http://localhost:8000/panel/login.html'
    } else {
        const post = CKEDITOR.replace('post')

        document.querySelector("#submitbutton").addEventListener("click", () => {
            fetch("http://localhost:8000/server/Posts.php", {
                method: "POST",
                body: JSON.stringify({
                    post: post.getData()
                })
            }).then(response => response.text()).then(data => {
                if (data === '') {
                    document.location.reload()
                } else {
                    console.log(data)
                }
            }).catch(error => console.log(error))
        })

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

        document.querySelector("#search").addEventListener("keyup", (e) => {
            const term = e.target.value.toLowerCase()
            const posts = document.querySelectorAll(".post")
            Array.from(posts).forEach((post) => {
                const title = post.textContent
                if (title.toLowerCase().indexOf(term) != -1) {
                    post.style.display = 'block'
                } else {
                    post.style.display = 'none'
                }
            })
        })
    }
})
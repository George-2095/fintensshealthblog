fetch("http://localhost:8000/server/Auth.php").then(response => response.json()).then(data => {
    if (data.length === 1) {
        document.location.href = 'http://localhost:8000/panel/'
    } else {
        const username = document.querySelector("#username")
        const usernameerror = document.querySelector("#usernameerror");
        const password = document.querySelector("#password")
        const passworderror = document.querySelector("#passworderror")
        document.querySelector("#submitform").addEventListener("submit", (e) => {
            e.preventDefault()
            if (username.value === '' || password.value === '') {
                if (username.value === '') {
                    username.classList.add('is-invalid')
                    usernameerror.innerHTML = `<b class="text-danger">Fill in this field is required</b>`
                } else {
                    username.classList.remove('is-invalid')
                    usernameerror.innerHTML = ``
                }
                if (password.value === '') {
                    password.classList.add('is-invalid')
                    passworderror.innerHTML = `<b class="text-danger">Fill in this field is required</b>`
                } else {
                    password.classList.remove('is-invalid')
                    passworderror.innerHTML = ``
                }
            } else {
                username.classList.remove('is-invalid')
                usernameerror.innerHTML = ``
                password.classList.remove('is-invalid')
                passworderror.innerHTML = ``
                fetch("http://localhost:8000/server/Auth.php", {
                    method: "POST",
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value
                    })
                }).then(response => response.text()).then(data => {
                    if (data === '') {
                        document.location.reload()
                    } else {
                        usernameerror.innerHTML = `<b class="text-danger">${data}</b>`
                    }
                }).catch(error => console.log(error))
            }
        })
    }
})
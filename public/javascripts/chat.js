window.addEventListener('DOMContentLoaded', () => {
    const port = 8000
    const connection = new WebSocket(`wss://salty-wildwood-16592.herokuapp.com:${port}`)

    const container = document.querySelector(".messages-container")
    const inputName = document.querySelector(".input-name")
    const buttonName = document.querySelector(".button-name")
    const messageInput = document.querySelector('.message-input')
    const buttonSend = document.querySelector(".message-input")

    let user = ""

    let p
    let pUser
    let div

    const colors = ["blue", "green", "gray", "red"]

    connection.onopen = () => {
        console.log("connection is open")
        buttonName.addEventListener("click", () => {
            user = inputName.value
        })
        inputName.addEventListener("keydown", e => {
            if (e.keyCode === 13) {
                user = inputName.value
            }
        })

        buttonSend.addEventListener("click", () => {
            send("message", messageInput.value)
        })
        messageInput.addEventListener("keydown", e => {
            if (e.keyCode === 13) {
                send("message", messageInput.value)
            }
        })

        const send = (type, data) => {
            var d = {
                "type": type,
                "data": {"user": user, "message": data}
            }
            connection.send(JSON.stringify(d))
            cleanInput(messageInput)
        }
        const appendMessage = (data) => {
            console.log(data)
            div = document.createElement('div')
            pUser = document.createElement('p')
            p = document.createElement('p')
            container.appendChild(div)
            div.appendChild(pUser)
            div.appendChild(p)
            pUser.appendChild(document.createTextNode(JSON.parse(data.data).data.user))
            p.appendChild(document.createTextNode(JSON.parse(data.data).data.message))
        }
        const cleanInput = input => {
            input.value = ''
        }
    }
    connection.onerror = error => {
        console.log(error)
    }
    connection.onmessage = message => {
        appendMessage(message)
    }
})

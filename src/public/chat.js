;(()=>{
    const socket = new WebSocket(`ws://${window.location.host}/ws`)
    const formEl = document.getElementById('form')
    const inpuEl = document.getElementById('input')
    const messageEl = document.getElementById('message')

    if(!formEl || !inpuEl || !messageEl) throw new Error ('Init failed')
    
    const messages = []

    // Naming Random Nick Name
    const adjectives = ['늠름한', '친절한', '새침한', '멋진', '훌륭한', '귀여운']
    const animal = ['도베르만', '참새', '토끼', '강아지', '흑표범'] 

    function pickRandomNickname (array){
        const randomIndx = Math.floor(Math.random()*(array.length))
        const result = array[randomIndx]

        if(!result) throw new Error ('random nick name array is empty')
        return result
    }

    const userNickName = `${pickRandomNickname(adjectives)} ${pickRandomNickname(animal)}`

    formEl.addEventListener('submit',e=>{
        e.preventDefault() // Prevent send the form
        socket.send(
            JSON.stringify(
                {
                    nickname : userNickName,
                    message : inpuEl.value
                }
            )
        )
        inpuEl.value=''
    })

    socket.addEventListener('message',(e)=>{
        messages.push(JSON.parse(e.data))

        messageEl.innerHTML=''
       
        messages.forEach(({message,nickname})=>{
            const li = document.createElement('li')
            li.textContent = `${nickname} : ${message}`
            messageEl.appendChild(li)
            window.scrollTo(0, document.body.scrollHeight)
        })
    })

})()
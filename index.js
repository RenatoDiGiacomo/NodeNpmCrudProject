
const formData = document.getElementById("enviar")
const nameData = document.getElementById("nomeData")
const ageData = document.getElementById("idadeData")

const postData = async (e) => {
    e.preventDefault()
    /*GetInputData */

    console.log(nameData.value)
    console.log(ageData.value)
    try {
        /*Fetch Data */
        const response = await fetch("http://localhost:3000/data", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nameData.value,
                idade: ageData.value,
            })
        })
        const dataJson = await response.json()
        console.log(dataJson)

    } catch (error) {
        alert("Falhou")
    }
}



const listData = document.getElementById("getData")


const getData = async () => {
    const loading = document.querySelector(".loading");
    const listData = document.getElementById("list")
    const formGet = document.getElementById("formGet")

    listData.innerHTML = ""
    try {
        loading.classList.add("active")
        const response = await fetch("http://localhost:3000/data");
        if (response.status === 200) {
            const dataJson = await response.json()

            dataJson.forEach(data => {
                listData.innerHTML +=
                    `
                    <li class="${data.id}" data-id="${data.id}">
                        <div>
                            <p>${data.nome}</p>
                            <p>${data.idade}</p>
                        </div>
                       <button class="delete-btn">Atualizar</button>
                     </li>
                      `
            });

        } else {
            alert("Connection Failed 1")
        }

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', event => {
                const itemId = event.currentTarget.closest('[data-id]').dataset.id;
                console.log(itemId)
                getOneData(itemId)
            });
        });


    } catch (error) {
        alert("Connection Failed 2")
    } finally {
        loading.classList.remove("active")
    }

}

formData.addEventListener("submit", postData)
listData.addEventListener("click", getData)



const getOneData = async (dataComming) => {
    const res = await fetch(`http://localhost:3000/data/${dataComming}`)
    const data = await res.json()
    console.log(data)
    nameData.value = data.nome
    ageData.value = data.idade

    const dataname = (e) => {
        console.log(e)
    }
    nameData.addEventListener("onchange",dataname)
}
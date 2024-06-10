
const formData = document.getElementById("enviar")

const postData = async (e) => {
    e.preventDefault()
    /*GetInputData */
    const nameData = document.getElementById("nome")
    const ageData = document.getElementById("idade")

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
                       <button class="delete-btn">Deletar</button>
                     </li>
                      `
            });
        } else {
            alert("Connection Failed 1")
        }
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', event => {
                const itemId = event.currentTarget.closest('[data-id]').dataset.id;
                deleteData(itemId);
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

const deleteData = (dataId) => {
    console.log(dataId)
    try {
        fetch(`http://localhost:3000/data/${dataId}`, {
            method: "DELETE"
        })
        getData()
    } catch (error) {
        alert("Não Deletou")
    }
}

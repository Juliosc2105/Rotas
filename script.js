const Distancia = import('./teste')

let numeroRota = 0
var endereco = []
var distancia =[]

function teste()
{
    let main = window.document.querySelector('main')
    var texto = window.document.querySelector('#text')
    endereco[numeroRota] = texto
    const div = document.createElement('div')
    div.classList.add('rotas')
    div.id = `${numeroRota}`
    div.innerHTML = `
    <h3>Rota ${numeroRota}</h3>
    <ul>
    <li>${endereco.value}</li>
    </ul>`
    main.append(div)
    numeroRota++
    endereco.value = null/*
    if (numeroRota > 1)
    {
        for (let i = 1; i < endereco.length; i++)
        {
            await (distancia[(i - 1)] = Distancia((endereco.length-1), (i - 1)))
        }
    }*/
}


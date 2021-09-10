const puppeteer = require('puppeteer');
const readline = require('readline-sync');

console.log("Bem vindo a versão beta do meu sistema de Rotas")
console.log()

var conversor = 0
var endereco = ['first']
var distancia = ['first']
var ligado = true

endereco[0] = readline.question(`Digite o primeiro endereco: `)
endereco[endereco.length] = readline.question(`Digite o segundo endereco: `)
endereco[endereco.length] = readline.question(`Mais um endereco `)

console.log()
console.log(`os endereços foram:`)
console.log(`${endereco[0]}, ${endereco[1]}, ${endereco[2]}`)
console.log()

var aux = 1

async function robo()
{ 
    const browser = await puppeteer.launch({headless: false, });
    for (var i = 0; i < aux; i++)
    {
        const page = await browser.newPage();
        await page.goto('https://www.google.com.br/maps/dir///@-21.2144642,-50.3998166,15z/data=!4m2!4m1!3e0', {waitUntil: 'domcontentloaded'});
        await page.waitForSelector('#sb_ifc50')
        await page.type ('#sb_ifc50', `${endereco[0]}`)
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.type ('div#sb_ifc51', `${endereco[i+1]}`)
        await page.keyboard.press("Enter", {waitUntil: 'networkidle2'})
        await page.waitForSelector("div.xB1mrd-T3iPGc-trip-tUvA6e > div")
        distancia[i] = await page.$eval("div.xB1mrd-T3iPGc-trip-tUvA6e > div", (el) => el.innerHTML)
        await page.close()
        ConverterParaNumero()
        console.log(`A distância é de: ${distancia[i]}`)
    }
    testar()
}

robo()
.then((value) => {
    console.log('Executado com sucesso!')
    process.exit()

})
.catch((error) => console.log(error));

function ConverterParaNumero()
{
    distancia[conversor] = Number.parseFloat((distancia[conversor].slice(0, distancia[conversor].indexOf(' '))).replace(',','.'))
    conversor++
}



function testar()
{
    console.log(`soma das distâncias ${(distancia[0]+distancia[1])}`)
}


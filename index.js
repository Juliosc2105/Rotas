const puppeteer = require('puppeteer');
const readline = require('readline-sync');


//Declarando variáveis
var conversor = 0
var endereco = []
var distancia = []

//Saudações
console.log("Bem vindo a versão beta do meu sistema de Rotas")
console.log()


//Coletando os primeiros endereços
endereco[0] = readline.question(`Digite o primeiro endereco: `)
endereco.push(readline.question(`Digite o segundo endereco: `))
endereco.push(readline.question(`Mais um endereco `))

//Confirmando a coleta de endereços
console.log()
console.log(`os endereços foram:`)
for (let i in endereco)
{
    console.log(endereco[i])
}
console.log()

//Chamando a função Robo
robo()
.then((value) => {
    console.log('Executado com sucesso!')
    process.exit()  
})
.catch((error) => {
    console.log(error)
})

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//

//Função que converte o dado bruto em float
function ConverterParaNumero(valor)
{
    return Number.parseFloat((valor.slice(0, valor.indexOf(' '))).replace(',','.'))
}

//Só para testar mesmo kkkk
function testar()
{
    console.log(`soma das distâncias ${(distancia[0]+distancia[1])}`)
}


//Função que faz a coleta de dados
async function robo()
{ 
    const browser = await puppeteer.launch({headless: true, });
    for (var i = 0; i < 2; i++)
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
        distancia[i] = ConverterParaNumero(distancia[i])
        console.log(`A distância é de: ${distancia[i]}`)
    }
    testar()
}
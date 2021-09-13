const puppeteer = require('puppeteer');
const readline = require('readline-sync');


//Declarando variáveis
var endereco = []
var distancia = []
var ligado = true
var teste = 0


//Saudações
console.log("Bem vindo a versão beta do meu sistema de Rotas")
console.log()
coleta()

//Coletando os primeiros endereços
/*endereco[0] = readline.question(`Digite o primeiro endereco: `)
endereco.push(readline.question(`Digite o segundo endereco: `))
endereco.push(readline.question(`Mais um endereco `))*/

//Confirmando a coleta de endereços
console.log()
console.log(`os endereços foram:`)
for (let i in endereco)
{
    console.log(endereco[i])
}
console.log()

//Chamando a função Robo
/*funcaoDistancia()
.then((value) => {
    console.log('Executado com sucesso!')
    //process.exit()  
})
.catch((error) => {
    console.log(error)
})*/

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
async function funcaoDistancia(foco, interesse)
{ 
    const browser = await puppeteer.launch({headless: true, });
    const page = await browser.newPage();
    await page.goto('https://www.google.com.br/maps/dir///@-21.2144642,-50.3998166,15z/data=!4m2!4m1!3e0', {waitUntil: 'domcontentloaded'});
    await page.waitForSelector('#sb_ifc50')
    await page.type ('#sb_ifc50', `${endereco[foco]}`)
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.type ('div#sb_ifc51', `${endereco[interesse]}`)
    await page.keyboard.press("Enter", {waitUntil: 'networkidle2'})
    await page.waitForSelector("div.xB1mrd-T3iPGc-trip-tUvA6e > div")
    distancia[teste] = await page.$eval("div.xB1mrd-T3iPGc-trip-tUvA6e > div", (el) => el.innerHTML)
    await page.close()
    distancia[teste] = ConverterParaNumero(distancia[teste])
    console.log(`A distância é de: ${distancia[teste]}`)
    //testar()
}

async function coleta ()
{
    while (ligado == true)
    {
        endereco.push(readline.question(`Digite um endereco: `))
        console.log(endereco)
        if (endereco.length > 1)
        {
            for(let i = 1; i < endereco.length; i++)
            {
                await (distancia[(i - 1)] = funcaoDistancia((endereco.length-1), (i - 1)))
            }
        }
        let continuar = readline.question('Quer continuar?')
        if (continuar != 'sim')
        {
            ligado = false
        }else
        {
            ligado = true
        }
    }
}
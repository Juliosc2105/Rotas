const puppeteer = require('puppeteer');
const readline = require('readline-sync');


//Declarando variáveis
var endereco = []
var horário = []
var distancia = []
var ligado = true

//Saudações
console.log
console.log("Bem vindo a versão beta do meu sistema de Rotas")
console.log()

gerenciador()

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=    FUNCÕES     -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//

//Função que converte o dado bruto em float
function ConverterParaNumero(valor)
{
    if (valor.slice((valor.indexOf(' ')) + 1) == 'm')
    {
        return (Number.parseFloat((valor.slice(0, valor.indexOf(' '))).replace(',','.')))/1000
    }else if (valor.slice((valor.indexOf(' ')) + 1) == 'km')
    {
        return Number.parseFloat((valor.slice(0, valor.indexOf(' '))).replace(',','.'))
    }
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
    distancia[IdDistancia(foco, interesse)] = await page.$eval("div.xB1mrd-T3iPGc-trip-tUvA6e > div", (el) => el.innerHTML)
    await page.close()
    distancia[IdDistancia(foco, interesse)] = ConverterParaNumero(distancia[IdDistancia(foco, interesse)])
    console.log(`A distância é de: ${distancia[IdDistancia(foco, interesse)]} km`)
}

//Define um ID para cada conjunto de endereços
function IdDistancia (primeiro, segundo)
{
    return Number.parseFloat((primeiro.toString())+(segundo.toString()))
}

//Gerencia entrada de dados, chamadas de funções de processamento e retorno de valores finais
async function gerenciador ()
{
    while (ligado == true)
    {
        //Coletando a Distância com o usuário
        endereco.push(readline.question(`Digite um endereco: `))
        horário.push(new Date())
        for (let i in horário)
        {
            console.log(`Os minutos em que o endereco ${endereco[i]}, entrou no sistema foi: ${horário[i].getMinutes()}`)
        }
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
            console.log(`As distâncias foram:`)
            console.log(distancia)
            for (let i in distancia)
            {
                console.log(distancia[i])
            }
            process.exit()
        }else
        {
            ligado = true
        }
    }
}

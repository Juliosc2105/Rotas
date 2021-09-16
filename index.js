const puppeteer = require('puppeteer');
const readline = require('readline-sync');


//Declarando variáveis
var endereco = []
var horário = []
var distancia = []
var ligado = true

//Variáveis do Cérebro
var rotas = []



    //Aguardando implementação
        //const tempoMaximo
        //const quantidadeMaxima

//Saudações
console.log()
console.log("Bem vindo a versão beta do meu sistema de Rotas")
console.log()
const distanciaMaxima = (readline.question('Qual a distancia maxima: '))

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
    console.log(`A distância entre ${endereco[foco]} e ${endereco[interesse]} é de ${distancia[IdDistancia(foco, interesse)]} km`)
    cerebro(foco, interesse)
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
        endereco.push(readline.question(`Digite um endereco: `)) //coletando o endereço
        /*rotas.push(new Array) //Criando primeira rota
        rotas[0][0] = endereco[0]*/ //Colocando primeiro endereço na primeira rota
        horário.push(new Date())                                 //Coletando a hora em que entrou o endereço
        /*for (let i in horário) //Imprimindo o horário em que cada pedido entrou
        {
            console.log(`Os minutos em que o endereco ${endereco[i]}, entrou no sistema foi: ${horário[i].getMinutes()}`)
        }*/
        console.log(endereco) //Imprimindo o vetor com os endereços

        if (endereco.length > 1) //Verificando se há mais de um endereço
        {
            for(let i = 1; i < endereco.length; i++) //looping para comparar os endereços
            {
                await (distancia[(i - 1)] = funcaoDistancia((endereco.length-1), (i - 1)))
                
            }
        }

        let continuar = readline.question('Quer continuar?') //Interação com o usuário para continuar
        if (continuar != 'sim')
        {
            console.log(`As distâncias foram:`)
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

function cerebro(a, b)
{
    console.log('teste 1')
    if(distancia[IdDistancia(a, b)] <= distanciaMaxima)
    {
        console.log('teste sim')
        rotas.push(new Array)
        rotas[(rotas.length)-1] = [endereco[b], endereco[a]]
    }else
    {
        console.log('teste não')
        for(let i = 0; i < rotas.length; i++)
        {
            console.log('teste 2')
            for(let j in rotas)
            {
                console.log('teste 3')
                console.log(`i = ${i}, j = ${j}`)
                if(rotas[i][j] = endereco[b])
                {
                    console.log('teste 3 sim')
                    console.log(`já tem ${endereco[b]}`) 
                }else
                {
                    console.log('teste 3 não')
                    rotas.push(new Array)
                    rotas[(rotas.length)-1] = [endereco[b]]
                }
            }
        } 
    }
    console.log(rotas)
}

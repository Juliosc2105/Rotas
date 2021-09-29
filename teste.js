const puppeteer = require('puppeteer');

export default async function Distancia(foco, interesse)
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

function IdDistancia (primeiro, segundo)
{
    return Number.parseFloat((primeiro.toString())+(segundo.toString()))
}
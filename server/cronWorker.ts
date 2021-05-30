import * as cron from 'node-cron'
import moment from 'moment';
import excuteQuery from './db';
import { v4 as uuidv4 } from 'uuid';

//import * as puppeteer from 'puppeteer';
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio';

//import { Observable } = from 'rxjs/Rx' 
//const { filter, map, reduce,  } = require('rxjs/operators')
//const { pipe } = require('rxjs/Rx')
import { from,of,pipe } from 'rxjs';
import { map } from 'rxjs/operators';


import ICategory from "./models/Category";

const ports = [
    '9050',
    '9052',
    '9053',
    '9054',
    '9055'
  ];


const resolution = {
  x : 1920,
  y : 1080,
}

const args = [
  '--proxy-server=socks5://127.0.0.1:'+ports[getRandomInt(0,4)],
  '--disable-gpu',
  `--window-size=${ resolution.x },${ resolution.y }`,
  '--no-sandbox',
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



const work = async (category) => {
  try{
      console.log('work: ', category)
      const browser = await puppeteer.launch({
        headless     : true,
        handleSIGINT : false,
        args         : args,
      })

      const page = await browser.newPage()

      const url = 'https://www.amazon.com/b?node=283155'

      await page.setViewport({
        width  : resolution.x,
        height : resolution.y,
      })

      await page.goto(url);
          await page.waitForSelector('#twotabsearchtextbox', {timeout: 60000});
          await page.type('#twotabsearchtextbox', category.name)
          await page.click('#nav-search-submit-button')

          await page.waitForSelector('.s-result-item');
          
          const products = await page.evaluate(() => {
              const links = Array.from(document.querySelectorAll('.s-result-item'));

              return links.map(link => {
                if (link.querySelector(".a-price-whole")) {
                  return {
                    name: link.querySelector(".a-size-medium.a-color-base.a-text-normal").textContent,
                    
                    url: link.querySelector(".a-link-normal.a-text-normal").getAttribute('href'),
                    image: link.querySelector(".s-image").getAttribute('src'),
                    author: link.querySelector(".a-row.a-size-base.a-color-secondary .a-row").textContent,
                    price: parseFloat(link.querySelector(".a-price-whole").textContent.replace(/[,.]/g, m => (m === ',' ? '.' : ''))),
                    rating: link.querySelector('div > span > div > div a > i ')? link.querySelector('div > span > div > div a > i').textContent:"",
                    isbn:'',
                    review:''
                    

                  };
                }
              })//.slice(0, 5);
            });
           const prods = products.map(prod => ({ ...prod, category : category.id}))

          console.log('products : ', prods)


        await browser.close()

        return prods

  }
  catch(error){
    console.log('child error: ', error)
  }
}

//console.log()



process.on('message', async (category) => {
  try{
        console.log('Message in child: ', category.name)
        const result = await work(category)
        //.then(result => {
        //  process.send(result)
          //process.exit()
        //})
        if (result) {
         process.send(result);
         process.exit()
        }else
        {
          process.send([{}]);
          process.exit()
       }
        
      }
    catch(error){
      console.log('error in child', error)
      process.exit()
    }
});
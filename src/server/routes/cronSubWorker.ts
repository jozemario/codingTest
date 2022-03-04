import * as cron from 'node-cron'
import moment from 'moment';
import executeQuery from '../db';
import { v4 as uuidv4 } from 'uuid';

//import * as puppeteer from 'puppeteer';
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio';

//import { Observable } = from 'rxjs/Rx' 
//const { filter, map, reduce,  } = require('rxjs/operators')
//const { pipe } = require('rxjs/Rx')
import { from,of,pipe } from 'rxjs';
import { map } from 'rxjs/operators';


import ICategory from "../models/Category";

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
  //'--proxy-server=socks5://127.0.0.1:'+ports[getRandomInt(0,4)],//enable only if you use tor proxy
  '--disable-gpu',
  `--window-size=${ resolution.x },${ resolution.y }`,
  '--no-sandbox',
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



const work = async (product) => {
  try{
        if (product && product.name && product.url) {
          // code...
        
        console.log('work: ', product)
        const browser = await puppeteer.launch({
          headless     : true,
          handleSIGINT : false,
          args         : args,
        })
        const page = await browser.newPage()

        const url = 'https://www.amazon.com'+product.url;

        await page.setViewport({
          width  : resolution.x,
          height : resolution.y,
        })

          await page.goto(url);
          await page.waitForSelector('#detailBulletsWrapper_feature_div', {timeout: 60000});
          const isbn = await page.evaluate(() => {
            const links = Array.from( document.querySelectorAll('#detailBulletsWrapper_feature_div > div >ul>li') )
            return links.map(link => {
                try{
                  console.log('links.map: ', link)
                  if (link.querySelector("span").textContent.includes('ISBN')) {
                     let isbnx = link.querySelector("span").textContent.trim().replace(/\n/g,'')
                      if (isbnx != null) {
                         return isbnx
                       }else{
                         return ''
                       } 
                    
                  }else{
                    return ''
                  }
                 }catch(error){
                    console.log('links.map error: ', error)
                    
                  }
                 
                })//.slice(0, 5);

          })
          console.log('isbn: ', isbn)
          const review = await page.evaluate(() => {
                if (document.querySelector(".review-title-content").textContent) {
                    return document.querySelector(".review-title-content").textContent +' | '+ document.querySelector(".review-text").textContent
                    
                  }
               
          })
          console.log('review: ', review)
          product.isbn=isbn;
          product.review=review;

        await browser.close()

        return product

  }else{
    console.log('Product skipped: ', product)
    return {}
  }

  }catch(error){
     console.log('child error: ', error)
  }
}



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
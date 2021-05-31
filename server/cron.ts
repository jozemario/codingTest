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
import { map, } from 'rxjs/operators';


import ICategory from "./models/Category";

import { fork } from 'child_process';
import parallelLimit from 'async/parallelLimit';
import async from 'async';


const ports = [
    '9050',
    '9052',
    '9053',
    '9054',
    '9055'
  ];

export async function findAllItems(type) {
    try {
        const result = await excuteQuery({
            query: `SELECT * FROM ${type} where active = 1`,
            values: [  ],
        });

        return result;
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function createItem({ item, type }) {
    console.log('createItem: ', item,type)
    if (item && item.name) {
    	if (item.isbn) {
    		item.isbn=item.isbn.join(',').trim()
    	}
    	if (item.review) {
    		item.isbn=item.isbn.replace(/\n/g)
    	}
   
    //const role = 'user';
    switch (type) {
      case "books":
                  console.log('createModel books: ', item)
                  const bookItem = {
                            id: uuidv4(),
                            createdAt: moment().format( 'YYYY-MM-DD HH:mm:ss'),
                            name:item.name,
                            category:item.category? item.category:'',
                            image:item.image,
                            author:item.author,
                            isbn:item.isbn? item.isbn:'',
                            link:item.url? item.url:'',
                            rating:item.rating? item.rating:'',
                            review:item.review? item.review:''
                            
                        };  
                   try {
                        const result = await excuteQuery({
                            query: `INSERT IGNORE INTO ${type} (id, created_at, name, category, isbn, image,author,link,rating,latest_review) VALUES(?, ?, ?, ?,?,?,?,?,?,?)`,
                            values: [bookItem.id, bookItem.createdAt.toString(), bookItem.name, bookItem.category,bookItem.isbn,bookItem.image,bookItem.author,bookItem.link,bookItem.rating,bookItem.review],
                        });
                        console.log( result );
                        } 
                   catch ( error ) {
                        console.log( error );
                    }

                return bookItem;
        break;
    }

     }
    
}



cron.schedule('0 */8 * * *', () => {
  console.log('running a task every 1 minute');

	main();  

},
{ scheduled: true, timezone: 'America/Costa_Rica'}
);

/*export async function findDetails({ port,item, type,category }) {
	try{
		console.log('findDetails: ', item)

		if (item && item.name && item.url) {



		//let port = ports[getRandomInt(0,4)];
		const browser = await puppeteer
		  					   .launch({
								  	headless: true,
								  	args: ['--proxy-server=socks5://127.0.0.1:' + port]
								  });
		const page = await browser.newPage();
		await page.goto('https://www.amazon.com'+item.url);
		await page.waitForSelector('#detailBulletsWrapper_feature_div', {timeout: 60000});
		const isbn = await page.evaluate(() => {
			const links = Array.from( document.querySelectorAll('#detailBulletsWrapper_feature_div > div >ul>li') )
			return links.map(link => {
		        if (link.querySelector(".span").textContent.includes('ISBN')) {
		          return link.querySelector(".span").textContent.split(':')[1].trim()   
		          
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

		item.isbn=isbn;
		item.review=review;

		createItem({item:item,type:'books',category:category})

		await browser.close();
		//
	 }

	}catch(error){
		console.log(error);

	}

}*/
const max_threads = 1
const max_threads_details = 1


export async function scrapper(port) {
//(async () => {
try {

  console.log('scrapper: ',new Date())
  const categories:any = await findAllItems('bookCategories');
  
  //const posts: ICategory[] = postList.filter((post: ICategory) => post.id !== id)

  const source:ICategory[] = categories//.slice(0, 2);
  const searchs = source.map(category => category.name )
  console.log('scrapper searchs: ', searchs)


async.timesLimit(source.length, max_threads, (n, next) => {
    console.log('parallelLimit: ', source[n]);
    getBooksFromAmazon(source[n])
  		  .then((result:[]) => {
		    console.log('Result BooksFromAmazon: ', result);
		     	//return result;
		     	next(null, result);
		  })
		  .catch((error) => {
		    console.log('An error occured: ', error);
		  });	

        // this task is resolved
        
    }, function(err, stdoutArray) {
		  // this runs after all processes have run; what's next?
		  console.log('all processes have run: ', stdoutArray)
		  let allbooksfound = [].concat.apply([], stdoutArray);

		  		async.timesLimit(allbooksfound.length, max_threads_details, (n, next) => {
				    console.log('parallelLimit: ', allbooksfound[n]);
		    			getDetailBooksFromAmazon(allbooksfound[n])
				  		  .then((result:[]) => {
						    console.log('Result DetailBooksFromAmazon: ', result);
						     	//return result;
						     	next(null, result);
						  })
						  .catch((error) => {
						    console.log('An error occured: ', error);
						  });	

				        // this task is resolved
				        
				    }, function(err, stdoutArray) {
						  // this runs after all processes have run; what's next?
						  console.log('all processes have run: ', stdoutArray)
						  let allbookswithdetailsfound = [].concat.apply([], stdoutArray);
						  allbookswithdetailsfound.map( prod =>createItem({item:prod,type:'books'}))
						  
						});


		});

   

 // map over array and return an `async` function;
/*let tasks = categories.map(p => {
  return async () => {
  	console.log('parallelLimit: ', p);
    getBooksFromAmazon(p)
  		  .then((result:[]) => {
		    console.log('Result BooksFromAmazon: ', result);
		     	return result;
		  })
		  .catch((error) => {
		    console.log('An error occured: ', error);
		  });	
    
  }
});*/

// Finally execute the tasks
/*parallelLimit(tasks, 1, (err, result) => {
    if (err) console.error('error: ', err)
    else console.log('done:', result);
	// map over array and return an `async` function;
		let tasks = result.map(p => {
		  return async () => {
		  	console.log('parallelLimit: ', p);
		    getDetailBooksFromAmazon(p)
		  		  .then((result) => {
				    console.log('Result: DetailBooksFromAmazon: ', result);
				    return result
				  })
				  .catch((error) => {
				    console.log('An error occured: ', error);
				  });	
			  }
			});

			// Finally execute the tasks

			parallelLimit(tasks, 1, (err, result) => {
			    if (err) console.error('error: ', err)
			    else console.log('done:', result);
				
			});
	
});
*/
  	 

  for (var cat in categories) {
  		  //let port = ports[getRandomInt(0,4)];
  		  console.log('forloop: ', categories[cat].name,categories[cat].id,port)

  	try{

  		 /* factorial(categories[cat])
  		  .then((result) => {
		    console.log('Result: ', result);
		  })
		  .catch((error) => {
		    console.log('An error occured: ', error);
		  });	*/

		/*  const browser = await puppeteer
		  					   .launch({
								  	headless: true,
								  	args: ['--proxy-server=socks5://127.0.0.1:' + port]
								  });
		  const page = await browser.newPage();
		  await page.goto('https://www.amazon.com/b?node=283155');
		  await page.waitForSelector('#twotabsearchtextbox', {timeout: 60000});
		  await page.type('#twotabsearchtextbox', categories[cat].name)
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
		  console.log('products: ', products)

		  const productsComplete = await products.map(async prod => findDetails({port:port,item:prod,type:'books',category:categories[cat].id}) )
		  console.log('productsComplete: ', productsComplete)
*/
		  //products.map( prod => createItem({item:prod,type:'books',category:categories[cat].id}))
/*
		  console.log('products: ', products)

		  const books = await page.$$eval('.a-size-medium.a-color-base.a-text-normal', anchors => {
		   return anchors.map(anchor => anchor.textContent.trim())//.slice(0, 16)
		  })
		  console.log('books: ', books)

		  const authors = await page.$$eval('.a-row.a-size-base.a-color-secondary .a-row', anchors => {
		   return anchors.map(anchor => anchor.textContent.trim())//.slice(0, 16)
		  })
		  console.log('authors: ', authors)

		  const covers = await page.$$eval('.a-section.aok-relative.s-image-fixed-height > img', anchors => {
		   return anchors.map(anchor => anchor.getAttribute('src'))//.slice(0, 16)
		  })
		  console.log('covers: ', covers)*/

		/*  await browser.close();*/

		  
		}catch (error) {
	        console.log(error);
	        
	    }

	}

} catch (error) {
        console.log(error);
        
    }
}//)();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


async function main() {
  /**
   * Tor SOCKS ports that we defined in torrc file. 
   */
  
  	
  	let port = ports[getRandomInt(0,4)]

    console.log(await scrapper(port));
  
}



//main();

function getBooksFromAmazon(category) {
  return new Promise((resolve, reject) => {
    const child = fork('./server/cronWorker.ts');
    child.send(category);
    child.on('message', (result) => {
      resolve(result)
    });
    child.on('error', (error) => {
      reject(error)
    });
  })
}

function getDetailBooksFromAmazon(product) {
  return new Promise((resolve, reject) => {
    const child = fork('./server/cronSubWorker.ts');
    child.send(product);
    child.on('message', (result) => {
      resolve(result)
    });
    child.on('error', (error) => {
      reject(error)
    });
  })
}


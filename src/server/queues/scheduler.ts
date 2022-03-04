import * as cron from "node-cron";
import moment from "moment";
import executeQuery from "../db";
import { v4 as uuidv4 } from "uuid";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
//import { Observable } = from 'rxjs/Rx'
//const { filter, map, reduce,  } = require('rxjs/operators')
//const { pipe } = require('rxjs/Rx')
import { from, of, pipe } from "rxjs";
import { map } from "rxjs/operators";
import ICategory from "../models/Category";
import { fork } from "child_process";
import parallelLimit from "async/parallelLimit";
import async from "async";
import { Socket } from "socket.io";
import { getws, SocketService } from "../socket";

import { queueMQ, inputQueue, outputQueue, whatsappQueue } from "./services";
import { finished } from "stream";
// Tell Typescript to use this type on the globally scoped `global` variable.
import CustomNodeJsGlobal from "../models/Global";
declare const global: CustomNodeJsGlobal;

const ws = getws();

const messages = [];
// cuando un usuario se conecte al servidor de sockets
ws.io.on("connection", (socket) => {
  console.log("connection en Scheduler", socket.id);

  // escuchamos el evento `message`
  socket.on("initScheduler", (data) => {
    console.log("initScheduler", data);
    main(data);
    //socket.emit('startedScheduler',{})
    // enviamos el mensaje a todos los usuarios menos a quién los envió
    //socket.broadcast.emit('message', data)
  });

  // // escuchamos el evento `message`
  // socket.on("initScheduler", (data) => {
  //   console.log("initScheduler", data);
  //   main(data);
  //   //socket.emit('startedScheduler',{})
  //   // enviamos el mensaje a todos los usuarios menos a quién los envió
  //   //socket.broadcast.emit('message', data)
  // });

  socket.on("syncAccountWA", (data) => {
    console.log("syncAccountWA", JSON.stringify(data));
    
    let payload = {
      sessionName: data.session,
      userName: data.username,
      userId: data.userid,
      bot: data.bot,
      status: "",
      channel: "",
    };
    syncAccountWA(payload);
  });

  // const ports = ["9050", "9052", "9053", "9054", "9055"];

  // async function findAllItems(type) {
  //   try {
  //     const result = await executeQuery({
  //       query: `SELECT * FROM ${type} where active = 1`,
  //       values: [],
  //     });

  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function createItem({ item, type }) {
  //   console.log("createItem: ", item, type);
  //   if (item && item.name) {
  //     if (item.isbn) {
  //       item.isbn = item.isbn.join(",").trim();
  //     }
  //     if (item.review) {
  //       item.isbn = item.isbn.replace(/\n/g);
  //     }

  //     //const role = 'user';
  //     switch (type) {
  //       case "books":
  //         console.log("createModel books: ", item);
  //         const bookItem = {
  //           id: uuidv4(),
  //           createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  //           name: item.name,
  //           category: item.category ? item.category : "",
  //           image: item.image,
  //           author: item.author,
  //           isbn: item.isbn ? item.isbn : "",
  //           link: item.url ? item.url : "",
  //           rating: item.rating ? item.rating : "",
  //           review: item.review ? item.review : "",
  //         };
  //         try {
  //           const result = await executeQuery({
  //             query: `INSERT IGNORE INTO ${type} (id, created_at, name, category, isbn, image,author,link,rating,latest_review) VALUES(?, ?, ?, ?,?,?,?,?,?,?)`,
  //             values: [
  //               bookItem.id,
  //               bookItem.createdAt.toString(),
  //               bookItem.name,
  //               bookItem.category,
  //               bookItem.isbn,
  //               bookItem.image,
  //               bookItem.author,
  //               bookItem.link,
  //               bookItem.rating,
  //               bookItem.review,
  //             ],
  //           });
  //           console.log(result);
  //         } catch (error) {
  //           console.log(error);
  //         }

  //         return bookItem;
  //         break;
  //     }
  //   }
  // }

  //   cron.schedule(
  //     "0 */8 * * *",
  //     () => {
  //       console.log("running a scheduler task every 8 hour");
  //     } /*,
  // { scheduled: true, timezone: 'America/Costa_Rica'}*/
  //   );

  // async function startScheduler() {
  //   const max_threads_master = 1;
  //   const max_threads_worker = 1;
  //   try {
  //     console.log("startScheduler: ", new Date() /* ,port */);
  //     //const categories:any = await findAllItems('bookCategories');
  //     const jobs: any[] = [];
  //     jobs.push(global.OUTQueue.shift());
  //     const source: any[] = jobs;

  //     if (jobs.length > 0) {
  //       async.timesLimit(
  //         source.length,
  //         max_threads_master,
  //         (n, next) => {
  //           console.log("parallelLimit: ", source[n]);
  //           processQueue(source[n])
  //             .then((result: []) => {
  //               console.log("Result processQueue: ", result);
  //               //return result;
  //               next(null, result);
  //             })
  //             .catch((error) => {
  //               console.log("An error occured: ", error);
  //             });

  //           // this task is resolved
  //         },
  //         function (err, stdoutArray) {
  //           // this runs after all processes have run; what's next?
  //           console.log("all processes have run: ", stdoutArray);
  //           let workerTasks = [].concat.apply([], stdoutArray);

  //           async.timesLimit(
  //             workerTasks.length,
  //             max_threads_worker,
  //             (n, next) => {
  //               console.log("parallelLimit: ", workerTasks[n]);
  //               processTask(workerTasks[n])
  //                 .then((result: []) => {
  //                   console.log("Result processTask: ", result);
  //                   //return result;
  //                   next(null, result);
  //                 })
  //                 .catch((error) => {
  //                   console.log("An error occured: ", error);
  //                 });

  //               // this task is resolved
  //             },
  //             function (err, stdoutArray) {
  //               // this runs after all processes have run; what's next?
  //               console.log("all processes have run: ", stdoutArray);
  //               let allresults = [].concat.apply([], stdoutArray);
  //               // allbookswithdetailsfound.map( prod =>createItem({item:prod,type:'books'}))
  //               socket.emit("finishedScheduler", allresults);
  //             }
  //           );
  //         }
  //       );
  //     } else {
  //       console.log("No Jobs: ", new Date());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // function getRandomInt(min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }

  async function main(payload) {
    console.log("Scheduler SocketUsers: ", global.SocketUsers);
    console.log("INQueue: ", global.INQueue);
    //let port = ports[getRandomInt(0,4)]
    //console.log(await startScheduler(/* port */));disabled temporary
    await queueMQ.add("send-simple", {
      from: "manast@taskforce.sh",
      subject: "This is a simple test",
      text: "An email sent using BullMQ",
      payload: payload,
    });

    console.log(`Enqueued an email sending from ${from}`);

    socket.emit("startedScheduler", global.SocketUsers);
  }

  async function syncAccountWA(payload) {
    await whatsappQueue.add("sync-account", payload);
    console.log(`Enqueued an syncAccountWA`);
    socket.emit("syncedAccountWA", {
      users: global.SocketUsers,
      payload: payload,
      id: socket.id,
      
    });
  }
});
//main();

// async function scheduleJobinQeue() {}

// function processQueue(jobs) {
//   return new Promise((resolve, reject) => {
//     const child = fork("./server/routes/queuecontroller.ts");
//     child.send(jobs);
//     child.on("message", (result) => {
//       resolve(result);
//     });
//     child.on("error", (error) => {
//       reject(error);
//     });
//   });
// }
// function processTask(task) {
//   return new Promise((resolve, reject) => {
//     const child = fork("./server/routes/queueworker.ts");
//     child.send(task);
//     child.on("message", (result) => {
//       resolve(result);
//     });
//     child.on("error", (error) => {
//       reject(error);
//     });
//   });
// }

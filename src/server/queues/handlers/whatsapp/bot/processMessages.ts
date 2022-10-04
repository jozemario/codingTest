// var Rx = require('@reactivex/rxjs');
// var cp = require('child_process');
// var async = require("async");
// var config = require('./../../config');
// var mime = require('mime-types');
// //var sql = require( "seriate" );

// var express = require('express'),
//     _       = require('lodash'),
//     jwt     = require('jsonwebtoken');
//     var sql = require( "seriate" );
// var Q = require('q');
// var CronJob = require('cron').CronJob;
// var jwt = require('jsonwebtoken');
// var ejwt = require('express-jwt');
// var auth = require('http-auth');
// var request = require("request");
// var bodyParser= require('body-parser');
// /* var config = require('./../config');
// var sql = require( "seriate" );
// var Q = require('q');
// var request = require("request");
//  */const fs = require('fs');
//  const promfs = require('fs').promises;
// /* DBCONFIG */

// var configdb = {
//     "server": config.DB_HOST,
//     "user": config.DB_USER,
//     "password": config.DB_PASS,
//     "database": config.DB_DATABASE,
//     "connectionTimeout": 2000000,
//     "requestTimeout":2000000,
//     "pool": {
//         "max": 100,
//         "min": 1,
//         "idleTimeoutMillis": 30000
//       }
//   };

// sql.setDefaultConfig( configdb );

// /* DBCONFIG */
// //added logger

// const Keyv = require("keyv");

// //BOT MENU
// //const data = require("./data2");
// const printScreen = require("./printScreen");
// //BOT MENU

// const ttl = 60 * 60 * 1000;
// const users = new Keyv();

// //BOT TRAINED
// //const Bot = require('./bot');
// const { NlpManager } = require('node-nlp');
// //const bottrained = new Bot(['en', 'es', 'it'], 'es');
// //console.log('BOT', bottrained)

// /* async function trainAndSave() {
//   await bottrained.trainModel();
//   bottrained.saveModel('./model.nlp')
// } */

// /* (async () => {
//   await trainAndSave();
//   // await test();
// })() */

// function between(min, max) {
//   return Math.floor(
//     Math.random() * (max - min) + min
//   )
// }
// //BOT TRAINED

const processMessages = function (
  client,
  sessionName,
  userName,
  userId,
  channel,
  status,
  bot
) {
  console.log("Calling BOT: ", bot);

  client.onMessage(async (message) => {
    console.log("Listener in processMessages bot controller");

    console.log("Calling Logger");
    await logger(
      message,
      client,
      sessionName,
      userName,
      userId,
      channel,
      status
    );
    console.log("Calling Logger");

    // let botflag = await getWhastsappAccountBot({id:bot})
    // //let locale = await getWhastsappAccountBot({id:bot})
    // console.log('botflag: ', botflag)
    // //console.log('onMessage: ', message)
    // if ( botflag.manage == 1){
    //   console.log('models/bot/corpus/'+userId+'-'+bot+'-data.json')
    //   let data = await loadBotMenu('models/bot/corpus/'+userId+'-'+bot+'-data.json')
    //   //fs.readFile('models/bot/corpus/'+userId+'-'+bot+'-data.json')
    //   data = JSON.parse(data)
    //   console.log('Bot Menu data: ', data)
    //   let input = message.body.toLowerCase();
    //   let currentUser = await users.get(message.from);

    //   if (!currentUser) {
    //     await users.set(message.from, ["root"], ttl);
    //     printScreen(client, message, data["root"]);
    //   } else {
    //     const currentScreen = currentUser.reduce((object, current) => {
    //       if (current === "root") {
    //         return object[current];
    //       } else {
    //         return object["childrens"][current];
    //       }
    //     }, data);

    //     if (Object.keys(currentScreen.childrens).includes(input)) {
    //       if (currentScreen.childrens[input].type !== "data") {
    //         currentUser.push(input);
    //         await users.set(message.from, currentUser, ttl);
    //       } else {
    //         await users.delete(message.from);
    //       }

    //       printScreen(client, message, currentScreen.childrens[input]);
    //     } else if (currentScreen.type === "submenu" && input === "x") {
    //       await users.set(message.from, ["root"], ttl);
    //       printScreen(client, message, data["root"]);
    //     }
    //   }
    // }

    // if (botflag.manage == 2) {
    //   //init custom bot
    //   //let bottrained = new Bot(['en','es','it'], botflag.locale);
    //   let bottrained= new NlpManager({ languages: [botflag.locale], forceNER: true });
    //   await bottrained.addCorpus('models/bot/corpus/'+userId+'-'+bot+'-corpus-'+botflag.locale+'.json');
    //   console.log('BOT', bottrained)
    //   await bottrained.train();
    //   //await bottrained.trainModel();
    //   //bottrained.saveModel('client/training/'+client.userid+'model.nlp')
    //   bottrained.save('client/training/'+client.userid+'-'+bot+'model.nlp')
    //   //for individual user

    // let input = message.body.toLowerCase();
    // let currentUser = await users.get(message.from);

    // //bottrained.sendAnswer(input).then((response) => {
    // bottrained.process(botflag.locale,input).then((resp) => {

    //   console.log('bot.sendAnswer: ', resp)
    //   console.log('bot.sendAnswer: ', resp.answers)
    //   console.log('bot.sendAnswer: ', resp.answer)
    //   let response = (resp.answer) ? resp.answer : (resp.locale == 'es') ? "Lo siento, no te he entendido" : (resp.locale == 'it') ? "Scusami non ti ho capito" :"Sorry, I don't understand";
    //   console.log('bot.sendAnswer: ', response)
    //   try {
    //         setTimeout(function () {

    //           getUserBalance(client.userid).then(function(balance){
    //             continuar = (balance[0].saldo > 0) ? true : false;
    //             console.log('tiene saldo: ', continuar);
    //             console.log('saldo: ', balance[0].saldo);
    //             console.log('sms: ', message.from);
    //               tipoCuenta=balance[0].tipoCuenta;//1 postpago // 0 prepago
    //             if (continuar|| tipoCuenta == 1) {

    //                  /*  switch (m.type) {
    //                     case "text": */
    //                       try {
    //                          //client.sendText(message.from, response.message)
    //                          client.sendText(message.from, response)
    //                                     .then((result) => {
    //                                      // console.log('Result: ', result); //return object success
    //                                       let options = message;
    //                                                     options.tipoCampaign = 'WAPIREST'
    //                                                     options.channelTo = message.from
    //                                                     options.id_contactos = 0
    //                                                     options.id_campana = 2
    //                                                     options.id_usuario = client.userid
    //                                                     //options.id_plantilla = response.message
    //                                                     options.id_plantilla = response
    //                                                     options.fechaEnvios = Date.now();
    //                                                     options.kannelId= result.to.id.toString();
    //                                                     options.cantSMS= 1
    //                                                     options.channelInit=Date.now();
    //                                                     options.tipoCuenta= tipoCuenta;
    //                                                     chargeWA(options).then(function (data) {
    //                                                       console.log('chargeWA',data)
    //                                                     });
    //                                                     setWAReport(options)
    //                                                       .then(function (data) {
    //                                                         console.log('setWAReport logged: ', data)
    //                                                       })
    //                                     });
    //                       } catch (error) {
    //                         console.error("Error al enviar mensaje");
    //                       }
    //                      // break;

    //                    /*  case "image":
    //                       try {
    //                          client.sendImage(message.from, m.src, 'image-name', m.data)
    //                                     .then((result) => {
    //                                       console.log('Result: ', result); //return object success
    //                                       let options = message;
    //                                                     options.tipoCampaign = 'WAPIREST'
    //                                                     options.channelTo = message.from
    //                                                     options.id_contactos = 0
    //                                                     options.id_campana = 2
    //                                                     options.id_usuario = client.userid
    //                                                     options.id_plantilla = m.data
    //                                                     options.fechaEnvios = Date.now();
    //                                                     options.kannelId= result.to.id.toString();
    //                                                     options.cantSMS= 1
    //                                                     options.channelInit=Date.now();
    //                                                     options.tipoCuenta= tipoCuenta;
    //                                                     chargeWA(options).then(function (data) {
    //                                                       console.log('chargeWA',data)
    //                                                     });
    //                                                     setWAReport(options)
    //                                                       .then(function (data) {
    //                                                         console.log('setWAReport logged: ', data)
    //                                                       })
    //                                     });
    //                       } catch (error) {
    //                         console.error("Error al envir imágen");
    //                       }
    //                       break;
    //                     case "file":
    //                       try {
    //                          client.sendFile(message.from, m.data, "", "");
    //                       } catch (error) {
    //                         console.error("Error al envir archivo");
    //                       }
    //                       break;

    //                     case "location":
    //                       try {
    //                          client.sendLocation(message.from, m.lat, m.lon, "");
    //                       } catch (error) {
    //                         console.error("Error al enviar ubicación");
    //                       }
    //                       break;
    //                     default:
    //                       break;
    //                   } */
    //               }
    //               else{
    //                 console.log('El usuario: '+client.userid+ ' esta sin saldo, el mensaje de whatsapp al:'+message.from+' no se enviara')
    //               };
    //             })

    //             //client.sendText(message.from, response.message);
    //           }, Math.floor(between(1,6) * 1000));

    //     } catch (error) {
    //       console.error("Error al enviar mensaje");
    //     }

    // })

    // }
  });
};
/* async function loadMonoCounter() {
  const data = await fs.readFile('monolitic.txt', 'binary');
  return Buffer.from(data);
} */
//  async function loadBotMenu(path) {
//   let data = await promfs.readFile(path);
//   return data;
// }

async function logger(
  message,
  client,
  sessionName,
  userName,
  userId,
  channel,
  status
) {
  console.log(`${sessionName} MSG:type: `, message.type);
  console.log(`${sessionName} MSG:body: `, message.body);
  console.log(`${sessionName} MSG:id: `, message.id.toString());
  console.log(`${sessionName} MSG:from: `, message.from);
  //console.log(`${sessionName} MSG: `, message)
  switch (message.type) {
    case "chat":
      {
        if (message.type === "chat" && message.isGroupMsg === false) {
          let payload = {
            userid: userId,
            session: sessionName,
            username: userName,
            body: message.body,
            from: message.from,
            to: message.to,
            wid: message.id.toString(),
          };
          console.log(payload);

          //     handleIncoming({payload).then(function (data) {
          //     console.log("handleIncoming: ", data);
          //   });
        }
      }
      break;
    //   case 'image':
    //       {
    //           if (message.isMedia === true || message.isMMS === true) {
    //                 const buffer = await globalWServices[sessionName].decryptFile(message);
    //                 // At this point you can do whatever you want with the buffer
    //                 // Most likely you want to write it into a file

    //                 var dir = '/home/asteriskapi/media/'+ userId + '';
    //                 !fs.existsSync(dir) && fs.mkdirSync(dir);

    //                 const fileName = `${message.mediaKey}.${mime.extension(message.mimetype)}`;

    //                 await fs.writeFile(dir +'/' + fileName, buffer, (err) => {
    //                   console.log('File saved', )
    //                 });
    //               }
    //       }
    //       break;
    //   case 'video':
    //       {
    //           if (message.isMedia === true || message.isMMS === true) {
    //                 const buffer = await globalWServices[sessionName].decryptFile(message);
    //                 // At this point you can do whatever you want with the buffer
    //                 // Most likely you want to write it into a file

    //                 var dir = '/home/asteriskapi/media/'+ userId + '';
    //                 !fs.existsSync(dir) && fs.mkdirSync(dir);

    //                 const fileName = `${message.mediaKey}.${mime.extension(message.mimetype)}`;

    //                 await fs.writeFile(dir +'/' + fileName, buffer, (err) => {
    //                   console.log('File saved', )
    //                 });
    //               }
    //       }
    //       break;
    //   case 'document':
    //   {
    //       //if (message.isMedia === true || message.isMMS === true) {
    //             const buffer = await globalWServices[sessionName].decryptFile(message);
    //             // At this point you can do whatever you want with the buffer
    //             // Most likely you want to write it into a file

    //             var dir = '/home/asteriskapi/media/'+ userId + '';
    //             !fs.existsSync(dir) && fs.mkdirSync(dir);

    //             const fileName = `${message.filename}.${mime.extension(message.mimetype)}`;

    //             await fs.writeFile(dir +'/' + fileName, buffer, (err) => {
    //               console.log('File saved', )
    //             });
    //          // }
    //   }
    //   break;
    default:
      {
        console.log("message.type: ", message.type, "SKIPPED");
      }
      break;
  }
}

function handleIncoming(data) {
  //   var deferred = Q.defer();
  //   sql
  //     .execute({
  //       procedure: "HS_handleIncomingWhatsapp",
  //       params: {
  //         userid: {
  //           type: sql.NVARCHAR,
  //           val: data.userid,
  //         },
  //         session: {
  //           type: sql.NVARCHAR,
  //           val: data.session,
  //         },
  //         username: {
  //           type: sql.NVARCHAR,
  //           val: data.username,
  //         },
  //         body: {
  //           type: sql.NVARCHAR,
  //           val: data.body,
  //         },
  //         from: {
  //           type: sql.NVARCHAR,
  //           val: data.from,
  //         },
  //         to: {
  //           type: sql.NVARCHAR,
  //           val: data.to,
  //         },
  //         wid: {
  //           type: sql.NVARCHAR,
  //           val: data.wid,
  //         },
  //       },
  //     })
  //     .then(function (data) {
  //       deferred.resolve(data);
  //     });
  //   return deferred.promise;
}
// function getWhastsappAccountBot(data) {
//   var deferred = Q.defer();
//   sql
//     .execute({
//       procedure: "HS_getWhastsappAccountBot",
//       params: {
//         id: {
//           type: sql.NVARCHAR,
//           val: data.id,
//         },
//       },
//     })
//     .then(function (info) {
//       deferred.resolve(info[0][0][0]);
//     });
//   return deferred.promise;
// }
// //-----------------------------------------------------------------------------------------------------------------------

// function getUserBalance(id) {
//   var deferred = Q.defer();
//   sql
//     .execute({
//       procedure: "HS_getUserBalance",
//       params: {
//         id: {
//           type: sql.NVARCHAR,
//           val: id,
//         },
//       },
//     })
//     .then(function (data) {
//       deferred.resolve(data[0][0]);
//     });
//   return deferred.promise;
// }

// function setWAReport(options) {
//   console.log("setWAReport: ", options);
//   var deferred = Q.defer();
//   sql
//     .execute({
//       procedure: "HS_setWAReport",
//       params: {
//         id_campana: { type: sql.INT, val: options.id_campana },
//         id_contactos: { type: sql.INT, val: options.id_contactos },
//         id_usuario: { type: sql.INT, val: options.id_usuario },
//         id_plantilla: { type: sql.NVARCHAR, val: options.id_plantilla },
//         channelName: { type: sql.NVARCHAR, val: options.channelName },
//         channelTo: { type: sql.NVARCHAR, val: options.channelTo },
//         channelPath: { type: sql.NVARCHAR, val: options.channelPath },
//         channelStart: { type: sql.NVARCHAR, val: options.channelStart },
//         channelEnd: { type: sql.NVARCHAR, val: options.channelEnd },
//         channelDuration: { type: sql.NVARCHAR, val: options.channelDuration },
//         channelInit: { type: sql.NVARCHAR, val: options.channelInit },
//         operador: { type: sql.NVARCHAR, val: options.operador },
//         kannelId: { type: sql.NVARCHAR, val: options.kannelId },
//         tipoCampaign: { type: sql.NVARCHAR, val: options.tipoCampaign },
//         fechaEnvios: { type: sql.NVARCHAR, val: options.fechaEnvios },
//         cantSMS: { type: sql.INT, val: options.cantSMS },
//         tipoCuenta: { type: sql.INT, val: options.tipoCuenta },
//       },
//     })
//     .then(function (data) {
//       deferred.resolve(data[0][0]);
//     });
//   return deferred.promise;
// }

// function chargeWA(options) {
//   console.log("chargeWA: ", options);
//   var deferred = Q.defer();
//   sql
//     .execute({
//       procedure: "HS_chargeWA",
//       params: {
//         id_campana: { type: sql.INT, val: options.id_campana },
//         id_contactos: { type: sql.INT, val: options.id_contactos },
//         id_usuario: { type: sql.INT, val: options.id_usuario },
//         id_plantilla: { type: sql.NVARCHAR, val: options.id_plantilla },
//         channelName: { type: sql.NVARCHAR, val: options.channelName },
//         channelTo: { type: sql.NVARCHAR, val: options.channelTo },
//         channelPath: { type: sql.NVARCHAR, val: options.channelPath },
//         channelStart: { type: sql.NVARCHAR, val: options.channelStart },
//         channelEnd: { type: sql.NVARCHAR, val: options.channelEnd },
//         channelDuration: { type: sql.NVARCHAR, val: options.channelDuration },
//         channelInit: { type: sql.NVARCHAR, val: options.channelInit },
//         operador: { type: sql.NVARCHAR, val: options.operador },
//         kannelId: { type: sql.NVARCHAR, val: options.kannelId },
//         tipoCampaign: { type: sql.NVARCHAR, val: options.tipoCampaign },
//         fechaEnvios: { type: sql.NVARCHAR, val: options.fechaEnvios },
//         cantSMS: { type: sql.INT, val: options.cantSMS },
//         tipoCuenta: { type: sql.INT, val: options.tipoCuenta },
//       },
//     })
//     .then(function (data) {
//       deferred.resolve(data[0][0]);
//     });
//   return deferred.promise;
// }

//-----------------------------------------------------------------------------------------------------------------------
export default processMessages;

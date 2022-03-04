import * as cron from "node-cron";
import moment from "moment";
//import executeQuery from "../db";
//import { v4 as uuidv4 } from "uuid";

import { create, Whatsapp } from "venom-bot";

//import * as puppeteer from 'puppeteer';
// import puppeteer from "puppeteer";
// import * as cheerio from "cheerio";

//import { Observable } = from 'rxjs/Rx'
//const { filter, map, reduce,  } = require('rxjs/operators')
//const { pipe } = require('rxjs/Rx')
import { from, of, pipe } from "rxjs";
import { map } from "rxjs/operators";
import processMessages from "./bot/processMessages";

console.log("HANDLER CALLED");

const work = async (payload) => {
  try {
    if (
      payload
      // && payload.name && payload.url
    ) {
      // code ...
      console.log("work: ", payload);
      let { sessionName, userName, userId, bot, status, channel } = payload;

      create(
        //session
        `${sessionName}`, //Pass the name of the client you want to start the bot
        //catchQR
        (base64Qrimg, asciiQR, attempts, urlCode) => {
          console.log("Number of attempts to read the qrcode: ", attempts);
          console.log("Terminal qrcode: ", asciiQR);
          console.log("base64 image string qrcode: ", base64Qrimg);
          console.log("urlCode (data-ref): ", urlCode);
        },
        // statusFind
        (statusSession, session) => {
          console.log("Status Session: ", statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
          //Create session wss return "serverClose" case server for close
          console.log("Session name: ", session);
        },
        {
          multidevice: false,
        }
      )
        .then((client) => {
          console.log("PRE CALL START: ", client);
          console.log("PRE CALL START");
          start(client, sessionName, userName, userId, channel, status, bot);
          //Logger(client,sessionName,userName,userId,channel,status);
          console.log(
            client,
            sessionName,
            userName,
            userId,
            channel,
            status,
            bot
          );
          processMessages(
            client,
            sessionName,
            userName,
            userId,
            channel,
            status,
            bot
          );
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      console.log("Payload skipped: ", payload);
    }
  } catch (error) {
    console.log("child work error: ", error);
  }
};
//-----------------------------------------------
process.on("message", async (payload) => {
  console.log("forked!");
  try {
    console.log("Message in child: ", payload);
    const result = await work(payload);
    //.then(result => {
    //  process.send(result)
    //process.exit()
    //})
    if (result) {
      console.log("process.onmessage work result: ", result);
      process.send(result);
      process.exit();
    } else {
      process.send([{}]);
      process.exit();
    }
  } catch (error) {
    console.log("error in child", error);
    process.exit();
  }
});
//-----------------------------------------------------
function start(client, sessionName, userName, userId, channel, status, bot) {
  console.log("Calling START");
  console.log("Calling START: bot: ", bot);
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Bot")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}

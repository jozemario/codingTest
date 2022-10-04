import { SandboxedJob } from "bullmq";
import { fork } from "child_process";
import { create, Whatsapp } from "venom-bot";
import { getws } from "../../socket";
import CustomNodeJsGlobal from "../../models/Global";
import processMessages from "../handlers/whatsapp/bot/processMessages";
import path, { join } from "path";
declare const global: CustomNodeJsGlobal;
declare const Buffer;
const ws = getws();

module.exports = async (job: SandboxedJob) => {
  // Do something with job
  console.log("Processing job: ", new Date(), job);
  // console.log("runChild:", new Date());
  let runChildFlag = true;
  let { sessionName, userName, userId, bot, status, channel } = job.data;
  runChildFlag &&
    //console.log(
    (await runChild({ sessionName, userName, userId, bot, status, channel }));
  //);

  // create({
  //   session: `${sessionName}`, //name of session
  //   multidevice: false, // for version not multidevice use false.(default: true)
  // })
  //   .then((client) => {
  //     start(client, sessionName, userName, userId, channel, status, bot);
  //     console.log(client, sessionName, userName, userId, channel, status, bot);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  !runChildFlag &&
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
        // (base64Qrimg, asciiQR, attempts, urlCode) => {
        //   console.log("Terminal qrcode: ", asciiQR);
        //   console.log("base64 image string qrcode: ", base64Qrimg);
        //   //output and export qr
        //   var matches = base64Qrimg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        //     response: any = {};

        //   if (matches.length !== 3) {
        //     return new Error("Invalid input string");
        //   }
        //   response.type = matches[1];
        //   response.data = new Buffer.from(matches[2], "base64");

        //   var imageBuffer = response;

        //   let message = {
        //     base64Qrimg: base64Qrimg,
        //     asciiQR: asciiQR,
        //     attempts: attempts,
        //     urlCode: urlCode,
        //     imageBuffer: imageBuffer,
        //     sessionName: sessionName,
        //     userName: userName,
        //   };
        //   console.log('socket.emit("sendQr", message): ', message);
        //   //socket.emit("sendQr", message);

        //   require("fs").writeFile(
        //     "./tokens/" + sessionName + "QR.png",
        //     imageBuffer["data"],
        //     "binary",
        //     function (err) {
        //       if (err != null) {
        //         console.log(err);
        //       }
        //     }
        //   );
        //   ///exportqr
        // },

        // (statusSession, session) => {
        //   console.log("Status Session: ", statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
        //   //Create session wss return "serverClose" case server for close
        //   console.log("Session name: ", session);
        //   status = statusSession;
        //   console.log("Status Session: " + sessionName + ": " + statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled

        //   // updateWhatsSessionStatus({
        //   //   userid: userId,
        //   //   session: sessionName,
        //   //   username: userName,
        //   //   status: status,
        //   // }).then(function (data) {
        //   //   console.log("updateWhatsSessionStatus: First ", data[0]);
        //   //   socket.emit("sendClient", {
        //   //     userid: userId,
        //   //     session: sessionName,
        //   //     username: userName,
        //   //     status: status,
        //   //   });
        //   // });
        // },

        // {
        //   multidevice: false, // for version not multidevice use false.(default: true)
        //   folderNameToken: "tokens", //folder name when saving tokens
        //   mkdirFolderToken: "", //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
        //   headless: true, // Headless chrome
        //   devtools: false, // Open devtools by default
        //   useChrome: true, // If false will use Chromium instance
        //   debug: false, // Opens a debug session
        //   logQR: true, // Logs QR automatically in terminal
        //   browserWS: "", // If u want to use browserWSEndpoint
        //   browserArgs: ["--no-sandbox"], // Parameters to be added into the chrome browser instance
        //   //puppeteerOptions: { executablePath: "/usr/bin/chromedriver" }, // Will be passed to puppeteer.launch
        //   disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
        //   disableWelcome: true, // Will disable the welcoming message which appears in the beginning
        //   updatesLog: true, // Logs info updates automatically in terminal
        //   autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
        //   createPathFileToken: false,
        //   // chromiumVersion: '818858', // Version of the browser that will be used. Revision strings can be obtained from omahaproxy.appspot.com.
        //   // addProxy: [''], // Add proxy server exemple : [e1.p.webshare.io:01, e1.p.webshare.io:01]
        //   // userProxy: '', // Proxy login username
        //   // userPass: '' // Proxy password
        // },

        // // BrowserSessionToken
        // // To receive the client's token use the function await clinet.getSessionTokenBrowser()
        // // {
        // //   WABrowserId: '"UnXjH....."',
        // //   WASecretBundle:
        // //     '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
        // //   WAToken1: '"0i8...."',
        // //   WAToken2: '"1@lPpzwC...."',
        // // },
        // undefined,
        // // BrowserInstance
        // (browser: any, waPage: any) => {
        //   console.log("Browser PID:", browser.process().pid);
        //   waPage.screenshot({
        //     path: "./tokens/" + sessionName + "screenshot.png",
        //   });
        // }
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
        console.log("CALL START error:", error);
        // socket.emit("sendClient", {
        //   userid: userId,
        //   session: sessionName,
        //   username: userName,
        //   status: status,
        // });
      });
};

function runChild(payload) {
  console.log("Called runChild: ", new Date());
  return new Promise((resolve, reject) => {
    let childPath = path.resolve(
      __dirname + "/../handlers/whatsapp/entrypoint"
    );
    const child = fork(childPath, [], {
      stdio: ["inherit", "inherit", "inherit", "ipc"],
    });

    //console.log("child:", child);
    child.send(payload);
    child.on("message", (result) => {
      console.log("runChild message: ", result);
      resolve(result);
    });
    child.on("error", (error) => {
      console.log("error: ", error);
      reject(error);
    });
    child.on("exit", (error) => {
      console.log("exit: ", error);
      reject(error);
    });
  });
}
// function getBooksFromAmazon(category) {
//   return new Promise((resolve, reject) => {
//     const child = fork("./server/routes/cronWorker.ts");
//     child.send(category);
//     child.on("message", (result) => {
//       resolve(result);
//     });
//     child.on("error", (error) => {
//       reject(error);
//     });
//   });
// }

function start(client, sessionName, userName, userId, channel, status, bot) {
  console.log("Calling START");
  console.log("Calling START: bot: ", bot);

  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });

  // let device;

  // global.WServices.push({ sessionName: sessionName, client: client });

  // global.WServices.map((service) => {
  //   if (service.sessionName === sessionName) {
  //     service.getSessionTokenBrowser().then((result) => {
  //       console.log("getSessionTokenBrowser: ", result);
  //       let data = JSON.stringify(result);
  //       // fs.writeFile(
  //       //   `/home/asteriskapi/tokens/${sessionName}.data.json`,
  //       //   data,
  //       //   (err) => {
  //       //     if (err) throw err;
  //       //     console.log("Data written to file");
  //       //   }
  //       // );
  //     });
  //     service.getHostDevice().then((result) => {
  //       console.log("getHostDevice: ", result);
  //       device = result;
  //       channel = result.wid.user;
  //       //globalWServices[sessionName]= client;
  //       service.username = userName;
  //       service.userid = userId;
  //       service.channel = channel;
  //       console.log("NEW CLIENT: ", Object.keys(service));
  //       console.log("NEW CLIENT: ", service);
  //       //setWhatsSession
  //       // setWhatsSession({
  //       //   userid: userId,
  //       //   session: sessionName,
  //       //   username: userName,
  //       //   status: status,
  //       //   channel: channel,
  //       //   accountid: bot,
  //       // }).then(function (data) {
  //       //   console.log("setWhatsSession in Start: ", data[0]);
  //       //   //socket.emit('sendClient',{userid:userId,session:sessionName,username:userName, status:status,device:device,channel:channel});
  //       // });
  //       console.log("updatesessionwhat: ", {
  //         userid: userId,
  //         session: sessionName,
  //         username: userName,
  //         status: status,
  //         channel: channel,
  //       });
  //       // updateWhatsSessionStatus({
  //       //   userid: userId,
  //       //   session: sessionName,
  //       //   username: userName,
  //       //   status: status,
  //       //   channel: channel,
  //       // }).then(function (data) {
  //       //   console.log("updateWhatsSessionStatus in Start: ", data[0]);
  //       //   socket.emit("sendClient", {
  //       //     userid: userId,
  //       //     session: sessionName,
  //       //     username: userName,
  //       //     status: status,
  //       //     device: device,
  //       //     channel: channel,
  //       //   });
  //       // });
  //     });
  //   }
  // });
}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// require('dotenv').config();
import * as Parse from "parse/node";
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');

var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");
// import { ParseServer } from 'parse-server';
// import ParseDashboard from 'parse-dashboard';
import * as fs from "fs";

const port = 3100;
const debugging = process.env.DEBUG || false;

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync("./DigiCertGlobalRootG2.crt.pem"),
  //   cert: fs.readFileSync("./DigiCertGlobalRootG2.crt.pem"),
  // };

  const app = await NestFactory.create(AppModule, {
    // httpsOptions: httpsOptions
  });

  var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
  var restAPIKey = "debunkbot12@!!";
  var clientKey = "debunkbot12@!!";
  var javascriptKey = "debunkbot12@!!";
  var masterKey =
    process.env.MASTER_KEY || "debunkbot12@!!Master_AAHc3e9q_Rj6mUbV";
  // var serverURL = process.env.SERVER_URL || 'https://debunk.plot411.com/parse'

  var serverURL = `http://127.0.0.1:${port}/parse`;
  // databaseUri = "mongodb+srv://admin:6iT4wLTN6rXYa8B@cluster0.2toly.mongodb.net/debunkbot?retryWrites=true&w=majority"
  var publicServerURL =
    "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/parse";

  // databaseUri = 'postgres://postgres:postgres@157.230.47.71:5432/jazke'
  // databaseUri = 'postgres://admin:admin@143.198.68.104:5432/jazke-web'

  if (debugging) {
    databaseUri = "mongodb://localhost:27017/jazke-web";
    publicServerURL = serverURL;
    console.log('debgugginh on', debugging)
  }

  // databaseUri = 'postgres://jazkadmin:Development.313*@jazk-postgres-fdb.postgres.database.azure.com/web_dev'
  // databaseUri = "mongodb+srv://admin:6iT4wLTN6rXYa8B@cluster0.2toly.mongodb.net/debunkbot?retryWrites=true&w=majority"

  var appId = process.env.APP_ID || "debunkbot";
  var appName = "JAZKE";
  // In a node.js environment
  Parse.initialize(appId, clientKey, masterKey);
  //javascriptKey is required only if you have it on server.
  (Parse as any).serverURL = serverURL;

  if (!databaseUri) {
    databaseUri =
      "postgres://admin:admin@143.198.68.104:5432/jazke-web";
    console.log("DATABASE_URI not specified, falling back to localhost.");
  }

  var api = new ParseServer({
    databaseURI: databaseUri,
    // cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    appId: appId,
    masterKey: masterKey, //Add your master key here. Keep it secret!
    serverURL: serverURL, // Don't forget to change to https if needed
    javascriptKey: javascriptKey,
    restAPIKey: restAPIKey,
    clientKey: clientKey,
    maxUploadSize: "500mb",
    masterKeyIps: ["0.0.0.0/0", "::/0"],
    allowClientClassCreation: true,

    fileUpload: {
      enableForPublic: true,
      enableForAnonymousUser: true,
      enableForAuthenticatedUser: true,
    },

    filesAdapter: {
      module: "parse-server-fs-adapter",
      options: {
        filesSubDirectory: "/uploads", // Specify the subdirectory where files will be saved
      },
    },

    liveQuery: {
      classNames: ["JazkeSale", "JazkeQuotation", "JubileeSettings"], // List of classes to support for query subscriptions
    },
    // Your apps name. This will appear in the subject and body of the emails that are sent.
    appName: appName,

    emailAdapter: {
      // module: "parse-server-generic-email-adapter",
      // options: {
      //   service: "Gmail", // Could be anything like yahoo, hotmail, etc, Full list - see below
      //   email: "app.debunkbot@gmail.com",
      //   password: "?dPtHW7vz_dLP9v"
      // }
      module: "parse-server-generic-email-adapter",
      options: {
        service: "gmail", // Could be anything like yahoo, hotmail, etc, Full list - see below
        email: "congounlocked@gmail.com",
        password: "qywswupsbdqsntuw",
      },
    },
    publicServerURL: publicServerURL,

    // Enable email verification
    verifyUserEmails: false,

    emailVerifyTokenValidityDuration: 2 * 60 * 60, // in seconds (2 hours = 7200 seconds)

    preventLoginWithUnverifiedEmail: false, // defaults to false
  });

  await api.start();
  console.log("starting parse");

  // // Ensure the 'logs' directory exists
  // const logsDirectory = path.join(__dirname, '../logs'); // Assuming 'logs' is in the parent directory

  // // const logsDirectory = path.join(__dirname, 'logs');
  // if (!fs.existsSync(logsDirectory)) {
  //   fs.mkdirSync(logsDirectory);

  // }

  // // Ensure the 'access.log' file exists or create it
  // const accessLogPath = path.join(logsDirectory, 'access.log');
  // if (!fs.existsSync(accessLogPath)) {
  //   fs.writeFileSync(accessLogPath, '');
  // }

  // Middleware logger using Morgan

  // const logStream = fs.createWriteStream(path.join(__dirname, '../logs', 'access.log'), { flags: 'a' });

  // app.use(
  //   morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" ' +
  //     ':status :res[content-length] ":referrer" ":user-agent" ' +
  //     '', { stream: logStream })
  // );

  // app.enableCors({
  //   // preflightContinue: false,
  //   // methods: "*",
  //   // optionsSuccessStatus: 200,
  //   // allowedHeaders: "*",
  //   origin: "*",
  //   // credentials: true
  // });

  // Serve the Parse API on the /parse URL prefix
  app.use("/parse", api.app);

  //parse dashboard
  var dashboardOptions = { allowInsecureHTTP: true };
  var trustProxy = true;
  var dashboard = new ParseDashboard(
    {
      apps: [
        {
          serverURL: publicServerURL,
          appId: appId,
          masterKey: masterKey,
          appName: appName,
        },
      ],
      users: [
        {
          user: "admin",
          pass: "qywswupsbdqsntuw",
        },
      ],
      trustProxy: 1,
    },
    dashboardOptions
  );

  // make the Parse Dashboard available at /dashboard/
  app.use("/dashboard", dashboard);

  app.enableCors();

  let p = process.env.PORT || port;

  await app.listen(p);

  console.log("server is running on port", p);

  let server = app.getHttpServer();

  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(server);
}
bootstrap();

import { Server } from "@webserverless/fc-express";
import getRawBody from "raw-body";
import { server } from "./createExpressServer";
const proxyServer = new Server(server);
// let { initDb } = require("../model/index");

// http trigger
export const handler = async (req, res, context) => {
  // initDb();
  req.body = await getRawBody(req);
  proxyServer.httpProxy(req, res, context);
};

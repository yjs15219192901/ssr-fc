import { Server } from '@webserverless/fc-express'
import getRawBody from 'raw-body'
import { server } from './createExpressServer'
const proxyServer = new Server(server)
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://host.docker.internal:27017/test1";

// http trigger
let init = false;
export const handler = async (req, res, context) => {
  if (!init) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("数据库已创建!");
    });
    init = true;
  }
  req.body = await getRawBody(req)
  proxyServer.httpProxy(req, res, context)
}

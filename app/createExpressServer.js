import express from "express";
import renderToStreamForFaas from "ykfe-utils/es/renderToStreamForFass";
const studentRouter = require("./controller/student");
const adminRouter = require("./controller/admin");
// const getApi = require("./api");
const ssrConfig = require("../config/config.ssr");
// var cookieParser = require("cookie-parser");
const isDev = process.env.local;

const createServer = () => {
  const server = express();
  // server.use(bodyParser.urlencoded({ extended: true }));
  // server.use(bodyParser.json());
  // server.get("/api/getIndexData", async (req, res) => {
  //   console.log(req.body, req.params);
  //   res.status = 200;
  //   res.set("Content-Type", "text/html");
  //   let data = getApi;
  //   res.send(data);
  // });
  if (isDev) {
    const proxy = require("express-http-proxy");
    // 为了docker可以使用宿主机的服务，这里需要使用本机IP地址
    server.use(
      "*",
      proxy(`http://host.docker.internal:8888`, {
        filter: function (req, res) {
          return /(\/static)|(\/sockjs-node)|hot-update/.test(req.baseUrl);
        },
        proxyReqPathResolver: function (req) {
          return "/2016-08-15/proxy/ssr/page" + req.baseUrl;
        },
      })
    );
  }
  // server.use(cookieParser());
  ssrConfig.routes.map((item) => {
    server.get(item.path, async (req, res) => {
      const ctx = {
        req,
        res,
        path: req.path,
        app: {
          config: ssrConfig,
        },
      };
      try {
        const stream = await renderToStreamForFaas(ctx, ssrConfig);
        res.status(200).set("Content-Type", "text/html");
        res.write("<!DOCTYPE html>");
        stream.pipe(res, { end: "false" });
        stream.on("end", () => {
          res.end();
        });
      } catch (error) {
        console.log(`renderStream Error ${error}`);
      }
    });
  });
  server.use("/api/student", studentRouter);
  server.use("/api/admin", adminRouter);
  server.use(express.static("dist"));

  return server;
};

export const server = createServer();

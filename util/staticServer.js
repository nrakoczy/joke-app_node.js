const fs = require("fs");
const path = require("path");
const url = require("url");

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

function serveStaticFile(req, res) {
  const baseURL = req.protocol + "://" + req.headers.host + "/";
  const parsedURL = new URL(req.url, baseURL);
  console.log(parsedURL);
  let pathSanitize = path.normalize(parsedURL.pathname);

  console.log("pathSanitize:" + pathSanitize);
  console.log("__dirname:" + "__dirmame");

  let pathname = path.join(__dirname, "..", "static", pathSanitize);
  //C:\Users\Natalia\Desktop\joke-app_node.js\static\app.js
  console.log("pathname:" + pathname); //ścieżka pliku na serwerze

  if (fs.existsSync(pathname)) {
    if (fs.statSync(pathname).isDirectory()) {
      pathname += "/index.html";
    }
    fs.readFile(pathname, function (err, data) {
      if (err) {
        res.statusCode = 500;
        res.end("File nod found:" + err);
      } else {
        const extension = path.parse(pathname).ext;

        res.setHeader("Content-type", mimeTypes[extension]);
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("File not found");
  }
}

module.exports = {
  serveStaticFile,
};

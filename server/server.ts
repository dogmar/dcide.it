if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var sessions = require("client-sessions");

var port = process.env.PORT;

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    let redirect = false;
    let host = req.headers.host;
    if (req.headers["x-forwarded-proto"] !== "https") {
      redirect = true;
    }
    // If domain doesn't begin with 'www' and it's not already a subdomain,
    // redirect to 'www' subdomain
    if (host.substr(0, 4) !== "www." && !/^[^/]*\.[^/]*\./.test(host)) {
      redirect = true;
      host = "www." + host;
    }
    if (redirect) {
      return res.redirect("https://" + host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
});

app.use(
  sessions({
    cookieName: "matchupSession",
    secret: "53254256975485232185985563345",
    // how long the session will stay valid in ms
    duration: 24 * 60 * 60 * 1000,
  })
);

// to support JSON-encoded bodies
app.use(bodyParser.json({ limit: "1mb" }));

// to support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    limit: "1mb",
    extended: true,
  })
);

// Serve up create-react-app built files
if (process.env.NODE_ENV === 'production') {
  // Serve built create-react app files on production
  app.use(express.static('client/build'));

  // Serve unknown routes to index.html for react-router support
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server running on host", host);
  console.log("Server running on port", port);
});

module.exports = app;

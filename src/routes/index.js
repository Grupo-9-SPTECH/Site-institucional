var express = require("express");
var router = express.Router();

var indexController = require("../controllers/indexController");

router.get("/buscarUsuarios", function (req, res) {
    indexController.buscarUsuarios(req, res);
});

router.get("/buscarInfoMaq", function (req, res) {
    indexController.buscarInfosIndex(req, res);
});

module.exports = router;  
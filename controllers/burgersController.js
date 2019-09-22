var express = require("express");

var router = express.Router();

var db = require("../models");

// routes

// show ALL burgers
router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(result) {
    var burgers = [];
    var devoured_burgers = [];
    for (var i in result) {
      if (result[i].devoured) {
        devoured_burgers.push(result[i]);
      } else {
        burgers.push(result[i]);
      }
    }
    res.render("index", {
      burgers: burgers,
      devoured_burgers: devoured_burgers
    });

  });
});

// create a new burger
router.post("/api/burgers", function(req, res) {
  var { burger_name, devoured } = req.body;
  db.Burger.create({
    burger_name,
    devoured
  }).then(function(result) {
    res.status(200).send(result);
  });
});

// update a burger (devoured or not)
router.put("/api/burgers/:id", function(req, res) {
  var { burger_name, devoured } = req.body;
  db.Burger.update(
    {
      burger_name,
      devoured
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function(result) {
    res.json(result);
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    var burgers = [];
    var devoured_burgers = [];
    for (var i in result) {
      if (result[i].devoured === 1) {
        devoured_burgers.push(result[i]);
      } else {
        burgers.push(result[i]);
      }
    }
    res.render("index", {
      burgers: burgers,
      devoured_burgers: devoured_burgers
    });
  });
});

module.exports = router;

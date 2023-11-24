const express = require("express");
const router = express.Router();
const allOrders = require("../data/orders.json");
const fs = require("fs");

router.get("/",(req, res)=> {
    res.send(allOrders);
});

router.post("/", (req,res)=>{
    const newOrder = req.body;
    const info = [...allOrders , newOrder];
    fs.writeFile("./data/orders.json", JSON.stringify(info), (err)=> {
        if (err) throw err;
        res.json({ message: "Order Created", data: newOrder});
    });
});

module.exports = router;
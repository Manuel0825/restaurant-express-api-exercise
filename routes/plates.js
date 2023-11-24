const express = require("express");
const router = express.Router();
const allPlates = require("../data/menu.json");
const fs = require("fs");

router.get("/", (req, res) => {
  res.json(allPlates);
});

router.post("/",(req,res)=>{
    const plateNew = req.body;
    const info =[...allPlates,plateNew];
    fs.writeFile("./data/menu.json",JSON.stringify(info),(err) => {
        if (err) throw err;
        res.json ({ message: "Plate Created", data: plateNew});

    });
});

router.put("/:id",(req,res)=>{
    const plateUpdate = allPlates.map((el)=>{
        if(el.id === req.params.id){
            return{
                ...el, 
                name: req.body.name,
            };
    }
    return el;
    });
    fs.writeFile("./data/menu.json",JSON.stringify(plateUpdate),(err) => {
        if (err) throw err;
        res.json ({ message: "Plate Updated", data: req.body.name});
        });
     });

     router.delete("/:id", (req, res) =>{
        const plateDelete = allPlates.filter((el)=>{
            if (el.id=== req.params.id){
                return false;
                }
                return true;
            });

            fs.writeFile("./data/menu.json",JSON.stringify(plateDelete),(err) => {
                if (err) throw err;
                res.json ({ message: "Plate Removed", data: allPlates [1]});
                });

           
     });



module.exports = router;

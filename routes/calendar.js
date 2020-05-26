const Structure = require('../models/structure')
const Project = require('../models/project')

const express = require('express')
const router = express.Router()
var bodyParser = require("body-parser")
const fs = require('fs');

let rawdata = fs.readFileSync('localitati.json');
let localitati = JSON.parse(rawdata);




router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
var user;

router.get('/', (req, res) => {

   user = req.user.profile;
   var structs = []
    Structure.find({}, (error, structures) => {
        var tipuri = [];
        var camere = [];
        structs = structures;
        structures.forEach((item) => {
            tipuri.push(item.tip);
            camere.push(item.camere)
        })
        console.log(camere)
        //reviews.forEach((item)=>{revs.push(item.reviewText)})
        //console.log(structures[0].tip)

    })
    Project.find({}, (error, projects) => {
        
        //reviews.forEach((item)=>{revs.push(item.reviewText)})
        //console.log(structures[0].tip)

    })
    res.render('calendar', { Localitati: localitati.Localitati, structures });

});
const url = require('url');  
router.post('/', (req, res) => {
    user = req.user.profile;
    
    res.redirect(url.format({
        pathname:"/pdf",
        query: {
           fname: user.firstName,
           lname: user.lastName

         }
      }));
});

router.post('/:id', (req, res) => {
    if (req.user) {
        console.log(req.user)
    }
   // console.log(req.body.tipProiect)
    const { lname, fname, tipProiect, adresa } = req.body;
    
    const proiect= new Project({
        username: req.body.lname + " " + req.body.fname,
        address: req.body.adresa,
        projectType: req.body.tipProiect
    })
   try {
        
        const proiect1 = proiect.save().then(()=>{console.log("u did it")})
        res.redirect('/calendar');
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});

module.exports = router;
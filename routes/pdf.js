const express = require('express');
const router = express.Router();
const session = require('express-session');
router.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');
pdfMake.vfs = vfsFonts.pdfMake.vfs
///pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.get('/', (req, res)=>{

    console.log(req.query)
    const fname = req.query.fname;
    const lname = req.query.lname;

    var documentDefinition = {
        content: [
            `Hello ${fname} ${lname}` ,
            'Nice to meet you!'
        ]        
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200, 
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="filename.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });

});


module.exports = router;
const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
//const fileupload = require('express-fileupload')



//router.use(fileupload())



//const upload = multer({storage:multer.memoryStorage()});
//const pics = [{name: 'encuesta_empresa'}] [{name: 'constancia_imss'}];

// Setup Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination where the files should be stored on disk
        cb(null, 'src/public/uploaded/constancia_imss');
    },
    filename: function (req, file, cb) {
        // Set the file name on the file in the uploads folder
        cb(null, file.fieldname + "-" + Date.now());
    },
    fileFilter: function (req, file, cb) {

        if (file.mimetype !== "image/jpeg" || file.mimetype !== "image/jpg" || file.mimetype !== "application/pdf" || file.mimetype !== "image/png") {
            // To reject a file pass `false` or pass an error
            cb(new Error('Formato de archivo invalido. JPEG, JPG, PNG, PDF solamente.'));
        } else {
            // To accept the file pass `true`
            cb(null, true);
        }

    }
});

// Setup multer
const upload = multer({ storage: storage }); // { destination: "uploads/"}

// Setup the upload route
//router.post("/upload", upload.single("data"), (req, res) => {

    


router.get('/reqform', (req, res) => {
    res.render('form/solform');
});



router.post('/reqform', upload.single('encuesta_empresa'), async (req, res) => {

    if (req.file) {

        // Get YAML or throw exception on error
        try {

            // Load the YAML
            const raw = fs.readFileSync(`src/public/uploaded/constancia_imss/${req.file.filename}`);
            const data = YAML.safeLoad(raw);

            // Show the YAML
            console.log(data);

            // Delete the file after we're done using it
            //fs.unlinkSync(`uploads/${req.file.filename}`);

        } catch (ex) {

            // Show error
            console.log(ex);

            // Send response
            res.status(500).send({
                ok: false,
                error: "Something went wrong on the server"
            });
            
        }

        // Send response
        res.status(200).send({
            ok: true,
            error: "Archivos enviado"
        });

    } else {

        // Send response
        res.status(400).send({
            ok: false,
            error: "Archivo no enviado, por favor intente de nuevo"
        });

    }

});

    // let encuesta_empresa;
    // let constancia_imss;
    // let uploadPath;

    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files uploaded')
    // }

    // encuesta_empresa = req.files.encuesta_empresa;
    // constancia_imss = req.files.constancia_imss;
    // uploadPath = __dirname + '/src/public/uploaded/encuesta_empresa/' + encuesta_empresa.name;
    // uploadPath = __dirname + '/src/public/uploaded/constancia_imss/' + constancia_imss.name;

    // console.log(encuesta_empresa, constancia_imss);


    // //mv() function to place file on the server
    // encuesta_empresa.mv(encuesta_empresa, function (err) {
    //     if (err) return res.status(500).send(err);

    // })

    // constancia_imss.mv(constancia_imss, function (err) {
    //     if (err) return res.status(500).send(err);

    // })




    //const imagen1 = req.files.encuesta_empresa[0].buffer.toString('base64');
    //const imagen2 = req.files.constancia_imss[0].buffer.toString('base64');  
    // const newsolicitud = {
    //     contacto_empresa,
    //     nombre_empresa,
    //     nombre_alumno,
    //     matricula_alumno,
    //     carrera_alumno,
    //     numero_imss_alumno,
    //     correo_alumno,
    //     telefono_alumno, 
    //     imagen1, 
    //     imagen2
    //  }


    // await pool.query('INSERT INTO solicitud set ?', [newsolicitud])
    // res.send('received');
//});




router.post('/solicitudpendiente', async (req, res) => {



    await pool.query('SELECT * FROM --- ')
})


router.get('/home', (req, res) => {
    // if (req.user.admin) {

    //     res.render('admin/inicio', {videojuegos: videojuegos})

    // }else{

    //     res.render('homescreen/inicio', {videojuegos: videojuegos})
    // }
    res.render('homescreen/inicio');
    //res.render('admin/inicio')
});

router.get('/pendiente', (req, res) => {
    res.render('files/pending');
});

router.get('/revisado', (req, res) => {
    res.render('files/revised');
});


router.get('/settings', (req, res) => {
    res.render('admin/settings')
})


module.exports = router;
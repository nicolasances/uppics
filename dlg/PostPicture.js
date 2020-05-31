var fs = require('fs-extra');       //File System - for file manipulation
var uuidv4 = require('uuid').v4;
var naming = require('../conf/naming');
var storageFacade = require('../controllers/StorageFacade');

exports.do = (req, res) => {

    // Determine the name of the tmp folder where the data will be termporarily stored
    var tmpFolder = process.env[naming.ENV_TMP_FOLDER];

    // Validation: check if the environment variable has been set. Error otherwise.
    if (!tmpFolder) {
        console.log('[ upppics ] - ERROR: could not find ' + naming.ENV_TMP_FOLDER + ' env variable');
        res.status(500).type('application/json').send({ code: 500, message: 'ERROR: could not find ' + naming.ENV_TMP_FOLDER + ' env variable' });
    }

    // Come up with a file name
    filename = uuidv4();

    // Verify that the folder is available
    fs.ensureDirSync(tmpFolder);

    var fstream;

    req.busboy.on('file', (fieldname, file) => {

        fstream = fs.createWriteStream(tmpFolder + '/' + filename);

        file.pipe(fstream);

        fstream.on('close', () => {
            
            res.status(201).type('application/json').send({
                filename: filename
            })

            // Now move the file to the target storage and then delete it
            // Get the target Box and Collection
            var box = req.params.box;
            var collection = req.params.collection;

            storageFacade.store(filename, box, collection);
        });

    });

    req.pipe(req.busboy);

}
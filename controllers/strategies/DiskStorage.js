var fs = require('fs-extra');       
var naming = require('../../conf/naming');

/**
 * This strategy stores the pictures to a compute disk attached as a volume to 
 * the uppics container
 */
exports.store = (filename, box, collection) => {

    return new Promise((success, failure) => {

        // Get the root folder and temp folder for uppics media
        var rootFolder = process.env[naming.ENV_ROOT_FOLDER];
        var tmpFolder = process.env[naming.ENV_TMP_FOLDER];

        // Define the path for the media file
        var destFolder = rootFolder + '/' + box + '/' + collection;

        // Source and destination files
        var sourceFile = tmpFolder + '/' + filename;
        var destFile = destFolder + '/' + filename;

        // Ensure that the target folder exists
        fs.ensureDirSync(destFolder);

        // Move the file
        fs.move(sourceFile, destFile).then(success, (error) => {

            console.log('[ uppics ] - ERROR moving file ' + filename + ' from ' + sourceFile + ' to ' + destFile);
            console.log(error);

            success();
            
        });

    });
}
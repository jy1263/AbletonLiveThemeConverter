//import modules
const rgba = new (require('@/modules/rgb.module'));
const FileHandler = new (require('@/modules/filehandler.module'));
const ObjHandler = new (require('@/modules/objhandler.module'));

class INDEX {
    
    constructor () {

    }
    run(oldxmltext, newxmltext) {
        //define args
        var newoutputname = ''

        //Init objects from xml
        try {
            //initOldObjects
            var oldObject = FileHandler.xml2obj(oldxmltext)
            var oldObjectInnerReference = oldObject.Ableton[Object.keys(oldObject.Ableton)[1]][0]
        }
        catch(err) {
            console.error(err)
            process.exit(1)
        }
        if(newxmltext !== ''){
            //initNewObjects
            var newObject = FileHandler.xml2obj(newxmltext)
            var newObjectInnerReference = newObject.Ableton[Object.keys(newObject.Ableton)[1]][0]
        }
        else {
            //If cannot be found, Live 11 Light theme will be used as the backup.
            const SecondInputBackup = new (require('@/modules/secondinputbackup.module'));
            var newObject = SecondInputBackup.backupObject
            var newObjectInnerReference = newObject.Ableton[Object.keys(newObject.Ableton)[1]][0]
        }

        //rename to new name
        oldObject.Ableton[Object.keys(newObject.Ableton)[1]] = oldObject.Ableton[Object.keys(oldObject.Ableton)[1]];
        delete oldObject.Ableton[Object.keys(oldObject.Ableton)[1]];

        //edit rgb values
        //new
        var ObjectKeys = Object.keys(oldObject.Ableton[Object.keys(newObject.Ableton)[1]][0]);
        ObjectKeys.forEach(element => {
            var object = oldObject.Ableton.Theme[0][element][0]
            if(rgba.rgbtrue(object)) {
                var hex = rgba.rgba2hex(`rgba(${object.R[0].$.Value}, ${object.G[0].$.Value}, ${object.B[0].$.Value}, ${object.Alpha[0].$.Value})`)
                oldObject.Ableton.Theme[0][element][0]={}
                oldObject.Ableton.Theme[0][element][0].$ = {'Value': '#'+hex}
            }
        });

        //edit meta values
        oldObject.Ableton.$.MinorVersion = newObject.Ableton.$.MinorVersion
        oldObject.Ableton.$.SchemaChangeCount = newObject.Ableton.$.SchemaChangeCount
        oldObject.Ableton.$.Creator=newObject.Ableton.$.Creator

        //add new values
        var newAddedValues = [];
        ObjHandler.getDifference(newObject, oldObject).forEach(e=> {
            let newobj = {}
            newobj[e] = newObjectInnerReference[e]
            // var string = `{'${e}': ${JSON.stringify(newObjectInnerReference[e])}},`
            newAddedValues.push(newobj);
        })

        newAddedValues.forEach(element => {
            var elementKey = Object.keys(element)[0]
            oldObject.Ableton.Theme[0][elementKey] = element[elementKey];
        })

        //convert back to xml
        return FileHandler.obj2xml(oldObject);
    }
}


module.exports = INDEX;
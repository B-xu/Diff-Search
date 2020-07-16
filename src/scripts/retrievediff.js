import {searchTypes,File} from '../models/file.js';
export default class retrieveDiff {
    files = [];

    constructor(){
    }
    retrieveFiles(fileNames, changedLines){
        let files = []
        fileNames.forEach(function(name, index){
            let file = new File(name, changedLines[index]);
            
            files.push(file);
        });
        this.files = files;
        return files;
    }

}
import File from '../models/file.js'

export default class retrieveDiff {
    constructor(){
    }
    retrieveFiles(fileNames, addedLines, deletedLines){
        let files = []
        fileNames.forEach(function(name, index){
            let file = new File(name, addedLines[index], deletedLines[index]);
            
            files.push(file);
        });
        return files;
    }

}
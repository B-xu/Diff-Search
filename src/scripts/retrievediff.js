import {searchTypes,File} from '../models/file.js';
export default class retrieveDiff {
    files = [];
    searchLines = [];

    constructor(){
    }

    hasSearchLines(){
        return this.searchLines.length > 0;
    }

    hasFiles(){
        return this.files.length > 0;
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

    addSearchLines(searchLines){
        this.searchLines = searchLines;
    }

    search(searchType){
        let result = [];
        this.files.forEach(file=>{
            let found = file.searchChanges(this.searchLines, searchType);
            result.push({filename:file.name, lines:found});
        })
        return result;
    }

}
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

    handleSearchTerm(request){
        let searchTerm = request.value;
        console.log(searchTerm);
    
        while (searchTerm.startsWith('\n')){
            searchTerm = searchTerm.slice(0,2);
        }
        while (searchTerm.endsWith('\n')){
            searchTerm = searchTerm.slice(searchTerm.length-2, searchTerm.length);
        }
        searchTerm = searchTerm.trim();
        let searchLines = searchTerm.split('\n');
        this.addSearchLines(searchLines);
        return searchLines;
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

    getSearchLinesLength(){
        return this.searchLines.length;
    }

    getLastSearchLineLength(){
        return this.searchLines[this.searchLines.length-1].length;
    }

}
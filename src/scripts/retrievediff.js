export default class retrieveDiff {
    constructor(){
    }

    hasSearchLines(){
        return this.searchLines.length > 0;
    }

    hasFiles(){
        return this.files.length > 0;
    }
    
    setFiles(files){
        this.files = files;
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

    getFiles(){
        return this.files;
    }

    getSearchLines(){
        return this.searchLines;
    }

    getSearchLinesLength(){
        return this.searchLines.length;
    }

    getLastSearchLineLength(){
        return this.searchLines[this.searchLines.length-1].length;
    }

}
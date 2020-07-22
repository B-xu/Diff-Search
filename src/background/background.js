import retrieveDiff from '../scripts/retrievediff.js';
import {searchTypes, File} from '../models/file.js'

let retrieve = new retrieveDiff();
function handleGitChanges(request){
    let files = retrieve.retrieveFiles(request.names, request.changed);
    console.log(files);
}

function handleSearchTerm(request){
    let searchTerm = request.value;
    console.log(searchTerm);

    while (searchTerm.startsWith('\n')){
        searchTerm = searchTerm.slice(0,2);
    }
    while (searchTerm.endsWith('\n')){
        searchTerm = searchTerm.slice(searchTerm.length-2, searchTerm.length);
    }
    let searchLines = searchTerm.split('\n');
    retrieve.addSearchLines(searchLines);
}

function validateAndSearch(){
    let result;
    if (retrieve.hasSearchLines()&& retrieve.hasFiles()){
        result = retrieve.search(searchTypes.ALL);
        console.log(result);
        //TODO Send message
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request);
        if (request.type === 'git-changes'){
            handleGitChanges(request);
        } else {
            handleSearchTerm(request);
        }
        validateAndSearch();
        
    }
);

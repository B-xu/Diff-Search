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
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request);
        if (request.type === 'git-changes'){
            handleGitChanges(request);
        } else {
            handleSearchTerm(request);
        }
        
    }
);

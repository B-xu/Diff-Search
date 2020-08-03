import retrieveDiff from '../scripts/retrievediff.js';
import {searchTypes, File} from '../models/file.js'

let retrieve = new retrieveDiff();
let status = {};

function validateAndSearch(){
    let result;
    if (status.hasFiles && status.hasSearch && 
            retrieve.hasSearchLines() && retrieve.hasFiles()){
        status = {};
        result = retrieve.search(searchTypes.ALL);
        console.log(result);
        
        return result;
    }
    return false;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request);
        if (request.type === 'git-changes'){
            let files = retrieve.retrieveFiles(request.names, request.changed);
            console.log(files);
            status.hasFiles = true;
        } else {
            sender = sendResponse;
            let searcharr = retrieve.handleSearchTerm(request);
            console.log(searcharr);
            status.hasSearch = true;
        }
        let searchRes = validateAndSearch();
        if(searchRes){
            console.log('Search result: ' + searchRes);
            // chrome.runtime.sendMessage({foundFiles:searchRes, type:'File results'});
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {foundFiles:searchRes, type:'File results', 
                                searchLength: retrieve.getSearchLinesLength(), lastLineLen: retrieve.getLastSearchLineLength()}, function(response) {});  
            });
        }
        return true;
    }
);

export { validateAndSearch};

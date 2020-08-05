import retrieveDiff from '../scripts/retrievediff.js';
import {searchTypes, File} from '../models/file.js'
import Search from '../models/search.js'

let retrieve = new retrieveDiff();
let status = {};

function validateAndSearch(){
    let result;
    if (status.hasFiles && status.hasSearch && 
            retrieve.hasSearchLines() && retrieve.hasFiles()){
        status = {};
        result = searchFiles(searchTypes.ALL, retrieve.getFiles());
        console.log(result);
        
        return result;
    }
    return false;
}

function addFiles(fileNames, changedLines){
    let files = []
    fileNames.forEach(function(name, index){
        let file = new File(name, changedLines[index]);
        
        files.push(file);
    });
    retrieve.setFiles(files);
}

function searchFiles(searchType, files){
    let searchLines = retrieve.getSearchLines();
    let result = [];
    files.forEach(file=>{
        let found = searchFile(file, searchLines,searchType);
        result.push({filename:file.name, lines:found});
    })
    return result;
}

function searchFile(file,searchLines, searchType){
    let result = [];
    if (searchLines.length === 0){
        return null;
    }

    let searchRange = file.getSearchRange(searchType);

    if (searchLines.length >= 3){
        result = Search.findMultipleLines(searchRange, searchLines);
    } else if (searchLines.length === 1){
        let searchLine = searchLines[0];
        result = Search.findSingleLine(searchRange, searchLine);
    } else {
        result = Search.findTwoLines(searchRange, searchLines);
    }
    
    if(result){
        return result;
    }
    return [];
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request);
        if (request.type === 'git-changes'){
            addFiles(request.names, request.changed);
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

export {validateAndSearch};

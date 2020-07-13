import retrieveDiff from '../scripts/retrievediff.js';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request);
        let retrieve = new retrieveDiff();
        let files = retrieve.retrieveFiles(request.names, request.added, request.deleted);
        console.log(files);
    }
);
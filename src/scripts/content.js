function retrieveFileData(){
    let fileChanges = [...document.getElementsByClassName('diff-table js-diff-table')];
    let adds=[];
    let dels=[];
    fileChanges.forEach(change=>{
        adds.push(retrieveChangedFileLines(change, 'blob-code blob-code-addition'));
        dels.push(retrieveChangedFileLines(change,'blob-code blob-code-deletion'));
        
    })


    let fileInfo = [...document.getElementsByClassName('file-info')];
    let names = retrieveFileNames(fileInfo);
    let payload = {names:names, added:adds, deleted:dels};
    return payload;
}

function retrieveFileNames(fileInfoArray){
    let names=[];
    
    fileInfoArray.forEach(fileInfo=>{
        names.push(fileInfo.getElementsByTagName('a')[0].title);
    })
    return names;
}

function retrieveChangedFileLines(fileElement, className){
    let lines = [];
    
    let elementNodes = [...fileElement.getElementsByClassName(className)];
    let elements = [...elementNodes];
    elements.forEach(element =>{
        lines.push(element.getElementsByTagName('span')[0].textContent);
    })
    return lines;
}


data = retrieveFileData();
console.log(data);
chrome.runtime.sendMessage(data);
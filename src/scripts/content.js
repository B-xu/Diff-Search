const lineTypes = {ADD:'add', DEL:'delete',SAME:'same'};

let files = {};

function retrieveFileData(){
    let fileChanges = [...document.getElementsByClassName('diff-table js-diff-table')];
    let changes=[];
    fileChanges.forEach(change=>{
        changes.push(retrieveChangedFileLines(change, 'blob-code'))   
    })


    let fileInfo = [...document.getElementsByClassName('file-info')];
    let names = retrieveFileNames(fileInfo);

    while (names.length > changes.length){
        names.pop();
    }

    for(let i=0; i< names.length; i++){
        files[names[i]] = changes[i]
    }

    console.log(files)
    
    let payload = {names:names, changed:changes, type:'git-changes'};
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
    
    let elements = [...fileElement.getElementsByClassName(className)];
    elements.forEach(element =>{
        let classname = element.className;
        if (!classname.includes('blob-code-inner') && !className.includes('blob-code-hunk') ){
            lineObj = {};
            if (isAdd(classname)){
                lineObj.type = lineTypes.ADD;
            } else if (isDel(className)){
                lineObj.type = lineTypes.DEL;
            }
            else{
                lineObj.type = lineTypes.SAME;
            }
            lineObj.line = element.getElementsByTagName('span')[0].textContent;
            lines.push(lineObj);
        }
    })
    return lines;
}

function isAdd(classname){
    return classname.includes('blob-code-addition');
}

function isDel(classname){
    return classname.includes('blob-code-deletion');
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse){
        console.log(request);
        if (request.type === 'file'){
            let data = retrieveFileData();
            console.log(data);
            chrome.runtime.sendMessage(data);
        } else {
            console.log(request.foundFiles)
        }
        return true;
    }
)

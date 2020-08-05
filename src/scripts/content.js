const lineTypes = {ADD:'add', DEL:'delete',SAME:'same'};

let files = {};

function retrieveFileData(){
    let fileChanges = [...document.getElementsByClassName('diff-table js-diff-table')];
    let changes=[];
    let spans = []
    fileChanges.forEach(change=>{
        let temp = [];
        changes.push(retrieveChangedFileLines(change, 'blob-code', temp))  
        spans.push(temp); 
    })


    let fileInfo = [...document.getElementsByClassName('file-info')];
    let names = retrieveFileNames(fileInfo);

    while (names.length > changes.length){
        names.pop();
    }

    for(let i=0; i< names.length; i++){
        files[names[i]] = spans[i]
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

function retrieveChangedFileLines(fileElement, className,spanArr){
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
            spanArr.push(element.getElementsByTagName('span')[0]);
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

function findLines(fileChanges, searchLen, lastLineLen){
    fileChanges.forEach(fileData=>{
        let fileSpans = files[fileData.filename];
        let foundLines = fileData.lines;
        highlightLines(fileSpans, foundLines, searchLen, lastLineLen);
    })
}

function highlightLines(spans, lines, searchLen, lastLineLen){
    if (searchLen === 1){
        highlightSingleLine(spans,lines, lastLineLen);
    } else if (searchLen === 2) {
        highlightTwoLines(spans,lines, lastLineLen);
    } else {
        highlightMultipleLines(spans,lines, searchLen, lastLineLen);
    }
}

function highlightMultipleLines(spans, lines, searchLen, lineLen){
    lines.forEach(line=>{
        let foundLine = Object.keys(line)[0];
        let startingIndex = line[foundLine];

        let firstLine = spans[foundLine];
        let lastLine = spans[Number(foundLine)+searchLen-1];

        highlightSpanChildren(firstLine, startingIndex, firstLine.length-startingIndex);
        highlightSpanChildren(lastLine, 0, lineLen);
        
        for (let i = 1; i< searchLen-1; i++){
            highlightAllSpanChildren(spans[Number(foundLine)+i]);
        }
    })
}

function highlightTwoLines(spans, lines, lineLen){
    lines.forEach(line=>{
        let foundLine = Object.keys(line)[0];
        let startingIndex = line[foundLine];

        let firstLine = spans[foundLine];
        let secondLine = spans[Number(foundLine)+1];

        highlightSpanChildren(firstLine, startingIndex, firstLine.length-startingIndex);
        highlightSpanChildren(secondLine, 0, lineLen);
    })
}

function highlightSingleLine(spans,lines, lineLen){
    lines.forEach(line=>{
        let foundLine = Object.keys(line)[0];
        let startingIndex = line[foundLine];

        let linespan = spans[foundLine];
        highlightSpanChildren(linespan, startingIndex, lineLen)
    })
}

function highlightSpanChildren(span, startingIndex, lineLen){
    let starter = -1;
    let end = startingIndex + lineLen -1;
    let pastStarter = false;
    let spanClass = findSpanClass(span);
    for (let child of span.childNodes){
        starter += child.textContent.length;
        if (starter >= end){
            let endIndex = child.textContent.length - (starter-end);
            let before = child.textContent.substring(0,endIndex);
            let after = child.textContent.substring(endIndex, child.textContent.length);
            populateChildElement(child, before, after, spanClass,true);
            break;
        } else if (pastStarter) {
            populateChildElement(child, child.textContent, '', spanClass,true);
        } else if (starter > startingIndex ){
            let start = child.textContent.length - 1 - (starter-startingIndex);
            let before  = child.textContent.substring(0,start);
            let after = child.textContent.substring(start, child.textContent.length)
            populateChildElement(child, before, after, spanClass, false);
            pastStarter = true;
        }
    }
}

function populateChildElement(child, before, after, childClass, isLeading){
    if (child.innerHTML){
        if (isLeading){
            child.innerHTML =purifyInnerHTML(`<mark>${before}</mark>${after}`);
        } else {
            child.innerHTML =purifyInnerHTML(`${before}<mark>${after}</mark>`);
        }
    } else {
        let e = document.createElement('span');
        e.className = childClass;
        if (isLeading){
            e.innerHTML =purifyInnerHTML(`<mark>${before}</mark>${after}`);
        }else {
            e.innerHTML =purifyInnerHTML(`${before}<mark>${after}</mark>`);
        }
        child.replaceWith(e);
    }
}

function findSpanClass(span){
    for (let child of span.childNodes){
        if (child.innerHTML){
            return child.className;
        }
    }
}

function purifyInnerHTML(input){
    return DOMPurify.sanitize(input);
}

function highlightAllSpanChildren(span){
    let spanClass = findSpanClass(span);
    span.childNodes.forEach(child=>{
        populateChildElement(child, child.textContent,'',spanClass, true);
    })
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
            findLines(request.foundFiles, request.searchLength, request.lastLineLen);
        }
        return true;
    }
)

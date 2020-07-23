document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('button').addEventListener('click',pingContent,false);
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse){
            if (request.type === 'File results'){                
                console.log(request);
                let y = request.foundFiles;
            }
            return true;
        }
    );
    function pingContent (){
        let search = document.querySelector('textarea').value;
        chrome.runtime.sendMessage({value:search, type:"search"});

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {type: "file"}, function(response) {});  
        });
        
    }
},false);



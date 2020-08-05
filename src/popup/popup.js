document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('button').addEventListener('click',pingContent,false);
    chrome.runtime.onMessage.addListener(
        function(request, sender){
            if (request.type === 'File results'){                
                console.log(request);
                let y = request.foundFiles;
            }
        }
    );
    function pingContent (){
        let search = document.querySelector('textarea').value;
        if (search){
            if (!search.includes('\n') || search.split('\n').length<2){
                document.querySelector('textarea').value= 'Why not just use Control F?'
            } else {
                chrome.runtime.sendMessage({value:search, type:"search"});

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {type: "file"});  
                });
            }
        }
        
        
    }
},false);



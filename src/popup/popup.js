document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('button').addEventListener('click',pingContent,false);
    function pingContent (){
        let search = document.querySelector('textarea').value;
        chrome.runtime.sendMessage({value:search, type:"search"});

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {type: "file"}, function(response) {});  
        });
        
    }
},false);



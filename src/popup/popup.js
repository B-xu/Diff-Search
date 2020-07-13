document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('button').addEventListener('click',pingContent,false);
    function pingContent (){
        let search = document.querySelector('textarea').value;
        chrome.tabs.query({currentWindow:true, active: true},
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {"greeting":search});
            })
    }
},false);



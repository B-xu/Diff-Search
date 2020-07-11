
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('button').addEventListener('click',pingContent,false);
    function pingContent (){
        chrome.tabs.query({currentWindow:true, active: true},
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, 'hi');
            })
    }
},false);


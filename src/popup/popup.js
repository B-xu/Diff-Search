document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('button').addEventListener('click',pingContent,false);
    function pingContent (){
        let search = document.querySelector('textarea').value;
        chrome.runtime.sendMessage({value:search, type:"search"});
        
    }
},false);



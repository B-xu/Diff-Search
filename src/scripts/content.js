// alert('Dummy Alert');

chrome.runtime.onMessage.addListener(request=>{
    alert(request);
})
export default class Search{    
    static findSingleLine(array, searchString){
        if (searchString){
            let results = Array.from(array).reduce((a,e,i)=>{
                if (e.includes(searchString)){
                    a.push(i);
                }
                return a;
            }, [])
            return results;
        }
        return null;
        
    }

    static findTwoLines(array, searchLines){
        if (searchLines && !searchLines.includes('') && searchLines.length ===2){
            let results = [];
            let searchDuration = array.length - searchLines.length + 1;
            for (let i=0; i< searchDuration; i++){
                if (array[i].endsWith(searchLines[0]) 
                    && array[i+1].startsWith(searchLines[1])){
                        results.push(i);
                        i++;
                    }
            }
            return results;
        }
        return null;
        
    }

    static findMultipleLines(array, searchLines){
        let results = [];
        searchDuration = array.length - searchLines.length + 1;
        for (i=0; i< searchDuration; i++){
            if (this.checkInitial(array, searchLines[0], searchLines[searchLines.length-1]), i, searchLines.length){
                for (j=1; j< searchLines.length-2; j++){
                    if (array[i+1] !== searchLines[j+1]){
                        break;
                    }
                }
                results.push(i);

            }
        }
        return results;
    }

    static checkInitial(array, first, last, index, length){
        return (array[index].endsWith(first) && array[index+length-1].startsWith(last));
    }
}

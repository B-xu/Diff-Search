export default class Search{    
    static findSingleLine(array, searchString){
        if (searchString && typeof searchString === 'string' && Array.isArray(array) && this.checkArrayIsStringOnly(array)){
            let results = array.reduce((a,e,i)=>{
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
        if (Array.isArray(array) && this.checkArrayIsStringOnly(array) &&
                Array.isArray(searchLines) && this.checkArrayIsStringOnly(searchLines) && 
                !searchLines.includes('') && searchLines.length ===2){
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
        if (Array.isArray(array) && this.checkArrayIsStringOnly(array) &&
                Array.isArray(searchLines) && this.checkArrayIsStringOnly(searchLines) && 
                !searchLines.includes('') && searchLines.length >= 3){
                    let results = [];
                    let searchDuration = array.length - searchLines.length + 1;
                    for (let i=0; i< searchDuration; i++){
                        if (this.checkInitial(array, searchLines[0], searchLines[searchLines.length-1], i, searchLines.length)){
                            for (let j=1; j< searchLines.length-2; j++){
                                if (array[i+1] !== searchLines[j+1]){
                                    break;
                                }
                            }
                            results.push(i);
                            i+= searchLines.length-1;

                        }
                    }
                    return results;
        }
        return null;
        
    }

    static checkInitial(array, first, last, index, length){
        if (index+length > array.length || !first || !last){
            return false;
        }
        return (array[index].endsWith(first) && array[index+length-1].startsWith(last));
    }

    static checkArrayIsStringOnly(array){
        return array.every(i => (typeof i === "string"));
    }
}

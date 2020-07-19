const searchTypes = {ALL:'all', ADD:'add', DEL:'delete'};
const lineTypes = {ADD:'add', DEL:'delete',SAME:'same'};
import Search from './search.js';

class File{
    name = '';
    changes=[];
    addChanges=[]
    deletedChanges=[];
    unChangedLines=[];

    constructor(name, changes){
        this.name = name;
        this.changes=changes.map(change=>change.line);
        this.setAddChanges(changes);
        this.setDelChanges(changes);
        this.setSameLines(changes);
    }

    setAddChanges(changes){
        this.addChanges = changes.map(change=>this.setBooleanChanges(lineTypes.ADD,change));
    }

    setDelChanges(changes){
        this.deletedChanges = changes.map(change=>this.setBooleanChanges(lineTypes.DEL, change))
    }

    setSameLines(changes){
        this.unChangedLines = changes.map(change=>this.setBooleanChanges(lineTypes.SAME,change));
    }

    setBooleanChanges(linetype, change){
        if (change.type === linetype){
            return change.line;
        } else {
            return '';
        }
    }

    setChanges(changes){
        this.changes=changes;
    }

    searchChanges(searchLines, searchType){
        if (searchLines.length === 0){
            return null;
        }
        let searchRange =[];
        let result;
        switch(searchType){
            case searchTypes.ALL:
                searchRange = this.changes;
                break;
            case searchTypes.ADD:
                searchRange = this.addChanges;
                break;
            case searchTypes.DEL:
                searchRange = this.deletedChanges;
                break;
        }

        if (searchLines.length >= 3){
            result = Search.findMultipleLines(searchRange, searchLines);
        } else if (searchLines.length === 1){
            let searchLine = searchLines[0];
            result = Search.findSingleLine(searchRange, searchLine);
        } else {
            result = Search.findTwoLines(searchRange, searchLines);
        }
        return result;
    }

}

export {File, searchTypes};

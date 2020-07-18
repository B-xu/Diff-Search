export const searchTypes = {ALL:'all', ADD:'add', DEL:'delete'};
import Search from './search.js'
class File{
    name = '';
    changes=[];
    addChanges=[]
    deletedChanges=[];
    concat_changes;

    constructor(name, changes){
        this.name = name;
        this.changes=changes.map(change=>change.line);
        this.setAddChanges(changes);
        this.setDelChanges(changes);
    }

    setAddChanges(changes){
        this.addChanges = changes.map(change=>this.setBooleanChanges(true,change));
    }

    setDelChanges(changes){
        this.deletedChanges = changes.map(change=>this.setBooleanChanges(false, change))
    }

    setBooleanChanges(bool, change){
        if (change.isAdd === bool){
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

export default File;
const searchTypes = {ALL:'all', ADD:'add', DEL:'delete'};
const lineTypes = {ADD:'add', DEL:'delete',SAME:'same'};

class File{
    constructor(name, changes){
        this.name = name;
        this.changes=changes.map(change=>change.line);
        this.setAddChanges(changes);
        this.setDelChanges(changes);
        this.setSameLines(changes);
    }

    setAddChanges(changes){
        this.addChanges = changes.map(change=>this.setBooleanChanges(lineTypes.ADD,change));
        return this.addChanges;
    }

    setDelChanges(changes){
        this.deletedChanges = changes.map(change=>this.setBooleanChanges(lineTypes.DEL, change))
        return this.deletedChanges;
    }

    setSameLines(changes){
        this.unChangedLines = changes.map(change=>this.setBooleanChanges(lineTypes.SAME,change));
        return this.unChangedLines;
    }

    setBooleanChanges(linetype, change){
        if (change.type === linetype){
            return change.line;
        } else {
            return '';
        }
    }

    getSearchRange( searchType){
        let searchRange =[];
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
        return searchRange;
    }

}

export {File, searchTypes};

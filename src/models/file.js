class File{
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
            return '\n';
        }
    }

    setChanges(changes){
        this.changes=changes;
    }
}

export default File;
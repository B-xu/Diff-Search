class File{
    additions=[];
    deletions=[];
    concat_additions;
    concat_deletions;

    constructor(name, adds, deletes){
        this.name = name;
        this.additions=adds;
        this.deletions=deletes;
    }

    setAdditions(adds){
        this.additions=adds;
    }

    setDeletions(dels){
        this.deletions= dels;
    }
}

export default File;
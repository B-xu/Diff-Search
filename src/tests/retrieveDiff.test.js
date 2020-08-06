import RetrieveDiff from '../scripts/retrievediff.js';
import { File, searchtypes } from '../models/file.js';

let retrieveDiff = new RetrieveDiff();
describe('retrieveDiff tests',()=>{
    test('getSearchLineLength test',()=>{
        retrieveDiff.addSearchLines(['first','second','third']);
        expect(retrieveDiff.getSearchLinesLength()).toBe(3);
        expect(retrieveDiff.getSearchLines()).toEqual(['first','second','third']);
        expect(retrieveDiff.hasSearchLines()).toBe(true);
        expect(retrieveDiff.getLastSearchLineLength()).toBe(5);
    }); 

    test('getSet files',()=>{
        let file = new File('test',[]);
        retrieveDiff.setFiles([file]);
        expect(retrieveDiff.hasFiles()).toBe(true);
        expect(retrieveDiff.getFiles()[0]).toEqual(file);
    })

    test('handleSearchTerm general test',()=>{
        let value = retrieveDiff.handleSearchTerm({value:'bob\nthe\nbuilder'});

        expect(value).toEqual(['bob','the','builder']);
        expect(retrieveDiff.hasSearchLines()).toBe(true);
        expect(retrieveDiff.getSearchLinesLength()).toBe(3);
    }); 

    test('handleSearchTerm single line test',()=>{
        let value = retrieveDiff.handleSearchTerm({value:'bob'});

        expect(value).toEqual(['bob']);
        expect(retrieveDiff.hasSearchLines()).toBe(true);
        expect(retrieveDiff.getSearchLinesLength()).toBe(1);
    }); 

    test('handleSearchTerm many leading and trailing spaces',()=>{
        let value = retrieveDiff.handleSearchTerm({value:'     bob\nthe\nbuilder   '});

        expect(value).toEqual(['bob','the','builder']);
        expect(retrieveDiff.hasSearchLines()).toBe(true);
        expect(retrieveDiff.getSearchLinesLength()).toBe(3);
    }); 

    test('handleSearchTerm many trailing and leading new lines',()=>{
        let value = retrieveDiff.handleSearchTerm({value:'\n\n\nbob\nthe\nbuilder\n\n'});

        expect(value).toEqual(['bob','the','builder']);
        expect(retrieveDiff.hasSearchLines()).toBe(true);
        expect(retrieveDiff.getSearchLinesLength()).toBe(3);
    }); 

    test('handleSearchTerm all spaces',()=>{
        let value = retrieveDiff.handleSearchTerm({value:''});

        expect(value).toEqual(['']);
        expect(retrieveDiff.hasSearchLines()).toBe(true);
        expect(retrieveDiff.getSearchLinesLength()).toBe(1);
    }); 

    test('handleSearchTerm all newlines',()=>{
        let value = retrieveDiff.handleSearchTerm({value:'\n\n\n'});

        expect(value).toEqual(['']);
        expect(retrieveDiff.hasSearchLines()).toBe(true);
        expect(retrieveDiff.getSearchLinesLength()).toBe(1);
    }); 
})
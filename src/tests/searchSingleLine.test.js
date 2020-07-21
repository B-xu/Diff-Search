import Search from'../models/search.js';

describe('Single line tests',()=>{
    test('Finds single line in array of one element -- leading',() =>{
        let expected = [0];
        expect(Search.findSingleLine(['hello'],'he')).toEqual(expected);
    });

    test('Finds single line in array of one element -- trailing',() =>{
        let expected = [0];
        expect(Search.findSingleLine(['whyhell'],'he')).toEqual(expected);
    });

    test('Finds single line in array of one element -- centered',() =>{
        let expected = [0];
        expect(Search.findSingleLine(['whyhello'],'he')).toEqual(expected);
    });
    
    test('Finds single line in array of multiple elements -- centered, leading, trailing',()=>{
        let expected = [0,2,3];
        expect(Search.findSingleLine(['jhello', 'bye','helloween', 'thehe'],'he')).toEqual(expected);
    });

    test('Finds single line which occupies entire string in array of multiple elements',()=>{
        let expected = [0,1,3,4];
        expect(Search.findSingleLine(['hello', "jhello", "soon", "lehe","he"], 'he')).toEqual(expected);
    });

    //boundary cases

    test('word occurs multiple times in a line',()=>{
        let expected = [0,2];
        expect(Search.findSingleLine(['hehe','lala','thehe'], 'he')).toEqual(expected);
    });

    test('word occurs multiple times in separated by empty strings',()=>{
        let expected = [0,5];
        expect(Search.findSingleLine(['hehe','','','','','thehe'], 'he')).toEqual(expected);
    });

    test('Cannot find line in array',()=>{
        let expected = [];
        expect(Search.findSingleLine(['hello', "jhello", "soon", "lehe","he"], 'wacky')).toEqual(expected);
    });

    //exceptional cases
    test('Finds single line in empty array',()=>{
        let expected=[];
        expect(Search.findSingleLine([], 'he')).toEqual(expected);
    });

    test('Finds single line in array of empty strings',()=>{
        let expected=[];
        expect(Search.findSingleLine(["","","",""], 'he')).toEqual(expected);
    });

    test('Finds single line (empty string) in array',()=>{
        let expected=null;
        expect(Search.findSingleLine(['whos there', 'no one'], '')).toEqual(expected);
    });

    test('Finds single line with number in array',()=>{
        let expected=null;
        expect(Search.findSingleLine(['whos there', 'no one'], 2)).toEqual(expected);
    });

    test('Finds single line with object in array',()=>{
        let expected=null;
        expect(Search.findSingleLine(['whos there', 'no one'], {})).toEqual(expected);
    });

    test('Finds single line with boolean in array',()=>{
        let expected=null;
        expect(Search.findSingleLine(['whos there', 'no one'], false)).toEqual(expected);
    });

    test('Finds single line in object',()=>{
        let expected=null;
        expect(Search.findSingleLine({}, 'hello')).toEqual(expected);
    });
    

    test('Finds single line in string',()=>{
        let expected=null;
        expect(Search.findSingleLine('bye', 'hello')).toEqual(expected);
    });

    test('Finds single line in number',()=>{
        let expected=null;
        expect(Search.findSingleLine(3, 'hello')).toEqual(expected);
    });

    test('Finds single line in boolean',()=>{
        let expected=null;
        expect(Search.findSingleLine(false, 'hello')).toEqual(expected);
    });

    test('Finds single line in array of numbers',()=>{
        let expected=null;
        expect(Search.findSingleLine([1,2,3], 'hello')).toEqual(expected);
    });
});
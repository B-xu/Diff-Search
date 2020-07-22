import Search from'../models/search.js';

describe('Multi-line tests',()=>{
    //general cases

    test('Find multiple lines in small array -- all full-length',()=>{
        let expected = [0];
        expect(Search.findMultipleLines(['bob','the','builder'], ['bob','the','builder'])).toEqual(expected);
    });

    test('Find multiple lines in small array -- trailing + leading',()=>{
        let expected = [0];
        expect(Search.findMultipleLines(['bob','the','builder'], ['ob','the','build'])).toEqual(expected);
    });

    test('Find multiple lines in small array -- leading + trailing',()=>{
        let expected = [];
        expect(Search.findMultipleLines(['bob','the','builder'], ['bo','the','uilder'])).toEqual(expected);
    });

    test('Find multiple lines in small array -- trailing + full',()=>{
        let expected = [0];
        expect(Search.findMultipleLines(['bob','the','builder'], ['b','the','builder'])).toEqual(expected);
    });

    test('Find multiple lines in small array -- full + leading',()=>{
        let expected = [0];
        expect(Search.findMultipleLines(['bob','the','builder'], ['bob','the','bu'])).toEqual(expected);
    });

    test('Find multiple lines in large array -- full + full',()=>{
        let expected = [2];
        expect(Search.findMultipleLines(['love','happy','bob','the','builder'], ['bob','the','builder'])).toEqual(expected);
    });

    test('Find multiple lines in large array -- trailing + full',()=>{
        let expected = [1];
        expect(Search.findMultipleLines(['love','bob','the','builder','coy'], ['ob','the','builder'])).toEqual(expected);
    });

    test('Find multiple lines in large array -- trailing + leading',()=>{
        let expected = [1];
        expect(Search.findMultipleLines(['love','bob','the','builder','coy'], ['ob','the','bu'])).toEqual(expected);
    });

    test('Find multiple lines in large array -- full + leading',()=>{
        let expected = [1];
        expect(Search.findMultipleLines(['love','bob','the','builder','coy'], ['bob','the','builder'])).toEqual(expected);
    });

    test('Find multiple lines in large array -- multiple instances',()=>{
        let expected = [1,5];
        expect(Search.findMultipleLines(['love','bob','the','builder','iron','kebob','the','builder'], ['ob','the','builder'])).toEqual(expected);
    });

    test('Find multiple lines in large array -- multiple instances separated by empty strings',()=>{
        let expected = [1,8];
        expect(Search.findMultipleLines(['love','bob','the','builder','','','','','kebob','the','builder'], ['ob','the','builder'])).toEqual(expected);
    });

    //boundary cases

    test('Find multiple lines in large array -- multiple instances with overlap',()=>{
        let expected = [1];
        expect(Search.findMultipleLines(['love','bob','the','builderob','the','builder'], ['ob','the','builder'])).toEqual(expected);
    });

    test('Find multiple lines in array of empty strings',()=>{
        let expected = [];
        expect(Search.findMultipleLines(['','',''], ['bib','a','dog'])).toEqual(expected);
    });

    test('Find multiple lines in array of empty array',()=>{
        let expected = [];
        expect(Search.findMultipleLines([], ['bib','a','dog'])).toEqual(expected);
    });

    test('Find multiple lines in shorter array',()=>{
        let expected = [];
        expect(Search.findMultipleLines(['bib','a'], ['bib','a','dog'])).toEqual(expected);
    });

    test('Find multiple lines (1 un-matched) in longer array',()=>{
        let expected = [];
        expect(Search.findMultipleLines(['bib','app','dog'], ['bib','apple','dog'])).toEqual(expected);
    });

    test('Find multiple lines (middle line diff) in longer array',()=>{
        let expected = [];
        expect(Search.findMultipleLines(['bib','','dog'], ['bib','apple','dog'])).toEqual(expected);
    });

    //exceptional cases
    
    test('Find multiple lines (empty strings) in small array',()=>{
        let expected = [0];
        expect(Search.findMultipleLines(['bob','the','builder'], ['','',''])).toEqual(expected);
    });

    test('Find 2 lines (empty strings) in small array',()=>{
        let expected = null;
        expect(Search.findMultipleLines(['bob','the','builder'], ['',''])).toEqual(expected);
    });

    test('Find 3 lines (numbers) in small array',()=>{
        let expected = null;
        expect(Search.findMultipleLines(['bob','the','builder'], [2,3,4])).toEqual(expected);
    });

    test('Find 3 lines (booleans) in small array',()=>{
        let expected = null;
        expect(Search.findMultipleLines(['bob','the','builder'], [false, true,false])).toEqual(expected);
    });

    test('Find 3 lines (objects) in small array',()=>{
        let expected = null;
        expect(Search.findMultipleLines(['bob','the','builder'], [{},{},{}])).toEqual(expected);
    });

    test('Find multiple lines in array of numbers',()=>{
        let expected = null;
        expect(Search.findMultipleLines([2,3,4,5], ['b','a','c'])).toEqual(expected);
    });

    test('Find multiple lines in array of booleans',()=>{
        let expected = null;
        expect(Search.findMultipleLines([true,false,true, false], ['b','a','c'])).toEqual(expected);
    });

    test('Find multiple lines in array of objects',()=>{
        let expected = null;
        expect(Search.findMultipleLines([{},{},{},{}], ['b','a','c'])).toEqual(expected);
    });
});
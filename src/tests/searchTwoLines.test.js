import Search from'../models/search.js';

describe('Two line tests',()=>{
    test('Finds two lines in small array -- both full-length',()=>{
        let expected=[0];
        expect(Search.findTwoLines(['whos','there'], ['whos','there'])).toEqual(expected);
    });

    test('Finds two lines in small array -- trailing + leading',()=>{
        let expected=[0];
        expect(Search.findTwoLines(['whos','there'], ['os','the'])).toEqual(expected);
    });

    test('Finds two lines in small array -- full + leading',()=>{
        let expected=[0];
        expect(Search.findTwoLines(['whos','there'], ['whos','the'])).toEqual(expected);
    });

    test('Finds two lines in small array -- trailing + full',()=>{
        let expected=[0];
        expect(Search.findTwoLines(['whos','there'], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in larger array -- standard (trailing+leading)',()=>{
        let expected=[0,3];
        expect(Search.findTwoLines(['whos','there', "so", 'los','therew'], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in larger array -- standard (full+leading)',()=>{
        let expected=[0,3];
        expect(Search.findTwoLines(['whos','there', "so", 'os','therew'], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in larger array -- standard (trailing+full)',()=>{
        let expected=[0,3];
        expect(Search.findTwoLines(['whos','there', "so", 'los','there'], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in larger array -- standard (full+full)',()=>{
        let expected=[0,3];
        expect(Search.findTwoLines(['whos','there', "so", 'os','there'], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in larger array with multiple occurences',()=>{
        let expected=[0,2];
        expect(Search.findTwoLines(['whos','there', 'sos', "thereby"], ['os','there'])).toEqual(expected);
    });

    test('Find multiple lines in large array -- multiple instances separated by empty strings',()=>{
        let expected = [2,9];
        expect(Search.findTwoLines(['love','bob','the','builder','','','','','kebob','sthe','builder'], ['the','builder'])).toEqual(expected);
    });

    //boundary cases

    test('Cannot find two lines in array',()=>{
        let expected=[];
        expect(Search.findTwoLines(['whos','there', 'sos', "thereby"], ['los','there'])).toEqual(expected);
    });

    test('Finds two lines in larger array with overlap',()=>{
        let expected=[0];
        expect(Search.findTwoLines(['whos','thereos', "theres"], ['os','there'])).toEqual(expected);
    });

    //exceptional cases
    test('Finds two lines in empty array',()=>{
        let expected=[];
        expect(Search.findTwoLines([], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in array of empty strings',()=>{
        let expected=[];
        expect(Search.findTwoLines(['','','',''], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in array with empty input search',()=>{
        let expected=null;
        expect(Search.findTwoLines(['whos','there', 'sos', "thereby"], ['os',''])).toEqual(expected);
    });

    test('Finds two lines in array with too large input',()=>{
        let expected=null;
        expect(Search.findTwoLines(['whos','there', 'sos', "thereby"], ['os','f','g'])).toEqual(expected);
    });

    test('Finds two lines in array with too small input',()=>{
        let expected=null;
        expect(Search.findTwoLines(['whos','there', 'sos', "thereby"], ['os'])).toEqual(expected);
    });

    test('Finds two lines with number in array',()=>{
        let expected=null;
        expect(Search.findTwoLines(['whos there', 'no one'], 2)).toEqual(expected);
    });

    test('Finds two lines with object in array',()=>{
        let expected=null;
        expect(Search.findTwoLines(['whos there', 'no one'], {})).toEqual(expected);
    });

    test('Finds two lines with boolean in array',()=>{
        let expected=null;
        expect(Search.findTwoLines(['whos there', 'no one'], false)).toEqual(expected);
    });

    test('Finds two lines in object',()=>{
        let expected=null;
        expect(Search.findTwoLines({}, ['hello','bye'])).toEqual(expected);
    });    

    test('Finds two lines in string',()=>{
        let expected=null;
        expect(Search.findTwoLines('bye', ['hello','bye'])).toEqual(expected);
    });

    test('Finds two lines in number',()=>{
        let expected=null;
        expect(Search.findTwoLines(3, ['hello','bye'])).toEqual(expected);
    });

    test('Finds two lines in boolean',()=>{
        let expected=null;
        expect(Search.findTwoLines(false, ['hello','bye'])).toEqual(expected);
    });

    test('Finds two lines in array of numbers',()=>{
        let expected=null;
        expect(Search.findTwoLines([1,2,3], ['hello','bye'])).toEqual(expected);
    });
    
});
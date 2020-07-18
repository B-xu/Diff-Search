const Search = require('../models/search.js');

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

    //exceptional cases
    test('Finds single line in empty array',()=>{
        let expected=[];
        expect(Search.findSingleLine([], 'he')).toEqual(expected);
    });

    test('Finds single line (empty string) in array',()=>{
        let expected=null;
        expect(Search.findSingleLine(['whos there', 'no one'], '')).toEqual(expected);
    });
});

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

    test('Finds two lines in larger array with overlap',()=>{
        let expected=[0];
        expect(Search.findTwoLines(['whos','thereos', "theres"], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in larger array with multiple occurences',()=>{
        let expected=[0,2];
        expect(Search.findTwoLines(['whos','there', 'sos', "thereby"], ['os','there'])).toEqual(expected);
    });

    //exceptional cases
    test('Finds two lines in empty array',()=>{
        let expected=[];
        expect(Search.findTwoLines([], ['os','there'])).toEqual(expected);
    });

    test('Finds two lines in array with empty input',()=>{
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
    
});

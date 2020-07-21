import Search from'../models/search.js';

describe('Check initial tests',()=>{
    test('Basic case',()=>{
        let expected = true;
        expect(Search.checkInitial(['bob','the','builder'],'ob', 'build', 0, 3)).toBe(expected);
    });

    test('Result near end',()=>{
        let expected = true;
        expect(Search.checkInitial(['ob','the','sob','garbage','builder'],'ob', 'build', 2, 3)).toBe(expected);
    });
    

    test('Result in middle',()=>{
        let expected = true;
        expect(Search.checkInitial(['ob','the','sob','garbage','builder'],'ob', 'build', 2, 3)).toBe(expected);
    });

    test('Wrong index',()=>{
        let expected = false;
        expect(Search.checkInitial(['ob','the','sob','garbage','builder'],'ob', 'build', 0, 3)).toBe(expected);
    });
    

    //exceptional cases
    test('Length too long',()=>{
        let expected = false;
        expect(Search.checkInitial(['bob','the','builder'],'ob', 'build', 0, 4)).toBe(expected);
    });
    

    test('Empty first string',()=>{
        let expected = false;
        expect(Search.checkInitial(['bob','the','builder'],'', 'build', 0, 4)).toBe(expected);
    });

    test('Empty last string',()=>{
        let expected = false;
        expect(Search.checkInitial(['bob','the','builder'],'b', '', 0, 4)).toBe(expected);
    });

    test('Both strings empty',()=>{
        let expected = false;
        expect(Search.checkInitial(['bob','the','builder'],'', '', 0, 4)).toBe(expected);
    });
});

describe('Check is string only array',()=>{
    test('Array of strings',()=>{
        let expected = true;
        expect(Search.checkArrayIsStringOnly(['bob', 'the', 'builder'])).toBe(expected);
    });

    test('Array of integers',()=>{
        let expected = false;
        expect(Search.checkArrayIsStringOnly([2,3,4])).toBe(expected);
    });

    test('Array of objects',()=>{
        let expected = false;
        expect(Search.checkArrayIsStringOnly([{}, {}, {}])).toBe(expected);
    });

    test('Array of booleans',()=>{
        let expected = false;
        expect(Search.checkArrayIsStringOnly([false, true, false])).toBe(expected);
    });
})
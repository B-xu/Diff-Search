const Search = require('../models/search.js');

test('Finds single line in array of one element',() =>{
    let expected = [ 0 ];
    expect(Search.findSingleLine(['hello'],'hell')).toEqual(expected);
})

test('Finds single line in array of multiple elements',()=>{
    let expected = [ 0 , 2];
    expect(Search.findSingleLine(['hello', 'bye','helloween'],'hell')).toEqual(expected);
})
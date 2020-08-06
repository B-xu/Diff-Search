import {File,searchTypes} from '../models/file.js';
const lineTypes = {ADD:'add', DEL:'delete',SAME:'same'};

let file = new File('testing',[]);

describe('setBooleanChanges tests',()=>{
    test('Set changes add --add type',()=>{
        let value = file.setBooleanChanges(lineTypes.ADD, {line:'hello',type:'add'});
        expect(value).toBe('hello');
    });

    test('Set changes add --del type',()=>{
        let value = file.setBooleanChanges(lineTypes.ADD, {line:'hello',type:'delete'});
        expect(value).toBe('');
    });

    test('Set changes add --same type',()=>{
        let value = file.setBooleanChanges(lineTypes.ADD, {line:'hello',type:'same'});
        expect(value).toBe('');
    });

    test('Set changes del --del type',()=>{
        let value = file.setBooleanChanges(lineTypes.DEL, {line:'hello',type:'delete'});
        expect(value).toBe('hello');
    });

    test('Set changes del --add type',()=>{
        let value = file.setBooleanChanges(lineTypes.DEL, {line:'hello',type:'add'});
        expect(value).toBe('');
    });

    test('Set changes del --same type',()=>{
        let value = file.setBooleanChanges(lineTypes.DEL, {line:'hello',type:'same'});
        expect(value).toBe('');
    });

    test('Set changes same --same type',()=>{
        let value = file.setBooleanChanges(lineTypes.SAME, {line:'hello',type:'same'});
        expect(value).toBe('hello');
    });

    test('Set changes same --add type',()=>{
        let value = file.setBooleanChanges(lineTypes.SAME, {line:'hello',type:'add'});
        expect(value).toBe('');
    });

    test('Set changes same --del type',()=>{
        let value = file.setBooleanChanges(lineTypes.SAME, {line:'hello',type:'delete'});
        expect(value).toBe('');
    });
});

describe('setChanges (add,same, del) tests',()=>{
    test('setAddChanges test',()=>{
        let value = file.setAddChanges([{line:'hello',type:'delete'},
                                        {line:'bye',type:'add'},
                                        {line:'soon',type:'same'}]);
        let expected = ['','bye',''];
        expect(value).toEqual(expected);
        expect(file.addChanges).toEqual(expected);
    });

    test('setDelChanges test',()=>{
        let value = file.setDelChanges([{line:'hello',type:'delete'},
                                        {line:'bye',type:'add'},
                                        {line:'soon',type:'same'}]);
        let expected = ['hello','',''];
        expect(value).toEqual(expected);
        expect(file.deletedChanges).toEqual(expected);
    });

    test('setSameLines test',()=>{
        let value = file.setSameLines([{line:'hello',type:'delete'},
                                        {line:'bye',type:'add'},
                                        {line:'soon',type:'same'}]);
        let expected = ['','','soon'];
        expect(value).toEqual(expected);
        expect(file.unChangedLines).toEqual(expected);
    });
});

describe('getSearchRange tests',()=>{
    let testFile = new File('testFile',[{line:'hello',type:'delete'},
                                        {line:'bye',type:'add'},
                                        {line:'soon',type:'same'}]);
    test('getSearchRange ADD',()=>{
        let value = testFile.getSearchRange(searchTypes.ADD);
        expect(value).toEqual(['','bye','']);
    });

    test('getSearchRange ALL',()=>{
        let value = testFile.getSearchRange(searchTypes.ALL);
        expect(value).toEqual(['hello','bye','soon']);
    });

    test('getSearchRange DEL',()=>{
        let value = testFile.getSearchRange(searchTypes.DEL);
        expect(value).toEqual(['hello','','']);
    });

})
import {handleGitChanges, handleSearchTerm, validateAndSearch} from '../background/background.js';
import File from '../models/file.js';


beforeEach(()=>{
    
    
})
describe('handleGitChanges tests all add',()=>{
    test('Basic test',()=>{
        global.chrome = {
            runtime: {
              onMessage: {
                addListener:true
              }
          }
        };
        let expected = [{name:'bob', addChanges:['hello','world'], 
                deletedChanges:[], unChangedLines:[], changes:['hello','world']}];
        expect(handleGitChanges({names:['bob'], changed:[
                                [{type:'add', line:'hello'},
                                 {type:'add', line:'world'}] ]})).toEqual(expected);
    })
});
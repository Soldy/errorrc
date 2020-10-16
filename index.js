'use strict';
const ic = new (require('interactiveConsole')).console();


const errorBase = function(){
    /*
     * @param {object}
     * @private
     */
    let debug = function(debugIn){
        ic.printLn('====');
        let lines = debugIn.stack.split('\n');
        let first = lines[0].split(':');
        ic.printLn(
            ic.style(
                first[0],
                {
                    color: 'yellow'
                }
            )+' : '+
            first[1]
        );
        let tree = '┣━ ';
        if (setup.get('debugPrint') === 'short'){
            let pieces = lines[1].split(':');
            tree = '┗━ ';
            ic.printLn(
                pieces[0]
                    .replace('   at ', tree)
                    .replace(process.cwd()+'/', ' ')+' | '+
                ic.style(
                    parseInt(pieces[1]).toString(),
                    {
                        color : 'cyan'
                    }
                )+':'+
                ic.style(
                    parseInt(pieces[2]).toString(),
                    {
                        color : 'cyan'
                    }
                )+' )'
            );
        }else 
            for(let i = 1; lines.length > i ; i++){
                let pieces = lines[i].split(':');
                if(i === lines.length-1)
                    tree = '┗━ ';
                ic.printLn(
                    pieces[0]
                        .replace('   at ', tree)
                        .replace(process.cwd()+'/', ' ')+' | '+
                    ic.style(
                        parseInt(pieces[1]).toString(),
                        {
                            color : 'cyan'
                        }
                    )+':'+
                    ic.style(
                        parseInt(pieces[2]).toString(),
                        {
                            color : 'cyan'
                        }
                    )+' )'
                );
            }
    };
};

exports.errorBase=errorBase;

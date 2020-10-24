'use strict';
const ic = new (require('interactiveConsole')).console();


const errorBase = function(){

    let cross = '┣━ ';
    let last  = '┗━ ';

    /*
     * @param {object}
     * @private
     */
    let formaterOne = function(input. separator){
        return (
                input[0]
                    .replace('   at ', separator)
                    .replace(process.cwd()+'/', ' ')+' | '+
                ic.style(
                    parseInt(input[1]).toString(),
                    {
                        color : 'cyan'
                    }
                )+':'+
                ic.style(
                    parseInt(input[2]).toString(),
                    {
                        color : 'cyan'
                    }
                )+' ) \n'
        );
    }
    let formater = function(debugIn){
        let out = '';
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
        if (setup.get('debugPrint') === 'short'){
            out += formaterOne(
                lines[1].split(':')
                last
            );
        }else
            for(let i = 1; lines.length > i ; i++)
                if(i === lines.length-1)
                    out += formaterOne(
                        lines[i].split(':')
                        last
                    );
                else
                    formaterOne(
                        lines[i].split(':')
                        cross
                    );
    };
};

exports.errorBase=errorBase;

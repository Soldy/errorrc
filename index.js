'use strict';
const ic = new (require('interactiveConsole')).console();


const errorBase = function(){
    /*
     * @public
     * @return {string}
     */
    this.all = function(){
        let out = '';
        for(let i = 0; db.length > i  ; i++ )
            out += formater(
                db[i]
            );
        return out;
    };
    /*
     * @public
     * @return {boolean}
     */
    this.check = function(){
        return check();
    };
    /*
     * @param {integer} number 
     * @public
     * @return {string}
     *
     */
    this.get = function(number){
        return formater(
            db[number]
        );
    };
    /*
     * @public
     * @return {string}
     *
     */
    this.first = function(){
        return formater(
            db[0]
        );
    };
    /*
     * @public
     * @return {string}
     *
     */
    this.last = function(){
        return formater(
            db[db.length-1]
        );
    };
    /*
     * @param {object}
     * @public
     * @return {integer}
     */
    this.add = function(ie){
        db.push(e);
        return db.length-1;
    };
    /*
     * @private
     * @var {array}
     */
    let db    = [];
    /*
     * @private
     * @var {string}
     */
    let cross = '┣━ ';
    /*
     * @private
     * @var {string}
     */
    let last  = '┗━ ';
    /*
     * @private
     * @return {boolean}
     *
     */
    const check = function(){
        if(1>db.length)
            return false;
        return true;
    };
    /*
     * @param {object}
     * @private
     * @return {string}
     *
     */
    const formaterOne = function(input, separator){
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
    };
    /*
     * @param {object}
     * @private
     * @return {string}
     *
     */
    const formater = function(debugIn){
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
                lines[1].split(':'),
                last
            );
        }else
            for(let i = 1; lines.length > i ; i++)
                if(i === lines.length-1)
                    out += formaterOne(
                        lines[i].split(':'),
                        last
                    );
                else
                    formaterOne(
                        lines[i].split(':'),
                        cross
                    );
    };
};

exports.errorBase=errorBase;

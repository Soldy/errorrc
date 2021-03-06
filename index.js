/*
 *  @Soldy\errorc\2021.02.04\GPL3
 */
'use strict';
const $styler = new (require('consolestylerc')).base();
const $setupBase = (require('setuprc')).base;



/*
 * @param {setuprc} settings 
 * @prototype
 */
const errorBase = function(settings){
    /*
     * @public
     * @return {string}
     */
    this.all = function(){
        let out = '';
        for(let i of _db)
            out += _formater(i);
        return out;
    };
    /*
     * @public
     * @return {boolean}
     */
    this.check = function(){
        return _check();
    };
    /*
     * @param {integer} number 
     * @public
     * @return {string}
     *
     */
    this.get = function(number){
        return _formater(
            _db[number]
        );
    };
    /*
     * @public
     * @return {string}
     *
     */
    this.first = function(){
        return _formater(
            _db[0]
        );
    };
    /*
     * @public
     * @return {string}
     *
     */
    this.last = function(){
        return _formater(
            _db[_db.length-1]
        );
    };
    /*
     * @param {object}
     * @public
     * @return {integer}
     */
    this.add = function(e){
        _db.push(e);
        return _db.length-1;
    };
    /*
     * @private
     * @var {array}
     */
    let _db    = [];
    /*
     * @private
     * @var {string}
     */
    let _cross = '┣━ ';
    /*
     * @private
     * @var {string}
     */
    let _last  = '┗━ ';
    /*
     * @private
     * @return {boolean}
     *
     */
    const _check = function(){
        if(1>_db.length)
            return false;
        return true;
    };
    /*
     * @param {object}
     * @private
     * @return {string}
     *
     */
    const _formaterOne = function(input, separator){
        return (
            input[0]
                .replace('   at ', separator)
                .replace(process.cwd()+'/', ' ')+' | '+
                $styler.style(
                    parseInt(input[1]).toString(),
                    {
                        color : 'cyan'
                    }
                )+':'+
                $styler.style(
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
    const _formater = function(debugIn){
        let out = '';
        let lines = debugIn.stack.split('\n');
        let first = lines[0].split(':');
        out += (
            $styler.style(
                first[0],
                {
                    color: 'yellow'
                }
            )+' : '+
            first[1]
        );
        if (_setup.get('debugPrint') === 'short'){
            out += _formaterOne(
                lines[1].split(':'),
                _last
            );
        }else
            for(let i in lines)
                if(i === lines.length-1)
                    out += _formaterOne(
                        lines[i].split(':'),
                        _last
                    );
                else
                    out += _formaterOne(
                        lines[i].split(':'),
                        _cross
                    );
        return out;
    };
    /*
     * setup  helper
     * @private
     */
    let _setup = new $setupBase({
        'debugPrint':{
            'type'    : 'select',
            'list'    : [
                'normal',
                'short'
            ],
            'default' : 'normal'
        }
    });
    /*
     * setup init 
     */
    if(typeof settings !== 'undefined')
        _setup.setup(settings);
};

exports.base = errorBase;

/*
 *  @Soldy\errorc\2021.02.04\GPL3
 */
'use strict';
const $styler = new (require('consolestylerc')).base();
const $stdio = new (require('consolestdiorc')).base();
const $setuprc = (require('setuprc')).base;



/*
 * @param {setuprc} settings 
 * @prototype
 */
const errorBase = function(setup_in){
    /*
     * @public
     * @return {string}
     */
    this.classAll = function(class_){
        let out = '';
        for(let i of _classes[class_])
            out += _formater(
                _db[i].error,
                _db[i].comment
            );
        return out;
    };
    /*
     * @public
     * @return {string}
     */
    this.all = function(){
        let out = '';
        for(let i of _db)
            out += _formater(i.error, i.comment);
        return out;
    };
    /*
     * @param {integer} number 
     * @public
     * @return {string}
     *
     */
    this.get = function(number){
        return _formater(
            _db[number].error,
            _db[number].comment
        );
    };
    /*
     * @public
     * @return {string}
     *
     */
    this.first = function(){
        return _formater(
            _db[0].error,
            _db[0].comment
        );
    };
    /*
     * @public
     * @return {string}
     *
     */
    this.last = function(){
        const index = (_db.length-1);
        return _formater(
            _db[index].error,
            _db[index].comment
        );
    };
    /*
     * @param {object}
     * @public
     * @return {integer}
     */
    this.add = function(error_, comment_, class_){
        let container = {
            'error':error_
        };
        let index = _db.length.toString();
        if(typeof class_ === 'string'){
            _classAdd(
                class_,
                index
            );
            container['class'] = index;
        }
        if(typeof comment_ === 'string')
            container.comment = comment_;
        _db.push(container);
        return _db.length-1;
    };
    /*
     * @public
     * @return {boolean}
     */
    this.check = function(){
        return _check();
    };
    /*
     * @public
     * @return {boolean}
     */
    this.classCheck = function(name_){
        return _classCheck(name_);
    };
    /*
     * @param {object}
     * @public
     */
    this.print = function(error, comment){
        $stdio.printLn(
            _formater(error, comment)
        );
    };
    /*
     * @param {object}
     * @public
     */
    this.format = function(error, comment){
        return _formater(error, comment);
    };
    /*
     * @param {object}
     * @public
     */
    this.setup = function(setup_in){
        return _setup.setup(setup_in);
    };

    const _setup = new $setuprc({
        'format':{
            'type'    : 'select',
            'list'    : [
                'normal',
                'long',
                'short'
            ],
            'default' : 'long'
        },
        'header':{
            'type'    : 'string',
            'default' : ''
        }
    });
    /*
     * @private
     * @var {array}
     */
    let _db    = [];
    /*
     * @private
     * @var {array}
     */
    let _classes  = {};
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
     * @param {string}
     * @private
     * @return {boolean}
     *
     */
    const _classCheck = function(name_){
        if(
            (typeof name_ === 'undefined')||
            (typeof _classes[name_] === 'undefined')||
            (1>_classes[name_].length)
        )
            return false;
        return true;
    };
    /*
     * @private
     * @return {boolean}
     *
     */
    const _classAdd = function(class_, index_){
        const name = class_.toString();
        if (typeof _classes[name] === 'undefined')
            _classes[name] = [];
        _classes[name].push(index_);
    };
    const _classRemoveFrom = function(index_){
        if(typeof _db[index_]['class'] !== 'string')
            return false;
        const class_name =  _db[index_]['class'];
        const class_index =  _class[class_name].indexOf(
            index_
        )
        _classes[class_name].splice(
            class_index,
            1
        );
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
     * @param {object}
     * @private
     * @return {string}
     *
     */
    const _formater = function(debug_in, comment){
        let out = '';
        let lines = debug_in.stack.split('\n');
        let first = lines[0].split(':');
        lines.splice(0,1);
        if (_setup.get('header') !== '')
            out += (
                '\n '+
                _setup.get('header')+
                '\n'
            );
        out += (
            $styler.style(
                first[0],
                {
                    color: 'yellow'
                }
            )+' : '+
            first[1]
        );

        if (_setup.get('format') === 'short')
            out += _formaterOne(
                lines[0].split(':'),
                '- '
            );
        else{
            out += '\n';
            for(let i in lines)
                if(parseInt(i) === lines.length-1)
                    out += _formaterOne(
                        lines[i].split(':'),
                        _last
                    );
                else
                    out += _formaterOne(
                        lines[i].split(':'),
                        _cross
                    );
        }
        if (
             (typeof comment === 'string')&&
             (comment !== '')
        )
            out += (
                '\n Comment: \n  '+
                comment+
                '\n'
            );
        return out;
    };
    // init
    if(typeof setup_in !== 'undefined')
        _setup.setup(setup_in);
};

exports.base = errorBase;

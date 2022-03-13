const setupBase = (require('setuprc')).base;


const setupTest = new setupBase({
        'debug_print':{
            'type'    : 'select',
            'list'    : [
                'normal',
                'long',
                'short'
            ],
            'default' : 'long'
        },
        'progress_bar':{
            'type'    : 'bool',
            'default' : true
        },
        'exit_code_fail':{
            'type'    : 'bool',
            'default' : true
        },
        'exit_code_error':{
            'type'    : 'bool',
            'default' : true
        },
        'exit_code_missing':{
            'type'    : 'bool',
            'default' : true
        },
        'serialize':{
            'type'    : 'bool',
            'default' : false
        }
});


const errorrc = new (require('./index.js')).base(
    setupTest
);


errorrc.print(
    Error('test error')
);


setupTest.set('debug_print', 'short');

errorrc.print(
    Error('short test error')
);




const errorrc = new (require('./index.js')).base({
    'format':'long'
});

console.log(
    errorrc.format(
        Error('short test error just format with comment'),
        'just comment'
    )
);


errorrc.setup({
    'format': 'short'
});

console.log(
    errorrc.format(
        Error('short test error just format')
    )
);


console.log(
    errorrc.format(
        Error('short test error just format with comment'),
        'just comment'
    )
);



console.log(
    errorrc.check()
);

errorrc.add(
    Error('First'),
    'comment'
);
errorrc.add(
    Error('Second')
);
errorrc.add(
    Error('Third')
);

console.log(
    errorrc.check()
);

console.log(
    errorrc.first()
);

console.log(
    errorrc.last()
);

console.log(
    errorrc.all()
);

console.log(
    errorrc.classCheck('a')
);

errorrc.add(
    Error('A class First'),
    'comment',
    'a'
);
errorrc.add(
    Error('A class Second'),
    '',
    'a'
);
errorrc.add(
    Error('A class Third'),
    '',
    'a'
);

console.log(
    errorrc.classAll('a')
);
console.log(
    errorrc.classCheck('a')
);

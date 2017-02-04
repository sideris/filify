# filify

###What
Filify accepts a js file and creates more js files as denoted in comments. Cool for running tutorials

### How
To install either `yarn add global filify` or `npm install -g filify`

Your file should separate each "file" by adding a new comment line with the js filename

e.g.

```javascript 1.6
// file1.js
export default let a = 1

// file2.js
import a from '.file1.js'
console.log(a)
```

This will generate a directory `filify` with two files;  `file1.js` and `file2.js`
with the corresponding code

### Why

    ¯\_(ツ)_/¯
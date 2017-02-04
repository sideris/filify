#! /usr/bin/env node
const cmd   = require('commander')
const fs    = require('fs-extra')
const path  = require('path')
const CURRENT_PATH = path.resolve()
const RESULT_PATH  = path.join(CURRENT_PATH, 'filified')

cmd
    .arguments('<file>')
    .action(file => {
        let jsFiles = {}
        file = path.join(CURRENT_PATH, path.normalize(file))
        if( !fs.existsSync(file) )
            throw Error(`${file} not found`)

        fs.readFile(file, 'utf8', (e, content) => {
            let lines = content.split('\n')
            let currFile;

            for (let line of lines) {
                if( line.startsWith('//') && line.includes('.js') ) {
                    currFile = line.replace(' ', '').replace('//', '').replace('.js', '')
                    jsFiles[currFile] = ""
                } else {
                    if(jsFiles[currFile] != undefined)
                    jsFiles[currFile] += line + '\n'
                }
            }
            if (fs.existsSync(RESULT_PATH)) fs.emptyDirSync(RESULT_PATH)
            else                            fs.mkdirsSync(RESULT_PATH)
            for (let js in jsFiles) {
                fs.writeFile(path.join(RESULT_PATH, `${js}.js`), jsFiles[js], function(e) {
                    if(e) return console.error(e);
                    console.log(`${js}.js created`);
                });

            }
        })
    })
    .parse(process.argv)
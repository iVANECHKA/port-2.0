import fs from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const exec=promisify(execFile);
await fs.mkdir('public/assets/figma',{recursive:true});
const list=JSON.parse(await fs.readFile('design/assets.json','utf8'));
let index=0;
await Promise.all(Array.from({length:5},async()=>{while(index<list.length){const {url,file}=list[index++];const dest='public/assets/figma/'+file;try{if((await fs.stat(dest)).size)continue;}catch{}await exec('curl',['-fsSL','--retry','2',url,'-o',dest]);console.log(file);}}));

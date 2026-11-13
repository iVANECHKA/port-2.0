import {copyFile, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const output=fileURLToPath(new URL('../dist/client/',import.meta.url));
// Pages serves real directories; each case must also work on direct visits.
for(const route of ['domclick','capital','gedo']){
 const directory=path.join(output,route);
 await mkdir(directory,{recursive:true});
 await copyFile(path.join(output,'index.html'),path.join(directory,'index.html'));
}
await writeFile(path.join(output,'.nojekyll'),'');
console.log('Prepared GitHub Pages: home and three directly accessible case routes.');

import sharp from 'sharp';
import fs from 'node:fs/promises';
for(const key of process.argv.slice(2)){
 const left=await sharp(`qa/${key}-reference.png`).resize({width:600}).png().toBuffer();
 const right=await sharp(`qa/${key}-desktop.png`).resize({width:600}).png().toBuffer();
 const lm=await sharp(left).metadata(),rm=await sharp(right).metadata();
 await sharp({create:{width:1220,height:Math.max(lm.height,rm.height),channels:3,background:'#e5e8ed'}}).composite([{input:left,left:0,top:0},{input:right,left:620,top:0}]).png().toFile(`qa/${key}-comparison.png`);
 console.log(key,lm.width,lm.height,rm.width,rm.height);
}

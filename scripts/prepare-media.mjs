import fs from 'node:fs/promises';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import sharp from 'sharp';
const exec=promisify(execFile), root=path.resolve(import.meta.dirname,'..'), source=path.resolve(root,'..');
const ffmpeg=path.join(root,'node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg');
await fs.mkdir(path.join(root,'public/assets/video'),{recursive:true});
const videos={dock:'main-page/video/шот №1.mp4',domclick:'main-page/video/Домклик превью.mp4',sber:'main-page/video/Студия.mp4',gedo:'main-page/video/gedo_pr.mp4',income:'domclik/video/карта доходов.mp4',payment:'domclik/video/анимация оплаты.mp4',onboard:'cap/video/onboard.mov',screener:'cap/video/screener.mov'};
const metrics=[];
const originalVideos=new Set(['domclick','sber','gedo','income','payment']);
for(const [key,file] of Object.entries(videos)){
 const input=path.join(source,file), out=path.join(root,'public/assets/video',key+'.mp4'), poster=out.replace('.mp4','.webp');
 // Preserve the owner's requested originals without transcoding or resizing.
 if(originalVideos.has(key))await fs.copyFile(input,out);
 try{await fs.access(out);}catch{
 await exec(ffmpeg,['-hide_banner','-loglevel','error','-y','-i',input,'-an','-vf',`scale='min(${key==='dock'?720:1600},iw)':-2`,'-r','30','-c:v','libx264','-preset','fast','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',out],{maxBuffer:2e6});
 }
 let hasPoster=false;try{await fs.access(poster);hasPoster=true}catch{}
 if(originalVideos.has(key)||!hasPoster){const png=out+'.png';await exec(ffmpeg,['-hide_banner','-loglevel','error','-y','-i',out,'-frames:v','1',png]);await sharp(png).webp(originalVideos.has(key)?{lossless:true}:{quality:86}).toFile(poster);await fs.unlink(png);}
 metrics.push({file,optimized:'video/'+key+'.mp4',originalBytes:(await fs.stat(input)).size,optimizedBytes:(await fs.stat(out)).size});console.log('video',key);
}
const figma=path.join(root,'public/assets/figma');
for(const file of await fs.readdir(figma))if(file.endsWith('.png')){
 const out=path.join(figma,file.replace('.png','.webp'));
 await sharp(path.join(figma,file)).resize({width:2560,withoutEnlargement:true}).webp({quality:88,alphaQuality:100}).toFile(out);
 metrics.push({file:'figma/'+file,optimized:'figma/'+path.basename(out),originalBytes:(await fs.stat(path.join(figma,file))).size,optimizedBytes:(await fs.stat(out)).size});
}
await fs.writeFile(path.join(root,'design','media-report.json'),JSON.stringify(metrics,null,2));
console.log('media ready',metrics.length);

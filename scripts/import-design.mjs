import fs from 'node:fs/promises';
import path from 'node:path';
import {parse} from '@babel/parser';

// Converts Figma's layout utilities into ordinary, scoped CSS. No Tailwind runtime.
const root=path.resolve(import.meta.dirname,'..');
const css=new Map(), assets=[];
const unit=s=>s.replace(/%([+-])/g,'% $1 ').replace(/(-?\d*\.?\d+)px/g,(_,n)=>Number(n)===0?'0px':`calc(var(--u) * ${n})`).replace(/_/g,' ');
function declaration(c){
 const simple={absolute:'position:absolute',relative:'position:relative',sticky:'position:sticky',flex:'display:flex',block:'display:block',contents:'display:contents','flex-col':'flex-direction:column','flex-none':'flex:none','shrink-0':'flex-shrink:0','content-stretch':'align-content:stretch','items-center':'align-items:center','items-start':'align-items:flex-start','items-end':'align-items:flex-end','justify-between':'justify-content:space-between','justify-center':'justify-content:center','justify-end':'justify-content:flex-end','w-full':'width:100%','h-0':'height:0','size-full':'width:100%;height:100%','min-w-full':'min-width:100%','min-w-px':'min-width:0','max-w-none':'max-width:none','overflow-clip':'overflow:clip','overflow-hidden':'overflow:hidden','pointer-events-none':'pointer-events:none','object-cover':'object-fit:cover','font-medium':'font-weight:500','font-normal':'font-weight:400','bg-white':'background:#fff','text-white':'color:#fff','whitespace-nowrap':'white-space:nowrap','whitespace-pre-wrap':'white-space:pre-wrap','text-balance':'text-wrap:balance','text-pretty':'text-wrap:pretty','text-right':'text-align:right','text-center':'text-align:center','text-ellipsis':'text-overflow:ellipsis','border-solid':'border-style:solid','border-t':'border-top-width:1px','underline':'text-decoration-line:underline','decoration-solid':'text-decoration-style:solid','decoration-from-font':'text-decoration-thickness:from-font','cursor-pointer':'cursor:pointer','mb-0':'margin-bottom:0','mask-alpha':'mask-mode:alpha','mask-intersect':'mask-composite:intersect','mask-no-clip':'mask-clip:no-clip','mask-no-repeat':'mask-repeat:no-repeat','mix-blend-multiply':'mix-blend-mode:multiply','mix-blend-screen':'mix-blend-mode:screen','-translate-x-1/2':'--tx:-50%;translate:var(--tx,0) var(--ty,0)','-translate-y-1/2':'--ty:-50%;translate:var(--tx,0) var(--ty,0)','-scale-y-100':'scale:1 -1'};
 if(simple[c])return simple[c];
 if(c.startsWith('font-['))return 'font-family:Onest,sans-serif';
 if(/^opacity-\d+$/.test(c))return `opacity:${Number(c.split('-')[1])/100}`;
 if(c==='left-1/2'||c==='top-1/2')return c.startsWith('left')?'left:50%':'top:50%';
 if(/^(left|top|bottom|inset)-0$/.test(c))return c.split('-')[0]+':0';
 if(c.startsWith('['))return c.slice(1,-1);
 const match=c.match(/^([\w-]+)-\[(.*)\]$/);if(!match)throw Error('Unknown utility '+c);
 const [,key,raw]=match;const v=unit(raw);
 const props={w:'width',h:'height',gap:'gap',leading:'line-height',left:'left',top:'top',bottom:'bottom',inset:'inset',rounded:'border-radius','rounded-bl':'border-bottom-left-radius','rounded-br':'border-bottom-right-radius','rounded-tl':'border-top-left-radius','rounded-tr':'border-top-right-radius',bg:'background',border:'border-color',shadow:'box-shadow',flex:'flex','mask-position':'mask-position','mask-size':'mask-size'};
 if(key==='size')return `width:${v};height:${v}`;
 if(key==='text')return /^(#|rgb)/.test(v)?`color:${v}`:`font-size:${v}`;
 if(key==='blur')return `filter:blur(${v})`;
 if(props[key])return `${props[key]}:${v}`;
 if(/^p[xytrbl]?$/.test(key)){const sides={p:[''],px:['-left','-right'],py:['-top','-bottom'],pt:['-top'],pr:['-right'],pb:['-bottom'],pl:['-left']};return sides[key].map(s=>`padding${s}:${v}`).join(';');}
 throw Error('Unknown utility '+c);
}
function replaceNode(src,id,replacement){
 const at=src.indexOf(`data-node-id="${id}"`);if(at<0)throw Error('Missing node '+id);
 const start=src.lastIndexOf('<',at);const tag=src.slice(start).match(/^<(\w+)/)[1];
 const openEnd=src.indexOf('>',at)+1;
 if(src[openEnd-2]==='/')return src.slice(0,start)+replacement+src.slice(openEnd);
 const re=new RegExp(`<${tag}\\b[^>]*>|<\\/${tag}>`,'g');re.lastIndex=openEnd;let depth=1,m;
 while((m=re.exec(src))){depth+=m[0].startsWith('</')?-1:m[0].endsWith('/>')?0:1;if(!depth)return src.slice(0,start)+(typeof replacement==='function'?replacement(src.slice(start,re.lastIndex)):replacement)+src.slice(re.lastIndex);}
 throw Error('Unclosed node '+id);
}
const videoNodes={'3:197':'onboard','3:198':'screener','1:6577':'income','1:6590':'payment'};
for(const name of ['Home','Capital','Domclick','Gedo']){
 let src=await fs.readFile(path.join(root,'design',name+'.jsx'),'utf8');
 src=src.slice(0,src.indexOf('\nSUPER CRITICAL:')<0?undefined:src.indexOf('\nSUPER CRITICAL:'));
 src=src.replace(/const (\w+) = "(https:\/\/www.figma.com\/api\/mcp\/asset\/([^\"]+))";/g,(_,variable,url,file)=>{assets.push({url,file});return `const ${variable} = "/assets/figma/${file.replace(/\.png$/,'.webp')}";`;});
 if(name==='Home') {await fs.writeFile(path.join(root,'design','Home-assets.json'),JSON.stringify(assets));continue;}
 const footer={Capital:'1:6507',Domclick:'1:6640',Gedo:'1:6793'}[name];
 const header={Capital:'1:6529',Domclick:'1:6662',Gedo:'1:6815'}[name];
 src=replaceNode(src,header,'');src=replaceNode(src,footer,'<Footer />');
 const links={Capital:{'1:6490':'domclick','1:6500':'gedo'},Domclick:{'1:6615':'capital','1:6633':'gedo'},Gedo:{'1:7419':'domclick','1:6768':'capital'}}[name];
 for(const [id,route] of Object.entries(links))src=replaceNode(src,id,node=>node.replace(/^<div/,`<a href="/${route}" data-case-link="${route}"`).replace(/<\/div>$/,'</a>'));
 const title={Capital:'1:6358',Domclick:'1:6540',Gedo:'1:6673'}[name];
 src=replaceNode(src,title,node=>node.replace(/^<p/,'<h1').replace(/<\/p>$/,'</h1>'));
 if(name==='Gedo')src=src.replace('data-node-id="1:6743"','data-node-id="1:6743" id="screens" role="region" aria-label="Экраны приложения Gedocorp" tabIndex={0}');
 for(const [id,key] of Object.entries(videoNodes))if(src.includes(`data-node-id="${id}"`)){
  const original=src.slice(src.lastIndexOf('<',src.indexOf(`data-node-id="${id}"`)),src.indexOf('/>',src.indexOf(`data-node-id="${id}"`))+2);
  src=src.replace(original,original.replace('<div','<LazyVideo').replace('/>',` videoKey="${key}" />`));
 }
 src=src.replace(/<img /g,'<img loading="lazy" decoding="async" ');
 src=src.replace(/className="([^"]+)"/g,(_,value)=>{
  const key='d'+css.size;
  if(!css.has(value))css.set(value,{key,rule:value.split(' ').map(declaration).join(';')});
  return `className="${css.get(value).key}"`;
 });
 src=src.replace(/export default function \w+\(/,`export default function ${name}(`);
 src=`import { Footer, LazyVideo } from '../components.jsx';\n${src}`;
 parse(src,{sourceType:'module',plugins:['jsx']});
 await fs.mkdir(path.join(root,'src','pages'),{recursive:true});
 await fs.writeFile(path.join(root,'src','pages',name+'.jsx'),src);
}
await fs.writeFile(path.join(root,'src','design.css'),[...css.values()].map(({key,rule})=>`.${key}{${rule}}`).join('\n'));
await fs.writeFile(path.join(root,'design','assets.json'),JSON.stringify([...new Map(assets.map(a=>[a.file,a])).values()],null,2));
console.log(`Imported three case studies; ${css.size} scoped styles, ${assets.length} assets.`);

import {siteUrl} from './site-url.js';
import {useCallback,useEffect,useRef,useState} from 'react';
import {Footer,LazyVideo,CompanyCard} from './components.jsx';
import {homeAssets as a} from './home-assets.js';
const companies=[
 {key:'domclick',name:'Домклик х Сбер/Аренда',year:'2026',description:'Работаю на позиции Лида основных продуктов компании',logo:a.imgDk1,role:'Team Lead',platform:'iOS, Android',type:'B2C'},
 {key:'sber',name:'Сбербанк Онлайн',year:'2026',description:'Работаю на позиции Лида в контуре продукта “Мой дом” в СБОЛ',logo:a.imgSber1,role:'Team Lead',platform:'iOS, Android',type:'B2C'},
 {key:'capital',name:'Capital.com',year:'2022',description:'Решаю проблемы высоконагруженных интерфейсов',logo:a.imgCap1,role:'Senior',platform:'iOS, Android',type:'B2C'},
 {key:'gedo',name:'Gedocorp',year:'2025',description:'Разрабатывала интерфейсы программного обеспечения на базе ИИ для инженеров',logo:a.imgGedo1,role:'Team Lead',platform:'Android, Web',type:'B2B'}];
function Dock(){return <div className="dock" aria-label="Примеры интерфейсов">{['video',a.img41,a.img21,a.img31,a.img51].map((src,i)=><div key={src} className="dock-item">{i===0?<LazyVideo videoKey="dock" aria-label="Пример интерфейса часов"/>:<img src={src} alt={['','Виджет с картой','Виджет активности','Dynamic Island','Виджет погоды'][i]} decoding="async"/>}</div>)}</div>}
function CasePreview({company,onActive}){
 const ref=useRef(null),cursor=useRef(null);const [nda,setNda]=useState(false),[activated,setActivated]=useState(false);const isNda=company.key==='sber';
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting)onActive(company.key)},{rootMargin:'-20% 0px -45% 0px',threshold:0});observer.observe(ref.current);return()=>observer.disconnect()},[company.key,onActive]);
 useEffect(()=>{if(nda){const t=setTimeout(()=>setNda(false),2400);return()=>clearTimeout(t)}},[nda]);
 const scrolling=useRef(false);
 const hideCursor=useCallback(()=>ref.current?.removeAttribute('data-cursor-visible'),[]);
 useEffect(()=>{
  let timer;
  const suppress=()=>{scrolling.current=true;hideCursor();clearTimeout(timer);timer=setTimeout(()=>{scrolling.current=false},160)};
  const end=()=>{clearTimeout(timer);scrolling.current=false};
  window.addEventListener('scroll',suppress,{passive:true,capture:true});
  window.addEventListener('wheel',suppress,{passive:true});
  window.addEventListener('scrollend',end,{passive:true,capture:true});
  window.addEventListener('blur',hideCursor);
  return()=>{clearTimeout(timer);window.removeEventListener('scroll',suppress,true);window.removeEventListener('wheel',suppress);window.removeEventListener('scrollend',end,true);window.removeEventListener('blur',hideCursor)};
 },[hideCursor]);
 function move(e){
  if(!cursor.current||e.pointerType!=='mouse'||scrolling.current||(e.movementX===0&&e.movementY===0))return;
  const b=ref.current.getBoundingClientRect();
  cursor.current.style.setProperty('--cursor-x',`${e.clientX-b.left}px`);
  cursor.current.style.setProperty('--cursor-y',`${e.clientY-b.top}px`);
  ref.current.setAttribute('data-cursor-visible','');
 }
 const Tag=isNda?'button':'a';return <Tag ref={ref} id={company.key} className={`case-preview preview-${company.key} ${nda?'nda-highlight':''}`} {...(isNda?{type:'button',onClick:()=>setNda(true)}:{href:siteUrl(company.key)})} onPointerEnter={()=>setActivated(true)} onFocus={()=>setActivated(true)} onPointerMove={move} onPointerLeave={hideCursor} onPointerCancel={hideCursor} aria-label={isNda?'Сбербанк Онлайн — кейс под NDA':`Открыть кейс ${company.name}`}>{company.key==='capital'?<img className="case-cover" src={a.imgCapPr1} loading="lazy" decoding="async" alt="Три экрана приложения Capital.com"/>:<LazyVideo videoKey={company.key} playback={company.key==='gedo'?'once':'hover-loop'} activated={activated} aria-label={`Превью ${company.name}`}/>}<div className="case-tags"><span><img src={a.imgEllipse1} width="11" height="11" alt=""/>{company.role}</span><span>{company.platform}</span><span>{company.type}</span></div>{isNda&&<span className="nda-tag" aria-live="polite">{nda?'Кейс под NDA':'NDA'}</span>}<span ref={cursor} className="cursor-badge" aria-hidden="true">Открыть</span></Tag>;
}
export default function Home(){
 const [active,setActive]=useState('domclick');
 const selectedAnchor=useRef(null);
 const selectCompany=useCallback(key=>{selectedAnchor.current=key===active?null:key;setActive(key)},[active]);
 const followScroll=useCallback(key=>{
  if(selectedAnchor.current&&selectedAnchor.current!==key)return;
  if(selectedAnchor.current===key)selectedAnchor.current=null;
  setActive(key);
 },[]);
 useEffect(()=>{
  const release=()=>{selectedAnchor.current=null};
  const releaseKey=e=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(e.key))release()};
  document.addEventListener('scrollend',release);
  window.addEventListener('wheel',release,{passive:true});
  window.addEventListener('touchstart',release,{passive:true});
  window.addEventListener('keydown',releaseKey);
  return()=>{document.removeEventListener('scrollend',release);window.removeEventListener('wheel',release);window.removeEventListener('touchstart',release);window.removeEventListener('keydown',releaseKey)};
 },[]);
 return <><main className="home-main"><section className="hero" aria-label="Даша Кормилицына, Team Lead"><img className="hero-portrait" src={a.img11} alt="Даша Кормилицына" fetchPriority="high" width="1141" height="1192"/><div className="hero-fade"/><h1 className="greeting">Привет! 💚<br/>Я Даша Кормилицына – Team Lead<br/><strong>из Домклик х Сбер.</strong></h1><Dock/></section><section className="case-section" id="cases" aria-label="Кейсы"><aside className="company-navigation"><nav aria-label="Компании и кейсы">{companies.map(company=><CompanyCard key={company.key} company={company} active={active===company.key} onSelect={selectCompany}/>)}</nav></aside><div className="case-previews">{companies.map(company=><CasePreview key={company.key} company={company} onActive={followScroll}/>)}</div></section><section id="about" className="about"><div className="about-portrait"><img src={a.img1} alt="Портрет Даши" loading="lazy" decoding="async"/></div><div className="about-copy"><h2 className="section-tag">Обо мне</h2><p>Привет! Я Даша, Lead Product Designer с опытом 5 лет. В Домклик управляю большой командой дизайнеров, развиваю ключевые продукты компании, а также решаю стратегические задачи. В своей работе использую data-driven подход для улучшения пользовательского опыта и роста метрик.</p></div></section></main><Footer/></>}

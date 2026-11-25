import {siteUrl} from './site-url.js';
import {useEffect,useRef,useState} from 'react';
import {homeAssets} from './home-assets.js';
export function Header(){
 const [menuOpen,setMenuOpen]=useState(false);
 const headerRef=useRef(null),toggleRef=useRef(null);
 useEffect(()=>{
  const desktop=matchMedia('(min-width:768px)'),resize=()=>{if(desktop.matches)setMenuOpen(false)};
  desktop.addEventListener('change',resize);return()=>desktop.removeEventListener('change',resize);
 },[]);
 useEffect(()=>{
  if(!menuOpen)return;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const outside=e=>{if(!headerRef.current?.contains(e.target))setMenuOpen(false)};
  const key=e=>{
   if(e.key==='Escape'){setMenuOpen(false);toggleRef.current?.focus()}
   if(e.key==='Tab'){
    const controls=[...headerRef.current.querySelectorAll('a[href],button:not([aria-disabled="true"])')].filter(el=>el.getClientRects().length);
    const first=controls[0],last=controls[controls.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}
   }
  };
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=previousOverflow;document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',key)};
 },[menuOpen]);
 const close=()=>setMenuOpen(false);
 return <header ref={headerRef} className="site-header"><nav aria-label="Основная навигация"><a className="brand" href={siteUrl('')} aria-label="Даша Кормилицына — на главную"><img src={siteUrl('assets/logo.png')} width="64" height="32" alt=""/></a><a className="nav-link" href={siteUrl('#about')}>Обо мне</a><a className="nav-link" href={siteUrl('#cases')}>Кейсы</a><a className="nav-link" href={siteUrl('assets/resume.pdf')} target="_blank" rel="noopener noreferrer">Резюме</a></nav><a className="nav-link" href="#contacts">Контакты</a><button ref={toggleRef} type="button" className={`menu-toggle ${menuOpen?'is-open':''}`} aria-label={menuOpen?'Закрыть меню':'Открыть меню'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={()=>setMenuOpen(open=>!open)}><span/><span/></button><nav id="mobile-navigation" className={`mobile-menu ${menuOpen?'is-open':''}`} aria-label="Мобильная навигация" aria-hidden={!menuOpen} inert={!menuOpen}><a href={siteUrl('#about')} onClick={close}>Обо мне</a><a href={siteUrl('#cases')} onClick={close}>Кейсы</a><a href={siteUrl('assets/resume.pdf')} target="_blank" rel="noopener noreferrer" onClick={close}>Резюме</a><div className="mobile-menu-contacts"><div><span>TG:</span><a href="https://t.me/daria_kormilitsyna" target="_blank" rel="noreferrer">daria_kormilitsyna</a></div><div><span>Email:</span><a href="mailto:kormilitsyna.daria01@yandex.com">kormilitsyna.daria01@yandex.com</a></div></div></nav></header>;
}
export function Footer(){
 const format=()=>new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date());
 const [time,setTime]=useState(format);useEffect(()=>{const id=setInterval(()=>setTime(format()),1000);return()=>clearInterval(id)},[]);
 return <footer className="site-footer" id="contacts"><div className="moscow"><img src={homeAssets.imgIconFrame} width="34" height="34" alt=""/><time aria-label="Текущее время в Москве">{time}, Москва</time></div><div className="contact-links"><div><span>TG:</span><a href="https://t.me/daria_kormilitsyna" target="_blank" rel="noreferrer">daria_kormilitsyna</a></div><div><span>Email:</span><a className="email" href="mailto:kormilitsyna.daria01@yandex.com">kormilitsyna.daria01@yandex.com</a></div></div></footer>;
}
export function LazyVideo({videoKey,className='',playback='viewport',activated=false,...props}){
 const ref=useRef(null),visible=useRef(false),started=useRef(false),finished=useRef(false);
 useEffect(()=>{started.current=false;finished.current=false},[videoKey,playback]);
 useEffect(()=>{
  const video=ref.current,reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:767px)');
  function sync(){
   if(playback==='once'&&visible.current)started.current=true;
   if(playback==='hover-loop'&&(activated||(mobile.matches&&visible.current)))started.current=true;
   const shouldPlay=playback==='viewport'?visible.current&&!document.hidden:started.current&&!finished.current;
   if(shouldPlay&&!reduced.matches){
    if(!video.getAttribute('src')){video.src=siteUrl(`assets/video/${videoKey}.mp4`);video.load()}
    if(video.paused)video.play().catch(()=>{});
   }else video.pause();
  }
  const observer=new IntersectionObserver(entries=>{visible.current=entries[0].isIntersecting;sync()},{threshold:.08});
  observer?.observe(video);
  const ended=()=>{if(playback==='once')finished.current=true};
  video.addEventListener('ended',ended);
  if(playback==='viewport')document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);mobile.addEventListener('change',sync);sync();
  return()=>{observer?.disconnect();video.removeEventListener('ended',ended);document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);mobile.removeEventListener('change',sync);video.pause()};
 },[videoKey,playback,activated]);
 return <video {...props} ref={ref} className={`lazy-video ${className}`} muted loop={playback!=='once'} playsInline preload="none" poster={siteUrl(`assets/video/${videoKey}.webp`)} aria-label={props['aria-label']||'Демонстрация интерфейса'}/>;
}
export function CompanyCard({company,active=false,onSelect}){return <a href={`#${company.key}`} onClick={()=>onSelect?.(company.key)} className={`company-card ${active?'is-active':''}`} aria-current={active?'location':undefined}><img src={company.logo} alt="" width="80" height="80" loading="lazy"/><div className="company-copy"><div className="company-title"><span>{company.name}</span><span className="company-year">{company.year}</span></div><p>{company.description}</p></div></a>}

export function ResponsiveBreak(){return <><br aria-hidden/><span className="mobile-break-space" aria-hidden="true"> </span></>}

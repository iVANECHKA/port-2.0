import {siteUrl} from './site-url.js';
import {useEffect,useRef,useState} from 'react';
import {homeAssets} from './home-assets.js';
export function Header(){
 const [notice,setNotice]=useState(false);
 useEffect(()=>{if(notice){const t=setTimeout(()=>setNotice(false),2800);return()=>clearTimeout(t)}},[notice]);
 return <header className="site-header"><nav aria-label="Основная навигация"><a className="brand" href={siteUrl('')} aria-label="Даша Кормилицына — на главную"><img src={homeAssets.img3D1} width="64" height="32" alt=""/></a><a className="nav-link" href={siteUrl('#about')}>Обо мне</a><a className="nav-link" href={siteUrl('#cases')}>Кейсы</a><button className="nav-link" type="button" aria-disabled="true" onClick={()=>setNotice(true)}>Резюме</button></nav><a className="nav-link" href="#contacts">Контакты</a><div className={`notice ${notice?'is-visible':''}`} role="status">PDF-резюме скоро появится</div></header>;
}
export function Footer(){
 const format=()=>new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date());
 const [time,setTime]=useState(format);useEffect(()=>{const id=setInterval(()=>setTime(format()),1000);return()=>clearInterval(id)},[]);
 return <footer className="site-footer" id="contacts"><div className="moscow"><img src={homeAssets.imgIconFrame} width="34" height="34" alt=""/><time aria-label="Текущее время в Москве">{time}, Москва</time></div><div className="contact-links"><div><span>TG:</span><a href="https://t.me/daria_kormilitsyna" target="_blank" rel="noreferrer">daria_kormilitsyna</a></div><div><span>Email:</span><a className="email" href="mailto:daria.kormilitsyna@gmail.com">daria.kormilitsyna@gmail.com</a></div></div></footer>;
}
export function LazyVideo({videoKey,className='',playback='viewport',activated=false,...props}){
 const ref=useRef(null),visible=useRef(false),started=useRef(false),finished=useRef(false);
 useEffect(()=>{started.current=false;finished.current=false},[videoKey,playback]);
 useEffect(()=>{
  const video=ref.current,reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function sync(){
   if(playback==='once'&&visible.current)started.current=true;
   if(playback==='hover-loop'&&activated)started.current=true;
   const shouldPlay=playback==='viewport'?visible.current&&!document.hidden:started.current&&!finished.current;
   if(shouldPlay&&!reduced.matches){
    if(!video.getAttribute('src')){video.src=siteUrl(`assets/video/${videoKey}.mp4`);video.load()}
    if(video.paused)video.play().catch(()=>{});
   }else video.pause();
  }
  const observer=playback==='hover-loop'?null:new IntersectionObserver(entries=>{visible.current=entries[0].isIntersecting;sync()},{threshold:.08});
  observer?.observe(video);
  const ended=()=>{if(playback==='once')finished.current=true};
  video.addEventListener('ended',ended);
  if(playback==='viewport')document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);sync();
  return()=>{observer?.disconnect();video.removeEventListener('ended',ended);document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);video.pause()};
 },[videoKey,playback,activated]);
 return <video {...props} ref={ref} className={`lazy-video ${className}`} muted loop={playback!=='once'} playsInline preload="none" poster={siteUrl(`assets/video/${videoKey}.webp`)} aria-label={props['aria-label']||'Демонстрация интерфейса'}/>;
}
export function CompanyCard({company,active=false,onSelect}){return <a href={`#${company.key}`} onClick={()=>onSelect?.(company.key)} className={`company-card ${active?'is-active':''}`} aria-current={active?'location':undefined}><img src={company.logo} alt="" width="80" height="80" loading="lazy"/><div className="company-copy"><div className="company-title"><span>{company.name}</span><span className="company-year">{company.year}</span></div><p>{company.description}</p></div></a>}

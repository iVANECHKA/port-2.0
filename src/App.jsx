import {currentRoute} from './site-url.js';
import {lazy,Suspense,useEffect,useState} from 'react';
import Home from './Home.jsx';
import {Header} from './components.jsx';
import {installClickSound} from './click-sound.js';
import './design.css';
const Capital=lazy(()=>import('./pages/Capital.jsx')),Domclick=lazy(()=>import('./pages/Domclick.jsx')),Gedo=lazy(()=>import('./pages/Gedo.jsx'));
function useNarrowScreen(){
 const [narrow,setNarrow]=useState(()=>matchMedia('(max-width:767px)').matches);
 useEffect(()=>{const query=matchMedia('(max-width:767px)'),sync=()=>setNarrow(query.matches);query.addEventListener('change',sync);sync();return()=>query.removeEventListener('change',sync)},[]);
 return narrow;
}
export function App(){const narrow=useNarrowScreen();useEffect(()=>installClickSound(),[]);const route=currentRoute();const Page={'/capital':Capital,'/domclick':Domclick,'/gedo':Gedo}[route]||Home;useEffect(()=>{document.title=Page===Home?'Даша Кормилицына — Lead Product Designer':`${{'/capital':'Capital.com','/domclick':'Домклик х Сбер','/gedo':'Gedocorp'}[route]} — Даша Кормилицына`},[route,Page]);if(narrow)return <main className="desktop-only-message">Портфолио работает только на Desktop версии</main>;return <div className={`site ${Page===Home?'home-page':'case-page'}`}><a className="skip-link" href="#main-content">К содержимому</a><Header/><div id="main-content"><Suspense fallback={<div className="page-loading" role="status">Загрузка кейса…</div>}><Page/></Suspense></div></div>}

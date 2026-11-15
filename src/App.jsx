import {currentRoute} from './site-url.js';
import {lazy,Suspense,useEffect} from 'react';
import Home from './Home.jsx';
import {Header} from './components.jsx';
import {installClickSound} from './click-sound.js';
import './design.css';
const Capital=lazy(()=>import('./pages/Capital.jsx')),Domclick=lazy(()=>import('./pages/Domclick.jsx')),Gedo=lazy(()=>import('./pages/Gedo.jsx'));
export function App(){useEffect(()=>installClickSound(),[]);const route=currentRoute();const Page={'/capital':Capital,'/domclick':Domclick,'/gedo':Gedo}[route]||Home;useEffect(()=>{document.title=Page===Home?'Даша Кормилицына — Lead Product Designer':`${{'/capital':'Capital.com','/domclick':'Домклик х Сбер','/gedo':'Gedocorp'}[route]} — Даша Кормилицына`},[route,Page]);return <div className={`site ${Page===Home?'home-page':'case-page'}`}><a className="skip-link" href="#main-content">К содержимому</a><Header/><div id="main-content"><Suspense fallback={<div className="page-loading" role="status">Загрузка кейса…</div>}><Page/></Suspense></div></div>}

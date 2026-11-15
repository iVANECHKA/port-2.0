import {play,unlock} from 'cuelume';

// Morphin's live page maps button/link activation to Cuelume's mechanical tap.
// The recipe is synthesized locally (MIT, Daniel Belyi), without remote audio files.
export function installClickSound(){
 function interactive(event){
  if(!(event.target instanceof Element))return false;
  const control=event.target.closest('a[href],button');
  return control&&!control.matches(':disabled,[aria-disabled="true"]');
 }
 function sound(){void unlock();play('tap',{theme:'mech',volume:.245})}
 function pointerDown(event){if(event.pointerType==='mouse'&&event.button===0&&interactive(event))sound()}
 function click(event){
  if(interactive(event)&&(event.detail===0||event.pointerType==='touch'||event.pointerType==='pen'))sound();
 }
 document.addEventListener('pointerdown',pointerDown,true);
 document.addEventListener('click',click,true);
 return()=>{document.removeEventListener('pointerdown',pointerDown,true);document.removeEventListener('click',click,true)};
}

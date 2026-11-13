// Vite supplies '/' locally and the repository path for GitHub Pages builds.
export const siteUrl=path=>import.meta.env.BASE_URL+path.replace(/^\/+/, '');
export const currentRoute=()=>{
 const base=import.meta.env.BASE_URL;
 const pathname=base!=='/'&&location.pathname.startsWith(base)?location.pathname.slice(base.length-1):location.pathname;
 return pathname.replace(/\/$/,'')||'/';
};

const CACHE='bein-qalbein-royal-v66';
const FILES=['./','./index.html','./manifest.json','./icon.svg','./couple-header.jpg.png'];
self.addEventListener('install',event=>{
 self.skipWaiting();
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith("bein-qalbein-royal-")&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==location.origin)return;
 if(event.request.mode==='navigate'||url.pathname.endsWith('.html')){
  // Network-first for the app shell: do not keep showing an old cached build
  // after GitHub Pages has published a newer version.
  event.respondWith((async()=>{
   try{
    const response=await fetch(event.request);
    if(response&&response.ok){
     const cache=await caches.open(CACHE);
     await cache.put(event.request,response.clone());
    }
    return response;
   }catch(_){
    const cached=await caches.match(event.request)||await caches.match('./index.html');
    return cached||new Response('Offline',{status:503,statusText:'Offline'});
   }
  })());
 }else{
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
 }
});

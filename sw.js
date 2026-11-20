const CACHE='bein-qalbein-royal-v42';
const FILES=['./','./index.html','./manifest.json','./icon.svg','./couple-header.jpg.png'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)))});
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==location.origin)return;
 if(event.request.mode==='navigate'||url.pathname.endsWith('.html')){
  event.respondWith((async()=>{
   const cached=await caches.match(event.request)||await caches.match('./index.html');
   const fresh=fetch(event.request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}
    return response;
   }).catch(()=>null);
   if(cached){event.waitUntil(fresh.then(()=>undefined));return cached}
   return (await fresh)||new Response('Offline',{status:503,statusText:'Offline'});
  })());
 }else{
  event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));
 }
});

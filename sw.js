const CACHE='bein-qalbein-royal-v48';
const FILES=['./','./index.html','./manifest.json','./icon.svg','./couple-header.jpg.png'];
self.addEventListener('install',event=>{
 self.skipWaiting();
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==location.origin)return;
 if(event.request.mode==='navigate'||url.pathname.endsWith('.html')){
  const refresh=fetch(event.request).then(async response=>{
   if(response&&response.ok){
    const cache=await caches.open(CACHE);
    await cache.put(event.request,response.clone());
   }
   return response;
  });
  event.waitUntil(refresh.then(()=>undefined).catch(()=>undefined));
  event.respondWith((async()=>{
   const cached=await caches.match(event.request)||await caches.match('./index.html');
   if(cached)return cached;
   try{return await refresh}catch(_){return new Response('Offline',{status:503,statusText:'Offline'})}
  })());
 }else{
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
 }
});

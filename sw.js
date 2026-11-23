const CACHE='bein-qalbein-royal-v150';
const PRECACHE=['./','./index.html','./app.css','./content-data.js','./app.js','./ai-studio.js','./manifest.json','./icon.svg','./icon-maskable.svg','./explore-hub.css?v=2','./explore-hub.js?v=3'];

self.addEventListener('install',event=>{
 self.skipWaiting();
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PRECACHE)));
});

self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('bein-qalbein-royal-')&&key!==CACHE).map(key=>caches.delete(key)));
  if(self.registration.navigationPreload){
   try{await self.registration.navigationPreload.enable()}catch(_){}
  }
 })());
});

self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;

 if(request.mode==='navigate'||url.pathname.endsWith('.html')){
  event.respondWith((async()=>{
   try{
    const preloaded=await event.preloadResponse;
    const response=preloaded||await fetch(request);
    if(response&&response.ok){
     const cache=await caches.open(CACHE);
     await cache.put(request,response.clone());
    }
    return response;
   }catch(_){
    const cached=await caches.match(request)||await caches.match('./index.html')||await caches.match('./');
    return cached||new Response('أنت غير متصل بالإنترنت. افتح التطبيق مجدداً عند عودة الاتصال.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
   }
  })());
  return;
 }

 const isStatic=/\.(?:css|js|svg|png|webp|jpg|jpeg|json|webmanifest)$/i.test(url.pathname);
 if(!isStatic)return;
 event.respondWith((async()=>{
  const cached=await caches.match(request);
  if(cached)return cached;
  const response=await fetch(request);
  if(response&&response.ok&&response.type==='basic'){
   const cache=await caches.open(CACHE);
   await cache.put(request,response.clone());
  }
  return response;
 })());
});

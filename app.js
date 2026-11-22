
const { categories, messages, categoryClosings, husbandAdvice, wifeAdvice, extraBases, extraClosings, i18n, languageText, categoryGroups, smartNames, builderCopy, rescueText, challenges, iconPaths, categoryIconMap, bqClosings, translatedClosings, translatedBaseExpansions } = window.BQ_DATA;


const $=id=>document.getElementById(id);
/* Storage adapter: persistent when possible, with a correct shadow layer for quota/security failures. */
const bqStorage=(()=>{
 let native=null,cleared=false,shadowOnly=false;
 const memory=new Map(),removed=new Set();
 try{native=window.localStorage;native.getItem('__bq_probe__')}catch(_){native=null}
 if(native){const probe='__bq_probe__';try{native.setItem(probe,'1');native.removeItem(probe)}catch(_){shadowOnly=true;try{native.removeItem(probe)}catch(__){}}}
 const keys=()=>{
  const result=new Set();
  if(native&&!cleared){try{for(let i=0;i<native.length;i++){const key=native.key(i);if(key!==null&&!removed.has(key))result.add(key)}}catch(_){}}
  memory.forEach((_,key)=>result.add(key));
  removed.forEach(key=>result.delete(key));
  return [...result];
 };
 return {
  getItem(key){
   const k=String(key);
   if(memory.has(k))return memory.get(k);
   if(cleared||removed.has(k))return null;
   try{return native?.getItem(k)??null}catch(_){return null}
  },
  setItem(key,value){
   const k=String(key),v=String(value);
   if(native&&!cleared){try{native.setItem(k,v);memory.delete(k);removed.delete(k);return}catch(_){}}
   shadowOnly=true;memory.set(k,v);removed.delete(k);
  },
  removeItem(key){
   const k=String(key);memory.delete(k);
   if(native&&!cleared){try{native.removeItem(k);removed.delete(k);return}catch(_){}}
   shadowOnly=true;removed.add(k);
  },
  clear(){
   memory.clear();removed.clear();
   if(native){try{native.clear();cleared=false;return}catch(_){}}
   shadowOnly=true;cleared=true;
  },
  key(index){const i=Number(index);return Number.isInteger(i)&&i>=0?keys()[i]??null:null},
  get length(){return keys().length},
  get persistent(){return !!native&&!cleared&&!shadowOnly&&memory.size===0&&removed.size===0}
 };
})();

let lang=(bqStorage.getItem('bq_language')||'ar'),selected='morning',current='',favs=[];
function updateStorageStatus(){
 const note=$('storageWarning');if(!note)return;
 const persistent=bqStorage.persistent;note.hidden=persistent;
 if(!persistent)note.textContent=lang==='en'?'Browser storage is unavailable or full. Changes are kept only until this page closes. Export a backup when storage is available.':lang==='fr'?'Le stockage du navigateur est indisponible ou plein. Les changements ne restent disponibles que jusqu’à la fermeture de cette page. Exportez une sauvegarde lorsque le stockage sera disponible.':'تخزين المتصفح غير متاح أو ممتلئ. ستبقى التغييرات في الذاكرة حتى إغلاق هذه الصفحة فقط. أنشئ نسخة احتياطية عندما يتاح التخزين.';
}
if(!['ar','en','fr'].includes(lang))lang='ar';
try{const storedFavs=JSON.parse(bqStorage.getItem('bq_favorites')||'[]');favs=Array.isArray(storedFavs)?[...new Set(storedFavs.filter(x=>typeof x==='string'))].slice(0,1000):[]}catch(e){favs=[]}
function loadFavoriteList(key){try{const value=JSON.parse(bqStorage.getItem(key)||'[]');return Array.isArray(value)?value:[]}catch(_){return []}}
let favoriteTips=loadFavoriteList('bq_favorite_tips').filter(x=>x&&typeof x.text==='string'&&['husband','wife'].includes(x.audience)).slice(0,500);
let favoriteBooks=loadFavoriteList('bq_favorite_books').filter(x=>x&&typeof x.id==='string'&&typeof x.title==='string'&&typeof x.summary==='string').slice(0,100);
let favoriteGames=loadFavoriteList('bq_favorite_games').filter(x=>x&&typeof x.question==='string'&&typeof x.answer==='string').slice(0,100);
let activeFavoriteTab='messages';
function persistFavoriteList(key,list){try{bqStorage.setItem(key,JSON.stringify(list));return true}catch(_){alert('تعذر الحفظ في مساحة المتصفح.');return false}}

function saveFavs(){try{bqStorage.setItem('bq_favorites',JSON.stringify(favs))}catch(e){alert('تعذر الحفظ في مساحة المتصفح.')}} 
/* Categories use the grouped, accessible renderer defined in the current app flow. */
function generate(){
 const pool=messages[selected]||messages.morning;
 let next=pool[Math.floor(Math.random()*pool.length)];
 if(pool.length>1&&next===current)next=pool[(pool.indexOf(next)+1)%pool.length];
 current=next;
 $('message').textContent=current;
}
function showFavs(){
 $('favorites').innerHTML='';
 if(!favs.length){$('favorites').innerHTML='<p class="empty">لم تحفظ رسائل بعد. أضف رسالة تعجبك لتجدها هنا.</p>';return}
 favs.forEach((item,i)=>{
  const box=document.createElement('div');box.className='favitem';
  const p=document.createElement('div');p.textContent=item;
  const copy=document.createElement('button');copy.textContent='نسخ';copy.onclick=()=>copyText(item);
  const del=document.createElement('button');del.textContent='حذف';del.onclick=()=>{favs.splice(i,1);saveFavs();showFavs()};
  box.append(p,copy,del);$('favorites').append(box);
 });
}
async function copyText(text){
 try{await navigator.clipboard.writeText(text);alert('تم النسخ بنجاح ✓')}
 catch(e){const t=document.createElement('textarea');t.value=text;document.body.append(t);t.select();document.execCommand('copy');t.remove();alert('تم النسخ ✓')}
}
// Role remains a content preference for message wording; appearance is now independent.
$('newBtn').onclick=generate;
$('shareBtn').onclick=async()=>{if(!current)return;if(navigator.share){try{await navigator.share({title:'BEIN QALBEIN PRO',text:current})}catch(e){}}else copyText(current)};
$('favBtn').onclick=()=>{
 if(!current)return;
 if(!favs.includes(current)){favs.unshift(current);saveFavs();$('favBtn').textContent='تمت الإضافة ✓';}
 else $('favBtn').textContent='محفوظة بالفعل ✓';
 $('favorites').classList.remove('hidden');showFavs();setTimeout(()=>$('favBtn').textContent='☆ أضف للمفضلة',1600);
};
$('showFav').onclick=()=>{$('favorites').classList.remove('hidden');showFavs()};
$('hideFav').onclick=()=>$('favorites').classList.add('hidden');
$('lang').onchange=e=>{
 lang=['ar','en','fr'].includes(e.target.value)?e.target.value:'ar';
 try{bqStorage.setItem('bq_language',lang)}catch(e){}
 applyLanguage();
};

/* V5: expand the curated message library to 100 entries per category while preserving saved favorites. */

Object.keys(messages).forEach(id=>{
 const base=messages[id].slice();
 const endings=categoryClosings[id]||categoryClosings.support;
 const expanded=[];
 base.forEach((sentence,i)=>{endings.forEach((ending,j)=>expanded.push(sentence+' '+ending))});
 messages[id]=expanded;
});


function renderAdvice(which){
 const list=which==='wife'?wifeAdvice:husbandAdvice;
 $('adviceList').innerHTML='';
 list.forEach((tip,i)=>{const d=document.createElement('div');d.className='advice-item';d.textContent=(i+1)+'. '+tip;$('adviceList').append(d)});
 $('husbandTips').classList.toggle('active',which==='husband');
 $('wifeTips').classList.toggle('active',which==='wife');
}
function dailyText(){
 const all=Object.values(messages).flat();
 const now=new Date();const key=now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate();
 return all[(key*17)%all.length];
}
$('dailyMessage').textContent=dailyText();
$('copyDaily').onclick=()=>copyText($('dailyMessage').textContent);
$('husbandTips').onclick=()=>renderAdvice('husband');
$('wifeTips').onclick=()=>renderAdvice('wife');
renderAdvice('husband');


/* V9: 50 additional carefully worded messages per category (150 total per category). */


Object.keys(extraBases).forEach(id=>{extraBases[id].forEach(base=>extraClosings.forEach(end=>messages[id].push(base+' '+end)));});
document.documentElement.dataset.messageCount=String(Object.values(messages).reduce((n,p)=>n+p.length,0));
/* V42 performance: decorative floating particles are intentionally disabled on mobile. */


/* V19 — complete interface language layer (Arabic / English / French) */


let activeAdvice='husband';
const originalMessagePools=Object.fromEntries(Object.entries(messages).map(([key,pool])=>[key,pool.slice()]));

function showFavs(){
 const box=$('favorites');box.innerHTML='';const t=languageText[lang]||languageText.ar;
 if(!favs.length){const p=document.createElement('p');p.className='empty';p.textContent=t.empty;box.append(p);return}
 favs.forEach((item,i)=>{const row=document.createElement('div');row.className='favitem';const p=document.createElement('div');p.textContent=item;const cp=document.createElement('button');cp.type='button';cp.textContent=lang==='ar'?'نسخ':lang==='en'?'Copy':'Copier';cp.onclick=()=>copyText(item);const del=document.createElement('button');del.type='button';del.textContent=t.delete;del.onclick=()=>{favs.splice(i,1);saveFavs();showFavs()};row.append(p,cp,del);box.append(row)});
}
function renderSavedCards(hostId,list,kind){
 const host=$(hostId);host.innerHTML='';
 if(!list.length){const p=document.createElement('p');p.className='empty';p.textContent='لا توجد عناصر محفوظة في هذا القسم بعد.';host.append(p);return}
 list.forEach((item,index)=>{
  const row=document.createElement('article');row.className='saved-collection-item';
  const title=document.createElement('h4');title.textContent=item.title||item.question||item.text;
  const body=document.createElement('p');body.textContent=item.summary||item.answer||item.text;
  const del=document.createElement('button');del.type='button';del.textContent='إزالة من المفضلة';
  del.addEventListener('click',()=>{
   const source=kind==='advice'?favoriteTips:kind==='games'?favoriteGames:favoriteBooks;
   source.splice(index,1);
   const key={advice:'bq_favorite_tips',books:'bq_favorite_books',games:'bq_favorite_games'}[kind];
   if(persistFavoriteList(key,source))renderFavoriteCollections();
  });
  row.append(title,body,del);host.append(row);
 });
}
function renderFavoriteCollections(){
 showFavs();
 renderSavedCards('favoriteTipsList',favoriteTips.map(x=>({title:x.audience==='wife'?'نصيحة للزوجة':'نصيحة للزوج',text:x.text})), 'advice');
 renderSavedCards('favoriteBooksList',favoriteBooks,'books');
 renderSavedCards('favoriteGamesList',favoriteGames.map(x=>({title:x.question,answer:x.answer+(x.why?' — '+x.why:'')})),'games');
}
function setFavoriteTab(tab){
 if(!['messages','advice','books','games'].includes(tab))tab='messages';
 activeFavoriteTab=tab;
 document.querySelectorAll('[data-fav-tab]').forEach(b=>{const active=b.dataset.favTab===tab;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 document.querySelectorAll('[data-fav-panel]').forEach(p=>p.hidden=p.dataset.favPanel!==tab);
 const titles={messages:'رسائلك المفضلة',advice:'نصائحك المفضلة',books:'كتبك المفضلة',games:'ألعابك المفضلة'};
 $('favTitle').textContent=titles[tab];
 renderFavoriteCollections();
}
document.querySelectorAll('[data-fav-tab]').forEach(b=>b.addEventListener('click',()=>setFavoriteTab(b.dataset.favTab)));
function saveFavoriteTip(text,audience){
 if(!text||!['husband','wife'].includes(audience))return;
 if(!favoriteTips.some(x=>x.text===text&&x.audience===audience)){favoriteTips.unshift({text,audience});favoriteTips=favoriteTips.slice(0,500);persistFavoriteList('bq_favorite_tips',favoriteTips)}
 renderAdviceForLanguage();renderSavedCards('favoriteTipsList',favoriteTips.map(x=>({title:x.audience==='wife'?'نصيحة للزوجة':'نصيحة للزوج',text:x.text})),'advice');
}
const bookCatalog={
 'kind-dialogue':{id:'kind-dialogue',title:'فن الحوار الهادئ',summary:'مبادئ الإصغاء، اختيار الوقت المناسب، التعبير عن الاحتياج دون لوم، وإنهاء الحوار باتفاق واضح.'},
 'daily-kindness':{id:'daily-kindness',title:'المودة في التفاصيل اليومية',summary:'أفكار صغيرة للتقدير، والكلمة الطيبة، وتقاسم المسؤوليات، وصناعة لحظات امتنان متجددة.'},
 'repair-trust':{id:'repair-trust',title:'ترميم الثقة بعد الخلاف',summary:'خطوات عملية للاعتذار الصادق، والوفاء بالوعود، وتجنب تكرار الأذى، وبناء الأمان بالتدرج.'},
 'shared-life':{id:'shared-life',title:'شراكة الحياة والمسؤولية',summary:'التعاون في شؤون البيت، والإنصاف في توزيع الأعباء، واحترام الاختلاف، والتخطيط المشترك.'}
};
function saveFavoriteBook(id){
 const book=bookCatalog[id];if(!book)return;
 if(!favoriteBooks.some(x=>x.id===id)){favoriteBooks.unshift(book);favoriteBooks=favoriteBooks.slice(0,100);persistFavoriteList('bq_favorite_books',favoriteBooks)}
 const b=document.querySelector('[data-save-book="'+id+'"]');if(b)b.textContent='✓ محفوظ في المفضلة';
}
function saveFavoriteGame(){
 const q=miniGameQuestions[miniGameIndex];if(!q)return;
 if(!favoriteGames.some(x=>x.question===q.q)){favoriteGames.unshift({question:q.q,answer:q.a[q.correct],why:q.why});favoriteGames=favoriteGames.slice(0,100);persistFavoriteList('bq_favorite_games',favoriteGames)}
 $('saveGameBtn').textContent='✓ اللعبة محفوظة';
 renderSavedCards('favoriteGamesList',favoriteGames.map(x=>({title:x.question,answer:x.answer+(x.why?' — '+x.why:'')})),'games');
}

function renderAdviceForLanguage(){
 const t=lang==='ar'?null:i18n[lang];const list=lang==='ar'?(activeAdvice==='wife'?wifeAdvice:husbandAdvice):(activeAdvice==='wife'?t.adviceW:t.adviceH);
 $('adviceList').innerHTML='';list.forEach((tip,i)=>{
  const d=document.createElement('div');d.className='advice-item';
  const p=document.createElement('p');p.textContent=(i+1)+'. '+tip;
  const save=document.createElement('button');save.type='button';save.className='save-tip-btn';save.dataset.saveTip='';save.dataset.tipAudience=activeAdvice;save.dataset.tipText=tip;
  save.textContent=favoriteTips.some(x=>x.text===tip&&x.audience===activeAdvice)?'✓ محفوظة':'♡ احفظ النصيحة';
  d.append(p,save);$('adviceList').append(d);
 });
 $('adviceModalTitle').textContent=activeAdvice==='wife'?languageText[lang].wifeAdvice:languageText[lang].husbandAdvice;
 $('husbandTips').classList.toggle('active',activeAdvice==='husband');$('wifeTips').classList.toggle('active',activeAdvice==='wife');
}
function applyTheme(){const dark=bqStorage.getItem('bq_theme')==='dark';document.body.classList.toggle('dark-mode',dark);$('themeToggle').textContent=dark?languageText[lang].day:languageText[lang].night}
function notificationCopy(){if(lang==='en')return 'A gentle reminder: a kind word can make someone’s day warmer. ♥';if(lang==='fr')return 'Un doux rappel : quelques mots bienveillants peuvent embellir la journée. ♥';return 'تذكير لطيف: كلمة طيبة قد تجعل يوم من تحب أجمل. ♥'}
let notificationTimer=null;
async function sendGentleNotification(){if(!('Notification'in window)||Notification.permission!=='granted')return;const last=Number(bqStorage.getItem('bq_last_notification')||0);if(Date.now()-last<86400000)return;const title=lang==='en'?'Between Two Hearts':lang==='fr'?'Entre deux cœurs':'بين قلبين';const options={body:notificationCopy(),icon:'./icon.svg',badge:'./icon.svg',tag:'bein-qalbein-daily',renotify:false};try{if(navigator.serviceWorker){const reg=await navigator.serviceWorker.ready;await reg.showNotification(title,options)}else new Notification(title,options);bqStorage.setItem('bq_last_notification',String(Date.now()))}catch(_){}}
function scheduleGentleNotification(){if(notificationTimer)clearInterval(notificationTimer);if(bqStorage.getItem('bq_notifications')!=='on')return;sendGentleNotification();notificationTimer=setInterval(sendGentleNotification,3600000)}
async function toggleGentleNotifications(){if(!('Notification'in window)){alert(lang==='en'?'Notifications are not supported by this browser.':lang==='fr'?'Les notifications ne sont pas prises en charge.':'هذا المتصفح لا يدعم الإشعارات.');return}if(bqStorage.getItem('bq_notifications')==='on'){bqStorage.setItem('bq_notifications','off');if(notificationTimer)clearInterval(notificationTimer);$('notifyToggle').textContent=languageText[lang].notifyOff;return}const permission=await Notification.requestPermission();if(permission!=='granted'){alert(languageText[lang].permissionDenied);return}bqStorage.setItem('bq_notifications','on');$('notifyToggle').textContent=languageText[lang].notifyOn;scheduleGentleNotification()}
function applyLanguage(){
 applyCardStudioLanguage();
 const t=languageText[lang]||languageText.ar;const ar=lang==='ar';
 document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';$('lang').value=lang;document.title=t.title;
 const set=(id,v)=>{const el=$(id);if(el)el.textContent=v};
 set('roleTitle',t.roleTitle);
 set('languageLabel',t.language);set('catTitle',t.catTitle);$('search').placeholder=t.search;set('heartTitle',t.heartTitle);set('shareBtn',t.share);set('favBtn',t.favAdd);set('newBtn',t.newMsg);set('copyBtn',t.copyMsg);set('favTitle',t.favorites);set('showFav',t.showFav);set('hideFav',t.hideFav);set('dailyTitle',t.daily);set('dailyKicker',t.dailyDesc);set('copyDaily',t.copyDaily);set('guideTitle',t.guide);set('guideKicker',t.guideDesc);set('husbandTips',t.husbandAdvice);set('wifeTips',t.wifeAdvice);set('hint',t.hint);set('appFooter',t.footer);set('appTagline',t.tagline);set('notifyNote',t.notifyNote);set('adviceHint',t.adviceHint);$('notifyToggle').textContent=bqStorage.getItem('bq_notifications')==='on'?t.notifyOn:t.notifyOff;$('themeToggle').textContent=bqStorage.getItem('bq_theme')==='dark'?t.day:t.night;
 const categoryTranslations=ar?null:i18n[lang];categories.forEach((c,i)=>{c._name=c._name||c.name;c._desc=c._desc||c.desc;c.name=ar?c._name:categoryTranslations.cats[i];c.desc=ar?c._desc:categoryTranslations.desc[i]});
 if(ar){Object.keys(messages).forEach(id=>messages[id]=originalMessagePools[id].slice())}
 else{const translatedLibrary=i18n[lang],endings=translatedClosings[lang]||[],extra=translatedBaseExpansions[lang]||[];Object.keys(messages).forEach((id,i)=>{const pool=(translatedLibrary.msgs[i]||translatedLibrary.msgs[0]).concat(extra[i]||[]);messages[id]=endings.length?pool.flatMap(base=>endings.map(ending=>base+' '+ending)):pool.slice()})}
 groupedRenderCats($('search').value);generate();$('dailyMessage').textContent=ar?dailyText():messages[selected][(new Date().getDate()*7)%messages[selected].length];renderAdviceForLanguage();showFavs();
}
$('lang').onchange=e=>{lang=e.target.value;try{bqStorage.setItem('bq_language',lang)}catch(_){}applyLanguage()};
$('themeToggle').onclick=()=>{const dark=!document.body.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',dark);try{bqStorage.setItem('bq_theme',dark?'dark':'light')}catch(_){}$('themeToggle').textContent=dark?languageText[lang].day:languageText[lang].night};$('notifyToggle').onclick=toggleGentleNotifications;
function openAdvice(which){activeAdvice=which;renderAdviceForLanguage();$('adviceModal').classList.remove('hidden');document.body.style.overflow='hidden'}
$('husbandTips').onclick=()=>openAdvice('husband');$('wifeTips').onclick=()=>openAdvice('wife');
$('closeAdvice').onclick=()=>{$('adviceModal').classList.add('hidden');document.body.style.overflow=''};
$('adviceModal').addEventListener('click',e=>{if(e.target===$('adviceModal'))$('closeAdvice').click()});
$('adviceList').addEventListener('click',e=>{const b=e.target.closest('[data-save-tip]');if(b)saveFavoriteTip(b.dataset.tipText,b.dataset.tipAudience)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('adviceModal').classList.contains('hidden'))$('closeAdvice').click()});
$('showFav').onclick=()=>{$('favorites').classList.remove('hidden');showFavs()};
$('hideFav').onclick=()=>$('favorites').classList.add('hidden');
$('shareBtn').onclick=async()=>{if(!current)return;const title=languageText[lang].title;if(navigator.share){try{await navigator.share({title,text:current})}catch(_){}}else copyText(current)};
saveFavs=function(){try{bqStorage.setItem('bq_favorites',JSON.stringify(favs))}catch(e){alert(lang==='en'?'Could not save in browser storage.':lang==='fr'?'Impossible d’enregistrer dans le navigateur.':'تعذر الحفظ في مساحة المتصفح.')}};
copyText=async function(value){
 try{await navigator.clipboard.writeText(value);alert(languageText[lang].copyDone)}
 catch(e){const t=document.createElement('textarea');t.value=value;document.body.append(t);t.select();document.execCommand('copy');t.remove();alert(languageText[lang].copyDone)}
};
$('favBtn').onclick=()=>{
 if(!current)return;
 const added=!favs.includes(current);
 if(added){favs.unshift(current);saveFavs()}
 $('favBtn').textContent=added?languageText[lang].saved:languageText[lang].already;
 $('favorites').classList.remove('hidden');showFavs();
 setTimeout(()=>{$('favBtn').textContent=languageText[lang].favAdd},1600);
};


/* V27 navigation, category grouping, history and private notes */

let inlineMessagePanel=null;
function prepareInlineMessage(){
 if(inlineMessagePanel)return inlineMessagePanel;
 const source=$('message').closest('section');
 inlineMessagePanel=document.createElement('div');
 inlineMessagePanel.id='inlineMessagePanel';
 inlineMessagePanel.className='inline-message-panel';
 ['heartTitle'].forEach(id=>inlineMessagePanel.append($(id)));
 inlineMessagePanel.append($('message').closest('.message-card'));
 inlineMessagePanel.append(document.querySelector('.actions'));
 inlineMessagePanel.append($('copyBtn'));
 source.hidden=true;
 source.dataset.messageMoved='true';
 return inlineMessagePanel;
}
function groupedRenderCats(filter=''){
 const host=$('cats');
 const inline=inlineMessagePanel;
 // Do not detach the live message node during initial rendering; generate() needs it in the DOM.
 const messageWasOpen=!!inline?.parentElement?.classList.contains('category-item');
 host.innerHTML='';
 const q=filter.trim().toLocaleLowerCase(lang);
 let count=0,selectedItem=null;
 categoryGroups.forEach(group=>{
  const matches=categories.filter(c=>group.ids.includes(c.id)&&(!q||(c.name+' '+c.desc).toLocaleLowerCase(lang).includes(q)));
  if(!matches.length)return;
  const title=document.createElement('div');title.className='category-group-title';title.textContent=group.name[lang]||group.name.ar;host.append(title);
  matches.forEach(c=>{
   count++;
   const item=document.createElement('div');item.className='category-item';item.dataset.categoryId=c.id;
   const b=document.createElement('button');b.type='button';b.className='cat'+(c.id===selected?' active':'');
   b.setAttribute('aria-expanded',String(messageWasOpen&&c.id===selected));
   b.innerHTML='<span class="badge">'+c.icon+'</span><span>'+c.name+'<small>'+c.desc+'</small></span>';
   item.append(b);host.append(item);if(c.id===selected)selectedItem=item;
  });
 });
 if(!count){const p=document.createElement('p');p.className='empty';p.textContent=languageText[lang]?.noCats||'لا توجد تصنيفات مطابقة لبحثك.';host.append(p)}
 if(messageWasOpen&&selectedItem){selectedItem.append(inline);inline.hidden=false;inline.style.display='block'}
}
function goPage(page){
 const allowed=['home','library','favorites','learn','games','channels','services'];
 if(!allowed.includes(page))page='home';
 const shortcutStrip=document.querySelector('.home-top-shortcuts');
 if(shortcutStrip){shortcutStrip.hidden=page!=='home';shortcutStrip.style.display=page==='home'?'':'none';}
 if((page==='library'||page==='favorites')&&typeof window.openHomeShortcut==='function'){
  document.body.dataset.currentPage=page;
  document.querySelectorAll('.page-section').forEach(section=>{
   const active=section.dataset.page==='home';
   section.classList.toggle('active-page',active);
   section.setAttribute('aria-hidden',String(!active));
   section.inert=!active;
  });
  document.querySelectorAll('#topNav button[data-go]').forEach(button=>{
   const active=button.dataset.go===page;
   button.classList.toggle('active',active);
   if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
  });
  const subnav=$('favoritesSubnav');if(subnav)subnav.hidden=page!=='favorites';
  window.openHomeShortcut(page);
  const host=$('homeShortcutContent');if(host)host.hidden=false;
  try{bqStorage.setItem('bq_last_page',page)}catch(_){}
  window.scrollTo({top:0,behavior:'auto'});
  return;
 }

 document.body.dataset.currentPage=page;
 if(page==='home'&&typeof window.resetHomeShortcutView==='function')window.resetHomeShortcutView();
 document.querySelectorAll('.page-section').forEach(section=>{
  const active=section.dataset.page===page;
  section.classList.toggle('active-page',active);
  section.setAttribute('aria-hidden',String(!active));
  section.inert=!active;
 });
 document.querySelectorAll('#topNav button[data-go]').forEach(button=>{
  const active=button.dataset.go===page;
  button.classList.toggle('active',active);
  if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
 });
 $('favoritesSubnav').hidden=page!=='favorites';
 try{bqStorage.setItem('bq_last_page',page)}catch(_){}
 window.scrollTo({top:0,behavior:'auto'});
 if(page==='favorites'){setFavoriteTab(activeFavoriteTab);renderHistory();renderCustomNotes()}
 if(page==='games')setTimeout(renderMiniGame,0);
 if(page==='settings')updateStorageStatus();
}
/* Bottom navigation is handled by the single delegated router below. */
function rememberMessage(value){
 if(!value)return;let list=[];try{list=JSON.parse(bqStorage.getItem('bq_recent_messages')||'[]')}catch(_){}
 list=[value,...list.filter(x=>x!==value)].slice(0,3);
 try{bqStorage.setItem('bq_recent_messages',JSON.stringify(list))}catch(_){}
}
function renderHistory(){
 let list=[];try{const stored=JSON.parse(bqStorage.getItem('bq_recent_messages')||'[]');list=Array.isArray(stored)?stored.filter(x=>typeof x==='string').slice(0,3):[]}catch(_){}
 try{bqStorage.setItem('bq_recent_messages',JSON.stringify(list))}catch(_){}
 const host=$('historyList');host.innerHTML='';
 if(!list.length){host.innerHTML='<p class="empty">'+(lang==='en'?'No recent messages yet.':lang==='fr'?'Aucun message récent.':'لا توجد رسائل حديثة بعد.')+'</p>';return}
 list.forEach(value=>{
  const d=document.createElement('div');d.className='history-item';const p=document.createElement('div');p.className='history-message';p.textContent=value;
  const actions=document.createElement('div');actions.className='history-actions';
  const b=document.createElement('button');b.type='button';b.textContent=lang==='en'?'Copy':lang==='fr'?'Copier':'نسخ';b.onclick=()=>copyText(value);
  const del=document.createElement('button');del.type='button';del.className='history-delete';del.textContent=lang==='en'?'Delete':lang==='fr'?'Supprimer':'حذف';del.onclick=()=>{bqStorage.setItem('bq_recent_messages',JSON.stringify(list.filter(x=>x!==value)));renderHistory()};
  let startX=0,startY=0;d.addEventListener('touchstart',e=>{const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY},{passive:true});
  d.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY;if(Math.abs(dx)>75&&Math.abs(dx)>Math.abs(dy)*1.3){bqStorage.setItem('bq_recent_messages',JSON.stringify(list.filter(x=>x!==value)));renderHistory()}},{passive:true});
  actions.append(b,del);d.append(p,actions);host.append(d);
 });
}
function renderCustomNotes(){
 let list=[];try{const stored=JSON.parse(bqStorage.getItem('bq_custom_notes')||'[]');list=Array.isArray(stored)?stored.filter(x=>typeof x==='string').slice(0,100):[]}catch(_){}
 const host=$('customList');host.innerHTML='';
 if(!list.length){host.innerHTML='<p class="empty">'+(lang==='en'?'Your private messages will appear here.':lang==='fr'?'Vos messages privés apparaîtront ici.':'ستظهر رسائلك الخاصة هنا.')+'</p>';return}
 list.forEach((value,index)=>{const d=document.createElement('div');d.className='custom-item';const p=document.createElement('div');p.textContent=value;const cp=document.createElement('button');cp.textContent=lang==='en'?'Copy':lang==='fr'?'Copier':'نسخ';cp.onclick=()=>copyText(value);const del=document.createElement('button');del.textContent=languageText[lang].delete;del.onclick=()=>{list.splice(index,1);bqStorage.setItem('bq_custom_notes',JSON.stringify(list));renderCustomNotes()};d.append(p,cp,del);host.append(d)})
}
$('saveCustom').onclick=()=>{
 const value=$('customInput').value.trim();if(!value)return;
 let list=[];try{const stored=JSON.parse(bqStorage.getItem('bq_custom_notes')||'[]');list=Array.isArray(stored)?stored.filter(x=>typeof x==='string'):[]}catch(_){}
 list.unshift(value);
 try{bqStorage.setItem('bq_custom_notes',JSON.stringify(list.slice(0,100)))}
 catch(_){alert(lang==='en'?'Could not save. Browser storage may be full.':'تعذر الحفظ؛ قد تكون مساحة المتصفح ممتلئة.');return}
 $('customInput').value='';renderCustomNotes();
 alert(lang==='en'?'Your message was saved.':lang==='fr'?'Votre message a été enregistré.':'تم حفظ رسالتك الخاصة ✓')
};
$('surpriseBtn').onclick=()=>{const ids=categories.map(c=>c.id);selected=ids[Math.floor(Math.random()*ids.length)];groupedRenderCats($('search').value);generate();$('message').scrollIntoView({behavior:'auto',block:'center'})};
/* V34 smart message shortcuts */

function renderSmartChips(){
 const host=$('smartChips');if(!host)return;host.innerHTML='';
 const keys=['thanks','miss','sorry','support','sad','upset','dua'];
 keys.forEach(id=>{const b=document.createElement('button');b.type='button';b.dataset.pick=id;b.textContent=smartNames[lang][id];host.append(b)});
 const title=$('smartTitle');if(title)title.textContent=lang==='en'?'What would you like to say today?':lang==='fr'?'Que souhaitez-vous lui dire aujourd’hui ?':'ماذا تريد أن تقول اليوم؟';
}
/* Card Atelier — vector-rendered, offline, high-resolution card studio. */
const cardThemes={
 royal:{paper:'#fff9ef',paper2:'#f5e8d8',ink:'#52172f',muted:'#85566a',gold:'#b88b45',accent:'#7b1e43',edge:'#ead5ae'},
 rose:{paper:'#fff5f6',paper2:'#f5dce4',ink:'#63283f',muted:'#98677b',gold:'#c49a60',accent:'#a94368',edge:'#edc6d2'},
 noor:{paper:'#fcf8ec',paper2:'#e9dfc7',ink:'#403526',muted:'#81704e',gold:'#a98442',accent:'#6e5934',edge:'#d8c69b'},
 midnight:{paper:'#251728',paper2:'#48263d',ink:'#fff1e4',muted:'#e0c3c8',gold:'#d7b36e',accent:'#a85a78',edge:'#8c6376'},
 minimal:{paper:'#fffefd',paper2:'#f4efeb',ink:'#39232c',muted:'#806d72',gold:'#bd9a65',accent:'#70233f',edge:'#e6d9d1'},
 mosaic:{paper:'#fbf4e9',paper2:'#eadcc8',ink:'#482b32',muted:'#80606a',gold:'#bd9252',accent:'#762d4a',edge:'#d9c09a'},
 velvet:{paper:'#4b1733',paper2:'#241525',ink:'#fff4e8',muted:'#e9cad4',gold:'#e1c17c',accent:'#bd718c',edge:'#b38a61'},
 sand:{paper:'#f7ead8',paper2:'#ead0b8',ink:'#57352d',muted:'#906b5c',gold:'#b18a50',accent:'#984d48',edge:'#d5b18e'},
 pearl:{paper:'#fffefa',paper2:'#f2eee6',ink:'#40313a',muted:'#887780',gold:'#c7a96b',accent:'#7b4358',edge:'#e8ddcb'},
 emerald:{paper:'#f4f2e8',paper2:'#dce4d8',ink:'#203b32',muted:'#60776c',gold:'#c6a45e',accent:'#315c4c',edge:'#b7c5b5'},
 copper:{paper:'#fff4e9',paper2:'#ecd3c0',ink:'#56332d',muted:'#956b5b',gold:'#bd8053',accent:'#98543e',edge:'#dfb89d'},
 ink:{paper:'#182432',paper2:'#26384a',ink:'#f8f0df',muted:'#d4c5aa',gold:'#d6b66e',accent:'#e3c98c',edge:'#738296'}
};
const cardNames={
 ar:{royal:'ملكي مخملي',rose:'وردي رقيق',noor:'محراب النور',midnight:'ليل فاخر',minimal:'أناقة هادئة',mosaic:'فسيفساء هندسية',velvet:'عنابي ملكي',sand:'دفء الورق',pearl:'لؤلؤة عاجية',emerald:'زمرد وذهب',copper:'نحاس دافئ',ink:'حبر ليلي'},
 en:{royal:'Royal velvet',rose:'Soft rose',noor:'Noor arch',midnight:'Midnight',minimal:'Quiet minimal',mosaic:'Geometric mosaic',velvet:'Burgundy',sand:'Warm paper',pearl:'Ivory pearl',emerald:'Emerald & gold',copper:'Warm copper',ink:'Midnight ink'},
 fr:{royal:'Velours royal',rose:'Rose tendre',noor:'Arche lumineuse',midnight:'Nuit élégante',minimal:'Minimal chic',mosaic:'Mosaïque',velvet:'Bordeaux',sand:'Papier chaud',pearl:'Perle ivoire',emerald:'Émeraude et or',copper:'Cuivre chaud',ink:'Encre de nuit'}
};
let activeCardTheme='royal',activeCardFormat='portrait',cardPreviousFocus=null;
const cardCopy={
 ar:{title:'استوديو البطاقات',sub:'اصنع بطاقة تليق بالكلمات التي اخترتها',text:'نص البطاقة',design:'اختر التصميم',format:'مقاس البطاقة',portrait:'عمودي أنيق',square:'مربع للمشاركة',story:'قصة هاتف',brand:'إظهار توقيع بين قلبين',download:'حمّل البطاقة بدقة فائقة',close:'إغلاق',preview:'معاينة مباشرة',hint:'تُصنع البطاقة داخل جهازك دون إرسال رسالتك إلى أي خادم.',footer:'بين قلبين · كلمات من القلب'},
 en:{title:'Card Atelier',sub:'Craft a card worthy of your words',text:'Card message',design:'Choose a design',format:'Card format',portrait:'Elegant portrait',square:'Square share',story:'Phone story',brand:'Show Between Two Hearts signature',download:'Download ultra-high resolution',close:'Close',preview:'Live preview',hint:'Your card is rendered on this device. Your message is not uploaded.',footer:'Between Two Hearts · From the heart'},
 fr:{title:'Atelier de cartes',sub:'Une carte à la hauteur de vos mots',text:'Texte de la carte',design:'Choisir un design',format:'Format de la carte',portrait:'Portrait élégant',square:'Carré à partager',story:'Story mobile',brand:'Afficher la signature Entre deux cœurs',download:'Télécharger en très haute résolution',close:'Fermer',preview:'Aperçu en direct',hint:'La carte est créée sur cet appareil. Votre message n’est pas envoyé.',footer:'Entre deux cœurs · Du cœur'}
};
function cardText(key){return (cardCopy[lang]||cardCopy.ar)[key]}
function openCardStudio(){
 if(!current){alert(lang==='en'?'Choose a message first.':lang==='fr'?'Choisissez d’abord un message.':'اختر رسالة أولاً.');return}
 const modal=$('cardStudio');if(!modal)return;
 cardPreviousFocus=document.activeElement;
 $('cardMessageInput').value=current.slice(0,900);
 updateCardMessageMeta();
 $('cardDesigns').querySelectorAll('[data-card-style]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cardStyle===activeCardTheme)));
 $('cardFormat').value=activeCardFormat;$('cardBrandToggle').checked=true;
 applyCardStudioLanguage();
 modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
 renderCardPreview();$('cardMessageInput').focus();
}
function closeCardStudio(){
 const modal=$('cardStudio');if(!modal)return;
 modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');
 if(cardPreviousFocus?.focus)cardPreviousFocus.focus();
}
function applyCardStudioLanguage(){
 const modal=$('cardStudio');if(!modal)return;
 const labels=cardCopy[lang]||cardCopy.ar;
 $('cardStudioTitle').textContent=labels.title;$('cardStudioSub').textContent=labels.sub;
 $('cardTextLabel').textContent=labels.text;$('cardDesignLabel').textContent=labels.design;
 $('cardFormatLabel').textContent=labels.format;$('cardBrandLabel').textContent=labels.brand;
 $('cardDownload').textContent=labels.download;$('cardClose').textContent=labels.close;
 $('cardPreviewLabel').textContent=labels.preview;$('cardPrivacyHint').textContent=labels.hint;
 $('cardFormat').options[0].text=labels.portrait;$('cardFormat').options[1].text=labels.square;$('cardFormat').options[2].text=labels.story;
 $('cardDesigns').querySelectorAll('[data-card-style]').forEach(button=>{button.querySelector('span').textContent=(cardNames[lang]||cardNames.ar)[button.dataset.cardStyle]});
 $('cardDesignCount').textContent=lang==='en'?'12 crafted styles':lang==='fr'?'12 styles créatifs':'12 تصميماً فنياً';
 $('cardSmartSuggest').textContent=lang==='en'?'✦ Suggest a fitting design':lang==='fr'?'✦ Suggérer un style adapté':'✦ اقترح التصميم الأنسب';
}
function cardRoundRect(ctx,x,y,w,h,r){
 const radius=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+radius,y);ctx.arcTo(x+w,y,x+w,y+h,radius);ctx.arcTo(x+w,y+h,x,y+h,radius);ctx.arcTo(x,y+h,x,y,radius);ctx.arcTo(x,y,x+w,y,radius);ctx.closePath();
}
function cardRosette(ctx,x,y,r,color){
 ctx.save();ctx.translate(x,y);ctx.strokeStyle=color;ctx.lineWidth=2.2;ctx.beginPath();
 for(let i=0;i<16;i++){const angle=i*Math.PI/8,rr=i%2?r*.72:r,px=Math.cos(angle)*rr,py=Math.sin(angle)*rr;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}
 ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(0,0,r*.28,0,Math.PI*2);ctx.stroke();ctx.restore();
}
function cardWrap(ctx,text,maxWidth,font){
 ctx.font=font;const result=[],paragraphs=String(text||'').replace(/\r/g,'').split('\n');
 const splitGraphemes=word=>typeof Intl!=='undefined'&&Intl.Segmenter?[...new Intl.Segmenter(lang==='ar'?'ar':lang,{granularity:'grapheme'}).segment(word)].map(x=>x.segment):Array.from(word);
 paragraphs.forEach((paragraph,index)=>{
  const words=paragraph.trim().split(/\s+/u).filter(Boolean);let line='';
  for(const word of words){
   const pieces=ctx.measureText(word).width>maxWidth?splitGraphemes(word):[word];
   for(const piece of pieces){const candidate=line?line+' '+piece:piece;if(ctx.measureText(candidate).width>maxWidth&&line){result.push(line);line=piece}else line=candidate}
  }
  result.push(line);if(index<paragraphs.length-1)result.push('');
 });
 return result;
}
function drawCardArtwork(canvas,scale=1){
 const text=$('cardMessageInput').value.trim(),theme=cardThemes[activeCardTheme]||cardThemes.royal;
 if(!text)throw new Error('A card message is required');
 const format=activeCardFormat,w=1080,baseH=format==='square'?1080:format==='story'?1920:1350;
 const top=activeCardTheme==='noor'||activeCardTheme==='emerald'?390:330,maxWidth=790;
 canvas.width=w*scale;canvas.height=baseH*scale;
 let ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
 ctx.setTransform(scale,0,0,scale,0,0);
 const isAr=lang==='ar',direction=isAr?'rtl':'ltr',brand=$('cardBrandToggle').checked;
 let size=format==='story'?55:52,lines=[],lineHeight=0;
 const fit=()=>{
  const arabicText=/[\\u0600-\\u06FF]/u.test(text);
  const cardFont=arabicText?'"Amiri", "Noto Naskh Arabic", serif':'"Playfair Display", Georgia, serif';
  lines=cardWrap(ctx,text,maxWidth,'700 '+size+'px '+cardFont);
  lineHeight=size*1.72;
  while(lines.length*lineHeight>baseH-top-300&&size>36){size-=2;lines=cardWrap(ctx,text,maxWidth,'700 '+size+'px '+cardFont);lineHeight=size*1.78}
 };
 fit();
 const contentHeight=lines.reduce((sum,line)=>sum+(line===''?lineHeight*.52:lineHeight),0);
 const height=Math.max(baseH,Math.min(2700,top+contentHeight+310));
 if(height!==baseH){canvas.height=height*scale;ctx=canvas.getContext('2d');ctx.setTransform(scale,0,0,scale,0,0)}
 const h=height,gradient=ctx.createLinearGradient(0,0,w,h);
 gradient.addColorStop(0,theme.paper);gradient.addColorStop(.52,theme.paper2);gradient.addColorStop(1,theme.paper);
 ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
 ctx.save();ctx.globalAlpha=.035;ctx.fillStyle=theme.ink;
 for(let y=22;y<h;y+=34)for(let x=20;x<w;x+=41)ctx.fillRect(x+((y*7+x*3)%13),y,1.3,1.3);
 ctx.restore();
 if(['midnight','velvet','ink'].includes(activeCardTheme)){
  const glow=ctx.createRadialGradient(540,210,20,540,210,720);glow.addColorStop(0,'rgba(255,220,185,.14)');glow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
 }
 ctx.save();
 if(activeCardTheme==='minimal'||activeCardTheme==='pearl'){
  ctx.strokeStyle=theme.edge;ctx.lineWidth=2;cardRoundRect(ctx,54,54,w-108,h-108,24);ctx.stroke();
  ctx.strokeStyle=theme.gold;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(300,285);ctx.lineTo(780,285);ctx.stroke();
 }else if(activeCardTheme==='noor'||activeCardTheme==='emerald'){
  ctx.strokeStyle=theme.gold;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(260,top);ctx.lineTo(260,245);ctx.bezierCurveTo(260,70,820,70,820,245);ctx.lineTo(820,top);ctx.stroke();
  ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(286,top);ctx.lineTo(286,250);ctx.bezierCurveTo(286,112,794,112,794,250);ctx.lineTo(794,top);ctx.stroke();cardRosette(ctx,540,180,22,theme.gold);
 }else if(activeCardTheme==='mosaic'||activeCardTheme==='ink'){
  ctx.strokeStyle=theme.gold;ctx.lineWidth=3;cardRoundRect(ctx,42,42,w-84,h-84,12);ctx.stroke();ctx.globalAlpha=.42;
  for(let x=125;x<=955;x+=92){cardRosette(ctx,x,255,18,theme.gold);cardRosette(ctx,x,h-255,18,theme.gold)}
 }else if(activeCardTheme==='rose'||activeCardTheme==='copper'){
  ctx.strokeStyle=theme.edge;ctx.lineWidth=3;
  for(let i=0;i<5;i++){const y=210+i*25;ctx.beginPath();ctx.moveTo(105,y);ctx.bezierCurveTo(230,y-65,310,y+65,420,y);ctx.stroke();ctx.beginPath();ctx.moveTo(660,y);ctx.bezierCurveTo(770,y-65,850,y+65,975,y);ctx.stroke()}
  if(activeCardTheme==='copper'){ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(100,h-250);ctx.lineTo(300,h-430);ctx.lineTo(430,h-300);ctx.stroke()}
 }else if(activeCardTheme==='midnight'){
  ctx.fillStyle=theme.accent;ctx.fillRect(78,78,16,h-156);ctx.strokeStyle=theme.gold;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(130,100);ctx.lineTo(130,h-100);ctx.stroke();
 }else{
  ctx.strokeStyle=theme.gold;ctx.lineWidth=4;cardRoundRect(ctx,38,38,w-76,h-76,34);ctx.stroke();ctx.strokeStyle=theme.edge;ctx.lineWidth=2;cardRoundRect(ctx,58,58,w-116,h-116,27);ctx.stroke();
  [[105,105],[w-105,105],[105,h-105],[w-105,h-105]].forEach(([x,y])=>cardRosette(ctx,x,y,27,theme.gold));
 }
 ctx.restore();
 if(activeCardTheme==='velvet'){
  ctx.fillStyle='rgba(255,248,237,.96)';cardRoundRect(ctx,105,320,870,h-640,26);ctx.fill();ctx.strokeStyle=theme.gold;ctx.lineWidth=2;cardRoundRect(ctx,125,340,830,h-680,19);ctx.stroke();
 }
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction=direction;ctx.fillStyle=theme.accent;ctx.font=isAr?'700 78px "Amiri", Georgia, serif':'600 62px "Playfair Display", Georgia, serif';
 ctx.fillText(isAr?'بين قلبين':lang==='fr'?'Entre deux cœurs':'Between Two Hearts',540,170,820);
 ctx.fillStyle=theme.gold;ctx.font='30px Georgia, serif';ctx.fillText('✦  ❦  ✦',540,238);
 const areaTop=activeCardTheme==='noor'||activeCardTheme==='emerald'?top+10:activeCardTheme==='velvet'?390:315,areaBottom=h-260,blockHeight=contentHeight;
 let y=Math.max(areaTop+lineHeight,(areaTop+areaBottom-blockHeight)/2+lineHeight/2);
 ctx.fillStyle=activeCardTheme==='velvet'?'#4b1733':theme.ink;ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction=direction;
 ctx.font='600 '+size+'px system-ui, Tahoma, "Noto Naskh Arabic", serif';
 lines.forEach(line=>{if(line===''){y+=lineHeight*.52;return}ctx.fillText(line,540,y,maxWidth);y+=lineHeight});
 const sealY=h-155;ctx.strokeStyle=theme.gold;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(300,sealY-48);ctx.lineTo(780,sealY-48);ctx.stroke();cardRosette(ctx,540,sealY,22,theme.gold);
 if(brand){ctx.fillStyle=theme.muted;ctx.font=isAr?'700 30px "Amiri", Georgia, serif':'500 24px "Playfair Display", Georgia, serif';ctx.fillText(cardText('footer'),540,h-100,820)}
 return {width:w,height:h,lines:lines.length,fontSize:size,overflow:contentHeight>areaBottom-areaTop};
}
function renderCardPreview(){
 const canvas=$('cardPreview');if(!canvas)return;
 try{
  const result=drawCardArtwork(canvas,1);canvas.setAttribute('aria-label',cardText('preview')+' · '+result.width+' × '+result.height);
  $('cardOverflowNote').textContent=result.fontSize<37?(lang==='en'?'Long message: font size was reduced to fit.':lang==='fr'?'Message long : la taille du texte a été réduite.':'الرسالة طويلة؛ صُغّر الخط تلقائياً لتناسب البطاقة.'): '';
  $('cardDownload').disabled=false;
 }catch(error){$('cardDownload').disabled=true;$('cardOverflowNote').textContent=lang==='en'?'Preview could not be rendered.':lang==='fr'?'Impossible de créer l’aperçu.':'تعذر إنشاء المعاينة.'}
}
async function downloadMessageCard(){
 const button=$('cardDownload'),oldText=button.textContent;button.disabled=true;
 button.textContent=lang==='en'?'Preparing…':lang==='fr'?'Préparation…':'جارٍ تجهيز البطاقة…';
 try{
  if(document.fonts?.ready)await document.fonts.ready;
  const canvas=document.createElement('canvas');drawCardArtwork(canvas,2);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('PNG export failed');
  const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='bein-qalbein-card-'+activeCardTheme+'.png';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
 }catch(error){alert(lang==='en'?'The card could not be exported. Please try again.':lang==='fr'?'La carte n’a pas pu être exportée. Réessayez.':'تعذر تصدير البطاقة. حاول مرة أخرى.')}
 finally{button.disabled=false;button.textContent=oldText}
}
$('cardBtn').onclick=openCardStudio;
$('cardClose').onclick=closeCardStudio;
$('cardDownload').onclick=downloadMessageCard;
function updateCardMessageMeta(){
 const input=$('cardMessageInput'),count=input.value.length;
 $('cardCharCount').textContent=count+' / 900';$('cardCharCount').classList.toggle('near-limit',count>780);
 $('cardSmartSuggest').disabled=!input.value.trim();
}
function suggestCardDesign(){
 const text=$('cardMessageInput').value.toLocaleLowerCase();
 const rules=[
  {id:'noor',words:['دعاء','الله','اللهم','بركة','رحمة','آمين','خير']},
  {id:'rose',words:['آسف','أعتذر','سامح','زعل','جرحت','sorry','pardon']},
  {id:'midnight',words:['أشتاق','اشتقت','بعيد','غياب','miss','manque']},
  {id:'emerald',words:['شكراً','شكرا','أقدر','أقدّر','امتنان','تعبك','جهدك','merci','thank']},
  {id:'pearl',words:['أحب','أحبك','مودة','قلبي','حياتي','love','amour']},
  {id:'sand',words:['صباح','مساء','يومك','طمأنينة','راحة']}
 ];
 const match=rules.find(rule=>rule.words.some(word=>text.includes(word)));
 activeCardTheme=match?.id||'royal';
 $('cardDesigns').querySelectorAll('[data-card-style]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cardStyle===activeCardTheme)));
 renderCardPreview();
 $('cardOverflowNote').textContent=lang==='en'?'Suggested style: '+cardNames.en[activeCardTheme]:lang==='fr'?'Style suggéré : '+cardNames.fr[activeCardTheme]:'التصميم المقترح: '+cardNames.ar[activeCardTheme];
}
$('cardMessageInput').addEventListener('input',()=>{updateCardMessageMeta();renderCardPreview()});
$('cardSmartSuggest').addEventListener('click',suggestCardDesign);
$('cardFormat').addEventListener('change',event=>{activeCardFormat=event.target.value;renderCardPreview()});
$('cardBrandToggle').addEventListener('change',renderCardPreview);
$('cardDesigns').addEventListener('click',event=>{
 const button=event.target.closest('[data-card-style]');if(!button)return;
 activeCardTheme=button.dataset.cardStyle;
 $('cardDesigns').querySelectorAll('[data-card-style]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 renderCardPreview();
});
$('cardStudio').addEventListener('click',event=>{if(event.target===$('cardStudio'))closeCardStudio()});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&!$('cardStudio').classList.contains('hidden'))closeCardStudio();
 if(event.key==='Tab'&&!$('cardStudio').classList.contains('hidden')){
  const focusable=[...$('cardStudio').querySelectorAll('button:not(:disabled),textarea,select,input')].filter(el=>!el.hidden);
  if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 }
});

const originalGenerate=generate;
generate=function(){originalGenerate();rememberMessage(current)};
const originalApplyLanguage=applyLanguage;

applyLanguage=function(){originalApplyLanguage();groupedRenderCats($('search').value);renderHistory();renderCustomNotes();renderSmartChips();const labels={ar:['الرئيسية','المفضلة','الدليل','الإعدادات','الإعدادات','فاجئني برسالة','رسائلك الخاصة','آخر الرسائل','اكتب رسالة خاصة بك...','حفظ رسالتي'],en:['Home','Favorites','Guide','Settings','Settings','Surprise me','My private messages','Recent messages','Write your own message...','Save my message'],fr:['Accueil','Favoris','Guide','Paramètres','Paramètres','Surprenez-moi','Mes messages privés','Messages récents','Écrivez votre message...','Enregistrer']};const x=labels[lang]||labels.ar;[['navHome',x[0]],['navFavorites',x[1]],['navGuide',x[2]],['settingsTitleText',x[4]],['surpriseBtn',x[5]],['customTitle',x[6]],['historyTitle',x[7]]].forEach(([id,value])=>{const el=$(id);if(el)el.textContent=value});$('customInput').placeholder=x[8];$('saveCustom').textContent=x[9]};
// Initial routing runs once, after the shortcut controller has initialized.
renderSmartChips();

applyLanguage();applyTheme();updateStorageStatus();if(bqStorage.getItem('bq_notifications')==='on')scheduleGentleNotification();
if('serviceWorker' in navigator)window.addEventListener('load',()=>{const register=()=>navigator.serviceWorker.register('./sw.js').catch(()=>{});if('requestIdleCallback' in window)requestIdleCallback(register,{timeout:2500});else setTimeout(register,1200)});

/* V35 complete feature suite: builder, repair guide, organization, privacy and backup */



function buildCustomMessage(){
 const pool=builderCopy[lang][$('builderFeeling').value]||builderCopy[lang].love;
 let text=pool[Math.floor(Math.random()*pool.length)];
 const style=$('builderStyle').value;
 if(style==='short')text=text.split(/[.!؟]/)[0]+'.';
 if(style==='deep')text+=' '+(lang==='ar'?'فالمودة تظهر في حسن القول وصدق الفعل، وأسأل الله أن يديم بيننا الخير.':lang==='fr'?'La tendresse se voit dans les paroles et les actes sincères.':'Care is shown through kind words and sincere actions.');
 $('builtMessage').value=text;
}
function showRescue(){
 const k=$('rescueSituation').value;const locale=rescueText[lang];let body=locale[k]||locale.argument;
 if(k==='argument')body+='\n\n'+(locale.line||'');
 if(lang==='en'&&k!=='argument')body+='\n\nAvoid blame and threats. Agree on one respectful next step.';
 if(lang==='fr'&&k!=='argument')body+='\n\nÉvitez les reproches et les menaces. Convenez d’une prochaine étape respectueuse.';
 $('rescueResult').textContent=body;
}
function renderDailyChallenge(){
 const list=challenges[lang]||challenges.ar;
 const now=new Date(),day=now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate();
 $('challengeTask').textContent=list[day%list.length];
}
function nextKindness(){
 const list=challenges[lang]||challenges.ar,currentTask=$('challengeTask').textContent;
 let index=Math.floor(Math.random()*list.length);
 if(list.length>1&&list[index]===currentTask)index=(index+1)%list.length;
 $('challengeTask').textContent=list[index];
}
$('newChallenge').onclick=nextKindness;renderDailyChallenge();showRescue();
let favFolders={};try{const savedFolders=JSON.parse(bqStorage.getItem('bq_favorite_folders')||'{}');favFolders=savedFolders&&typeof savedFolders==='object'&&!Array.isArray(savedFolders)?savedFolders:{}}catch(_){}
const oldShowFavs=showFavs;
showFavs=function(){oldShowFavs();const chosen=$('favoriteFolder')?.value||'all';$('favorites').querySelectorAll('.favitem').forEach((node,i)=>{const value=favs[i];const folder=favFolders[value]||'love';node.style.display=chosen==='all'||chosen===folder?'':'none'})};
$('favoriteFolder').onchange=showFavs;
$('assignFolder').onclick=()=>{if(!current||!favs.includes(current)){alert(lang==='ar'?'أضف الرسالة إلى المفضلة أولاً.':'Save this message to favorites first.');return}favFolders[current]=$('favoriteFolder').value==='all'?'love':$('favoriteFolder').value;bqStorage.setItem('bq_favorite_folders',JSON.stringify(favFolders));showFavs()};
const backupKeys=['bq_role','bq_favorites','bq_favorite_tips','bq_favorite_books','bq_favorite_games','bq_language','bq_theme','bq_recent_messages','bq_custom_notes','bq_notifications','bq_last_notification','bq_favorite_folders','bq_font_scale','bq_palette','bq_custom_color','bq_ai_language','bq_ai_language_manual'];
function validBackupValue(key,raw){
 if(typeof raw!=='string'||raw.length>1500000)return false;
 if(key==='bq_role')return ['husband','wife'].includes(raw);
 if(key==='bq_language')return ['ar','en','fr'].includes(raw);
 if(key==='bq_ai_language')return ['العربية','الإنجليزية','الفرنسية'].includes(raw);
 if(key==='bq_ai_language_manual')return ['0','1'].includes(raw);
 if(key==='bq_theme')return ['dark','light'].includes(raw);
 if(key==='bq_notifications')return ['on','off'].includes(raw);
 if(key==='bq_palette')return ['blue','rose','royal','night','custom'].includes(raw);
 if(key==='bq_custom_color')return /^#[0-9a-f]{6}$/i.test(raw);
 if(key==='bq_font_scale'){const n=Number(raw);return Number.isFinite(n)&&n>=0.9&&n<=1.2}
 if(key==='bq_last_notification')return raw===''||(/^\d{1,16}$/.test(raw)&&Number(raw)>=0);
 let value;try{value=JSON.parse(raw)}catch(_){return false}
 if(key==='bq_favorites')return Array.isArray(value)&&value.length<=1000&&value.every(x=>typeof x==='string'&&x.length<=10000);
 if(key==='bq_favorite_tips')return Array.isArray(value)&&value.length<=500&&value.every(x=>x&&typeof x.text==='string'&&x.text.length<=5000&&['husband','wife'].includes(x.audience));
 if(key==='bq_favorite_books')return Array.isArray(value)&&value.length<=100&&value.every(x=>x&&typeof x.id==='string'&&typeof x.title==='string'&&typeof x.summary==='string');
 if(key==='bq_favorite_games')return Array.isArray(value)&&value.length<=100&&value.every(x=>x&&typeof x.question==='string'&&typeof x.answer==='string');

 if(key==='bq_recent_messages')return Array.isArray(value)&&value.length<=12&&value.every(x=>typeof x==='string'&&x.length<=1800);
 if(key==='bq_custom_notes')return Array.isArray(value)&&value.length<=100&&value.every(x=>typeof x==='string'&&x.length<=10000);
 if(key==='bq_favorite_folders')return value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length<=1000&&Object.entries(value).every(([k,v])=>k.length<=10000&&['love','support','prayer','special'].includes(v));
 return false;
}
$('exportData').onclick=()=>{
 const data={app:'bein-qalbein',version:62,exportedAt:new Date().toISOString(),data:{}};
 backupKeys.forEach(k=>{const v=bqStorage.getItem(k);if(v!==null)data.data[k]=v});
 const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob);const a=document.createElement('a');
 a.href=url;a.download='bein-qalbein-backup.json';document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),30000);
};
$('importData').onchange=async e=>{
 const file=e.target.files?.[0];if(!file)return;
 let rollbackFailed=false;
 try{
  if(file.size>2*1024*1024)throw Error('size');
  const data=JSON.parse(await file.text());
  if(data.app!=='bein-qalbein'||!data.data||typeof data.data!=='object'||Array.isArray(data.data))throw Error('invalid');
  const staged={};
  backupKeys.forEach(k=>{if(Object.prototype.hasOwnProperty.call(data.data,k)){const raw=data.data[k];if(!validBackupValue(k,raw))throw Error('invalid '+k);staged[k]=raw}});
  if(!Object.keys(staged).length)throw Error('empty');
  if(!bqStorage.persistent)throw Error('storage-unavailable');
  const previous={};Object.keys(staged).forEach(k=>previous[k]=bqStorage.getItem(k));
  try{
   for(const [k,v] of Object.entries(staged)){
    bqStorage.setItem(k,v);
    if(!bqStorage.persistent||bqStorage.getItem(k)!==v)throw Error('storage-unavailable');
   }
  }catch(error){
   try{
    for(const [k,v] of Object.entries(previous))if(v===null)bqStorage.removeItem(k);
    for(const [k,v] of Object.entries(previous))if(v!==null)bqStorage.setItem(k,v);
    for(const [k,v] of Object.entries(previous))if(bqStorage.getItem(k)!==v)rollbackFailed=true;
   }catch(_){rollbackFailed=true}
   if(rollbackFailed)throw Error('rollback-incomplete');
   throw error;
  }
  alert(lang==='ar'?'تمت استعادة النسخة الاحتياطية والتحقق من بياناتها. سيُعاد تحميل التطبيق الآن.':'Backup validated and restored. The app will now reload.');
  location.reload();
 }catch(error){
  const reason=error?.message;
  const message=reason==='storage-unavailable'
   ?(lang==='ar'?'تعذرت الاستعادة لأن التخزين الدائم غير متاح أو ممتلئ. لم نُعد تحميل الصفحة ولم نُلغِ بياناتك الحالية.':'Restore stopped because persistent browser storage is unavailable or full. The page was not reloaded and your current data was preserved.')
   :reason==='rollback-incomplete'
   ?(lang==='ar'?'توقفت الاستعادة وتعذر التحقق من التراجع الكامل. لا تغلق الصفحة؛ صدّر نسخة احتياطية من البيانات الحالية أولاً.':'Restore stopped and rollback could not be fully verified. Keep this page open and export your current data before leaving.')
   :(lang==='ar'?'لم تُستعد النسخة: الملف تالف أو يحتوي بيانات غير صالحة. لم نغيّر بياناتك الحالية.':'Backup was not restored: the file is invalid. Your current data was left unchanged.');
  alert(message);
 }
 e.target.value='';
};
function updatePalette(value){const palette=['blue','rose','royal','night'].includes(value)?value:'blue';document.body.classList.remove('theme-custom','theme-blue','theme-rose','theme-royal','theme-night');document.body.classList.add('theme-'+palette);document.body.dataset.bqPalette=palette;bqStorage.setItem('bq_palette',palette);['--wine','--wine-2','--rose','--rose-soft','--surface-2','--bq-accent'].forEach(k=>document.body.style.removeProperty(k));const meta=document.querySelector('meta[name=theme-color]');if(meta)meta.content=palette==='blue'?'#285b86':palette==='rose'?'#7b2147':palette==='night'?'#211923':'#64132f'}
function applyCustomAccent(hex){if(!/^#[0-9a-f]{6}$/i.test(hex))return false;const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));const mix=(target,amount)=>'#'+rgb.map((v)=>Math.round(v*(1-amount)+target*amount).toString(16).padStart(2,'0')).join('');const light=mix(255,.72),pale=mix(255,.91),dark=mix(0,.22);const linear=rgb.map(v=>{const n=v/255;return n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)});const luminance=.2126*linear[0]+.7152*linear[1]+.0722*linear[2];const navForeground=luminance>.179?'#17212b':'#fff';document.body.classList.remove('theme-blue','theme-rose','theme-royal','theme-night');document.body.classList.add('theme-custom');document.body.style.setProperty('--wine',hex);document.body.style.setProperty('--wine-2',light);document.body.style.setProperty('--rose',light);document.body.style.setProperty('--rose-soft',pale);document.body.style.setProperty('--surface-2',pale);document.body.style.setProperty('--bq-accent',hex);document.body.style.setProperty('--bq-nav-foreground',navForeground);document.body.dataset.bqPalette='custom';bqStorage.setItem('bq_custom_color',hex);bqStorage.setItem('bq_palette','custom');const meta=document.querySelector('meta[name=theme-color]');if(meta)meta.content=dark;return true}
(function setupThemePicker(){const open=$('themePickerOpen'),modal=$('themePickerModal'),close=$('themePickerClose'),wheel=$('themeColorWheel'),hex=$('themeColorHex'),swatch=$('themeColorSwatch'),preview=$('themePreview'),confirm=$('themeColorConfirm'),factory=$('themeFactoryReset');if(!open||!modal||!wheel)return;const ctx=wheel.getContext('2d');const factoryColor='#285b86';let pending=factoryColor,dragging=false;function drawWheel(){const size=wheel.width,cx=size/2,cy=size/2,r= size/2-2,img=ctx.createImageData(size,size);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const dx=x-cx,dy=cy-y,dist=Math.hypot(dx,dy),i=(y*size+x)*4;if(dist>r){img.data[i+3]=0;continue}const hue=(Math.atan2(dy,dx)*180/Math.PI+360)%360,sat=Math.min(1,dist/r);const chroma=sat,hh=hue/60,xx=chroma*(1-Math.abs(hh%2-1));let rr=0,gg=0,bb=0;if(hh<1)[rr,gg,bb]=[chroma,xx,0];else if(hh<2)[rr,gg,bb]=[xx,chroma,0];else if(hh<3)[rr,gg,bb]=[0,chroma,xx];else if(hh<4)[rr,gg,bb]=[0,xx,chroma];else if(hh<5)[rr,gg,bb]=[xx,0,chroma];else [rr,gg,bb]=[chroma,0,xx];const m=1-chroma;img.data[i]=Math.round((rr+m)*255);img.data[i+1]=Math.round((gg+m)*255);img.data[i+2]=Math.round((bb+m)*255);img.data[i+3]=255}ctx.putImageData(img,0,0);ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='rgba(0,0,0,.18)';ctx.lineWidth=2;ctx.stroke()}function updatePreview(){pending=pending.toUpperCase();hex.textContent=pending;swatch.style.background=pending;preview.style.setProperty('--preview-accent',pending);wheel.setAttribute('aria-valuetext',pending)}function setFromPoint(clientX,clientY){const rect=wheel.getBoundingClientRect(),scale=wheel.width/rect.width,x=(clientX-rect.left)*scale-wheel.width/2,y=wheel.height/2-(clientY-rect.top)*scale,r=wheel.width/2-3,dist=Math.min(r,Math.hypot(x,y)),hue=(Math.atan2(y,x)*180/Math.PI+360)%360,sat=dist/r,c=sat,hh=hue/60,xx=c*(1-Math.abs(hh%2-1));let a=0,b=0,d=0;if(hh<1)[a,b,d]=[c,xx,0];else if(hh<2)[a,b,d]=[xx,c,0];else if(hh<3)[a,b,d]=[0,c,xx];else if(hh<4)[a,b,d]=[0,xx,c];else if(hh<5)[a,b,d]=[xx,0,c];else [a,b,d]=[c,0,xx];const m=1-c;pending='#'+[a,b,d].map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('');updatePreview()}function show(){const saved=bqStorage.getItem('bq_custom_color');pending=/^#[0-9a-f]{6}$/i.test(saved||'')?saved:factoryColor;updatePreview();modal.hidden=false;document.body.classList.add('theme-picker-open');close?.focus()}function hide(){modal.hidden=true;document.body.classList.remove('theme-picker-open');open.focus()}wheel.addEventListener('pointerdown',e=>{dragging=true;wheel.setPointerCapture(e.pointerId);setFromPoint(e.clientX,e.clientY)});wheel.addEventListener('pointermove',e=>{if(dragging)setFromPoint(e.clientX,e.clientY)});function stop(){dragging=false}wheel.addEventListener('pointerup',stop);wheel.addEventListener('pointercancel',stop);wheel.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const rgb=pending.match(/[0-9a-f]{2}/ig).map(v=>parseInt(v,16));let hue=(Math.atan2(Math.sqrt(3)*(rgb[1]-rgb[2]),2*rgb[0]-rgb[1]-rgb[2])*180/Math.PI+360)%360;hue=(hue+(e.key==='ArrowRight'||e.key==='ArrowUp'?5:-5)+360)%360;const sat=.85,c=sat,hh=hue/60,xx=c*(1-Math.abs(hh%2-1));let a=0,b=0,d=0;if(hh<1)[a,b,d]=[c,xx,0];else if(hh<2)[a,b,d]=[xx,c,0];else if(hh<3)[a,b,d]=[0,c,xx];else if(hh<4)[a,b,d]=[0,xx,c];else if(hh<5)[a,b,d]=[xx,0,c];else [a,b,d]=[c,0,xx];const m=1-c;pending='#'+[a,b,d].map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('');updatePreview()});open.addEventListener('click',show);close?.addEventListener('click',hide);modal.addEventListener('click',e=>{if(e.target===modal)hide()});factory?.addEventListener('click',()=>{pending=factoryColor;updatePreview()});confirm?.addEventListener('click',()=>{if(applyCustomAccent(pending)){hide();if(typeof showToast==='function')showToast('تم تطبيق اللون وحفظه');}});document.addEventListener('keydown',e=>{if(!modal.hidden&&e.key==='Escape')hide()});drawWheel();})();

$('fontScale').oninput=e=>{document.documentElement.style.setProperty('--bq-scale',e.target.value);bqStorage.setItem('bq_font_scale',e.target.value)};
const savedScale=Number(bqStorage.getItem('bq_font_scale')||'1');const storedScale=Number.isFinite(savedScale)?Math.min(1.2,Math.max(0.9,savedScale)):1;$('fontScale').value=String(storedScale);document.documentElement.style.setProperty('--bq-scale',String(storedScale));
const savedPalette=bqStorage.getItem('bq_palette')||'blue';const savedCustomColor=bqStorage.getItem('bq_custom_color');if(savedPalette==='custom'&&/^#[0-9a-f]{6}$/i.test(savedCustomColor||''))applyCustomAccent(savedCustomColor);else updatePalette(['blue','rose','royal','night'].includes(savedPalette)?savedPalette:'blue');document.documentElement.removeAttribute('data-start-role');
$('shareAppBtn').onclick=async()=>{const data={title:'بين قلبين',text:lang==='ar'?'رسائل زوجية راقية للمودة والاحترام. جرّب تطبيق بين قلبين.':lang==='fr'?'Des messages élégants pour le couple. Découvrez Entre deux cœurs.':'Elegant messages for couples. Try Between Two Hearts.',url:location.href.split('?')[0]};if(navigator.share){try{await navigator.share(data)}catch(_){}}else copyText(data.text+' '+data.url)};
const oldApplyLanguageV35=applyLanguage;
applyLanguage=function(){oldApplyLanguageV35();const labels={ar:{builderTitle:'اصنع رسالتك بنفسك',builderDesc:'اختر الشعور والأسلوب لتحصل على رسالة قابلة للتعديل.',builderFeelingLabel:'الشعور',builderStyleLabel:'الأسلوب',build:'✦ أنشئ رسالتي',use:'استخدم الرسالة',copy:'نسخ',rescueTitle:'أنقذ الموقف',rescueDesc:'خطوات هادئة لإصلاح الموقف دون لوم أو تصعيد.',situation:'ما الموقف؟',rescueButton:'اعرض خطة هادئة',challengeTitle:'🌷 تحدي اللطف',challengeDesc:'خطوة صغيرة اليوم تصنع فرقاً جميلاً.',newChallenge:'مهمة لطيفة أخرى',appearanceTitle:'المظهر والتخصيص',paletteLabel:'الطابع',fontSizeLabel:'حجم الخط',shareApp:'↗ شارك تطبيق بين قلبين',folderLabel:'مجلد المفضلة',assign:'صنّف الرسالة الحالية',export:'نسخة احتياطية',import:'استعادة نسخة',pin:'رمز خصوصية من 4 إلى 8 أرقام',lock:'تفعيل قفل المفضلة',unlock:'فتح المفضلة'},en:{builderTitle:'Build your own message',builderDesc:'Choose a feeling and style, then edit your message.',builderFeelingLabel:'Feeling',builderStyleLabel:'Style',build:'✦ Create my message',use:'Use this message',copy:'Copy',rescueTitle:'Repair the moment',rescueDesc:'Calm steps to work through a difficult moment.',situation:'What happened?',rescueButton:'Show a calm plan',challengeTitle:'🌷 Kindness challenge',challengeDesc:'One small action can make today better.',newChallenge:'Another kind action',appearanceTitle:'Appearance & personalisation',paletteLabel:'Theme',fontSizeLabel:'Font size',shareApp:'↗ Share Between Two Hearts',folderLabel:'Favorites folder',assign:'Organise current message',export:'Back up data',import:'Restore backup',pin:'Privacy PIN (4–8 digits)',lock:'Lock favorites',unlock:'Unlock favorites'},fr:{builderTitle:'Créer votre message',builderDesc:'Choisissez une émotion et un style, puis modifiez le texte.',builderFeelingLabel:'Émotion',builderStyleLabel:'Style',build:'✦ Créer mon message',use:'Utiliser ce message',copy:'Copier',rescueTitle:'Apaiser la situation',rescueDesc:'Des étapes calmes pour traverser un désaccord.',situation:'Quelle situation ?',rescueButton:'Afficher un plan calme',challengeTitle:'🌷 Défi de gentillesse',challengeDesc:'Un petit geste peut embellir la journée.',newChallenge:'Un autre geste',appearanceTitle:'Apparence et personnalisation',paletteLabel:'Thème',fontSizeLabel:'Taille du texte',shareApp:'↗ Partager Entre deux cœurs',folderLabel:'Dossier des favoris',assign:'Classer le message actuel',export:'Sauvegarder',import:'Restaurer',pin:'Code privé (4 à 8 chiffres)',lock:'Verrouiller les favoris',unlock:'Déverrouiller les favoris'}}[lang];Object.entries({builderTitle:'builderTitle',builderDesc:'builderDesc',builderFeelingLabel:'builderFeelingLabel',builderStyleLabel:'builderStyleLabel',build:'buildMessageBtn',use:'useBuiltMessage',copy:'copyBuiltMessage',rescueTitle:'rescueTitle',rescueDesc:'rescueDesc',situation:'rescueSituationLabel',rescueButton:'rescueGenerate',challengeTitle:'challengeTitle',challengeDesc:'challengeDesc',newChallenge:'newChallenge',appearanceTitle:'appearanceTitle',paletteLabel:'paletteLabel',fontSizeLabel:'fontSizeLabel',shareApp:'shareAppBtn',folderLabel:'folderLabel',assign:'assignFolder',export:'exportData',import:'importLabel'}).forEach(([k,id])=>{const el=$(id);if(el)el.textContent=labels[k]});$('privacyPin').placeholder=labels.pin;$('setPrivacyPin').textContent=labels.lock;$('unlockFavorites').textContent=labels.unlock;const opts={ar:[['love','مودة'],['miss','اشتياق'],['sorry','اعتذار'],['support','تشجيع'],['calm','تهدئة'],['dua','دعاء']],en:[['love','Affection'],['miss','Missing you'],['sorry','Apology'],['support','Support'],['calm','Calm'],['dua','Prayer']],fr:[['love','Affection'],['miss','Manque'],['sorry','Excuses'],['support','Soutien'],['calm','Apaisement'],['dua','Invocation']]}[lang];$('builderFeeling').innerHTML=opts.map(x=>'<option value="'+x[0]+'">'+x[1]+'</option>').join('');const styles={ar:['رقيق','عميق','مختصر'],en:['Gentle','Deep','Short'],fr:['Doux','Profond','Court']}[lang];$('builderStyle').innerHTML=['soft','deep','short'].map((v,i)=>'<option value="'+v+'">'+styles[i]+'</option>').join('');const situations={ar:['حدث خلاف','صمت وابتعاد','كلام جارح','ضغط وتعب','سوء فهم','أحتاج إلى الاعتذار'],en:['Disagreement','Silence and distance','Hurtful words','Stress and fatigue','Misunderstanding','I need to apologise'],fr:['Désaccord','Silence et distance','Paroles blessantes','Stress et fatigue','Malentendu','Je dois présenter mes excuses']}[lang];$('rescueSituation').innerHTML=['argument','silence','hurt','stress','misunderstanding','apology'].map((v,i)=>'<option value="'+v+'">'+situations[i]+'</option>').join('');const folderOpts={ar:[['all','كل الرسائل'],['love','مودة'],['support','دعم'],['prayer','أدعية'],['special','مميزة']],en:[['all','All messages'],['love','Affection'],['support','Support'],['prayer','Prayers'],['special','Special']],fr:[['all','Tous les messages'],['love','Affection'],['support','Soutien'],['prayer','Invocations'],['special','Spéciaux']]}[lang];$('favoriteFolder').innerHTML=folderOpts.map(x=>'<option value="'+x[0]+'">'+x[1]+'</option>').join('');showRescue();renderDailyChallenge();};


// Local privacy gate for favorites. This hides the list in this browser; it is not device-level encryption.
let favoritesUnlocked=!bqStorage.getItem('bq_fav_pin_hash');
async function hashPrivacyPin(pin){const bytes=new TextEncoder().encode(pin);const digest=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join('')}
function refreshFavoritesPrivacy(){const box=$('favorites');if(box)box.style.display=favoritesUnlocked?'':'none';$('unlockFavorites').style.display=favoritesUnlocked?'none':''}
$('setPrivacyPin').onclick=async()=>{const pin=$('privacyPin').value.trim();if(!/^\d{4,8}$/.test(pin)){alert(lang==='ar'?'أدخل رمزاً من 4 إلى 8 أرقام.':'Enter a 4–8 digit PIN.');return}try{bqStorage.setItem('bq_fav_pin_hash',await hashPrivacyPin(pin));favoritesUnlocked=true;$('privacyPin').value='';refreshFavoritesPrivacy();alert(lang==='ar'?'تم تفعيل قفل المفضلة على هذا المتصفح.':'Favorites privacy lock enabled in this browser.')}catch(_){alert(lang==='ar'?'تعذر تفعيل القفل على هذا المتصفح.':'Could not enable the privacy lock.')}}
$('unlockFavorites').onclick=async()=>{const pin=$('privacyPin').value.trim();try{const saved=bqStorage.getItem('bq_fav_pin_hash');if(saved&&await hashPrivacyPin(pin)===saved){favoritesUnlocked=true;$('privacyPin').value='';refreshFavoritesPrivacy();showFavs()}else alert(lang==='ar'?'الرمز غير صحيح.':'Incorrect PIN.')}catch(_){alert(lang==='ar'?'تعذر التحقق من الرمز.':'Could not verify PIN.')}}
$('privacyPin').addEventListener('keydown',e=>{if(e.key==='Enter')$('unlockFavorites').click()});
const showFavsBeforePrivacy=showFavs;
showFavs=function(){showFavsBeforePrivacy();refreshFavoritesPrivacy()};
refreshFavoritesPrivacy();


/* V38 icon renderer: consistent custom line-art icons, no emoji glyph dependency */

function svgIcon(name,cls='ui-icon'){return '<svg class="'+cls+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(iconPaths[name]||iconPaths.spark)+'</svg>'}

function decorateAppIcons(){
 document.querySelectorAll('.bottom-nav button').forEach(b=>{const span=b.querySelector(':scope>span');if(span){const n={home:'home',favorites:'heart',guide:'book',settings:'settings'}[b.dataset.go];span.innerHTML=svgIcon(n)}});

 document.querySelectorAll('.cat').forEach(b=>{const id=b.closest('.category-item')?.dataset.categoryId;const badge=b.querySelector('.badge');if(badge&&id)badge.innerHTML=svgIcon(categoryIconMap[id]||'heart')});
 const set=(id,name)=>{const el=$(id);if(el&&!el.dataset.iconized){el.insertAdjacentHTML('afterbegin',svgIcon(name));el.dataset.iconized='1'}};
 [['shareBtn','share'],['favBtn','heart'],['newBtn','refresh'],['surpriseBtn','spark'],['cardBtn','card'],['copyBtn','copy'],['buildMessageBtn','spark'],['useBuiltMessage','message'],['copyBuiltMessage','copy'],['rescueGenerate','shield'],['newChallenge','spark'],['showFav','heart'],['hideFav','moon'],['assignFolder','book'],['exportData','download'],['importLabel','upload'],['setPrivacyPin','lock'],['unlockFavorites','lock'],['shareAppBtn','share'],['themeToggle','moon'],['notifyToggle','heart']].forEach(x=>set(x[0],x[1]));
 document.querySelectorAll('.smart-chips button').forEach((b,i)=>{if(!b.dataset.iconized){b.insertAdjacentHTML('afterbegin',svgIcon(['star','mail','message','crown','flower','shield','hands'][i]));b.dataset.iconized='1'}});
 const titles=[['rescueTitle','shield'],['challengeTitle','spark'],['builderTitle','message'],['dailyTitle','sun'],['guideTitle','book'],['favTitle','heart'],['settingsTitle','settings']];
 titles.forEach(([id,n])=>{const el=$(id);if(el&&!el.dataset.iconized){el.insertAdjacentHTML('afterbegin',svgIcon(n));el.dataset.iconized='1'}});
}
const originalGroupedRenderCatsV38=groupedRenderCats;
groupedRenderCats=function(filter=''){originalGroupedRenderCatsV38(filter);decorateAppIcons()};
const originalApplyLanguageV38=applyLanguage;
applyLanguage=function(){originalApplyLanguageV38();decorateAppIcons()};
decorateAppIcons();


/* V39: deeper quality pass */

/* V41: keep curated language pools stable; do not multiply generated variants on each language switch. */
const bqPreviousApply=applyLanguage;
applyLanguage=function(){
 bqPreviousApply();
 document.documentElement.dataset.messageCount=String(Object.values(messages).reduce((n,p)=>n+p.length,0));
 if(typeof decorateAppIcons==='function')decorateAppIcons();
};
const bqPreviousDecorate=decorateAppIcons;
decorateAppIcons=function(){
 bqPreviousDecorate();
 const map={shareBtn:'share',favBtn:'heart',newBtn:'refresh',surpriseBtn:'spark',cardBtn:'card',copyBtn:'copy',buildMessageBtn:'spark',useBuiltMessage:'message',copyBuiltMessage:'copy',rescueGenerate:'shield',newChallenge:'spark',showFav:'heart',hideFav:'moon',assignFolder:'book',exportData:'download',importLabel:'upload',setPrivacyPin:'lock',unlockFavorites:'lock',shareAppBtn:'share',themeToggle:'moon',notifyToggle:'heart'};
 Object.entries(map).forEach(([id,name])=>{const el=$(id);if(el&&!el.querySelector(':scope > svg.ui-icon'))el.insertAdjacentHTML('afterbegin',svgIcon(name))});
 const heads={rescueTitle:'shield',challengeTitle:'spark',builderTitle:'message',dailyTitle:'sun',guideTitle:'book',favTitle:'heart',settingsTitle:'settings'};
 Object.entries(heads).forEach(([id,name])=>{const el=$(id);if(el&&!el.querySelector(':scope > svg.ui-icon'))el.insertAdjacentHTML('afterbegin',svgIcon(name))});
};
let bqLockTimer=null;
const bqPreviousPrivacyRefresh=refreshFavoritesPrivacy;
refreshFavoritesPrivacy=function(){
 bqPreviousPrivacyRefresh();
 if(bqLockTimer)clearTimeout(bqLockTimer);
 if(favoritesUnlocked&&bqStorage.getItem('bq_fav_pin_hash'))bqLockTimer=setTimeout(()=>{favoritesUnlocked=false;bqPreviousPrivacyRefresh()},180000);
};
const bqPreviousGoPage=goPage;
goPage=function(page){
 if(page!=='favorites'&&bqStorage.getItem('bq_fav_pin_hash')){favoritesUnlocked=false;if(bqLockTimer)clearTimeout(bqLockTimer);bqPreviousPrivacyRefresh()}
 bqPreviousGoPage(page);
};
/* Keep all major controls readable and correctly sized on compact phones. */

applyLanguage();

/* V41 — quick hub, progressive disclosure, and language-safe labels */
(function(){
 const translations={
  ar:{eyebrow:'ابدأ من هنا',title:'ماذا تحتاج الآن؟',desc:'اختر ما يناسب لحظتك، وسنوصلك مباشرة.',labels:{categories:'رسالة لشريك حياتي',surprise:'فاجئني برسالة',builder:'اصنع رسالتي',rescue:'ساعدني في موقف',ai:'اكتب رسالة بالذكاء الاصطناعي'},subs:{categories:'اختر من الرسائل',surprise:'كلمات مختارة عشوائياً',builder:'على مقاس شعورك',rescue:'خطوات هادئة وعملية',ai:'رسالة جديدة على مقاسك'},open:'افتح الأداة',close:'إخفاء الأداة'},
  en:{eyebrow:'START HERE',title:'What do you need now?',desc:'Choose what fits the moment and jump straight in.',labels:{categories:'A message for my spouse',surprise:'Surprise me',builder:'Create my message',rescue:'Help with a situation',ai:'Write with AI'},subs:{categories:'Browse the message library',surprise:'A thoughtful random pick',builder:'Match your feeling',rescue:'Calm, practical steps',ai:'A fresh message tailored to you'},open:'Open tool',close:'Hide tool'},
  fr:{eyebrow:'COMMENCEZ ICI',title:'De quoi avez-vous besoin ?',desc:'Choisissez votre besoin et accédez directement à l’outil.',labels:{categories:'Un message pour mon conjoint',surprise:'Surprenez-moi',builder:'Créer mon message',rescue:'M’aider dans une situation',ai:'Écrire avec l’IA'},subs:{categories:'Parcourir les messages',surprise:'Un choix au hasard',builder:'Selon votre émotion',rescue:'Des étapes calmes et pratiques',ai:'Un message adapté à votre besoin'},open:'Ouvrir',close:'Masquer'}
 };
 function updateQuickLanguage(){
  const t=translations[lang]||translations.ar;
  const put=(id,v)=>{const el=$(id);if(el)el.textContent=v};
  put('quickEyebrow',t.eyebrow);put('quickTitle',t.title);put('quickDesc',t.desc);
  document.querySelectorAll('[data-quick-label]').forEach(el=>el.textContent=t.labels[el.dataset.quickLabel]||'');
  document.querySelectorAll('[data-quick-sub]').forEach(el=>el.textContent=t.subs[el.dataset.quickSub]||'');
  document.querySelectorAll('.tool-disclosure').forEach(b=>{b.textContent=b.getAttribute('aria-expanded')==='true'?t.close:t.open});
 }
 function setupDisclosures(){
  document.querySelectorAll('.quick-icon[data-icon]').forEach(el=>{el.innerHTML=svgIcon(el.dataset.icon,'ui-icon')});
  ['messageBuilder','rescueCenter','kindnessChallenge'].forEach(id=>{
   const box=$(id);if(!box||box.dataset.disclosureReady)return;
   const heading=box.querySelector('h2');if(!heading)return;
   const button=document.createElement('button');button.type='button';button.className='tool-disclosure';button.setAttribute('aria-expanded','false');
   button.addEventListener('click',()=>toggleTool(id));
   heading.insertAdjacentElement('afterend',button);
   [...box.children].forEach(child=>{if(child!==heading&&child!==button)child.hidden=true});
   box.dataset.disclosureReady='1';
  });
  updateQuickLanguage();
 }
 function toggleTool(id,forceOpen){
  const box=$(id);if(!box)return;
  const b=box.querySelector('.tool-disclosure');if(!b)return;
  const open=typeof forceOpen==='boolean'?forceOpen:b.getAttribute('aria-expanded')!=='true';
  b.setAttribute('aria-expanded',String(open));
  [...box.children].forEach(child=>{if(child!==box.querySelector('h2')&&child!==b)child.hidden=!open});
  updateQuickLanguage();
 }
 const previousApplyLanguage=applyLanguage;
 applyLanguage=function(){previousApplyLanguage();updateQuickLanguage()};
 setupDisclosures();
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupDisclosures,{once:true});
})();


/* V42: debounce category search and coalesce repeated icon DOM scans into one frame. */
(function(){
 const search=$('search');let searchTimer=0;
 if(search)search.oninput=e=>{
  const value=e.target.value;
  clearTimeout(searchTimer);
  searchTimer=setTimeout(()=>groupedRenderCats(value),90);
 };
 const fullDecorate=decorateAppIcons;let decorateQueued=false;
 decorateAppIcons=function(){
  if(decorateQueued)return;
  decorateQueued=true;
  requestAnimationFrame(()=>{decorateQueued=false;fullDecorate()});
 };
})();


/* Rescue feedback state: one click owner lives in the unified router below. */
(function(){
 const result=$('rescueResult'),select=$('rescueSituation');
 if(result)result.setAttribute('aria-live','polite');
 if(select)select.addEventListener('change',()=>result?.classList.remove('rescue-ready'));
})();

/* Unified interaction router: one capture-phase owner for navigation and quick actions. */
(function(){
 const d=document;
 function reveal(id){const box=$(id);if(!box)return null;box.hidden=false;box.querySelectorAll(':scope > *').forEach(x=>{if(x.tagName!=='H2'&&!x.classList.contains('tool-disclosure'))x.hidden=false});const b=box.querySelector(':scope > .tool-disclosure');if(b)b.setAttribute('aria-expanded','true');return box}
 function showCopyToast(success){
 let toast=$('appToast');
 if(!toast){toast=document.createElement('div');toast.id='appToast';toast.className='app-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');toast.hidden=true;d.body.append(toast)}
 toast.textContent=success?(lang==='en'?'Copied to clipboard ✓':lang==='fr'?'Copié ✓':'تم النسخ بنجاح ✓'):(lang==='en'?'Copy failed. Try again.':lang==='fr'?'Échec de la copie. Réessayez.':'تعذر النسخ؛ حاول مرة أخرى.');
 toast.hidden=false;toast.classList.add('show');clearTimeout(toast._timer);
 toast._timer=setTimeout(()=>{toast.classList.remove('show');toast.hidden=true},1900);
}
function feedback(b){
 if(!b||b.tagName!=='BUTTON'){showCopyToast(true);return}
 if(!b.dataset.copyHtml)b.dataset.copyHtml=b.innerHTML;
 b.textContent=lang==='en'?'Copied ✓':lang==='fr'?'Copié ✓':'تم النسخ ✓';
 clearTimeout(b._copyTimer);b._copyTimer=setTimeout(()=>{if(b.isConnected)b.innerHTML=b.dataset.copyHtml},1400)
}
 copyText=async function(value){
  const source=d.activeElement;let ok=false;
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(String(value));ok=true}else{const a=d.createElement('textarea');a.value=String(value);a.style.cssText='position:fixed;opacity:0';d.body.append(a);a.select();ok=d.execCommand('copy');a.remove()}}
  catch(_){try{const a=d.createElement('textarea');a.value=String(value);d.body.append(a);a.select();ok=d.execCommand('copy');a.remove()}catch(__){}}
  if(ok)feedback(source);else showCopyToast(false);return ok;
 };
 function openGlobalSearch(){
  let overlay=$('globalSearchOverlay');
  if(!overlay){
   overlay=d.createElement('div');overlay.id='globalSearchOverlay';overlay.className='global-search-overlay';
   overlay.innerHTML='<div class="global-search-box" role="dialog" aria-modal="true" aria-label="البحث العام"><div class="global-search-head"><strong>البحث في التطبيق</strong><button type="button" id="closeGlobalSearch" aria-label="إغلاق">×</button></div><input id="globalSearchInput" type="search" placeholder="ابحث في الرسائل والمكتبة والنصائح..." autocomplete="off"><div id="globalSearchResults" class="global-search-results" aria-live="polite"><p>اكتب كلمة للبحث في محتوى التطبيق.</p></div></div>';
   d.body.append(overlay);
   $('closeGlobalSearch').addEventListener('click',()=>overlay.classList.remove('is-open'));
   overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('is-open')});
   $('globalSearchInput').addEventListener('input',()=>{
    const q=$('globalSearchInput').value.trim().toLocaleLowerCase(),host=$('globalSearchResults');host.innerHTML='';
    if(q.length<2){host.innerHTML='<p>اكتب حرفين على الأقل للبحث.</p>';return}
    const seen=new Set();let matches=0;
    d.querySelectorAll('#mainContent h1,#mainContent h2,#mainContent h3,#mainContent p,#mainContent li,#mainContent .cat,#mainContent .message-card,#mainContent .advice-card,#mainContent .book-card,#mainContent [data-search-text]').forEach(el=>{
     if(el.closest('#globalSearchOverlay'))return;
     const value=(el.innerText||el.textContent||'').replace(/\\s+/g,' ').trim();
     if(value.length<3||value.length>1400||!value.toLocaleLowerCase().includes(q))return;
     const key=value.slice(0,180);if(seen.has(key)||matches>=60)return;seen.add(key);
     const row=d.createElement('button');row.type='button';row.className='global-search-result';row.textContent=value.slice(0,180)+(value.length>180?'…':'');
     row.addEventListener('click',()=>{const page=el.closest('[data-page]')?.dataset.page;if(page)goPage(page);overlay.classList.remove('is-open');requestAnimationFrame(()=>{el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('global-search-hit');setTimeout(()=>el.classList.remove('global-search-hit'),1600)})});
     host.append(row);matches++;
    });
    if(!matches)host.innerHTML='<p>لا توجد نتائج مطابقة في المحتوى المتاح حالياً.</p>';
   });
  }
  overlay.classList.add('is-open');$('globalSearchInput').value='';$('globalSearchResults').innerHTML='<p>اكتب كلمة للبحث في محتوى التطبيق.</p>';requestAnimationFrame(()=>$('globalSearchInput').focus());
 }
 function displayMessageInMain(value,categoryId){
 const message=String(value||'').trim();if(!message)return false;
 current=message;$('message').textContent=message;rememberMessage(message);
 if(categoryId&&messages[categoryId])selected=categoryId;
 if(!messages[selected])selected='morning';
 const search=$('search');if(search)search.value='';
 goPage('home');
 const panel=prepareInlineMessage();
 groupedRenderCats('');
 const target=$('cats')?.querySelector('.category-item[data-category-id="'+selected+'"]');
 if(panel&&target){target.append(panel);panel.hidden=false;panel.style.display='block'}
 requestAnimationFrame(()=>panel?.scrollIntoView({behavior:'auto',block:'nearest'}));
 return true;
}
function useMessage(v,categoryId){
 const builderMap={love:'thanks',miss:'miss',sorry:'sorry',support:'support',calm:'upset',dua:'dua'};
 return displayMessageInMain(v,categoryId||builderMap[$('builderFeeling')?.value]||'thanks');
}
window.displayMessageInMain=displayMessageInMain;
 d.addEventListener('click',function(e){
  const t=e.target;
  let b=t.closest('#topSearchBtn');
  if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();openGlobalSearch();return}
  b=t.closest('#quickHub button[data-quick]');
  if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();goPage('home');let dest=null;
   if(b.dataset.quick==='categories'){$('search').value='';groupedRenderCats('');dest=$('cats');const first=dest?.querySelector('button.cat');const item=first?.closest('.category-item');const panel=$('inlineMessagePanel');if(first&&(!panel||panel.parentElement!==item))first.click()}
   else if(b.dataset.quick==='surprise'){const ids=categories.map(c=>c.id);$('search').value='';if(ids.length){selected=ids[Math.floor(Math.random()*ids.length)];groupedRenderCats('');generate()}dest=$('inlineMessagePanel')||$('message')}
   else if(b.dataset.quick==='builder')dest=reveal('messageBuilder');
   else if(b.dataset.quick==='ai'){dest=reveal('aiMessagePanel');$('aiMood')?.focus({preventScroll:true})}
   else if(b.dataset.quick==='rescue'){dest=reveal('rescueCenter');showRescue()}
   if(dest)requestAnimationFrame(()=>dest.scrollIntoView({behavior:'auto',block:'center'}));return;
  }
  b=t.closest('#cats button.cat');
  if(b){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   const item=b.closest('.category-item'),id=item?.dataset.categoryId;if(!id||!messages[id])return;
   // Every tap on a category must produce a message, including the initially selected one.
   selected=id;generate();
   const p=prepareInlineMessage();
   d.querySelectorAll('#cats .cat').forEach(x=>{
    const active=x.closest('.category-item')?.dataset.categoryId===id;
    x.classList.toggle('active',active);x.setAttribute('aria-expanded',String(active));
   });
   item.append(p);p.hidden=false;p.style.display='block';
   requestAnimationFrame(()=>p.scrollIntoView({behavior:'auto',block:'nearest'}));
   return;
  }
  b=t.closest('#smartChips button[data-pick]');
  if(b){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   const id=b.dataset.pick;if(!Object.prototype.hasOwnProperty.call(messages,id))return;
   selected=id;generate();$('search').value='';groupedRenderCats('');
   const panel=prepareInlineMessage();
   const item=Array.from($('cats').querySelectorAll('.category-item')).find(x=>x.dataset.categoryId===id);
   if(panel&&item){item.append(panel);panel.hidden=false;panel.style.display='block';item.querySelector('button.cat')?.setAttribute('aria-expanded','true')}
   d.querySelectorAll('#smartChips button').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});
   requestAnimationFrame(()=>panel?.scrollIntoView({behavior:'auto',block:'center'}));
   return;
  }
  if(t.closest('#buildMessageBtn')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();buildCustomMessage();$('builtMessage')?.focus();return}
  if(t.closest('#useBuiltMessage')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const v=$('builtMessage')?.value.trim();if(v){useMessage(v);$('message')?.scrollIntoView({behavior:'auto',block:'center'})}else $('builtMessage')?.focus();return}
  if(t.closest('#copyBuiltMessage')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const v=$('builtMessage')?.value.trim();if(v)copyText(v);return}
  if(t.closest('#rescueGenerate')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showRescue();const r=$('rescueResult');if(r){r.classList.add('rescue-ready');r.scrollIntoView({behavior:'auto',block:'nearest'})}return}
  b=t.closest('[data-save-book]');
  if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();saveFavoriteBook(b.dataset.saveBook);return}
  if(t.closest('#saveGameBtn')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();saveFavoriteGame();return}
  b=t.closest('#gameAnswers button[data-game-answer]');
  if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();answerMiniGame(Number(b.dataset.gameAnswer));return}
  if(t.closest('#nextGameQuestion')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();advanceMiniGame();return}
  if(t.closest('#copyBtn')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(current)copyText(current);return}
 },true);
 document.querySelectorAll('#topNav button[data-go]').forEach(button=>button.addEventListener('click',()=>goPage(button.dataset.go)));
 // Homepage shortcut clicks are handled by the expandable tab controller below.
 // The guide shortcut is handled by the expandable homepage tab controller.
 const sel=$('rescueSituation');if(sel)sel.addEventListener('change',()=>{$('rescueResult')?.classList.remove('rescue-ready')});
})();


const applyLanguageBeforeAiStudio=applyLanguage;
applyLanguage=function(){
 applyLanguageBeforeAiStudio();
 if(window.applyAiStudioLanguage)window.applyAiStudioLanguage();
 updateStorageStatus();
 const note=document.getElementById('privacyNote');
 if(note)note.textContent=lang==='en'?'Note: this is a local display lock, not encryption. Messages remain readable in browser storage.':lang==='fr'?'Note : ce verrou masque l’affichage local, mais ne chiffre pas les messages stockés dans le navigateur.':'تنبيه: هذا قفل عرض محلي بسيط، وليس تشفيراً للرسائل أو حمايةً من فحص بيانات المتصفح.';
};
if(window.applyAiStudioLanguage)window.applyAiStudioLanguage();



document.documentElement.dataset.messageCount=String(Object.values(messages).reduce((n,p)=>n+p.length,0));

/* A small offline relationship quiz: deterministic, private, and usable without network access. */
const miniGameQuestions=[
 {q:'ما أفضل بداية لحوار بعد خلاف؟',a:['رفع الصوت لإثبات الرأي','الاستماع بهدوء وفهم ما أزعج الطرف الآخر','تجاهل المشكلة تماماً'],correct:1,why:'الإنصات الهادئ يفتح باب الفهم ويخفف التوتر.'},
 {q:'كيف تعبّر عن تقديرك لشريك حياتك؟',a:['أذكر جهده بكلمات صادقة','أنتظر مناسبة خاصة فقط','أقارن ما يفعله بالآخرين'],correct:0,why:'التقدير الصادق في التفاصيل اليومية يصنع فرقاً.'},
 {q:'عندما يكون شريكك متعباً، ما التصرف الألطف؟',a:['أطالبه بالنقاش فوراً','أمنحه مساحة وأسأله كيف أساعده','أفترض أنه يتعمد الابتعاد'],correct:1,why:'السؤال بلطف ومراعاة التعب يعززان الأمان.'},
 {q:'ما الذي يقوي الثقة بين الزوجين؟',a:['الوضوح والوفاء بالوعود','إخفاء الأمور المهمة','اختبار الطرف الآخر باستمرار'],correct:0,why:'الثقة تنمو بالصدق والثبات والوفاء.'},
 {q:'كيف يكون الاعتذار نافعاً؟',a:['مع تبرير الخطأ وإلقاء اللوم','باعتراف واضح وتحمل للمسؤولية','بالتظاهر أن شيئاً لم يحدث'],correct:1,why:'الاعتذار الصادق يعترف بالأثر ويصحح السلوك.'}
];
let miniGameIndex=0,miniGameScore=0,miniGameAnswered=false;
function renderMiniGame(){
 const q=miniGameQuestions[miniGameIndex];if(!q)return;
 $('gameQuestion').textContent=q.q;$('gameScore').textContent=String(miniGameScore);
 $('gameProgress').textContent='السؤال '+(miniGameIndex+1)+' من '+miniGameQuestions.length;
 $('gameFeedback').textContent='اختر الإجابة الأقرب للمودة وحسن التواصل.';
 $('nextGameQuestion').hidden=true;miniGameAnswered=false;
 const host=$('gameAnswers');host.innerHTML='';
 q.a.forEach((label,index)=>{const b=document.createElement('button');b.type='button';b.dataset.gameAnswer=String(index);b.textContent=label;host.append(b)});
}
function answerMiniGame(index){
 if(miniGameAnswered)return;const q=miniGameQuestions[miniGameIndex];if(!q||!Number.isInteger(index)||index<0||index>=q.a.length)return;
 miniGameAnswered=true;const buttons=[...$('gameAnswers').querySelectorAll('button')];buttons.forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add('correct-answer');else if(i===index)b.classList.add('wrong-answer')});
 if(index===q.correct)miniGameScore++;
 $('gameScore').textContent=String(miniGameScore);
 $('gameFeedback').textContent=(index===q.correct?'أحسنت! ':'ليس تماماً. ')+q.why;$('saveGameBtn').textContent='♡ احفظ اللعبة';
 $('nextGameQuestion').textContent=miniGameIndex===miniGameQuestions.length-1?'العب من جديد':'السؤال التالي';
 $('nextGameQuestion').hidden=false;
}
function advanceMiniGame(){
 if(!miniGameAnswered)return;
 if(miniGameIndex===miniGameQuestions.length-1){miniGameIndex=0;miniGameScore=0}else miniGameIndex++;
 renderMiniGame();
}

/* Settings open as an overlay drawer; never replace the current page. */
(function(){
 const drawer=$('settingsDrawer');
 const trigger=document.querySelector('[data-menu-toggle]');
 if(!drawer||!trigger)return;
 const panel=drawer.querySelector('.settings-drawer-panel');
 let previousFocus=null;
 function setOpen(open){
  if(open){
   if(!drawer.hidden)return;
   previousFocus=document.activeElement;
   drawer.hidden=false;
   trigger.setAttribute('aria-expanded','true');
   document.body.classList.add('settings-drawer-open');
   requestAnimationFrame(()=>{drawer.classList.add('is-open');panel?.focus();});
   updateStorageStatus();
  }else{
   if(drawer.hidden)return;
   drawer.classList.remove('is-open');
   trigger.setAttribute('aria-expanded','false');
   document.body.classList.remove('settings-drawer-open');
   drawer.hidden=true;
   if(previousFocus?.isConnected)previousFocus.focus();
   else trigger.focus();
  }
 }
 trigger.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setOpen(true)});
 const savedArchive=$('openSavedArchive');
 if(savedArchive)savedArchive.addEventListener('click',()=>{setOpen(false);goPage('favorites')});
 drawer.addEventListener('click',e=>{if(e.target.closest('[data-settings-close]')||e.target.closest('#settingsCloseBtn')){e.preventDefault();setOpen(false)}});
 document.addEventListener('keydown',e=>{
  if(drawer.hidden)return;
  if(e.key==='Escape'){e.preventDefault();setOpen(false);return}
  if(e.key==='Tab'&&panel){
   const items=[...panel.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(x=>x.offsetParent!==null);
   if(!items.length){e.preventDefault();panel.focus();return}
   const first=items[0],last=items[items.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
 });
})();


/* Homepage shortcut tabs: show each feature's real content directly beneath the strip. */
(function setupHomeShortcutTabs(){
 const strip=document.querySelector('.home-top-shortcuts');
 const host=document.getElementById('homeShortcutContent');
 // Keep the homepage shortcut bar inside the sticky top navigation while scrolling.
 const topNavigation=document.getElementById('topNavigation');
 const topTabs=document.getElementById('topNav');
 if(strip&&topNavigation&&strip.parentElement!==topNavigation)topNavigation.insertAdjacentElement('afterend',strip);
 const fav=document.getElementById('favoritesPage');
 const library=document.getElementById('libraryPage');
 const guide=document.querySelector('.page-section[data-page="guide"]');
 const ai=document.getElementById('aiMessagePanel');
 const services=document.querySelector('main > .page-section[data-page="services"]');
 const favNav=document.getElementById('favoritesSubnav');
 if(!strip||!host||!fav||!library||!guide||!ai||!services||strip.dataset.tabsReady)return;
 strip.dataset.tabsReady='1';
 const panes={favorites:document.createElement('div'),library:document.createElement('div'),guide:document.createElement('div'),ai:document.createElement('div'),services:document.createElement('div')};
 Object.entries(panes).forEach(([key,pane])=>{pane.className='home-shortcut-pane';pane.dataset.shortcutPane=key;pane.hidden=true;host.appendChild(pane)});
 // Move the existing live UI nodes, preserving their IDs, data, and event handlers.
 if(favNav)panes.favorites.appendChild(favNav);
 while(fav.firstChild)panes.favorites.appendChild(fav.firstChild);
 while(library.firstChild)panes.library.appendChild(library.firstChild);
 while(guide.firstChild)panes.guide.appendChild(guide.firstChild);
 panes.ai.appendChild(ai);
 panes.services.appendChild(services);
 const homeSections=[...document.querySelectorAll('main > .page-section[data-page="home"]')];
 const quickHub=document.getElementById('quickHub');
 // Hide every other home section with a dedicated class; .active-page uses !important.
 function resetView(){
  document.body.removeAttribute('data-home-shortcuts-open');
  host.hidden=true;
  Object.values(panes).forEach(p=>p.hidden=true);
  homeSections.forEach(section=>section.classList.remove('bq-shortcut-force-hidden'));
  library.classList.remove('bq-shortcut-force-hidden');
  if(quickHub)quickHub.classList.remove('bq-shortcut-force-hidden');
  strip.querySelectorAll('.home-shortcut').forEach(button=>{
   const isHome=button.hasAttribute('data-home-reset');
   button.classList.toggle('is-selected',isHome);
   button.setAttribute('aria-expanded',String(isHome));
  });
  if(favNav)favNav.hidden=true;
 }
 window.resetHomeShortcutView=resetView;
 function activate(key){
  const pane=panes[key];if(!pane)return;
  document.body.dataset.homeShortcutsOpen='true';
  homeSections.slice(1).forEach(section=>section.classList.add('bq-shortcut-force-hidden'));
  library.classList.toggle('bq-shortcut-force-hidden',key==='library');
  if(quickHub)quickHub.classList.add('bq-shortcut-force-hidden');
  host.hidden=false;
  Object.entries(panes).forEach(([name,node])=>{node.hidden=name!==key});
  strip.querySelectorAll('.home-shortcut').forEach(button=>{
   const active=(key==='favorites'&&button.dataset.homeGo==='favorites')||(key==='library'&&button.dataset.homeGo==='library')||(key==='ai'&&button.dataset.homeGo==='ai')||(key==='services'&&button.dataset.homeGo==='services')||(key==='guide'&&(button.dataset.homeGo==='guide'||button.id==='homeGuideShortcut'));
   button.classList.toggle('is-selected',active);
   button.setAttribute('aria-expanded',String(active));
  });
  if(favNav)favNav.hidden=key!=='favorites';
  if(key==='favorites'){if(typeof renderHistory==='function')renderHistory();if(typeof renderCustomNotes==='function')renderCustomNotes();}
  if(key==='ai')ai.scrollIntoView({block:'nearest',behavior:'smooth'});
 }
 window.openHomeShortcut=activate;
 // Restore the guide correctly when it was the last page before reload.
 if(document.body.dataset.currentPage==='guide'){
  homeSections.forEach(section=>{
   section.classList.toggle('active-page',section.dataset.page==='home');
   section.setAttribute('aria-hidden',String(section.dataset.page!=='home'));
   section.inert=section.dataset.page!=='home';
  });
  activate('guide');
 }
 // Restore the saved destination only after live content has moved into its panes.
 // A fresh direct app open always lands on Home and visibly marks its navigation tab.
 // Other destinations remain available through their own navigation buttons.
 goPage('home');
 const homeReset=strip.querySelector('[data-home-reset]');
 if(homeReset)homeReset.addEventListener('click',()=>{
  resetView();
  window.scrollTo({top:0,behavior:'smooth'});
 });
 strip.querySelectorAll('.home-shortcut').forEach(button=>button.addEventListener('click',()=>{
  const key=button.id==='homeGuideShortcut'?'guide':button.dataset.homeGo;
  if(!key)return;
  const alreadyOpen=!host.hidden&&!panes[key].hidden;
  if(alreadyOpen){resetView();return;}
  activate(key);
 }));
 // Allow users to rearrange the shortcut buttons with a press-and-drag gesture.
 const orderKey='bq_home_shortcut_order_v1';
 const shortcutId=button=>button.hasAttribute('data-home-reset')?'home':button.dataset.homeGo||(button.id==='homeGuideShortcut'?'guide':'');
 function restoreShortcutOrder(){
  try{
   const saved=JSON.parse(localStorage.getItem(orderKey)||'[]');
   const buttons=[...strip.querySelectorAll('.home-shortcut')];
   saved.forEach(id=>{const button=buttons.find(item=>shortcutId(item)===id);if(button)strip.appendChild(button)});
   const home=strip.querySelector('[data-home-reset]');
   const services=strip.querySelector('[data-home-go="services"]');
   if(home&&services)home.insertAdjacentElement('afterend',services);
   localStorage.setItem(orderKey,JSON.stringify([...strip.querySelectorAll('.home-shortcut')].map(shortcutId).filter(Boolean)));
  }catch(_){}
 }
 restoreShortcutOrder();
 let pressTimer=null,draggingButton=null,startX=0,startY=0,dragMoved=false,suppressShortcutClick=false;
 function finishShortcutDrag(){
  clearTimeout(pressTimer);pressTimer=null;
  if(draggingButton){
   draggingButton.classList.remove('is-reordering');
   draggingButton=null;
   if(dragMoved){
    suppressShortcutClick=true;
    setTimeout(()=>{suppressShortcutClick=false},350);
    try{localStorage.setItem(orderKey,JSON.stringify([...strip.querySelectorAll('.home-shortcut')].map(shortcutId).filter(Boolean)))}catch(_){}
   }
  }
  dragMoved=false;
 }
 strip.querySelectorAll('.home-shortcut').forEach(button=>{
  button.setAttribute('title',(button.getAttribute('aria-label')||'اختصار')+' — اضغط مطولاً ثم اسحب لترتيبه');
  button.addEventListener('pointerdown',event=>{
   if(event.button!==undefined&&event.button!==0)return;
   startX=event.clientX;startY=event.clientY;dragMoved=false;
   clearTimeout(pressTimer);
   pressTimer=setTimeout(()=>{
    draggingButton=button;
    button.classList.add('is-reordering');
    if(navigator.vibrate)navigator.vibrate(18);
   },230);
  });
  button.addEventListener('pointermove',event=>{
   if(!draggingButton){
    if(Math.abs(event.clientX-startX)>9||Math.abs(event.clientY-startY)>9){clearTimeout(pressTimer);pressTimer=null}
    return;
   }
   if(Math.abs(event.clientX-startX)>3||Math.abs(event.clientY-startY)>3)dragMoved=true;
   const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('.home-shortcut');
   if(!target||target===draggingButton||target.parentElement!==strip)return;
   const rect=target.getBoundingClientRect();
   const insertAfter=event.clientX<rect.left+rect.width/2;
   strip.insertBefore(draggingButton,insertAfter?target.nextSibling:target);
  });
  button.addEventListener('pointerup',finishShortcutDrag);
  button.addEventListener('pointercancel',finishShortcutDrag);
  button.addEventListener('lostpointercapture',finishShortcutDrag);
  button.addEventListener('click',event=>{if(suppressShortcutClick){event.preventDefault();event.stopImmediatePropagation()}},true);
 });

})();


/* Sharia section: local clock, opt-in location, prayer times, Qibla and Quran reader. */
(function setupShariaHub(){
 const el=id=>document.getElementById(id);
 const dateNode=el('shariaGregorianDate'),hijriNode=el('shariaHijriDate'),clockNode=el('shariaClockTime');
 if(!dateNode||!hijriNode||!clockNode)return;
 const fmt=(date,options)=>{try{return new Intl.DateTimeFormat('ar-DZ',options).format(date)}catch(_){return date.toLocaleString()}};
 function updateClock(){
  const now=new Date();
  dateNode.textContent=fmt(now,{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  clockNode.textContent=fmt(now,{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  try{hijriNode.textContent=new Intl.DateTimeFormat('ar-DZ-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric'}).format(now)}catch(_){}
 }
 updateClock();setInterval(updateClock,1000);
 let coordinates=null,prayerData=null,surahList=[],currentSurah=1,prayerCountdownTimer=null,qiblaBearingDegrees=null,deviceHeading=null,orientationActive=false;
 const locateBtn=el('shariaLocateBtn'),locationStatus=el('shariaLocationStatus');
 function renderQiblaNeedle(){
  if(qiblaBearingDegrees===null)return;
  const relative=((qiblaBearingDegrees-(deviceHeading===null?0:deviceHeading))%360+360)%360;
  const needle=el('qiblaNeedle');
  if(needle)needle.style.transform='rotate('+relative+'deg)';
  const compass=el('qiblaCompass');
  if(compass)compass.dataset.heading=deviceHeading===null?'north-reference':'live-heading';
 }
 const compassButton=el('qiblaCompassEnable');
 let orientationListener=null,orientationWatchdog=null;
 compassButton?.addEventListener('click',async()=>{
  try{
   if(!window.isSecureContext)throw new Error('يلزم فتح التطبيق عبر اتصال HTTPS لتشغيل مستشعر البوصلة.');
   if(typeof DeviceOrientationEvent==='undefined')throw new Error('هذا المتصفح لا يتيح مستشعر اتجاه الهاتف.');
   if(typeof DeviceOrientationEvent.requestPermission==='function'){
    const permission=await DeviceOrientationEvent.requestPermission();
    if(permission!=='granted')throw new Error('لم يتم منح إذن مستشعر الاتجاه.');
   }
   if(!orientationActive){
    let receivedAbsoluteHeading=false;
    orientationListener=event=>{
     let heading=null;
     if(Number.isFinite(event.webkitCompassHeading)){
      heading=((event.webkitCompassHeading%360)+360)%360;
     }else if(Number.isFinite(event.alpha)&&(event.type==='deviceorientationabsolute'||event.absolute===true)){
      heading=((360-event.alpha)%360+360)%360;
     }
     if(heading===null)return;
     receivedAbsoluteHeading=true;
     deviceHeading=heading;
     renderQiblaNeedle();
     compassButton.textContent='البوصلة تعمل الآن ✓';
     compassButton.classList.add('is-calibrated');
     el('qiblaStatus').textContent='تم استقبال اتجاه الشمال من مستشعر الهاتف. أبقِ الجهاز أفقياً وابتعد عن المعادن.';
    };
    window.addEventListener('deviceorientationabsolute',orientationListener,true);
    window.addEventListener('deviceorientation',orientationListener,true);
    orientationActive=true;
    clearTimeout(orientationWatchdog);
    orientationWatchdog=setTimeout(()=>{
     if(!receivedAbsoluteHeading){
      compassButton.textContent='إعادة محاولة البوصلة';
      compassButton.classList.remove('is-calibrated');
      el('qiblaStatus').textContent='لم يصل اتجاه مغناطيسي موثوق من المستشعر. تحقق من أذونات المستشعر وعاير الهاتف بتحريكه على شكل 8.';
     }
    },6500);
   }else if(deviceHeading!==null){
    el('qiblaStatus').textContent='البوصلة نشطة وتتبع اتجاه الهاتف.';
   }
   compassButton.textContent='جارٍ البحث عن اتجاه الشمال…';
  }catch(error){
   el('qiblaStatus').textContent=error.message||'تعذر تفعيل مستشعر الاتجاه.';
  }
 });
 const prayerNames=[['Fajr','الفجر'],['Dhuhr','الظهر'],['Asr','العصر'],['Maghrib','المغرب'],['Isha','العشاء']];
 const cleanTime=value=>String(value||'').match(/\d{1,2}:\d{2}/)?.[0]||'—';
 function minuteValue(value){const m=cleanTime(value).match(/^(\d{1,2}):(\d{2})$/);return m?Number(m[1])*60+Number(m[2]):9999}
 function updatePrayerCountdown(timings){
  const host=el('prayerCountdown');if(!host)return;
  const tick=()=>{
   const now=new Date(),minutes=now.getHours()*60+now.getMinutes();
   let next=prayerNames.find(([key])=>minuteValue(timings[key])>minutes);
   const target=new Date(now);
   if(!next){next=prayerNames[0];target.setDate(target.getDate()+1)}
   const parts=cleanTime(timings[next[0]]).split(':').map(Number);
   target.setHours(parts[0]||0,parts[1]||0,0,0);
   const seconds=Math.max(0,Math.floor((target-now)/1000));
   const h=String(Math.floor(seconds/3600)).padStart(2,'0');
   const m=String(Math.floor(seconds%3600/60)).padStart(2,'0');
   const s=String(seconds%60).padStart(2,'0');
   host.textContent='المتبقي لصلاة '+next[1]+': '+h+':'+m+':'+s;
  };
  clearInterval(prayerCountdownTimer);tick();prayerCountdownTimer=setInterval(tick,1000);
 }
 function renderPrayerTimes(data){
  const host=el('prayerTimesList');if(!host)return;
  const timings=data.timings||{},now=new Date(),nowMinute=now.getHours()*60+now.getMinutes();
  updatePrayerCountdown(timings);
  const upcoming=prayerNames.find(([key])=>minuteValue(timings[key])>nowMinute)?.[0]||'Fajr';
  host.replaceChildren();
  prayerNames.forEach(([key,label])=>{
   const row=document.createElement('div');row.className='prayer-time-item'+(key===upcoming?' is-next':'');
   const name=document.createElement('span');name.textContent=label+(key===upcoming?' · القادمة':'');
   const time=document.createElement('strong');time.textContent=cleanTime(timings[key]);
   row.append(name,time);host.append(row);
  });
  const date= data.date?.hijri;
  if(date){hijriNode.textContent=[date.weekday?.ar,date.day,date.month?.ar,date.year].filter(Boolean).join(' ')}
  const greg=data.date?.gregorian;
  el('prayerDateLabel').textContent=greg?.weekday?.ar?greg.weekday.ar+' · '+(greg.date||''):'مواقيت اليوم';
 }
 async function loadPrayerAndQibla(coords){
  locationStatus.textContent='جارٍ حساب مواقيت الصلاة واتجاه القبلة…';
  locateBtn.disabled=true;
  try{
   const now=new Date(),date=[String(now.getDate()).padStart(2,'0'),String(now.getMonth()+1).padStart(2,'0'),now.getFullYear()].join('-');
   const base='https://api.aladhan.com/v1';
   const [prayerResponse,qiblaResponse]=await Promise.all([
    fetch(base+'/timings/'+date+'?latitude='+encodeURIComponent(coords.latitude)+'&longitude='+encodeURIComponent(coords.longitude)+'&method='+encodeURIComponent(el('prayerMethodSelect')?.value||'19')+'&school='+encodeURIComponent(el('prayerSchoolSelect')?.value||'0')),
    fetch(base+'/qibla/'+encodeURIComponent(coords.latitude)+'/'+encodeURIComponent(coords.longitude))
   ]);
   if(!prayerResponse.ok||!qiblaResponse.ok)throw new Error('تعذر الاتصال بخدمة المواقيت.');
   const [prayerJson,qiblaJson]=await Promise.all([prayerResponse.json(),qiblaResponse.json()]);
   if(prayerJson.code!==200||qiblaJson.code!==200)throw new Error('لم تصل بيانات الموقع بشكل صحيح.');
   prayerData=prayerJson.data;renderPrayerTimes(prayerData);
   const bearing=Number(qiblaJson.data?.direction);
   if(!Number.isFinite(bearing))throw new Error('تعذر تحديد اتجاه القبلة.');
   qiblaBearingDegrees=bearing;renderQiblaNeedle();
   el('qiblaBearing').textContent=bearing.toFixed(1)+'°';
   el('qiblaStatus').textContent='زاوية القبلة محسوبة من اتجاه الشمال.';
   locationStatus.textContent='تم تحديد موقعك وحساب المواقيت بنجاح.';
  }catch(error){
   locationStatus.textContent=error.message||'حدث خطأ أثناء جلب المواقيت. حاول مجدداً.';
   el('qiblaStatus').textContent='تعذر حساب الاتجاه حالياً.';
  }finally{locateBtn.disabled=false}
 }
 locateBtn.addEventListener('click',()=>{
  if(!navigator.geolocation){locationStatus.textContent='المتصفح لا يدعم تحديد الموقع.';return}
  locationStatus.textContent='بانتظار إذن الموقع من جهازك…';
  navigator.geolocation.getCurrentPosition(position=>{
   coordinates={latitude:position.coords.latitude,longitude:position.coords.longitude};
   loadPrayerAndQibla(coordinates);
  },error=>{
   const messages={1:'لم تمنح إذن الوصول للموقع. يمكنك السماح به من إعدادات المتصفح.',2:'تعذر تحديد موقعك. تحقق من تشغيل خدمة الموقع.',3:'انتهت مهلة تحديد الموقع. حاول مرة أخرى.'};
   locationStatus.textContent=messages[error.code]||'تعذر تحديد الموقع.';
  },{enableHighAccuracy:true,timeout:15000,maximumAge:300000});
 });
 ['prayerMethodSelect','prayerSchoolSelect'].forEach(id=>el(id)?.addEventListener('change',()=>{if(coordinates)loadPrayerAndQibla(coordinates)}));
 // Refresh prayer times after local midnight without asking for location again.
 setInterval(()=>{if(coordinates&&new Date().getHours()===0&&new Date().getMinutes()<2)loadPrayerAndQibla(coordinates)},60000);

 const select=el('quranSurahSelect'),loadBtn=el('quranLoadBtn'),content=el('quranSurahContent'),status=el('quranStatus');
 function setQuranStatus(message){status.textContent=message}
 async function loadSurahIndex(){
  try{
   let list=null;
   try{list=JSON.parse(bqStorage.getItem('bq_quran_surah_index')||'null')}catch(_){}
   if(!Array.isArray(list)||list.length!==114){
    const response=await fetch('https://api.alquran.cloud/v1/surah');
    if(!response.ok)throw new Error('تعذر تحميل فهرس السور.');
    const json=await response.json();list=json.data;
    if(!Array.isArray(list)||list.length!==114)throw new Error('بيانات فهرس السور غير مكتملة.');
    try{bqStorage.setItem('bq_quran_surah_index',JSON.stringify(list))}catch(_){}
   }
   surahList=list;
   select.replaceChildren();
   list.forEach(surah=>{
    const option=document.createElement('option');option.value=String(surah.number);
    option.textContent=surah.number+'. '+surah.name+' ('+surah.numberOfAyahs+' آية)';
    select.append(option);
   });
   select.disabled=false;loadBtn.disabled=false;
   setQuranStatus('اختر السورة التي تريد قراءتها.');
   const saved=Number(bqStorage.getItem('bq_quran_last_surah')||1);
   currentSurah=Number.isInteger(saved)&&saved>=1&&saved<=114?saved:1;
   select.value=String(currentSurah);
   await renderSurah(currentSurah);
  }catch(error){setQuranStatus(error.message||'تعذر تحميل فهرس المصحف. تحقق من الاتصال بالإنترنت.')}
 }
 async function renderSurah(number){
  if(!Number.isInteger(number)||number<1||number>114)return;
  loadBtn.disabled=true;select.disabled=true;content.replaceChildren();
  setQuranStatus('جارٍ تحميل السورة…');
  try{
   let json=null;
   try{json=JSON.parse(localStorage.getItem('bq_quran_surah_cache_'+number)||'null')}catch(_){}
   if(!json||!json.data?.ayahs){
    const response=await fetch('https://api.alquran.cloud/v1/surah/'+number+'/quran-uthmani');
    if(!response.ok)throw new Error('تعذر تحميل السورة المطلوبة، ولا توجد نسخة محفوظة لهذه السورة.');
    json=await response.json();
    try{
     localStorage.setItem('bq_quran_surah_cache_'+number,JSON.stringify(json));
     let cached=JSON.parse(localStorage.getItem('bq_quran_cached_surahs')||'[]');if(!Array.isArray(cached))cached=[];
     cached=[number,...cached.filter(n=>n!==number)].slice(0,5);
     Object.keys(localStorage).filter(k=>k.startsWith('bq_quran_surah_cache_')&&!cached.includes(Number(k.split('_').pop()))).forEach(k=>localStorage.removeItem(k));
     localStorage.setItem('bq_quran_cached_surahs',JSON.stringify(cached));
    }catch(_){}
   }
   const surah=json.data;
   if(!surah||!Array.isArray(surah.ayahs)||!surah.ayahs.length)throw new Error('لم تصل آيات السورة بشكل صحيح.');
   currentSurah=number;select.value=String(number);
   try{bqStorage.setItem('bq_quran_last_surah',String(number))}catch(_){}
   const title=document.createElement('h3');title.className='quran-surah-title';title.textContent=surah.name;
   content.append(title);
   if(number!==1&&number!==9){const b=document.createElement('p');b.className='quran-bismillah';b.textContent='بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';content.append(b)}
   const ayahs=document.createElement('div');ayahs.className='quran-ayahs';
   surah.ayahs.forEach(ayah=>{
    const row=document.createElement('p');row.className='quran-ayah-row';row.dataset.ayahText=ayah.text;
    const text=document.createTextNode(ayah.text+' ');
    const mark=document.createElement('span');mark.className='quran-ayah-number';mark.textContent=String(ayah.numberInSurah);mark.dataset.ayahNumber=String(ayah.numberInSurah);
    const save=document.createElement('button');save.type='button';save.className='quran-save-ayah';save.dataset.saveAyah=String(ayah.numberInSurah);save.textContent='♡';save.setAttribute('aria-label','حفظ الآية '+ayah.numberInSurah);
    const tafsir=document.createElement('button');tafsir.type='button';tafsir.className='quran-tafsir-button';tafsir.dataset.tafsirAyah=String(ayah.numberInSurah);tafsir.textContent='التفسير الميسر';
    row.append(text,mark,save,tafsir);ayahs.append(row);
   });
   content.append(ayahs);
   status.textContent='سورة '+(surah.name||'')+' · '+surah.numberOfAyahs+' آية';
   el('quranPrevBtn').disabled=number===1;el('quranNextBtn').disabled=number===114;
  }catch(error){setQuranStatus(error.message||'تعذر تحميل السورة. حاول مجدداً.')}
  finally{loadBtn.disabled=false;select.disabled=false}
 }
 loadBtn.addEventListener('click',()=>renderSurah(Number(select.value)));
 select.addEventListener('change',()=>{if(select.value)renderSurah(Number(select.value))});
 el('quranPrevBtn').addEventListener('click',()=>renderSurah(currentSurah-1));
 el('quranNextBtn').addEventListener('click',()=>renderSurah(currentSurah+1));
 // Load the Quran index only when the user opens the Sharia section.
 let indexLoaded=false;
 document.querySelector('[data-sharia-tab="quran"]')?.addEventListener('sharia:quran-open',()=>{
  if(!indexLoaded){indexLoaded=true;loadSurahIndex()}
 });
 // If section is restored or activated programmatically.

})();


/* Five-door Sharia hub: adhkar, tasbih, Hijri occasions, Asma al-Husna and Quran tools. */
(function setupShariaDoors(){
 const $=id=>document.getElementById(id);
 const tabs=Array.from(document.querySelectorAll('[data-sharia-tab]'));
 const panels=Array.from(document.querySelectorAll('[data-sharia-panel]'));
 function activate(name){
  tabs.forEach(t=>{const on=t.dataset.shariaTab===name;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',String(on))});
  panels.forEach(p=>{const on=p.dataset.shariaPanel===name;p.classList.toggle('is-active',on);p.hidden=!on});
  try{localStorage.setItem('bq_sharia_last_door',name)}catch(_){}
  if(name==='library')loadNames();
  if(name==='quran')document.querySelector('[data-sharia-tab="quran"]')?.dispatchEvent(new Event('sharia:quran-open'));
 }
 tabs.forEach(t=>t.addEventListener('click',()=>activate(t.dataset.shariaTab)));
 panels.forEach(p=>{if(p.dataset.shariaPanel!=='prayer')p.hidden=true});
 let savedDoor='prayer';try{savedDoor=localStorage.getItem('bq_sharia_last_door')||'prayer'}catch(_){}
 activate(tabs.some(t=>t.dataset.shariaTab===savedDoor)?savedDoor:'prayer');

 const data={
  morning:[
   ['أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.','مرة واحدة','ذكر الصباح'],
   ['اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.','مرة واحدة','ذكر الصباح'],
   ['سبحان الله وبحمده','100 مرة','صحيح مسلم'],
   ['رضيت بالله رباً، وبالإسلام ديناً، وبمحمد ﷺ نبياً.','3 مرات','ذكر مأثور']
  ],
  evening:[
   ['أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.','مرة واحدة','ذكر المساء'],
   ['اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.','مرة واحدة','ذكر المساء'],
   ['سبحان الله وبحمده','100 مرة','صحيح مسلم'],
   ['رضيت بالله رباً، وبالإسلام ديناً، وبمحمد ﷺ نبياً.','3 مرات','ذكر مأثور']
  ],
  afterPrayer:[
   ['سبحان الله','33 مرة','صحيح مسلم'],
   ['الحمد لله','33 مرة','صحيح مسلم'],
   ['الله أكبر','33 مرة','صحيح مسلم'],
   ['لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.','مرة واحدة','تمام المئة']
  ],
  sleep:[
   ['باسمك اللهم أموت وأحيا.','مرة واحدة','صحيح البخاري'],
   ['اللهم قني عذابك يوم تبعث عبادك.','3 مرات','سنن أبي داود'],
   ['سبحان الله','33 مرة','قبل النوم'],
   ['الحمد لله','33 مرة','قبل النوم'],
   ['الله أكبر','34 مرة','قبل النوم'],
   ['الحمد لله الذي أحيانا بعدما أماتنا وإليه النشور.','عند الاستيقاظ','صحيح البخاري']
  ]
 };
 function renderDhikr(kind){
  document.querySelectorAll('[data-dhikr-category]').forEach(b=>b.classList.toggle('is-active',b.dataset.dhikrCategory===kind));
  const host=$('dhikrList');if(!host)return;host.replaceChildren();
  (data[kind]||[]).forEach(item=>{
   const card=document.createElement('article');card.className='dhikr-item';
   const text=document.createElement('p');text.className='dhikr-text';text.textContent=item[0];
   const meta=document.createElement('small');meta.textContent=item[1]+' · '+item[2];
   const controls=document.createElement('div');controls.className='dhikr-controls';
   const count=document.createElement('strong');count.className='dhikr-count';count.textContent='0';
   const tap=document.createElement('button');tap.type='button';tap.textContent='تسبيح';
   let n=0;tap.addEventListener('click',()=>{n++;count.textContent=String(n);if(n>=parseInt(item[1],10))tap.textContent='اكتمل العدد ✓'});
   const reset=document.createElement('button');reset.type='button';reset.textContent='إعادة';reset.addEventListener('click',()=>{n=0;count.textContent='0';tap.textContent='تسبيح'});
   controls.append(count,tap,reset);card.append(text,meta,controls);host.append(card);
  });
 }
 document.querySelectorAll('[data-dhikr-category]').forEach(b=>b.addEventListener('click',()=>renderDhikr(b.dataset.dhikrCategory)));
 renderDhikr('morning');

 const phrase=$('tasbihPhrase'),countNode=$('tasbihCount'),goal=$('tasbihGoal'),bar=$('tasbihProgress');
 const key=()=> 'bq_tasbih_count_'+(phrase?.selectedIndex||0);
 function readCount(){try{const n=Number(localStorage.getItem(key())||0);return Number.isFinite(n)&&n>0?n:0}catch(_){return 0}}
 let count=readCount();
 function draw(){if(!countNode)return;countNode.textContent=String(count);bar.style.width=Math.min(100,count/(Number(goal.value)||100)*100)+'%'}
 function save(){try{localStorage.setItem(key(),String(count))}catch(_){}draw()}
 phrase?.addEventListener('change',()=>{count=readCount();draw()});
 $('tasbihTap')?.addEventListener('click',()=>{count++;save();if(navigator.vibrate)navigator.vibrate(12)});
 $('tasbihMinus')?.addEventListener('click',()=>{count=Math.max(0,count-1);save()});
 $('tasbihReset')?.addEventListener('click',()=>{count=0;save()});
 goal?.addEventListener('change',draw);draw();

 function updateHijri(){
  const now=new Date();let p={};
  try{p=Object.fromEntries(new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{day:'numeric',month:'numeric',year:'numeric'}).formatToParts(now).map(x=>[x.type,x.value]))}catch(_){}
  const day=Number(p.day)||1,month=Number(p.month)||1;
  if($('hijriFullDate'))$('hijriFullDate').textContent=new Intl.DateTimeFormat('ar-DZ-u-ca-islamic-umalqura',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(now);
  if($('hijriMonthProgress'))$('hijriMonthProgress').textContent='اليوم '+day+' من الشهر الهجري';
  const events=[[1,1,'رأس السنة الهجرية'],[10,1,'عاشوراء'],[12,3,'المولد النبوي'],[1,7,'بداية رجب'],[27,7,'الإسراء والمعراج'],[1,9,'بداية رمضان'],[17,9,'غزوة بدر'],[27,9,'ليلة يُرجى تحري ليلة القدر'],[1,10,'عيد الفطر'],[9,12,'يوم عرفة'],[10,12,'عيد الأضحى']];
  const host=$('islamicOccasionsList');
  if(host){host.replaceChildren();events.forEach(e=>{
   const row=document.createElement('div');row.className='occasion-row'+(e[0]===day&&e[1]===month?' is-today':'');
   const date=document.createElement('strong');date.textContent=e[0]+'/'+e[1];
   const label=document.createElement('span');label.textContent=e[2];
   const note=document.createElement('small');note.textContent=e[0]===day&&e[1]===month?'اليوم':'موعد هجري تقريبي';
   row.append(date,label,note);host.append(row);
  })}
  if($('ramadanStatus'))$('ramadanStatus').textContent=month===9?'نحن في شهر رمضان وفق التقويم المعروض.':'تظهر متابعة رمضان عند دخول الشهر التاسع الهجري.';
 }
 updateHijri();setInterval(updateHijri,3600000);

 let namesLoaded=false;
 async function loadNames(){
  if(namesLoaded)return;namesLoaded=true;
  const host=$('asmaNamesGrid');if(!host)return;host.textContent='جارٍ تحميل أسماء الله الحسنى…';
  try{
   let items=null;try{items=JSON.parse(localStorage.getItem('bq_asma_names_cache')||'null')}catch(_){}
   if(!Array.isArray(items)||!items.length){
    const r=await fetch('https://api.aladhan.com/v1/asmaAlHusna');if(!r.ok)throw new Error('تعذر الاتصال بمصدر الأسماء.');
    const j=await r.json();items=j.data;if(!Array.isArray(items)||!items.length)throw new Error('لم تصل قائمة الأسماء.');
    try{localStorage.setItem('bq_asma_names_cache',JSON.stringify(items))}catch(_){}
   }
   host.replaceChildren();items.forEach(item=>{
    const card=document.createElement('div');card.className='asma-name-card';
    const name=document.createElement('strong');name.textContent=item.name;
    const meaning=document.createElement('small');meaning.textContent=item.transliteration||item.en?.meaning||'';
    card.append(name,meaning);host.append(card);
   });
  }catch(err){namesLoaded=false;host.textContent=err.message||'تعذر تحميل الأسماء حالياً.'}
 }

 const search=$('quranSearchInput'),searchStatus=$('quranSearchStatus'),quran=$('quranSurahContent');
 search?.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();let matches=0;
  quran?.querySelectorAll('.quran-ayah-row').forEach(row=>{
   const hit=!q||row.dataset.ayahText.toLowerCase().includes(q);row.hidden=!hit;if(hit&&q)matches++;
  });
  if(searchStatus)searchStatus.textContent=q?(matches?'الآيات المطابقة: '+matches:'لا توجد آيات مطابقة في السورة الحالية.'):'';
 });
 $('quranBookmarkBtn')?.addEventListener('click',()=>{
  const n=Number($('quranSurahSelect')?.value);if(!n)return;
  let saved=[];try{saved=JSON.parse(localStorage.getItem('bq_quran_bookmarks')||'[]')}catch(_){}
  if(!Array.isArray(saved))saved=[];const i=saved.indexOf(n);if(i>=0)saved.splice(i,1);else saved.push(n);
  try{localStorage.setItem('bq_quran_bookmarks',JSON.stringify(saved))}catch(_){}
  $('quranBookmarkBtn').textContent=i>=0?'♡ حفظ السورة':'♥ السورة محفوظة';
 });
 quran?.addEventListener('click',async event=>{
  const tafsirButton=event.target.closest('[data-tafsir-ayah]');
  if(tafsirButton){
   const row=tafsirButton.closest('.quran-ayah-row'),surah=Number($('quranSurahSelect')?.value),ayah=Number(tafsirButton.dataset.tafsirAyah);
   let panel=row.querySelector('.quran-tafsir');if(panel){panel.hidden=!panel.hidden;return}
   panel=document.createElement('p');panel.className='quran-tafsir';panel.textContent='جارٍ تحميل التفسير الميسر…';row.append(panel);tafsirButton.disabled=true;
   try{
    const key=surah+':'+ayah;let text='';
    try{text=localStorage.getItem('bq_tafsir_'+key)||''}catch(_){}
    if(!text){const r=await fetch('https://api.alquran.cloud/v1/ayah/'+key+'/ar.muyassar');if(!r.ok)throw new Error('تعذر تحميل التفسير.');
     const j=await r.json();text=j.data?.text||'';if(!text)throw new Error('لا يتوفر تفسير لهذه الآية.');try{localStorage.setItem('bq_tafsir_'+key,text)}catch(_){}
    }
    panel.textContent=text;
   }catch(err){panel.textContent=err.message||'تعذر تحميل التفسير حالياً.'}
   finally{tafsirButton.disabled=false}
   return;
  }
  const b=event.target.closest('[data-save-ayah]');if(!b)return;
  const key=Number($('quranSurahSelect')?.value)+':'+Number(b.dataset.saveAyah);
  let saved=[];try{saved=JSON.parse(localStorage.getItem('bq_quran_saved_ayahs')||'[]')}catch(_){}
  if(!Array.isArray(saved))saved=[];const i=saved.indexOf(key);if(i>=0)saved.splice(i,1);else saved.push(key);
  try{localStorage.setItem('bq_quran_saved_ayahs',JSON.stringify(saved))}catch(_){}
  b.textContent=i>=0?'♡':'♥';
 });
 const savedPanel=$('quranSavedList');
 $('quranShowSavedBtn')?.addEventListener('click',()=>{
  if(!savedPanel)return;
  savedPanel.hidden=!savedPanel.hidden;if(savedPanel.hidden)return;
  savedPanel.replaceChildren();
  let surahs=[],ayahs=[];try{surahs=JSON.parse(localStorage.getItem('bq_quran_bookmarks')||'[]')}catch(_){}
  try{ayahs=JSON.parse(localStorage.getItem('bq_quran_saved_ayahs')||'[]')}catch(_){}
  const title=document.createElement('strong');title.textContent='السور المحفوظة';savedPanel.append(title);
  if(!surahs.length){const empty=document.createElement('p');empty.textContent='لا توجد سور محفوظة بعد.';savedPanel.append(empty)}
  surahs.forEach(n=>{const b=document.createElement('button');b.type='button';b.textContent='فتح السورة رقم '+n;b.addEventListener('click',()=>{const select=$('quranSurahSelect');select.value=String(n);$('quranLoadBtn').click();savedPanel.hidden=true});savedPanel.append(b)});
  const verseTitle=document.createElement('strong');verseTitle.textContent='الآيات المحفوظة';savedPanel.append(verseTitle);
  if(!ayahs.length){const empty=document.createElement('p');empty.textContent='لا توجد آيات محفوظة بعد.';savedPanel.append(empty)}
  ayahs.forEach(key=>{const b=document.createElement('button');b.type='button';b.textContent='السورة والآية '+key;b.addEventListener('click',()=>{const parts=key.split(':');$('quranSurahSelect').value=parts[0];$('quranLoadBtn').click();setTimeout(()=>quran?.querySelector('[data-ayah-number="'+parts[1]+'"]')?.scrollIntoView({behavior:'smooth',block:'center'}),650);savedPanel.hidden=true});savedPanel.append(b)});
 });
 const play=$('quranPlayBtn'),audio=$('quranAudioPlayer');let tracks=[],trackIndex=0;
 async function startAudio(){
  const n=Number($('quranSurahSelect')?.value);if(!n)return;
  play.disabled=true;play.textContent='جارٍ تجهيز التلاوة…';
  try{
   const r=await fetch('https://api.alquran.cloud/v1/surah/'+n+'/ar.alafasy');if(!r.ok)throw new Error('تعذر تحميل روابط التلاوة.');
   const j=await r.json();tracks=(j.data?.ayahs||[]).map(a=>a.audio).filter(Boolean);if(!tracks.length)throw new Error('التلاوة غير متاحة حالياً.');
   trackIndex=0;audio.hidden=false;audio.src=tracks[0];await audio.play();play.textContent='إيقاف التلاوة';
  }catch(err){if(searchStatus)searchStatus.textContent=err.message||'تعذر تشغيل التلاوة.';play.textContent='▶ تشغيل التلاوة'}
  finally{play.disabled=false}
 }
 play?.addEventListener('click',()=>{
  if(!audio.paused){audio.pause();play.textContent='▶ متابعة التلاوة';return}
  if(tracks.length&&audio.src){audio.play().then(()=>play.textContent='إيقاف التلاوة').catch(()=>{});return}
  startAudio();
 });
 audio?.addEventListener('ended',()=>{trackIndex++;if(trackIndex<tracks.length){audio.src=tracks[trackIndex];audio.play().catch(()=>{})}else play.textContent='▶ إعادة التلاوة'});

 // Prayer alerts are browser notifications while the page is open only.
 let notifyTimer=null,lastNotice='';
 $('prayerNotifyBtn')?.addEventListener('click',async()=>{
  const button=$('prayerNotifyBtn');
  if(!('Notification'in window)){button.textContent='الإشعارات غير مدعومة';return}
  const permission=Notification.permission==='granted'?'granted':await Notification.requestPermission();
  if(permission!=='granted'){button.textContent='لم يتم منح إذن الإشعارات';return}
  if(notifyTimer){clearInterval(notifyTimer);notifyTimer=null;button.textContent='تفعيل تنبيه الصلاة أثناء فتح التطبيق';return}
  button.textContent='التنبيه مفعّل أثناء فتح التطبيق';
  notifyTimer=setInterval(()=>{
   const t=$('prayerCountdown')?.textContent||'',m=t.match(/المتبقي لصلاة (.+): 00:00:00/);
   if(m&&lastNotice!==m[1]){lastNotice=m[1];try{new Notification('حان وقت صلاة '+m[1],{body:'تذكير بوقت الصلاة.'})}catch(_){}}
  },1000);
 });
})();

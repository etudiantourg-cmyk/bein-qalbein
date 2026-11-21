
const { categories, messages, categoryClosings, husbandAdvice, wifeAdvice, extraBases, extraClosings, i18n, languageText, categoryGroups, smartNames, builderCopy, rescueText, challenges, iconPaths, categoryIconMap, bqClosings, translatedClosings } = window.BQ_DATA;


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

let role='husband',lang=(bqStorage.getItem('bq_language')||'ar'),selected='morning',current='',favs=[];
function updateStorageStatus(){
 const note=$('storageWarning');if(!note)return;
 const persistent=bqStorage.persistent;note.hidden=persistent;
 if(!persistent)note.textContent=lang==='en'?'Browser storage is unavailable or full. Changes are kept only until this page closes. Export a backup when storage is available.':lang==='fr'?'Le stockage du navigateur est indisponible ou plein. Les changements ne restent disponibles que jusqu’à la fermeture de cette page. Exportez une sauvegarde lorsque le stockage sera disponible.':'تخزين المتصفح غير متاح أو ممتلئ. ستبقى التغييرات في الذاكرة حتى إغلاق هذه الصفحة فقط. أنشئ نسخة احتياطية عندما يتاح التخزين.';
}
if(!['ar','en','fr'].includes(lang))lang='ar';
try{const storedFavs=JSON.parse(bqStorage.getItem('bq_favorites')||'[]');favs=Array.isArray(storedFavs)?[...new Set(storedFavs.filter(x=>typeof x==='string'))].slice(0,1000):[]}catch(e){favs=[]}
function saveFavs(){try{bqStorage.setItem('bq_favorites',JSON.stringify(favs))}catch(e){alert('تعذر الحفظ في مساحة المتصفح.')}} 
/* Categories use the grouped, accessible renderer defined in the current app flow. */
function generate(){
 const pool=messages[selected]||messages.morning;
 let next=pool[Math.floor(Math.random()*pool.length)];
 if(pool.length>1&&next===current)next=pool[(pool.indexOf(next)+1)%pool.length];
 current=next;
 if(role==='wife'&&lang==='ar')current=current.replaceAll('حبيبي','حبيبتي');
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
document.querySelectorAll('.role').forEach(b=>b.onclick=()=>{role=b.dataset.role;document.querySelectorAll('.role').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});generate()});
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
/* V42 performance: decorative floating particles are intentionally disabled on mobile. */


/* V19 — complete interface language layer (Arabic / English / French) */


let activeAdvice='husband';
const originalMessagePools=Object.fromEntries(Object.entries(messages).map(([key,pool])=>[key,pool.slice()]));

function showFavs(){
 const box=$('favorites');box.innerHTML='';const t=languageText[lang]||languageText.ar;
 if(!favs.length){const p=document.createElement('p');p.className='empty';p.textContent=t.empty;box.append(p);return}
 favs.forEach((item,i)=>{const row=document.createElement('div');row.className='favitem';const p=document.createElement('div');p.textContent=item;const cp=document.createElement('button');cp.type='button';cp.textContent=lang==='ar'?'نسخ':lang==='en'?'Copy':'Copier';cp.onclick=()=>copyText(item);const del=document.createElement('button');del.type='button';del.textContent=t.delete;del.onclick=()=>{favs.splice(i,1);saveFavs();showFavs()};row.append(p,cp,del);box.append(row)});
}
function renderAdviceForLanguage(){
 const t=lang==='ar'?null:i18n[lang];const list=lang==='ar'?(activeAdvice==='wife'?wifeAdvice:husbandAdvice):(activeAdvice==='wife'?t.adviceW:t.adviceH);
 $('adviceList').innerHTML='';list.forEach((tip,i)=>{const d=document.createElement('div');d.className='advice-item';d.textContent=(i+1)+'. '+tip;$('adviceList').append(d)});
 $('adviceModalTitle').textContent=activeAdvice==='wife'?languageText[lang].wifeAdvice:languageText[lang].husbandAdvice;
 $('husbandTips').classList.toggle('active',activeAdvice==='husband');$('wifeTips').classList.toggle('active',activeAdvice==='wife');
}
function applyTheme(){const dark=bqStorage.getItem('bq_theme')==='dark';document.body.classList.toggle('dark-mode',dark);$('themeToggle').textContent=dark?languageText[lang].day:languageText[lang].night}
function notificationCopy(){if(lang==='en')return role==='wife'?'A gentle reminder: your kindness can brighten your husband’s day. ♥':'A gentle reminder: a kind word can make your wife’s day warmer. ♥';if(lang==='fr')return role==='wife'?'Un doux rappel : votre tendresse peut illuminer la journée de votre mari. ♥':'Un doux rappel : quelques mots bienveillants peuvent embellir la journée de votre épouse. ♥';return role==='wife'?'تذكير لطيف: كلمة طيبة منكِ قد تجعل يوم زوجك أجمل. ♥':'تذكير لطيف: كلمة حانية منك قد تجعل يوم زوجتك أجمل. ♥'}
let notificationTimer=null;
async function sendGentleNotification(){if(!('Notification'in window)||Notification.permission!=='granted')return;const last=Number(bqStorage.getItem('bq_last_notification')||0);if(Date.now()-last<86400000)return;const title=lang==='en'?'Between Two Hearts':lang==='fr'?'Entre deux cœurs':'بين قلبين';const options={body:notificationCopy(),icon:'./icon.svg',badge:'./icon.svg',tag:'bein-qalbein-daily',renotify:false};try{if(navigator.serviceWorker){const reg=await navigator.serviceWorker.ready;await reg.showNotification(title,options)}else new Notification(title,options);bqStorage.setItem('bq_last_notification',String(Date.now()))}catch(_){}}
function scheduleGentleNotification(){if(notificationTimer)clearInterval(notificationTimer);if(bqStorage.getItem('bq_notifications')!=='on')return;sendGentleNotification();notificationTimer=setInterval(sendGentleNotification,3600000)}
async function toggleGentleNotifications(){if(!('Notification'in window)){alert(lang==='en'?'Notifications are not supported by this browser.':lang==='fr'?'Les notifications ne sont pas prises en charge.':'هذا المتصفح لا يدعم الإشعارات.');return}if(bqStorage.getItem('bq_notifications')==='on'){bqStorage.setItem('bq_notifications','off');if(notificationTimer)clearInterval(notificationTimer);$('notifyToggle').textContent=languageText[lang].notifyOff;return}const permission=await Notification.requestPermission();if(permission!=='granted'){alert(languageText[lang].permissionDenied);return}bqStorage.setItem('bq_notifications','on');$('notifyToggle').textContent=languageText[lang].notifyOn;scheduleGentleNotification()}
function applyLanguage(){
 const t=languageText[lang]||languageText.ar;const ar=lang==='ar';
 document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';$('lang').value=lang;document.title=t.title;
 const set=(id,v)=>{const el=$(id);if(el)el.textContent=v};
 set('roleTitle',t.roleTitle);$('husband').innerHTML='<span class="ico">♛</span>'+t.husband;$('wife').innerHTML='<span class="ico">♡</span>'+t.wife;
 set('languageLabel',t.language);set('catTitle',t.catTitle);$('search').placeholder=t.search;set('heartTitle',t.heartTitle);set('shareBtn',t.share);set('favBtn',t.favAdd);set('newBtn',t.newMsg);set('copyBtn',t.copyMsg);set('favTitle',t.favorites);set('showFav',t.showFav);set('hideFav',t.hideFav);set('dailyTitle',t.daily);set('dailyKicker',t.dailyDesc);set('copyDaily',t.copyDaily);set('guideTitle',t.guide);set('guideKicker',t.guideDesc);set('husbandTips',t.husbandAdvice);set('wifeTips',t.wifeAdvice);set('hint',t.hint);set('appFooter',t.footer);set('appTagline',t.tagline);set('notifyNote',t.notifyNote);set('adviceHint',t.adviceHint);$('notifyToggle').textContent=bqStorage.getItem('bq_notifications')==='on'?t.notifyOn:t.notifyOff;$('themeToggle').textContent=bqStorage.getItem('bq_theme')==='dark'?t.day:t.night;
 const categoryTranslations=ar?null:i18n[lang];categories.forEach((c,i)=>{c._name=c._name||c.name;c._desc=c._desc||c.desc;c.name=ar?c._name:categoryTranslations.cats[i];c.desc=ar?c._desc:categoryTranslations.desc[i]});
 if(ar){Object.keys(messages).forEach(id=>messages[id]=originalMessagePools[id].slice())}
 else{const translatedLibrary=i18n[lang],endings=translatedClosings[lang]||[];Object.keys(messages).forEach((id,i)=>{const pool=translatedLibrary.msgs[i]||translatedLibrary.msgs[0];messages[id]=endings.length?pool.flatMap(base=>endings.map(ending=>base+' '+ending)):pool.slice()})}
 groupedRenderCats($('search').value);generate();$('dailyMessage').textContent=ar?dailyText():messages[selected][(new Date().getDate()*7)%messages[selected].length];renderAdviceForLanguage();showFavs();
}
$('lang').onchange=e=>{lang=e.target.value;try{bqStorage.setItem('bq_language',lang)}catch(_){}applyLanguage()};
$('themeToggle').onclick=()=>{const dark=!document.body.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',dark);try{bqStorage.setItem('bq_theme',dark?'dark':'light')}catch(_){}$('themeToggle').textContent=dark?languageText[lang].day:languageText[lang].night};$('notifyToggle').onclick=toggleGentleNotifications;
function openAdvice(which){activeAdvice=which;renderAdviceForLanguage();$('adviceModal').classList.remove('hidden');document.body.style.overflow='hidden'}
$('husbandTips').onclick=()=>openAdvice('husband');$('wifeTips').onclick=()=>openAdvice('wife');
$('closeAdvice').onclick=()=>{$('adviceModal').classList.add('hidden');document.body.style.overflow=''};
$('adviceModal').addEventListener('click',e=>{if(e.target===$('adviceModal'))$('closeAdvice').click()});
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
 const allowed=['home','favorites','guide','settings'];
 if(!allowed.includes(page))page='home';
 document.querySelectorAll('.page-section').forEach(section=>{
  const active=section.dataset.page===page;
  section.classList.toggle('active-page',active);
  section.setAttribute('aria-hidden',String(!active));
  section.inert=!active;
 });
 document.querySelectorAll('.bottom-nav button').forEach(button=>{
  const active=button.dataset.go===page;
  button.classList.toggle('active',active);
  if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
 });
 try{bqStorage.setItem('bq_last_page',page)}catch(_){}
 window.scrollTo({top:0,behavior:'auto'});
 if(page==='favorites'){showFavs();renderHistory();renderCustomNotes()}
 if(page==='settings')updateStorageStatus();
}
/* Bottom navigation is handled by the single delegated router below. */
function rememberMessage(value){
 if(!value)return;let list=[];try{list=JSON.parse(bqStorage.getItem('bq_recent_messages')||'[]')}catch(_){}
 list=[value,...list.filter(x=>x!==value)].slice(0,12);
 try{bqStorage.setItem('bq_recent_messages',JSON.stringify(list))}catch(_){}
}
function renderHistory(){
 let list=[];try{const stored=JSON.parse(bqStorage.getItem('bq_recent_messages')||'[]');list=Array.isArray(stored)?stored.filter(x=>typeof x==='string').slice(0,12):[]}catch(_){}
 const host=$('historyList');host.innerHTML='';
 if(!list.length){host.innerHTML='<p class="empty">'+(lang==='en'?'No recent messages yet.':lang==='fr'?'Aucun message récent.':'لا توجد رسائل حديثة بعد.')+'</p>';return}
 list.forEach(value=>{const d=document.createElement('div');d.className='history-item';const p=document.createElement('div');p.textContent=value;const b=document.createElement('button');b.textContent=lang==='en'?'Copy':lang==='fr'?'Copier':'نسخ';b.onclick=()=>copyText(value);d.append(p,b);host.append(d)})
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
async function createMessageCard(){
 if(!current){alert(lang==='en'?'Choose a message first.':lang==='fr'?'Choisissez d’abord un message.':'اختر رسالة أولاً.');return}
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
 if(!ctx){alert(lang==='en'?'This browser cannot create an image card.':lang==='fr'?'Ce navigateur ne peut pas créer la carte.':'هذا المتصفح لا يستطيع إنشاء بطاقة الصورة.');return}
 const maxWidth=850,words=current.trim().split(/\s+/u),lines=[];
 let line='',fontSize=48;
 const setFont=()=>{ctx.font='600 '+fontSize+'px Tajawal, sans-serif'};
 setFont();
 words.forEach(word=>{const candidate=line?line+' '+word:word;if(ctx.measureText(candidate).width>maxWidth&&line){lines.push(line);line=word}else line=candidate});
 if(line)lines.push(line);
 if(lines.length>22){fontSize=40;setFont();lines.length=0;line='';words.forEach(word=>{const candidate=line?line+' '+word:word;if(ctx.measureText(candidate).width>maxWidth&&line){lines.push(line);line=word}else line=candidate});if(line)lines.push(line)}
 canvas.width=1080;canvas.height=Math.max(1350,700+lines.length*(fontSize+24));
 const g=ctx.createLinearGradient(0,0,1080,canvas.height);g.addColorStop(0,'#fff8ed');g.addColorStop(.48,'#f6dce5');g.addColorStop(1,'#4c0825');
 ctx.fillStyle=g;ctx.fillRect(0,0,1080,canvas.height);
 ctx.strokeStyle='#e9c477';ctx.lineWidth=12;ctx.strokeRect(42,42,996,canvas.height-84);ctx.lineWidth=3;ctx.strokeRect(62,62,956,canvas.height-124);
 ctx.textAlign='center';ctx.direction=lang==='ar'?'rtl':'ltr';ctx.fillStyle='#7b1741';ctx.font='bold 78px Tajawal, sans-serif';
 ctx.fillText(lang==='en'?'Between Two Hearts':lang==='fr'?'Entre deux cœurs':'بين قلبين',540,205);
 ctx.fillStyle='#b38a43';ctx.font='42px Tajawal, sans-serif';ctx.fillText('♡',540,290);
 ctx.fillStyle='#4c0825';ctx.font='600 '+fontSize+'px Tajawal, sans-serif';
 const lineHeight=fontSize+24,textHeight=lines.length*lineHeight;let y=Math.max(390,(canvas.height-textHeight)/2+lineHeight/2);
 lines.forEach(textLine=>{ctx.fillText(textLine,540,y,maxWidth);y+=lineHeight});
 ctx.fillStyle='#ffe8ad';ctx.font='34px Tajawal, sans-serif';ctx.fillText(lang==='en'?'Kind words make life beautiful':lang==='fr'?'Les belles paroles embellissent la vie':'الكلمات الجميلة تجعل الحياة أجمل',540,canvas.height-105);
 canvas.toBlob(blob=>{if(!blob){alert(lang==='en'?'Could not create the image card.':lang==='fr'?'Impossible de créer la carte.':'تعذر إنشاء البطاقة.');return}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='bein-qalbein-card.png';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000)},'image/png');
}
$('cardBtn').onclick=createMessageCard;

const originalGenerate=generate;
generate=function(){originalGenerate();rememberMessage(current)};
const originalApplyLanguage=applyLanguage;

applyLanguage=function(){originalApplyLanguage();groupedRenderCats($('search').value);renderHistory();renderCustomNotes();renderSmartChips();const labels={ar:['الرئيسية','المفضلة','الدليل','الإعدادات','الإعدادات','فاجئني برسالة','رسائلك الخاصة','آخر الرسائل','اكتب رسالة خاصة بك...','حفظ رسالتي'],en:['Home','Favorites','Guide','Settings','Settings','Surprise me','My private messages','Recent messages','Write your own message...','Save my message'],fr:['Accueil','Favoris','Guide','Paramètres','Paramètres','Surprenez-moi','Mes messages privés','Messages récents','Écrivez votre message...','Enregistrer']};const x=labels[lang]||labels.ar;['navHome','navFavorites','navGuide','navSettings','settingsTitle','surpriseBtn','customTitle','historyTitle'].forEach((id,i)=>$(id).textContent=x[i]);$('customInput').placeholder=x[8];$('saveCustom').textContent=x[9]};
goPage(['home','favorites','guide','settings'].includes(bqStorage.getItem('bq_last_page'))?bqStorage.getItem('bq_last_page'):'home');
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
const backupKeys=['bq_favorites','bq_language','bq_theme','bq_recent_messages','bq_custom_notes','bq_notifications','bq_last_notification','bq_favorite_folders','bq_font_scale','bq_palette','bq_ai_language','bq_ai_language_manual'];
function validBackupValue(key,raw){
 if(typeof raw!=='string'||raw.length>1500000)return false;
 if(key==='bq_language')return ['ar','en','fr'].includes(raw);
 if(key==='bq_ai_language')return ['العربية','الإنجليزية','الفرنسية'].includes(raw);
 if(key==='bq_ai_language_manual')return ['0','1'].includes(raw);
 if(key==='bq_theme')return ['dark','light'].includes(raw);
 if(key==='bq_notifications')return ['on','off'].includes(raw);
 if(key==='bq_palette')return ['rose','royal','night'].includes(raw);
 if(key==='bq_font_scale'){const n=Number(raw);return Number.isFinite(n)&&n>=0.9&&n<=1.2}
 if(key==='bq_last_notification')return raw===''||(/^\d{1,16}$/.test(raw)&&Number(raw)>=0);
 let value;try{value=JSON.parse(raw)}catch(_){return false}
 if(key==='bq_favorites')return Array.isArray(value)&&value.length<=1000&&value.every(x=>typeof x==='string'&&x.length<=10000);
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
function updatePalette(value){document.body.classList.remove('theme-rose','theme-royal','theme-night');document.body.classList.add('theme-'+value);bqStorage.setItem('bq_palette',value)}
$('paletteSelect').onchange=e=>updatePalette(e.target.value);
$('fontScale').oninput=e=>{document.documentElement.style.setProperty('--bq-scale',e.target.value);bqStorage.setItem('bq_font_scale',e.target.value)};
const savedScale=Number(bqStorage.getItem('bq_font_scale')||'1');const storedScale=Number.isFinite(savedScale)?Math.min(1.2,Math.max(0.9,savedScale)):1;$('fontScale').value=String(storedScale);document.documentElement.style.setProperty('--bq-scale',String(storedScale));
const savedPalette=bqStorage.getItem('bq_palette')||'royal';const storedPalette=['royal','rose','night'].includes(savedPalette)?savedPalette:'royal';$('paletteSelect').value=storedPalette;updatePalette(storedPalette);
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
 document.querySelectorAll('.role .ico').forEach(el=>{el.innerHTML=svgIcon(el.closest('.role').dataset.role==='husband'?'crown':'heart')});
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
  let b=t.closest('#bottomNav button[data-go]');
  if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();goPage(b.dataset.go);return}
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
  if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(!messages[b.dataset.pick])return;selected=b.dataset.pick;generate();$('search').value='';groupedRenderCats('');d.querySelectorAll('#smartChips button').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});$('inlineMessagePanel')?.scrollIntoView({behavior:'auto',block:'nearest'});return}
  if(t.closest('#buildMessageBtn')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();buildCustomMessage();$('builtMessage')?.focus();return}
  if(t.closest('#useBuiltMessage')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const v=$('builtMessage')?.value.trim();if(v){useMessage(v);$('message')?.scrollIntoView({behavior:'auto',block:'center'})}else $('builtMessage')?.focus();return}
  if(t.closest('#copyBuiltMessage')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const v=$('builtMessage')?.value.trim();if(v)copyText(v);return}
  if(t.closest('#rescueGenerate')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showRescue();const r=$('rescueResult');if(r){r.classList.add('rescue-ready');r.scrollIntoView({behavior:'auto',block:'nearest'})}return}
  if(t.closest('#copyBtn')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(current)copyText(current);return}
 },true);
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


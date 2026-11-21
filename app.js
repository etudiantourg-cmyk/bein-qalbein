
const categories=[
 {id:'morning',name:'صباح الخير',icon:'☀️',desc:'بداية لطيفة لليوم'},
 {id:'evening',name:'مساء الخير',icon:'🌙',desc:'كلمات هادئة للمساء'},
 {id:'work',name:'في العمل',icon:'💼',desc:'تشجيع ودعم'},
 {id:'travel',name:'أثناء السفر',icon:'✈️',desc:'دعاء واطمئنان واشتياق'},
 {id:'wellness',name:'العافية والمرض',icon:'♡',desc:'اهتمام وتمنيات بالعافية'},
 {id:'sad',name:'عند الحزن',icon:'🌷',desc:'مواساة واحتواء'},
 {id:'upset',name:'عند الغضب',icon:'♡',desc:'تهدئة وتفاهم'},
 {id:'tired',name:'عند التعب',icon:'☁️',desc:'راحة ومساندة'},
 {id:'sleep',name:'قبل النوم',icon:'🌙',desc:'طمأنينة وراحة'},
 {id:'miss',name:'الاشتياق',icon:'💌',desc:'كلمات شوق راقية'},
 {id:'sorry',name:'اعتذار ومصالحة',icon:'🤝',desc:'تفاهم وصفاء'},
 {id:'thanks',name:'تقدير وامتنان',icon:'🌟',desc:'شكر وتقدير'},
 {id:'dua',name:'دعاء وكلمات طيبة',icon:'🤲',desc:'دعوات بالخير والبركة'},
 {id:'support',name:'تشجيع وتحفيز',icon:'🏅',desc:'ثقة وأمل وإنجاز'}
];
const messages={
morning:[
'صباح الخير لقلبك الجميل، أسأل الله أن يجعل يومك مليئاً باليسر والبركة والطمأنينة.',
'بدأ يوم جديد، وأحببت أن تكون أول كلماته لك: أنا أقدّرك، وأتمنى لك كل خير.',
'أسأل الله أن يفتح لك أبواب الرزق والتوفيق، وأن يشرح صدرك لكل ما فيه خير.',
'صباحك هدوء ورضا، وخطوات موفقة، وأخبار تسرّ قلبك.',
'أتمنى أن تستقبل هذا الصباح بقلب مطمئن، وأن تجد في يومك ما يسعدك.',
'وجودك في حياتي يجعل للأيام معنى أجمل، أسأل الله أن يحفظك ويسعدك.',
'لا تنسَ أن تبدأ يومك بابتسامة، فأنت تستحق أياماً طيبة.',
'صباح مليء بالأمل؛ ثق أن بعد السعي يأتي التيسير بإذن الله.',
'أرسل لك كلمة تقدير قبل انشغال اليوم: شكراً لكل ما تبذله.',
'جعل الله هذا اليوم بداية خير وراحة ونجاح لك.'
],
evening:[
'مساء الخير لقلب أتمنى له راحة لا يعكرها شيء، وطمأنينة تدوم.',
'انتهى يوم طويل، فامنح نفسك بعض الهدوء؛ لقد بذلت ما استطعت.',
'أسأل الله أن يجعل مساءك سكينة، وأن يبدّل تعبك راحة.',
'مساؤك جميل كطيب قلبك، وأتمنى أن تحمل لك الساعات القادمة خبراً ساراً.',
'مهما كان يومك مزدحماً، تذكّر أن راحتك مهمة وأنك تستحق التقدير.',
'أحب أن أختم يومي بالاطمئنان عليك، فحفظك الله ورعاك.',
'أتمنى أن تترك خلفك ما أتعبك اليوم، وتستقبل المساء بقلب أخف.',
'مساء هادئ ودعوات صادقة بأن يكتب الله لك الخير حيث كان.',
'شكراً لأنك تجعل تفاصيل الحياة ألطف بحضورك واهتمامك.',
'ليلة مقبلة تحمل لك السكينة والرضا بإذن الله.'
],
work:[
'أعرف مقدار الجهد الذي تبذله، وأقدّر تعبك وسعيك. أسأل الله أن يبارك في عملك.',
'لا تقلّل من قيمة خطواتك الصغيرة؛ كل إنجاز كبير يبدأ بمحاولة صادقة.',
'أتمنى لك يوماً موفقاً، وعملاً ميسراً، ورزقاً طيباً مباركاً.',
'خذ استراحة حين تحتاج؛ صحتك وراحتك أهم من أي مهمة.',
'أنا أؤمن بقدرتك على تجاوز الصعوبات، خطوة هادئة بعد خطوة.',
'أسأل الله أن يفتح لك أبواب التوفيق، ويجعل ثمرة تعبك خيراً.',
'لا تنسَ أن ما تقدمه محل تقدير، حتى إن لم تُقل لك هذه الكلمات كل يوم.',
'أتمنى أن يسير عملك اليوم بسهولة، وأن تعود إلى بيتك مرتاح البال.',
'اجتهد بما تستطيع، ولا تقسُ على نفسك؛ التوازن جزء من النجاح.',
'أنا فخور/ة بسعيك وأمانتك، وأسأل الله أن يبارك لك في وقتك وجهدك.'
],
travel:[
'رافقَتك دعواتي أينما ذهبت؛ أسأل الله أن يحفظك في طريقك ويردّك سالماً.',
'طمئنّي عليك عندما تستطيع، فسلامتك وراحتك تهمّانني كثيراً.',
'المسافة لا تنقص من مكانتك، بل تجعلني أقدّر لحظات اللقاء أكثر.',
'أسأل الله أن يسهّل سفرك، ويحفظ خطاك، ويكتب لك الخير في وجهتك.',
'أتمنى أن تكون رحلتك ميسّرة، وأن تصل إلى مقصدك بأمان وراحة.',
'كلما ابتعدت، تذكّرت كم أن وجودك قريباً نعمة تستحق الشكر.',
'لا ترهق نفسك، وخذ قسطاً من الراحة، واعتنِ بنفسك جيداً.',
'أنت في حفظ الله، وأسأله أن يردّك إلينا سالماً مطمئناً.',
'أنتظر عودتك بفرح، وأسأل الله أن يجعل أيامك في السفر مباركة.',
'أرسل لك من قلبي شوقاً ودعاءً بأن تكون بخير في كل خطوة.'
],
wellness:[
'أسأل الله العظيم أن يمنّ عليك بالعافية والشفاء، وأن يخفف عنك كل ألم.',
'لا تشغل بالك بشيء الآن؛ خذ وقتك في الراحة واعتنِ بصحتك.',
'أتمنى أن تتحسن يوماً بعد يوم، وأن تعود إليك قوتك وراحتك قريباً.',
'سلامتك عندي غالية، وأرجو أن تخبرني بما تحتاج إليه دون تردد.',
'أسأل الله أن يلبسك ثوب الصحة والعافية، وأن يجعل ما أصابك تكفيراً ورفعة.',
'خذ العلاج والراحة كما ينبغي، ولا تتردد في طلب المساعدة.',
'أنا بجانبك بالكلمة الطيبة والدعاء وكل ما أستطيع تقديمه.',
'أتمنى أن يخفّ تعبك، وأن ترى أياماً مليئة بالصحة والطمأنينة.',
'لا بأس أن تتوقف قليلاً لتستعيد قوتك؛ صحتك أولوية.',
'حفظك الله من كل سوء، وأسبغ عليك نعمه ظاهرة وباطنة.'
],
sad:[
'إن ضاق صدرك، فتحدث معي؛ سأستمع إليك دون لوم أو استعجال.',
'لا يلزم أن تكون قوياً طوال الوقت؛ خذ وقتك، وأنا إلى جانبك.',
'أسأل الله أن يشرح صدرك، ويبدّل حزنك طمأنينة وفرجاً.',
'مهما ثقلت عليك الأيام، لا تنسَ أن بعد العسر يسراً.',
'أنت لست وحدك في هذه اللحظة؛ يمكننا أن نتجاوزها بهدوء معاً.',
'لا تحكم على حياتك من يوم صعب؛ ما زالت أمامك أيام أجمل بإذن الله.',
'أتمنى لو أستطيع أن أخفف عنك بعض ما تشعر به؛ أنا هنا لأجلك.',
'رفقاً بنفسك، فلك حق في الراحة والهدوء والوقت.',
'أسأل الله أن يرزق قلبك سكينة تزيل عنه ثقل التفكير.',
'تذكّر محاسنك وما تجاوزته من قبل؛ فيك قوة وخير كثير.'
],
upset:[
'أحب أن نفهم بعضنا بهدوء؛ فالكلمة الطيبة تفتح أبواباً يغلقها الغضب.',
'قد نختلف في الرأي، لكن الاحترام بيننا يجب أن يبقى دائماً.',
'لا أريد أن نجرح بعضنا وقت الانفعال؛ لنهدأ ثم نتحدث.',
'مشاعرك مهمة عندي، وأريد أن أسمع وجهة نظرك بصدق.',
'لنبحث عن حل يرضينا معاً بدلاً من البحث عمّن أخطأ أكثر.',
'أعتذر إن كان أسلوبي قد ضايقك؛ لم أقصد أن أؤذيك.',
'الهدوء لا يعني أن الأمر غير مهم، بل يعني أننا نريد إصلاحه بحكمة.',
'دعنا نمنح الحديث فرصة جديدة، باحترام وصراحة وحسن ظن.',
'مكانتك محفوظة، والخلاف لا يبرر التقليل من شأنك.',
'أسأل الله أن يؤلف بين قلوبنا، ويرزقنا حسن القول والتفاهم.'
],
tired:[
'أعرف أنك بذلت الكثير اليوم؛ أرجو أن تمنح نفسك وقتاً للراحة.',
'ليس مطلوباً منك أن تنجز كل شيء دفعة واحدة؛ خذ الأمور خطوة خطوة.',
'دع عنك ما يمكن تأجيله، واجعل لصحتك وراحتك نصيباً.',
'أنا أقدّر كل ما تفعله، حتى التفاصيل التي لا يلاحظها الآخرون.',
'أسأل الله أن يعوّض تعبك راحة، وسعيك توفيقاً ورزقاً.',
'خذ نفساً عميقاً، واشرب شيئاً تحبه، واهدأ قليلاً.',
'لا تقسُ على نفسك؛ يكفي أنك تحاول وتسعى بصدق.',
'أتمنى أن تجد الليلة راحة تعيد إليك نشاطك وابتسامتك.',
'أنا ممتن/ة لجهدك وحرصك، وأسأل الله أن يقويك.',
'الراحة ليست تقصيراً؛ إنها حق يساعدك على مواصلة الطريق.'
],
sleep:[
'أسأل الله أن يحفظك في ليلتك، ويرزقك نوماً هادئاً وقلباً مطمئناً.',
'ضع هموم اليوم جانباً، فما عجزنا عنه اليوم نستعين بالله عليه غداً.',
'ليلة هادئة لك، وأحلام طيبة، وصباح يحمل الخير بإذن الله.',
'أستودعك الله الذي لا تضيع ودائعه؛ تصبح على خير.',
'أتمنى أن تنام مرتاح البال، بعيداً عن القلق والتفكير المتعب.',
'شكراً لكل لحظة طيبة جمعتنا اليوم؛ حفظك الله وأسعد قلبك.',
'أغلق يومك بالرضا، فالله يعلم سعيك وما في قلبك.',
'أسأل الله أن يكتب لك راحة في الجسد وسكينة في القلب.',
'نم مطمئناً، فلك رب كريم يدبّر الأمر ويرحم عباده.',
'تصبح على خير، وغداً بإذن الله فرصة جديدة وأمل جديد.'
],
miss:[
'أشتاق إلى حديثك وتفاصيل يومك، وأسأل الله أن يجمعنا على خير قريباً.',
'غيابك يجعلني أقدّر وجودك أكثر؛ حفظك الله أينما كنت.',
'هناك أشياء كثيرة أود أن أحكيها لك، وأنت أول من يخطر ببالي.',
'أفتقد قربك وهدوء الحديث معك، وأنتظر لقاءً يجمعنا.',
'كلما مرّ موقف جميل تمنيت لو كنت بجانبي لنشاركه معاً.',
'المسافة مؤقتة، والمودة الصادقة تبقى حاضرة في القلب.',
'أرسل لك سلاماً محملاً بالشوق والدعاء بأن تكون بخير.',
'اشتقت إلى ابتسامتك وإلى تلك التفاصيل البسيطة التي تجعل يومي أجمل.',
'أسأل الله أن يقرّب المسافات، ويجعل لقاءنا قريباً ومباركاً.',
'حتى في انشغالي، لك مكان طيب في قلبي ودعائي.'
],
sorry:[
'أعتذر لك بصدق إن أخطأت في حقك؛ أريد أن أصلح ما أفسدته لا أن أبرر خطئي.',
'سامحني على الكلمة التي آلمتك؛ سأحرص أن أكون أهدأ وألطف في حديثي.',
'أنت تستحق أن أسمعك وأفهمك، لا أن أقاطعك أو أقلل من شعورك.',
'لنغيّر طريقة حديثنا وقت الخلاف، ولنجعل الاحترام أساس كل نقاش.',
'أعرف أن الاعتذار وحده لا يكفي دائماً؛ سأحاول أن يظهر التغيير في أفعالي.',
'أرجو أن تمنحنا فرصة لنتحدث بهدوء ونفهم ما حدث.',
'لم يكن قصدي أن أجرحك، لكنني أتحمل مسؤولية أثر كلامي عليك.',
'أقدّر صراحتك، وأريد أن نتعلم من هذا الموقف ونمضي بأفضل.',
'حقك عليّ إن قصّرت؛ أسأل الله أن يرزقنا صفاء القلوب وحسن المعاملة.',
'لن أجعل العناد أكبر من المودة والاحترام بيننا.'
],
thanks:[
'شكراً لاهتمامك وتعبك، أرى ما تبذله وأقدّره من قلبي.',
'وجودك ودعمك يصنعان فرقاً كبيراً في أيامي؛ جزاك الله عني خيراً.',
'أمتنّ لكل موقف وقفت فيه بجانبي، ولكل كلمة طيبة قلتها.',
'قد لا أعبّر دائماً، لكنني أقدّر تفاصيل عطائك وحرصك.',
'شكراً لأنك تحاول، ولأنك تمنح بيتنا من وقتك وجهدك.',
'أسأل الله أن يجزيك خيراً، وأن يبارك لك في صحتك ورزقك.',
'أنت شريك حياة أعتز به، وأحترم سعيك وأمانتك.',
'كل معروف تقدمه يبقى في الذاكرة، وكل لطف منك له أثر جميل.',
'أحب أن تعرف أن تعبك ليس أمراً عادياً بالنسبة إليّ؛ أنا أراه وأقدّره.',
'شكراً لك على صبرك وتعاونك وحسن عشرتك.'
],
dua:[
'أسأل الله أن يشرح صدرك، وييسر أمرك، ويرزقك من حيث لا تحتسب.',
'اللهم احفظه بعينك التي لا تنام، ووفقه لما تحب وترضى.',
'أسأل الله أن يبارك في عمرك وصحتك ورزقك، وأن يجعل أيامك عامرة بالخير.',
'اللهم ارزقه راحة البال، وصلاح الحال، وطمأنينة القلب.',
'جعل الله لك من كل هم فرجاً، ومن كل ضيق مخرجاً، ورزقك الخير كله.',
'أسأل الله أن يحفظك من كل سوء، وأن يكتب لك التوفيق في خطواتك.',
'اللهم ألّف بين قلوبنا على المودة والرحمة، وأعنّا على حسن المعاملة.',
'بارك الله في سعيك، وشرح صدرك، وجعل لك في كل خطوة أجراً وخيراً.',
'أسأل الله أن يرزقك قلباً شاكراً، ولساناً ذاكراً، وعملاً صالحاً متقبلاً.',
'اللهم اجعل بيتنا عامراً بالسكينة والرحمة والاحترام.'
],
support:[
'أنا أؤمن بقدرتك على التقدم؛ لا تستعجل النتائج، وواصل السعي.',
'كل خطوة صادقة تقرّبك من هدفك، حتى إن بدت صغيرة.',
'لا تقارن بدايتك بمرحلة شخص آخر؛ لكل إنسان طريقه ووقته.',
'أسأل الله أن يفتح لك أبواب النجاح، ويبارك في جهدك ووقتك.',
'تعلم من الصعوبات دون أن تسمح لها أن تقلل من ثقتك بنفسك.',
'أنت تملك من الصبر والقدرة ما يساعدك على تجاوز هذه المرحلة.',
'ابدأ بما تستطيع اليوم، فالتقدم المستمر خير من انتظار الكمال.',
'أنا أشجعك وأساندك، وأتمنى أن ترى ثمرة تعبك قريباً.',
'لا تجعل خطأ واحداً ينسّيك كل ما أنجزته؛ تعلّم وواصل.',
'ثق بالله، وخذ بالأسباب، وامضِ بقلب مطمئن.'
]
};
const $=id=>document.getElementById(id);
/* Safe storage adapter: persistent when available, in-memory fallback when blocked. */
const bqStorage=(()=>{
 let native=null;const memory=new Map();
 try{native=window.bqStorage;native.getItem('__bq_probe__')}catch(_){native=null}
 return {
  getItem(key){try{const value=native?.getItem(key);if(value!==null&&value!==undefined)return value}catch(_){}return memory.has(String(key))?memory.get(String(key)):null},
  setItem(key,value){const k=String(key),v=String(value);memory.set(k,v);try{native?.setItem(k,v)}catch(_){}},
  removeItem(key){const k=String(key);memory.delete(k);try{native?.removeItem(k)}catch(_){}},
  clear(){memory.clear();try{native?.clear()}catch(_){}},
  key(index){try{return native?.key(index)??Array.from(memory.keys())[index]??null}catch(_){return Array.from(memory.keys())[index]??null}},
  get length(){try{return native?.length??memory.size}catch(_){return memory.size}}
 };
})();

let role='husband',lang=(bqStorage.getItem('bq_language')||'ar'),selected='morning',current='',favs=[];
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
const categoryClosings={
morning:['واجعل نيتك طيبة وخطوتك واثقة.','ولا تنسَ أنني أدعو لك بظهر الغيب.','وليكن التفاؤل رفيقك في كل خطوة.','وإن واجهت صعوبة فخذها بهدوء وتدرّج.','فأنت تستحق بداية مطمئنة ويومًا مباركًا.','ولا تحمل همّ الغد قبل أن يأتي.','واجعل بين مهامك فسحة لراحة قلبك.','وأتمنى أن تجد في يومك سبباً للابتسام.','وليكتب الله لك فيه خيراً يفوق توقعك.','وتذكّر أن التقدير لا يحتاج مناسبة.'],
evening:['خذ من هذا المساء نصيبك من السكون.','ولا تنسَ أن تمنح نفسك حق الراحة.','وأنا أقدّر وجودك وما تضيفه لحياتنا.','دع ما مضى يمرّ، واستقبل القادم بأمل.','أسأل الله أن يطمئن قلبك ويشرح صدرك.','ولتكن هذه اللحظات فرصة لاستعادة هدوئك.','فليس عليك أن تحمل كل شيء وحدك.','وأتمنى أن تنتهي ليلتك على خير.','غداً يوم جديد وفرصة أخرى بإذن الله.','دمت بخير ورضا وراحة بال.'],
work:['وإن تعثرت خطوة فالتجربة تعلمك الطريق.','لا تجعل ضغط العمل يسرق منك صحتك.','أنا أساندك وأحترم اجتهادك.','خذ استراحة قصيرة وجدّد نشاطك.','واجعل الإتقان والرفق بالنفس رفيقين لك.','كل سعي حلال مبارك يستحق التقدير.','لا تتردد في طلب المساعدة عند الحاجة.','أتمنى أن تعود إلينا بقلب مرتاح.','النجاح يحتاج صبراً وتوازناً لا إنهاكاً.','بارك الله لك في وقتك وجهدك.'],
travel:['وأرسل لي خبر وصولك حين يتيسر لك.','ولا تنسَ الأذكار والانتباه لسلامتك.','أسأل الله أن يجعل طريقك سهلاً آمناً.','خذ قسطاً من الراحة ولا ترهق نفسك.','دعواتي ترافقك في الذهاب والعودة.','أتمنى أن تكون رحلتك نافعة وميسرة.','حفظك الله من كل مكروه.','أنتظر الاطمئنان عليك بكل محبة.','وليحفظ الله خطاك أينما اتجهت.','تعود إلينا سالماً محمّلاً بالخير.'],
wellness:['ولا تتردد في إخباري بما يريحك.','خذ وقتك ولا تستعجل التعافي.','راحتك وسلامتك أهم من إنجاز أي أمر.','أسأل الله أن يخفف عنك ويقويك.','سأكون قريباً متى احتجت إلى عون.','لا تهمل نصيحة الطبيب وحق جسدك عليك.','كل يوم أفضل هو نعمة تستحق الحمد.','أتمنى لك عافية تامة وراحة دائمة.','رفقاً بنفسك في هذه الفترة.','حفظك الله وألبسك لباس الصحة.'],
sad:['خذ وقتك في التعبير عما بداخلك.','لن أقلل من شعورك، وسأحاول فهمك.','يمكننا البحث عن خطوة صغيرة تخفف الأمر.','أنا هنا للاستماع لا لإصدار الأحكام.','أسأل الله أن يبدل الضيق فرجاً.','لا بأس أن تطلب الدعم ممن تثق به.','قيمتك لا تتغير بسبب يوم صعب.','سنحاول أن نعبر هذه المرحلة بتأنٍ.','أنت تستحق اللطف والرحمة.','أسأل الله أن يرزقك سكينة القلب.'],
upset:['لنمنح أنفسنا وقتاً للهدوء قبل الرد.','الاختلاف لا يلغي الاحترام بيننا.','أريد حلاً يحفظ كرامتنا ومودتنا معاً.','فلنصف المشكلة دون تجريح أو تعميم.','سأستمع حتى أفهم لا حتى أرد فقط.','الاعتذار الصادق بداية إصلاح جميلة.','لا نؤجل الحوار الهادئ أكثر مما يلزم.','لنجعل هدفنا الإصلاح لا الانتصار.','الكلمة اللينة أقرب إلى جمع القلوب.','أسأل الله أن يرزقنا الحلم والحكمة.'],
tired:['دعني أشاركك بعض المسؤوليات إن استطعت.','خذ راحة دون شعور بالذنب.','ليس مطلوباً أن تكون مثالياً كل يوم.','نرتب الأولويات ونؤجل ما يمكن تأجيله.','أقدّر جهدك حتى في الأيام الصعبة.','اهتم بنومك وغذائك وراحتك.','خطوة واحدة كافية في هذه اللحظة.','لا تحمل نفسك فوق طاقتها.','أسأل الله أن يبدل تعبك عافية.','أنا معك بالتعاون والتشجيع.'],
sleep:['اترك ما لا تستطيع تغييره إلى تدبير الله.','سامح نفسك على ما لم يكتمل اليوم.','غداً فرصة جديدة بإذن الله.','أستودع الله قلبك وراحتك.','لا تجعل التفكير يحرمك حق النوم.','اذكر الله واهدأ وخذ نفساً عميقاً.','أسأل الله لك نوماً هانئاً.','ليكن ختام يومك حمداً ورضاً.','أرجو أن تستيقظ بقوة وطمأنينة.','تصبح على خير وعافية.'],
miss:['وأحتفظ لك بمكانة طيبة في قلبي.','أسأل الله أن يقرّب موعد اللقاء.','أشتاق إلى حديث بسيط يجمعنا.','أتمنى أن تكون أيامك مطمئنة.','سأطمئن عليك كلما سنحت الفرصة.','المحبة الصادقة تظهر في الدعاء والاهتمام.','حفظك الله حتى نلتقي على خير.','كل لقاء طيب نعمة أحمد الله عليها.','أرسل لك سلاماً ودعاءً صادقاً.','قربك يسعدني وغيابك يعلمني قيمة حضورك.'],
sorry:['سأترجم اعتذاري إلى سلوك أفضل.','من حقك أن تأخذ وقتك لتطمئن.','لن أكرر الخطأ ما استطعت وسأتعلم منه.','أريد أن أفهم أثر ما حدث عليك.','لنتفق على طريقة أهدأ للحوار مستقبلاً.','لن أستخدم الصمت أو العناد للعقاب.','كرامتك ومشاعرك موضع احترام.','الإصلاح يحتاج صدقاً وصبراً من الطرفين.','أشكرك على توضيح ما أزعجك.','أسأل الله أن يديم بيننا حسن العشرة.'],
thanks:['أحب أن يصل إليك تقديري بوضوح.','سأحاول أن أرد المعروف بالتعاون والاهتمام.','العطاء المتبادل يقوي أواصر الأسرة.','أرى التفاصيل الصغيرة ولا أعدّها أمراً عادياً.','جزاك الله خيراً على حسن عشرتك.','أشكرك على صبرك وتفهمك.','تقديري لك ثابت في الأيام العادية أيضاً.','أسأل الله أن يبارك فيك وفي عطائك.','كل لطف منك يترك أثراً طيباً.','دمت شريكاً عزيزاً ومحل احترام.'],
dua:['اللهم اجعل لنا من كل ضيق مخرجاً.','وارزقنا صدق النية وحسن العمل.','اللهم أبعد عنا أسباب الشقاق وسوء الظن.','واجعل بيوتنا عامرة بالسكينة والرحمة.','اللهم بارك لنا فيما رزقتنا.','وارزقنا شكراً عند النعمة وصبراً عند البلاء.','اللهم أصلح قلوبنا وأعمالنا.','واجعل القادم خيراً مما مضى.','اللهم احفظ أهلنا ومن نحب.','آمين يا رب العالمين.'],
support:['ابدأ بما تملك ولا تنتظر الظروف المثالية.','التقدم الهادئ أفضل من التوقف خوفاً من الخطأ.','ثق بالله ثم خذ بالأسباب.','أنا أساندك دون أن أضغط عليك.','احتفل بالخطوات الصغيرة أيضاً.','استفد من التجربة وعدّل خطتك.','لا تقارن رحلتك برحلة غيرك.','استمر مع الحفاظ على صحتك وتوازنك.','أسأل الله أن يفتح لك أبواب الخير.','أنا أقدّر محاولاتك قبل النتائج.']
};
Object.keys(messages).forEach(id=>{
 const base=messages[id].slice();
 const endings=categoryClosings[id]||categoryClosings.support;
 const expanded=[];
 base.forEach((sentence,i)=>{endings.forEach((ending,j)=>expanded.push(sentence+' '+ending))});
 messages[id]=expanded;
});
const husbandAdvice=[
'استمع لزوجتك حتى تنهي حديثها، ثم أعد ما فهمته لتتأكد أنك استوعبت شعورها قبل تقديم الحلول.',
'عبّر عن التقدير بوضوح: اشكرها على جهد محدد بدلاً من افتراض أنها تعرف أنك تلاحظه.',
'عند الغضب، أوقف النقاش مؤقتاً واتفقا على وقت قريب للعودة إليه دون تهديد أو إهانة.',
'شارك في مسؤوليات البيت ورعاية الأبناء؛ التعاون العملي أبلغ من الوعود وحدها.',
'خصص وقتاً يومياً للحوار بعيداً عن الهاتف والعمل، ولو لعشر دقائق صادقة.',
'لا تسخر من مشاعرها ولا تقارنها بغيرها؛ ناقش السلوك أو المشكلة دون الانتقاص من الشخص.',
'إذا أخطأت فاعتذر بوضوح، واذكر ما ستغيره، ثم أثبت ذلك بالفعل.',
'اسألها عمّا تحتاجه منك: هل تريد إنصاتاً أم مساعدة عملية أم وقتاً للراحة؟',
'وازن بين العمل والأسرة، وأخبرها مسبقاً عندما يزداد ضغطك بدلاً من الانسحاب المفاجئ.',
'احفظ خصوصية بيتكما، ولا تجعل الخلافات مادة للسخرية أو النشر أمام الآخرين.',
'أظهر المودة بالكلمة الطيبة والاهتمام والوفاء بالوعود، لا بالمناسبات وحدها.',
'احترم أهلها كما تحب أن يحترم أهلك، مع وضع حدود عادلة تحفظ خصوصية الأسرة.',
'لا تستخدم المال أو الصمت أو التهديد وسيلة للضغط؛ اتفقا على القرارات المالية بشفافية.',
'تذكّر أن القوامة مسؤولية ورعاية وعدل وليست تسلطاً؛ أساس العلاقة المعاشرة بالمعروف.'
];
const wifeAdvice=[
'عبّري عن احتياجاتك بوضوح وهدوء، واستخدمي عبارات تصف شعورك بدلاً من الاتهام والتعميم.',
'قدّري جهده عندما تلاحظينه، واذكري الفعل المحدد الذي أسعدك ليعرف ما ترغبين في استمراره.',
'اختاري وقتاً مناسباً لفتح الموضوع المهم، وابتعدي عن النقاش أثناء الإرهاق أو الانفعال الشديد.',
'استمعي إلى وجهة نظره كاملة، واطلبي منه بالمقابل أن يمنحك المساحة نفسها للتعبير.',
'لا تحملي نفسك فوق طاقتها؛ اطلبي توزيع المسؤوليات بوضوح وتعاونا على ما يناسبكما.',
'حافظي على احترامك لنفسك وله أثناء الخلاف، وتجنبي الإهانة أو التهديد أو استدعاء أخطاء قديمة.',
'إذا أخطأت فاعتذري بصدق، وركزي على إصلاح الأثر لا على تبرير التصرف.',
'سانديه في أوقات الضغط مع الحفاظ على احتياجاتك وراحتك، فالدعم المتبادل لا يعني إهمال الذات.',
'اتفقا على ميزانية وأهداف مالية مشتركة، وتحدثا بصراحة عن الأولويات والالتزامات.',
'احفظي خصوصية الحياة الزوجية، واختاري مستشاراً أميناً عند الحاجة بدلاً من نشر الخلاف.',
'عبّري عن المودة بما يناسبكما: كلمة طيبة أو دعاء أو اهتمام أو وقت مشترك.',
'لا تقارني حياتكما بما يظهر في حياة الآخرين؛ لكل بيت ظروفه ورحلته.',
'اطلبي ما تحتاجينه مباشرة بدلاً من انتظار أن يقرأ الطرف الآخر أفكارك.',
'اجعلا القرارات المهمة بالتشاور والرحمة، مع احترام كرامة كل طرف وحقه في إبداء الرأي.'
];
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
const extraBases={
morning:['أحب أن أطمئن عليك مع بداية النهار، وأسأل الله أن يملأ يومك بالخير.','صباحك رضا يسبق الأخبار الجميلة، وتوفيق يرافق كل خطوة.','وجودك نعمة أحرص على شكر الله عليها، فليحفظك دائماً.','أتمنى أن تجد اليوم وقتاً لنفسك كما تمنح وقتك للآخرين.','ابدأ يومك متوكلاً على الله، فالأبواب تُفتح بالسعي والدعاء.'],
evening:['أحب أن أطمئن أن يومك انتهى بسلام، وأن قلبك بخير.','خذ من هدوء المساء فرصة لتجديد طاقتك وترتيب أفكارك.','أقدّر كل ما فعلته اليوم، حتى الأمور التي لم يلاحظها أحد.','أسأل الله أن يرزقك في هذه الليلة راحة تليق بقلبك.','مهما كان ما حمله النهار، فلك حق في مساء هادئ.'],
work:['أعرف أن مسؤولياتك كثيرة، وأريدك أن تعرف أن جهدك مقدّر.','لا تجعل إنجاز العمل يأتي على حساب صحتك وراحتك.','خطط بهدوء، وأنجز ما تستطيع، واترك ما لا تملك وقته.','أسأل الله أن يبارك في رزقك وييسر لك أمور عملك.','أنا فخور/فخورة بعزيمتك وبمحاولاتك المستمرة.'],
travel:['أسأل الله أن يصحبك التيسير في طريقك وأن يردك سالماً.','خذ بالأسباب وكن مطمئناً، فدعائي لك لا ينقطع.','أرسل لك محبتي ودعائي برحلة آمنة ومريحة.','لا تتردد في التوقف للراحة متى احتجت إليها.','أخبرني عندما تصل، فاطمئنان قلبي عليك يسعدني.'],
wellness:['أتمنى أن تتحسن صحتك يوماً بعد يوم، وأن تجد الراحة.','لا تتردد في طلب المساندة؛ العناية بك مسؤولية محبة.','أسأل الله أن يكتب لك العافية وأن يخفف عنك كل ألم.','خذ العلاج والراحة بانتظام وفق إرشادات طبيبك.','لن أضغط عليك، خذ وقتك واهتم بنفسك.'],
sad:['لا يلزم أن تجد الكلمات الآن؛ يكفي أن تعرف أنني أسمعك.','مشاعرك مهمة، ولن أتعامل معها باستخفاف.','يمكننا أن نبدأ من جديد بخطوة صغيرة وهادئة.','أسأل الله أن يبدل حزنك طمأنينة وأن يفتح لك أبواب الفرج.','لن أطلب منك التظاهر بأن كل شيء بخير؛ كن على طبيعتك.'],
upset:['أريد أن نختلف بأدب ونبقى حريصين على بعضنا.','سأراجع كلامي وتصرفي، وأتمنى أن نفعل ذلك معاً.','لنبحث عن حل عادل بدلاً من تبادل اللوم.','أفضّل حواراً صريحاً وهادئاً على تراكم العتاب.','لن أجعل لحظة غضب تهدم ما نبنيه بالمودة.'],
tired:['أنت لست مطالباً بإنجاز كل شيء في يوم واحد.','دعنا نخفف عنك ما نستطيع ونعيد ترتيب الأولويات.','راحتك ليست كسلاً، بل حاجة تحفظ قوتك.','أرى تعبك وأحترم صبرك، وأسأل الله أن يقويك.','خذ استراحة قصيرة، وسأساعدك فيما أقدر عليه.'],
sleep:['أغلق صفحة اليوم برفق، فليس كل أمر يحتاج جواباً الليلة.','أسأل الله أن يرزقك نوماً مريحاً وقلباً مطمئناً.','أنت تستحق أن تنام دون أن تحمل هموم الجميع.','اجعل آخر ما يشغل قلبك ذكراً ودعاءً وحسن ظن بالله.','ليحفظك الله في ليلك ويكتب لك صباحاً أجمل.'],
miss:['أفتقد تفاصيل حديثنا وهدوء اللحظات التي تجمعنا.','أسأل الله أن يجمعنا دائماً على خير ومودة.','حتى مع انشغال الأيام، تبقى مكانتك عزيزة.','أرسل لك سلاماً دافئاً ودعوة صادقة من القلب.','أشتاق إلى قربك، وأتمنى أن تكون بخير وراحة.'],
sorry:['أفهم أن الاعتذار وحده لا يكفي، لذلك سأعمل على التغيير.','أريد أن أصلح ما أفسدته أفعالي لا أن أكتفي بالكلام.','سأحترم شعورك ووقتك، وأتمنى أن نصلح الأمر بالحوار.','لا أبحث عن تبرير، بل عن فرصة لأكون أفضل.','أعتذر عن الأثر الذي تركه تصرفي، وسأتعلم منه.'],
thanks:['شكراً لأنك تبذل من وقتك وجهدك بمحبة.','ألاحظ لطفك في التفاصيل الصغيرة وأحفظه في قلبي.','وجود شريك يشارك المسؤولية أمر يستحق الحمد.','أشكرك على صراحتك وعلى حرصك على علاقتنا.','أسأل الله أن يجزيك خيراً على كل معروف تقدمه.'],
dua:['اللهم ارزقنا السكينة في بيوتنا والرفق في كلماتنا.','اللهم أعنّا على ذكرك وشكرك وحسن عبادتك.','نسأل الله أن يبارك في أعمارنا وأرزاقنا وأهلينا.','اللهم اجعل بيننا تعاوناً على الخير وصبراً عند الشدة.','اللهم احفظنا من الظلم وسوء الخلق وسوء الفهم.'],
support:['لا يشترط أن تكون الطريق سهلة حتى تكون قادراً على إكمالها.','خذ بالأسباب خطوة خطوة، ولا تنسَ أن توكل أمرك إلى الله.','أنا إلى جانبك بالتشجيع والمساندة واحترام وقتك.','ما تتعلمه اليوم قد يكون سبباً في نجاح الغد.','لا تقلل من قيمة المحاولة الصادقة مهما كانت نتيجتها.']
};
const extraClosings=['وأنا أقدّر وجودك في حياتي.','أسأل الله أن يكتب لك الخير والتوفيق.','وتذكّر أن الحوار الطيب يقرب القلوب.','ولك مني دعوة صادقة في ظهر الغيب.','فلنحافظ دائماً على الاحترام وحسن العشرة.','وإن احتجت إلى مساندة فلن أتردد في الوقوف معك.','جعل الله أيامك عامرة بالبركة والرضا.','خذ الأمور بهدوء، فلكل مشكلة باب للحل.','دمت بخير وطمأنينة وراحة بال.','فالمودة تظهر في الاهتمام والعمل والكلمة الطيبة.'];
Object.keys(extraBases).forEach(id=>{extraBases[id].forEach(base=>extraClosings.forEach(end=>messages[id].push(base+' '+end)));});
/* V42 performance: decorative floating particles are intentionally disabled on mobile. */


/* V19 — complete interface language layer (Arabic / English / French) */
const i18n={
en:{
 tagline:"Beautiful words make life more beautiful",footer:"Made with love and respect",
 labels:["Choose your role","I am a husband","I am a wife","Interface language","Choose a category","Search categories…","A message from the heart","Share","Add to favorites","Another message","Copy message","Your favorites","Show favorites","Hide favorites","Today's message","A message refreshed every day","Copy today's message","Marriage life guide","Practical steps for affection, mercy and kindness","Advice for husbands","Advice for wives","Messages of care, respect and support, written with grace."],
 empty:"You haven't saved any messages yet. Add one you like and it will appear here.",copy:"Copied successfully ✓",saved:"Added ✓",already:"Already saved ✓",del:"Delete",
 cats:["Good morning","Good evening","At work","While travelling","Health & recovery","When feeling sad","When angry","When tired","Before sleep","Missing you","Apology & reconciliation","Gratitude & appreciation","Prayer & kind words","Encouragement"],
 desc:["A gentle start to the day","Peaceful evening words","Encouragement and support","Prayers and reassurance","Care and wishes for good health","Comfort and understanding","Gentle words to ease tension","Rest and support","Peace and rest","Warm words of longing","Understanding and reconciliation","Thanks and appreciation","Prayers for goodness and blessing","Confidence, hope and achievement"],
 msgs:[
 ["Good morning, dear heart. May Allah fill your day with ease, blessings and peace.","A new day has begun, and I wanted my first words to remind you how much I appreciate you.","May Allah open the doors of provision and success for you and bring peace to your heart.","May your morning be calm, your steps guided and your news joyful.","I hope you find something today that brings comfort and happiness.","Your presence gives my days a deeper meaning. May Allah protect and bless you.","You deserve gentle days and sincere appreciation.","Begin with hope; with effort comes ease, by Allah's permission.","Thank you for all the effort you make, even the things others may not notice.","May today bring goodness, comfort and success."],
 ["Good evening. I wish your heart lasting peace and quiet.","The day is over; give yourself time to rest. You have done what you could.","May Allah turn today's tiredness into comfort and calm.","I hope the coming hours bring you good news and peace.","Your rest matters, and you deserve appreciation.","I wanted to check on you before the day ends. May Allah keep you safe.","Leave behind what weighed on you and welcome the evening gently.","May your evening be peaceful and full of sincere prayers.","Thank you for making life's little details kinder.","May the night bring serenity and contentment."],
 ["I see the effort you put into your work, and I truly appreciate it.","Small steps matter; every achievement begins with a sincere attempt.","May Allah bless your work, your time and your lawful provision.","Take a break when you need one. Your health matters.","I believe in your ability to overcome difficulties, one step at a time."],
 ["May Allah protect you on your journey and bring you back safely.","Let me know when you can; your safety means so much to me.","Distance does not lessen your place in my heart.","May your journey be easy and your destination full of good.","Please rest when you need to and take good care of yourself."],
 ["I hope your health improves day by day and comfort finds you.","Your wellbeing matters more than any task.","May Allah grant you healing, strength and ease.","Take the time you need; there is no need to rush recovery.","I am here to support you with kindness and patience."],
 ["You do not need to find the perfect words; I am here to listen.","Your feelings matter, and I will not dismiss them.","We can begin again with one small, calm step.","May Allah replace your sadness with relief and reassurance.","You do not have to pretend that everything is fine."],
 ["I want us to disagree respectfully and remain kind to one another.","I will reflect on my words and actions, and I hope we both can.","Let us look for a fair solution instead of trading blame.","An honest, calm conversation is better than silent resentment.","I will not let a moment of anger undo the kindness we have built."],
 ["You do not have to finish everything in one day.","Let us share what we can and rearrange our priorities.","Rest is not laziness; it is a need that protects your strength.","I see your effort and appreciate your patience.","Take a short break; I will help where I can."],
 ["Close today's chapter gently; not every question needs an answer tonight.","May Allah grant you restful sleep and a peaceful heart.","You deserve rest without carrying everyone's worries.","End your day with remembrance, prayer and trust in Allah.","May Allah protect you through the night and grant you a brighter morning."],
 ["I miss our conversations and the quiet moments we share.","May Allah always bring us together upon goodness and affection.","Even when life gets busy, your place remains dear to me.","Sending you a warm greeting and a sincere prayer.","I miss being near you and hope you are well."],
 ["I know an apology alone is not enough, so I will work to change.","I want to repair the effect of my actions, not just offer words.","I respect your feelings and hope we can make things right through dialogue.","I am not looking for excuses; I want the chance to do better.","I am sorry for the hurt my actions caused, and I will learn from it."],
 ["Thank you for giving your time and effort with kindness.","I notice the little things you do, and I do not take them for granted.","A partner who shares responsibility is a blessing worth appreciating.","Thank you for your honesty and care for our relationship.","May Allah reward you for every good thing you do."],
 ["O Allah, fill our homes with peace and our words with gentleness.","O Allah, help us remember You, thank You and worship You well.","May Allah bless our lives, provision and families.","O Allah, help us cooperate in goodness and remain patient in hardship.","O Allah, protect us from injustice, harshness and misunderstanding."],
 ["The road does not have to be easy for you to keep moving forward.","Take the means step by step, and place your trust in Allah.","I am beside you with encouragement and support, without pressure.","What you learn today may become the key to tomorrow's success.","Never underestimate a sincere effort."]
 ],
 adviceH:["Listen fully before offering solutions, and make sure you understand her feelings.","Show appreciation clearly and mention the specific effort you noticed.","When angry, pause and agree on a time to resume the discussion calmly.","Share household and family responsibilities in practical ways.","Set aside daily time to talk without phones or distractions.","Never mock her feelings or compare her with others.","When you make a mistake, apologize clearly and show change through action.","Ask whether she needs listening, practical help or time to rest.","Balance work and family, and communicate when pressure increases.","Protect your family's privacy and avoid exposing disagreements.","Show affection through kind words, attention and keeping promises.","Treat her family with respect while maintaining fair boundaries.","Never use money, silence or threats to control; discuss finances transparently.","Leadership in a family means responsibility, care and justice, not domination."],
 adviceW:["Express your needs calmly and clearly, without accusations or generalizations.","Appreciate his effort and mention the specific action that made you happy.","Choose a suitable time for important conversations, away from exhaustion and anger.","Listen to his view and ask for the same space to express yours.","Do not carry more than you can; agree on a fair sharing of responsibilities.","Keep respect during disagreements; avoid insults, threats and old grievances.","When you make a mistake, apologize sincerely and focus on repairing its impact.","Support him during pressure while also caring for your own needs and rest.","Agree on shared financial goals and speak openly about priorities.","Protect your marital privacy and seek trustworthy advice when needed.","Show affection through kind words, prayer, attention or shared time.","Do not compare your life with what others display; every home has its own journey.","Ask directly for what you need instead of expecting him to read your mind.","Make important decisions through consultation, mercy and mutual respect."]
},
fr:{
 tagline:"Les belles paroles rendent la vie plus belle",footer:"Créé avec amour et respect",
 labels:["Choisissez votre rôle","Je suis mari","Je suis épouse","Langue de l’interface","Choisissez une catégorie","Rechercher une catégorie…","Un message du cœur","Partager","Ajouter aux favoris","Un autre message","Copier le message","Vos favoris","Afficher les favoris","Masquer les favoris","Message du jour","Un message renouvelé chaque jour","Copier le message du jour","Guide de la vie conjugale","Des gestes concrets pour l’affection, la compassion et le respect","Conseils pour le mari","Conseils pour l’épouse","Des messages d’attention, de respect et de soutien, avec élégance."],
 empty:"Vous n’avez pas encore enregistré de message. Ajoutez-en un pour le retrouver ici.",copy:"Copié avec succès ✓",saved:"Ajouté ✓",already:"Déjà enregistré ✓",del:"Supprimer",
 cats:["Bonjour","Bonsoir","Au travail","En voyage","Santé et rétablissement","En cas de tristesse","En cas de colère","En cas de fatigue","Avant de dormir","Tu me manques","Excuses et réconciliation","Gratitude et reconnaissance","Prières et mots bienveillants","Encouragement"],
 desc:["Un doux début de journée","Des mots paisibles pour le soir","Encouragement et soutien","Prières et réassurance","Attention et souhaits de santé","Réconfort et écoute","Des mots doux pour apaiser la tension","Repos et soutien","Paix et repos","Des mots tendres","Compréhension et réconciliation","Remerciements et reconnaissance","Prières de bien et de bénédiction","Confiance, espoir et réussite"],
 msgs:[
 ["Bonjour à ton cœur. Qu’Allah remplisse ta journée de facilité, de bénédictions et de paix.","Un nouveau jour commence, et je voulais te rappeler combien je t’apprécie.","Qu’Allah ouvre pour toi les portes de la subsistance et de la réussite.","Que ta matinée soit paisible et tes pas guidés vers le bien.","J’espère que tu trouveras aujourd’hui une raison de sourire.","Ta présence donne un sens plus doux à mes journées. Qu’Allah te protège.","Tu mérites des journées sereines et une sincère reconnaissance.","Avance avec espoir : après l’effort vient la facilité, avec la permission d’Allah.","Merci pour tous tes efforts, même ceux que personne ne remarque.","Qu’aujourd’hui t’apporte bien, sérénité et réussite."],
 ["Bonsoir. Je souhaite à ton cœur une paix durable.","La journée est terminée ; accorde-toi un peu de repos.","Qu’Allah transforme ta fatigue en sérénité.","J’espère que les prochaines heures t’apporteront une bonne nouvelle.","Ton repos compte et tu mérites de la reconnaissance.","Je voulais prendre de tes nouvelles avant la fin de la journée.","Laisse derrière toi ce qui t’a pesé et accueille le soir doucement.","Que ta soirée soit paisible et pleine de prières sincères.","Merci de rendre les petits détails de la vie plus doux.","Que la nuit t’apporte sérénité et satisfaction."],
 ["Je vois les efforts que tu consacres à ton travail et je les apprécie.","Les petits pas comptent ; chaque réussite commence par un effort sincère.","Qu’Allah bénisse ton travail, ton temps et tes revenus licites.","Fais une pause quand tu en as besoin. Ta santé compte.","Je crois en ta capacité à dépasser les difficultés, pas à pas."],
 ["Qu’Allah te protège pendant ton voyage et te ramène sain et sauf.","Donne-moi de tes nouvelles quand tu le peux ; ta sécurité compte beaucoup.","La distance ne diminue pas la place que tu occupes dans mon cœur.","Qu’Allah facilite ton voyage et t’accorde une bonne destination.","Repose-toi quand il le faut et prends soin de toi."],
 ["J’espère que ta santé s’améliorera chaque jour et que tu retrouveras le confort.","Ton bien-être compte plus que n’importe quelle tâche.","Qu’Allah t’accorde guérison, force et soulagement.","Prends le temps nécessaire, sans précipiter ton rétablissement.","Je suis là pour te soutenir avec douceur et patience."],
 ["Tu n’as pas besoin de trouver les mots parfaits ; je suis là pour t’écouter.","Tes sentiments comptent et je ne les minimiserai pas.","Nous pouvons recommencer par un petit pas tranquille.","Qu’Allah remplace ta tristesse par le soulagement et la paix.","Tu n’as pas besoin de prétendre que tout va bien."],
 ["Je veux que nous puissions être en désaccord tout en restant respectueux.","Je vais réfléchir à mes paroles et à mes actes, et j’espère que nous ferons de même.","Cherchons une solution juste au lieu de nous rejeter la faute.","Une conversation calme vaut mieux qu’un ressentiment silencieux.","Je ne laisserai pas un instant de colère détruire notre affection."],
 ["Tu n’es pas obligé de tout accomplir en une journée.","Partageons les tâches possibles et réorganisons nos priorités.","Le repos n’est pas de la paresse ; il protège ta force.","Je vois tes efforts et respecte ta patience.","Fais une courte pause ; je t’aiderai dans la mesure du possible."],
 ["Ferme doucement le chapitre d’aujourd’hui ; tout n’exige pas une réponse ce soir.","Qu’Allah t’accorde un sommeil réparateur et un cœur apaisé.","Tu mérites de dormir sans porter les soucis de tout le monde.","Termine ta journée par le rappel d’Allah, la prière et la confiance en Lui.","Qu’Allah te protège cette nuit et t’offre un matin meilleur."],
 ["Nos conversations et les moments paisibles que nous partageons me manquent.","Qu’Allah nous réunisse toujours dans le bien et l’affection.","Même lorsque la vie est chargée, tu gardes une place précieuse.","Je t’envoie un salut chaleureux et une prière sincère.","Tu me manques et j’espère que tu vas bien."],
 ["Je sais que les excuses ne suffisent pas ; je ferai des efforts pour changer.","Je veux réparer les conséquences de mes actes, pas seulement parler.","Je respecte tes sentiments et souhaite que nous réparions cela par le dialogue.","Je ne cherche pas d’excuse, mais une occasion de faire mieux.","Je regrette la peine causée par mon comportement et j’en tirerai une leçon."],
 ["Merci de donner ton temps et tes efforts avec bienveillance.","Je remarque les petits gestes et je ne les considère pas comme acquis.","Un partenaire qui partage les responsabilités est une bénédiction.","Merci pour ta sincérité et ton attention envers notre relation.","Qu’Allah te récompense pour chaque bonne action."],
 ["Ô Allah, remplis nos foyers de paix et nos paroles de douceur.","Ô Allah, aide-nous à nous souvenir de Toi, à Te remercier et à bien T’adorer.","Qu’Allah bénisse nos vies, nos ressources et nos familles.","Ô Allah, aide-nous à coopérer dans le bien et à patienter dans l’épreuve.","Ô Allah, protège-nous de l’injustice, de la dureté et des malentendus."],
 ["Le chemin n’a pas besoin d’être facile pour que tu continues d’avancer.","Avance étape par étape et place ta confiance en Allah.","Je suis à tes côtés avec encouragement et soutien, sans pression.","Ce que tu apprends aujourd’hui peut ouvrir la voie à la réussite de demain.","Ne sous-estime jamais un effort sincère."]
 ],
 adviceH:["Écoute jusqu’au bout avant de proposer des solutions et assure-toi d’avoir compris ses sentiments.","Exprime ta reconnaissance clairement et cite l’effort précis que tu as remarqué.","En cas de colère, fais une pause et convenez d’un moment pour reprendre calmement.","Participe concrètement aux responsabilités du foyer et de la famille.","Réserve chaque jour un moment d’échange sans téléphone ni distraction.","Ne te moque jamais de ses sentiments et ne la compare pas aux autres.","Si tu fais une erreur, présente des excuses claires et montre ton changement par tes actes.","Demande-lui si elle a besoin d’écoute, d’aide pratique ou de repos.","Équilibre travail et famille et parle-lui lorsque la pression augmente.","Protège l’intimité de votre foyer et n’expose pas vos désaccords.","Montre ton affection par des paroles douces, de l’attention et des promesses tenues.","Respecte sa famille tout en préservant des limites justes.","N’utilise jamais l’argent, le silence ou les menaces pour contrôler ; discutez des finances avec transparence.","Dans le couple, la responsabilité signifie soin et justice, jamais domination."],
 adviceW:["Exprime tes besoins calmement et clairement, sans accusation ni généralisation.","Reconnais ses efforts et précise le geste qui t’a fait plaisir.","Choisis un moment adapté pour les sujets importants, loin de la fatigue et de la colère.","Écoute son point de vue et demande le même espace pour exprimer le tien.","Ne porte pas tout toute seule ; répartissez les responsabilités équitablement.","Préserve le respect pendant les désaccords et évite insultes et menaces.","Si tu fais une erreur, excuse-toi sincèrement et répare ses conséquences.","Soutiens-le dans les périodes difficiles tout en prenant soin de toi.","Fixez des objectifs financiers communs et parlez ouvertement des priorités.","Préservez votre intimité et demandez conseil à une personne digne de confiance si besoin.","Exprime ton affection par des mots doux, une prière, de l’attention ou du temps partagé.","Ne compare pas votre vie à ce que les autres montrent ; chaque foyer a son histoire.","Demande directement ce dont tu as besoin au lieu d’attendre qu’il devine.","Prenez les décisions importantes par la concertation, la compassion et le respect mutuel."]
}
};

let activeAdvice='husband';
const originalMessagePools=Object.fromEntries(Object.entries(messages).map(([key,pool])=>[key,pool.slice()]));
const languageText={
ar:{roleTitle:'اختر هويتك',husband:'أنا زوج',wife:'أنا زوجة',language:'لغة الواجهة',catTitle:'اختر التصنيف المناسب',search:'ابحث عن تصنيف...',heartTitle:'رسالة من القلب',share:'↗ مشاركة',favAdd:'☆ أضف للمفضلة',newMsg:'⟳ رسالة أخرى',copyMsg:'▢ نسخ الرسالة',favorites:'رسائلك المفضلة',showFav:'عرض المفضلة',hideFav:'إخفاء المفضلة',daily:'✦ رسالة اليوم',dailyDesc:'رسالة تتجدد تلقائياً كل يوم',copyDaily:'نسخ رسالة اليوم',guide:'دليل الحياة الزوجية',guideDesc:'خطوات عملية للمودة والرحمة وحسن العشرة',husbandAdvice:'نصائح للزوج',wifeAdvice:'نصائح للزوجة',hint:'رسائل مودة واحترام ودعم، بكلمات راقية ومحتوى مناسب.',empty:'لم تحفظ رسائل بعد. أضف رسالة تعجبك لتجدها هنا.',copyDone:'تم النسخ بنجاح ✓',saved:'تمت الإضافة ✓',already:'محفوظة بالفعل ✓',delete:'حذف',noCats:'لا توجد تصنيفات مطابقة لبحثك.',title:'بين قلبين',tagline:'الكلمات الجميلة تجعل الحياة أجمل',footer:'صُنع بالمحبة والاحترام',night:'☾ وضع الليل',day:'☀ وضع النهار',notifyOff:'♡ تفعيل الإشعارات اللطيفة',notifyOn:'✓ الإشعارات مفعّلة',notifyNote:'إشعار اختياري عند فتح التطبيق؛ لا نضمن وصوله بعد إغلاق المتصفح.',adviceHint:'اضغط على أحد الزرين لفتح النصائح في نافذة مستقلة.',permissionDenied:'لم تسمح بالإشعارات من المتصفح.'},
en:{roleTitle:'Choose your role',husband:'I am a husband',wife:'I am a wife',language:'Interface language',catTitle:'Choose a category',search:'Search categories…',heartTitle:'A message from the heart',share:'↗ Share',favAdd:'☆ Add to favorites',newMsg:'⟳ Another message',copyMsg:'▢ Copy message',favorites:'Your favorites',showFav:'Show favorites',hideFav:'Hide favorites',daily:'✦ Message of the day',dailyDesc:'A new message every day',copyDaily:'Copy today’s message',guide:'Marriage life guide',guideDesc:'Practical steps for affection, mercy and kindness',husbandAdvice:'Advice for husbands',wifeAdvice:'Advice for wives',hint:'Messages of care, respect and support, written with grace.',empty:'You have not saved any messages yet. Add one you like and it will appear here.',copyDone:'Copied successfully ✓',saved:'Added ✓',already:'Already saved ✓',delete:'Delete',noCats:'No categories match your search.',title:'Between Two Hearts',tagline:'Beautiful words make life more beautiful',footer:'Made with love and respect',night:'☾ Night mode',day:'☀ Day mode',notifyOff:'♡ Enable gentle notifications',notifyOn:'✓ Notifications enabled',notifyNote:'Optional reminders while the app is open; delivery after closing the browser is not guaranteed.',adviceHint:'Tap either button to open advice in a separate window.',permissionDenied:'Notifications are blocked in your browser.'},
fr:{roleTitle:'Choisissez votre rôle',husband:'Je suis mari',wife:'Je suis épouse',language:'Langue de l’interface',catTitle:'Choisissez une catégorie',search:'Rechercher une catégorie…',heartTitle:'Un message du cœur',share:'↗ Partager',favAdd:'☆ Ajouter aux favoris',newMsg:'⟳ Un autre message',copyMsg:'▢ Copier le message',favorites:'Vos favoris',showFav:'Afficher les favoris',hideFav:'Masquer les favoris',daily:'✦ Message du jour',dailyDesc:'Un nouveau message chaque jour',copyDaily:'Copier le message du jour',guide:'Guide de la vie conjugale',guideDesc:'Des gestes concrets pour l’affection, la compassion et le respect',husbandAdvice:'Conseils pour le mari',wifeAdvice:'Conseils pour l’épouse',hint:'Des messages d’attention, de respect et de soutien, avec élégance.',empty:'Vous n’avez encore enregistré aucun message. Ajoutez-en un pour le retrouver ici.',copyDone:'Copié avec succès ✓',saved:'Ajouté ✓',already:'Déjà enregistré ✓',delete:'Supprimer',noCats:'Aucune catégorie ne correspond à votre recherche.',title:'Entre deux cœurs',tagline:'Les belles paroles rendent la vie plus belle',footer:'Créé avec amour et respect',night:'☾ Mode nuit',day:'☀ Mode jour',notifyOff:'♡ Activer les notifications douces',notifyOn:'✓ Notifications activées',notifyNote:'Rappel facultatif lorsque l’application est ouverte ; la livraison après fermeture du navigateur n’est pas garantie.',adviceHint:'Touchez un bouton pour ouvrir les conseils dans une fenêtre séparée.',permissionDenied:'Les notifications sont bloquées dans votre navigateur.'}
};
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
 else{const translatedLibrary=i18n[lang];Object.keys(messages).forEach((id,i)=>{const pool=translatedLibrary.msgs[i]||translatedLibrary.msgs[0];messages[id]=pool.slice()})}
 renderCats($('search').value);generate();$('dailyMessage').textContent=ar?dailyText():messages[selected][(new Date().getDate()*7)%messages[selected].length];renderAdviceForLanguage();showFavs();
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
const categoryGroups=[
 {name:{ar:'رسائل يومية',en:'Daily messages',fr:'Messages quotidiens'},ids:['morning','evening','sleep']},
 {name:{ar:'رسائل المواقف',en:'Life moments',fr:'Moments de vie'},ids:['work','travel','wellness','tired']},
 {name:{ar:'رسائل المشاعر',en:'Feelings',fr:'Émotions'},ids:['miss','sad','upset','sorry']},
 {name:{ar:'التقدير والدعم',en:'Appreciation & support',fr:'Reconnaissance et soutien'},ids:['thanks','dua','support']}
];
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
 const host=$('cats');host.innerHTML='';const q=filter.trim().toLocaleLowerCase(lang);
 let count=0,selectedItem=null;
 const inline=prepareInlineMessage();
 categoryGroups.forEach(group=>{
  const matches=categories.filter(c=>group.ids.includes(c.id)&&(!q||(c.name+' '+c.desc).toLocaleLowerCase(lang).includes(q)));
  if(!matches.length)return;
  const title=document.createElement('div');title.className='category-group-title';title.textContent=group.name[lang]||group.name.ar;host.append(title);
  matches.forEach(c=>{
   count++;
   const item=document.createElement('div');item.className='category-item';item.dataset.categoryId=c.id;
   const b=document.createElement('button');b.type='button';b.className='cat'+(c.id===selected?' active':'');
   b.setAttribute('aria-expanded',c.id===selected&&inline.parentElement===item?'true':'false');
   b.innerHTML='<span class="badge">'+c.icon+'</span><span>'+c.name+'<small>'+c.desc+'</small></span>';
   item.append(b);host.append(item);if(c.id===selected)selectedItem=item;
  });
 });
 if(!count){const p=document.createElement('p');p.className='empty';p.textContent=languageText[lang]?.noCats||'لا توجد تصنيفات مطابقة لبحثك.';host.append(p)}
 if(selectedItem)selectedItem.append(inline);
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
const smartNames={ar:{thanks:'أريد أن أشكره',miss:'أريد أن أعبّر عن اشتياقي',sorry:'أريد أن أعتذر',support:'أريد أن أشجعه',sad:'أريد أن أواسيه',upset:'حدث خلاف بيننا',dua:'أريد دعاءً جميلاً'},en:{thanks:'Thank them',miss:'Say I miss you',sorry:'Apologize',support:'Encourage them',sad:'Offer comfort',upset:'We had a disagreement',dua:'Share a prayer'},fr:{thanks:'Le remercier',miss:'Dire tu me manques',sorry:'Présenter mes excuses',support:'L’encourager',sad:'Le réconforter',upset:'Nous avons eu un désaccord',dua:'Partager une invocation'}};
function renderSmartChips(){
 const host=$('smartChips');if(!host)return;host.innerHTML='';
 const keys=['thanks','miss','sorry','support','sad','upset','dua'];
 keys.forEach(id=>{const b=document.createElement('button');b.type='button';b.dataset.pick=id;b.textContent=smartNames[lang][id];host.append(b)});
 const title=$('smartTitle');if(title)title.textContent=lang==='en'?'What would you like to say today?':lang==='fr'?'Que souhaitez-vous lui dire aujourd’hui ?':'ماذا تريد أن تقول اليوم؟';
}
async function createMessageCard(){
 if(!current){alert(lang==='en'?'Choose a message first.':lang==='fr'?'Choisissez d’abord un message.':'اختر رسالة أولاً.');return}
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
 const ctx=canvas.getContext('2d');
 const g=ctx.createLinearGradient(0,0,1080,1350);g.addColorStop(0,'#fff8ed');g.addColorStop(.48,'#f6dce5');g.addColorStop(1,'#4c0825');ctx.fillStyle=g;ctx.fillRect(0,0,1080,1350);
 ctx.strokeStyle='#e9c477';ctx.lineWidth=12;ctx.strokeRect(42,42,996,1266);ctx.lineWidth=3;ctx.strokeRect(62,62,956,1226);
 ctx.textAlign='center';ctx.direction='rtl';ctx.fillStyle='#7b1741';ctx.font='bold 78px Tajawal, sans-serif';ctx.fillText(lang==='en'?'Between Two Hearts':lang==='fr'?'Entre deux cœurs':'بين قلبين',540,205);
 ctx.fillStyle='#b38a43';ctx.font='42px Tajawal, sans-serif';ctx.fillText('♡',540,290);
 ctx.fillStyle='#4c0825';ctx.font='600 48px Tajawal, sans-serif';
 const words=current.split(/\\s+/);const lines=[];let line='';
 words.forEach(word=>{const test=line?line+' '+word:word;if(ctx.measureText(test).width>850&&line){lines.push(line);line=word}else line=test});if(line)lines.push(line);
 const lineHeight=76;let y=Math.max(480,(1350-lines.length*lineHeight)/2);
 lines.forEach(t=>{ctx.fillText(t,540,y);y+=lineHeight});
 ctx.fillStyle='#ffe8ad';ctx.font='34px Tajawal, sans-serif';ctx.fillText(lang==='en'?'Kind words make life beautiful':lang==='fr'?'Les belles paroles embellissent la vie':'الكلمات الجميلة تجعل الحياة أجمل',540,1190);
 canvas.toBlob(blob=>{if(!blob){alert('تعذر إنشاء البطاقة.');return}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='bein-qalbein-card.png';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000)},'image/png');
}
$('cardBtn').onclick=createMessageCard;

const originalGenerate=generate;
generate=function(){originalGenerate();rememberMessage(current)};
const originalApplyLanguage=applyLanguage;

applyLanguage=function(){originalApplyLanguage();groupedRenderCats($('search').value);renderHistory();renderCustomNotes();renderSmartChips();const labels={ar:['الرئيسية','المفضلة','الدليل','الإعدادات','الإعدادات','فاجئني برسالة','رسائلك الخاصة','آخر الرسائل','اكتب رسالة خاصة بك...','حفظ رسالتي'],en:['Home','Favorites','Guide','Settings','Settings','Surprise me','My private messages','Recent messages','Write your own message...','Save my message'],fr:['Accueil','Favoris','Guide','Paramètres','Paramètres','Surprenez-moi','Mes messages privés','Messages récents','Écrivez votre message...','Enregistrer']};const x=labels[lang]||labels.ar;['navHome','navFavorites','navGuide','navSettings','settingsTitle','surpriseBtn','customTitle','historyTitle'].forEach((id,i)=>$(id).textContent=x[i]);$('customInput').placeholder=x[8];$('saveCustom').textContent=x[9]};
goPage(['home','favorites','guide','settings'].includes(bqStorage.getItem('bq_last_page'))?bqStorage.getItem('bq_last_page'):'home');
renderSmartChips();

applyLanguage();applyTheme();if(bqStorage.getItem('bq_notifications')==='on')scheduleGentleNotification();
if('serviceWorker' in navigator)window.addEventListener('load',()=>{const register=()=>navigator.serviceWorker.register('./sw.js').catch(()=>{});if('requestIdleCallback' in window)requestIdleCallback(register,{timeout:2500});else setTimeout(register,1200)});

/* V35 complete feature suite: builder, repair guide, organization, privacy and backup */
const builderCopy={
ar:{love:['أحب أن تعرف أن وجودك في حياتي نعمة أقدّرها، وأسأل الله أن يديم بيننا المودة والرحمة.','شكراً لكل ما تبذله؛ أرى جهدك وأحترم قلبك وسعيك.'],miss:['أفتقد حديثك وقربك، وأرسل لك شوقاً صادقاً ودعاءً بأن تكون بخير.','اشتقت إلى تفاصيل يومك وإلى لحظاتنا الهادئة معاً.'],sorry:['أعتذر بصدق إن آلمتك؛ أريد أن أفهم شعورك وأصلح خطئي بالفعل قبل الكلام.','حقك عليّ إن قصّرت. دعنا نتحدث بهدوء ونبدأ صفحة من التفاهم.'],support:['أنا أؤمن بقدرتك، وسأساندك بما أستطيع. خطوة هادئة كل يوم تصنع تقدماً.','لا تقلل من قيمة جهدك؛ أنا أقدّره وأسأل الله أن يبارك لك في سعيك.'],calm:['لا أريد أن ينتصر أحدنا على الآخر؛ أريد أن نفهم بعضنا ونصل إلى حل يحفظ احترامنا.','لنأخذ وقتاً للهدوء ثم نعود إلى الحديث بلطف وإنصاف.'],dua:['أسأل الله أن يشرح صدرك وييسر أمرك ويجعل أيامك عامرة بالخير والسكينة.','اللهم ألّف بين قلوبنا وارزقنا حسن العشرة والرحمة والبركة.']},
en:{love:['I want you to know how much I value your presence and the kindness you bring into my life.','Thank you for your effort; I notice it and truly appreciate you.'],miss:['I miss our conversations and the little moments we share. I hope you are well.','You are in my thoughts, and I look forward to seeing you again.'],sorry:['I sincerely apologize if I hurt you. I want to understand and make things right through my actions.','I was wrong to hurt you. Let us talk calmly and listen to each other.'],support:['I believe in you and appreciate your effort. One steady step at a time.','Your effort matters, and I am here to support you with care.'],calm:['I do not want either of us to win an argument; I want us to understand each other.','Let us pause, calm down, and return to this conversation with respect.'],dua:['May Allah ease your affairs, bring peace to your heart, and bless your efforts.','May Allah fill our home with mercy, patience, and understanding.']},
fr:{love:['Je veux que tu saches combien ta présence et tes attentions comptent pour moi.','Merci pour tes efforts ; je les remarque et je les apprécie sincèrement.'],miss:['Nos conversations et nos petits moments me manquent. J’espère que tu vas bien.','Je pense à toi et j’attends avec joie nos retrouvailles.'],sorry:['Je te présente mes excuses si je t’ai blessé. Je veux comprendre et réparer par mes actes.','J’ai eu tort de te blesser. Parlons calmement et écoutons-nous.'],support:['Je crois en toi et j’apprécie tes efforts. Avançons un pas après l’autre.','Tes efforts comptent et je suis là pour te soutenir avec bienveillance.'],calm:['Je ne veux pas que l’un gagne contre l’autre ; je veux que nous nous comprenions.','Prenons un moment pour nous apaiser, puis reparlons avec respect.'],dua:['Qu’Allah facilite tes affaires, apaise ton cœur et bénisse tes efforts.','Qu’Allah remplisse notre foyer de miséricorde, de patience et de compréhension.']}
};
const rescueText={"ar":{"argument":"1. أوقفا النقاش إذا ارتفع الصوت، واتفقا على وقت قريب للعودة إليه.\n2. يتحدث كل طرف عن شعوره واحتياجه دون اتهام أو تعميم.\n3. اختارا نقطة واحدة قابلة للحل الآن، واتفقا على خطوة عملية.","line":"يمكننا أن نختلف دون أن نجرح بعضنا. أريد أن أسمعك بهدوء ونبحث عن حل يرضينا.","silence":"الصمت أحياناً حاجة للهدوء، لكنه لا ينبغي أن يتحول إلى عقاب أو إهمال. امنح مساحة مع تحديد وقت مناسب للاطمئنان والحديث.","hurt":"سمِّ العبارة التي آلمتك بهدوء، واطلب عدم تكرارها. اعتذار صادق يتبعه تغيير عملي أفضل من تبرير الأذى.","stress":"خففا المطالب غير الضرورية، واسألا: ما المساعدة العملية التي تحتاجها الآن؟ اتفقا على تقسيم المهام ووقت للراحة.","misunderstanding":"أعيدوا صياغة ما فهمه كل طرف، واسألوا قبل الاستنتاج. وضّحوا المقصود دون سخرية أو دفاع متسرع.","apology":"اذكر الخطأ بوضوح، واعترف بأثره، واعتذر دون كلمة «لكن»، ثم اقترح إصلاحاً ملموساً واحترم وقت الطرف الآخر."},"en":{"argument":"Pause if voices rise and agree when to resume. Each person describes feelings without blame. Choose one practical next step.","line":"We can disagree without hurting each other. I want to listen calmly and find a fair solution.","silence":"A pause can help, but silence should not become punishment. Agree on a time to check in and talk.","hurt":"Name the words that hurt without attacking. Ask for respectful language and look for a sincere apology followed by change.","stress":"Reduce nonessential demands. Ask what practical help is needed and agree on a fair division of tasks and rest.","misunderstanding":"Repeat what you understood and ask before assuming. Clarify intentions without sarcasm or interruption.","apology":"Name the mistake, acknowledge its impact, apologise without excuses, and offer a concrete repair."},"fr":{"argument":"Faites une pause si le ton monte. Chacun exprime son ressenti sans accusation. Choisissez ensemble une action concrète.","line":"Nous pouvons être en désaccord sans nous blesser. Je veux t’écouter calmement et chercher une solution juste.","silence":"Une pause peut aider, mais le silence ne doit pas devenir une punition. Convenez d’un moment pour reprendre contact.","hurt":"Nommez calmement les paroles blessantes. Demandez un échange respectueux et des excuses suivies d’un changement réel.","stress":"Réduisez les demandes non essentielles. Demandez quelle aide concrète serait utile et répartissez les tâches et le repos.","misunderstanding":"Reformulez ce que chacun a compris et posez des questions avant de conclure. Clarifiez sans sarcasme.","apology":"Nommez l’erreur, reconnaissez ses conséquences, excusez-vous sans vous justifier et proposez une réparation concrète."}};
const challenges={
ar:['اسأل شريكك اليوم: ما الشيء الذي يمكنني فعله ليخفف عنك؟','اشكر شريكك على عمل محدد قام به اليوم.','خصصا عشر دقائق للحديث دون هاتف أو مقاطعة.','قدّم مساعدة عملية قبل أن تُطلب منك.','استمع حتى النهاية قبل تقديم النصيحة.','ادعُ لشريكك بظهر الغيب وأخبره بدعوة طيبة.','اترك رسالة تقدير قصيرة في مكان يراه.'],
en:['Ask your spouse what would make today easier.','Thank them for one specific thing they did.','Spend ten minutes talking without phones.','Offer practical help before being asked.','Listen fully before giving advice.','Make a sincere prayer for your spouse.','Leave a short note of appreciation.'],
fr:['Demandez ce qui pourrait alléger sa journée.','Remerciez votre conjoint pour un geste précis.','Parlez dix minutes sans téléphone.','Proposez une aide concrète spontanément.','Écoutez jusqu’au bout avant de conseiller.','Faites une invocation sincère pour votre conjoint.','Laissez un petit mot de reconnaissance.']
};
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
function nextKindness(){const list=challenges[lang];const day=Math.floor(Date.now()/86400000);const idx=(day+Math.floor(Math.random()*list.length))%list.length;$('challengeTask').textContent=list[idx]}
$('newChallenge').onclick=nextKindness;nextKindness();showRescue();
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
 try{
  if(file.size>2*1024*1024)throw Error('size');
  const data=JSON.parse(await file.text());
  if(data.app!=='bein-qalbein'||!data.data||typeof data.data!=='object'||Array.isArray(data.data))throw Error('invalid');
  const staged={};
  backupKeys.forEach(k=>{if(Object.prototype.hasOwnProperty.call(data.data,k)){const raw=data.data[k];if(!validBackupValue(k,raw))throw Error('invalid '+k);staged[k]=raw}});
  if(!Object.keys(staged).length)throw Error('empty');
  const previous={};Object.keys(staged).forEach(k=>previous[k]=bqStorage.getItem(k));
  try{Object.entries(staged).forEach(([k,v])=>bqStorage.setItem(k,v))}
  catch(error){Object.entries(previous).forEach(([k,v])=>{try{if(v===null)bqStorage.removeItem(k);else bqStorage.setItem(k,v)}catch(_){}});throw error}
  alert(lang==='ar'?'تمت استعادة النسخة الاحتياطية والتحقق من بياناتها. سيُعاد تحميل التطبيق الآن.':'Backup validated and restored. The app will now reload.');
  location.reload();
 }catch(_){alert(lang==='ar'?'لم تُستعد النسخة: الملف تالف أو يحتوي بيانات غير صالحة. لم نغيّر بياناتك الحالية.':'Backup was not restored: the file is invalid. Your current data was left unchanged.')}
 e.target.value='';
};
function updatePalette(value){document.body.classList.remove('theme-rose','theme-royal','theme-night');document.body.classList.add('theme-'+value);bqStorage.setItem('bq_palette',value)}
$('paletteSelect').onchange=e=>updatePalette(e.target.value);
$('fontScale').oninput=e=>{document.documentElement.style.setProperty('--bq-scale',e.target.value);bqStorage.setItem('bq_font_scale',e.target.value)};
const savedScale=Number(bqStorage.getItem('bq_font_scale')||'1');const storedScale=Number.isFinite(savedScale)?Math.min(1.2,Math.max(0.9,savedScale)):1;$('fontScale').value=String(storedScale);document.documentElement.style.setProperty('--bq-scale',String(storedScale));
const savedPalette=bqStorage.getItem('bq_palette')||'royal';const storedPalette=['royal','rose','night'].includes(savedPalette)?savedPalette:'royal';$('paletteSelect').value=storedPalette;updatePalette(storedPalette);
$('shareAppBtn').onclick=async()=>{const data={title:'بين قلبين',text:lang==='ar'?'رسائل زوجية راقية للمودة والاحترام. جرّب تطبيق بين قلبين.':lang==='fr'?'Des messages élégants pour le couple. Découvrez Entre deux cœurs.':'Elegant messages for couples. Try Between Two Hearts.',url:location.href.split('?')[0]};if(navigator.share){try{await navigator.share(data)}catch(_){}}else copyText(data.text+' '+data.url)};
const oldApplyLanguageV35=applyLanguage;
applyLanguage=function(){oldApplyLanguageV35();const labels={ar:{builderTitle:'اصنع رسالتك بنفسك',builderDesc:'اختر الشعور والأسلوب لتحصل على رسالة قابلة للتعديل.',builderFeelingLabel:'الشعور',builderStyleLabel:'الأسلوب',build:'✦ أنشئ رسالتي',use:'استخدم الرسالة',copy:'نسخ',rescueTitle:'أنقذ الموقف',rescueDesc:'خطوات هادئة لإصلاح الموقف دون لوم أو تصعيد.',situation:'ما الموقف؟',rescueButton:'اعرض خطة هادئة',challengeTitle:'🌷 تحدي اللطف',challengeDesc:'خطوة صغيرة اليوم تصنع فرقاً جميلاً.',newChallenge:'مهمة لطيفة أخرى',appearanceTitle:'المظهر والتخصيص',paletteLabel:'الطابع',fontSizeLabel:'حجم الخط',shareApp:'↗ شارك تطبيق بين قلبين',folderLabel:'مجلد المفضلة',assign:'صنّف الرسالة الحالية',export:'نسخة احتياطية',import:'استعادة نسخة',pin:'رمز خصوصية من 4 إلى 8 أرقام',lock:'تفعيل قفل المفضلة',unlock:'فتح المفضلة'},en:{builderTitle:'Build your own message',builderDesc:'Choose a feeling and style, then edit your message.',builderFeelingLabel:'Feeling',builderStyleLabel:'Style',build:'✦ Create my message',use:'Use this message',copy:'Copy',rescueTitle:'Repair the moment',rescueDesc:'Calm steps to work through a difficult moment.',situation:'What happened?',rescueButton:'Show a calm plan',challengeTitle:'🌷 Kindness challenge',challengeDesc:'One small action can make today better.',newChallenge:'Another kind action',appearanceTitle:'Appearance & personalisation',paletteLabel:'Theme',fontSizeLabel:'Font size',shareApp:'↗ Share Between Two Hearts',folderLabel:'Favorites folder',assign:'Organise current message',export:'Back up data',import:'Restore backup',pin:'Privacy PIN (4–8 digits)',lock:'Lock favorites',unlock:'Unlock favorites'},fr:{builderTitle:'Créer votre message',builderDesc:'Choisissez une émotion et un style, puis modifiez le texte.',builderFeelingLabel:'Émotion',builderStyleLabel:'Style',build:'✦ Créer mon message',use:'Utiliser ce message',copy:'Copier',rescueTitle:'Apaiser la situation',rescueDesc:'Des étapes calmes pour traverser un désaccord.',situation:'Quelle situation ?',rescueButton:'Afficher un plan calme',challengeTitle:'🌷 Défi de gentillesse',challengeDesc:'Un petit geste peut embellir la journée.',newChallenge:'Un autre geste',appearanceTitle:'Apparence et personnalisation',paletteLabel:'Thème',fontSizeLabel:'Taille du texte',shareApp:'↗ Partager Entre deux cœurs',folderLabel:'Dossier des favoris',assign:'Classer le message actuel',export:'Sauvegarder',import:'Restaurer',pin:'Code privé (4 à 8 chiffres)',lock:'Verrouiller les favoris',unlock:'Déverrouiller les favoris'}}[lang];Object.entries({builderTitle:'builderTitle',builderDesc:'builderDesc',builderFeelingLabel:'builderFeelingLabel',builderStyleLabel:'builderStyleLabel',build:'buildMessageBtn',use:'useBuiltMessage',copy:'copyBuiltMessage',rescueTitle:'rescueTitle',rescueDesc:'rescueDesc',situation:'rescueSituationLabel',rescueButton:'rescueGenerate',challengeTitle:'challengeTitle',challengeDesc:'challengeDesc',newChallenge:'newChallenge',appearanceTitle:'appearanceTitle',paletteLabel:'paletteLabel',fontSizeLabel:'fontSizeLabel',shareApp:'shareAppBtn',folderLabel:'folderLabel',assign:'assignFolder',export:'exportData',import:'importLabel'}).forEach(([k,id])=>{const el=$(id);if(el)el.textContent=labels[k]});$('privacyPin').placeholder=labels.pin;$('setPrivacyPin').textContent=labels.lock;$('unlockFavorites').textContent=labels.unlock;const opts={ar:[['love','مودة'],['miss','اشتياق'],['sorry','اعتذار'],['support','تشجيع'],['calm','تهدئة'],['dua','دعاء']],en:[['love','Affection'],['miss','Missing you'],['sorry','Apology'],['support','Support'],['calm','Calm'],['dua','Prayer']],fr:[['love','Affection'],['miss','Manque'],['sorry','Excuses'],['support','Soutien'],['calm','Apaisement'],['dua','Invocation']]}[lang];$('builderFeeling').innerHTML=opts.map(x=>'<option value="'+x[0]+'">'+x[1]+'</option>').join('');const styles={ar:['رقيق','عميق','مختصر'],en:['Gentle','Deep','Short'],fr:['Doux','Profond','Court']}[lang];$('builderStyle').innerHTML=['soft','deep','short'].map((v,i)=>'<option value="'+v+'">'+styles[i]+'</option>').join('');const situations={ar:['حدث خلاف','صمت وابتعاد','كلام جارح','ضغط وتعب','سوء فهم','أحتاج إلى الاعتذار'],en:['Disagreement','Silence and distance','Hurtful words','Stress and fatigue','Misunderstanding','I need to apologise'],fr:['Désaccord','Silence et distance','Paroles blessantes','Stress et fatigue','Malentendu','Je dois présenter mes excuses']}[lang];$('rescueSituation').innerHTML=['argument','silence','hurt','stress','misunderstanding','apology'].map((v,i)=>'<option value="'+v+'">'+situations[i]+'</option>').join('');const folderOpts={ar:[['all','كل الرسائل'],['love','مودة'],['support','دعم'],['prayer','أدعية'],['special','مميزة']],en:[['all','All messages'],['love','Affection'],['support','Support'],['prayer','Prayers'],['special','Special']],fr:[['all','Tous les messages'],['love','Affection'],['support','Soutien'],['prayer','Invocations'],['special','Spéciaux']]}[lang];$('favoriteFolder').innerHTML=folderOpts.map(x=>'<option value="'+x[0]+'">'+x[1]+'</option>').join('');showRescue();nextKindness();};


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
const iconPaths={
home:'<path d="m3 11 9-8 9 8"/><path d="M5.5 10v10h13V10M9 20v-6h6v6"/>',
heart:'<path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z"/>',
book:'<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22Z"/><path d="M4 5.5v13A3.5 3.5 0 0 1 7.5 15H20M8 6h8M8 9h7"/>',
settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.5 2.6-1.7-.7a8 8 0 0 1-1.6.9l-.3 1.8h-3l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.7-1.5-2.6 1.4-1.1a7 7 0 0 1 0-1.9l-1.4-1.1 1.5-2.6 1.7.7a8 8 0 0 1 1.6-.9l.3-1.8h3l.3 1.8a8 8 0 0 1 1.6.9l1.7-.7 1.5 2.6-1.4 1.1a7 7 0 0 1 0 1.9Z"/>',
crown:'<path d="m3 8 5 4 4-7 4 7 5-4-2 11H5L3 8Z"/><path d="M5 22h14"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
moon:'<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z"/>',
briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/>',
plane:'<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
flower:'<path d="M12 12c-4-8-10-4-6 1-7 2-3 9 3 5 0 7 7 7 7 0 6 4 10-3 3-5 4-5-2-9-6-1Z"/><circle cx="12" cy="13" r="2"/>',
cloud:'<path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
handshake:'<path d="m3 12 4-4 4 2 3-2 7 4-4 7-5-3-3 2-6-6Z"/><path d="m7 8 3-3 4 2 3-1 4 4M9 15l3 2m0-5 4 3m-1-5 4 3"/>',
star:'<path d="m12 2 2.8 6 6.5.8-4.8 4.5 1.3 6.4-5.8-3.2-5.8 3.2 1.3-6.4-4.8-4.5L9.2 8 12 2Z"/>',
hands:'<path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2 4.5 4.5 0 0 1 8 2c0 6.5-8 11-8 11Z"/><path d="M8 12h8m-4-3v6"/>',
shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
spark:'<path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3"/>',
share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4m-6.6 7.4 6.6 4.4"/>',
refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.5-3"/>',
gift:'<path d="M3 10h18v11H3zM2 6h20v4H2zM12 6v15"/><path d="M12 6H8a2.5 2.5 0 1 1 2.5-2.5C10.5 5 12 6 12 6Zm0 0h4a2.5 2.5 0 1 0-2.5-2.5C13.5 5 12 6 12 6Z"/>',
lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
download:'<path d="M12 3v12m-5-5 5 5 5-5M4 19v2h16v-2"/>',
upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 18v3h16v-3"/>',
card:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h7M7 16h5"/>',
message:'<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8 8 0 0 1-3-.6L4 20l1.5-4A7 7 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/><path d="M8 11h8m-8 3h5"/>',
};
function svgIcon(name,cls='ui-icon'){return '<svg class="'+cls+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(iconPaths[name]||iconPaths.spark)+'</svg>'}
const categoryIconMap={morning:'sun',evening:'moon',work:'briefcase',travel:'plane',wellness:'heart',sad:'flower',upset:'heart',tired:'cloud',sleep:'moon',miss:'mail',sorry:'handshake',thanks:'star',dua:'hands',support:'crown'};
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
const bqClosings={
ar:['أسأل الله أن يكتب لك الخير وييسر أمرك.','أنا أقدّر وجودك وجهدك، وسأظهر ذلك في أفعالي.','ولنجعل الرفق والاحترام أساس حديثنا.','حفظك الله وبارك في وقتك وصحتك.','فلنبحث معاً عن خطوة عملية نافعة.'],
en:['May Allah guide you towards what is best.','I appreciate you and will show it through my actions.','Let gentleness and respect guide our words.','May Allah bless your time, health and efforts.','Let us choose one helpful step together.'],
fr:['Qu’Allah te guide vers ce qui est le meilleur.','Je t’apprécie et je le montrerai aussi par mes actes.','Que la douceur et le respect guident nos paroles.','Qu’Allah bénisse ton temps, ta santé et tes efforts.','Choisissons ensemble une étape utile.']
};
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
 goPage('home');groupedRenderCats('');
 const panel=$('inlineMessagePanel');
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
  if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const item=b.closest('.category-item'),id=item?.dataset.categoryId;if(!id)return;const p=prepareInlineMessage();
   if(selected===id&&p.parentElement===item){p.remove();selected=null;d.querySelectorAll('#cats .cat').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-expanded','false')});return}
   selected=id;generate();d.querySelectorAll('#cats .cat').forEach(x=>{const active=x.closest('.category-item')?.dataset.categoryId===id;x.classList.toggle('active',active);x.setAttribute('aria-expanded',String(active))});item.append(p);p.hidden=false;p.style.display='block';requestAnimationFrame(()=>p.scrollIntoView({behavior:'auto',block:'nearest'}));return;
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


/* AI Studio client: resilient requests, clear feedback, and no client-side secrets. */
(function(){
 const $id=id=>document.getElementById(id);
 const endpoint=$id('aiEndpoint'),status=$id('aiStatus'),output=$id('aiOutput'),actions=$id('aiResultActions'),gen=$id('aiGenerateBtn'),more=$id('aiMoreBtn');
 if(!gen||gen.dataset.ready)return;gen.dataset.ready='1';
 let latest='',busy=false;
 const words={
 ar:{idle:'يمكنك توليد رسالة جديدة في كل مرة.',saved:'تم حفظ رابط المحرك على هذا الجهاز.',notSet:'محرك الذكاء الاصطناعي غير مربوط بعد. افتح إعداد الاتصال وأضف رابط المحرك المنشور.',badUrl:'أدخل رابط HTTPS صحيحاً للمحرك، دون مسار إضافي أو مفاتيح سرية.',save:'حفظ رابط المحرك',test:'اختبار الاتصال',generating:'جارٍ إنشاء رسالتك…',generate:'✦ أنشئ رسالة بالذكاء الاصطناعي',done:'تم إنشاء رسالة جديدة. يمكنك استخدامها أو نسخها أو طلب رسالة أخرى.',used:'تم نقل الرسالة إلى بطاقة رسالة من القلب.',copied:'تم نسخ الرسالة.',copyFailed:'تعذر النسخ. حاول مرة أخرى.',checking:'جارٍ اختبار الاتصال…',connected:'اختبار التوليد الفعلي ناجح؛ المحرك أنشأ رسالة تجريبية.',connectionFailed:'تعذر الاتصال بالمحرك. تحقق من الرابط والنشر.',failed:'تعذر إنشاء الرسالة الآن. تحقق من نشر المحرك وربطه، ثم حاول مجدداً.',timeout:'استغرق التوليد وقتاً أطول من المتوقع. حاول مرة أخرى.',title:'استوديو الرسائل الذكي',desc:'رسائل جديدة تُكتب لك حسب الموقف والشعور، مع ضوابط واضحة للاحترام والآداب الإسلامية.',mood:'ماذا تريد أن تعبّر؟',recipient:'لمن الرسالة؟',length:'طول الرسالة',language:'لغة الرسالة',context:'تفصيل اختياري يساعد على تخصيص الرسالة',privacy:'تفاصيل الموقف تُرسل إلى Cloudflare AI لتوليد الرسالة؛ تجنب الأسماء الكاملة والمعلومات الحساسة.',safety:'المحرك يطبق ضوابط أولية، لكنه لا يضمن حكماً شرعياً؛ راجع الرسالة قبل إرسالها.',placeholder:'مثلاً: أريد أن أشكره على صبره واهتمامه…',use:'استخدم الرسالة',copy:'نسخ',more:'رسائل أخرى',connection:'إعداد الاتصال بمحرك الذكاء الاصطناعي',guide:'شرح إعداد ونشر محرك الذكاء الاصطناعي خطوة بخطوة',guideNote:'بعد نشر المحرك، أدخل رابط Cloudflare Worker هنا. لا تضع أي مفتاح سري في التطبيق.',connectionIdle:'الاتصال غير مضبوط بعد.',connectionSaved:'تم حفظ الرابط. يمكنك الآن تجربة التوليد.',rateLimited:'وصلت إلى حد الطلبات المؤقت. انتظر دقيقة ثم حاول.',safetyRejected:'لم تجتز الرسالة فحص الاحترام الأولي. جرّب صياغة أخرى.',engineUnavailable:'محرك الذكاء الاصطناعي غير متاح حالياً. تحقق من ربطه وحصته.',contextTooLong:'تفاصيل الموقف طويلة جداً. اختصرها ثم حاول.'},
 en:{idle:'You can generate a fresh message each time.',saved:'The engine address is saved on this device.',notSet:'The AI engine is not connected yet. Open connection settings and add your deployed engine URL.',badUrl:'Enter a valid HTTPS engine URL without an extra path or secret key.',save:'Save engine URL',test:'Test connection',generating:'Creating your message…',generate:'✦ Generate with AI',done:'A new message is ready. You can use it, copy it, or request another.',used:'The message was added to the heart message card.',copied:'Message copied.',copyFailed:'Copy failed. Please try again.',checking:'Testing connection…',connected:'Live generation test passed; the engine produced a sample message.',connectionFailed:'Could not reach the engine. Check its URL and deployment.',failed:'Could not generate a message. Check that the engine is deployed and connected, then try again.',timeout:'Generation took longer than expected. Please try again.',title:'AI Message Studio',desc:'Fresh messages tailored to the moment, with clear respect and modesty guidelines.',mood:'What would you like to express?',recipient:'Who is the message for?',length:'Message length',language:'Message language',context:'Optional detail to personalize the message',privacy:'Your situation details are sent to Cloudflare AI to generate the message. Avoid full names and sensitive information.',safety:'The engine applies preliminary safeguards, not a religious ruling. Review each message before sending.',placeholder:'For example: I want to thank them for their patience and care…',use:'Use message',copy:'Copy',more:'Another message',connection:'Connect AI engine',guide:'Step-by-step engine setup and deployment guide',guideNote:'After deployment, enter your Cloudflare Worker URL here. Never put a secret key in the app.',connectionIdle:'Not connected yet.',connectionSaved:'URL saved. You can now try generating a message.',rateLimited:'You have reached the temporary request limit. Wait a minute and try again.',safetyRejected:'The message did not pass the initial respect check. Try a different request.',engineUnavailable:'The AI engine is unavailable. Check its binding and available quota.',contextTooLong:'The situation details are too long. Shorten them and try again.'},
 fr:{idle:'Vous pouvez générer un nouveau message à chaque demande.',saved:'L’adresse du moteur est enregistrée sur cet appareil.',notSet:'Le moteur IA n’est pas encore connecté. Ouvrez les paramètres de connexion et ajoutez son URL publiée.',badUrl:'Saisissez une URL HTTPS valide, sans chemin supplémentaire ni clé secrète.',save:'Enregistrer l’URL du moteur',test:'Tester la connexion',generating:'Création de votre message…',generate:'✦ Générer avec l’IA',done:'Un nouveau message est prêt. Vous pouvez l’utiliser, le copier ou en demander un autre.',used:'Le message a été placé dans la carte « Message du cœur ».',copied:'Message copié.',copyFailed:'Échec de la copie. Réessayez.',checking:'Test de connexion…',connected:'Le test de génération a réussi ; le moteur a produit un message exemple.',connectionFailed:'Connexion impossible. Vérifiez l’URL et le déploiement.',failed:'Impossible de générer le message. Vérifiez le déploiement et la connexion du moteur, puis réessayez.',timeout:'La génération a pris trop de temps. Veuillez réessayer.',title:'Studio de messages IA',desc:'Des messages adaptés à chaque situation, dans le respect et la pudeur.',mood:'Que souhaitez-vous exprimer ?',recipient:'À qui s’adresse le message ?',length:'Longueur du message',language:'Langue du message',context:'Détail facultatif pour personnaliser le message',privacy:'Les détails de votre situation sont envoyés à Cloudflare AI pour générer le message. Évitez les noms complets et les données sensibles.',safety:'Le moteur applique des contrôles préliminaires, sans garantir un avis religieux. Relisez le message avant de l’envoyer.',placeholder:'Exemple : je souhaite le remercier pour sa patience et son attention…',use:'Utiliser le message',copy:'Copier',more:'Un autre message',connection:'Connecter le moteur IA',guide:'Guide de configuration et de déploiement',guideNote:'Après le déploiement, saisissez ici l’URL de votre Cloudflare Worker. Ne placez aucune clé secrète dans l’application.',connectionIdle:'Pas encore connecté.',connectionSaved:'URL enregistrée. Vous pouvez maintenant générer un message.',rateLimited:'Limite temporaire atteinte. Attendez une minute avant de réessayer.',safetyRejected:'Le message n’a pas passé le contrôle initial de respect. Essayez une autre demande.',engineUnavailable:'Le moteur IA est indisponible. Vérifiez sa liaison et son quota.',contextTooLong:'Les détails sont trop longs. Raccourcissez-les puis réessayez.'}
 };
 const pack=()=>words[lang]||words.ar;
 const say=k=>{if(status)status.textContent=pack()[k]||k};
 function parseEndpoint(raw){
  let u;try{u=new URL(String(raw||'').trim())}catch(_){throw new Error('url')}
  if(u.protocol!=='https:'||!u.hostname.endsWith('.workers.dev')||u.username||u.password||u.pathname!=='/'||u.search||u.hash)throw new Error('url');
  return u.origin;
 }
 try{const saved=bqStorage.getItem('bq_ai_endpoint')||'https://bein-qalbein.etudiantourg.workers.dev';if(endpoint)endpoint.value=saved;if(bqStorage.getItem('bq_ai_endpoint')&&$id('aiConnectionState'))$id('aiConnectionState').textContent=pack().saved}catch(_){if(endpoint)endpoint.value='https://bein-qalbein.etudiantourg.workers.dev'}
 async function testConnection(){
  let url;try{url=parseEndpoint(endpoint?.value||bqStorage.getItem('bq_ai_endpoint')||'')}catch(_){say('notSet');return}
  const button=$id('aiTestEndpoint');if(button)button.disabled=true;say('checking');
  const controller=typeof AbortController!=='undefined'?new AbortController():null;
  const timer=controller?setTimeout(()=>controller.abort(),12000):null;
  try{
   const health=await fetch(url+'/health',{method:'GET',headers:{'Accept':'application/json'},signal:controller?.signal});
   const healthData=await health.json().catch(()=>({}));
   if(!health.ok||!healthData.ok||!healthData.bindingReady)throw new Error('not-ready');
   // A binding-only health check can pass while model inference is broken.
   // Verify the real POST route with a short, non-personal test prompt.
   const probe=await fetch(url+'/generate',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({mood:'مودة وامتنان',recipient:'محايدة',length:'قصيرة',language:'العربية',context:''}),signal:controller?.signal});
   const probeData=await probe.json().catch(()=>({}));
   if(!probe.ok||typeof probeData.message!=='string'||!probeData.message.trim()){
    const detail=String(probeData.error||'').slice(0,180);
    throw new Error(detail||'inference-failed');
   }
   if($id('aiConnectionState'))$id('aiConnectionState').textContent=pack().connected;
   say('connected');
  }catch(error){if($id('aiConnectionState'))$id('aiConnectionState').textContent=pack().connectionFailed;say('connectionFailed');if(error?.message&&error.message!=='not-ready'&&status)status.textContent+=' '+String(error.message).slice(0,180)}
  finally{if(timer)clearTimeout(timer);if(button)button.disabled=false}
 }
 $id('aiTestEndpoint')?.addEventListener('click',testConnection);
 $id('saveAiEndpoint')?.addEventListener('click',()=>{
  const raw=(endpoint?.value||'').trim();
  if(!raw){try{bqStorage.removeItem('bq_ai_endpoint')}catch(_){}if($id('aiConnectionState'))$id('aiConnectionState').textContent=pack().connectionIdle;say('notSet');return}
  let url;try{url=parseEndpoint(raw)}catch(_){say('badUrl');return}
  try{bqStorage.setItem('bq_ai_endpoint',url)}catch(_){}
  if($id('aiConnectionState'))$id('aiConnectionState').textContent=pack().connectionSaved;
  say('saved');
 });
 async function generate(){
  if(busy)return;
  let url;try{url=parseEndpoint(endpoint?.value||bqStorage.getItem('bq_ai_endpoint')||'')}catch(_){say('notSet');if($id('aiConnectionState'))$id('aiConnectionState').textContent=pack().connectionIdle;return}
  try{bqStorage.setItem('bq_ai_endpoint',url)}catch(_){}
  busy=true;gen.disabled=true;if(more)more.disabled=true;gen.textContent=pack().generating;say('generating');output.hidden=true;output.value='';actions.hidden=true;
  const controller=typeof AbortController!=='undefined'?new AbortController():null;
  const timer=controller?setTimeout(()=>controller.abort(),45000):null;
  try{
   const response=await fetch(url+'/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mood:$id('aiMood').value,recipient:$id('aiRecipient').value,length:$id('aiLength').value,language:$id('aiLanguage').value,context:$id('aiContext').value.slice(0,240)}),signal:controller?.signal});
   const data=await response.json().catch(()=>({}));
   if(!response.ok){const key=response.status===429?'rateLimited':response.status===422?'safetyRejected':response.status===413?'contextTooLong':response.status===503?'engineUnavailable':'failed';say(key);if(data.error&&status)status.textContent+=' '+String(data.error).slice(0,220);const error=new Error('server');error.feedbackShown=true;throw error;}
   latest=String(data.message||'').trim().slice(0,1800);if(!latest)throw new Error('empty');
   output.value=latest;output.hidden=false;actions.hidden=false;say('done');
  }catch(err){if(err?.feedbackShown){}else if(err?.name==='AbortError')say('timeout');else say('failed')}
  finally{if(timer)clearTimeout(timer);busy=false;gen.disabled=false;if(more)more.disabled=false;gen.textContent=pack().generate}
 }
 $id('aiLanguage')?.addEventListener('change',e=>{try{bqStorage.setItem('bq_ai_language',e.target.value);bqStorage.setItem('bq_ai_language_manual','1')}catch(_){}});
 document.querySelectorAll('.role').forEach(button=>button.addEventListener('click',()=>{if($id('aiRecipient'))$id('aiRecipient').value=role==='wife'?'للزوج':'للزوجة'}));
 if($id('aiRecipient'))$id('aiRecipient').value=role==='wife'?'للزوج':'للزوجة';
 gen.addEventListener('click',generate);more?.addEventListener('click',generate);
 $id('aiUseBtn')?.addEventListener('click',()=>{
  const finalMessage=String(output.hidden?latest:output.value).trim();if(!finalMessage)return;
  const map={'مودة وامتنان':'thanks','اشتياق محترم':'miss','اعتذار صادق':'sorry','تشجيع ودعم':'support','مواساة':'sad','تهدئة بعد خلاف':'upset','دعاء طيب':'dua','تقدير واحترام':'thanks','رسالة صباحية أو مسائية':'morning'};
  window.displayMessageInMain(finalMessage,map[$id('aiMood').value]||'thanks');say('used');
 });
 $id('aiCopyBtn')?.addEventListener('click',async()=>{const value=String(output.hidden?latest:output.value).trim();if(value){const ok=await copyText(value);say(ok?'copied':'copyFailed')}});
 window.applyAiStudioLanguage=function(){
  const t=pack(),set=(id,value)=>{const el=$id(id);if(el)el.textContent=value};
  set('aiMessageTitle',t.title);set('aiMessageDesc',t.desc);set('saveAiEndpoint',t.save);set('aiTestEndpoint',t.test);
  set('aiUseBtn',t.use);set('aiCopyBtn',t.copy);set('aiMoreBtn',t.more);
  [['aiMood','mood'],['aiRecipient','recipient'],['aiLength','length'],['aiLanguage','language'],['aiContext','context']].forEach(([id,key])=>{const el=$id(id),span=el?.closest('label')?.querySelector('span');if(span)span.textContent=t[key]});
  try{
   const aiLang=$id('aiLanguage'),manual=bqStorage.getItem('bq_ai_language_manual')==='1',saved=bqStorage.getItem('bq_ai_language');
   if(aiLang){if(manual&&['العربية','الإنجليزية','الفرنسية'].includes(saved))aiLang.value=saved;else if(!manual)aiLang.value=({ar:'العربية',en:'الإنجليزية',fr:'الفرنسية'})[lang]||'العربية'}
  }catch(_){}
  const optionLabels={
   ar:{aiMood:['مودة وامتنان','اشتياق','اعتذار','تشجيع','مواساة','تهدئة بعد خلاف','دعاء','تقدير واحترام','صباحية أو مسائية'],aiRecipient:['للزوج','للزوجة','صياغة محايدة'],aiLength:['قصيرة','متوسطة','مطولة'],aiLanguage:['العربية','الإنجليزية','الفرنسية']},
   en:{aiMood:['Affection & gratitude','Longing','Apology','Encouragement','Comfort','Calm after disagreement','Prayer','Appreciation','Morning or evening'],aiRecipient:['For husband','For wife','Neutral wording'],aiLength:['Short','Medium','Long'],aiLanguage:['Arabic','English','French']},
   fr:{aiMood:['Affection et gratitude','Manque','Excuses','Encouragement','Réconfort','Apaisement après un désaccord','Invocation','Reconnaissance','Matin ou soir'],aiRecipient:['Pour le mari','Pour l’épouse','Formulation neutre'],aiLength:['Court','Moyen','Long'],aiLanguage:['Arabe','Anglais','Français']}
  };
  Object.entries(optionLabels[lang]||optionLabels.ar).forEach(([id,labels])=>{const el=$id(id);if(el)Array.from(el.options).forEach((option,index)=>{if(labels[index])option.textContent=labels[index]})});
  if($id('aiContext'))$id('aiContext').placeholder=t.placeholder;
  set('aiPrivacyNote',t.privacy);set('aiSafetyNote',t.safety);
  if(output)output.placeholder=lang==='en'?'You can edit the message before using it…':lang==='fr'?'Vous pouvez modifier le message avant de l’utiliser…':'يمكنك تعديل الرسالة قبل استخدامها…';
  const details=document.querySelector('.ai-connection');if(details){const summary=details.querySelector('summary'),ps=details.querySelectorAll('p'),a=details.querySelector('a');if(summary)summary.textContent=t.connection;if(ps[0])ps[0].textContent=t.guideNote;if(a)a.textContent=t.guide}
  if($id('aiConnectionState')&&!bqStorage.getItem('bq_ai_endpoint'))$id('aiConnectionState').textContent=t.connectionIdle;
  if(!busy)gen.textContent=t.generate;
  if(status&&!output.hidden&&latest)status.textContent=t.done;else if(status&&!busy)status.textContent=t.idle;
 };
})();

const applyLanguageBeforeAiStudio=applyLanguage;
applyLanguage=function(){
 applyLanguageBeforeAiStudio();
 if(window.applyAiStudioLanguage)window.applyAiStudioLanguage();
 const note=document.getElementById('privacyNote');
 if(note)note.textContent=lang==='en'?'Note: this is a local display lock, not encryption. Messages remain readable in browser storage.':lang==='fr'?'Note : ce verrou masque l’affichage local, mais ne chiffre pas les messages stockés dans le navigateur.':'تنبيه: هذا قفل عرض محلي بسيط، وليس تشفيراً للرسائل أو حمايةً من فحص بيانات المتصفح.';
};
if(window.applyAiStudioLanguage)window.applyAiStudioLanguage();


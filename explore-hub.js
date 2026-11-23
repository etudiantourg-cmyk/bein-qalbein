
/* General-purpose discovery hub: learning paths, offline mini-games, and searchable channel categories. */
(function(){
 'use strict';
 const $ = (id) => document.getElementById(id);
 const safeRead = (key, fallback) => { try { const value=JSON.parse(localStorage.getItem(key)||'null'); return value===null?fallback:value; } catch(_){ return fallback; } };
 const safeWrite = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch(_){ return false; } };
 const escapeHtml = (value) => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 
 /* LEARN */
 const library=$('libraryPage');
 if(library){
  const libraryHost=document.querySelector('[data-shortcut-pane="library"]')||library;
  const nav=libraryHost.querySelector('.section-number-nav')||library.querySelector('.section-number-nav');
  const topics=[
   {id:'languages',icon:'🌐',title:'اللغات',category:'مهارات',summary:'ابدأ مفردات وتعبيرات عملية في الإنجليزية والفرنسية ولغات أخرى.',lessons:['عبارات يومية للتعارف والسؤال والجواب.','مفردات أساسية مع أمثلة قصيرة.','تدريب على النطق والاستماع والمراجعة.']},
   {id:'culture',icon:'🌍',title:'الثقافة العامة',category:'ثقافة',summary:'وسّع معرفتك بالجغرافيا والمجتمعات والحقائق من حولك.',lessons:['القارات والمحيطات والعواصم.','العادات الثقافية والتنوع الحضاري.','تمييز المعلومة الموثوقة من الشائعة.']},
   {id:'science',icon:'🔬',title:'العلوم',category:'علوم',summary:'مفاهيم مبسطة في الفيزياء والكيمياء والأحياء والفضاء.',lessons:['كيف تعمل الجاذبية والطاقة؟','الخلايا وأجهزة جسم الإنسان.','الكواكب والنجوم واستكشاف الفضاء.']},
   {id:'history',icon:'🏛️',title:'التاريخ والحضارات',category:'ثقافة',summary:'تعرف على الحضارات والأحداث والشخصيات التي صنعت التاريخ.',lessons:['الحضارات القديمة ومراكز نشأتها.','محطات تاريخية غيّرت العالم.','قراءة الأحداث ضمن سياقها الزمني.']},
   {id:'technology',icon:'💻',title:'التكنولوجيا والذكاء الاصطناعي',category:'تقنية',summary:'افهم التقنية الحديثة والذكاء الاصطناعي والأمن الرقمي.',lessons:['مبادئ الذكاء الاصطناعي وتطبيقاته.','حماية الحسابات والبيانات الشخصية.','كيف يعمل الإنترنت والتطبيقات؟']},
   {id:'self',icon:'🧠',title:'تطوير الذات',category:'مهارات',summary:'طوّر التفكير والتركيز والذاكرة والعادات اليومية.',lessons:['تقنيات عملية لإدارة الوقت.','التعلم النشط وتقوية الذاكرة.','التفكير النقدي واتخاذ القرار.']},
   {id:'business',icon:'📈',title:'المال والأعمال',category:'مهارات',summary:'مبادئ الميزانية والادخار وريادة الأعمال دون وعود بالربح.',lessons:['إعداد ميزانية شخصية بسيطة.','الفرق بين الحاجة والرغبة.','أساسيات فكرة المشروع ودراسة السوق.']},
   {id:'islamic',icon:'☪',title:'المعرفة الإسلامية',category:'ثقافة',summary:'مدخل منظم للقرآن والسيرة والعبادات والأخلاق مع الرجوع للمصادر.',lessons:['مبادئ قراءة القرآن وفهم معانيه.','محطات من السيرة النبوية.','التحقق من صحة الأحاديث ونسبة الأقوال.']},
   {id:'life',icon:'🧰',title:'مهارات الحياة',category:'مهارات',summary:'مهارات يومية نافعة في التواصل والسلامة والتنظيم.',lessons:['مبادئ الإسعافات الأولية وطلب المساعدة.','التواصل الواضح وحل المشكلات.','تنظيم المهام والمسؤوليات اليومية.']},
   {id:'health',icon:'🩺',title:'الصحة والمعرفة الطبية',category:'علوم',summary:'معلومات صحية عامة تساعدك على فهم الجسم والوقاية.',lessons:['النوم والتغذية والنشاط البدني.','مبادئ الوقاية والنظافة.','متى تحتاج إلى استشارة مختص صحي؟']}
  ];
  const completed=new Set(safeRead('bq_learning_progress',[]).filter(x=>typeof x==='string'));
  libraryHost.innerHTML='';
  if(nav)libraryHost.appendChild(nav);
  const heading=document.createElement('h2');heading.id='libraryTitle';heading.textContent='مساحة التعلّم والمعرفة';
  const intro=document.createElement('p');intro.className='explore-intro';intro.textContent='اختر مجالاً، افتح دروسه القصيرة، وتابع تقدمك. محتوى عام يناسب مختلف الاهتمامات والأعمار.';
  const progress=document.createElement('div');progress.className='explore-progress';progress.innerHTML='<strong id="learnProgressText"></strong><div class="explore-progress-track" role="progressbar" aria-label="إنجاز مسارات التعلم" aria-valuemin="0" aria-valuemax="100"><span id="learnProgressBar"></span></div>';
  const grid=document.createElement('div');grid.className='explore-card-grid';grid.id='learningTopics';
  libraryHost.append(heading,intro,progress,grid);
  topics.forEach(topic=>{
   const card=document.createElement('article');card.className='explore-card'+(completed.has(topic.id)?' is-complete':'');card.dataset.topic=topic.id;
   card.innerHTML='<div class="explore-card-head"><span class="explore-card-icon" aria-hidden="true">'+topic.icon+'</span><h3>'+escapeHtml(topic.title)+'</h3></div><p>'+escapeHtml(topic.summary)+'</p><details><summary>افتح محاور التعلّم</summary><ul>'+topic.lessons.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul></details><button type="button" class="explore-done" data-topic-done="'+topic.id+'" aria-pressed="'+String(completed.has(topic.id))+'">'+(completed.has(topic.id)?'✓ مكتمل — أزل العلامة':'تحديد كمكتمل')+'</button><button type="button" class="explore-save" data-save-book="'+topic.id+'">♡ احفظ المجال</button>';
   grid.appendChild(card);
  });
  function updateProgress(){
   const count=completed.size,percent=Math.round(count/topics.length*100);
   $('learnProgressText').textContent='تقدمك: '+count+' من '+topics.length;
   $('learnProgressBar').style.width=percent+'%';
   progress.querySelector('[role=progressbar]').setAttribute('aria-valuenow',String(percent));
  }
  grid.addEventListener('click',e=>{
   const button=e.target.closest('[data-topic-done]');if(!button)return;
   const id=button.dataset.topicDone;
   if(completed.has(id))completed.delete(id);else completed.add(id);
   safeWrite('bq_learning_progress',Array.from(completed));
   const card=button.closest('.explore-card'),done=completed.has(id);
   card.classList.toggle('is-complete',done);button.setAttribute('aria-pressed',String(done));
   button.textContent=done?'✓ أُنجز هذا المسار':'علّمني أنني أنجزته';
   updateProgress();
  });
  updateProgress();
 }

 /* GAMES — عالم الصغار */
 const games=$('gamesPage');
 if(games){
  const nav=games.querySelector('.section-number-nav');
  games.innerHTML='';
  if(nav){
   nav.innerHTML=[
    ['01','🧠','جزيرة العباقرة'],['02','🎨','مدينة المبدعين'],['03','🌍','كوكب المعرفة'],['04','🧸','حديقة الطفولة'],['05','🚀','مدينة المغامرات']
   ].map((x,i)=>'<button type="button" class="kids-world-tab'+(i===0?' is-active':'')+'" data-kids-world="'+i+'" aria-pressed="'+(i===0)+'"><span class="kids-tab-number">'+x[0]+'</span><span class="kids-tab-icon" aria-hidden="true">'+x[1]+'</span><span class="kids-tab-name">'+x[2]+'</span></button>').join('');
   nav.setAttribute('aria-label','عوالم ألعاب الأطفال');
   nav.classList.add('kids-world-nav');
   games.appendChild(nav);
  }
  const worldData=[
   {name:'جزيرة العباقرة',eyebrow:'فكّر، اكتشف، وتألّق',icon:'🧠',color:'mind',desc:'ألغاز ذكية ومهمات صغيرة تدرب الملاحظة والذاكرة والمنطق دون ضغط.',games:[
    {id:'pattern',icon:'🔷',name:'سرّ النمط',desc:'اكتشف الشكل الذي يكمل السلسلة.',tag:'منطق'},
    {id:'memory',icon:'🌟',name:'ذاكرة النجوم',desc:'تذكّر الإجابة الصحيحة وتدرّب على الانتباه.',tag:'ذاكرة'},
    {id:'detective',icon:'🔎',name:'المحقق الصغير',desc:'اجمع القرائن واختر الحل الأقرب.',tag:'ملاحظة'}
   ]},
   {name:'مدينة المبدعين',eyebrow:'خيالك يصنع عالماً',icon:'🎨',color:'create',desc:'مساحة آمنة للتجريب والتصميم والتعبير عن الأفكار بطرق ممتعة.',games:[
    {id:'colors',icon:'🖍️',name:'مختبر الألوان',desc:'اكتشف مزج الألوان واختياراتها.',tag:'فن'},
    {id:'story',icon:'📖',name:'حكاية تفاعلية',desc:'اختر كيف تتقدم الحكاية وصمّم نهايتها.',tag:'خيال'},
    {id:'shapes',icon:'🧩',name:'مهندس الأشكال',desc:'تعرّف على الأشكال واختر القطعة المناسبة.',tag:'تصميم'}
   ]},
   {name:'كوكب المعرفة',eyebrow:'العالم كتاب مفتوح',icon:'🌍',color:'learn',desc:'رحلات قصيرة في العلوم والطبيعة والجغرافيا والمعرفة العامة.',games:[
    {id:'animals',icon:'🐾',name:'أصدقاء الحيوانات',desc:'اكتشف الحيوان وبيئته وصفاته.',tag:'طبيعة'},
    {id:'space',icon:'🪐',name:'رحلة الفضاء',desc:'تعرف على الكواكب والنجوم.',tag:'علوم'},
    {id:'world',icon:'🗺️',name:'مستكشف العالم',desc:'أسئلة لطيفة عن كوكبنا.',tag:'جغرافيا'}
   ]},
   {name:'حديقة الطفولة',eyebrow:'نتعلم باللعب',icon:'🧸',color:'little',desc:'أنشطة بسيطة بصرياً وصوتياً، مناسبة للبدايات والتعلم خطوة بخطوة.',games:[
    {id:'letters',icon:'🔤',name:'قطار الحروف',desc:'اختر الحرف الذي تبدأ به الكلمة.',tag:'لغة'},
    {id:'numbers',icon:'🔢',name:'عدّ واربح',desc:'عدّ الأشياء واختر العدد الصحيح.',tag:'أرقام'},
    {id:'little-shapes',icon:'🟡',name:'عالم الأشكال',desc:'ميّز الأشكال والألوان الأساسية.',tag:'تمييز'}
   ]},
   {name:'مدينة المغامرات',eyebrow:'مغامرات لطيفة بلا مخاطر',icon:'🚀',color:'adventure',desc:'مهمات إنقاذ واستكشاف وتحديات حركة ذهنية بشخصيات محببة.',games:[
    {id:'rescue',icon:'🐢',name:'أنقذ السلحفاة',desc:'اختر الطريق الآمن لمساعدة صديقك.',tag:'مهمة'},
    {id:'garden',icon:'🌱',name:'سر الحديقة',desc:'اختر ما تحتاجه النبتة لتنمو.',tag:'طبيعة'},
    {id:'treasure',icon:'💎',name:'كنز الجزيرة',desc:'حل الألغاز لتصل إلى الكنز.',tag:'مغامرة'}
   ]}
  ];
  const datasets={
   pattern:[
    {q:'ما الشكل الذي يكمل النمط؟ 🔴 🔵 🔴 🔵 ؟',a:['🔴','🟢','⭐'],c:0,why:'النمط يتناوب بين الأحمر والأزرق.'},
    {q:'ما العدد التالي؟ 2، 4، 6، ؟',a:['7','8','10'],c:1,why:'نضيف 2 في كل مرة.'},
    {q:'🌟 🌙 🌟 🌙 ؟',a:['🌟','☀️','🌙'],c:0,why:'النجمة والقمر يتناوبان.'},
    {q:'ما الشكل المختلف؟',a:['🟦','🟦','🔺'],c:2,why:'المثلث يختلف عن المربعين.'},
    {q:'ما العدد الناقص؟ 5، 10، 15، ؟',a:['18','20','25'],c:1,why:'نضيف خمسة كل مرة.'}
   ],
   memory:[
    {q:'تذكّر: 🍎 🐟 🌼 — أي شيء كان في الوسط؟',a:['🍎','🐟','🌼'],c:1,why:'كانت السمكة في الوسط.'},
    {q:'تذكّر: 🟡 🟢 🔵 — ما اللون الأخير؟',a:['أصفر','أخضر','أزرق'],c:2,why:'الأزرق كان في نهاية التسلسل.'},
    {q:'أي حيوان ظهر هنا؟ 🐱 🐰 🐼',a:['🐶','🐼','🦁'],c:1,why:'كان الباندا ضمن المجموعة.'},
    {q:'ما الرمز الأول؟ ⭐ 🌙 ☀️',a:['⭐','🌙','☀️'],c:0,why:'بدأ التسلسل بالنجمة.'},
    {q:'كم زهرة ظهرت؟ 🌸 🌸 🌸',a:['2','3','4'],c:1,why:'ظهرت ثلاث زهرات.'}
   ],
   detective:[
    {q:'اختفت جزرة من المطبخ. من يحب أكل الجزر غالباً؟',a:['🐰 الأرنب','🐳 الحوت','🐧 البطريق'],c:0,why:'الأرنب معروف بحبه للخضروات.'},
    {q:'وجدت آثار أقدام صغيرة قرب العش. من قد يكون مرّ هنا؟',a:['🐘 فيل','🐦 عصفور','🐋 حوت'],c:1,why:'العصفور صغير ويمكنه الوقوف قرب العش.'},
    {q:'المكان مليء بالماء والزعانف ظاهرة. أين تبحث؟',a:['في الصحراء','في البحر','فوق الشجرة'],c:1,why:'الزعانف والماء دليلان على البيئة البحرية.'},
    {q:'سمعت مواءً خلف الباب. من صاحب الصوت؟',a:['🐱 قطة','🐸 ضفدع','🐮 بقرة'],c:0,why:'القطة تصدر صوت المواء.'},
    {q:'وجدت قشرة بيضة في العش. ما الذي كان فيه؟',a:['بيضة','حجر','ورقة'],c:0,why:'القشرة دليل على وجود بيضة.'}
   ],
   colors:[
    {q:'ما اللون الناتج غالباً عن مزج الأصفر والأزرق؟',a:['أخضر','وردي','برتقالي'],c:0,why:'الأصفر مع الأزرق يصنعان الأخضر.'},
    {q:'أي لون نراه في ثمرة الفراولة الناضجة؟',a:['أزرق','أحمر','بنفسجي'],c:1,why:'الفراولة الناضجة غالباً حمراء.'},
    {q:'ما اللون الأقرب إلى لون السماء الصافية؟',a:['أزرق','بني','أسود'],c:0,why:'السماء الصافية تبدو زرقاء.'},
    {q:'الأحمر مع الأصفر يصنعان غالباً:',a:['برتقالي','أخضر','رمادي'],c:0,why:'مزج الأحمر والأصفر يعطي البرتقالي.'},
    {q:'أي لون يشبه أوراق الشجر؟',a:['أخضر','وردي','فضي'],c:0,why:'أوراق كثيرة تبدو خضراء.'}
   ],
   story:[
    {q:'وجدت عصفوراً صغيراً قرب شجرة. ما التصرف اللطيف؟',a:['أراقبه من بعيد وأطلب مساعدة شخص بالغ','أحمله بقوة','أتركه في مكان خطر'],c:0,why:'نحافظ على سلامة الحيوان ونطلب مساعدة شخص بالغ.'},
    {q:'وصلت إلى نهر في طريق الرحلة. ماذا تفعل؟',a:['أعبر وحدي','أبحث عن جسر وأرافق شخصاً بالغاً','أقفز في الماء'],c:1,why:'اختيار الطريق الآمن ووجود شخص بالغ مهم.'},
    {q:'صديقك حزين لأنه أخطأ. ماذا تقول؟',a:['لا بأس، حاول مرة أخرى','لن تلعب أبداً','أضحك عليه'],c:0,why:'الكلمات المشجعة تساعد الصديق.'},
    {q:'وجدت كتاباً جميلاً في المكتبة. ماذا تفعل؟',a:['أمزقه','أقرأه وأعيده إلى مكانه','أخفيه'],c:1,why:'نستمتع بالكتاب ونحافظ عليه.'},
    {q:'انتهت المغامرة، كيف تشكر من ساعدك؟',a:['بكلمة شكر لطيفة','بالصراخ','بتجاهله'],c:0,why:'الشكر يعبر عن التقدير.'}
   ],
   shapes:[
    {q:'أي شكل له ثلاثة أضلاع؟',a:['🔺 مثلث','🟦 مربع','⚪ دائرة'],c:0,why:'للمثلث ثلاثة أضلاع.'},
    {q:'أي شكل ليس له زوايا؟',a:['مربع','دائرة','مثلث'],c:1,why:'الدائرة ليس لها زوايا.'},
    {q:'كم ضلعاً للمربع؟',a:['3','4','5'],c:1,why:'للمربع أربعة أضلاع متساوية.'},
    {q:'أي شكل يشبه نافذة مربعة؟',a:['🟦','⚪','🔺'],c:0,why:'المربع له أربعة أضلاع.'},
    {q:'أي شكل يشبه عجلة؟',a:['دائرة','مثلث','مستطيل'],c:0,why:'العجلة دائرية.'}
   ],
   animals:[
    {q:'أين يعيش الجمل غالباً؟',a:['الصحراء','المحيط','القطب الجنوبي'],c:0,why:'الجمل متكيف مع البيئة الصحراوية.'},
    {q:'أي حيوان يستطيع الطيران؟',a:['🐦 عصفور','🐘 فيل','🐢 سلحفاة'],c:0,why:'العصفور من الحيوانات التي تطير.'},
    {q:'ماذا يغطي جسم السمكة؟',a:['قشور','ريش','صوف'],c:0,why:'تغطي أجسام كثير من الأسماك قشور.'},
    {q:'أي حيوان يُسمى ملك الغابة في القصص؟',a:['🦁 الأسد','🐰 الأرنب','🐑 الخروف'],c:0,why:'الأسد يُعرف بهذا اللقب الشائع.'},
    {q:'أين يعيش الدب القطبي؟',a:['المناطق القطبية','الغابة الاستوائية','الصحراء'],c:0,why:'يعيش الدب القطبي في مناطق القطب الشمالي.'}
   ],
   space:[
    {q:'ما اسم الكوكب الذي نعيش عليه؟',a:['الأرض','المريخ','زحل'],c:0,why:'نحن نعيش على كوكب الأرض.'},
    {q:'ما الذي يضيء لنا في النهار؟',a:['الشمس','القمر','المريخ'],c:0,why:'الشمس نجم يمد الأرض بالضوء والحرارة.'},
    {q:'ما الجسم الذي يدور حول الأرض؟',a:['القمر','الشمس','المشتري'],c:0,why:'القمر هو تابع الأرض الطبيعي.'},
    {q:'أي كوكب مشهور بحلقاته؟',a:['زحل','عطارد','الأرض'],c:0,why:'زحل مشهور بحلقاته الجميلة.'},
    {q:'هل الشمس كوكب أم نجم؟',a:['نجم','كوكب','قمر'],c:0,why:'الشمس نجم قريب من الأرض.'}
   ],
   world:[
    {q:'ما القارة التي تقع فيها الجزائر؟',a:['أفريقيا','أوروبا','آسيا'],c:0,why:'الجزائر تقع في شمال أفريقيا.'},
    {q:'ما لون أوراق الشجر غالباً؟',a:['أخضر','أزرق','أسود'],c:0,why:'تبدو الأوراق خضراء بسبب صبغة اليخضور.'},
    {q:'ما أكبر حيوان يعيش في البحر؟',a:['الحوت الأزرق','الدلفين','فرس البحر'],c:0,why:'الحوت الأزرق أكبر حيوان معروف.'},
    {q:'ماذا نستخدم لمعرفة الاتجاهات؟',a:['البوصلة','الملعقة','الفرشاة'],c:0,why:'تساعد البوصلة على تحديد الاتجاهات.'},
    {q:'أي فصل يأتي بعد الشتاء؟',a:['الربيع','الخريف','الصيف'],c:0,why:'يأتي الربيع بعد الشتاء.'}
   ],
   letters:[
    {q:'أي حرف تبدأ به كلمة «أسد»؟',a:['أ','ب','ت'],c:0,why:'أسد تبدأ بحرف الألف.'},
    {q:'أي حرف تبدأ به كلمة «تفاحة»؟',a:['م','ت','س'],c:1,why:'تفاحة تبدأ بحرف التاء.'},
    {q:'أي حرف تبدأ به كلمة «باب»؟',a:['ب','ن','ر'],c:0,why:'باب تبدأ بحرف الباء.'},
    {q:'أي حرف تبدأ به كلمة «قمر»؟',a:['ف','ق','ك'],c:1,why:'قمر تبدأ بحرف القاف.'},
    {q:'أي حرف تبدأ به كلمة «وردة»؟',a:['و','د','ز'],c:0,why:'وردة تبدأ بحرف الواو.'}
   ],
   'little-shapes':[
    {q:'أي شكل له أربع زوايا؟',a:['🟦 مربع','⚪ دائرة','🔺 مثلث'],c:0,why:'للمربع أربع زوايا.'},
    {q:'اختر الشكل الدائري.',a:['🔺 مثلث','⚪ دائرة','🟦 مربع'],c:1,why:'الدائرة مستديرة ولا تحتوي زوايا.'},
    {q:'أي شكل يشبه سقف البيت؟',a:['🔺 مثلث','⚪ دائرة','🟨 مستطيل'],c:0,why:'المثلث كثيراً ما يظهر في شكل السقف.'},
    {q:'كم ضلعاً للمستطيل؟',a:['3','4','5'],c:1,why:'للمستطيل أربعة أضلاع.'},
    {q:'أي شكل له ضلعان طويلان وضلعان قصيران؟',a:['مستطيل','دائرة','مثلث'],c:0,why:'هذه صفة المستطيل.'}
   ],
   numbers:[
    {q:'كم تفاحة هنا؟ 🍎 🍎 🍎',a:['2','3','4'],c:1,why:'هناك ثلاث تفاحات.'},
    {q:'كم يساوي 2 + 1؟',a:['2','3','4'],c:1,why:'اثنان زائد واحد يساوي ثلاثة.'},
    {q:'ما العدد الذي يأتي بعد 5؟',a:['4','6','7'],c:1,why:'العدد التالي هو ستة.'},
    {q:'كم نجمة هنا؟ ⭐ ⭐ ⭐ ⭐',a:['3','4','5'],c:1,why:'هناك أربع نجمات.'},
    {q:'ما الأصغر؟',a:['2','5','8'],c:0,why:'اثنان أصغر من خمسة وثمانية.'}
   ],
   rescue:[
    {q:'السلحفاة تريد عبور الطريق. ما الخيار الآمن؟',a:['تطلب مساعدة شخص بالغ','تركض وحدها','تغمض عينيها'],c:0,why:'السلامة أولاً، ونطلب مساعدة شخص بالغ.'},
    {q:'صديقك ضائع في الحديقة. ماذا تفعل؟',a:['أخبر موظفاً أو شخصاً بالغاً موثوقاً','أذهب بعيداً','أتبع غريباً'],c:0,why:'نلجأ إلى شخص بالغ موثوق.'},
    {q:'وجدت زجاجاً مكسوراً على الأرض. ماذا تفعل؟',a:['لا ألمسه وأخبر شخصاً بالغاً','ألتقطه','ألعب به'],c:0,why:'الزجاج قد يسبب جروحاً، لا تلمسه.'},
    {q:'حيوان صغير يبدو خائفاً. كيف تساعده؟',a:['أهدأ وأطلب مساعدة بالغ','أطارده','أصرخ قربه'],c:0,why:'الهدوء وطلب المساعدة يحميان الحيوان والطفل.'},
    {q:'أنت لا تعرف الطريق. ما الأفضل؟',a:['أبقى في مكان آمن وأطلب المساعدة','أمشي مع أي شخص','أختبئ'],c:0,why:'ابق في مكان آمن واطلب المساعدة من شخص موثوق.'}
   ],
   garden:[
    {q:'ماذا تحتاج النبتة لتنمو؟',a:['ماء وضوء مناسب','حلوى','ألعاب'],c:0,why:'تحتاج النباتات إلى الماء والضوء والهواء.'},
    {q:'أي جزء يمتص الماء من التربة؟',a:['الجذور','الزهرة','الثمرة'],c:0,why:'تمتص الجذور الماء من التربة.'},
    {q:'ماذا نفعل بالتربة الجافة؟',a:['نسقيها باعتدال','نرميها','نغطيها بالبلاستيك دائماً'],c:0,why:'الري المعتدل يساعد النبات.'},
    {q:'أي كائن يساعد بعض النباتات في التلقيح؟',a:['النحلة','السمكة','الحصان'],c:0,why:'تساعد النحلات في نقل حبوب اللقاح.'},
    {q:'أين نضع نبتة تحتاج الضوء؟',a:['مكان مناسب تصله أشعة الشمس','خزانة مظلمة','داخل صندوق مغلق'],c:0,why:'تحتاج النباتات إلى الضوء لصنع غذائها.'}
   ],
   treasure:[
    {q:'للوصول إلى الكنز اتبع النمط: شمال، شرق، شمال، شرق، ؟',a:['شمال','جنوب','غرب'],c:0,why:'النمط يتناوب بين الشمال والشرق.'},
    {q:'ما الأداة التي تساعدك على معرفة الاتجاه؟',a:['بوصلة','وسادة','كوب'],c:0,why:'البوصلة تساعد على معرفة الاتجاهات.'},
    {q:'لديك مفتاحان، واحد ذهبي وآخر خشبي. أيهما يطابق القفل الذهبي؟',a:['الذهبي','الخشبي','كلاهما مكسور'],c:0,why:'نطابق المفتاح مع لون القفل في هذا اللغز.'},
    {q:'ثلاث خطوات للأمام ثم خطوتان للخلف. كم تقدمت؟',a:['خطوة واحدة','خمس خطوات','صفر'],c:0,why:'ثلاثة للأمام ناقص اثنتين للخلف تساوي خطوة.'},
    {q:'الكنز داخل الصندوق وليس تحت الشجرة. أين تبحث؟',a:['داخل الصندوق','تحت الشجرة','في النهر'],c:0,why:'اتبع الدليل كما ورد.'}
   ]
  };
  const $games=document.createElement('div');$games.className='kids-hub';
  const dashboard=document.createElement('section');dashboard.className='kids-dashboard';dashboard.setAttribute('aria-label','إحصاءات التقدم');
  dashboard.innerHTML='<div class="kids-dashboard-title"><span>لوحة إنجازاتك</span><strong>رحلتك تكبر مع كل محاولة</strong></div><div class="kids-dashboard-stats"><div class="kids-stat"><span class="kids-stat-icon">🎮</span><span><strong id="kidsTotalGames">15</strong><small>لعبة متاحة</small></span></div><div class="kids-stat"><span class="kids-stat-icon">⭐</span><span><strong id="kidsTotalStars">0</strong><small>نجمة جمعتها</small></span></div><div class="kids-stat"><span class="kids-stat-icon">🏅</span><span><strong id="kidsCompletedGames">0</strong><small>لعبة أنجزتها</small></span></div></div><div class="kids-overall-track" role="progressbar" aria-label="تقدمك في عالم الصغار" aria-valuemin="0" aria-valuemax="15" aria-valuenow="0"><span id="kidsOverallBar"></span></div>';
  const hero=document.createElement('section');hero.className='kids-hero';
  hero.innerHTML='<div class="kids-hero-copy"><span class="kids-hero-kicker">✦ مساحة آمنة للخيال والاكتشاف</span><h2>عالم الصغار</h2><p>خمسة عوالم مليئة بالتجارب والألعاب والقصص. تعلّم، ابتكر، واكتشف بطريقتك.</p><div class="kids-hero-pills"><span>🌱 نتعلم بهدوء</span><span>🎯 تحديات لطيفة</span><span>♡ بلا إعلانات داخل اللعب</span></div></div><div class="kids-hero-art" aria-hidden="true"><span class="kids-orbit orbit-one">⭐</span><span class="kids-orbit orbit-two">🪐</span><span class="kids-hero-mascot">🦊</span><span class="kids-hero-cloud cloud-one"></span><span class="kids-hero-cloud cloud-two"></span></div>';
  const worldIntro=document.createElement('div');worldIntro.className='kids-section-heading';worldIntro.innerHTML='<div><span>اختر بوابتك</span><h3>أي عالم ستكتشف اليوم؟</h3></div><small>5 عوالم • ألعاب قصيرة</small>';
  const worldGrid=document.createElement('div');worldGrid.className='kids-world-grid';
  const gameArea=document.createElement('section');gameArea.className='kids-play-area';gameArea.id='kidsPlayArea';gameArea.hidden=true;
  const safety=document.createElement('p');safety.className='kids-safety-note';safety.textContent='مساحة لعب هادئة: لا محادثات عامة، ولا ترتيب أو منافسة مع غرباء. تُحفظ نتائجك على هذا الجهاز فقط.';
  $games.append(hero,dashboard,worldIntro,worldGrid,gameArea,safety);games.appendChild($games);
  let activeWorld=0,activeGame=null,round=0,score=0,streak=0,deck=[],locked=false;
  const progress=safeRead('bq_kids_progress_v1',{});
  const bests=safeRead('bq_kids_best_v1',{});
  const completedIds=new Set(safeRead('bq_kids_completed_v2',[]));
  const totalStars=()=>Object.values(bests).reduce((sum,n)=>sum+Math.max(0,Number(n)||0),0);
  function renderDashboard(){
   const done=completedIds.size,stars=totalStars();
   $('kidsTotalStars').textContent=String(stars);$('kidsCompletedGames').textContent=String(done);
   dashboard.querySelector('[role=progressbar]').setAttribute('aria-valuenow',String(Math.min(15,done)));
   $('kidsOverallBar').style.width=(Math.min(15,done)/15*100)+'%';
  }
  function updateWorldTabs(index){
   if(nav)nav.querySelectorAll('[data-kids-world]').forEach(b=>{const active=Number(b.dataset.kidsWorld)===index;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});
  }
  function renderWorld(index){
   activeWorld=index;activeGame=null;gameArea.hidden=true;updateWorldTabs(index);
   const best=safeRead('bq_kids_best_v1',{});
   worldGrid.innerHTML=worldData.map((w,wi)=>'<article class="kids-world-card world-'+w.color+(wi===index?' is-current':'')+'" data-world-card="'+wi+'"><div class="kids-world-card-top"><span class="kids-world-illustration">'+w.icon+'</span><span class="kids-world-badge">'+w.games.filter(g=>completedIds.has(g.id)).length+' / '+w.games.length+' مكتملة</span></div><span class="kids-world-eyebrow">'+w.eyebrow+'</span><h3>'+w.name+'</h3><p>'+w.desc+'</p><div class="kids-world-progress"><span style="width:'+(w.games.filter(g=>completedIds.has(g.id)).length/w.games.length*100)+'%"></span></div><div class="kids-game-list">'+w.games.map(g=>'<button type="button" class="kids-game-card" data-kids-game="'+g.id+'" data-world="'+wi+'"><span class="kids-game-icon">'+g.icon+'</span><span class="kids-game-copy"><strong>'+g.name+'</strong><small>'+g.desc+'</small><em>'+(completedIds.has(g.id)?'✓ أُنجزت':'مهمة تفاعلية')+' · أفضل نتيجة '+(Number(best[g.id]||0))+'/'+(datasets[g.id]||[]).length+'</em></span><span class="kids-game-tag">'+g.tag+'</span><span class="kids-game-arrow" aria-hidden="true">‹</span></button>').join('')+'</div></article>').join('');
   worldIntro.querySelector('small').textContent='15 لعبة • 5 عوالم • اختر مغامرتك';
   renderDashboard();
  }
  function showRound(){
   const item=deck[round];locked=false;
   const art=({pattern:'🔷',memory:'🌟',detective:'🔎',colors:'🎨',story:'📖',shapes:'🧩','little-shapes':'🟡',animals:'🐾',space:'🪐',world:'🗺️',letters:'🔤',numbers:'🔢',rescue:'🐢',garden:'🌱',treasure:'💎'})[activeGame]||'✨';
   gameArea.innerHTML='<div class="kids-play-head"><button type="button" class="kids-back" data-kids-back>‹ خريطة العوالم</button><span class="kids-round-count">المستوى '+String(round+1).padStart(2,'0')+' / '+deck.length+'</span></div><div class="kids-stage-meta"><span>🎯 '+worldData[activeWorld].name+'</span><span>🔥 سلسلة '+streak+'</span><span>⭐ '+score+' نجوم</span></div><div class="kids-play-progress" role="progressbar" aria-label="تقدم المهمة" aria-valuemin="0" aria-valuemax="'+deck.length+'" aria-valuenow="'+round+'"><span style="width:'+(round/deck.length*100)+'%"></span></div><div class="kids-question-card"><div class="kids-question-art" aria-hidden="true"><span>'+art+'</span><i></i><b></b></div><span class="kids-question-label">تحدّي '+(round+1)+' · اختر الإجابة الصحيحة</span><h3>'+item.q+'</h3><div class="kids-answer-grid">'+item.a.map((a,i)=>'<button type="button" class="kids-answer" data-kids-answer="'+i+'" aria-label="الخيار '+(i+1)+': '+escapeHtml(a)+'"><span class="kids-answer-index">'+['أ','ب','ج','د'][i]+'</span><span class="kids-answer-text">'+escapeHtml(a)+'</span><span class="kids-answer-mark" aria-hidden="true"></span></button>').join('')+'</div><p class="kids-feedback" role="status" aria-live="polite"></p></div><div class="kids-score-line"><span>رصيد النجوم</span><strong>⭐ '+score+'</strong><small>كل إجابة صحيحة = نجمة</small></div>';
   gameArea.hidden=false;
  }
  function startGame(id){
   activeGame=id;round=0;score=0;streak=0;locked=false;deck=(datasets[id]||[]).slice();if(!deck.length)return;
   showRound();
   gameArea.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function finishGame(){
   const key=worldData[activeWorld].color;progress[key]=Number(progress[key]||0)+1;safeWrite('bq_kids_progress_v1',progress);
   const wasDone=completedIds.has(activeGame);completedIds.add(activeGame);safeWrite('bq_kids_completed_v2',Array.from(completedIds));
   bests[activeGame]=Math.max(Number(bests[activeGame]||0),score);safeWrite('bq_kids_best_v1',bests);
   const earned=score*20+(wasDone?0:30);
   const xp=safeRead('bq_kids_xp_v1',0)+earned;safeWrite('bq_kids_xp_v1',xp);
   renderDashboard();
   gameArea.innerHTML='<div class="kids-finish-card"><div class="kids-finish-confetti" aria-hidden="true">✦ ✧ ✦</div><span class="kids-finish-art">🏆</span><span class="kids-hero-kicker">إنجاز جديد في رحلتك</span><h3>'+(score===deck.length?'أداء أسطوري!':'أحسنت، واصل التقدم!')+'</h3><p>أكملت '+deck.length+' تحديات وجمعت '+score+' نجوم. '+(wasDone?'لقد حسّنت تجربتك!':'أضفنا هذه اللعبة إلى إنجازاتك.')+'</p><div class="kids-finish-stars">'+Array.from({length:deck.length},(_,i)=>'<span>'+(i<score?'⭐':'☆')+'</span>').join('')+'</div><div class="kids-reward-row"><span>✨ +'+earned+' XP</span><span>🏅 '+completedIds.size+'/15 لعبة</span><span>🌟 '+totalStars()+' نجمة</span></div><button type="button" class="kids-primary-action" data-kids-replay>↻ العب مرة أخرى</button><button type="button" class="kids-secondary-action" data-kids-back>🗺 العودة إلى خريطة العوالم</button></div>';
   gameArea.hidden=false;
  }
  if(nav)nav.addEventListener('click',e=>{const b=e.target.closest('[data-kids-world]');if(b)renderWorld(Number(b.dataset.kidsWorld))});
  worldGrid.addEventListener('click',e=>{const b=e.target.closest('[data-kids-game]');if(b){activeWorld=Number(b.dataset.world);updateWorldTabs(activeWorld);startGame(b.dataset.kidsGame)}});
  gameArea.addEventListener('click',e=>{
   if(e.target.closest('[data-kids-back]')){renderWorld(activeWorld);return}
   if(e.target.closest('[data-kids-replay]')){startGame(activeGame);return}
   if(e.target.closest('[data-kids-next]')){round++;if(round>=deck.length)finishGame();else showRound();return}
   const b=e.target.closest('[data-kids-answer]');if(!b||locked)return;
   locked=true;const item=deck[round],choice=Number(b.dataset.kidsAnswer),correct=choice===item.c;if(correct){score++;streak++}else{streak=0}
   gameArea.querySelectorAll('[data-kids-answer]').forEach((button,i)=>{button.disabled=true;if(i===item.c)button.classList.add('is-correct');else if(i===choice)button.classList.add('is-wrong')});
   const fb=gameArea.querySelector('.kids-feedback');fb.textContent=(correct?'أحسنت! إجابة رائعة. ':'محاولة جميلة! ')+item.why;
   const footer=document.createElement('button');footer.type='button';footer.className='kids-primary-action kids-next-action';footer.dataset.kidsNext='';footer.textContent=round===deck.length-1?'🏆 عرض النتيجة':'المهمة التالية ←';gameArea.querySelector('.kids-question-card').appendChild(footer);
  });
  renderWorld(0);
 }
 /* CHANNELS */
 const channels=$('channelsPage');
 if(channels){
  const nav=channels.querySelector('.section-number-nav');
  channels.innerHTML='';
  if(nav)channels.appendChild(nav);
  const title=document.createElement('h2');title.textContent='قنوات ومصادر المعرفة';
  const intro=document.createElement('p');intro.className='explore-intro';intro.textContent='اختر المجال لفتح نتائج قنوات ومقاطع متخصصة. الروابط تفتح البحث مباشرة في يوتيوب حتى تصل إلى المحتوى المتاح حديثاً.';
  const grid=document.createElement('div');grid.className='explore-card-grid';
  const channelList=[
   ['📰','الأخبار','متابعة المستجدات من مصادر متعددة','أخبار عربية وعالمية من مؤسسات إعلامية معروفة'],
   ['🔬','العلوم','تجارب وشرح مبسط للعلوم والفضاء','علوم مبسطة وتجارب علمية والفضاء'],
   ['💻','التكنولوجيا','تقنية وذكاء اصطناعي وأمن رقمي','تقنية وذكاء اصطناعي وأمن المعلومات'],
   ['🏛️','التاريخ','حضارات وأحداث وشخصيات تاريخية','تاريخ الحضارات ووثائقيات تاريخية'],
   ['⚽','الرياضة','رياضات متنوعة وتحليلات ومهارات','رياضة عربية وعالمية وتحليل المباريات'],
   ['🩺','الصحة','توعية صحية ومعلومات طبية عامة','توعية صحية من جهات طبية موثوقة'],
   ['📊','الاقتصاد والأعمال','ثقافة مالية وريادة أعمال','اقتصاد مبسط وثقافة مالية وريادة أعمال'],
   ['🗣️','التعليم واللغات','دروس وممارسة للغات ومهارات الدراسة','تعلم الإنجليزية والفرنسية ودروس تعليمية'],
   ['🌿','الطبيعة والحيوانات','الحياة البرية والبيئة والكوكب','وثائقيات الطبيعة والحيوانات والبيئة'],
   ['🍲','الطبخ','وصفات وتقنيات ومطابخ العالم','وصفات طبخ عربية وعالمية']
  ];
  channelList.forEach(item=>{
   const a=document.createElement('a');a.className='explore-card explore-channel-card';a.href='https://www.youtube.com/results?search_query='+encodeURIComponent(item[3]);a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','استكشف قنوات ومقاطع '+item[1]+' على يوتيوب');
   a.innerHTML='<span class="explore-card-icon" aria-hidden="true">'+item[0]+'</span><span class="explore-channel-copy"><h3>'+escapeHtml(item[1])+'</h3><p>'+escapeHtml(item[2])+'</p></span><span class="explore-channel-arrow" aria-hidden="true">‹</span>';
   grid.appendChild(a);
  });
  const note=document.createElement('p');note.className='explore-note';note.textContent='هذه روابط بحث وليست اعتماداً أو تزكية لكل نتيجة تظهر. تحقّق من هوية القناة ومصدر المعلومات، خصوصاً في الأخبار والصحة والمال.';
  channels.append(title,intro,grid,note);
 }
})();

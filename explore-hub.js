
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

 /* GAMES */
 const games=$('gamesPage');
 if(games){
  const nav=games.querySelector('.section-number-nav');
  games.innerHTML='';
  if(nav)games.appendChild(nav);
  const title=document.createElement('h2');title.textContent='مركز الألعاب الذهنية';
  const intro=document.createElement('p');intro.className='explore-intro';intro.textContent='ألعاب قصيرة ومتنوعة لا تحتاج إلى اتصال بالإنترنت. اختر لعبة وابدأ التحدي.';
  const modes=document.createElement('div');modes.className='explore-game-modes';modes.id='exploreGameModes';
  const modeList=[
   ['quiz','🧩','اختبر معلوماتك','أسئلة عامة متنوعة'],
   ['truefalse','⚖️','صح أم خطأ','اختبر سرعة حكمك'],
   ['speed','⚡','تحدي السرعة','أجب قبل انتهاء الوقت'],
   ['words','🔤','ترتيب الحروف','اكتشف الكلمة المخفية'],
   ['math','➗','الحساب السريع','تحديات حسابية قصيرة'],
   ['memory','🧠','تحدي الذاكرة','تذكّر تسلسل الأرقام']
  ];
  modes.innerHTML=modeList.map(m=>'<button type="button" class="explore-mode" data-game-mode="'+m[0]+'" aria-pressed="false"><span class="explore-mode-icon">'+m[1]+'</span><span><strong>'+m[2]+'</strong><small>'+m[3]+'</small></span></button>').join('');
  const legacyBoard=document.createElement('section');legacyBoard.className='game-card';legacyBoard.id='generalKnowledgeQuiz';
  legacyBoard.innerHTML='<div class="game-score"><span>النقاط</span><strong id="gameScore">0</strong><span id="gameProgress">السؤال 1 من 5</span></div><h3 id="gameQuestion">اختبار المعلومات العامة</h3><div id="gameAnswers" class="game-answers"></div><p id="gameFeedback" class="game-feedback" role="status" aria-live="polite">أجب عن الأسئلة لتحصل على نقاط.</p><button type="button" id="saveGameBtn" class="wide">♡ احفظ السؤال</button><button type="button" id="nextGameQuestion" class="wide primary" hidden>السؤال التالي</button>';
  const board=document.createElement('section');board.className='explore-game-board';board.id='exploreGameBoard';board.setAttribute('aria-live','polite');
  board.innerHTML='<div class="explore-game-top"><span id="exploreGameProgress">اختر لعبة للبدء</span><span>النقاط: <strong id="exploreGameScore">0</strong></span><span id="exploreGameTimer"></span></div><h3 class="explore-game-question" id="exploreGameQuestion">مستعد لاختبار معلوماتك؟</h3><div id="exploreGameStage"><p class="explore-game-feedback">ستجد هنا أسئلة وألعاباً ذهنية تعمل مباشرة على جهازك.</p></div><p class="explore-game-feedback" id="exploreGameFeedback" role="status"></p><button type="button" class="explore-game-action" id="exploreGameNext" hidden>السؤال التالي</button>';
  const note=document.createElement('p');note.className='explore-note';note.textContent='تُحفظ أفضل نتيجة محلياً على جهازك. لا توجد منافسة أو ترتيب عام ولا تُرسل إجاباتك إلى خادم.';
  board.hidden=true;games.append(title,intro,modes,legacyBoard,board,note);

  const questions=[
   {q:'ما عاصمة الجزائر؟',a:['وهران','الجزائر','قسنطينة','عنابة'],c:1,w:'مدينة الجزائر هي عاصمة البلاد.'},
   {q:'ما الكوكب المعروف بالكوكب الأحمر؟',a:['الزهرة','المشتري','المريخ','زحل'],c:2,w:'يبدو المريخ أحمر بسبب أكاسيد الحديد على سطحه.'},
   {q:'ما الصيغة الكيميائية للماء؟',a:['CO₂','H₂O','O₂','NaCl'],c:1,w:'يتكون جزيء الماء من ذرتي هيدروجين وذرة أكسجين.'},
   {q:'ما أكبر محيط على الأرض؟',a:['الأطلسي','الهندي','المتجمد الشمالي','الهادئ'],c:3,w:'المحيط الهادئ هو الأكبر مساحة.'},
   {q:'كم يساوي 9 × 7؟',a:['56','63','72','69'],c:1,w:'تسعة في سبعة تساوي ثلاثة وستين.'},
   {q:'في أي قارة تقع الأرجنتين؟',a:['أفريقيا','أوروبا','أمريكا الجنوبية','آسيا'],c:2,w:'تقع الأرجنتين في الجزء الجنوبي من أمريكا الجنوبية.'},
   {q:'ما الغاز الذي تمتصه النباتات في عملية البناء الضوئي؟',a:['الأكسجين','ثاني أكسيد الكربون','النيتروجين','الهيدروجين'],c:1,w:'تمتص النباتات ثاني أكسيد الكربون وتستخدم الضوء لصنع السكريات.'},
   {q:'ما اللغة الرسمية الأساسية في البرازيل؟',a:['الإسبانية','البرتغالية','الفرنسية','الإنجليزية'],c:1,w:'البرتغالية هي اللغة الرسمية في البرازيل.'},
   {q:'كم عدد أضلاع الشكل السداسي؟',a:['خمسة','ستة','سبعة','ثمانية'],c:1,w:'السداسي له ستة أضلاع.'},
   {q:'ما العضو الذي يضخ الدم في جسم الإنسان؟',a:['الرئة','الكبد','القلب','المعدة'],c:2,w:'القلب يضخ الدم عبر الأوعية الدموية.'},
   {q:'ما أقرب نجم إلى الأرض؟',a:['الشمس','الشعرى اليمانية','النسر الواقع','سهيل'],c:0,w:'الشمس هي أقرب نجم إلى الأرض.'},
   {q:'أي جهاز يُستخدم لقياس درجة الحرارة؟',a:['البارومتر','الترمومتر','الأميتر','البوصلة'],c:1,w:'الترمومتر هو أداة قياس درجة الحرارة.'}
  ];
  const truths=[
   ['الأرض تدور حول الشمس.','صحيح: الأرض تدور حول الشمس.'],
   ['الماء يغلي عند 100 درجة مئوية في كل الظروف.','خطأ: تتغير درجة الغليان بتغير الضغط الجوي.'],
   ['عدد قارات العالم سبع وفق التصنيف الشائع.','صحيح: التصنيف الشائع يقسم اليابسة إلى سبع قارات.'],
   ['الصوت ينتقل في الفراغ مثل الضوء.','خطأ: الصوت يحتاج إلى وسط مادي لينتقل.'],
   ['الخفاش من الثدييات.','صحيح: الخفافيش تلد وترضع صغارها.'],
   ['العدد الأولي الزوجي الوحيد هو 2.','صحيح: العدد 2 لا يقبل القسمة إلا على 1 ونفسه.'],
   ['كل أنواع البكتيريا ضارة للإنسان.','خطأ: توجد بكتيريا نافعة وأخرى ممرضة.'],
   ['القمر يصدر ضوءه من نفسه.','خطأ: يعكس ضوء الشمس الساقط عليه.']
  ];
  const words=[['ةسردم','مدرسة','مكان للتعلم والدراسة.'],['باتك','كتاب','نقرأ فيه المعلومات والقصص.'],['ةرايس','سيارة','وسيلة نقل برية.'],['رتويبمك','كمبيوتر','جهاز لمعالجة المعلومات.'],['ةقيدح','حديقة','مكان تكثر فيه النباتات.'],['رحب','بحر','مسطح مائي واسع.'],['ملق','قلم','أداة للكتابة.'],['ةحاسم','مساحة','مقدار السطح داخل شكل.']];
  let mode='',round=0,score=0,items=[],locked=false,timer=null,timeLeft=0,memorySequence='',completedGame=false;
  const stage=$('exploreGameStage'),feedback=$('exploreGameFeedback'),next=$('exploreGameNext');
  function clearTimer(){if(timer){clearInterval(timer);timer=null}}
  function shuffle(list){const copy=list.slice();for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
  function status(){ $('exploreGameProgress').textContent='الجولة '+Math.min(round+1,5)+' من 5';$('exploreGameScore').textContent=String(score); }
  function finish(){
   clearTimer();locked=true;completedGame=true;next.hidden=false;next.textContent='العب مرة أخرى';
   const bests=safeRead('bq_game_best_v1',{});const best=Math.max(Number(bests[mode]||0),score);bests[mode]=best;safeWrite('bq_game_best_v1',bests);
   $('exploreGameQuestion').textContent='انتهى التحدي!';
   stage.innerHTML='<p class="explore-game-feedback">نتيجتك: <strong>'+score+' من 5</strong> — أفضل نتيجة لك: <strong>'+best+' من 5</strong>.</p>';
   feedback.textContent=score===5?'ممتاز! نتيجة كاملة.':'أحسنت المحاولة؛ يمكنك إعادة اللعب وتحسين نتيجتك.';
   $('exploreGameProgress').textContent='اكتملت اللعبة';$('exploreGameTimer').textContent='';
  }
  function nextRound(){
   clearTimer();round++;
   if(round>=5){finish();return}
   renderRound();
  }
  function answerChoice(index){
   if(locked)return;locked=true;clearTimer();
   const item=items[round],correct=index===item.c;
   if(correct)score++;
   [...stage.querySelectorAll('button[data-answer]')].forEach((b,i)=>{b.disabled=true;if(i===item.c)b.classList.add('correct-answer');else if(i===index)b.classList.add('wrong-answer')});
   feedback.textContent=(correct?'إجابة صحيحة. ':'ليست الإجابة الصحيحة. ')+item.w;
   $('exploreGameScore').textContent=String(score);next.hidden=false;next.textContent=round===4?'عرض النتيجة':'التالي';
   $('exploreGameTimer').textContent='';
  }
  function submitText(){
   if(locked)return;
   const input=stage.querySelector('input');if(!input)return;
   const value=input.value.trim().replace(/\s+/g,'').toLocaleLowerCase();
   const item=items[round],correct=value===item.answer.replace(/\s+/g,'').toLocaleLowerCase();
   locked=true;if(correct)score++;
   input.disabled=true;stage.querySelector('button').disabled=true;
   feedback.textContent=(correct?'أحسنت، إجابة صحيحة. ':'الإجابة الصحيحة: '+item.answer+'. ')+(item.why||'');
   $('exploreGameScore').textContent=String(score);next.hidden=false;next.textContent=round===4?'عرض النتيجة':'التالي';
  }
  function renderRound(){
   locked=false;next.hidden=true;feedback.textContent='';status();
   const prompt=$('exploreGameQuestion');
   if(mode==='quiz'||mode==='speed'||mode==='truefalse'){
    const item=items[round];prompt.textContent=item.q;
    const options=mode==='truefalse'?['صح','خطأ']:item.a;
    stage.innerHTML='<div class="explore-game-answers">'+options.map((x,i)=>'<button type="button" data-answer="'+i+'">'+escapeHtml(x)+'</button>').join('')+'</div>';
    if(mode==='speed'){
     timeLeft=15;$('exploreGameTimer').textContent='الوقت: '+timeLeft+' ث';
     timer=setInterval(()=>{timeLeft--;$('exploreGameTimer').textContent='الوقت: '+timeLeft+' ث';if(timeLeft<=0){clearTimer();if(!locked){locked=true;[...stage.querySelectorAll('button')].forEach(b=>b.disabled=true);feedback.textContent='انتهى الوقت. '+item.w;next.hidden=false;next.textContent=round===4?'عرض النتيجة':'التالي';}}},1000);
    }else $('exploreGameTimer').textContent='';
   }else if(mode==='words'){
    const item=items[round];prompt.textContent='رتّب الحروف لتكتشف الكلمة.';
    stage.innerHTML='<p class="explore-game-feedback">الحروف: <strong>'+escapeHtml(item.scrambled)+'</strong><br>'+escapeHtml(item.hint)+'</p><div class="explore-game-input-row"><input id="exploreGameAnswer" type="text" autocomplete="off" placeholder="اكتب الكلمة"><button type="button" data-submit-text>تحقق</button></div>';
    $('exploreGameTimer').textContent='';
   }else if(mode==='math'){
    const item=items[round];prompt.textContent=item.q;
    stage.innerHTML='<div class="explore-game-input-row"><input id="exploreGameAnswer" type="number" inputmode="numeric" placeholder="اكتب الناتج"><button type="button" data-submit-text>تحقق</button></div>';
    $('exploreGameTimer').textContent='';
   }else if(mode==='memory'){
    const item=items[round];memorySequence=item.answer;prompt.textContent='تذكّر تسلسل الأرقام ثم اكتبه.';
    stage.innerHTML='<p class="explore-game-feedback" id="memoryDigits">احفظ هذا التسلسل: <strong>'+memorySequence+'</strong></p><div class="explore-game-input-row"><input id="exploreGameAnswer" type="text" inputmode="numeric" autocomplete="off" placeholder="أدخل الأرقام"><button type="button" data-submit-text>تحقق</button></div>';
    $('exploreGameTimer').textContent='';
    const shown=$('memoryDigits');setTimeout(()=>{if(mode==='memory'&&round===Number(shown?.dataset.round||round)&&shown?.isConnected)shown.innerHTML='تم إخفاء التسلسل. أدخله الآن.';},2300);
   }
  }
  function start(selected){
   clearTimer();mode=selected;round=0;score=0;locked=false;completedGame=false;feedback.textContent='';next.hidden=true;
   modes.querySelectorAll('[data-game-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gameMode===mode)));legacyBoard.hidden=true;board.hidden=false;
   if(mode==='quiz'||mode==='speed')items=shuffle(questions).slice(0,5);
   else if(mode==='truefalse')items=shuffle(truths).slice(0,5).map(x=>({q:x[0],a:['صح','خطأ'],c:x[1].startsWith('صحيح')?0:1,w:x[1]}));
   else if(mode==='words')items=shuffle(words).slice(0,5).map(x=>({scrambled:x[0],answer:x[1],hint:x[2],why:'راجع ترتيب الحروف وحاول مرة أخرى.'}));
   else if(mode==='math')items=Array.from({length:5},()=>{const a=2+Math.floor(Math.random()*18),b=2+Math.floor(Math.random()*12);return {q:'كم يساوي '+a+' × '+b+'؟',answer:String(a*b),why:a+' × '+b+' = '+(a*b)}})
   else if(mode==='memory')items=Array.from({length:5},()=>({answer:''}));
   if(mode==='memory')memorySequence=String(100+Math.floor(Math.random()*900));
   if(mode==='memory')items=items.map(()=>{memorySequence=String(1000+Math.floor(Math.random()*9000));return {answer:memorySequence}});
   renderRound();
  }
  modes.addEventListener('click',e=>{const button=e.target.closest('[data-game-mode]');if(!button)return;const selected=button.dataset.gameMode;modes.querySelectorAll('[data-game-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));if(selected==='quiz'){clearTimer();legacyBoard.hidden=false;board.hidden=true;legacyBoard.scrollIntoView({behavior:'smooth',block:'nearest'});return}legacyBoard.hidden=true;board.hidden=false;start(selected)});
  stage.addEventListener('click',e=>{
   const answer=e.target.closest('[data-answer]');if(answer){let index=Number(answer.dataset.answer);if(mode==='truefalse')answerChoice(index);else answerChoice(index);return}
   if(e.target.closest('[data-submit-text]'))submitText();
  });
  stage.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='exploreGameAnswer'){e.preventDefault();submitText()}});
  next.addEventListener('click',()=>{if(!mode||!locked)return;if(completedGame){start(mode);return}if(round===4){finish();return}nextRound()});
  games.addEventListener('click',e=>{const modeButton=e.target.closest('[data-game-mode]');if(modeButton)board.scrollIntoView({behavior:'smooth',block:'nearest'})});
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

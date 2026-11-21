/* Private AI client: fixed first-party endpoint, no user-facing engine settings. */
(function(){
 'use strict';
 const $=id=>document.getElementById(id);
 const ENDPOINT='https://bein-qalbein.etudiantourg.workers.dev';
 const status=$('aiStatus'),output=$('aiOutput'),actions=$('aiResultActions'),generateButton=$('aiGenerateBtn'),moreButton=$('aiMoreBtn');
 if(!generateButton||generateButton.dataset.ready)return;
 generateButton.dataset.ready='1';
 let latest='',busy=false;
 const text={
 ar:{idle:'يمكنك إنشاء رسالة جديدة كلما احتجت.',generating:'جارٍ إعداد رسالتك…',generate:'✦ أنشئ رسائل بالذكاء الاصطناعي',done:'جهزت رسالتك. يمكنك تعديلها أو استخدامها أو نسخها.',used:'تم نقل الرسالة إلى بطاقة رسالة من القلب.',copied:'تم نسخ الرسالة.',copyFailed:'تعذر النسخ. حاول مرة أخرى.',unavailable:'تعذر إنشاء الرسالة الآن. يمكنك استخدام «اصنع رسالتي» أو المحاولة لاحقاً.',timeout:'استغرق إعداد الرسالة وقتاً أطول من المعتاد. حاول مرة أخرى.',rateLimited:'وصلت إلى الحد المؤقت للطلبات. انتظر قليلاً ثم حاول.',safetyRejected:'لم تجتز الرسالة فحص الاحترام. جرّب وصفاً آخر.',contextTooLong:'اختصر التفاصيل ثم حاول مجدداً.',title:'استوديو الرسائل الذكي',desc:'رسائل جديدة تناسب الموقف والشعور، بصياغة محترمة ومحتوى يراعي الآداب الإسلامية.',mood:'ماذا تريد أن تعبّر؟',recipient:'لمن الرسالة؟',length:'طول الرسالة',language:'لغة الرسالة',context:'تفصيل اختياري يساعد على تخصيص الرسالة',privacy:'يُرسل وصف الموقف إلى خدمة الذكاء الاصطناعي لإعداد الرسالة. تجنب الأسماء الكاملة والمعلومات الحساسة.',safety:'راجع الرسالة قبل إرسالها؛ الأداة مساعدة لغوية وليست فتوى شرعية.',placeholder:'مثلاً: أريد أن أشكره على صبره واهتمامه…',use:'استخدم الرسالة',copy:'نسخ',more:'رسائل أخرى'},
 en:{idle:'Create a fresh message whenever you need one.',generating:'Creating your message…',generate:'✦ Generate with AI',done:'Your message is ready. You can edit, use, or copy it.',used:'The message was added to the heart message card.',copied:'Message copied.',copyFailed:'Copy failed. Please try again.',unavailable:'The message could not be created right now. Try the message builder or come back later.',timeout:'Message generation took longer than expected. Please try again.',rateLimited:'The temporary request limit was reached. Wait a little and try again.',safetyRejected:'The message did not pass the respect check. Try another description.',contextTooLong:'Shorten the details and try again.',title:'AI Message Studio',desc:'Fresh messages tailored to the moment, with respectful and modest wording.',mood:'What would you like to express?',recipient:'Who is the message for?',length:'Message length',language:'Message language',context:'Optional detail to personalize the message',privacy:'Your situation description is sent to the AI service to prepare the message. Avoid full names and sensitive information.',safety:'Review the message before sending. This tool is not a religious ruling.',placeholder:'For example: I want to thank them for their patience and care…',use:'Use message',copy:'Copy',more:'Another message'},
 fr:{idle:'Créez un nouveau message quand vous en avez besoin.',generating:'Création de votre message…',generate:'✦ Générer avec l’IA',done:'Votre message est prêt. Vous pouvez le modifier, l’utiliser ou le copier.',used:'Le message a été placé dans la carte « Message du cœur ».',copied:'Message copié.',copyFailed:'Échec de la copie. Réessayez.',unavailable:'Impossible de créer le message pour le moment. Utilisez le créateur ou réessayez plus tard.',timeout:'La création a pris plus de temps que prévu. Réessayez.',rateLimited:'La limite temporaire est atteinte. Attendez un peu puis réessayez.',safetyRejected:'Le message n’a pas passé le contrôle de respect. Essayez une autre description.',contextTooLong:'Raccourcissez les détails puis réessayez.',title:'Studio de messages IA',desc:'Des messages adaptés à chaque situation, dans le respect et la pudeur.',mood:'Que souhaitez-vous exprimer ?',recipient:'À qui s’adresse le message ?',length:'Longueur du message',language:'Langue du message',context:'Détail facultatif pour personnaliser le message',privacy:'La description de votre situation est envoyée au service IA. Évitez les noms complets et les données sensibles.',safety:'Relisez le message avant de l’envoyer. Cet outil ne constitue pas un avis religieux.',placeholder:'Exemple : je souhaite le remercier pour sa patience et son attention…',use:'Utiliser le message',copy:'Copier',more:'Un autre message'}
 };
 const pack=()=>text[lang]||text.ar;
 const say=k=>{if(status)status.textContent=pack()[k]||pack().unavailable};
 const map={'مودة وامتنان':'thanks','اشتياق محترم':'miss','اعتذار صادق':'sorry','تشجيع ودعم':'support','مواساة':'sad','تهدئة بعد خلاف':'upset','دعاء طيب':'dua','تقدير واحترام':'thanks','رسالة صباحية أو مسائية':'morning'};
 async function generate(){
  if(busy)return;
  busy=true;generateButton.disabled=true;if(moreButton)moreButton.disabled=true;
  generateButton.textContent=pack().generating;say('generating');output.hidden=true;output.value='';actions.hidden=true;
  const controller=typeof AbortController!=='undefined'?new AbortController():null;
  const timer=controller?setTimeout(()=>controller.abort(),45000):null;
  try{
   const response=await fetch(ENDPOINT+'/generate',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({mood:$('aiMood')?.value||'مودة وامتنان',recipient:$('aiRecipient')?.value||'محايدة',length:$('aiLength')?.value||'متوسطة',language:$('aiLanguage')?.value||'العربية',context:String($('aiContext')?.value||'').slice(0,240)}),signal:controller?.signal});
   const data=await response.json().catch(()=>({}));
   if(!response.ok){const key=response.status===429?'rateLimited':response.status===422?'safetyRejected':response.status===413?'contextTooLong':'unavailable';say(key);return;}
   latest=String(data.message||'').trim().slice(0,1800);
   if(!latest){say('unavailable');return;}
   output.value=latest;output.hidden=false;actions.hidden=false;say('done');
  }catch(error){say(error?.name==='AbortError'?'timeout':'unavailable')}
  finally{if(timer)clearTimeout(timer);busy=false;generateButton.disabled=false;if(moreButton)moreButton.disabled=false;generateButton.textContent=pack().generate}
 }
 $('aiLanguage')?.addEventListener('change',e=>{try{bqStorage.setItem('bq_ai_language',e.target.value);bqStorage.setItem('bq_ai_language_manual','1')}catch(_){}});
 document.querySelectorAll('.role').forEach(button=>button.addEventListener('click',()=>{if($('aiRecipient'))$('aiRecipient').value=role==='wife'?'للزوج':'للزوجة'}));
 if($('aiRecipient'))$('aiRecipient').value=role==='wife'?'للزوج':'للزوجة';
 generateButton.addEventListener('click',generate);moreButton?.addEventListener('click',generate);
 $('aiUseBtn')?.addEventListener('click',()=>{const value=String(output.hidden?latest:output.value).trim();if(!value)return;window.displayMessageInMain(value,map[$('aiMood')?.value]||'thanks');say('used')});
 $('aiCopyBtn')?.addEventListener('click',async()=>{const value=String(output.hidden?latest:output.value).trim();if(value){const ok=await copyText(value);say(ok?'copied':'copyFailed')}});
 window.applyAiStudioLanguage=function(){
  const t=pack(),set=(id,value)=>{const el=$(id);if(el)el.textContent=value};
  set('aiMessageTitle',t.title);set('aiMessageDesc',t.desc);set('aiUseBtn',t.use);set('aiCopyBtn',t.copy);set('aiMoreBtn',t.more);
  [['aiMood','mood'],['aiRecipient','recipient'],['aiLength','length'],['aiLanguage','language'],['aiContext','context']].forEach(([id,key])=>{const el=$(id),label=el?.closest('label')?.querySelector('span');if(label)label.textContent=t[key]});
  const labels={ar:{aiMood:['مودة وامتنان','اشتياق','اعتذار','تشجيع','مواساة','تهدئة بعد خلاف','دعاء','تقدير واحترام','صباحية أو مسائية'],aiRecipient:['للزوج','للزوجة','صياغة محايدة'],aiLength:['قصيرة','متوسطة','مطولة'],aiLanguage:['العربية','الإنجليزية','الفرنسية']},en:{aiMood:['Affection & gratitude','Longing','Apology','Encouragement','Comfort','Calm after disagreement','Prayer','Appreciation','Morning or evening'],aiRecipient:['For husband','For wife','Neutral wording'],aiLength:['Short','Medium','Long'],aiLanguage:['Arabic','English','French']},fr:{aiMood:['Affection et gratitude','Manque','Excuses','Encouragement','Réconfort','Apaisement après un désaccord','Invocation','Reconnaissance','Matin ou soir'],aiRecipient:['Pour le mari','Pour l’épouse','Formulation neutre'],aiLength:['Court','Moyen','Long'],aiLanguage:['Arabe','Anglais','Français']}};
  Object.entries(labels[lang]||labels.ar).forEach(([id,items])=>{const el=$(id);if(el)Array.from(el.options).forEach((option,index)=>{if(items[index])option.textContent=items[index]})});
  try{const el=$('aiLanguage'),manual=bqStorage.getItem('bq_ai_language_manual')==='1',saved=bqStorage.getItem('bq_ai_language');if(el){if(manual&&['العربية','الإنجليزية','الفرنسية'].includes(saved))el.value=saved;else if(!manual)el.value=({ar:'العربية',en:'الإنجليزية',fr:'الفرنسية'})[lang]||'العربية'}}catch(_){}
  if($('aiContext'))$('aiContext').placeholder=t.placeholder;
  set('aiPrivacyNote',t.privacy);set('aiSafetyNote',t.safety);
  if(output)output.placeholder=lang==='en'?'You can edit the message before using it…':lang==='fr'?'Vous pouvez modifier le message avant de l’utiliser…':'يمكنك تعديل الرسالة قبل استخدامها…';
  if(!busy)generateButton.textContent=t.generate;
  if(status&&!busy)status.textContent=output&&!output.hidden&&latest?t.done:t.idle;
 };
 if(window.applyAiStudioLanguage)window.applyAiStudioLanguage();
})();

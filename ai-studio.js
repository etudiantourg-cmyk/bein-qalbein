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

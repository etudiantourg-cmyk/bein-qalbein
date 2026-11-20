# محرك الذكاء الاصطناعي لتطبيق بين قلبين

## الخيار المعتمد

اخترنا **Cloudflare Workers AI + Google Gemma 4 26B A4B** لأنه يعمل من خلال ربط AI داخل Worker، ولا يحتاج إلى وضع مفتاح Gemini أو أي مفتاح سري داخل تطبيق الهاتف. النموذج متاح ضمن كتالوج Cloudflare Workers AI.

- معرّف النموذج: `@cf/google/gemma-4-26b-a4b-it`
- ملف الخادم: `src/index.js`
- إعداد النشر: `wrangler.jsonc`
- مسار التوليد: `POST /generate`

## ما تم تجهيزه في المستودع

- نقطة API لتوليد رسالة جديدة حسب النوع والمخاطب والطول واللغة.
- العربية والإنجليزية والفرنسية.
- تعليمات واضحة للحياء والاحترام والآداب الإسلامية العامة.
- منع طلبات المحتوى الفاحش أو المهين، وتجنب الاقتباسات الدينية غير الموثقة والفتاوى.
- التحقق من القيم المدخلة، وحد لطول السياق، ورفض الطلبات الكبيرة.
- السماح بطلبات المتصفح من نطاق GitHub Pages الخاص بالتطبيق فقط.
- حد مؤقت بسيط للطلبات من عنوان IP. هذا الحد محلي لكل نسخة Worker ولا يُعد نظام حماية عالمياً.
- لا يحتوي التطبيق أو هذا الملف على مفاتيح API سرية.

## النشر الأول — ربط GitHub مرة واحدة

جهزت المستودع بحيث يستطيع Cloudflare نشر المحرك مباشرة من GitHub، دون نسخ الأكواد يدوياً ودون وضع مفتاح API.

1. افتح [Cloudflare Dashboard](https://dash.cloudflare.com/) وسجّل الدخول أو أنشئ حساباً.
2. افتح **Workers & Pages** ثم **Create application** واختر **GitHub** لربط مستودع.
3. وافق على ربط GitHub، ثم اختر المستودع `etudiantourg-cmyk/bein-qalbein`.
4. في إعدادات المشروع اضبط **Root directory** على `ai-worker`، واسم Worker على `bein-qalbein-ai`.
5. اترك **Build command** فارغاً، واجعل **Deploy command** هو `npx wrangler deploy`، ثم اختر **Save and Deploy**.
6. ملف `wrangler.jsonc` داخل المجلد يعرّف Worker باسم `bein-qalbein-ai` ويربط Workers AI باسم `AI`. بعد نجاح النشر انسخ عنوان `workers.dev` الذي يعرضه Cloudflare.
7. افتح تطبيق [بين قلبين](https://etudiantourg-cmyk.github.io/bein-qalbein/)، ثم استوديو الرسائل الذكي > إعداد الاتصال، والصق عنوان Worker واحفظه.
8. جرّب توليد رسالة قصيرة. لا يعتبر المحرك متصلاً إلا بعد ظهور رسالة فعلية.

بعد الربط الأول، كل تحديث جديد على مجلد `ai-worker` في الفرع الرئيسي يمكن أن يُنشر تلقائياً بواسطة Cloudflare Workers Builds.

## حدود التكلفة

تمنح Cloudflare Workers AI حصة مجانية مقدارها **10,000 Neurons يومياً** على الخطة المجانية. الـ Neurons وحدة استهلاك حوسبة وليست عدداً ثابتاً من الرسائل؛ يختلف الاستهلاك بحسب النموذج وطول الطلب والجواب. عند استنفاد الحصة على الخطة المجانية تتوقف الطلبات حتى إعادة الضبط، ولا نفعّل ترقية مدفوعة أو دفعاً تلقائياً. راجع لوحة Cloudflare للتأكد من الحصة والتكلفة الفعلية لحسابك.

## ضوابط مهمة

هذه تعليمات توليد لتوجيه النموذج وليست ضماناً شرعياً أو فلترة مثالية. ينبغي مراجعة الرسالة قبل إرسالها، ولا يُستخدم المحرك لإصدار الفتاوى أو نسبة أحاديث وآيات دون تحقق.

## روابط رسمية

- [Workers AI model card](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/)
- [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/)
- [Workers AI getting started](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/)

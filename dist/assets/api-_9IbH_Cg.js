var e={url:{high:{riskScore:87,classification:`High Risk`,input:`http://paypa1-secure.login-verify.com/account`,type:`url`,timestamp:new Date().toISOString(),reasons:[{text:`Domain mimics legitimate service (paypal → paypa1)`,severity:`critical`,keyword:`paypa1`},{text:`Uses HTTP instead of HTTPS — no encryption`,severity:`critical`,keyword:`http`},{text:`Contains suspicious subdomain patterns`,severity:`high`,keyword:`login-verify`},{text:`URL path suggests credential harvesting`,severity:`high`,keyword:`/account`},{text:`Domain registered less than 30 days ago`,severity:`medium`,keyword:null}],urlBreakdown:{protocol:`HTTP (Insecure)`,domain:`paypa1-secure.login-verify.com`,path:`/account`,ssl:!1,domainAge:`12 days`,registrar:`Unknown Registrar`,suspiciousPatterns:[`Homograph attack: "1" replacing "l" in "paypal"`,`Multiple hyphens in domain name`,`Subdomain impersonation pattern`]}},medium:{riskScore:52,classification:`Medium Risk`,input:`https://docs-google.share-document.net/view`,type:`url`,timestamp:new Date().toISOString(),reasons:[{text:`Domain resembles Google Docs but is not official`,severity:`high`,keyword:`docs-google`},{text:`Uses HTTPS but certificate is not from Google`,severity:`medium`,keyword:`share-document.net`},{text:`URL structure mimics document sharing pattern`,severity:`medium`,keyword:`/view`}],urlBreakdown:{protocol:`HTTPS`,domain:`docs-google.share-document.net`,path:`/view`,ssl:!0,domainAge:`45 days`,registrar:`NameCheap Inc.`,suspiciousPatterns:[`Brand name in subdomain (not official)`,`Generic TLD used (.net instead of .com)`]}},low:{riskScore:12,classification:`Low Risk`,input:`https://www.google.com/search?q=weather`,type:`url`,timestamp:new Date().toISOString(),reasons:[{text:`Domain is a well-known, verified website`,severity:`safe`,keyword:`google.com`},{text:`Uses HTTPS with valid certificate`,severity:`safe`,keyword:`https`},{text:`No suspicious URL patterns detected`,severity:`safe`,keyword:null}],urlBreakdown:{protocol:`HTTPS (Secure)`,domain:`www.google.com`,path:`/search`,ssl:!0,domainAge:`9000+ days`,registrar:`MarkMonitor Inc.`,suspiciousPatterns:[]}}},email:{high:{riskScore:91,classification:`High Risk`,input:`From: security@amaz0n-alerts.com
Subject: URGENT: Your account has been compromised!

Dear Customer,

We detected unusual activity on your account. Your account will be SUSPENDED within 24 hours unless you verify your identity immediately.

Click here to verify: http://amaz0n-verify.com/secure

Amazon Security Team`,type:`email`,timestamp:new Date().toISOString(),reasons:[{text:`Sender domain spoofs Amazon (amaz0n with zero)`,severity:`critical`,keyword:`amaz0n-alerts.com`},{text:`Uses extreme urgency tactics ("SUSPENDED within 24 hours")`,severity:`critical`,keyword:`SUSPENDED within 24 hours`},{text:`Contains suspicious verification link`,severity:`high`,keyword:`amaz0n-verify.com`},{text:`Generic greeting instead of personalized name`,severity:`medium`,keyword:`Dear Customer`},{text:`Pressure tactics to force immediate action`,severity:`high`,keyword:`immediately`}],highlightedContent:[{text:`From: security@`,type:`normal`},{text:`amaz0n-alerts.com`,type:`danger`,tooltip:`Spoofed domain: uses "0" instead of "o" in Amazon`},{text:`
Subject: `,type:`normal`},{text:`URGENT`,type:`danger`,tooltip:`Urgency tactic: designed to bypass rational thinking`},{text:`: Your account has been compromised!

`,type:`normal`},{text:`Dear Customer`,type:`warning`,tooltip:`Generic greeting — legitimate services use your real name`},{text:`,

We detected unusual activity on your account. Your account will be `,type:`normal`},{text:`SUSPENDED within 24 hours`,type:`danger`,tooltip:`Time pressure: creates fear to make you act without thinking`},{text:` unless you verify your identity `,type:`normal`},{text:`immediately`,type:`danger`,tooltip:`Pressure word: forces urgency to prevent careful evaluation`},{text:`.

Click here to verify: `,type:`normal`},{text:`http://amaz0n-verify.com/secure`,type:`danger`,tooltip:`Malicious link: fake domain designed to steal credentials`},{text:`

Amazon Security Team`,type:`normal`}]},low:{riskScore:8,classification:`Low Risk`,input:`From: noreply@github.com
Subject: [GitHub] Your verification code

Hi komesh,

Your GitHub verification code is: 847291

This code expires in 10 minutes.

GitHub Support`,type:`email`,timestamp:new Date().toISOString(),reasons:[{text:`Sender domain matches official GitHub domain`,severity:`safe`,keyword:`github.com`},{text:`Personalized greeting with username`,severity:`safe`,keyword:`komesh`},{text:`No suspicious links detected`,severity:`safe`,keyword:null}],highlightedContent:[{text:`From: noreply@github.com
Subject: [GitHub] Your verification code

Hi komesh,

Your GitHub verification code is: 847291

This code expires in 10 minutes.

GitHub Support`,type:`safe`}]}},text:{high:{riskScore:78,classification:`High Risk`,input:`ALERT: Your bank account has been locked due to suspicious activity. Verify now at http://chase-secure-login.tk or your funds will be frozen. Reply STOP to cancel.`,type:`text`,timestamp:new Date().toISOString(),reasons:[{text:`Uses fear-inducing language ("account locked", "funds frozen")`,severity:`critical`,keyword:`locked`},{text:`Contains suspicious .tk domain (free, commonly abused)`,severity:`critical`,keyword:`chase-secure-login.tk`},{text:`Impersonates financial institution`,severity:`high`,keyword:`bank account`},{text:`Creates artificial urgency to act immediately`,severity:`high`,keyword:`Verify now`}],highlightedContent:[{text:`ALERT`,type:`danger`,tooltip:`Alert prefix: attention-grabbing tactic`},{text:`: Your `,type:`normal`},{text:`bank account has been locked`,type:`danger`,tooltip:`Fear tactic: claims unauthorized action on your account`},{text:` due to suspicious activity. `,type:`normal`},{text:`Verify now`,type:`danger`,tooltip:`Urgency: pressures immediate action without verification`},{text:` at `,type:`normal`},{text:`http://chase-secure-login.tk`,type:`danger`,tooltip:`.tk domain is free and commonly used for phishing`},{text:` or your `,type:`normal`},{text:`funds will be frozen`,type:`danger`,tooltip:`Threat: uses financial consequences to create panic`},{text:`. Reply STOP to cancel.`,type:`normal`}]},low:{riskScore:5,classification:`Low Risk`,input:`Your package has been delivered to your front door. Track at ups.com/track?id=1Z999AA10123456784`,type:`text`,timestamp:new Date().toISOString(),reasons:[{text:`Links to official UPS domain`,severity:`safe`,keyword:`ups.com`},{text:`Standard delivery notification format`,severity:`safe`,keyword:null},{text:`No urgency or threatening language`,severity:`safe`,keyword:null}],highlightedContent:[{text:`Your package has been delivered to your front door. Track at ups.com/track?id=1Z999AA10123456784`,type:`safe`}]}}},t=[{id:1,input:`http://paypa1-secure.login-verify.com/account`,type:`url`,riskScore:87,classification:`High Risk`,timestamp:`2026-03-17T10:23:00Z`},{id:2,input:`From: security@amaz0n-alerts.com — URGENT: Account compromised`,type:`email`,riskScore:91,classification:`High Risk`,timestamp:`2026-03-17T09:15:00Z`},{id:3,input:`https://www.google.com/search?q=weather`,type:`url`,riskScore:12,classification:`Low Risk`,timestamp:`2026-03-16T18:42:00Z`},{id:4,input:`Your bank account has been locked — verify at chase-secure-login.tk`,type:`text`,riskScore:78,classification:`High Risk`,timestamp:`2026-03-16T14:30:00Z`},{id:5,input:`https://docs-google.share-document.net/view`,type:`url`,riskScore:52,classification:`Medium Risk`,timestamp:`2026-03-16T11:20:00Z`},{id:6,input:`From: noreply@github.com — Your verification code`,type:`email`,riskScore:8,classification:`Low Risk`,timestamp:`2026-03-15T22:10:00Z`},{id:7,input:`Your package has been delivered — Track at ups.com`,type:`text`,riskScore:5,classification:`Low Risk`,timestamp:`2026-03-15T16:55:00Z`}],n={totalScans:1247,threatsDetected:389,safeContent:858,accuracy:97.3},r=[{id:1,type:`email`,content:{from:`support@micros0ft-security.com`,subject:`Action Required: Unusual Sign-in Activity`,body:`Dear User,

We noticed a sign-in attempt from an unrecognized device:

Location: Moscow, Russia
Device: Unknown
Time: 2:34 AM

If this wasn't you, secure your account immediately by clicking the link below:

https://micros0ft-security.com/verify-account

You have 12 hours before your account is permanently locked.

Microsoft Security Team`},isPhishing:!0,explanation:`This is a phishing email. The sender domain "micros0ft-security.com" uses a zero instead of the letter "o" to mimic Microsoft. The email creates urgency with a 12-hour deadline and uses fear of account lockout to pressure you into clicking a malicious link.`,traps:[{text:`micros0ft-security.com`,type:`Spoofed Domain`,description:`Uses "0" (zero) instead of "o" to mimic Microsoft`},{text:`permanently locked`,type:`Fear Tactic`,description:`Creates extreme urgency to bypass your critical thinking`},{text:`12 hours`,type:`Time Pressure`,description:`Artificial deadline to force immediate action`},{text:`Dear User`,type:`Generic Greeting`,description:`Real Microsoft emails address you by name`}]},{id:2,type:`email`,content:{from:`noreply@accounts.google.com`,subject:`Security alert: New sign-in on Windows`,body:`Hi Komesh,

Your Google Account was just signed in to from a new Windows device.

Komesh Bathula
komesh@gmail.com

New sign-in
Windows device
March 17, 2026, 3:45 PM IST

If you recognize this activity, you don't need to do anything. If you don't recognize this activity, we'll help you secure your account.

Check activity
https://myaccount.google.com/notifications

You can also see security activity at
https://myaccount.google.com/notifications

You received this email to let you know about important changes to your Google Account and services.

Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA`},isPhishing:!1,explanation:`This is a legitimate Google security alert. The sender domain is "accounts.google.com" (official Google domain). The email uses your real name, provides specific details, and doesn't pressure you to click immediately. Links go to the official Google domain (myaccount.google.com).`,traps:[]},{id:3,type:`sms`,content:{from:`+1-555-0199`,body:`Netflix: Your payment method has failed. Update your billing information within 24hrs to avoid service interruption: http://netflix-billing.support-update.com/pay`},isPhishing:!0,explanation:`This is a smishing (SMS phishing) attack. The URL "netflix-billing.support-update.com" is not an official Netflix domain. Netflix would direct you to netflix.com. The 24-hour deadline creates false urgency.`,traps:[{text:`netflix-billing.support-update.com`,type:`Fake Domain`,description:`Not an official Netflix URL — legitimate Netflix uses netflix.com`},{text:`within 24hrs`,type:`Time Pressure`,description:`Creates urgency to prevent you from verifying the legitimacy`},{text:`payment method has failed`,type:`Fear of Loss`,description:`Threatens loss of service to motivate action`}]},{id:4,type:`email`,content:{from:`no-reply@linkedin.com`,subject:`Komesh, you appeared in 14 searches this week`,body:`Hi Komesh,

You appeared in 14 searches this week

See all appearances and who's looking at your profile.

See all search appearances
https://www.linkedin.com/me/search-appearances/

— The LinkedIn Team

This email was intended for Komesh Bathula.
Learn why we included this.

LinkedIn Corporation, 1000 W Maude Ave, Sunnyvale, CA 94085`},isPhishing:!1,explanation:`This is a legitimate LinkedIn notification. The sender is from linkedin.com (official domain), the email is personalized with your name, and the link points to the official LinkedIn website (www.linkedin.com). No urgency or threatening language is used.`,traps:[]},{id:5,type:`sms`,content:{from:`+1-800-275-2273`,body:`Apple: Your iCloud storage is 95% full. Manage your storage at https://www.icloud.com/storage/`},isPhishing:!1,explanation:`This is a legitimate Apple notification. The link goes to the official iCloud domain (www.icloud.com). The message is informational and doesn't pressure you to act immediately or threaten consequences.`,traps:[]},{id:6,type:`email`,content:{from:`hr-department@company-benefits-portal.com`,subject:`IMPORTANT: Annual salary increase review — action needed`,body:`Dear Employee,

Congratulations! Based on your annual performance review, you are eligible for a salary increase of up to 15%.

To confirm your updated compensation package, please verify your employee details and banking information by clicking the link below:

https://company-benefits-portal.com/salary-review

This offer expires in 48 hours.

Best regards,
HR Department`},isPhishing:!0,explanation:`This is a phishing email using a salary increase as bait. The domain "company-benefits-portal.com" is not a real company domain. Legitimate HR communications come from your actual company's email domain. The request for banking information and 48-hour deadline are red flags.`,traps:[{text:`company-benefits-portal.com`,type:`Fake Domain`,description:`Generic domain — not your actual company's domain`},{text:`banking information`,type:`Data Harvesting`,description:`Requests sensitive financial data via email link`},{text:`expires in 48 hours`,type:`Artificial Deadline`,description:`Creates urgency to prevent you from checking with real HR`},{text:`Dear Employee`,type:`Generic Greeting`,description:`Real HR emails use your actual name`}]}],i=[`google.com`,`github.com`,`microsoft.com`,`apple.com`,`amazon.com`,`facebook.com`,`twitter.com`,`linkedin.com`,`netflix.com`,`ups.com`,`fedex.com`,`paypal.com`,`chase.com`,`bankofamerica.com`,`hdfcbank.com`,`icicibank.com`,`axisbank.com`,`onlinesbi.sbi`],a=[`login`,`verify`,`confirm`,`account`,`bank`,`secure`,`update`,`billing`,`payment`,`signin`,`support`,`service`,`limited`],o=[`.tk`,`.ml`,`.ga`,`.cf`,`.gq`,`.buzz`,`.top`,`.xyz`,`.site`,`.info`];function s(e){try{let t=new URL(e.startsWith(`http`)?e:`http://${e}`).hostname,n=t.split(`.`);return n.length>=2?n.slice(-2).join(`.`):t}catch{return e}}function c(e,t){let n={0:`o`,1:`l`,v:`u`,vv:`w`,rn:`m`},r=e.toLowerCase();for(let[e,t]of Object.entries(n))r=r.replace(new RegExp(e,`g`),t);return r.includes(t)&&!e.toLowerCase().includes(t)}function l(e,t){let n=e.toLowerCase(),r={riskScore:0,classification:`Low Risk`,input:e,type:t,timestamp:new Date().toISOString(),reasons:[]};if(t===`url`){let e=s(n);if(i.includes(e))return r.riskScore=5,r.reasons.push({text:`Verified legitimate domain: ${e}`,severity:`safe`}),r;n.startsWith(`http://`)&&(r.riskScore+=25,r.reasons.push({text:`Uses insecure HTTP protocol (no encryption)`,severity:`high`,keyword:`http`}));for(let e of o)if(n.endsWith(e)||n.includes(`${e}/`)){r.riskScore+=30,r.reasons.push({text:`Uses suspicious TLD (${e}) commonly associated with phishing`,severity:`high`,keyword:e});break}for(let e of[`paypal`,`google`,`amazon`,`microsoft`,`apple`,`netflix`,`chase`,`bankofamerica`])if(c(n,e)){r.riskScore+=45,r.reasons.push({text:`Detected potential homograph attack mimicking ${e}`,severity:`critical`,keyword:e});break}let t=a.filter(e=>n.includes(e));t.length>0&&(r.riskScore+=15*Math.min(t.length,3),r.reasons.push({text:`Sensitive keywords detected: ${t.join(`, `)}`,severity:`medium`,keyword:t[0]})),n.split(`.`).length>4&&(r.riskScore+=20,r.reasons.push({text:`High number of subdomains detected (common in obfuscation)`,severity:`medium`})),/\d+\.\d+\.\d+\.\d+/.test(n)&&(r.riskScore+=40,r.reasons.push({text:`Direct IP address access (highly suspicious)`,severity:`critical`}))}else{let e=a.filter(e=>n.includes(e)),t=[`urgent`,`immediately`,`suspended`,`locked`,`action required`,`24 hours`].filter(e=>n.includes(e));e.length>0&&(r.riskScore+=20*Math.min(e.length,3),r.reasons.push({text:`Sensitive topics found: ${e.join(`, `)}`,severity:`medium`})),t.length>0&&(r.riskScore+=30,r.reasons.push({text:`Urgency tactics detected: ${t.join(`, `)}`,severity:`high`})),n.includes(`http://`)&&(r.riskScore+=20,r.reasons.push({text:`Contains insecure links`,severity:`medium`}))}return r.riskScore=Math.min(r.riskScore,100),r.riskScore>70?r.classification=`High Risk`:r.riskScore>30?r.classification=`Medium Risk`:r.classification=`Low Risk`,r.reasons.length===0&&(r.riskScore=15,r.reasons.push({text:`No immediate threats detected by local heuristics`,severity:`safe`})),r}function u(e,t){return new Promise(n=>{let r=1e3+Math.random()*1e3;setTimeout(()=>{n(l(e,t))},r)})}function d(e){return e<=30?{primary:`#22c55e`,bg:`rgba(34, 197, 94, 0.1)`,label:`Low Risk`}:e<=70?{primary:`#fbbf24`,bg:`rgba(251, 191, 36, 0.1)`,label:`Medium Risk`}:{primary:`#ef4444`,bg:`rgba(239, 68, 68, 0.1)`,label:`High Risk`}}function f(e){switch(e){case`critical`:return`#ef4444`;case`high`:return`#f97316`;case`medium`:return`#fbbf24`;case`low`:return`#3b82f6`;case`safe`:return`#22c55e`;default:return`#64748b`}}function p(e){let t=new Date(e),n=new Date-t,r=Math.floor(n/6e4),i=Math.floor(n/36e5),a=Math.floor(n/864e5);return r<1?`Just now`:r<60?`${r}m ago`:i<24?`${i}h ago`:a<7?`${a}d ago`:t.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`})}var m={async saveScanResult(e){if(typeof chrome<`u`&&chrome.storage&&chrome.storage.local)return new Promise(t=>{chrome.storage.local.get([`scanHistory`,`securityStats`],n=>{let r=n.scanHistory||[],i=n.securityStats||{totalScans:0,threatsDetected:0,safeContent:0,accuracy:98.2},a={...e,id:Date.now()},o=[a,...r].slice(0,100);i.totalScans+=1,e.classification===`High Risk`?i.threatsDetected+=1:e.classification===`Low Risk`&&(i.safeContent+=1),chrome.storage.local.set({scanHistory:o,securityStats:i},()=>t(a))})});{let t=JSON.parse(localStorage.getItem(`scanHistory`)||`[]`),n=JSON.parse(localStorage.getItem(`securityStats`)||JSON.stringify({totalScans:0,threatsDetected:0,safeContent:0,accuracy:98.2})),r={...e,id:Date.now()},i=[r,...t].slice(0,100);return n.totalScans+=1,e.classification===`High Risk`?n.threatsDetected+=1:e.classification===`Low Risk`&&(n.safeContent+=1),localStorage.setItem(`scanHistory`,JSON.stringify(i)),localStorage.setItem(`securityStats`,JSON.stringify(n)),r}},async getHistory(){return typeof chrome<`u`&&chrome.storage&&chrome.storage.local?new Promise(e=>{chrome.storage.local.get([`scanHistory`],t=>{e(t.scanHistory||[])})}):JSON.parse(localStorage.getItem(`scanHistory`)||`[]`)},async getStats(){return typeof chrome<`u`&&chrome.storage&&chrome.storage.local?new Promise(e=>{chrome.storage.local.get([`securityStats`],t=>{e(t.securityStats||{totalScans:0,threatsDetected:0,safeContent:0,accuracy:98.2})})}):JSON.parse(localStorage.getItem(`securityStats`)||JSON.stringify({totalScans:0,threatsDetected:0,safeContent:0,accuracy:98.2}))},async clearHistory(){if(typeof chrome<`u`&&chrome.storage&&chrome.storage.local)return new Promise(e=>{chrome.storage.local.set({scanHistory:[],bypassedUrls:[]},()=>{e()})});localStorage.setItem(`scanHistory`,`[]`),localStorage.setItem(`bypassedUrls`,`[]`)}},h=`https://api.groq.com/openai/v1/chat/completions`,g=`
You are PhishGuard AI, a specialized security expert chatbot. 
Your goal is to help users understand phishing, cybersecurity, and online safety.

STRICT RULES:
1. ONLY answer questions related to cybersecurity, phishing, data privacy, social engineering, and online safety.
2. If a user asks a question about unrelated topics (e.g., cooking, sports, general coding not related to security, history, etc.), politely decline and steer them back to security topics.
3. Provide concise, expert, and actionable advice.
4. If you aren't sure about a specific technical detail, advise the user to consult official documentation or a professional security audit.
5. Use a professional yet helpful tone.
`;async function _(){return typeof chrome<`u`&&chrome.storage?new Promise(e=>{chrome.storage.local.get([`groqApiKey`],t=>{e(t.groqApiKey||`YOUR_API_KEY_HERE`)})}):localStorage.getItem(`groqApiKey`)||`YOUR_API_KEY_HERE`}var v={async chat(e){let t=await _();if(!t)throw Error(`Groq API Key is missing. Please add it in the PhishGuard Settings page.`);try{let n=await fetch(h,{method:`POST`,headers:{Authorization:`Bearer ${t}`,"Content-Type":`application/json`},body:JSON.stringify({model:`llama-3.3-70b-versatile`,messages:[{role:`system`,content:g},...e],temperature:.7,max_tokens:1024})});if(!n.ok){let e=await n.json();throw Error(e.error?.message||`Groq API Error: ${n.status}`)}return(await n.json()).choices[0].message}catch(e){throw console.error(`Groq Chat Error:`,e),e}},async analyzeContent(e,t){let n=await _();if(!n)throw Error(`Groq API Key is missing. Please add it in the PhishGuard Settings page.`);let r=t===`url`?`URL`:t===`email`?`email message`:`text content`,i=`
      You are analyzing a ${r} for phishing or security risks.
      The user-provided ${r} to analyze will be sent in a separate message,
      delimited between <CONTENT_START> and <CONTENT_END> tags. Only analyze the
      content inside those tags.

      Consider:
      1. Deceptive domain names (look-alikes).
      2. Suspicious TLDs.
      3. Obfuscation techniques.
      4. Redirect Chain Context: If this URL was reached via multiple redirects, it is a high-risk indicator of obfuscation.

      STRICT EVALUATION RULES:
      1. If the input is a well-known legitimate URL (e.g., github.com, google.com, microsoft.com), do NOT flag it as high risk unless there is a very obvious, specific sub-path that looks like an attack.
      2. Be highly skeptical of minor issues on high-reputation domains.
      3. For URLs, check for domain spoofing (e.g., g1thub.com vs github.com).
      4. For emails/texts, look for urgent tone, suspicious requests for sensitive info, and mismatched links.

      RESPONSE FORMAT: You MUST return ONLY a valid JSON object with the following structure:
      {
        "riskScore": number (0-100),
        "classification": "Low Risk" | "Medium Risk" | "High Risk",
        "type": "${t}",
        "reasons": [
          { "text": "description", "severity": "low" | "medium" | "high" | "critical", "keyword": "optional" }
        ]
      }
    `;try{let t=await(await fetch(h,{method:`POST`,headers:{Authorization:`Bearer ${n}`,"Content-Type":`application/json`},body:JSON.stringify({model:`llama-3.3-70b-versatile`,messages:[{role:`system`,content:i},{role:`user`,content:`Here is the ${r} to analyze, delimited by <CONTENT_START> and <CONTENT_END> tags:\n<CONTENT_START>\n${e}\n<CONTENT_END>`}],temperature:.1,response_format:{type:`json_object`}})})).json();return{...JSON.parse(t.choices[0].message.content),input:e,timestamp:new Date().toISOString()}}catch(e){throw console.error(`Groq Analysis Error:`,e),e}}},y=`https://phishguard-backend.vercel.app/api`;async function b(e,t,n,r){try{let n=await fetch(`${y}${e}`,{...t,headers:{"Content-Type":`application/json`,...t?.headers}});if(!n.ok)throw Error(`API Error: ${n.status}`);let r=await n.json();return e.startsWith(`/analyze`)&&await m.saveScanResult(r),r}catch(i){if(i.message?.includes(`404`)||console.warn(`API call to ${e} failed, falling back to mock data.`,i),n)try{let t=await n();return e.startsWith(`/analyze`)&&await m.saveScanResult(t),t}catch(n){console.error(`AI Fallback failed, using local heuristics:`,n);let r=await u(t.body?JSON.parse(t.body).url||JSON.parse(t.body).content:``,e.split(`/`).pop());return await m.saveScanResult(r),r}return r}}var x={async analyzeURL(e){let t=(e=>{try{let t=new URL(e.startsWith(`http`)?e:`http://${e}`).hostname,n=t.split(`.`);return n.length>=2?n.slice(-2).join(`.`):t}catch{return e}})(e.toLowerCase());if(i.includes(t)){let n={riskScore:5,classification:`Low Risk`,type:`url`,input:e,timestamp:new Date().toISOString(),reasons:[{text:`Verified legitimate domain: ${t}`,severity:`safe`}]};return await m.saveScanResult(n),n}return b(`/analyze/url`,{method:`POST`,body:JSON.stringify({url:e})},()=>v.analyzeContent(e,`url`))},async analyzeEmail(e){return b(`/analyze/email`,{method:`POST`,body:JSON.stringify({content:e})},()=>v.analyzeContent(e,`email`))},async analyzeText(e){return b(`/analyze/text`,{method:`POST`,body:JSON.stringify({content:e})},()=>v.analyzeContent(e,`text`))},async getHistory(){let e=await m.getHistory();return e&&e.length>0?e:t},async getStats(){let e=await m.getStats();return e&&e.totalScans>0?e:n},async getSimulationScenarios(){return r},async clearHistory(){await m.clearHistory()}};export{e as a,f as i,p as n,d as r,x as t};
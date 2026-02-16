const O={focusedElement:null,focusHistory:[],mouse:{x:0,y:0},maxHistory:5};function Pt(t){const o=t.getBoundingClientRect();return{tag:t.tagName.toLowerCase(),role:t.getAttribute("role")||"",text:Ot(t),rect:{x:o.x,y:o.y,w:o.width,h:o.height},className:Gt(t).toLowerCase(),id:(t.id||"").toLowerCase()}}function gt(t){t&&(O.focusedElement=t,O.focusHistory.push({element:t,timestamp:Date.now(),features:Pt(t)}),O.focusHistory.length>O.maxHistory&&O.focusHistory.shift())}function Gt(t){return t.className?typeof t.className=="string"?t.className:t.className.toString():""}function Ot(t){return t.getAttribute("aria-label")||t.getAttribute("data-tooltip")||t.title||t.textContent?.trim().slice(0,100)||t.tagName.toLowerCase()}function pt(t=null){if(!t)return Vt();switch(t.id){case"compose-window":return Ut(t);case"header":return Wt(t);case"top-navigation":return Kt(t);case"mail-navigation":return _t(t);case"main":return Yt(t);case"left-panel":return jt(t);case"right-panel":return Xt(t);default:return Jt(t)}}function Ut(t){const o=[],n=new Set,e=t.element,a=(i,s="")=>{if(!i||n.has(i)||!q(i)||D(i))return;const p=i.getBoundingClientRect();p.width<6||p.height<6||(n.add(i),o.push({element:i,features:z(i,s)}))};return console.log("✍️ Extracting compose window candidates"),b(e,'.J-JN-M-I.Un[role="button"]').forEach(i=>{a(i,"compose:type-of-response")}),b(e,".Hl, .Hq, .Ha").forEach(i=>{a(i,"compose:header-button")}),b(e,".aoD.hl[tabindex]").forEach(i=>{a(i,"compose:recipient-placeholder")}),b(e,'input[aria-label*="To"], input[aria-label*="Cc"], input[aria-label*="Bcc"], input.agP').forEach(i=>{a(i,"compose:recipient-field")}),b(e,".aB.gQ").forEach(i=>{a(i,"compose:cc-bcc-toggle")}),b(e,'input.aoT, input[placeholder="Subject"]').forEach(i=>{a(i,"compose:subject-field")}),b(e,'.Am[contenteditable="true"], textarea.Ak').forEach(i=>{a(i,"compose:message-body")}),b(e,'.T-I.aoO, .T-I.hG, .T-I[aria-label*="Send"]').forEach(i=>{a(i,"compose:send-button")}),b(e,'.J-Z-I[role="button"]').forEach(i=>{n.has(i)||a(i,"compose:formatting-button")}),b(e,'.J-Z-M-I[role="button"], .J-Z-M-I[role="listbox"]').forEach(i=>{n.has(i)||a(i,"compose:formatting-dropdown")}),b(e,".wG.J-Z-I").forEach(i=>{n.has(i)||a(i,"compose:toolbar-button")}),b(e,'.J-JN-M-I[role="button"]').forEach(i=>{n.has(i)||a(i,"compose:more-options")}),b(e,'.oh[role="button"]').forEach(i=>{n.has(i)||a(i,"compose:discard-draft")}),b(e,'button, div[role="button"][tabindex]').forEach(i=>{n.has(i)||a(i,"compose:generic-button")}),console.log(`✍️ Compose Window: ${o.length} candidates`),o}function Wt(t){const o=[],n=new Set,e=t.element,a=(s,p="")=>{if(!s||n.has(s)||!q(s)||D(s))return;const y=s.getBoundingClientRect();y.width<6||y.height<6||(n.add(s),o.push({element:s,features:z(s,p)}))};return[{selector:'[aria-label="Main menu"][role="button"]',reason:"header:main-menu"},{selector:'[aria-label="Search mail"]',reason:"header:search"},{selector:'form[aria-label="Search mail"]',reason:"header:search-form"},{selector:'[aria-label^="Status:"][role="button"]',reason:"header:status"},{selector:'[aria-label="Settings"][role="button"]',reason:"header:settings"},{selector:'[aria-label="Google apps"][role="button"]',reason:"header:google-apps"},{selector:'[aria-label="Support"][role="button"]',reason:"header:support"}].forEach(({selector:s,reason:p})=>{b(e,s).forEach(w=>a(w,p))}),b(e,'input[type="text"][aria-label*="Search"]').forEach(s=>{a(s,"header:search-input")}),b(e,'[aria-label*="Google Account"], [aria-label*="account" i]').forEach(s=>{(s.getAttribute("role")==="button"||s.tagName.toLowerCase()==="a")&&a(s,"header:account")}),console.log(`📍 Header: ${o.length} candidates`),o}function Kt(t){const o=[],n=new Set,e=(c,m="")=>{if(!c||n.has(c)||!q(c)||D(c))return;const A=c.getBoundingClientRect();A.width<6||A.height<6||(n.add(c),o.push({element:c,features:z(c,m)}))},a=t.element;if(a.dataset&&a.dataset.combinedRegion==="true"){console.log("🧭 Extracting from combined top-navigation region");const c=a._toolbarElement,m=a._biWElement,A=a._categoryTabsElement;return c&&(c.classList.contains("aeH")?b(c,'[role="button"], button, .T-I').forEach(E=>{e(E,"top-nav:toolbar")}):b(c,'[role="button"], button, .T-I').forEach(E=>{e(E,"top-nav:toolbar")})),m&&b(m,'[role="button"], button').forEach(S=>{e(S,"top-nav:biw")}),A&&(b(A,'[role="tab"]').forEach(S=>{e(S,"top-nav:category-tab")}),b(A,'[role="button"]').forEach(S=>{e(S,"top-nav:tab-settings")})),console.log(`📍 Top Navigation (combined): ${o.length} candidates`),o}const i=document.querySelector("div.aeH");let s=null;if(i){for(const c of i.children)if(window.getComputedStyle(c).display!=="none"){s=c;break}}const p=i?Array.from(i.children).length>0&&Array.from(i.children).every(c=>window.getComputedStyle(c).display==="none"):!0;let y=null;s&&(y=s.querySelector("div.nH.aqK"));let w=null;if(s&&(w=s.querySelector('div.G6[role="toolbar"][aria-label*="search refinement" i], [role="toolbar"][aria-label*="search refinement" i]')),!w&&p){const c=document.querySelector('[data-srm="email"]');if(c&&(w=c.querySelector('div.G6[role="toolbar"][aria-label*="search refinement" i], [role="toolbar"][aria-label*="search refinement" i]')),!w){const m=document.querySelector('[role="main"]');m&&(w=m.querySelector('div.G6[role="toolbar"][aria-label*="search refinement" i], [role="toolbar"][aria-label*="search refinement" i]'))}}let l=null;if(s&&(l=s.querySelector("div.Th")),!l&&p){const c=document.querySelector('[data-srm="email"]');if(c&&(l=c.querySelector("div.Th")),!l){const m=document.querySelector('[role="main"]');m&&(l=m.querySelector("div.Th"))}}console.log("🧭 Resolved containers:",{aeH:!!i,activeChild:!!s,allAeHChildrenHidden:p,nHaqK:!!y,g6Toolbar:!!w,thContainer:!!l}),y&&(b(y,'div.T-I[role="button"][aria-label], div.T-I[role="button"][title]').forEach(c=>{if(c.getAttribute("aria-disabled")==="true")return;let m=c.parentElement;for(;m&&m!==y;){if(window.getComputedStyle(m).display==="none")return;m=m.parentElement}e(c,"top-nav:toolbar-button")}),b(y,'div.amD[role="button"]').forEach(c=>{c.getAttribute("aria-disabled")!=="true"&&e(c,"top-nav:pagination")}),b(y,'div.amH[role="button"]').forEach(c=>{e(c,"top-nav:page-info")}),b(y,'[role="button"][tabindex]').forEach(c=>{n.has(c)||e(c,"top-nav:other-button")})),w&&(b(w,'[role="button"].HW').forEach(c=>{e(c,"top-nav:filter-chip")}),b(w,'[role="button"].N5').forEach(c=>{e(c,"top-nav:advanced-search")}),b(w,'[role="button"][tabindex]').forEach(c=>{n.has(c)||e(c,"top-nav:toolbar-other")})),l&&b(l,'[role="button"].qN').forEach(c=>{e(c,"top-nav:result-tab")});let d=null;if(s&&(d=s.querySelector("div.aKk")),!d&&i&&(d=i.querySelector("div.aKk")),d&&(b(d,'[role="tab"]').forEach(c=>{e(c,"top-nav:category-tab")}),b(d,'[role="button"]').forEach(c=>{n.has(c)||e(c,"top-nav:tab-settings")})),o.length===0&&(i||t.element)){console.log("⚠️ No specific containers found, using fallback extraction");const c=s||i||t.element;b(c,'[role="button"], button, .T-I').forEach(m=>{const A=m.getAttribute("aria-label")||"",S=(m.textContent||"").trim();A.includes("Inbox")||A.includes("Starred")||A.includes("Compose")||S==="Compose"||n.has(m)||e(m,"top-nav:fallback-button")}),b(c,'[role="toolbar"]').forEach(m=>{b(m,'[role="button"], button').forEach(A=>{n.has(A)||e(A,"top-nav:fallback-toolbar")})}),console.log(`📍 Fallback found ${o.length} candidates`)}return console.log("📍 Top Navigation extraction debug:",{"aeH found":!!i,"activeChild found":!!s,allAeHChildrenHidden:p,"nHaqK found":!!y,"g6Toolbar found":!!w,"thContainer found":!!l,usedFallback:o.length>0&&!y&&!w&&!l,candidates:o.length}),console.log(`📍 Top Navigation: ${o.length} candidates`),o}function _t(t){const o=[],n=new Set,e=t.element,a=(s,p="")=>{if(!s||n.has(s)||!q(s)||D(s))return;const y=s.getBoundingClientRect();y.width<6||y.height<6||(n.add(s),o.push({element:s,features:z(s,p)}))};b(e,'[role="button"]').forEach(s=>{const p=(s.textContent||"").trim(),y=(s.getAttribute("aria-label")||"").trim();(p==="Compose"||y==="Compose")&&a(s,"nav:compose")});const i=["Inbox","Starred","Snoozed","Sent","Drafts","Spam","Trash","Categories","More","Less","Important","Chats","Scheduled","All Mail"];return b(e,'a, [role="link"], [role="button"], div[tabindex]').forEach(s=>{const p=(s.getAttribute("aria-label")||"").trim(),y=(s.textContent||"").trim(),w=(s.getAttribute("data-tooltip")||"").trim(),l=i.find(d=>p===d||y===d||w===d);l&&a(s,`nav:${l.toLowerCase()}`)}),b(e,'[role="button"][aria-expanded]').forEach(s=>{const p=(s.textContent||"").trim();(p==="More"||p==="Less")&&a(s,"nav:toggle")}),b(e,'[data-tooltip*="label" i], [aria-label*="label" i]').forEach(s=>{a(s,"nav:label")}),document.querySelectorAll('a[href*="category/"]').forEach(s=>{n.has(s)||a(s,"nav:category")}),console.log(`📍 Mail Navigation: ${o.length} candidates`),o}function Yt(t){const o=[],n=new Set,e=t.element,a=(w,l="")=>{if(!w||n.has(w)||!q(w)||D(w))return;const d=w.getBoundingClientRect();d.width<6||d.height<6||(n.add(w),o.push({element:w,features:z(w,l)}))},i=e.querySelector(".nH.aHU"),s=e.querySelector(".ams.bkH, .ams.bkI, .ams.bkG"),p=e.querySelectorAll('tr.zA, tr[role="row"]'),y=(i||s)&&p.length<=3;if(console.log("🔍 View detection:",{hasEmailContent:!!i,hasReplyButtons:!!s,emailRowsCount:p.length,isSingleEmailView:y}),y)console.log("📧 Detected single email view"),b(e,"button.DILLkc, button.Wsq5Cf, button.pYTkkf-JX-I").forEach(l=>{!n.has(l)&&l.getAttribute("aria-label")&&a(l,"main:email-header-button")}),b(e,'.ajy[role="button"]').forEach(l=>{n.has(l)||a(l,"main:show-details-button")}),b(e,".ams.bkH, .ams.bkI, .ams.bkG").forEach(l=>{a(l,"main:reply-forward-button")}),e.querySelectorAll('[role="toolbar"], .G-atb, .iH, .bHJ').forEach(l=>{b(l,'[role="button"], button, .T-I').forEach(d=>{n.has(d)||a(d,"main:email-action-button")})}),b(e,"a[href]").forEach(l=>{const d=l.getBoundingClientRect();d.width>20&&d.height>10&&!n.has(l)&&a(l,"main:email-link")}),b(e,'[role="button"][aria-label*="Download"], [role="button"][aria-label*="attachment" i], .aQy').forEach(l=>{n.has(l)||a(l,"main:attachment")}),b(e,'[aria-haspopup="menu"], [aria-haspopup="listbox"]').forEach(l=>{n.has(l)||a(l,"main:dropdown")}),b(e,'[aria-label*="Starred"], .zd').forEach(l=>{n.has(l)||a(l,"main:star-button")}),b(e,'.hN[role="button"], .hO[role="button"]').forEach(l=>{n.has(l)||a(l,"main:label-button")});else{console.log("📬 Detected email list view");const w=e.querySelectorAll('tr.zA, tr[role="row"]');console.log(`🔍 Debug: Found ${w.length} total rows (tr.zA or tr[role="row"])`);let l=0;b(e,'tr.zA, tr[role="row"]').forEach(d=>{l++;const c=!!d.querySelector('[role="checkbox"]'),m=!!d.querySelector('[role="link"]'),A=d.getAttribute("aria-label")||"",S=A.includes("Conversation");if(l<=3&&console.log(`🔍 Row ${l}:`,{hasCheckbox:c,hasLink:m,ariaLabel:A.substring(0,50),hasConversation:S,passes:c||m||S}),d.querySelector('[role="checkbox"]')||d.querySelector('[role="link"]')||(d.getAttribute("aria-label")||"").includes("Conversation")){if(!d||n.has(d)||!q(d)||D(d))return;const E=d.getBoundingClientRect();if(E.width<6||E.height<6)return;n.add(d),o.push({element:d,highlightElement:d,features:z(d,"main:email-row")})}}),console.log(`🔍 Debug: ${l} rows checked, ${o.length} passed filters`)}return console.log(`📍 Main: ${o.length} candidates (${y?"email view":"list view"})`),o}function jt(t){const o=[],n=new Set,e=t.element,a=(i,s="")=>{if(!i||n.has(i)||!q(i)||D(i))return;const p=i.getBoundingClientRect();p.width<6||p.height<6||(n.add(i),o.push({element:i,features:z(i,s)}))};return b(e,'a[aria-label], [role="link"][aria-label], [role="button"][aria-label]').forEach(i=>{a(i,"left-panel:labeled")}),b(e,"[data-tooltip]").forEach(i=>{a(i,"left-panel:tooltip")}),console.log(`📍 Left Panel: ${o.length} candidates`),o}function Xt(t){const o=[],n=new Set,e=t.element,a=(i,s="")=>{if(!i||n.has(i)||!q(i)||D(i))return;const p=i.getBoundingClientRect();p.width<6||p.height<6||(n.add(i),o.push({element:i,features:z(i,s)}))};return b(e,'[role="tab"], [role="button"][aria-label]').forEach(i=>{a(i,"right-panel:tab")}),b(e,'button, a[href], [role="button"], [role="link"]').forEach(i=>{(i.getAttribute("aria-label")||i.getAttribute("data-tooltip"))&&a(i,"right-panel:action")}),console.log(`📍 Right Panel: ${o.length} candidates`),o}function Jt(t){const o=[],n=new Set,e=t.element,a=(s,p="")=>{if(!s||n.has(s)||!q(s)||D(s))return;const y=s.getBoundingClientRect();y.width<6||y.height<6||(n.add(s),o.push({element:s,features:z(s,p)}))};return b(e,["button","a[href]","input","select","textarea",'[role="button"]','[role="link"]','[role="menuitem"]','[role="tab"]','[role="checkbox"]'].join(",")).forEach(s=>{bt(s)&&a(s,"generic")}),console.log(`📍 Generic (${t.id}): ${o.length} candidates`),o}function Vt(){const t=[],o=new Set,n=(a,i="")=>{if(!a||o.has(a)||!q(a)||D(a))return;const s=a.getBoundingClientRect();s.width<6||s.height<6||(o.add(a),t.push({element:a,features:z(a,i)}))};return Zt(["button","a[href]","input","select","textarea",'[role="button"]','[role="link"]','[role="checkbox"]','[role="tab"]',"tr.zA"].join(",")).forEach(a=>{bt(a)&&n(a,"global")}),console.log(`🌍 Global extraction: ${t.length} candidates`),t}function Zt(t){try{return Array.from(document.querySelectorAll(t))}catch{return[]}}function b(t,o){try{return Array.from(t.querySelectorAll(o))}catch{return[]}}function q(t){const o=t.getBoundingClientRect();if(o.width<=0||o.height<=0||!(o.bottom>=-80&&o.right>=-80&&o.top<=window.innerHeight+80&&o.left<=window.innerWidth+80))return!1;const e=window.getComputedStyle(t);return!(e.display==="none"||e.visibility==="hidden"||e.opacity==="0")}function D(t){const o=["smarttab-popup","smarttab-lasso","smarttab-chord","task-notification","tabtabgo-region-overlay","tabtabgo-region-popup"];if(o.includes(t.id))return!0;for(const n of o)if(t.closest(`#${n}`))return!0;return!1}function bt(t){const o=t.tagName?t.tagName.toLowerCase():"",n=(t.getAttribute("role")||"").toLowerCase(),e=(t.getAttribute("aria-label")||"").trim(),a=(t.getAttribute("data-tooltip")||"").trim(),i=(t.getAttribute("title")||"").trim(),s=((t.textContent||"").trim()||"").slice(0,80);return o==="tr"&&t.classList&&t.classList.contains("zA")||["button","a","input","select","textarea","form"].includes(o)?!0:n==="presentation"||n==="none"?!1:e||a||i?!0:!!(n&&s.length>=2)}function z(t,o=""){const n=t.getBoundingClientRect(),e=window.getComputedStyle(t),a=t.tagName?t.tagName.toLowerCase():"",i=t.getAttribute("role")||"",s=t.type||"",p=t.getAttribute("aria-label")||"",y=t.getAttribute("data-tooltip")||"",w=t.getAttribute("title")||"";let l=(t.textContent||"").trim()||t.value||t.placeholder||t.alt||w||p||y||"";if(o==="top-nav:filter-chip"||o==="top-nav:advanced-search"){const d=t.querySelector("span.H5, span.Og");d&&(l=d.textContent.trim())}if(a==="tr"&&t.classList&&t.classList.contains("zA")){const d=t.querySelector(".bog")&&t.querySelector(".bog").textContent||t.querySelector('[role="link"]')&&t.querySelector('[role="link"]').textContent||"",c=t.querySelector(".y2")&&t.querySelector(".y2").textContent||t.querySelector(".xS")&&t.querySelector(".xS").textContent||"",m=[d.trim(),c.trim()].filter(Boolean).join(" — ");m&&(l=m)}return l=(l||"").trim().substring(0,220),{reason:o,text:l,ariaLabel:p,tooltip:y,title:w,id:t.id||"",className:typeof t.className=="string"?t.className:(t.className||"").toString(),tagName:a,role:i,type:s,tabindex:t.getAttribute("tabindex"),x:n.left,y:n.top,width:n.width,height:n.height,centerX:n.left+n.width/2,centerY:n.top+n.height/2,cursor:e.cursor,zIndex:parseInt(e.zIndex)||0,opacity:parseFloat(e.opacity)||1,isButton:a==="button"||i==="button"||s==="button"||s==="submit",isLink:a==="a"||i==="link",isInput:a==="input"||a==="textarea"||a==="select"||i==="textbox",isRow:a==="tr"||i==="row",isFocusable:t.tabIndex>=0}}async function mt(t,o,n=!1,e=null,a=0){e===null&&(e=o.findIndex(i=>i.element===t.element)),o.map(i=>({text:i.text||i.features?.text||"",selector:i.selector||i.features?.id||i.features?.className||"",isFake:i.isFake||!1})),console.log("📊 Interaction logged:",{selectedIndex:e,cursorTraveledDistancePx:a});try{const i=await chrome.storage.local.get(["sessionActive","currentSession"]);i.sessionActive&&await chrome.runtime.sendMessage({action:"logInteraction",data:{timestamp:Date.now(),selectedIndex:e,manualClick:!n,TabTabGoClick:n,elementText:t.text||t.features?.text||"",cursorTraveledDistancePx:a,url:window.location.href,mode:i.currentSession.mode}})}catch(i){console.error("Failed to log interaction to session:",i)}}const Qt=[{id:"compose-window",name:"Message window",description:"A new compose message window",icon:"✍️",priority:1,customExtractor:()=>{const t=document.querySelectorAll('[role="dialog"]');for(const n of t){const e=window.getComputedStyle(n);if(e.display==="none"||e.visibility==="hidden")continue;const a=n.querySelector("h2.a3E");if(a){const i=a.textContent||"";if(i.includes("Compose")||i.includes("New Message")||i.includes("Reply")||i.includes("Forward"))return console.log("✍️ Found floating compose dialog:",i.trim()),n}}const o=document.querySelectorAll('.aoI[role="region"][data-compose-id]');for(const n of o){const e=window.getComputedStyle(n);if(e.display==="none"||e.visibility==="hidden")continue;const a=n.getAttribute("aria-label")||"";return console.log("✍️ Found inline compose:",a),n}return null}},{id:"mail-navigation",name:"Mail Navigation",description:"Compose, Inbox, Starred, Sent, Drafts",selector:'[role="navigation"]',icon:"📧",priority:2},{id:"main",name:"Email List",description:"Your emails",icon:"📬",priority:3,customExtractor:()=>{const t=document.querySelectorAll('[role="main"]');for(const o of t){const n=window.getComputedStyle(o);if(n.display==="none"||n.visibility==="hidden")continue;const e=o.querySelector(".Cp");if(!e)return o;const a=window.getComputedStyle(e);if(a.display==="none"||a.visibility==="hidden")continue;const i=e.getBoundingClientRect();if(!(i.width<20||i.height<20))return console.log("📬 Found main mail content (.Cp inside role=main)"),e}return null}},{id:"top-navigation",name:"Top Navigation",description:"Refresh, select, back and forth",icon:"🧭",priority:4,customExtractor:()=>{const t=document.querySelector("div.aeH"),o=document.querySelector('[role="main"]'),n=o?o.querySelector("table.aKk"):null;if(t){const s=window.getComputedStyle(t);if(s.display!=="none"&&s.visibility!=="hidden"){const p=Array.from(t.children);if(!(p.length>0&&p.every(w=>window.getComputedStyle(w).display==="none"))){if(console.log("🧭 Using standard aeH toolbar"),n){const l=[t,n].map(E=>E.getBoundingClientRect()),d=Math.min(...l.map(E=>E.left)),c=Math.min(...l.map(E=>E.top)),m=Math.max(...l.map(E=>E.right)),A=Math.max(...l.map(E=>E.bottom)),S=document.createElement("div");return S.className="tabtabgo-virtual-topnav",S.dataset.combinedRegion="true",S._toolbarElement=t,S._categoryTabsElement=n,S._virtualBounds={left:d,top:c,right:m,bottom:A,width:m-d,height:A-c},S.getBoundingClientRect=function(){return this._virtualBounds},console.log("🧭 Using combined region: aeH + aKk"),S}return t}console.log("🧭 aeH children all hidden, using adaptive mode")}}const e=o?o.querySelector(".nH.aqK"):null,a=document.querySelector(".biW");if(!e&&!a&&!n)return console.log("🧭 No top-navigation elements found"),null;const i=[e,a,n].filter(s=>s!==null);if(i.length>0){const s=i.map(m=>m.getBoundingClientRect()),p=Math.min(...s.map(m=>m.left)),y=Math.min(...s.map(m=>m.top)),w=Math.max(...s.map(m=>m.right)),l=Math.max(...s.map(m=>m.bottom)),d=document.createElement("div");d.className="tabtabgo-virtual-topnav",d.dataset.combinedRegion="true",d._toolbarElement=e,d._biWElement=a,d._categoryTabsElement=n,d._virtualBounds={left:p,top:y,right:w,bottom:l,width:w-p,height:l-y},d.getBoundingClientRect=function(){return this._virtualBounds};const c=[];return e&&c.push("nH.aqK"),a&&c.push("biW"),n&&c.push("aKk"),console.log(`🧭 Using combined region: ${c.join(" + ")}`),d}}},{id:"header",name:"Header",description:"Search, settings, and account",selector:'[role="banner"]',icon:"🔍",priority:5},{id:"right-panel",name:"Right Panel",description:"Calendar, Keep, Tasks, Contacts",selector:'[role="complementary"][aria-label*="Side panel"], [role="complementary"]',icon:"📅",priority:7}];function te(){const t=[];for(const n of Qt){let e=null;if(n.customExtractor?e=n.customExtractor():e=document.querySelector(n.selector),e&&ee(e,n.id)){const a=oe(e);t.push({id:n.id,name:n.name,description:n.description,icon:n.icon,element:e,priority:n.priority,interactiveCount:a,bounds:e.getBoundingClientRect()})}}return t.sort((n,e)=>n.priority-e.priority),t.find(n=>n.id==="top-navigation")||(t.push({id:"top-navigation",name:"Top Navigation",description:"Toolbar and search refinement",icon:"🧭",element:document.querySelector('[role="main"]')||document.body,priority:3,interactiveCount:0,bounds:(document.querySelector('[role="main"]')||document.body).getBoundingClientRect()}),t.sort((n,e)=>n.priority-e.priority),console.log("🧭 top-navigation: aeH missing, added placeholder for extractor")),console.log(`🗺️ Found ${t.length} regions:`,t.map(n=>`${n.icon} ${n.name} (${n.interactiveCount})`)),t}function ee(t,o){if(t.dataset&&t.dataset.combinedRegion==="true")return console.log("🧭 Virtual combined region - skipping visibility check"),!0;const n=t.getBoundingClientRect(),e=window.getComputedStyle(t),a={hasSize:n.width>0&&n.height>0,width:n.width,height:n.height,display:e.display,visibility:e.visibility,opacity:e.opacity,displayOk:e.display!=="none",visibilityOk:e.visibility!=="hidden",opacityOk:e.opacity!=="0"};return t.querySelector&&t.querySelector("h2.a3E")&&console.log("🔍 Compose window visibility check:",a),!a.hasSize||!a.displayOk||!a.opacityOk?!1:o==="compose-window"?(console.log("✅ Compose window is visible (special handling)"),!0):a.visibilityOk}function oe(t){const n=t.querySelectorAll('button,a[href],input,select,textarea,[role="button"],[role="link"],[role="menuitem"],[role="tab"],[onclick]');let e=0;for(const a of n)ne(a)&&e++;return e}function ne(t){const o=t.getBoundingClientRect();if(o.width===0||o.height===0)return!1;const n=window.getComputedStyle(t);return n.display!=="none"&&n.visibility!=="hidden"&&parseFloat(n.opacity)>0}function ie(t,o){if(!t||!t.element)return[];const n=o(t);return console.log(`🎯 Found ${n.length} candidates in "${t.name}" region`),n}function ae(t,o){if(X(),t.length===0)return null;const n=document.createElement("div");return n.id="tabtabgo-region-overlay",n.style.cssText=`
        position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999998;pointer-events: none;
    `,t.forEach((e,a)=>{const i=a===o,s=e.bounds,p=document.createElement("div");p.className="region-highlight",p.style.cssText=`
            position: absolute;left: ${s.left}px;top: ${s.top}px;width: ${s.width}px;height: ${s.height}px;
            border: ${i?"4px":"2px"} solid ${i?"#10b981":"transparent"};
            background: ${i?"rgba(16, 185, 129, 0.1)":"rgba(147, 197, 253, 0.0)"};
            border-radius: 8px;pointer-events: none;transition: all 0.2s ease;
            box-shadow: ${i?"0 0 20px rgba(16, 185, 129, 0.4)":"0 0 10px rgba(147, 197, 253, 0.2)"};
        `,n.appendChild(p)}),document.body.appendChild(n),n}function X(){const t=document.getElementById("tabtabgo-region-overlay");t&&t.remove()}function re(t,o,n,e){if(J(),t.length===0)return null;const a=document.createElement("div");a.id="tabtabgo-region-popup",a.style.cssText=`
        position: fixed;left: ${n}px;top: ${e}px;background: white;border: 2px solid #10b981;
        border-radius: 12px;padding: 12px;box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;min-width: 280px;max-width: 400px;
    `;const i=document.createElement("div");i.style.cssText="font-size: 13px;font-weight: 600;color: #10b981;margin-bottom: 8px;padding-bottom: 8px;border-bottom: 1px solid #e5e7eb;",i.textContent="🔎 Select Region",a.appendChild(i);const s=document.createElement("div");s.style.cssText="display: flex;flex-direction: column;gap: 4px;",t.forEach((w,l)=>{const d=l===o,c=document.createElement("div");c.style.cssText=`
            padding: 10px 12px;background: ${d?"#10b981":"#f9fafb"};color: ${d?"white":"#374151"};
            border-radius: 8px;cursor: pointer;transition: all 0.2s ease;border: 2px solid ${d?"#10b981":"transparent"};
        `,c.innerHTML=`
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">${w.icon}</span>
                    <div>
                        <div style="font-weight: 600; font-size: 14px; margin-bottom: 2px;">${w.name}</div>
                        <div style="font-size: 11px; opacity: 0.8;">${w.description}</div>
                    </div>
                </div>
                <div style="font-size: 12px; font-weight: 600; opacity: 0.8;">${w.interactiveCount}</div>
            </div>
        `,d||(c.addEventListener("mouseenter",()=>{c.style.background="#e5e7eb"}),c.addEventListener("mouseleave",()=>{c.style.background="#f9fafb"})),s.appendChild(c)}),a.appendChild(s);const p=document.createElement("div");p.style.cssText="margin-top: 12px;padding-top: 12px;border-top: 1px solid #e5e7eb;font-size: 11px;color: #6b7280;line-height: 1.5;",p.innerHTML=`
        <div style="margin-bottom: 4px;"><kbd style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: monospace;">Tab</kbd> or <kbd style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: monospace;">D</kbd> Next region</div>
        <div style="margin-bottom: 4px;"><kbd style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: monospace;">Shift+Tab</kbd> or <kbd style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: monospace;">S</kbd> Previous region</div>
        <div><kbd style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: monospace;">Enter</kbd> or <kbd style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: monospace;">W</kbd> Select region</div>
    `,a.appendChild(p),document.body.appendChild(a);const y=a.getBoundingClientRect();return y.right>window.innerWidth&&(a.style.left=`${window.innerWidth-y.width-20}px`),y.bottom>window.innerHeight&&(a.style.top=`${window.innerHeight-y.height-20}px`),a}function J(){const t=document.getElementById("tabtabgo-region-popup");t&&t.remove()}function se(t){if(!t)return console.warn("❌ Cannot click null element"),!1;let o=t;const n=t.tagName?t.tagName.toLowerCase():"";if(n==="svg"||n==="path"){let l=t.parentElement,d=5;for(;l&&d>0;){const c=l.tagName?l.tagName.toLowerCase():"";if(l.getAttribute("role")==="button"||c==="button"||c==="a"||l.hasAttribute("jsaction")||l.onclick){o=l,console.log("📍 Found clickable parent:",{tag:c,role:l.getAttribute("role"),ariaLabel:l.getAttribute("aria-label")});break}l=l.parentElement,d--}}console.log("🖱️ Smart clicking:",{tag:o.tagName,class:(o.className||"").toString().substring(0,80),text:(o.textContent||"").trim().substring(0,50),ariaLabel:o.getAttribute("aria-label"),role:o.getAttribute("role")});const e=(o.className||"").toString(),a=e.includes("J-Ke")||e.includes("n4")||o.closest(".n6")||o.closest(".J-Ke"),i=o.closest('[role="banner"]')!==null||o.closest(".gb_")!==null,s=e.includes("T-I")||o.closest(".T-I")!==null||e.includes("z0")||o.closest(".z0")!==null||e.includes("wG")||o.closest(".wG")!==null||e.includes("J-Z-I")||o.closest(".J-Z-I")!==null||o.closest(".AD")!==null,p=e.includes("HW")&&e.includes("H0")&&e.includes("H2")||o.closest(".Im")!==null,y=o.closest(".aKk")!==null||o.closest('[role="tab"]')!==null,w=o.closest('[role="complementary"]')!==null;console.log("🎯 Element type:",{isGmailUI:a,isHeader:i,isComposeNav:s,isTopNavFilter:p,isCategoryTab:y,isRightPanel:w});try{return a||i?(console.log("📌 Using simple click (Gmail UI / header element)"),o.focus(),o.click(),console.log("✅ Simple click completed"),!0):p?(console.log("📌 Using robust click (top navigation filter)"),_(o)):y?(console.log("📌 Using robust click (category tab)"),_(o)):w?(console.log("📌 Using robust click (right panel)"),_(o)):s?(console.log("📌 Using robust click (compose/navigation element)"),_(o)):(console.log("📌 Using simple click (default)"),o.focus(),o.click(),console.log("✅ Simple click completed"),!0)}catch(l){console.error("❌ Smart click failed, trying fallback:",l);try{return a||i?(console.log("🔄 Fallback: trying robust click"),_(o)):(console.log("🔄 Fallback: trying simple click"),o.click(),!0)}catch(d){return console.error("❌ Fallback also failed:",d),!1}}}function _(t){const o=t.getBoundingClientRect(),n=o.left+o.width/2,e=o.top+o.height/2;(t.tabIndex>=0||t.getAttribute("tabindex"))&&t.focus();const a={view:window,bubbles:!0,cancelable:!0,composed:!0,clientX:n,clientY:e,screenX:n+window.screenX,screenY:e+window.screenY,button:0,buttons:1},i=new MouseEvent("mousedown",a);return t.dispatchEvent(i),setTimeout(()=>{const s=new MouseEvent("mouseup",a);t.dispatchEvent(s);const p=new MouseEvent("click",a);t.dispatchEvent(p),console.log("✅ Robust click completed")},10),!0}function ce(t){return se(t)}class le{constructor(){this.overlay=null,this.clickCount=0,this.clickTimestamps=[],this.onComplete=null}show(o){this.onComplete=o,this.clickCount=0,this.clickTimestamps=[],this.overlay=document.createElement("div"),this.overlay.id="tabtabgo-sync-overlay",this.overlay.innerHTML=`
            <div class="sync-container">
                <div class="sync-header">
                    <h1>📊 EMG SYNC</h1>
                    <p class="sync-instruction">Click the big button below <strong>3 times quickly</strong></p>
                </div>
                
                <button class="sync-button" id="sync-click-btn">
                    <div class="sync-button-content">
                        <div class="click-counter">${this.clickCount}/3</div>
                        <div class="sync-button-text">CLICK HERE</div>
                    </div>
                </button>
                
                <div class="sync-footer">
                    <p>This helps synchronize interaction logs with EMG sensors</p>
                </div>
            </div>
        `,this.addStyles(),document.body.appendChild(this.overlay);const n=document.getElementById("sync-click-btn");n.addEventListener("click",()=>this.handleClick()),setTimeout(()=>n.focus(),100)}handleClick(){const o=Date.now();this.clickTimestamps.push(o),this.clickCount++,console.log(`🎯 Sync click ${this.clickCount}/3 at ${o}`);const n=this.overlay.querySelector(".click-counter");n.textContent=`${this.clickCount}/3`;const e=document.getElementById("sync-click-btn");if(e.classList.add("clicked"),setTimeout(()=>e.classList.remove("clicked"),200),this.clickCount>=3){const a=[this.clickTimestamps[1]-this.clickTimestamps[0],this.clickTimestamps[2]-this.clickTimestamps[1]];console.log("✅ Sync complete!",{timestamps:this.clickTimestamps,intervals:a,totalDuration:this.clickTimestamps[2]-this.clickTimestamps[0]}),this.showCompletion()}}showCompletion(){const o=this.overlay.querySelector(".sync-container");o.innerHTML=`
            <div class="sync-header">
                <h1 style="color: #10b981;">✅ SYNC COMPLETE</h1>
                <p class="sync-instruction">EMG synchronization successful</p>
            </div>
            <div class="sync-stats">
                <div class="sync-stat">
                    <div class="stat-label">Click 1</div>
                    <div class="stat-value">${new Date(this.clickTimestamps[0]).toLocaleTimeString()}.${this.clickTimestamps[0]%1e3}</div>
                </div>
                <div class="sync-stat">
                    <div class="stat-label">Click 2</div>
                    <div class="stat-value">${new Date(this.clickTimestamps[1]).toLocaleTimeString()}.${this.clickTimestamps[1]%1e3}</div>
                </div>
                <div class="sync-stat">
                    <div class="stat-label">Click 3</div>
                    <div class="stat-value">${new Date(this.clickTimestamps[2]).toLocaleTimeString()}.${this.clickTimestamps[2]%1e3}</div>
                </div>
            </div>
            <div class="sync-footer">
                <p>Starting first task...</p>
            </div>
        `,setTimeout(()=>{this.remove(),this.onComplete&&this.onComplete({timestamps:this.clickTimestamps,intervals:[this.clickTimestamps[1]-this.clickTimestamps[0],this.clickTimestamps[2]-this.clickTimestamps[1]],totalDuration:this.clickTimestamps[2]-this.clickTimestamps[0]})},2e3)}remove(){this.overlay&&this.overlay.parentNode&&(this.overlay.parentNode.removeChild(this.overlay),this.overlay=null)}addStyles(){if(document.getElementById("tabtabgo-sync-styles"))return;const o=document.createElement("style");o.id="tabtabgo-sync-styles",o.textContent=`
            #tabtabgo-sync-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                z-index: 2147483647;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .sync-container {
                text-align: center;
                color: white;
                max-width: 600px;
                padding: 40px;
            }

            .sync-header h1 {
                font-size: 48px;
                margin: 0 0 20px 0;
                font-weight: 700;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            }

            .sync-instruction {
                font-size: 24px;
                margin: 0 0 40px 0;
                opacity: 0.95;
            }

            .sync-button {
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                border: 8px solid rgba(255, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                margin: 0 auto 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .sync-button:hover {
                transform: scale(1.05);
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
                border-color: rgba(255, 255, 255, 0.5);
            }

            .sync-button:active,
            .sync-button.clicked {
                transform: scale(0.95);
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
            }

            .sync-button-content {
                text-align: center;
            }

            .click-counter {
                font-size: 72px;
                font-weight: 700;
                color: white;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            .sync-button-text {
                font-size: 24px;
                font-weight: 600;
                color: white;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            }

            .sync-footer {
                font-size: 16px;
                opacity: 0.8;
            }

            .sync-stats {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin: 40px 0;
            }

            .sync-stat {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 20px;
                min-width: 150px;
            }

            .stat-label {
                font-size: 14px;
                opacity: 0.8;
                margin-bottom: 8px;
            }

            .stat-value {
                font-size: 18px;
                font-weight: 600;
                font-family: monospace;
            }
        `,document.head.appendChild(o)}}const ft=new le;chrome.runtime.onMessage.addListener((t,o,n)=>{if(t.action==="showSync")return console.log("📊 Showing sync screen..."),ft.show(e=>{console.log("✅ Sync data:",e),chrome.runtime.sendMessage({action:"syncComplete",data:e}).then(()=>{n({success:!0})})}),!0;t.action==="hideSync"&&(ft.remove(),n({success:!0}))});class de{constructor(){this.overlay=null}show(o,n,e="completed",a){this.remove(),this.overlay=document.createElement("div"),this.overlay.id="tabtabgo-task-interstitial";const i=e==="completed"?"✅":"⏭️",s=e==="completed"?"Task Complete":"Task Skipped",p=e==="completed"?"#10b981":"#f59e0b";this.overlay.innerHTML=`
            <div class="interstitial-container">
                <div class="interstitial-icon" style="color: ${p};">${i}</div>
                <div class="interstitial-title">${s}</div>
                <div class="interstitial-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${o/n*100}%;"></div>
                    </div>
                    <div class="progress-text">Task ${o} of ${n}</div>
                </div>
                ${o<n?'<div class="interstitial-next">Next task starting...</div>':'<div class="interstitial-next">Session complete!</div>'}
            </div>
        `,this.addStyles(),document.body.appendChild(this.overlay),setTimeout(()=>{this.remove(),a&&a()},2500)}remove(){this.overlay&&this.overlay.parentNode&&(this.overlay.parentNode.removeChild(this.overlay),this.overlay=null)}addStyles(){if(document.getElementById("tabtabgo-interstitial-styles"))return;const o=document.createElement("style");o.id="tabtabgo-interstitial-styles",o.textContent=`
            #tabtabgo-task-interstitial {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 2147483646;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                animation: interstitialFadeIn 0.3s ease-out;
            }

            @keyframes interstitialFadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .interstitial-container {
                text-align: center;
                color: white;
                max-width: 500px;
                padding: 40px;
            }

            .interstitial-icon {
                font-size: 80px;
                margin-bottom: 20px;
                animation: iconPop 0.5s ease-out;
            }

            @keyframes iconPop {
                0% {
                    transform: scale(0);
                }
                50% {
                    transform: scale(1.2);
                }
                100% {
                    transform: scale(1);
                }
            }

            .interstitial-title {
                font-size: 36px;
                font-weight: 700;
                margin-bottom: 30px;
                opacity: 0;
                animation: titleSlideIn 0.5s ease-out 0.2s forwards;
            }

            @keyframes titleSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .interstitial-progress {
                margin-bottom: 20px;
                opacity: 0;
                animation: progressFadeIn 0.5s ease-out 0.4s forwards;
            }

            @keyframes progressFadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 10px;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #059669);
                transition: width 0.5s ease-out;
                border-radius: 4px;
            }

            .progress-text {
                font-size: 18px;
                color: rgba(255, 255, 255, 0.8);
            }

            .interstitial-next {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.6);
                margin-top: 20px;
                opacity: 0;
                animation: nextFadeIn 0.5s ease-out 0.6s forwards;
            }

            @keyframes nextFadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 0.6;
                }
            }
        `,document.head.appendChild(o)}}const ht=new de;(function(){let t="none",o=[],n=-1,e=[],a=-1,i=null,s=null,p=null,y=!1,w=!1,l="#10b981",d=null,c=null,m=null,A={x:0,y:0},S=0,E=0,H=0;const yt=500,wt=4,vt=6,ot=1500;let U={timestamp:0,candidates:[]};async function Y(){return console.log("🗺️ Starting region navigation..."),o=te(),o.length===0?(console.warn("⚠️ No regions found on page"),!1):(t="region",n=0,j(),!0)}function j(){X(),ae(o,n),J(),re(o,n,E||window.innerWidth/2,H||100)}function xt(){o.length!==0&&(n=(n+1)%o.length,j(),console.log(`➡️ Region: ${o[n].name}`))}function kt(){o.length!==0&&(n=n-1,n<0&&(n=o.length-1),j(),console.log(`⬅️ Region: ${o[n].name}`))}async function Ct(){if(n<0||n>=o.length)return;const r=o[n];console.log(`✅ Selected region: ${r.name}`),X(),J(),await Et(r)}async function Et(r){if(console.log(`🎯 Starting element navigation in: ${r.name}`),t="element",e=await St(r),e.length===0){console.warn(`⚠️ No interactive elements found in ${r.name}`),t="region",j();return}a=-1,await tt()}async function St(r){if(y)return[];y=!0;try{const h=ie(r,pt);return console.log(`🎯 Found ${h.length} candidates in ${r.name}`),U={timestamp:Date.now(),candidates:h.map(g=>({element:g.element,candidate:g}))},h.map(g=>({element:g.element,highlightElement:g.highlightElement||null,text:g.features.text,selector:g.features.id||g.features.className,features:g.features}))}finally{y=!1}}async function V(){if(y)return e;y=!0;try{const r=pt();console.log("🎯 Raw candidates found:",r.length),U={timestamp:Date.now(),candidates:r.map(u=>({element:u.element,candidate:u}))};const h=r.map(u=>({element:u.element,text:u.features.text,selector:u.features.id||u.features.className,features:u.features})),g=[{element:null,text:"other",selector:"fake-other",isFake:!0,fakeAction:"other"}];return[...h,...g]}finally{y=!1}}function nt(r){const h=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return h?{r:parseInt(h[1],16),g:parseInt(h[2],16),b:parseInt(h[3],16)}:{r:16,g:185,b:129}}function Tt(r,h){const g=nt(r);return`rgba(${g.r}, ${g.g}, ${g.b}, ${h})`}let F=null;function At(){if(!c||!i)return;const r=i.getBoundingClientRect(),h=4,g=r.left-h,u=r.top-h,f=r.width+h*2,C=r.height+h*2,k=c.querySelector("rect:not([filter])"),v=c.querySelector('rect[filter="url(#blur-filter)"]');k&&(k.setAttribute("x",g),k.setAttribute("y",u),k.setAttribute("width",f),k.setAttribute("height",C)),v&&(v.setAttribute("x",g),v.setAttribute("y",u),v.setAttribute("width",f),v.setAttribute("height",C))}function Nt(r,h=l){Z(),i=r;const g=r.getBoundingClientRect(),u=4,f=g.left-u,C=g.top-u,k=g.width+u*2,v=g.height+u*2,T=nt(h),R=`rgb(${Math.min(255,T.r+50)}, ${Math.min(255,T.g+50)}, ${Math.min(255,T.b+50)})`,x=document.createElementNS("http://www.w3.org/2000/svg","svg");x.id="smarttab-lasso",x.style.position="fixed",x.style.top="0",x.style.left="0",x.style.width="100%",x.style.height="100%",x.style.pointerEvents="none",x.style.zIndex="999998";const M=document.createElementNS("http://www.w3.org/2000/svg","defs"),L=document.createElementNS("http://www.w3.org/2000/svg","filter");L.setAttribute("id","blur-filter");const I=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");I.setAttribute("stdDeviation","4"),L.appendChild(I),M.appendChild(L),x.appendChild(M);const N=document.createElementNS("http://www.w3.org/2000/svg","rect");N.setAttribute("x",f),N.setAttribute("y",C),N.setAttribute("width",k),N.setAttribute("height",v),N.setAttribute("rx","6"),N.setAttribute("ry","6"),N.setAttribute("stroke",R),N.setAttribute("stroke-width",vt),N.setAttribute("fill","none"),N.setAttribute("opacity","0.6"),N.setAttribute("filter","url(#blur-filter)");const $=document.createElementNS("http://www.w3.org/2000/svg","rect");return $.setAttribute("x",f),$.setAttribute("y",C),$.setAttribute("width",k),$.setAttribute("height",v),$.setAttribute("rx","6"),$.setAttribute("ry","6"),$.setAttribute("stroke",h),$.setAttribute("stroke-width",wt),$.setAttribute("fill","none"),$.style.opacity="1",$.style.transition="opacity 0.2s",x.appendChild(N),x.appendChild($),document.body.appendChild(x),c=x,F=()=>At(),window.addEventListener("scroll",F,!0),window.addEventListener("resize",F),x}function Z(){F&&(window.removeEventListener("scroll",F,!0),window.removeEventListener("resize",F),F=null),c&&(c.remove(),c=null),i=null}let P=null,K=null;function $t(r,h,g){Q(),s=r;const u=r.getBoundingClientRect(),f=u.left+u.width/2,C=u.top+u.height/2,k=Tt(l,.8),v=document.createElementNS("http://www.w3.org/2000/svg","svg");v.id="smarttab-chord",v.style.position="fixed",v.style.top="0",v.style.left="0",v.style.width="100%",v.style.height="100%",v.style.pointerEvents="none",v.style.zIndex="999998";const T=document.createElementNS("http://www.w3.org/2000/svg","defs"),R=document.createElementNS("http://www.w3.org/2000/svg","filter");R.setAttribute("id","chord-blur-filter");const x=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");x.setAttribute("stdDeviation","3"),R.appendChild(x),T.appendChild(R),v.appendChild(T);const M=f-h,L=C-g,I=Math.sqrt(M*M+L*L);let N;if(I<5)N=`M ${h} ${g} L ${f} ${C}`;else{const lt=Math.min(I*.3,100),dt=-L/I*lt*.6,ut=M/I*lt*.6,qt=h+(f-h)*.35+dt,Dt=g+(C-g)*.35+ut,zt=h+(f-h)*.65+dt,Ft=g+(C-g)*.65+ut;N=`M ${h} ${g} C ${qt} ${Dt}, ${zt} ${Ft}, ${f} ${C}`}const $=document.createElementNS("http://www.w3.org/2000/svg","path");$.setAttribute("d",N),$.setAttribute("stroke",l),$.setAttribute("stroke-width","8"),$.setAttribute("fill","none"),$.setAttribute("opacity","0.5"),$.setAttribute("filter","url(#chord-blur-filter)");const B=document.createElementNS("http://www.w3.org/2000/svg","path");B.setAttribute("d",N),B.setAttribute("stroke",k),B.setAttribute("stroke-width","3"),B.setAttribute("fill","none"),B.setAttribute("stroke-linecap","round"),B.style.opacity="1",B.style.transition="opacity 0.2s",v.appendChild($),v.appendChild(B),document.body.appendChild(v),d=v,P=()=>it(),window.addEventListener("scroll",P,!0),window.addEventListener("resize",P),K=et=>{E=et.clientX,H=et.clientY,d&&s&&it()},O.mouse.x=E,O.mouse.y=H,document.addEventListener("mousemove",K)}function it(){if(!d||!s)return;const r=s.getBoundingClientRect(),h=r.left+r.width/2,g=r.top+r.height/2,u=h-E,f=g-H,C=Math.sqrt(u*u+f*f);let k;if(C<5)k=`M ${E} ${H} L ${h} ${g}`;else{const x=Math.min(C*.3,100),M=-f/C*x*.6,L=u/C*x*.6,I=E+(h-E)*.35+M,N=H+(g-H)*.35+L,$=E+(h-E)*.65+M,B=H+(g-H)*.65+L;k=`M ${E} ${H} C ${I} ${N}, ${$} ${B}, ${h} ${g}`}const v=d.querySelector("path[filter]"),T=d.querySelector("path:not([filter])");v&&v.setAttribute("d",k),T&&T.setAttribute("d",k)}function Q(){P&&(window.removeEventListener("scroll",P,!0),window.removeEventListener("resize",P),P=null),K&&(document.removeEventListener("mousemove",K),K=null),d&&(d.remove(),d=null),s=null}async function tt(){if(e.length===0)return;a=(a+1)%e.length;const r=e[a];if(Z(),Q(),r.isFake)W();else if(r.element){const h=r.highlightElement||r.element;Nt(h,l),$t(h,E,H),r.element.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}}async function It(){e.length!==0&&(a=a-1,a<0&&(a=e.length-1),await tt())}function W(){t="none",n=-1,a=-1,Z(),Q(),X(),J()}async function Lt(){if(t==="region"){await Ct();return}if(t!=="element"||a<0||a>=e.length)return;const r=e[a];if(r.isFake&&r.fakeAction==="other"){W(),await Y();return}r.element&&(w=!0,gt(r.element),await mt(r,e,!0,a,0),G(),console.log("🎯 Activating element with robust click..."),ce(r.element),setTimeout(()=>{w=!1},100),W())}async function at(r){const h=r.key==="Tab",g=r.key==="d"||r.key==="D"||r.key==="в"||r.key==="В",u=r.key==="s"||r.key==="S"||r.key==="ы"||r.key==="Ы";if(m==="trackpad")return!0;if((h||g||u)&&!r.ctrlKey&&!r.altKey&&!r.metaKey){const f=document.activeElement;let C=!1;if(f){const k=f.tagName,v=f.type?f.type.toLowerCase():"";k==="TEXTAREA"?C=!0:k==="INPUT"?(["text","email","password","search","tel","url","number","date","datetime-local","month","time","week"].includes(v)||!v||v==="")&&(C=!0):f.isContentEditable&&(C=!0)}if(C)return!0;if(r.preventDefault(),r.stopPropagation(),r.stopImmediatePropagation(),t==="none"){await Y();return}t==="region"?r.shiftKey||u?kt():xt():t==="element"&&(r.shiftKey||u?It():tt())}}function rt(r){if(t==="none")return;const h=r.key==="Enter",g=r.key===" ",u=r.key==="w"||r.key==="W"||r.key==="ц"||r.key==="Ц";(h||g||u)&&(r.preventDefault(),r.stopPropagation(),r.stopImmediatePropagation(),Lt())}function st(r){if(t==="none")return;const h=r.key==="Escape",g=r.key==="a"||r.key==="A"||r.key==="ф"||r.key==="Ф";(h||g)&&(r.preventDefault(),r.stopPropagation(),r.stopImmediatePropagation(),t==="element"?(W(),Y()):W())}function Rt(r){if(m==="trackpad"){const h=r.clientX-A.x,g=r.clientY-A.y,u=Math.sqrt(h*h+g*g);S+=u,A.x=r.clientX,A.y=r.clientY}}function G(){S=0}chrome.runtime.onMessage.addListener(async(r,h,g)=>{if(r.action==="sessionStateChanged")return m=r.sessionActive?r.mode:null,console.log(`🔄 Session mode changed to: ${m||"inactive"}`),e=[],a=-1,m==="trackpad"&&G(),g({success:!0}),!0;if(r.action==="toggleNavigation"){try{if(t!=="none")W(),g({success:!0,navigationActive:!1});else{const f=await Y();g({success:f,navigationActive:f})}}catch(u){console.error("Error toggling navigation:",u),g({success:!1,error:u.message})}return!0}return r.action==="showTaskInterstitial"?(console.log("📋 Showing task interstitial..."),ht.show(r.taskNumber,r.totalTasks,r.status,()=>{console.log("✅ Interstitial complete"),g({success:!0})}),!0):(r.action==="hideTaskInterstitial"&&(ht.remove(),g({success:!0})),!1)});function Mt(){p&&clearTimeout(p),p=setTimeout(async()=>{e=await V(),a>=e.length&&(a=-1)},yt)}function Ht(r){if(Date.now()-U.timestamp>ot)return null;for(let g=0;g<U.candidates.length;g++){const{element:u}=U.candidates[g];if(u===r||u.contains(r))return{button:e[g],selectedIndex:g}}return null}function Bt(r){return r.className?typeof r.className=="string"?r.className:r.className.toString():""}async function ct(){document.addEventListener("mousemove",u=>{E=u.clientX,H=u.clientY,Rt(u)});try{const u=await chrome.storage.local.get(["sessionActive","currentSession"]);u.sessionActive&&u.currentSession&&(m=u.currentSession.mode,console.log(`📊 Session active in ${m} mode`),m==="trackpad"&&G())}catch(u){console.error("Failed to check session state:",u)}chrome.storage.onChanged.addListener((u,f)=>{f==="local"&&u.currentSession&&(u.currentSession.newValue?(m=u.currentSession.newValue.mode,console.log(`🔄 Session started via storage: ${m} mode`),m==="trackpad"&&G()):(m=null,console.log("🔄 Session ended via storage")))});let r=null,h=!1;document.addEventListener("mousedown",async u=>{if(m!=="trackpad")return;const f=u.target,C=f.id||f.closest("button")?.id;if(C==="skip-task-btn"||C==="next-task-btn"||C==="task-next-btn")return;let k=f;if(!["BUTTON","A","INPUT","SELECT","TEXTAREA","IMG"].includes(f.tagName)){const R=f.closest('button, a, img, [role="button"], [role="link"], [onclick], [tabindex]');R&&(k=R)}const T=k.getAttribute("aria-label")||k.getAttribute("data-tooltip")||k.title||k.textContent?.trim().slice(0,100)||k.alt||k.value||k.tagName.toLowerCase();r={timestamp:Date.now(),element:k,elementText:T},h=!1,console.log("👇 Mousedown:",{tag:k.tagName,text:T.substring(0,30),ariaLabel:k.getAttribute("aria-label")})},!0),document.addEventListener("mouseup",async u=>{if(m==="trackpad"&&r&&!h&&(await new Promise(f=>setTimeout(f,100)),!h)){console.log("⚠️ Click event did not fire - logging from mouseup");const f=r.element,C=r.elementText,k=f.id||f.closest("button")?.id;if(k==="skip-task-btn"||k==="next-task-btn"||k==="task-next-btn"){r=null;return}let v="";if(f.id)v=`#${f.id}`;else if(f.getAttribute("data-tooltip"))v=`[data-tooltip="${f.getAttribute("data-tooltip")}"]`;else if(f.getAttribute("aria-label"))v=`[aria-label="${f.getAttribute("aria-label")}"]`;else if(f.className&&typeof f.className=="string"){const T=f.className.split(" ").filter(R=>R).slice(0,2);v=T.length>0?T.join(" "):f.tagName}else v=f.tagName;console.log("🖱️ Mouseup logged (no click):",{tag:f.tagName,text:C.substring(0,30),distance:S.toFixed(2)});try{const T=await chrome.storage.local.get(["sessionActive","currentSession"]);T.sessionActive&&(await chrome.runtime.sendMessage({action:"logInteraction",data:{timestamp:Date.now(),selectedIndex:-1,manualClick:!0,TabTabGoClick:!1,elementText:C.substring(0,100),elementSelector:v,cursorTraveledDistancePx:S,url:window.location.href,mode:T.currentSession.mode}}),console.log("✅ Interaction logged from mouseup"),h=!0)}catch(T){console.error("Failed to log from mouseup:",T)}G(),r=null}},!0),document.addEventListener("click",async u=>{if(w)return;const f=u.target,C=f.id||f.closest("button")?.id;if(C==="skip-task-btn"||C==="next-task-btn"||C==="task-next-btn")return;if(m==="trackpad"){let x=f,M="";if(r&&Date.now()-r.timestamp<500)x=r.element,M=r.elementText,console.log("✓ Using mousedown data");else{if(!["BUTTON","A","INPUT","SELECT","TEXTAREA","IMG"].includes(f.tagName)){const N=f.closest('button, a, img, [role="button"], [role="link"], [onclick], [tabindex]');N&&(x=N)}M=x.getAttribute("aria-label")||x.getAttribute("data-tooltip")||x.title||x.textContent?.trim().slice(0,100)||x.alt||x.value||x.tagName.toLowerCase()}let L="";if(x.id)L=`#${x.id}`;else if(x.getAttribute("data-tooltip"))L=`[data-tooltip="${x.getAttribute("data-tooltip")}"]`;else if(x.getAttribute("aria-label"))L=`[aria-label="${x.getAttribute("aria-label")}"]`;else if(x.className&&typeof x.className=="string"){const I=x.className.split(" ").filter(N=>N).slice(0,2);L=I.length>0?I.join(" "):x.tagName}else L=x.tagName;console.log("🖱️ Click logged:",{tag:x.tagName,text:M.substring(0,30),distance:S.toFixed(2)});try{const I=await chrome.storage.local.get(["sessionActive","currentSession"]);I.sessionActive&&(await chrome.runtime.sendMessage({action:"logInteraction",data:{timestamp:Date.now(),selectedIndex:-1,manualClick:!0,TabTabGoClick:!1,elementText:M.substring(0,100),elementSelector:L,cursorTraveledDistancePx:S,url:window.location.href,mode:I.currentSession.mode}}),h=!0,r=null)}catch(I){console.error("Failed to log trackpad click:",I)}G();return}Date.now()-U.timestamp>ot&&(e=await V());const v=Ht(u.target);if(!v)return;const{button:T,selectedIndex:R}=v;gt(T.element),await mt(T,e,!1,R,S),G()},!0),setTimeout(async()=>{e=await V()},1e3),window.addEventListener("keydown",at,!0),document.addEventListener("keydown",at,!0),window.addEventListener("keydown",rt,!0),document.addEventListener("keydown",rt,!0),window.addEventListener("keydown",st,!0),document.addEventListener("keydown",st,!0),new MutationObserver(u=>{let f=!1;for(const C of u){if(C.type==="childList"&&C.addedNodes.length>0){for(const k of C.addedNodes)if(k.nodeType===1){const v=k.tagName?.toLowerCase(),T=k.getAttribute?.("role"),R=Bt(k);if(v==="button"||T==="button"||R.includes("button")){f=!0;break}}}if(f)break}f&&Mt()}).observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style","role"]})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ct):ct()})();

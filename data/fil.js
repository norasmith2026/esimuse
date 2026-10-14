// ============================================================
// eSIM Card — Filipino (Taglish) data file. Same id sets as en.js!
// AI 初翻（Taglish 规则：i- 动词+英文词根、名词保留英文、客服口吻用 po），待母语者终审。
// ============================================================
window.PHC = {
  meta: {
    category: "eSIM Card",
    tagline: "Setup & troubleshooting",
    brand: "__FILL_ME__",
    policyNote: "This English version prevails."
  },

  ui: {
    searchPlaceholder: "Maghanap sa page na ito",
    selectTitle: "Piliin Muna ang eSIM Card Ninyo",
    problemsTitle: "Anong nangyayari?",
    factsTitle: "Model info",
    factsApp: "App / website",
    fact_use: "Anong ginagawa nito",
    fact_switching: "Write & switch",
    fact_capacity: "Ilang profiles ang kaya ng card",
    videosTitle: "Video guides",
    faqTitle: "Mga karaniwang tanong",
    backLabel: "← eSIM Card",
    contactTitle: "Contact us",
    emptySearch: "Walang nahanap. Subukan ng ibang salita, o humingi ng tulong sa amin.",
    searchProducts: "Models",
    searchFaq: "Mga tanong",
    searchWizard: "Mga problema",
    wizardContact: "Humingi ng tulong sa amin dito",
    wizardRestart: "Magsimula ulit",
    wizardBack: "Bumalik",
    copyButton: "I-copy ang model at problema ko",
    copyDone: "Copied!",
    summaryPreviewTitle: "Ang maaaring i-copy:",
    emailAddrLabel: "O i-copy ang address na ito:",
    selfServeHint: "Gusto niyo lang makita kung paano gumagana? Piliin muna ang eSIM card ninyo — doon sa model page may mga gabay.",
    footerContact: "Contact us",
    collapseAll: "Isara lahat ng sections",
    expandAll: "Buksan lahat ng sections",
    sectionNav: "Tumalon sa section"
  },

  contact: {
    fastestTitle: "Pinakamabilis makapagpaskil: sa shop chat kung saan binili",
    fastestNote: "Pinakamabilis: mag-chat sa shop sa app o platform kung saan niyo binili — nakikita ng seller ang order niyo doon, at karaniwang sumasagot sila sa loob ng 24 oras.",
    fallbackNote: "Walang reply sa loob ng 24 oras? Mag-message sa Facebook Messenger o Viber — sumasagot kami sa loob ng 48 oras.",
    // email channel not needed (user decision 2026-10-14) — engine hides it when empty
    emailAddress: "",
    emailHint: "Sumasagot kami sa loob ng 48 oras.",
    summaryTemplate: "Hi, need help with my device.\nModel: {product}\nIssue: {symptom}\nPage: {url}",
    summaryNoSymptomTemplate: "Hi, need help with my device.\nModel: {product}\nPage: {url}",
    summaryNoModelTemplate: "Hi, need help with my device.\nPage: {url}",
    summarySingleLineTemplate: "Hi, need help with my device. Model: {product}. Issue: {symptom}. Page: {url}",
    summarySingleLineNoModelTemplate: "Hi, need help with my device. Page: {url}",
    channels: [
      { id: "msgr", label: "Facebook", primary: true,
        hint: "Bubuksan ang app kung meron — sumasagot kami sa loob ng 48 oras.",
        href: "https://www.facebook.com/profile.php?id=100092127695011" },
      { id: "viber", label: "Viber",
        hint: "Kailangan ng Viber app sa phone — sumasagot kami sa loob ng 48 oras.",
        href: "viber://chat?number=%2B639927391353",
        prefill: true,
        fallbackPage: "../go/viber/" }
    ]
  },

  products: [
    { id: "p1", name: "9eSim Card", short: "eSIM writer card · gumagamit ng 9eSim app", image: "images/p1.jpg", page: "p1/",
      facts: { app: "9eSim app — i-install mula sa App Store / official site ng 9eSim",
               use: "Ginagawang eSIM-capable ang phone: blangkong card na pinagdidiinan ng eSIM profiles",
               switching: "Android: mag-install at mag-switch sa app. iPhone: hindi kaya mag-install ng bagong profile, pero kaya ang mag-switch ng stored profiles sa STK (SIM Toolkit / Carrier Service) menu",
               capacity: "hanggang 10 profiles",
               note: "Bago bumili: i-install ang app sa phone at subukan. Kung may 'OMAPI not supported', hindi compatible ang phone sa card na ito." } },
    { id: "p2", name: "White eSIM Card", short: "eSIM writer card · 9eSim LPA o EasyeUICC app", image: "images/p2.jpg", page: "p2/",
      facts: { app: "9eSim LPA o EasyeUICC app",
               use: "Ganoon din: blangkong card na hinihintuan ng eSIM profiles na ida-download sa app",
               switching: "Android: mag-install at mag-switch sa app. iPhone: paggamit lang — hindi kaya mag-install ni mag-switch",
               capacity: "hanggang 8 profiles",
               note: "Bago bumili: i-install ang app at subukan. Ang 'OMAPI not supported' ay ibig sabihin hindi compatible ang phone." } },
    { id: "p3", name: "5ber Card (luma)", short: "hindi na ipinagbibili — gagana pa rin kung kaya mag-log in sa 5ber app", image: "images/p3.svg", page: "p3/",
      facts: { app: "5ber app (kung kaya pa ring mag-log in)",
               use: "Lumang eSIM card. Hindi na namin ibinebenta — may problema ang kumpanya ng 5ber, walang na stock",
               switching: "Android: mag-install at mag-switch. iPhone: ang existing profiles lang ang magagamit — hindi kaya mag-install ni mag-switch",
               capacity: "hanggang 10 profiles",
               note: "Kung kaya ninyong mag-log in sa 5ber app, gumagana pa rin ang lumang card ninyo. Para sa bagong card, pumili ng 9eSim Card o White eSIM Card." } }
  ],

  groups: [
    { id: "getting-started", label: "Pagsisimula" },
    { id: "compat", label: "Compatibility & apps" },
    { id: "writing", label: "Pag-write at pag-switch" },
    { id: "profiles", label: "eSIM profiles" }
  ],

  troubleshoot: [
    {
      id: "t-compat",
      symptom: "Gagana ba ito sa phone ko?",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "I-install na ba ninyo ang app sa phone at binuksan? (libre — gawin ito bago bumili)",
          options: [
            { label: "Oo, binuksan ko ang app", next: "q2" },
            { label: "Hindi pa", next: "a-install" }
          ] },
        { id: "a-install", answer: "I-install muna ang app para sa card ninyo: 9eSim app para sa 9eSim Card, o 9eSim LPA / EasyeUICC para sa White card. Buksan, tapos balikan namin para i-check kung anong lumalabas." },
        { id: "q2", question: "Ano ang lumalabas sa app pagbinuksan?",
          options: [
            { label: "'OMAPI not supported'", next: "a-no" },
            { label: "Walang error — gumagana ang app", next: "a-ok" }
          ] },
        { id: "a-no", answer: "Ibig sabihin hindi supported ng phone ang eSIM writing tools — hindi gagana ang card na ito sa phone na iyan. Huwag na ito bilhin para sa phone na iyan. Note: halos lahat ng phone na labas pagkatapos ng 2023 ay supported, kaya madalas kayang gumamit ng ibang Android na phone para sa write step lang." },
        { id: "a-ok", answer: "Maganda — walang error ang ibig sabihin supported ang phone ninyo. Isa pa sa dual-SIM phones: may mga model na sa slot 1 (SIM 1) lang suportado ang eSIM card. I-check ang specs ng phone o magtanong sa manufacturer kung anong slot ang eSIM-capable." }
      ]
    },
    {
      id: "t-blank",
      symptom: "Ang card ay dating walang anuman / walang lumalabas",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Bumili na ba kayo ng eSIM profile mula sa provider? (blangko ang card — ang profiles ay bilhin nang hiwalay)",
          options: [
            { label: "Hindi pa, ano ang profile?", next: "a-profile" },
            { label: "Oo, may QR code na ako", next: "q2" }
          ] },
        { id: "a-profile", answer: "Sinadyang blangko ang card namin — tool lang ito na hinihintuan ng eSIM profiles, hindi SIM na may data mismo. Bumili ng eSIM profile sa provider tulad ng esimdb.com o mobimatter.com (o anumang carrier na nagbebenta ng eSIM). Padadalhan kayo ng QR code ng provider." },
        { id: "q2", question: "I-download na ba ang profile sa card gamit ang app?",
          options: [
            { label: "Oo", next: "a-use" },
            { label: "Hindi pa / hindi ko alam paano", next: "a-scan" }
          ] },
        { id: "a-scan", answer: "Ang card ay dapat i-write sa ANDROID phone: ilagay ang card sa Android phone, buksan ang 9eSim (o LPA / EasyeUICC) app, i-scan ang QR code ng provider, at hayaang i-download ng app ang profile sa card. Hindi makakapag-write ang iPhone. Pagkatapos, ilagay ang card sa phone ninyo at gamitin na parang normal na SIM." },
        { id: "a-use", answer: "Gumagana na ang card na parang normal na physical SIM — ilagay sa phone (slot 1 sa dual-SIM) at dapat kumonekta sa network. Kung walang reaksyon ang phone, puntahan ang 'Card not recognized' wizard." }
      ]
    },
    {
      id: "t-scan",
      symptom: "Hindi ma-scan ang QR code / hindi ma-download",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Ginagamit ba ang app sa ANDROID phone para mag-scan?",
          options: [
            { label: "Oo", next: "q2" },
            { label: "Hindi — sa iPhone ako", next: "a-android" }
          ] },
        { id: "a-android", answer: "Ang profiles ay pwede lang i-write sa Android phone gamit ang app. Manghiram ng sinusuportahang Android phone para sa isang step na ito: i-scan ang QR, i-download ang profile sa card, tapos ibalik ang card sa iPhone ninyo." },
        { id: "q2", question: "Ano ang nangyayari?",
          options: [
            { label: "Sabi ng app 'OMAPI not supported'", next: "a-omapi" },
            { label: "Walang nangyayari pag-scan", next: "a-camera" },
            { label: "May error sa download ng profile", next: "a-provider" }
          ] },
        { id: "a-omapi", answer: "Ang Android phone na ito ay hindi supported sa eSIM writing tools. Subukan ng ibang Android phone (kahit anong supported, para sa write step lang), tapos ilipat ang card sa phone ninyo." },
        { id: "a-camera", answer: "Siguraduhing may internet ang Android phone. Linisin ang camera lens at i-aim ang camera sa QR code sa mabuting liwanag — o i-save ang QR bilang larawan at gamitin ang import-from-gallery ng app para basahin ito." },
        { id: "a-provider", answer: "Kung tinatanggihan ang QR, expired, o nagamit na, galing sa profile ang problema — kontakin ang provider o carrier na nagbenta sa iyo ng QR. Ang card namin ang writing tool lang; ang mga problema sa profile ay hawak ng seller ng profile." }
      ]
    },
    {
      id: "t-detect",
      symptom: "Hindi nababasa ang card sa phone",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Anong SIM slot ang ginamit?",
          options: [
            { label: "Slot 1 (SIM 1)", next: "q2" },
            { label: "Slot 2 / hindi ko sure", next: "a-slot" }
          ] },
        { id: "a-slot", answer: "Ilipat sa slot 1. May mga dual-SIM phone — lalo na sa ilang iPhone at Android models — na sa SIM 1 lang suportado ang eSIM card; ang slot 2 ay nano SIM lang ang kaya. Kung gumagana sa slot 1, manatili doon." },
        { id: "q2", question: "May nakasulat nang profile ang card?",
          options: [
            { label: "Oo, na-download sa app", next: "a-reseat" },
            { label: "Hindi pa, blangko pa rin", next: "a-blank" }
          ] },
        { id: "a-blank", answer: "Normal lang na walang lumalabas ang blangkong card. Dapat i-write muna: gamitin ang app sa Android phone para i-scan ang QR ng provider at ma-download ang profile sa card (tingnan ang 'Card arrived empty' wizard)." },
        { id: "a-reseat", answer: "Tanggalin ang card at ilagay ulit, siguraduhing tama ang posisyon ng gold contacts, tapos i-restart ang phone. Hindi pa rin nababasa? Sabihin lang sa amin ang model ng phone at anong slot ang subok — ia-check namin." }
      ]
    },
    {
      id: "t-switch",
      symptom: "Hindi makapag-switch ng profile sa iPhone",
      productIds: ["p2"],
      nodes: [
        { id: "q1", question: "Ano ang gustong gawin?",
          options: [
            { label: "Lumipat sa ibang stored profile", next: "a-switch" },
            { label: "Magdagdag ng bagong profile", next: "a-write-iphone" }
          ] },
        { id: "a-switch", answer: "Ganoon nga sa White eSIM Card: hindi kaya mag-switch ng profile sa iPhone. Kaya ng card na mag-imbak ng maraming profiles, pero sa Android nagagawa ang pag-switch. Para mag-switch: ilagay ang card sa Android phone, buksan ang app, piliin ang profile at gawing active, tapos ibalik sa iPhone." },
        { id: "a-write-iphone", answer: "Hindi kaya ng iPhone mag-write ng bagong profile sa card — ang active na profile lang ang magagamit. Ang pag-write ay sa Android phone gamit ang app, tapos ibalik ang card." }
      ]
    },
    {
      id: "t-stk",
      symptom: "Paano mag-switch ng profile sa iPhone?",
      productIds: ["p1"],
      nodes: [
        { id: "q1", question: "May nakikita bang SIM Toolkit / Carrier Service app icon sa iPhone ninyo (lumalabas pagkatapos ilagay ang card)?",
          options: [
            { label: "Oo, makikita ko", next: "a-stk" },
            { label: "Wala ganong icon", next: "a-android" }
          ] },
        { id: "a-stk", answer: "Suportado ng 9eSim Card ang pag-switch ng stored profiles direkta sa iPhone: buksan ang SIM Toolkit (Carrier Service) menu ng card, piliin ang profile at i-activate. Ang pag-install ng BAGONG profile ay kailangan pa rin sa Android phone gamit ang app." },
        { id: "a-android", answer: "Okay lang — pwede pa rin ang classic na paraan: ilagay ang card sa Android phone, buksan ang 9eSim app, piliin ang profile at gawing active, tapos ibalik sa iPhone." }
      ]
    },
    {
      id: "t-noservice",
      symptom: "Walang signal o walang data pagkatapos ma-write",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Makikita ba ang carrier name ng profile sa phone?",
          options: [
            { label: "Oo, may carrier pero walang data", next: "a-roaming" },
            { label: "Hindi / invalid SIM", next: "a-check" }
          ] },
        { id: "a-roaming", answer: "I-on ang data roaming para sa SIM line na iyon sa settings ng phone — karamihan sa eSIM profiles ay nangangailangan ng roaming para gumana sa ibang bansa. Tapos check-in sa provider na may active pang data ang profile." },
        { id: "a-check", answer: "Ilagay ulit ang card sa slot 1 at i-restart ang phone. Kung wala pa ring lumalabas na profile name, kadalasan ang problema ay nasa profile mismo (activation, expiry, carrier side) — hindi sa card." },
        { id: "q2", question: "Hindi pa rin gumagana?",
          options: [
            { label: "Oo", next: "a-boundary" }
          ] },
        { id: "a-boundary", answer: "Ang card namin ay pang-install lang ng eSIM profiles. Lahat ng tungkol sa profile — activation, data, expiry, PUK/PIN — ay galing sa mobile carrier na nagbenta, kaya kontakin muna sila kasama ang profile details sa app. Kung sinabi nilang okay ang profile, kontakin kami at susubukan ang card." }
      ]
    }
  ],

  videos: [],

  faq: [
    { id: "f-what", group: "getting-started", q: "Ano talaga ang ginagawa ng card na ito?",
      a: "Binibigyan nito ng eSIM function ang phone ninyo. Blangkong physical card na SIM-size ang card: bumili ng eSIM profiles sa provider, i-download sa card gamit ang app sa Android phone, at ang card ay gagana na parang normal na SIM na may number at data ng profile na iyon.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-blank", group: "getting-started", q: "Ang card ay dating blangko — sira ba ito?",
      a: "Hindi — sinadyang blangko ito. Kailangan munang mag-download ng eSIM profile sa card gamit ang app (sa Android phone). Ang card na may nakasulat na profile ay gumagana na eksakto na parang normal na SIM card.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-providers", group: "getting-started", q: "Saan makakabili ng eSIM profiles?",
      a: "Sa anumang provider na nagbebenta ng eSIM na may QR code. Dalawang comparison sites na ginagamit ng mga customer: esimdb.com at mobimatter.com. Pagkabili, padadalhan kayo ng QR code na i-scan sa app papunta sa card.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-app", group: "compat", q: "Anong app ang gagamitin ng card ko?",
      a: "9eSim Card: 9eSim app (i-install sa App Store / official site ng 9eSim). White eSIM Card: 9eSim LPA o EasyeUICC. I-install muna ang app at subukan — iyon na rin ang compatibility check.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-omapi", group: "compat", q: "Sabi ng app 'OMAPI not supported'",
      a: "Hindi supported ng phone ninyo ang eSIM writing tools, kaya hindi gagana ang card sa phone na ito. Halos lahat ng phone na labas pagkatapos ng 2023 ay supported. May workaround: gumamit lang ng sinusuportahang Android phone para sa write step, tapos ilipat ang card sa phone ninyo.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-slot", group: "compat", q: "Anong SIM slot ang dapat gamitin?",
      a: "Gamitin ang slot 1 (SIM 1). May mga dual-SIM phone — lalo na sa ilang iPhone at Android models — na sa SIM 1 lang suportado ang eSIM card; ang slot 2 ay nano SIM lang ang kaya. Bago bumili, pwedeng i-check ang specs ng phone o magtanong sa manufacturer.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-iphone", group: "writing", q: "Pwede ba akong mag-write o mag-switch ng profile diretso sa iPhone?",
      a: "Ang pag-install ng BAGONG profile ay hindi kaya sa iPhone sa lahat ng card namin — gawin ito sa Android phone gamit ang app. Ang pag-switch ng stored profiles sa iPhone: sa 9eSim Card, kaya sa STK (SIM Toolkit / Carrier Service) menu; sa White eSIM Card, hindi kaya — gumamit ng Android phone. Ang card na may nakasulat na profile ay gumagana sa iPhone na parang normal na SIM.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-switch", group: "writing", q: "Paano ako malilipat sa ibang stored profile?",
      a: "9eSim Card sa iPhone: buksan ang SIM Toolkit (Carrier Service) menu ng card at i-activate ang profile na gusto. Sa ibang kaso: ilagay ang card sa Android phone, buksan ang app, i-tap ang profile na gusto at gawing active, tapos ibalik ang card. Hindi kaya mag-switch sa iPhone ang White eSIM Card.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-capacity", group: "writing", q: "Ilang profile ang kaya ng card?",
      a: "9eSim Card: hanggang 10 profiles. White eSIM Card: hanggang 8. 5ber Card: hanggang 10. Hindi recommend na punuin ng maraming profiles ang isang card — ang tech products ay pwedeng masira sa maraming paggamit, at ang importanteng profile ay dapat sa sarili nitong card.",
      productIds: [], videoId: "", policy: false },
    { id: "f-puk", group: "profiles", q: "Saan makukuha ang PUK / PIN code ko?",
      a: "Sa mobile carrier na nagbenta sa iyo ng eSIM profile — sila ang may PUK code, at madalas makikita ito direkta sa app nila.",
      productIds: [], videoId: "", policy: false },
    { id: "f-support", group: "profiles", q: "Anong eSIM providers ang suportado?",
      a: "Gumagana ang card sa karamihan ng eSIM providers. Dalawang babala: HUWAG gamitin ang Redbull eSIM — sisirain nito ang card; at ang Redteago eSIM ay baka hindi suportado.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-issue", group: "profiles", q: "Ang profile ko ay walang data / may error / nag-expire",
      a: "Ang card namin ay pantulong lang mag-install ng eSIM profiles. Lahat ng tungkol sa profile mismo — activation, data, expiry, errors — ay dapat ihingi sa mobile carrier o provider na nagbenta. Kontakin sila kasama ang profile details na makikita sa app.",
      productIds: [], videoId: "", policy: false },
    { id: "f-5ber", group: "profiles", q: "May lumang 5ber card ako — pwede pa rin ba ito?",
      a: "Hindi na namin ibinebenta ang 5ber cards dahil may problema ang kumpanya ng 5ber. Kung kaya ninyong mag-log in sa 5ber app, gumagana pa rin ang lumang card. Para sa bagong card, pumili ng 9eSim Card o White eSIM Card.",
      productIds: ["p3"], videoId: "", policy: false }
  ]
};

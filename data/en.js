// ============================================================
// eSIM Card — English data file (esim site). Same id sets as fil.js!
// Source: PH菲律宾 knowledge base — Esim use (J13LwkRP) /
//         售后助手内容更新 (LQbtwXoV, 2026-08-14 双卡槽知识点). Snapshot 2026-10-13.
// ============================================================
window.PHC = {
  meta: {
    category: "eSIM Card",
    tagline: "Setup & troubleshooting",
    brand: "__FILL_ME__",
    policyNote: "This English version prevails."
  },

  ui: {
    searchPlaceholder: "Search this page",
    selectTitle: "Select Your eSIM Card First",
    problemsTitle: "What's happening?",
    factsTitle: "Model info",
    factsApp: "App / website",
    fact_use: "What it does",
    fact_switching: "Write & switch",
    fact_capacity: "Profiles the card can hold",
    videosTitle: "Video guides",
    faqTitle: "Common questions",
    backLabel: "← eSIM Card",
    contactTitle: "Contact us",
    emptySearch: "No match. Try another word, or ask us directly.",
    searchProducts: "Models",
    searchFaq: "Questions",
    searchWizard: "Problems",
    wizardContact: "Contact us about this",
    wizardRestart: "Start over",
    wizardBack: "Back",
    copyButton: "Copy my model & problem",
    copyDone: "Copied!",
    summaryPreviewTitle: "What will be copied:",
    emailAddrLabel: "Or copy this address:",
    selfServeHint: "Just want to see how it works? Select your eSIM card first — the card page has the guides.",
    footerContact: "Contact us",
    collapseAll: "Collapse all sections",
    expandAll: "Expand all sections",
    sectionNav: "Jump to section"
  },

  contact: {
    fastestTitle: "Replies fastest: the shop chat where you bought it",
    fastestNote: "Fastest way: chat with the shop in the app or platform where you bought it — the seller can see your order there, and usually replies within 24 hours.",
    fallbackNote: "No reply within 24 hours? Message us on Facebook Messenger or Viber — we reply within 48 hours.",
    // email channel not needed (user decision 2026-10-14) — engine hides it when empty
    emailAddress: "",
    emailHint: "We reply within 48 hours.",
    summaryTemplate: "Hi, need help with my device.\nModel: {product}\nIssue: {symptom}\nPage: {url}",
    summaryNoSymptomTemplate: "Hi, need help with my device.\nModel: {product}\nPage: {url}",
    summaryNoModelTemplate: "Hi, need help with my device.\nPage: {url}",
    summarySingleLineTemplate: "Hi, need help with my device. Model: {product}. Issue: {symptom}. Page: {url}",
    summarySingleLineNoModelTemplate: "Hi, need help with my device. Page: {url}",
    channels: [
      { id: "msgr", label: "Facebook", primary: true,
        hint: "Opens the app if you have it — we reply within 48 hours.",
        href: "https://www.facebook.com/profile.php?id=100092127695011" },
      { id: "viber", label: "Viber",
        hint: "Needs the Viber app on your phone — we reply within 48 hours.",
        href: "viber://chat?number=%2B639927391353",
        prefill: true,
        fallbackPage: "../go/viber/" }
    ]
  },

  products: [
    { id: "p1", name: "9eSim Card", short: "eSIM writer card · uses the 9eSim app", image: "images/p1.jpg", page: "p1/",
      facts: { app: "9eSim app — install from the App Store / 9eSim official site",
               use: "Turns a phone into an eSIM-capable phone: a blank card you write eSIM profiles onto",
               switching: "Android: install & switch profiles in the app. iPhone: cannot install new profiles, but can switch stored profiles through the STK (SIM Toolkit / Carrier Service) menu",
               capacity: "up to 10 profiles",
               note: "Before ordering: install the app on your phone and test it. If it shows 'OMAPI not supported', your phone does not work with this card." } },
    { id: "p2", name: "White eSIM Card", short: "eSIM writer card · 9eSim LPA or EasyeUICC app", image: "images/p2.jpg", page: "p2/",
      facts: { app: "9eSim LPA or EasyeUICC app",
               use: "Same idea: a blank card that holds eSIM profiles you download with the app",
               switching: "Android: install & switch profiles in the app. iPhone: use only — cannot install and cannot switch",
               capacity: "up to 8 profiles",
               note: "Before ordering: install the app and test. 'OMAPI not supported' means your phone is incompatible." } },
    { id: "p3", name: "5ber Card (old)", short: "discontinued — still usable if you can log in to the 5ber app", image: "images/p3.svg", page: "p3/",
      facts: { app: "5ber app (only if you can still log in)",
               use: "Legacy eSIM card. We do not sell it anymore — the 5ber company has problems, no more stock",
               switching: "Android: install & switch profiles. iPhone: use existing profiles only — cannot install and cannot switch",
               capacity: "up to 10 profiles",
               note: "If you can still log in to the 5ber app, your old card keeps working. For a new card, choose the 9eSim Card or the White eSIM Card." } }
  ],

  groups: [
    { id: "getting-started", label: "Getting started" },
    { id: "compat", label: "Compatibility & apps" },
    { id: "writing", label: "Writing & switching" },
    { id: "profiles", label: "eSIM profiles" }
  ],

  troubleshoot: [
    {
      id: "t-compat",
      symptom: "Will it work on my phone?",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Have you installed the app on your phone and opened it? (free — do this before ordering)",
          options: [
            { label: "Yes, I opened the app", next: "q2" },
            { label: "Not yet", next: "a-install" }
          ] },
        { id: "a-install", answer: "Install the app for your card first: 9eSim app for the 9eSim Card, or 9eSim LPA / EasyeUICC for the White card. Open it, then come back and check what it says." },
        { id: "q2", question: "What does the app show when you open it?",
          options: [
            { label: "'OMAPI not supported'", next: "a-no" },
            { label: "No error — the app works", next: "a-ok" }
          ] },
        { id: "a-no", answer: "That means your phone does not support the eSIM writing tools — this card will not work on it. Please do not order for this phone. Note: almost every phone made after 2023 is supported, so a spare or a friend's Android phone can often be used just for the writing step." },
        { id: "a-ok", answer: "Good — no error basically means your phone is supported. One more thing for dual-SIM phones: some models only support this card in slot 1 (SIM 1). Check your phone's specs or ask the manufacturer which slot supports eSIM." }
      ]
    },
    {
      id: "t-blank",
      symptom: "The card arrived empty / shows nothing",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Did you already buy an eSIM profile from a provider? (the card is blank — profiles are sold separately)",
          options: [
            { label: "No, what is a profile?", next: "a-profile" },
            { label: "Yes, I have a QR code", next: "q2" }
          ] },
        { id: "a-profile", answer: "Our card ships blank on purpose — it is the tool that holds eSIM profiles, not a SIM with data itself. Buy an eSIM profile from a provider such as esimdb.com or mobimatter.com (or any mobile carrier that sells eSIM). The provider sends you a QR code." },
        { id: "q2", question: "Did you download the profile onto the card with the app?",
          options: [
            { label: "Yes", next: "a-use" },
            { label: "No / I don't know how", next: "a-scan" }
          ] },
        { id: "a-scan", answer: "The card must be written on an ANDROID phone: insert the card into the Android phone, open the 9eSim (or LPA / EasyeUICC) app, scan the provider's QR code, and let the app download the profile onto the card. iPhone cannot write profiles onto this card. After writing, put the card into any phone and use it like a normal SIM." },
        { id: "a-use", answer: "Then the card works like a normal physical SIM — insert it into your phone (slot 1 on dual-SIM phones) and it should register on the network. If the phone does not react, run the 'Card not recognized' wizard." }
      ]
    },
    {
      id: "t-scan",
      symptom: "QR code won't scan / download fails",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Are you scanning with the app on an ANDROID phone?",
          options: [
            { label: "Yes", next: "q2" },
            { label: "No — I'm on iPhone", next: "a-android" }
          ] },
        { id: "a-android", answer: "Profiles can only be written on an Android phone with the app. Borrow any supported Android phone just for this one step: scan the QR, download the profile onto the card, then move the card back to your iPhone." },
        { id: "q2", question: "What goes wrong?",
          options: [
            { label: "App says 'OMAPI not supported'", next: "a-omapi" },
            { label: "The scan does nothing", next: "a-camera" },
            { label: "Error while downloading the profile", next: "a-provider" }
          ] },
        { id: "a-omapi", answer: "This Android phone does not support the writing tools. Try a different Android phone (any supported one, only for the writing step), then move the card to your own phone." },
        { id: "a-camera", answer: "Make sure the Android phone itself is on the internet. Clean the camera lens and hold the QR steady in good light — or save the QR as a picture and use the app's import-from-gallery option to read it." },
        { id: "a-provider", answer: "If the QR is rejected, expired, or already used, that is on the profile side — contact the provider or carrier that sold you the QR. Our card is the writing tool; profile problems are handled by the seller of the profile." }
      ]
    },
    {
      id: "t-detect",
      symptom: "Card not recognized in my phone",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Which SIM slot is the card in?",
          options: [
            { label: "Slot 1 (SIM 1)", next: "q2" },
            { label: "Slot 2 / not sure", next: "a-slot" }
          ] },
        { id: "a-slot", answer: "Move it to slot 1. Some dual-SIM phones — especially some iPhone and Android models — only support the eSIM card in SIM 1; slot 2 may only accept a normal nano SIM. If it works in slot 1, keep it there." },
        { id: "q2", question: "Does the card already hold a written profile?",
          options: [
            { label: "Yes, downloaded in the app", next: "a-reseat" },
            { label: "No, the card is still blank", next: "a-blank" }
          ] },
        { id: "a-blank", answer: "A blank card shows nothing — that is normal. It must be written first: use the app on an Android phone to scan your provider's QR and download a profile onto the card (see the 'Card arrived empty' wizard)." },
        { id: "a-reseat", answer: "Take the card out and reinsert it with the gold contacts facing the right way, then restart the phone. Still not recognized? Tell us your phone model and which slot you tried — we'll check from there." }
      ]
    },
    {
      id: "t-switch",
      symptom: "I can't switch profiles on iPhone",
      productIds: ["p2"],
      nodes: [
        { id: "q1", question: "What are you trying to do?",
          options: [
            { label: "Switch to another stored profile", next: "a-switch" },
            { label: "Add a new profile", next: "a-write-iphone" }
          ] },
        { id: "a-switch", answer: "That is expected with the White eSIM Card: iPhone cannot switch profiles. The card can store several profiles, but switching happens on Android. To switch: put the card into an Android phone, open the app, select the profile and make it active, then move the card back to the iPhone." },
        { id: "a-write-iphone", answer: "iPhone cannot write new profiles onto this card — only use the profile that is active. Do the writing on an Android phone with the app, then move the card back." }
      ]
    },
    {
      id: "t-stk",
      symptom: "How do I switch profiles on iPhone?",
      productIds: ["p1"],
      nodes: [
        { id: "q1", question: "Do you see a SIM Toolkit / Carrier Service app icon on your iPhone (appears after the card is inserted)?",
          options: [
            { label: "Yes, I see it", next: "a-stk" },
            { label: "No such icon", next: "a-android" }
          ] },
        { id: "a-stk", answer: "The 9eSim Card supports switching stored profiles directly on iPhone: open the SIM Toolkit (Carrier Service) menu from the card, choose the profile you want and activate it. Installing NEW profiles still requires an Android phone with the app." },
        { id: "a-android", answer: "No problem — you can always switch the classic way: put the card into an Android phone, open the 9eSim app, select the profile and make it active, then move the card back to the iPhone." }
      ]
    },
    {
      id: "t-noservice",
      symptom: "No signal or no data after writing",
      productIds: ["p1", "p2"],
      nodes: [
        { id: "q1", question: "Does the phone show the profile's carrier name?",
          options: [
            { label: "Yes, carrier shown but no data", next: "a-roaming" },
            { label: "No / invalid SIM", next: "a-check" }
          ] },
        { id: "a-roaming", answer: "Turn on data roaming for that SIM line in your phone settings — many eSIM profiles need roaming enabled to work abroad. Then check with your provider that the profile still has active data." },
        { id: "a-check", answer: "Reinsert the card in slot 1 and restart the phone. If the profile name never appears, the problem is usually the profile itself (activation, expiry, carrier side) — not the card." },
        { id: "q2", question: "Still stuck?",
          options: [
            { label: "Yes", next: "a-boundary" }
          ] },
        { id: "a-boundary", answer: "Our card only writes and carries eSIM profiles. Everything about the profile — activation, data, expiry, PUK/PIN — comes from the mobile carrier that sold it, so contact them first with the profile details from the app. If they confirm the profile is fine, contact us and we'll test the card." }
      ]
    }
  ],

  videos: [],

  faq: [
    { id: "f-what", group: "getting-started", q: "What does this card actually do?",
      a: "It gives your phone the eSIM function. The card is a blank physical SIM-size card: you buy eSIM profiles from a provider, download them onto the card with the app on an Android phone, and the card then works like a normal SIM with that profile's number and data.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-blank", group: "getting-started", q: "The card arrived empty — is it defective?",
      a: "No — it ships blank on purpose. You need to download an eSIM profile onto it first with the app (on an Android phone). A written card behaves exactly like a normal SIM card.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-providers", group: "getting-started", q: "Where can I buy eSIM profiles?",
      a: "From any provider that sells eSIM with a QR code. Two comparison sites that customers use: esimdb.com and mobimatter.com. After purchase the provider sends you a QR code, which the app scans onto the card.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-app", group: "compat", q: "Which app does my card use?",
      a: "9eSim Card: the 9eSim app (install through the App Store / 9eSim official site). White eSIM Card: 9eSim LPA or EasyeUICC. Install the app first and test — that is also your compatibility check.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-omapi", group: "compat", q: "The app says 'OMAPI not supported'",
      a: "Your phone does not support the eSIM writing tools, so the card will not work on this phone. Almost every phone made after 2023 is supported. Workaround: use any supported Android phone just for the writing step, then put the card into your own phone.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-slot", group: "compat", q: "Which SIM slot should I put the card in?",
      a: "Use slot 1 (SIM 1). Some dual-SIM phones — especially some iPhone and Android models — only support the eSIM card in SIM 1; slot 2 may only accept a normal nano SIM. Before buying, you can check your phone's specs or ask the manufacturer which slot supports eSIM.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-iphone", group: "writing", q: "Can I write or switch profiles directly on iPhone?",
      a: "Installing NEW profiles is not possible on iPhone for any of our cards — do that on an Android phone with the app. Switching stored profiles on iPhone: the 9eSim Card supports it through the STK (SIM Toolkit / Carrier Service) menu; the White eSIM Card cannot switch on iPhone — use an Android phone. A card with a written profile works in iPhone just like a normal SIM.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-switch", group: "writing", q: "How do I switch to another stored profile?",
      a: "9eSim Card on iPhone: open the SIM Toolkit (Carrier Service) menu from the card and activate the profile you want. Any other case: put the card into an Android phone, open the app, tap the profile you want and make it active, then move the card back. The White eSIM Card cannot switch on iPhone.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-capacity", group: "writing", q: "How many profiles can the card hold?",
      a: "9eSim Card: up to 10 profiles. White eSIM Card: up to 8. 5ber Card: up to 10. We do not recommend filling a single card with many profiles — tech products can wear out with use, and an important profile should be installed on its own card.",
      productIds: [], videoId: "", policy: false },
    { id: "f-puk", group: "profiles", q: "Where do I get my PUK / PIN code?",
      a: "From the mobile carrier that sold you the eSIM profile — they provide the PUK code, and it is often available directly in their app.",
      productIds: [], videoId: "", policy: false },
    { id: "f-support", group: "profiles", q: "Which eSIM providers are supported?",
      a: "The card works with most eSIM providers. Two warnings: do NOT use Redbull eSIM — it will damage the card; and Redteago eSIM may not be supported.",
      productIds: ["p1", "p2"], videoId: "", policy: false },
    { id: "f-issue", group: "profiles", q: "My profile has no data / shows an error / expired",
      a: "Our card only helps install eSIM profiles onto the card. Anything about the profile itself — activation, data, expiry, errors — must be handled with the mobile carrier or provider that sold you the profile. Contact them with the profile details shown in the app.",
      productIds: [], videoId: "", policy: false },
    { id: "f-5ber", group: "profiles", q: "I have an old 5ber card — can I still use it?",
      a: "We stopped selling 5ber cards because the 5ber company has problems. If you can still log in to the 5ber app, your old card keeps working. For a new card, choose the 9eSim Card or the White eSIM Card.",
      productIds: ["p3"], videoId: "", policy: false }
  ]
};

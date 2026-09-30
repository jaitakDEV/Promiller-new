/**
 * lib/i18n.ts
 * Self-contained EN/HI dictionary for the Atta Costing Calculator.
 *
 * Deliberately NOT using a machine-translation widget (e.g. Google
 * Translate): this app re-renders numbers and tables on every keystroke,
 * and letting a third-party script mutate the DOM in parallel with React
 * is a known source of "Failed to execute 'removeChild' on 'Node'" crashes.
 * A plain key → string lookup is fast, offline-safe, and fully under our
 * control for tone/accuracy in both languages.
 */

export type Lang = "en" | "hi";

export type DictKey = keyof typeof dictionaries.en;

export const dictionaries = {
  en: {
    // Header / hero
    brandSub: "Atta Cost Calculator",
    h1: "Atta Costing & Pricing Calculator",
    hSub: "This wheat cost is converted to true per-kg-atta cost using actual Atta Yield%, every byproduct income uses the right formula, and no input is left unused.",
    tipBanner:
      "New to this? Tap the small (i) button next to any field to see what it means and typical industry values.",

    // Stepper
    step1: "Wheat & Process",
    step2: "Yield",
    step3: "By-products",
    step4: "Packing & Market",
    step5: "Results",
    stepLabel: "Step",
    ofLabel: "of 5",

    // Buttons
    btnNext: "Next →",
    btnBack: "← Back",
    btnBackEdit: "← Back to edit",
    btnReset: "Reset",
    btnPrint: "Print",
    btnViewResults: "View Results →",

    // Step 1
    s1Title: "1. Wheat & Process Cost",
    s1Sub: "Per-kg (wheat) cost from procurement through milling",
    in_wheat: "Wheat Landing Price",
    in_unload: "Unloading",
    in_milling: "Cleaning/Milling Charges",
    in_loading: "Loading of Atta",
    guide_inWheat:
      "Enter the landed price of wheat at your mill gate — the mandi/procurement price plus freight and any handling charges. This is the base raw-material cost your entire costing is built on.",
    guide_inUnload:
      "Labour cost to unload wheat bags from the truck into your godown. Typically ₹0.10–₹0.30 per kg depending on local labour rates.",
    guide_inMilling:
      "Combined cleaning + grinding (milling) charges — covers electricity, machine wear and mill labour. Most mills work out to roughly ₹1.00–₹2.00 per kg of wheat, depending on plant size and power cost.",
    guide_inLoading:
      "Not the same as unloading wheat. This is the cost of loading finished, packed atta onto trucks for dispatch to distributors/retailers. Usually around ₹0.15–₹0.35 per kg.",
    sideTitle1: "What goes into Step 1?",
    sideSub1:
      'These four numbers make up your "cost base" per kg of wheat, before any yield or byproduct adjustment.',
    side1a: "Wheat price",
    side1b: "Unloading labour",
    side1c: "Cleaning/milling charges",
    side1d: "Loading of packed atta",
    side1e:
      'This total is your "Product Cost Base" — shown in the results table in Step 5.',

    // Step 2
    s2Title: "2. Yield (Wheat → Atta Conversion)",
    s2Sub:
      "100 kg of wheat never becomes 100 kg of atta — these losses and gains decide your real yield.",
    in_cleanLoss: "Cleaning Loss",
    in_grindLoss: "Grinding Loss",
    in_processLoss: "Process/Packing Loss",
    in_moistGain: "Moisture Gain",
    guide_inCleanLoss:
      "Weight lost while cleaning wheat — removing dust, stones, chaff and other foreign matter before grinding. Industry-standard cleaning loss is usually 1.5%–2.5% of wheat weight.",
    guide_inGrindLoss:
      "Small weight loss during the grinding process itself (dust extraction, spillage). Typically 0.3%–0.7%.",
    guide_inProcessLoss:
      "Minor loss during further processing and packing operations (sieving, transfer, weighing). Usually 0.2%–0.5%.",
    guide_inMoistGain:
      'Before grinding, wheat is "conditioned" by adding water and letting it rest — this is standard milling practice and adds back some weight. Typical moisture gain is 0.5%–1.5%. This is why final atta yield isn\'t simply "100% minus your losses" — this gain gets added back.',
    sideTitle2: "Yield formula",
    sideSub2: "Your true Atta Yield% is calculated live as:",
    sideFormula2:
      "100% − Cleaning − Grinding − Bran − Feed − Process + Moisture = Yield%",
    sideSub2b:
      "Bran and animal feed refraction are entered in the next step — you'll see the final Yield% bar in Step 5.",

    // Step 3
    s3Title: "3. Byproduct Income",
    s3Sub:
      "Bran, animal feed and empty-bag sales all reduce your effective cost per kg — enter what you actually recover.",
    in_bran: "Bran Refraction",
    in_branPrice: "Bran Sale Price",
    in_branPack: "Bran Packing Material",
    in_feedPct: "Animal Feed Refraction",
    in_animalFeed: "Animal Feed Sale Price",
    in_wheatQty: "Total Wheat Qty (batch)",
    in_boriQty: "Boris Sold (count)",
    in_bori50: "Sale Price per Bori",
    unitPcs: "pcs",
    guide_inBranPct:
      'Bran (chokar/bhoosi) refraction is the percentage of wheat weight that comes out as bran during milling. Market standard is usually 4%–6%, depending on how fine or "chakki-fresh" your atta is.',
    guide_inBranPrice:
      "The rate at which you sell bran to traders, dairies or feed mills. This varies by region and season — check your local mandi; commonly ₹18–₹25 per kg.",
    guide_inBranPack:
      "Cost of the bag/packing material used to pack bran for sale, per kg of bran. Typically ₹0.30–₹0.60 per kg.",
    guide_inFeedPct:
      "Percentage of wheat weight recovered as coarse animal-feed byproduct. Usually 1%–3%.",
    guide_inAnimalFeed:
      "Local market rate for the coarse animal-feed byproduct. Commonly ₹6–₹10 per kg — check with feed traders in your area.",
    guide_inWheatQty:
      "The total quantity of wheat you are costing for in this batch — for example, one day's or one month's production. Used to spread miscellaneous income (like bori/bag sales) across your production.",
    guide_inBoriQty:
      "Empty wheat sacks (boris) are usually resold as scrap after the wheat is emptied out. Enter how many you sold for this batch.",
    guide_inBori50:
      "The scrap/resale rate for a used wheat bori. Typically ₹8–₹12 per bag depending on condition and local buyers.",
    sideTitle3: "Why byproducts matter",
    sideSub3:
      "Every kg of wheat that doesn't become atta still has resale value. Getting these numbers right can swing your real cost by ₹1–₂ per kg atta.",
    side3a: "Bran income",
    side3aval: "Refraction × (price − pack cost)",
    side3b: "Feed income",
    side3bval: "Refraction × price",
    side3c: "Bori sale income",
    side3cval: "(count × price) ÷ batch qty",

    // Step 4
    packTitle: "4. Packing & Market Inputs",
    packSub: "Material cost and margins per pack size",
    legHdpe: "HDPE = woven plastic sack (bulk/wholesale)",
    legLd: "LD Pouch = printed poly pouch (retail)",
    pk_5hdpe: "5 kg HDPE",
    pk_5ld: "5 kg LD Pouch",
    pk_10hdpe: "10 kg HDPE",
    pk_10ld: "10 kg LD Pouch",
    pk_50hdpe: "50 kg HDPE",
    pk_inner: "Inner Material",
    pk_outer: "Outer Bag",
    pk_millMargin: "Mill Margin",
    pk_gst: "GST",
    pk_distMargin: "Distributor Margin",
    pk_retMargin: "Retailer Margin",
    pk_select: "Select Pack Size",
    guide_pk5hdpe:
      "Cost of a 5 kg woven HDPE sack from your bag supplier. HDPE sacks are the sturdy woven-plastic bags typically used for bulk or wholesale packs.",
    guide_pk5ld:
      "Cost of a 5 kg LD (laminated poly) pouch — the softer, printed retail pouch, typically used for branded counter sales.",
    guide_pk10hdpe: "Cost of a 10 kg woven HDPE sack from your supplier.",
    guide_pk10ld: "Cost of a 10 kg LD printed pouch from your supplier.",
    guide_pk50hdpe:
      "Cost of a 50 kg woven HDPE sack — the standard bulk/wholesale bag size.",
    guide_pkInner:
      "Cost of an optional inner poly liner used inside a pack, expressed per kg of atta (since bigger packs need proportionally more liner). Leave at 0 if you don't use one.",
    guide_pkOuter:
      "A fixed cost per pack for any outer wrap — e.g. an outer sleeve, carton portion, or stitching/thread — that applies the same regardless of pack size. Set to 0 if not applicable.",
    guide_pkMillMargin:
      "Your target profit margin at the mill level, added on top of your mill-gate cost. Typical mill margins in the industry run 8%–15%, depending on brand strength and market.",
    guide_pkGst:
      "The GST rate applicable on packaged branded atta. This is commonly 5%, but always confirm the current rate with your CA or the GST portal, as rates can change.",
    guide_pkDistMargin:
      "The margin a distributor takes before supplying to retailers. Common range is 3%–6%.",
    guide_pkRetMargin:
      "The retailer's margin added at the shop before the final consumer sale. Common range is 5%–10%.",
    guide_pkSelect:
      'Choose which pack size to highlight as your headline "Recommended Price" in the results — this doesn\'t affect the comparison table, which always shows all pack sizes.',
    sideTitle4: "Two different costs, don't mix them",
    sideSub4aBold: "Pack material",
    sideSub4a: "is the primary bag for that pack size.",
    sideSub4bBold: "Inner material",
    sideSub4bBold2: "outer bag",
    sideSub4b:
      "are additional, optional costs applied on top — set them to 0 if you don't use them.",

    // Step 5
    yieldTitle: "5. Atta Yield",
    yieldSub: "How much atta is actually produced from 100kg wheat",
    yieldTop: "Per 100kg wheat",
    yieldLegAtta: "Atta output",
    yieldLegLoss: "Bran+feed+loss",
    yieldFormula: "Yield formula",
    costTitle: "6. Calculated Costing",
    costSub: "First per kg wheat, then converted to per kg atta via yield",
    c_wheat: "Wheat Cost",
    c_unload: "Unloading",
    c_milling: "Cleaning/Milling Charges",
    c_loading: "Loading",
    c_base: "Product Cost Base (₹/kg wheat)",
    c_branOnly: "Bran Income (net, less)",
    c_feedIncome: "Animal Feed Income (less)",
    c_otherIncome: "Other Income — Bori Sale (less)",
    c_gateWheat: "Mill Gate Cost (₹/kg wheat)",
    c_gateAtta: "Mill Gate Cost (₹/kg atta — yield applied)",
    c_margin: "Mill Margin",
    c_sale: "Sale Price by Mill / kg atta",
    finalTitle: "7. Final Pack Price",
    finalSub: "Compare all pack sizes — selected pack is highlighted",
    ft_pack: "Pack",
    ft_material: "Material",
    ft_before: "Before Tax",
    ft_gst: "GST",
    ft_exfactory: "Ex-Factory",
    ft_mrp: "MRP",
    recLbl: "Recommended Price (selected pack",
    millGateLbl: "Mill Gate Cost / kg atta",
    millMarginLbl: "Mill Margin",

    // Footer
    aboutTitle: "About this calculator",
    aboutText:
      "This tool converts your wheat procurement cost into a true per-kg atta cost using your actual milling yield, so every byproduct income (bran, animal feed, bori sale) is accounted for with the correct formula. Update your rates and margins here whenever they change — figures are not pulled from any live market feed.",
  },

  hi: {
    brandSub: "आटा मूल्य कैलकुलेटर",
    h1: "आटा लागत एवं मूल्य कैलकुलेटर",
    hSub: "यह गेहूं की लागत को असली Atta Yield% के आधार पर प्रति किलो आटा लागत में बदला जाता है, हर बाय-प्रोडक्ट इनकम सही formula से जुड़ी है, कोई भी इनपुट अनदेखा नहीं होता।",
    tipBanner:
      "इस क्षेत्र में नए हैं? किसी भी फ़ील्ड के बगल में (i) बटन दबाएं — उसका मतलब और सामान्य बाज़ार मूल्य देखने के लिए।",

    step1: "गेहूं व प्रोसेस",
    step2: "यील्ड",
    step3: "बायप्रोडक्ट",
    step4: "पैकिंग व बाज़ार",
    step5: "परिणाम",
    stepLabel: "चरण",
    ofLabel: "में से 5",

    btnNext: "आगे →",
    btnBack: "← पीछे",
    btnBackEdit: "← संपादित करें",
    btnReset: "रीसेट करें",
    btnPrint: "प्रिंट करें",
    btnViewResults: "परिणाम देखें →",

    s1Title: "1. गेहूं व प्रोसेस लागत",
    s1Sub: "गेहूं खरीद से लेकर मिलिंग तक की प्रति-किलो (गेहूं) लागत",
    in_wheat: "गेहूं लैंडिंग प्राइस",
    in_unload: "अनलोडिंग",
    in_milling: "क्लीनिंग/मिलिंग खर्च",
    in_loading: "आटा लोडिंग",
    guide_inWheat:
      "अपनी मिल गेट पर पहुंचे गेहूं का वास्तविक भाव दर्ज करें — मंडी भाव + भाड़ा व अन्य हैंडलिंग खर्च मिलाकर। यही आपकी पूरी कॉस्टिंग का आधार है।",
    guide_inUnload:
      "ट्रक से गेहूं को गोदाम में उतारने की मजदूरी। आमतौर पर ₹0.10–₹0.30 प्रति किलो, इलाके की मजदूरी दर पर निर्भर।",
    guide_inMilling:
      "क्लीनिंग + पिसाई (मिलिंग) का कुल खर्च — बिजली, मशीन घिसाव और मिल मजदूरी शामिल। ज्यादातर मिलों में यह ₹1.00–₹2.00 प्रति किलो गेहूं के आसपास आता है।",
    guide_inLoading:
      "यह गेहूं उतारने से अलग है — यह तैयार, पैक किए गए आटे को डिस्पैच के लिए ट्रक में लोड करने की लागत है। आमतौर पर ₹0.15–₹0.35 प्रति किलो।",
    sideTitle1: "स्टेप 1 में क्या शामिल है?",
    sideSub1:
      'ये चार आंकड़े आपकी प्रति किलो गेहूं "कॉस्ट बेस" बनाते हैं, यील्ड या बायप्रोडक्ट समायोजन से पहले।',
    side1a: "गेहूं भाव",
    side1b: "अनलोडिंग मजदूरी",
    side1c: "क्लीनिंग/मिलिंग खर्च",
    side1d: "पैक्ड आटे की लोडिंग",
    side1e:
      'यह कुल आपका "Product Cost Base" है — स्टेप 5 की परिणाम तालिका में दिखेगा।',

    s2Title: "2. यील्ड (गेहूं → आटा रूपांतरण)",
    s2Sub:
      "100 किलो गेहूं कभी भी 100 किलो आटा नहीं बनता — ये लॉस व वृद्धि आपकी असली यील्ड तय करते हैं।",
    in_cleanLoss: "क्लीनिंग लॉस",
    in_grindLoss: "ग्राइंडिंग लॉस",
    in_processLoss: "प्रोसेस/पैकिंग लॉस",
    in_moistGain: "नमी वृद्धि",
    guide_inCleanLoss:
      "गेहूं की सफाई (धूल, कंकड़, भूसा हटाने) के दौरान होने वाला वज़न घटाव। सामान्यतः 1.5%–2.5%।",
    guide_inGrindLoss:
      "पिसाई प्रक्रिया के दौरान होने वाला मामूली नुकसान (धूल, बिखराव)। सामान्यतः 0.3%–0.7%।",
    guide_inProcessLoss:
      "आगे की प्रोसेसिंग व पैकिंग के दौरान होने वाला छोटा नुकसान। सामान्यतः 0.2%–0.5%।",
    guide_inMoistGain:
      'पिसाई से पहले गेहूं में पानी मिलाकर "कंडीशनिंग" की जाती है — यह सामान्य मिलिंग प्रक्रिया है और वज़न वापस बढ़ा देती है। सामान्यतः 0.5%–1.5% नमी वृद्धि होती है। इसीलिए फाइनल यील्ड सिर्फ "100% माइनस लॉस" नहीं होती — यह वृद्धि वापस जोड़ी जाती है।',
    sideTitle2: "यील्ड फॉर्मूला",
    sideSub2: "आपका असली Atta Yield% लाइव इस तरह निकलता है:",
    sideFormula2:
      "100% − क्लीनिंग − ग्राइंडिंग − भूसी − फ़ीड − प्रोसेस + नमी = यील्ड%",
    sideSub2b:
      "भूसी व एनिमल फ़ीड अपवर्तन अगले स्टेप में भरे जाते हैं — फाइनल यील्ड% बार स्टेप 5 में दिखेगा।",

    s3Title: "3. बाय-प्रोडक्ट इनकम",
    s3Sub:
      "भूसी, एनिमल फ़ीड और खाली बोरी बिक्री — ये सभी आपकी प्रति किलो असल लागत घटाते हैं, जो वास्तव में मिलता है वही भरें।",
    in_bran: "भूसी अपवर्तन",
    in_branPrice: "भूसी बिक्री दर",
    in_branPack: "भूसी पैकिंग मटेरियल",
    in_feedPct: "एनिमल फ़ीड अपवर्तन",
    in_animalFeed: "एनिमल फ़ीड बिक्री दर",
    in_wheatQty: "कुल गेहूं मात्रा (बैच)",
    in_boriQty: "बिकी बोरी की संख्या",
    in_bori50: "बोरी बिक्री दर",
    unitPcs: "नग",
    guide_inBranPct:
      "भूसी (चोकर) अपवर्तन यानी पिसाई में गेहूं के वज़न का कितना हिस्सा भूसी के रूप में निकलता है। बाज़ार मानक सामान्यतः 4%–6% है, आटे की क्वालिटी पर निर्भर।",
    guide_inBranPrice:
      "भूसी व्यापारियों/डेयरी को बेचने की दर। इलाके व सीज़न अनुसार बदलती है — आमतौर पर ₹18–₹25 प्रति किलो।",
    guide_inBranPack:
      "भूसी बेचने के लिए इस्तेमाल होने वाली बोरी/पैकिंग की प्रति किलो भूसी लागत। सामान्यतः ₹0.30–₹0.60 प्रति किलो।",
    guide_inFeedPct:
      "एनिमल फ़ीड (मोटा चोकर) के रूप में निकलने वाला हिस्सा। सामान्यतः 1%–3%।",
    guide_inAnimalFeed:
      "एनिमल फ़ीड बायप्रोडक्ट का स्थानीय बाज़ार भाव। आमतौर पर ₹6–₹10 प्रति किलो।",
    guide_inWheatQty:
      "जिस बैच की कॉस्टिंग कर रहे हैं उसकी कुल गेहूं मात्रा — जैसे एक दिन या एक महीने का उत्पादन। इससे बोरी बिक्री जैसी अन्य आय को प्रति किलो में बांटा जाता है।",
    guide_inBoriQty:
      "खाली गेहूं बोरियां आमतौर पर स्क्रैप के रूप में बेची जाती हैं। इस बैच में कितनी बोरी बेची, वह दर्ज करें।",
    guide_inBori50:
      "पुरानी बोरी का स्क्रैप भाव। हालत व खरीदार अनुसार सामान्यतः ₹8–₹12 प्रति नग।",
    sideTitle3: "बायप्रोडक्ट क्यों ज़रूरी हैं",
    sideSub3:
      "गेहूं का हर वो हिस्सा जो आटा नहीं बनता, उसका भी बाज़ार मूल्य होता है। ये आंकड़े सही रखने से प्रति किलो आटे की असल लागत ₹1–₂ तक बदल सकती है।",
    side3a: "भूसी इनकम",
    side3aval: "अपवर्तन × (भाव − पैकिंग लागत)",
    side3b: "फ़ीड इनकम",
    side3bval: "अपवर्तन × भाव",
    side3c: "बोरी बिक्री इनकम",
    side3cval: "(संख्या × भाव) ÷ बैच मात्रा",

    packTitle: "4. पैकिंग एवं बाज़ार इनपुट",
    packSub: "हर पैक साइज़ की मटेरियल लागत और मार्जिन",
    legHdpe: "HDPE = वोवन प्लास्टिक बोरी (थोक)",
    legLd: "LD पाउच = प्रिंटेड पॉली पाउच (रिटेल)",
    pk_5hdpe: "5 kg HDPE",
    pk_5ld: "5 kg LD Pouch",
    pk_10hdpe: "10 kg HDPE",
    pk_10ld: "10 kg LD Pouch",
    pk_50hdpe: "50 kg HDPE",
    pk_inner: "इनर मटेरियल",
    pk_outer: "आउटर बैग",
    pk_millMargin: "मिल मार्जिन",
    pk_gst: "GST",
    pk_distMargin: "डिस्ट्रीब्यूटर मार्जिन",
    pk_retMargin: "रिटेलर मार्जिन",
    pk_select: "पैक साइज़ चुनें",
    guide_pk5hdpe:
      "5 किलो के वोवन HDPE बैग की लागत — अपने सप्लायर से लें। HDPE मजबूत वोवन-प्लास्टिक बैग होता है, थोक/होलसेल पैक में इस्तेमाल होता है।",
    guide_pk5ld:
      "5 किलो के LD (लैमिनेटेड पॉली) पाउच की लागत — यह मुलायम, प्रिंटेड रिटेल पाउच होता है, जो ब्रांडेड काउंटर सेल में इस्तेमाल होता है।",
    guide_pk10hdpe: "10 किलो के वोवन HDPE बैग की लागत, अपने सप्लायर से लें।",
    guide_pk10ld: "10 किलो के LD प्रिंटेड पाउच की लागत।",
    guide_pk50hdpe:
      "50 किलो के वोवन HDPE बैग की लागत — यह मानक थोक/होलसेल साइज़ है।",
    guide_pkInner:
      "पैक के अंदर इस्तेमाल होने वाली वैकल्पिक इनर पॉली लाइनर की लागत, प्रति किलो आटा। इनर इस्तेमाल न करें तो 0 रखें।",
    guide_pkOuter:
      "हर पैक पर लगने वाली फिक्स्ड आउटर खर्च — जैसे आउटर स्लीव, कार्टन हिस्सा या धागा/टेप — यह पैक साइज़ से स्वतंत्र होती है। लागू न हो तो 0 रखें।",
    guide_pkMillMargin:
      "मिल स्तर पर आपका लक्षित मुनाफा मार्जिन, मिल-गेट लागत के ऊपर जोड़ा जाता है। सामान्यतः 8%–15%, ब्रांड व बाज़ार पर निर्भर।",
    guide_pkGst:
      "पैक किए ब्रांडेड आटे पर लागू GST दर। आमतौर पर 5% होती है, पर अपने CA या GST पोर्टल से मौजूदा दर ज़रूर जांच लें।",
    guide_pkDistMargin:
      "डिस्ट्रीब्यूटर द्वारा रिटेलर तक पहुंचाने से पहले लिया जाने वाला मार्जिन। सामान्यतः 3%–6%।",
    guide_pkRetMargin:
      "रिटेलर द्वारा अंतिम ग्राहक को बेचने से पहले जोड़ा गया मार्जिन। सामान्यतः 5%–10%।",
    guide_pkSelect:
      'नतीजों में हाइलाइट होने वाला "अनुशंसित मूल्य" किस पैक साइज़ के लिए दिखाना है, चुनें — तुलना तालिका पर असर नहीं पड़ता, वह हमेशा सभी पैक दिखाती है।',
    sideTitle4: "दो अलग लागतें, मिलाएं नहीं",
    sideSub4aBold: "पैक मटेरियल",
    sideSub4a: "उस पैक साइज़ का मुख्य बैग है।",
    sideSub4bBold: "इनर मटेरियल",
    sideSub4bBold2: "आउटर बैग",
    sideSub4b:
      "अतिरिक्त, वैकल्पिक लागतें हैं जो ऊपर से जुड़ती हैं — इस्तेमाल न करें तो 0 रखें।",

    yieldTitle: "5. Atta Yield",
    yieldSub: "100kg गेहूं से कितना आटा असल में बनता है",
    yieldTop: "प्रति 100kg गेहूं",
    yieldLegAtta: "आटा उत्पादन",
    yieldLegLoss: "भूसी+फ़ीड+लॉस",
    yieldFormula: "यील्ड फॉर्मूला",
    costTitle: "6. गणना की गई लागत",
    costSub: "पहले प्रति किलो गेहूं, फिर यील्ड से प्रति किलो आटा में बदला गया",
    c_wheat: "गेहूं लागत",
    c_unload: "अनलोडिंग",
    c_milling: "क्लीनिंग/मिलिंग खर्च",
    c_loading: "लोडिंग",
    c_base: "Product Cost Base (₹/kg गेहूं)",
    c_branOnly: "भूसी इनकम (नेट, घटाएं)",
    c_feedIncome: "एनिमल फ़ीड इनकम (घटाएं)",
    c_otherIncome: "अन्य इनकम — बोरी बिक्री (घटाएं)",
    c_gateWheat: "मिल-गेट लागत (₹/kg गेहूं)",
    c_gateAtta: "मिल-गेट लागत (₹/kg आटा — यील्ड लागू)",
    c_margin: "मिल मार्जिन",
    c_sale: "मिल बिक्री मूल्य / kg आटा",
    finalTitle: "7. फाइनल पैक प्राइस",
    finalSub: "सभी पैक साइज़ की तुलना — चुना गया पैक हाइलाइट है",
    ft_pack: "पैक",
    ft_material: "मटेरियल",
    ft_before: "टैक्स-पूर्व",
    ft_gst: "GST",
    ft_exfactory: "एक्स-फैक्ट्री",
    ft_mrp: "MRP",
    recLbl: "अनुशंसित मूल्य (चयनित पैक",
    millGateLbl: "मिल-गेट लागत / kg आटा",
    millMarginLbl: "मिल मार्जिन",

    aboutTitle: "इस कैलकुलेटर के बारे में",
    aboutText:
      "यह टूल आपकी गेहूं खरीद लागत को असली मिलिंग यील्ड के आधार पर प्रति किलो आटा लागत में बदलता है, ताकि हर बायप्रोडक्ट आय (भूसी, एनिमल फ़ीड, बोरी बिक्री) सही फॉर्मूले से जुड़े। भाव व मार्जिन बदलने पर यहां मैन्युअल रूप से अपडेट करें — आंकड़े किसी लाइव बाज़ार फ़ीड से नहीं आते।",
  },
} as const;

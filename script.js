const elements = {
    type: document.getElementById("sentenceType"),
    subj: document.getElementById("subject"),
    pred: document.getElementById("predicate"),
    verb: document.getElementById("verb"),
    prep: document.getElementById("prep"),
    obj: document.getElementById("object"),
    tense: document.getElementById("tense"),
    mode: document.getElementById("mode"),
    arOut: document.getElementById("ar-out"),
    enOut: document.getElementById("en-out"),
    btn: document.getElementById("btnGenerate"),
    nominalFields: document.querySelectorAll(".nominal-only"),
    verbalFields: document.querySelectorAll(".verbal-only")
};

// --- 1. SUBJECTS DICTIONARY ---
const subjects = {
    huwa:      { en: "He", ar: "هُوَ", p: "3sm", n: "s" },
    huma_m:    { en: "They (2m)", ar: "هُمَا", p: "3dm", n: "d" },
    hum:       { en: "They (m)", ar: "هُمْ", p: "3pm", n: "p" },
    hiya:      { en: "She", ar: "هِيَ", p: "3sf", n: "s" },
    huma_f:    { en: "They (2f)", ar: "هُمَا", p: "3df", n: "d" },
    hunna:     { en: "They (f)", ar: "هُنَّ", p: "3pf", n: "p" },
    anta:      { en: "You (m)", ar: "أَنْتَ", p: "2sm", n: "s" },
    antuma_m:  { en: "You (2m)", ar: "أَنْتُمَا", p: "2dm", n: "d" },
    antum:     { en: "You (m-pl)", ar: "أَنْتُمْ", p: "2pm", n: "p" },
    anti:      { en: "You (f)", ar: "أَنْتِ", p: "2sf", n: "s" },
    antuma_f:  { en: "You (2f)", ar: "أَنْتُمَا", p: "2df", n: "d" },
    antunna:   { en: "You (f-pl)", ar: "أَنْتُنَّ", p: "2pf", n: "p" },
    ana:       { en: "I", ar: "أَنَا", p: "1s", n: "s" },
    nahnu:     { en: "We", ar: "نَحْنُ", p: "1p", n: "p" },
    anis:      { en: "Anis", ar: "أَنِيسٌ", p: "3sm", n: "s" }
};

// --- 2. VERBS DICTIONARY ---
const verbs = {
    dhahaba: { en: "go", pastEn: "went", part: "gone", ar: {
        past: { "3sm":"ذَهَبَ", "3dm":"ذَهَبَا", "3pm":"ذَهَبُوا", "3sf":"ذَهَبَتْ", "3df":"ذَهَبَتَا", "3pf":"ذَهَبْنَ", "2sm":"ذَهَبْتَ", "2dm":"ذَهَبْتُمَا", "2pm":"ذَهَبْتُمْ", "2sf":"ذَهَبْتِ", "2df":"ذَهَبْتُمَا", "2pf":"ذَهَبْتُنَّ", "1s":"ذَهَبْتُ", "1p":"ذَهَبْنَا" },
        present: { "3sm":"يَذْهَبُ", "3dm":"يَذْهَبَانِ", "3pm":"يَذْهَبُونَ", "3sf":"تَذْهَبُ", "3df":"تَذْهَبَانِ", "3pf":"يَذْهَبْنَ", "2sm":"تَذْهَبُ", "2dm":"تَذْهَبَانِ", "2pm":"تَذْهَبُونَ", "2sf":"تَذْهَبِينَ", "2df":"تَذْهَبَانِ", "2pf":"تَذْهَبْنَ", "1s":"أَذْهَبُ", "1p":"نَذْهَبُ" },
        order: { "2sm":"اِذْهَبْ", "2sf":"اِذْهَبِي", "2dm":"اِذْهَبَا", "2df":"اِذْهَبَا", "2pm":"اِذْهَبُوا", "2pf":"اِذْهَبْنَ" }
    }},
    nasara: { en: "help", pastEn: "helped", part: "helped", ar: {
        past: { "3sm":"نَصَرَ", "3dm":"نَصَرَا", "3pm":"نَصَرُوا", "3sf":"نَصَرَتْ", "3df":"نَصَرَتَا", "3pf":"نَصَرْنَ", "2sm":"نَصَرْتَ", "2dm":"نَصَرْتُمَا", "2pm":"نَصَرْتُمْ", "2sf":"نَصَرْتِ", "2df":"نَصَرْتُمَا", "2pf":"نَصَرْتُنَّ", "1s":"نَصَرْتُ", "1p":"نَصَرْنَا" },
        present: { "3sm":"يَنْصُرُ", "3dm":"يَنْصُرَانِ", "3pm":"يَنْصُرُونَ", "3sf":"تَنْصُرُ", "3df":"تَنْصُرَانِ", "3pf":"يَنْصُرْنَ", "2sm":"تَنْصُرُ", "2dm":"تَنْصُرَانِ", "2pm":"تَنْصُرُونَ", "2sf":"تَنْصُرِينَ", "2df":"تَنْصُرَانِ", "2pf":"تَنْصُرْنَ", "1s":"أَنْصُرُ", "1p":"نَنْصُرُ" },
        order: { "2sm":"اُنْصُرْ", "2sf":"اُنْصُرِي", "2dm":"اُنْصُرَا", "2df":"اُنْصُرَا", "2pm":"اُنْصُرُوا", "2pf":"اُنْصُرْنَ" }
    }},
    akala: { en: "eat", pastEn: "ate", part: "eaten", ar: {
        past: { "3sm":"أَكَلَ", "3dm":"أَكَلَا", "3pm":"أَكَلُوا", "3sf":"أَكَلَتْ", "3df":"أَكَلَتَا", "3pf":"أَكَلْنَ", "2sm":"أَكَلْتَ", "2dm":"أَكَلْتُمَا", "2pm":"أَكَلْتُمْ", "2sf":"أَكَلْتِ", "2df":"أَكَلْتُمَا", "2pf":"أَكَلْتُنَّ", "1s":"أَكَلْتُ", "1p":"أَكَلْنَا" },
        present: { "3sm":"يَأْكُلُ", "3dm":"يَأْكُلَانِ", "3pm":"يَأْكُلُونَ", "3sf":"تَأْكُلُ", "3df":"تَأْكُلَانِ", "3pf":"يَأْكُلْنَ", "2sm":"تَأْكُلُ", "2dm":"تَأْكُلَانِ", "2pm":"تَأْكُلُونَ", "2sf":"تَأْكُلِينَ", "2df":"تَأْكُلَانِ", "2pf":"تَأْكُلْنَ", "1s":"آكُلُ", "1p":"نَأْكُلُ" },
        order: { "2sm":"كُلْ", "2sf":"كُلِي", "2dm":"كُلَا", "2df":"كُلَا", "2pm":"كُلُوا", "2pf":"كُلْنَ" }
    }},
    kataba: { en: "write", pastEn: "wrote", part: "written", ar: {
        past: { "3sm":"كَتَبَ", "3dm":"كَتَبَا", "3pm":"كَتَبُوا", "3sf":"كَتَبَتْ", "3df":"كَتَبَتَا", "3pf":"كَتَبْنَ", "2sm":"كَتَبْتَ", "2dm":"كَتَبْتُمَا", "2pm":"كَتَبْتُمْ", "2sf":"كَتَبْتِ", "2df":"كَتَبْتُمَا", "2pf":"كَتَبْتُنَّ", "1s":"كَتَبْتُ", "1p":"كَتَبْنَا" },
        present: { "3sm":"يَكْتُبُ", "3dm":"يَكْتُبَانِ", "3pm":"يَكْتُبُونَ", "3sf":"تَكْتُبُ", "3df":"تَكْتُبَانِ", "3pf":"يَكْتُبْنَ", "2sm":"تَكْتُبُ", "2dm":"تَكْتُبَانِ", "2pm":"تَكْتُبُونَ", "2sf":"تَكْتُبِينَ", "2df":"تَكْتُبَانِ", "2pf":"تَكْتُبْنَ", "1s":"أكْتُبُ", "1p":"نَكْتُبُ" },
        order: { "2sm":"اُكْتُبْ", "2sf":"اُكْتُبِي", "2dm":"اُكْتُبَا", "2df":"اُكْتُبَا", "2pm":"اُكْتُبُوا", "2pf":"اُكْتُبْنَ" }
    }},
    shariba: { en: "drink", pastEn: "drank", part: "drunk", ar: {
        past: { "3sm":"شَرِبَ", "3dm":"شَرِبَا", "3pm":"شَرِبُوا", "3sf":"شَرِبَتْ", "3df":"شَرِبَتَا", "3pf":"شَرِبْنَ", "2sm":"شَرِبْتَ", "2dm":"شَرِبْتُمَا", "2pm":"شَرِبْتُمْ", "2sf":"شَرِبْتِ", "2df":"شَرِبْتُمَا", "2pf":"شَرِبْتُنَّ", "1s":"شَرِبْتُ", "1p":"شَرِبْنَا" },
        present: { "3sm":"يَشْرَبُ", "3dm":"يَشْرَبَانِ", "3pm":"يَشْرَبُونَ", "3sf":"تَشْرَبُ", "3df":"تَشْرَبَانِ", "3pf":"يَشْرَبْنَ", "2sm":"تَسْرَبُ", "2dm":"تَسْرَبَانِ", "2pm":"تَسْرَبُونَ", "2sf":"تَسْرَبِينَ", "2df":"تَسْرَبَانِ", "2pf":"تَسْرَبْنَ", "1s":"أَشْرَبُ", "1p":"نَشْرَبُ" },
        order: { "2sm":"اِشْرَبْ", "2sf":"اِشْرَبِي", "2dm":"اِشْرَبَا", "2df":"اِشْرَبَا", "2pm":"اِشْرَبُوا", "2pf":"اِشْرَبْنَ" }
    }},
    fataha: { en: "open", pastEn: "opened", part: "opened", ar: {
        past: { "3sm":"فَتَحَ", "3dm":"فَتَحَا", "3pm":"فَتَحُوا", "3sf":"فَتَحَتْ", "3df":"فَتَحَتَا", "3pf":"فَتَحْنَ", "2sm":"فَتَحْتَ", "2dm":"فَتَحْتُمَا", "2pm":"فَتَحْتُمْ", "2sf":"فَتَحْتِ", "2df":"فَتَحْتُمَا", "2pf":"فَتَحْتُنَّ", "1s":"فَتَحْتُ", "1p":"فَتَحْنَا" },
        present: { "3sm":"يَفْتَحُ", "3dm":"يَفْتَحَانِ", "3pm":"يَفْتَحُونَ", "3sf":"تَفْتَحُ", "3df":"تَفْتَحَانِ", "3pf":"يَفْتَحْنَ", "2sm":"تَفْتَحُ", "2dm":"تَفْتَحَانِ", "2pm":"تَفْتَحُونَ", "2sf":"تَفْتَحِينَ", "2df":"تَفْتَحَانِ", "2pf":"تَفْتَحْنَ", "1s":"أَفْتَحُ", "1p":"نَفْتَحُ" },
        order: { "2sm":"اِفْتَحْ", "2sf":"اِفْتَحِي", "2dm":"اِفْتَحَا", "2df":"اِفْتَحَا", "2pm":"اِفْتَحُوا", "2pf":"اِفْتَحْنَ" }
    }},
    ghasala: { en: "wash", pastEn: "washed", part: "washed", ar: {
        past: { "3sm":"غَسَلَ", "3dm":"غَسَلَا", "3pm":"غَسَلُوا", "3sf":"غَسَلَتْ", "3df":"غَسَلَتَا", "3pf":"غَسَلْنَ", "2sm":"غَسَلْتَ", "2dm":"غَسَلْتُمَا", "2pm":"غَسَلْتُمْ", "2sf":"غَسَلْتِ", "2df":"غَسَلْتُمَا", "2pf":"غَسَلْتُنَّ", "1s":"غَسَلْتُ", "1p":"غَسَلْنَا" },
        present: { "3sm":"يَغْسِلُ", "3dm":"يَغْسِلَانِ", "3pm":"يَغْسِلُونَ", "3sf":"تَغْسِلُ", "3df":"تَغْسِلَانِ", "3pf":"يَغْسِلْنَ", "2sm":"تَغْسِلُ", "2dm":"تَغْسِلَانِ", "2pm":"تَغْسِلُونَ", "2sf":"تَغْسِلِينَ", "2df":"تَغْسِلَانِ", "2pf":"تَغْسِلْنَ", "1s":"أَغْسِلُ", "1p":"نَغْسِلُ" },
        order: { "2sm":"اِغْسِلْ", "2sf":"اِغْسِلِي", "2dm":"اِغْسِلَا", "2df":"اِغْسِلَا", "2pm":"اِغْسِلُوا", "2pf":"اِغْسِلْنَ" }
    }},
    darasa: { en: "study", pastEn: "studied", part: "studied", ar: {
        past: { "3sm":"دَرَسَ", "3dm":"دَرَسَا", "3pm":"دَرَسُوا", "3sf":"دَرَسَتْ", "3df":"دَرَسَتَا", "3pf":"دَرَسْنَ", "2sm":"دَرَسْتَ", "2dm":"دَرَسْتُمَا", "2pm":"دَرَسْتُمْ", "2sf":"دَرَسْتِ", "2df":"دَرَسْتُمَا", "2pf":"دَرَسْتُنَّ", "1s":"دَرَسْتُ", "1p":"دَرَسْنَا" },
        present: { "3sm":"يَدْرُسُ", "3dm":"يَدْرُسَانِ", "3pm":"يَدْرُسُونَ", "3sf":"تَدْرُسُ", "3df":"تَدْرُسَانِ", "3pf":"يَدْرُسْنَ", "2sm":"تَدْرُسُ", "2dm":"تَدْرُسَانِ", "2pm":"تَدْرُسُونَ", "2sf":"تَدْرُسِينَ", "2df":"تَدْرُسَانِ", "2pf":"تَدْرُسْنَ", "1s":"أَدْرُسُ", "1p":"نَدْرُسُ" },
        order: { "2sm":"اُدْرُسْ", "2sf":"اُدْرُسِي", "2dm":"اُدْرُسَا", "2df":"اُدْرُسَا", "2pm":"اُدْرُسُوا", "2pf":"اُدْرُسْنَ" }
    }},
    labisa: { en: "wear", pastEn: "wore", part: "worn", ar: {
        past: { "3sm":"لَبِسَ", "3dm":"لَبِسَا", "3pm":"لَبِسُوا", "3sf":"لَبِسَتْ", "3df":"لَبِسَتَا", "3pf":"لَبِسْنَ", "2sm":"لَبِسْتَ", "2dm":"لَبِسْتُمَا", "2pm":"لَبِسْتُمْ", "2sf":"لَبِسْتِ", "2df":"لَبِسْتُمَا", "2pf":"لَبِسْتُنَّ", "1s":"لَبِسْتُ", "1p":"لَبِسْنَا" },
        present: { "3sm":"يَلْبَسُ", "3dm":"يَلْبَسَانِ", "3pm":"يَلْبَسُونَ", "3sf":"تَلْبَسُ", "3df":"تَلْبَسَانِ", "3pf":"يَلْبَسْنَ", "2sm":"تَلْبَسُ", "2dm":"تَلْبَسَانِ", "2pm":"تَلْبَسُونَ", "2sf":"تَلْبَسِينَ", "2df":"تَلْبَسَانِ", "2pf":"تَلْبَسْنَ", "1s":"أَلْبَسُ", "1p":"نَلْبَسُ" },
        order: { "2sm":"اِلْبَسْ", "2sf":"اِلْبَسِي", "2dm":"اِلْبَسَا", "2df":"اِلْبَسَا", "2pm":"اِلْبَسُوا", "2pf":"اِلْبَسْنَ" }
    }},
    kharaja: { en: "exit", pastEn: "exited", part: "exited", ar: {
        past: { "3sm":"خَرَجَ", "3dm":"خَرَجَا", "3pm":"خَرَجُوا", "3sf":"خَرَجَتْ", "3df":"خَرَجَتَا", "3pf":"خَرَجْنَ", "2sm":"خَرَجْتَ", "2dm":"خَرَجْتُمَا", "2pm":"خَرَجْتُمْ", "2sf":"خَرَجْتِ", "2df":"خَرَجْتُمَا", "2pf":"خَرَجْتُنَّ", "1s":"خَرَجْتُ", "1p":"خَرَجْنَا" },
        present: { "3sm":"يَخْرُجُ", "3dm":"يَخْرُجَانِ", "3pm":"يَخْرُجُونَ", "3sf":"تَخْرُجُ", "3df":"تَخْرُجَانِ", "3pf":"يَخْرُجْنَ", "2sm":"تَخْرُجُ", "2dm":"تَخْرُجَانِ", "2pm":"تَخْرُجُونَ", "2sf":"تَخْرُجِينَ", "2df":"تَخْرُجَانِ", "2pf":"تَخْرُجْنَ", "1s":"أَخْرُجُ", "1p":"نَخْرُجُ" },
        order: { "2sm":"اُخْرُجْ", "2sf":"اُخْرُجِي", "2dm":"اُخْرُجَا", "2df":"اُخْرُجَا", "2pm":"اُخْرُجُوا", "2pf":"اُخْرُجْنَ" }
    }}
};

// --- 3. PREPOSITIONS ---
const prepositions = {
    none: { en: "", ar: "" },
    ila:  { en: "to",      ar: "إِلَى" },
    fi:   { en: "in",      ar: "فِي" },
    ala:  { en: "on",      ar: "عَلَى" },
    min:  { en: "from",    ar: "مِنْ" },
    maya: { en: "with",    ar: "مَعَ" },
    bi:   { en: "by",      ar: "بِـ" },
    li:   { en: "for",     ar: "لِـ" },
    an:   { en: "about",   ar: "عَنْ" },
    bayna:{ en: "between", ar: "بَيْنَ" }
};

// --- 4. OBJECTS DICTIONARY ---
const objects = {
    madrasah: { en: "the school", ar: "الْمَدْرَسَةَ", arJer: "الْمَدْرَسَةِ", type: "place" },
    ghurfah:  { en: "the room", ar: "الْغُرْفَةَ", arJer: "الْغُرْفَةِ", type: "place" },
    bait:     { en: "the house", ar: "الْبَيْتَ", arJer: "الْبَيْتِ", type: "place" },
    kitab:    { en: "the book", ar: "الْكِتَابَ", arJer: "الْكِتَابِ", type: "noun" },
    maa:      { en: "the water", ar: "الْمَاءَ", arJer: "الْمَاءِ", type: "noun" },
    qamis:    { en: "the shirt", ar: "الْقَمِيصَ", arJer: "الْقَمِيصِ", type: "noun" },
    tuffah:   { en: "the apple", ar: "التُّفَّاحَةَ", arJer: "التُّفَّاحَةِ", type: "noun" },
    
    // --- 14 Object Pronouns (Attached Suffixes) ---
    obj_hu:      { en: "him", suffix: "هُ", p: "3sm", subEn: "He", type: "pronoun" },
    obj_huma_m:  { en: "them (2m)", suffix: "هُمَا", p: "3dm", subEn: "They (2m)", type: "pronoun" },
    obj_hum:     { en: "them (m)", suffix: "هُمْ", p: "3pm", subEn: "They (m)", type: "pronoun" },
    obj_ha:      { en: "her", suffix: "هَا", p: "3sf", subEn: "She", type: "pronoun" },
    obj_huma_f:  { en: "them (2f)", suffix: "هُمَا", p: "3df", subEn: "They (2f)", type: "pronoun" },
    obj_hunna:   { en: "them (f)", suffix: "هُنَّ", p: "3pf", subEn: "They (f)", type: "pronoun" },
    obj_ka:      { en: "you (m)", suffix: "كَ", p: "2sm", subEn: "You (m)", type: "pronoun" },
    obj_kuma_m:  { en: "you (2m)", suffix: "كُمَا", p: "2dm", subEn: "You (2m)", type: "pronoun" },
    obj_kum:     { en: "you (m-pl)", suffix: "كُم", p: "2pm", subEn: "You (m-pl)", type: "pronoun" },
    obj_ki:      { en: "you (f)", suffix: "كِ", p: "2sf", subEn: "You (f)", type: "pronoun" },
    obj_kuma_f:  { en: "you (2f)", suffix: "كُمَا", p: "2df", subEn: "You (2f)", type: "pronoun" },
    obj_kunna:   { en: "you (f-pl)", suffix: "كُنَّ", p: "2pf", subEn: "You (f-pl)", type: "pronoun" },
    obj_ni:      { en: "me", suffix: "نِي", p: "1s", subEn: "I", type: "pronoun" },
    obj_na:      { en: "us", suffix: "نَا", p: "1p", subEn: "We", type: "pronoun" }
};

// --- 5. PREDICATES ---
const predicates = {
    muslim: {
        type: "noun",
        en: { s: "Muslim", p: "Muslims" },
        ar: { "3sm":"مُسْلِمٌ", "3sf":"مُسْلِمَةٌ", "3dm":"مُسْلِمَانِ", "3df":"مُسْلِمَتَانِ", "3pm":"مُسْلِمُونَ", "3pf":"مُسْلِمَاتٌ", "2sm":"مُسْلِمٌ", "2sf":"مُسْلِمَةٌ", "2dm":"مُسْلِمَانِ", "2df":"مُسْلِمَتَانِ", "2pm":"مُسْلِمُونَ", "2pf":"مُسْلِمَاتٌ", "1s":"مُسْلِمٌ", "1p":"مُسْلِمُونَ" }
    },
    mualim: {
        type: "noun",
        en: { s: "Teacher", p: "Teachers" },
        ar: { "3sm":"مُعَلِّمٌ", "3sf":"مُعَلِّمَةٌ", "3dm":"مُعَلِّمَانِ", "3df":"مُعَلِّمَتَانِ", "3pm":"مُعَلِّمُونَ", "3pf":"مُعَلِّمَاتٌ", "2sm":"مُعَلِّمٌ", "2sf":"مُعَلِّمَةٌ", "2dm":"مُعَلِّمَانِ", "2df":"مُعَلِّمَتَانِ", "2pm":"مُعَلِّمُونَ", "2pf":"مُعَلِّمَاتٌ", "1s":"مُعَلِّمٌ", "1p":"مُعَلِّمُونَ" }
    },
    engineer: {
        type: "noun",
        en: { s: "Engineer", p: "Engineers" },
        ar: { "3sm":"مُهَنْدِسٌ", "3sf":"مُهَنْدِسَةٌ", "3dm":"مُهَنْدِسَانِ", "3df":"مُهَنْدِسَتَانِ", "3pm":"مُهَنْدِسُونَ", "3pf":"مُهَنْدِسَاتٌ", "2sm":"مُهَنْدِسٌ", "2sf":"مُهَنْدِسَةٌ", "2dm":"مُهَنْدِسَانِ", "2df":"مُهَنْدِسَتَانِ", "2pm":"مُهَنْدِسُونَ", "2pf":"مُهَنْدِسَاتٌ", "1s":"مُهَنْدِسٌ", "1p":"مُهَنْدِسُونَ" }
    },
    jamil: {
        type: "adj",
        en: { s: "Beautiful", p: "Beautiful" },
        ar: { "3sm":"جَمِيلٌ", "3sf":"جَمِيلَةٌ", "3dm":"جَمِيلَانِ", "3df":"جَمِيلَتَانِ", "3pm":"جَمِيلُونَ", "3pf":"جَمِيلَاتٌ", "2sm":"جَمِيلٌ", "2sf":"جَمِيلَةٌ", "2dm":"جَمِيلَانِ", "2df":"جَمِيلَتَانِ", "2pm":"جَمِيلُونَ", "2pf":"جَمِيلَاتٌ", "1s":"جَمِيلٌ", "1p":"جَمِيلُونَ" }
    }
};

// --- 6. LOGIC FUNCTIONS ---
function strip(w) { return w.replace(/[َُِّْ]/g, ""); }

function getIndefiniteArticle(word) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(word.toLowerCase().charAt(0)) ? "an" : "a";
}

function getPassiveAr(vKey, tense, person) {
    const v = verbs[vKey];
    if(!v) return "";
    const r = strip(v.ar.past["3sm"]);
    const isPast = (tense === "past");

    if (isPast) {
        const stem = r[0] + "ُ" + r[1] + "ِ" + r[2];
        const endings = { "3sm":"َ", "3sf":"َتْ", "3dm":"َا", "3df":"َتَا", "3pm":"ُوا", "3pf":"ْنَ", "2sm":"ْتَ", "2sf":"ْتِ", "2dm":"ْتُمَا", "2pm":"ْتُمْ", "2pf":"ْتُنَّ", "1s":"ْتُ", "1p":"ْنَا" };
        return stem + (endings[person] || "َ");
    } else {
        const pref = { "3sm":"يُ", "3sf":"تُ", "3dm":"يُ", "3df":"تُ", "1s":"أُ", "1p":"نُ", "2sm":"تُ", "2sf":"تُ", "2pm":"تُ", "2pf":"تُ" };
        const stem = r[0] + "ْ" + r[1] + "َ" + r[2]; 
        const endings = { "3sm":"ُ", "3dm":"َانِ", "3pm":"ُونَ", "3pf":"ْنَ", "2sf":"ِينَ", "2sm":"ُ", "2dm":"َانِ", "2pm":"ُونَ", "2pf":"ْنَ" };
        return (pref[person] || "يُ") + stem + (endings[person] || "ُ");
    }
}

function getEnglishBe(p, tense) {
    // UPDATED: 'order' uses 'is/am/are' for passive logic
    const isPast = (tense === "past");
    if (p === "1s") return isPast ? "was" : "am";
    if (p === "3sm" || p === "3sf") return isPast ? "was" : "is";
    return isPast ? "were" : "are";
}

function applyJussive(base) {
    if (base.endsWith("ُ")) return base.slice(0, -1) + "ْ";
    if (base.endsWith("َانِ") || base.endsWith("ُونَ") || base.endsWith("ِينَ")) return base.slice(0, -1);
    return base;
}

// --- 7. ENGINE CORE ---
function build() {
    const s = subjects[elements.subj.value];
    if (!s) return;
    const type = elements.type.value;

    if (type === "nominal") {
        const p = predicates[elements.pred.value];
        if (!p) return;
        elements.arOut.textContent = `${s.ar} ${p.ar[s.p] || p.ar["3sm"]}`;
        let verbBe = getEnglishBe(s.p, "present");
        let enPred = (s.n === "s") ? p.en.s : p.en.p;
        let article = (s.n === "s" && p.type === "noun") ? getIndefiniteArticle(enPred) + " " : "";
        elements.enOut.textContent = `${s.en} ${verbBe} ${article}${enPred}.`;
        return;
    }

    const v = verbs[elements.verb.value];
    const obj = objects[elements.obj.value];
    const prep = prepositions[elements.prep.value];
    const tense = elements.tense.value;
    const mode = elements.mode.value;
    if(!v || !obj) return;

    let arParts = [];
    let enRes = "";

    if (mode === "passive") {
        const targetPerson = (obj.type === "pronoun" ? obj.p : "3sm");
        const vAr = getPassiveAr(elements.verb.value, tense, targetPerson);
        
        // Passive English Logic: Order + Present uses 'is/am/are'
        let beAux = getEnglishBe(targetPerson, (tense === "past" ? "past" : "present"));
        
        // Present progressive handling
        if (tense === "present") beAux += " being";

        if (obj.type === "place") {
            arParts = [vAr, prep.ar || "إِلَى", obj.arJer];
            enRes = `It ${beAux} ${v.part} ${prep.en || "to"} ${obj.en}.`;
        } else if (obj.type === "pronoun") {
            arParts = [vAr];
            enRes = `${obj.subEn} ${beAux} ${v.part}.`;
        } else {
            arParts = [vAr, obj.ar.replace("َ", "ُ")]; 
            enRes = `${obj.en.charAt(0).toUpperCase() + obj.en.slice(1)} ${beAux} ${v.part}.`;
        }
    } else {
        // --- ACTIVE LOGIC ---
        if (tense === "order" && mode === "interrogative") {
            arParts.push("هَلْ", v.ar.present[s.p]);
            const is3s = (s.p === "3sm" || s.p === "3sf");
            const doDoes = is3s ? "Does" : "Do";
            const pEn = prep.en ? prep.en + " " : "";
            enRes = `${doDoes} ${s.en.toLowerCase()} ${v.en} ${pEn}${obj.en}?`;
        } 
        else {
            if (mode === "interrogative") arParts.push("هَلْ");
            if (tense === "order") {
                if (!s.p.startsWith("2")) { elements.arOut.textContent = "Requires 'You' subject"; return; }
                arParts.push(mode === "negative" ? "لَا " + applyJussive(v.ar.present[s.p]) : v.ar.order[s.p]);
            } else {
                if (mode === "negative") arParts.push(tense === "past" ? "مَا" : "لَا");
                arParts.push(v.ar[tense][s.p]);
            }
        }
        
        arParts.push(s.ar);
        
        // --- PREPOSITION + OBJECT (Pronoun or Noun) FUSION ---
        if (obj.type === "pronoun") {
            if (prep.ar !== "") {
                let pBase = prep.ar;
                let suf = obj.suffix;

                // Grammar Rule: Handle change to 'i' sound (Kasra) for 3rd person suffixes
                const needsKasra = (pBase === "إِلَى" || pBase === "عَلَى" || pBase === "فِي" || pBase === "بِـ" || pBase === "لِـ");
                if (needsKasra) {
                    if (suf === "هُ") suf = "هِ";
                    else if (suf === "هُمَا") suf = "هِمَا";
                    else if (suf === "هُمْ") suf = "هِمْ";
                    else if (suf === "هُنَّ") suf = "هِنَّ";
                }

                // Handle Alif Maqsura transformation (ila -> ilai, ala -> alai)
                if (pBase === "إِلَى") pBase = "إِلَيْ";
                else if (pBase === "عَلَى") pBase = "عَلَيْ";
                else if (pBase === "بِـ") pBase = "بِ";
                else if (pBase === "لِـ") pBase = "لِ";

                arParts.push(pBase + suf);
            } else {
                let last = arParts.pop();
                arParts.push(last + obj.suffix);
            }
        } else {
            if (prep.ar !== "") {
                arParts.push(prep.ar, obj.arJer);
            } else {
                arParts.push(obj.ar);
            }
        }

        const is3s = (s.p === "3sm" || s.p === "3sf");
        const pEn = prep.en ? prep.en + " " : "";

        if (!(tense === "order" && mode === "interrogative")) {
            if (tense === "past") {
                if (mode === "negative") enRes = `${s.en} did not ${v.en} ${pEn}${obj.en}.`;
                else if (mode === "interrogative") enRes = `Did ${s.en} ${v.en} ${pEn}${obj.en}?`;
                else enRes = `${s.en} ${v.pastEn} ${pEn}${obj.en}.`;
            } else if (tense === "present") {
                if (mode === "negative") enRes = `${s.en} ${is3s?"does":"do"} not ${v.en} ${pEn}${obj.en}.`;
                else if (mode === "interrogative") enRes = `${is3s?"Does":"Do"} ${s.en} ${v.en} ${pEn}${obj.en}?`;
                else {
                    let vEn = is3s ? (v.en === "go" ? "goes" : (v.en.endsWith("sh") ? v.en+"es" : v.en+"s")) : v.en;
                    enRes = `${s.en} ${vEn} ${pEn}${obj.en}.`;
                }
            } else if (tense === "order") {
                const vInf = v.en.charAt(0).toUpperCase() + v.en.slice(1);
                enRes = mode === "negative" ? `Don't ${v.en} ${pEn}${obj.en}!` : `${vInf} ${pEn}${obj.en}!`;
            }
        }
    }
    
    elements.arOut.textContent = arParts.filter(x => x && x !== "").join(" ");
    elements.enOut.textContent = enRes;
}

// --- 8. SYSTEM INITIALIZATION ---
function init() {
    const fill = (el, data) => { 
        if (!el) return;
        el.innerHTML = ""; 
        for (let k in data) {
            const label = data[k].en.s || data[k].en;
            el.add(new Option(label, k));
        }
    };
    
    fill(elements.subj, subjects);
    fill(elements.verb, verbs);
    fill(elements.obj, objects);
    fill(elements.prep, prepositions);
    fill(elements.pred, predicates);

    const inputs = [elements.type, elements.subj, elements.verb, elements.obj, elements.prep, elements.tense, elements.mode, elements.pred];
    inputs.forEach(i => {
        if (i) i.onchange = () => {
            const isNom = elements.type.value === "nominal";
            elements.nominalFields.forEach(f => f.style.display = isNom ? "block" : "none");
            elements.verbalFields.forEach(f => f.style.display = isNom ? "none" : "block");
            build();
        };
    });
    
    if (elements.btn) elements.btn.onclick = build;
    
    const startNom = elements.type.value === "nominal";
    elements.nominalFields.forEach(f => f.style.display = startNom ? "block" : "none");
    elements.verbalFields.forEach(f => f.style.display = startNom ? "none" : "block");
    build();
}

document.addEventListener("DOMContentLoaded", init);

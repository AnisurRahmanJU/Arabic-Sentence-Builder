/* =====================================
   Arabic Sentence Builder – script.js
   Full Conjugation & Comprehensive Objects
===================================== */

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

const subjects = {
    huwa:     { en: "He", ar: "هُوَ", p: "3sm", n: "s" },
    huma_m:   { en: "They (2m)", ar: "هُمَا", p: "3dm", n: "d" },
    hum:      { en: "They (m)", ar: "هُمْ", p: "3pm", n: "p" },
    hiya:     { en: "She", ar: "هِيَ", p: "3sf", n: "s" },
    huma_f:   { en: "They (2f)", ar: "هُمَا", p: "3df", n: "d" },
    hunna:    { en: "They (f)", ar: "هُنَّ", p: "3pf", n: "p" },
    anta:     { en: "You (m)", ar: "أَنْتَ", p: "2sm", n: "s" },
    antuma_m: { en: "You (2m)", ar: "أَنْتُمَا", p: "2dm", n: "d" },
    antum:    { en: "You (m-pl)", ar: "أَنْتُمْ", p: "2pm", n: "p" },
    anti:     { en: "You (f)", ar: "أَنْتِ", p: "2sf", n: "s" },
    antuma_f: { en: "You (2f)", ar: "أَنْتُمَا", p: "2df", n: "d" },
    antunna:  { en: "You (f-pl)", ar: "أَنْتُنَّ", p: "2pf", n: "p" },
    ana:      { en: "I", ar: "أَنَا", p: "1s", n: "s" },
    nahnu:    { en: "We", ar: "نَحْنُ", p: "1p", n: "p" }
};

const verbs = {
    nasara: { en: "help", pastEn: "helped", ar: {
        past: { "3sm":"نَصَرَ", "3dm":"نَصَرَا", "3pm":"نَصَرُوا", "3sf":"نَصَرَتْ", "3df":"نَصَرَتَا", "3pf":"نَصَرْنَ", "2sm":"نَصَرْتَ", "2dm":"نَصَرْتُمَا", "2pm":"نَصَرْتُمْ", "2sf":"نَصَرْتِ", "2df":"نَصَرْتُمَا", "2pf":"نَصَرْتُنَّ", "1s":"نَصَرْتُ", "1p":"نَصَرْنَا" },
        present: { "3sm":"يَنْصُرُ", "3dm":"يَنْصُرَانِ", "3pm":"يَنْصُرُونَ", "3sf":"تَنْصُرُ", "3df":"تَنْصُرَانِ", "3pf":"يَنْصُرْنَ", "2sm":"تَنْصُرُ", "2dm":"تَنْصُرَانِ", "2pm":"تَنْصُرُونَ", "2sf":"تَنْصُرِينَ", "2df":"تَنْصُرَانِ", "2pf":"تَنْصُرْنَ", "1s":"أَنْصُرُ", "1p":"نَنْصُرُ" },
        order: { "2sm":"اُنْصُرْ", "2sf":"اُنْصُرِي", "2dm":"اُنْصُرَا", "2df":"اُنْصُرَا", "2pm":"اُنْصُرُوا", "2pf":"اُنْصُرْنَ" }
    }},
    dhahaba: { en: "go", pastEn: "went", ar: {
        past: { "3sm":"ذَهَبَ", "3dm":"ذَهَبَا", "3pm":"ذَهَبُوا", "3sf":"ذَهَبَتْ", "3df":"ذَهَبَتَا", "3pf":"ذَهَبْنَ", "2sm":"ذَهَبْتَ", "2dm":"ذَهَبْتُمَا", "2pm":"ذَهَبْتُمْ", "2sf":"ذَهَبْتِ", "2df":"ذَهَبْتُمَا", "2pf":"ذَهَبْتُنَّ", "1s":"ذَهَبْتُ", "1p":"ذَهَبْنَا" },
        present: { "3sm":"يَذْهَبُ", "3dm":"يَذْهَبَانِ", "3pm":"يَذْهَبُونَ", "3sf":"تَذْهَبُ", "3df":"تَذْهَبَانِ", "3pf":"يَذْهَبْنَ", "2sm":"تَذْهَبُ", "2dm":"تَذْهَبَانِ", "2pm":"تَذْهَبُونَ", "2sf":"تَذْهَبِينَ", "2df":"تَذْهَبَانِ", "2pf":"تَذْهَبْنَ", "1s":"أَذْهَبُ", "1p":"نَذْهَبُ" },
        order: { "2sm":"اِذْهَبْ", "2sf":"اِذْهَبِي", "2dm":"اِذْهَبَا", "2df":"اِذْهَبَا", "2pm":"اِذْهَبُوا", "2pf":"اِذْهَبْنَ" }
    }},
    akala: { en: "eat", pastEn: "ate", ar: {
        past: { "3sm":"أَكَلَ", "3sf":"أَكَلَتْ", "2sm":"أَكَلْتَ", "2sf":"أَكَلْتِ", "2dm":"أَكَلْتُمَا", "2df":"أَكَلْتُمَا", "1s":"أَكَلْتُ", "1p":"أَكَلْنَا" },
        present: { "3sm":"يَأْكُلُ", "3sf":"تَأْكُلُ", "2sm":"تَأْكُلُ", "2sf":"تَأْكُلِينَ", "1s":"آكُلُ", "1p":"نَأْكُلُ" },
        order: { "2sm":"كُلْ", "2sf":"كُلِي", "2dm":"كُلَا", "2df":"كُلَا", "2pm":"كُلُوا", "2pf":"كُلْنَ" }
    }},
    shariba: { en: "drink", pastEn: "drank", ar: {
        past: { "3sm":"شَرِبَ", "1s":"شَرِبْتُ", "2sm":"شَرِبْتَ", "2sf":"شَرِبْتِ" },
        present: { "3sm":"يَشْرَبُ", "1s":"أَشْرَبُ", "2sm":"تَشْرَبُ", "2sf":"تَشْرَبِينَ" },
        order: { "2sm":"اِشْرَبْ", "2sf":"اِشْرَبِي", "2dm":"اِشْرَبَا", "2df":"اِشْرَبَا", "2pm":"اِشْرَبُوا", "2pf":"اِشْرَبْنَ" }
    }},
    kataba: { en: "write", pastEn: "wrote", ar: {
        past: { "3sm":"كَتَبَ", "1s":"كَتَبْتُ", "2sm":"كَتَبْتَ", "2sf":"كَتَبْتِ" },
        present: { "3sm":"يَكْتُبُ", "1s":"أَكْتُبُ", "2sm":"تكْتُبُ", "2sf":"تَكْتُبِينَ" },
        order: { "2sm":"اُكْتُبْ", "2sf":"اُكْتُبِي", "2dm":"اُكْتُبَا", "2df":"اُكْتُبَا", "2pm":"اُكْتُبُوا", "2pf":"اُكْتُبْنَ" }
    }},
    fataha: { en: "open", pastEn: "opened", ar: {
        past: { "3sm":"فَتَحَ", "1s":"فَتَحْتُ", "2sm":"فَتَحْتَ", "2sf":"فَتَحْتِ" },
        present: { "3sm":"يَفْتَحُ", "1s":"أَفْتَحُ", "2sm":"تَفْتَحُ", "2sf":"تَفْتَحِينَ" },
        order: { "2sm":"اِفْتَحْ", "2sf":"اِفْتَحِي", "2dm":"اِفْتَحَا", "2df":"اِفْتَحَا", "2pm":"اِفْتَحُوا", "2pf":"اِفْتَحْنَ" }
    }},
    jalasa: { en: "sit", pastEn: "sat", ar: {
        past: { "3sm":"جَلَسَ", "1s":"جَلَسْتُ", "2sm":"جَلَسْتَ", "2sf":"جَلَسْتِ" },
        present: { "3sm":"يَجْلِسُ", "1s":"أَجْلِسُ", "2sm":"تَجْلِسُ", "2sf":"تَجْلِسِينَ" },
        order: { "2sm":"اِجْلِسْ", "2sf":"اِجْلِسِي", "2dm":"اِجْلِسَا", "2df":"اِجْلِسَا", "2pm":"اِجْلِسُوا", "2pf":"اِجْلِسْنَ" }
    }},
    qaraa: { en: "read", pastEn: "read", ar: {
        past: { "3sm":"قَرَأَ", "1s":"قَرَأْتُ", "2sm":"قَرَأْتَ", "2sf":"قَرَأْتِ" },
        present: { "3sm":"يَقْرَأُ", "1s":"أَقْرَأُ", "2sm":"تَقْرَأُ", "2sf":"تَقْرَأِينَ" },
        order: { "2sm":"اِقْرَأْ", "2sf":"اِقْرَأِي", "2dm":"اِقْرَأَا", "2df":"اِقْرَأَا", "2pm":"اِقْرَأُوا", "2pf":"اِقْرَأْنَ" }
    }},
    ghasala: { en: "wash", pastEn: "washed", ar: {
        past: { "3sm":"غَسَلَ", "1s":"غَسَلْتُ", "2sm":"غَسَلْتَ", "2sf":"غَسَلْتِ" },
        present: { "3sm":"يَغْسِلُ", "1s":"أَغْسِلُ", "2sm":"تَغْسِلُ", "2sf":"تَغْسِلِينَ" },
        order: { "2sm":"اِغْسِلْ", "2sf":"اِغْسِلِي", "2dm":"اِغْسِلَا", "2df":"اِغْسِلَا", "2pm":"اِغْسِلُوا", "2pf":"اِغْسِلْنَ" }
    }},
    dakhala: { en: "enter", pastEn: "entered", ar: {
        past: { "3sm":"دَخَلَ", "1s":"دَخَلْتُ", "2sm":"دَخَلْتَ", "2sf":"دَخَلْتِ" },
        present: { "3sm":"يَدْخُلُ", "1s":"أَدْخُلُ", "2sm":"تَدْخُلُ", "2sf":"تَدْخُلِينَ" },
        order: { "2sm":"اُدْخُلْ", "2sf":"اُدْخُلِي", "2dm":"اُدْخُلَا", "2df":"اُدْخُلَا", "2pm":"اُدْخُلُوا", "2pf":"اُدْخُلْنَ" }
    }}
};

const prepositions = {
    none: { en: "", ar: "" },
    ila:  { en: "to", ar: "إِلَى" },
    fi:   { en: "in", ar: "فِي" },
    ala:  { en: "on", ar: "عَلَى" },
    bi:   { en: "with/by", ar: "بِـ" }
};

const objects = {
    madrasa: { en: "school", ar: "الْمَدْرَسَةِ", type: "noun" },
    bayt:    { en: "house", ar: "الْبَيْتِ", type: "noun" },
    balad:   { en: "country", ar: "الْبَلَدِ", type: "noun" },
    rice:    { en: "rice", ar: "الأَرُزَّ", type: "noun" },
    apple:   { en: "apple", ar: "التُّفَّاحَةَ", type: "noun" },
    water:   { en: "water", ar: "الْمَاءَ", type: "noun" },
    table:   { en: "table", ar: "الطَّاوِلَةِ", type: "noun" },
    chair:   { en: "chair", ar: "الْكُرْسِيِّ", type: "noun" },
    obj_me:       { en: "me", suffix: "نِي", type: "pronoun" },
    obj_us:       { en: "us", suffix: "نَا", type: "pronoun" },
    obj_him:      { en: "him", suffix: "هُ", type: "pronoun" },
    obj_her:      { en: "her", suffix: "هَا", type: "pronoun" },
    obj_them:     { en: "them", suffix: "هُمْ", type: "pronoun" },
    obj_you_m:    { en: "you (m)", suffix: "كَ", type: "pronoun" }
};

const predicates = {
    muslim: {
        en: "Muslim",
        ar: {
            "3sm":"مُسْلِمٌ", "3dm":"مُسْلِمَانِ", "3pm":"مُسْلِمُونَ",
            "3sf":"مُسْلِمَةٌ", "3df":"مُسْلِمَتَانِ", "3pf":"مُسْلِمَاتٌ",
            "2sm":"مُسْلِمٌ", "2dm":"مُسْلِمَانِ", "2pm":"مُسْلِمُونَ",
            "2sf":"مُسْلِمَةٌ", "2df":"مُسْلِمَتَانِ", "2pf":"مُسْلِمَاتٌ",
            "1s":"مُسْلِمٌ", "1p":"مُسْلِمُونَ"
        }
    }
};

function build() {
    const s = subjects[elements.subj.value];
    const type = elements.type.value;

    if (type === "nominal") {
        const p = predicates[elements.pred.value];
        elements.arOut.textContent = `${s.ar} ${p.ar[s.p]}`;
        
        let verbBe = "is";
        if (s.p === "1s") verbBe = "am";
        else if (s.n !== "s" || s.p.startsWith("2")) verbBe = "are";

        let predEn = (s.n !== "s") ? p.en + "s" : p.en;
        elements.enOut.textContent = `${s.en} ${verbBe} ${predEn}.`;
    } else {
        const v = verbs[elements.verb.value];
        const obj = objects[elements.obj.value];
        const prep = prepositions[elements.prep.value];
        const tense = elements.tense.value;
        const mode = elements.mode.value;

        if (tense === "order" && !s.p.startsWith("2")) {
            elements.arOut.textContent = "Requires 'You' subject";
            return;
        }

        // FIXED: Added fallback to base form "3sm" if specific person is missing to avoid "undefined"
        const vAr = v.ar[tense][s.p] || v.ar[tense]["3sm"] || "";
        
        let arRes = [];
        if (mode === "interrogative") arRes.push("هَلْ");
        if (tense !== "order") arRes.push(s.ar);
        if (mode === "negative") arRes.push(tense === "past" ? "مَا" : "لَا");

        if (obj.type === "pronoun") {
            arRes.push(vAr + obj.suffix);
        } else {
            if (prep.ar !== "") arRes.push(vAr, prep.ar, obj.ar);
            else arRes.push(vAr, obj.ar);
        }
        elements.arOut.textContent = arRes.join(" ");

        let enRes = "";
        const isSing3rd = (s.p === "3sm" || s.p === "3sf");
        const doDoes = isSing3rd ? "does" : "do";
        const prepEn = prep.en !== "" ? prep.en + " " : "";

        if (tense === "past") {
            if (mode === "negative") enRes = `${s.en} did not ${v.en} ${prepEn}${obj.en}.`;
            else if (mode === "interrogative") enRes = `Did ${s.en} ${v.en} ${prepEn}${obj.en}?`;
            else enRes = `${s.en} ${v.pastEn} ${prepEn}${obj.en}.`;
        } 
        else if (tense === "present") {
            if (mode === "negative") enRes = `${s.en} ${doDoes} not ${v.en} ${prepEn}${obj.en}.`;
            else if (mode === "interrogative") enRes = `${doDoes.charAt(0).toUpperCase() + doDoes.slice(1)} ${s.en} ${v.en} ${prepEn}${obj.en}?`;
            else {
                let verbS = isSing3rd ? (v.en === "go" ? "goes" : v.en + "s") : v.en;
                enRes = `${s.en} ${verbS} ${prepEn}${obj.en}.`;
            }
        } 
        else if (tense === "order") {
            if (mode === "negative") enRes = `Do not ${v.en} ${prepEn}${obj.en}!`;
            else if (mode === "interrogative") enRes = `Do you ${v.en} ${prepEn}${obj.en}?`;
            else enRes = `${v.en.toUpperCase()} ${prepEn}${obj.en}!`;
        }
        elements.enOut.textContent = enRes;
    }
}

function init() {
    const fill = (el, data) => { el.innerHTML = ""; for (let k in data) el.add(new Option(data[k].en, k)); };
    fill(elements.subj, subjects);
    fill(elements.verb, verbs);
    fill(elements.pred, predicates);
    fill(elements.obj, objects);
    fill(elements.prep, prepositions);
    
    [elements.subj, elements.pred, elements.verb, elements.obj, elements.prep, elements.tense, elements.mode].forEach(el => el.onchange = build);
    
    elements.type.onchange = () => {
        const isNom = elements.type.value === "nominal";
        elements.nominalFields.forEach(f => f.style.display = isNom ? "block" : "none");
        elements.verbalFields.forEach(f => f.style.display = isNom ? "none" : "block");
        build();
    };
    elements.btn.onclick = build;
    elements.type.dispatchEvent(new Event('change'));
}
init();

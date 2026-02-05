/* =====================================
   Arabic Sentence Builder – script.js
   Developer: Md. Anisur Rahman
   Optimized Full Version
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
    ana_m: { en: "I", ar: "أَنَا", person: "1s", gender: "m", number: "s" },
    ana_f: { en: "I", ar: "أَنَا", person: "1s", gender: "f", number: "s" },
    anta:  { en: "You", ar: "أَنْتَ", person: "2sm", gender: "m", number: "s" },
    anti:  { en: "You", ar: "أَنْتِ", person: "2sf", gender: "f", number: "s" },
    huwa:  { en: "He", ar: "هُوَ", person: "3sm", gender: "m", number: "s" },
    hiya:  { en: "She", ar: "هِيَ", person: "3sf", gender: "f", number: "s" },
    nahnu: { en: "We", ar: "نَحْنُ", person: "1p", gender: "x", number: "p" },
    antum: { en: "You", ar: "أَنْتُمْ", person: "2p", gender: "m", number: "p" },
    antunna: { en: "You", ar: "أَنْتُنَّ", person: "2pf", gender: "f", number: "p" },
    hum:   { en: "They", ar: "هُمْ", person: "3p", gender: "m", number: "p" },
    hunna: { en: "They", ar: "هُنَّ", person: "3pf", gender: "f", number: "p" }
};

const predicates = {
    muslim_m: { en: "a Muslim", ar: { "1s": "مُسْلِمٌ", "2sm": "مُسْلِمٌ", "3sm": "مُسْلِمٌ", "1p": "مُسْلِمُونَ", "2p": "مُسْلِمُونَ", "3p": "مُسْلِمُونَ" } },
    muslim_f: { en: "a Muslim", ar: { "1s": "مُسْلِمَةٌ", "2sf": "مُسْلِمَةٌ", "3sf": "مُسْلِمَةٌ", "1p": "مُسْلِمَاتٌ", "2pf": "مُسْلِمَاتٌ", "3pf": "مُسْلِمَاتٌ" } },
    talib_m: { en: "a student", ar: { "1s": "طَالِبٌ", "3sm": "طَالِبٌ", "1p": "طُلَّابٌ", "3p": "طُلَّابٌ" } },
    taliba_f: { en: "a student", ar: { "1s": "طَالِبَةٌ", "3sf": "طَالِبَةٌ", "1p": "طَالِبَاتٌ", "3pf": "طَالِبَاتٌ" } }
};

const objects = {
    kitab: { en: "the book", ar: "الْكِتَابَ", type: "thing" },
    tufaha: { en: "the apple", ar: "التُّفَّاحَةَ", type: "thing" },
    maa: { en: "water", ar: "الْمَاءَ", type: "thing" },
    qalam: { en: "the pen", ar: "الْقَلَمَ", type: "thing" },
    madrasa: { en: "the school", ar: "الْمَدْرَسَةِ", type: "place" },
    masjid: { en: "the mosque", ar: "الْمَسْجِدِ", type: "place" },
    bayt: { en: "the house", ar: "الْبَيْتِ", type: "place" },
    kursi: { en: "the chair", ar: "الْكُرْسِيِّ", type: "place" },
    suq: { en: "the market", ar: "السُّوقِ", type: "place" },
    obj_me: { en: "me", ar: { suffix: "نِي" }, type: "pronoun" },
    obj_us: { en: "us", ar: { suffix: "نَا" }, type: "pronoun" },
    obj_you_m: { en: "you (m)", ar: { suffix: "كَ" }, type: "pronoun" },
    obj_you_f: { en: "you (f)", ar: { suffix: "كِ" }, type: "pronoun" },
    obj_you_pm: { en: "you (pl.m)", ar: { suffix: "كُمْ" }, type: "pronoun" },
    obj_you_pf: { en: "you (pl.f)", ar: { suffix: "كُنَّ" }, type: "pronoun" },
    obj_him: { en: "him", ar: { suffix: "هُ" }, type: "pronoun" },
    obj_her: { en: "her", ar: { suffix: "هَا" }, type: "pronoun" },
    obj_them_m: { en: "them (m)", ar: { suffix: "هُمْ" }, type: "pronoun" },
    obj_them_f: { en: "them (f)", ar: { suffix: "هُنَّ" }, type: "pronoun" }
};

const preps = {
    ila: { en: "to", ar: "إِلَى" },
    fi: { en: "in", ar: "فِي" },
    ala: { en: "on", ar: "عَلَى" },
    min: { en: "from", ar: "مِنْ" }
};

const verbs = {
    dhahaba: { en: "go", pastEn: "went", defPrep: "ila", ar: {
        past: { "1s":"ذَهَبْتُ", "2sm":"ذَهَبْتَ", "3sm":"ذَهَبَ", "3sf":"ذَهَبَتْ", "1p":"ذَهَبْنَا", "2p":"ذَهَبْتُمْ", "3p":"ذَهَبُوا" },
        present: { "1s":"أَذْهَبُ", "2sm":"تَذْهَبُ", "3sm":"يَذْهَبُ", "3sf":"تَذْهَبُ", "1p":"نَذْهَبُ" },
        order: { "2sm":"اِذْهَبْ", "2sf":"اِذْهَبِي" }
    }, type: "place" },
    akala: { en: "eat", pastEn: "ate", defPrep: "", ar: {
        past: { "1s":"أَكَلْتُ", "3sm":"أَكَلَ", "3sf":"أَكَلَتْ", "1p":"أَكَلْنَا" },
        present: { "1s":"آكُلُ", "3sm":"يَأْكُلُ", "3sf":"تَأْكُلُ" },
        order: { "2sm":"كُلْ", "2sf":"كُلِي" }
    }, type: "thing" },
    shariba: { en: "drink", pastEn: "drank", defPrep: "", ar: {
        past: { "1s":"شَرِبْتُ", "3sm":"شَرِبَ", "1p":"شَرِبْنَا" },
        present: { "1s":"أَشْرَبُ", "3sm":"يَشْرَبُ" },
        order: { "2sm":"اِشْرَبْ" }
    }, type: "thing" },
    kataba: { en: "write", pastEn: "wrote", defPrep: "", ar: {
        past: { "1s":"كَتَبْتُ", "3sm":"كَتَبَ" },
        present: { "1s":"أَكْتُبُ", "3sm":"يَكْتُبُ" },
        order: { "2sm":"اُكْتُبْ" }
    }, type: "thing" },
    qaraa: { en: "read", pastEn: "read", defPrep: "", ar: {
        past: { "1s":"قَرَأْتُ", "3sm":"قَرَأَ" },
        present: { "1s":"أَقْرَأُ", "3sm":"يَقْرَأُ" },
        order: { "2sm":"اِقْرَأْ" }
    }, type: "thing" },
    nasara: { en: "help", pastEn: "helped", defPrep: "", ar: {
        past: { "1s":"نَصَرْتُ", "3sm":"نَصَرَ" },
        present: { "1s":"أَنْصُرُ", "3sm":"يَنْصُرُ" },
        order: { "2sm":"اُنْصُرْ" }
    }, type: "any" },
    jaa: { en: "come", pastEn: "came", defPrep: "ila", ar: {
        past: { "1s":"جِئْتُ", "3sm":"جَاءَ" },
        present: { "1s":"آتِي", "3sm":"يَأْتِي" },
        order: { "2sm":"تَعَالَ" }
    }, type: "place" },
    fataha: { en: "open", pastEn: "opened", defPrep: "", ar: {
        past: { "1s":"فَتَحْتُ", "3sm":"فَتَحَ" },
        present: { "1s":"أَفْتَحُ", "3sm":"يَفْتَحُ" },
        order: { "2sm":"اِفْتَحْ" }
    }, type: "thing" },
    jalasa: { en: "sit", pastEn: "sat", defPrep: "ala", ar: {
        past: { "1s":"جَلَسْتُ", "3sm":"جَلَسَ" },
        present: { "1s":"أَجْلِسُ", "3sm":"يَجْلِسُ" },
        order: { "2sm":"اِجْلِسْ" }
    }, type: "place" },
    ghasala: { en: "wash", pastEn: "washed", defPrep: "", ar: {
        past: { "1s":"غَسَلْتُ", "3sm":"غَسَلَ" },
        present: { "1s":"أَغْسِلُ", "3sm":"يَغْسِلُ" },
        order: { "2sm":"اِغْسِلْ" }
    }, type: "thing" }
    // ... Additional verbs follow the same structure
};

function populate() {
    const fill = (el, data) => {
        el.innerHTML = "";
        for (let k in data) {
            let label = data[k].en + (data[k].ar && typeof data[k].ar === 'string' ? ` (${data[k].ar})` : "");
            el.add(new Option(label, k));
        }
    };
    fill(elements.subj, subjects);
    fill(elements.verb, verbs);
    fill(elements.pred, predicates);
    
    elements.prep.innerHTML = '<option value="">-- auto/none --</option>';
    for (let k in preps) elements.prep.add(new Option(preps[k].en, k));
    
    elements.obj.innerHTML = '<option value="">-- select object --</option>';
    for (let k in objects) elements.obj.add(new Option(objects[k].en, k));
}

function updateUI() {
    const isNom = elements.type.value === "nominal";
    elements.nominalFields.forEach(f => f.style.display = isNom ? "block" : "none");
    elements.verbalFields.forEach(f => f.style.display = isNom ? "none" : "block");
}

function build() {
    const s = subjects[elements.subj.value];
    const type = elements.type.value;

    if (type === "nominal") {
        const p = predicates[elements.pred.value];
        const arPred = p.ar[s.person] || p.ar["1s"];
        elements.arOut.textContent = `${s.ar} ${arPred}`;
        
        let be = (s.person === "1s") ? "am" : (s.number === "p" ? "are" : "is");
        let nounEn = p.en;
        if (s.number === "p") nounEn = nounEn.replace("a ", "") + "s";
        elements.enOut.textContent = `${s.en} ${be} ${nounEn}.`;
    } else {
        const v = verbs[elements.verb.value];
        const obj = objects[elements.obj.value];
        const tense = elements.tense.value;
        const mode = elements.mode.value;
        
        if (!obj) return;

        let pKey = elements.prep.value;
        if (!pKey && obj.type === "place") pKey = v.defPrep;

        const vAr = v.ar[tense][s.person] || v.ar[tense]["3sm"] || v.ar[tense]["2sm"];
        let arParts = [];
        if (mode === "interrogative") arParts.push("هَلْ");
        if (tense !== "order") arParts.push(s.ar);
        if (mode === "negative") arParts.push(tense === "past" ? "مَا" : "لَا");

        if (!pKey) {
            if (obj.type === "pronoun") arParts.push(vAr + obj.ar.suffix);
            else arParts.push(vAr, obj.ar);
        } else {
            arParts.push(vAr, preps[pKey].ar, (obj.type === "pronoun" ? obj.ar.suffix : obj.ar));
        }
        elements.arOut.textContent = arParts.join(" ");

        let vEn = (tense === "past") ? v.pastEn : v.en;
        if (tense === "present" && ["3sm", "3sf"].includes(s.person) && mode === "affirmative") {
            vEn += (vEn.endsWith("o") ? "es" : "s");
        }

        let res = "";
        let pEn = pKey ? preps[pKey].en + " " : "";
        if (tense === "order") res = `${v.en.toUpperCase()} ${pEn}${obj.en}!`;
        else if (mode === "interrogative") {
            let aux = (tense === "past") ? "Did" : (["3sm", "3sf"].includes(s.person) ? "Does" : "Do");
            res = `${aux} ${s.en.toLowerCase()} ${v.en} ${pEn}${obj.en}?`;
        } else if (mode === "negative") {
            let aux = (tense === "past") ? "did not" : (["3sm", "3sf"].includes(s.person) ? "does not" : "do not");
            res = `${s.en} ${aux} ${v.en} ${pEn}${obj.en}.`;
        } else {
            res = `${s.en} ${vEn} ${pEn}${obj.en}.`;
        }
        elements.enOut.textContent = res;
    }
}

function init() {
    populate();
    updateUI();
    elements.type.onchange = () => { updateUI(); build(); };
    [elements.subj, elements.pred, elements.verb, elements.prep, elements.obj, elements.tense, elements.mode]
    .forEach(el => el.onchange = build);
    elements.btn.onclick = build;
}

init();

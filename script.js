// Database with Semantic Categories
const verbs = [
    { id: "eat", en: "eat", enPast: "ate", category: "food", arPast: "أَكَلَ", arPres: "يَأْكُلُ", arOrder: "كُلْ" },
    { id: "drink", en: "drink", enPast: "drank", category: "liquid", arPast: "شَرِبَ", arPres: "يَشْرَبُ", arOrder: "اِشْرَبْ" },
    { id: "read", en: "read", enPast: "read", category: "media", arPast: "قَرَأَ", arPres: "يَقْرَأُ", arOrder: "اِقْرَأْ" },
    { id: "write", en: "write", enPast: "wrote", category: "media", arPast: "كَتَبَ", arPres: "يَكْتُبُ", arOrder: "اُكْتُبْ" },
    { id: "open", en: "open", enPast: "opened", category: "tool", arPast: "فَتَحَ", arPres: "يَفْتَحُ", arOrder: "اِفْتَحْ" }
];

const subjects = {
    boy: { ar: "الْوَلَدُ", en: "the boy", person: "3", gender: "m" },
    girl: { ar: "الْبِنْتُ", en: "the girl", person: "3", gender: "f" },
    teacher: { ar: "الْمُعَلِّمُ", en: "the teacher", person: "3", gender: "m" },
    i: { ar: "أَنَا", en: "I", person: "1", gender: "m" },
    we: { ar: "نَحْنُ", en: "we", person: "1", gender: "m" },
    youM: { ar: "أَنْتَ", en: "you", person: "2", gender: "m" }
};

const objects = {
    apple: { ar: "التُّفَّاحَةَ", en: "the apple", category: "food", isSuffix: false },
    fish: { ar: "السَّمَكَةَ", en: "the fish", category: "food", isSuffix: false },
    water: { ar: "الْمَاءَ", en: "the water", category: "liquid", isSuffix: false },
    juice: { ar: "الْعَصِيرَ", en: "the juice", category: "liquid", isSuffix: false },
    book: { ar: "الْكِتَابَ", en: "the book", category: "media", isSuffix: false },
    lesson: { ar: "الدَّرْسَ", en: "the lesson", category: "media", isSuffix: false },
    door: { ar: "الْبَابَ", en: "the door", category: "tool", isSuffix: false },
    it: { ar_m: "هُ", ar_f: "هَا", en: "it", category: "universal", isSuffix: true },
    me: { ar: "نِي", en: "me", category: "universal", isSuffix: true },
    us: { ar: "نَا", en: "us", category: "universal", isSuffix: true }
};

// Initial Load
window.onload = () => {
    const vSelect = document.getElementById('verb');
    verbs.forEach(v => {
        let opt = document.createElement('option');
        opt.value = v.id;
        opt.textContent = `${v.en} (${v.arPast})`;
        vSelect.appendChild(opt);
    });
    filterObjects(); // Filter objects based on first verb
    updateUI();
};

// Logic to prevent "Eating a Book"
function filterObjects() {
    const vKey = document.getElementById('verb').value;
    const v = verbs.find(x => x.id === vKey);
    const objSelect = document.getElementById('object');
    const currentVal = objSelect.value;
    
    objSelect.innerHTML = "";
    for (let key in objects) {
        if (objects[key].category === v.category || objects[key].category === "universal") {
            let opt = document.createElement('option');
            opt.value = key;
            opt.textContent = `${objects[key].en} (${objects[key].ar_m || objects[key].ar})`;
            objSelect.appendChild(opt);
        }
    }
}

function updateUI() {
    const tense = document.getElementById('tense').value;
    const mode = document.getElementById('mode').value;
    const s = subjects[document.getElementById('subject').value];
    const v = verbs.find(x => x.id === document.getElementById('verb').value);
    const o = objects[document.getElementById('object').value];

    let arVerb = "";
    let enFinal = "";
    let arFinal = "";

    // --- ARABIC VERB CONJUGATION ---
    if (tense === "past") {
        arVerb = v.arPast;
        if (s.en === "I") arVerb = v.arPast.slice(0, -1) + "ْتُ";
        if (s.en === "we") arVerb = v.arPast.slice(0, -1) + "ْنَا";
        if (s.gender === "f" && s.person === "3") arVerb = v.arPast + "َتْ";
    } else if (tense === "present") {
        arVerb = v.arPres;
        if (s.en === "I") arVerb = "أَ" + v.arPres.slice(1);
        if (s.en === "we") arVerb = "نَ" + v.arPres.slice(1);
    } else {
        arVerb = v.arOrder; // Order mode
    }

    // Negation/Interrogation
    arFinal = arVerb;
    if (mode === "negative") arFinal = (tense === "past" ? "مَا " : "لَا ") + arFinal;
    if (mode === "interrogative") arFinal = "هَلْ " + arFinal;

    // Object Suffixing
    if (o.isSuffix) {
        let suffix = (o.en === "it") ? (s.gender === "f" ? o.ar_f : o.ar_m) : o.ar;
        arFinal = arFinal.trim() + suffix;
    } else {
        arFinal += " " + (s.person !== "2" || tense !== "order" ? s.ar + " " : "") + o.ar;
    }

    // --- ENGLISH CONSTRUCTION ---
    const is3rd = (s.person === "3");
    if (tense === "order") {
        enFinal = (mode === "negative" ? "Don't " : "") + v.en + " " + o.en + "!";
    } else if (tense === "past") {
        if (mode === "negative") enFinal = `${s.en} did not ${v.en} ${o.en}`;
        else if (mode === "interrogative") enFinal = `Did ${s.en.toLowerCase()} ${v.en} ${o.en}?`;
        else enFinal = `${s.en} ${v.enPast} ${o.en}`;
    } else { // Present
        if (mode === "negative") {
            enFinal = `${s.en} ${is3rd ? "does not" : "do not"} ${v.en} ${o.en}`;
        } else if (mode === "interrogative") {
            enFinal = `${is3rd ? "Does" : "Do"} ${s.en.toLowerCase()} ${v.en} ${o.en}?`;
        } else {
            enFinal = `${s.en} ${is3rd ? v.en + "s" : v.en} ${o.en}`;
        }
    }

    document.getElementById('ar-out').textContent = arFinal;
    document.getElementById('en-out').textContent = enFinal.charAt(0).toUpperCase() + enFinal.slice(1);
}

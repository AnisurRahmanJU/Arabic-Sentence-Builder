const verbs = [
    { id: "read", en: "read", enPast: "read", arPast: "قَرَأَ", arPres: "يَقْرَأُ", arOrd: "اِقْرَأْ" },
    { id: "eat", en: "eat", enPast: "ate", arPast: "أَكَلَ", arPres: "يَأْكُلُ", arOrd: "كُلْ" },
    { id: "drink", en: "drink", enPast: "drank", arPast: "شَرِبَ", arPres: "يَشْرَبُ", arOrd: "اِشْرَبْ" },
    { id: "open", en: "open", enPast: "opened", arPast: "فَتَحَ", arPres: "يَفْتَحُ", arOrd: "اِفْتَحْ" }
];

const subjects = {
    boy: { ar: "الْوَلَدُ", en: "The boy", p: "3" },
    girl: { ar: "الْبِنْتُ", en: "The girl", p: "3" },
    i: { ar: "أَنَا", en: "I", p: "1" },
    we: { ar: "نَحْنُ", en: "We", p: "1" },
    youM: { ar: "أَنْتَ", en: "You", p: "2" }
};

const objects = {
    book: { ar: "الْكِتَابَ", en: "the book" },
    apple: { ar: "التُّفَّاحَةَ", en: "the apple" },
    water: { ar: "الْمَاءَ", en: "the water" },
    door: { ar: "الْبَابَ", en: "the door" }
};

function init() {
    const vSel = document.getElementById('verb');
    const oSel = document.getElementById('object');
    verbs.forEach(v => vSel.add(new Option(`${v.en} (${v.arPast})`, v.id)));
    for (let key in objects) oSel.add(new Option(`${objects[key].en} (${objects[key].ar})`, key));
    updateUI();
}

function updateUI() {
    const t = document.getElementById('tense').value;
    const m = document.getElementById('mode').value;
    const sKey = document.getElementById('subject').value;
    const vKey = document.getElementById('verb').value;
    const oKey = document.getElementById('object').value;

    const s = subjects[sKey];
    const v = verbs.find(x => x.id === vKey);
    const o = objects[oKey];

    let arVerb = (t === "past") ? v.arPast : (t === "present" ? v.arPres : v.arOrd);
    
    // Arabic Suffixes
    if (t === "past") {
        if (sKey === "i") arVerb = v.arPast.slice(0, -1) + "ْتُ";
        else if (sKey === "we") arVerb = v.arPast.slice(0, -1) + "ْنَا";
        else if (sKey === "girl") arVerb = v.arPast + "َتْ";
    }

    // Sentence Building
    let arRes = (m === "interrogative" ? "هَلْ " : "") + 
                (m === "negative" ? (t === "past" ? "مَا " : "لَا ") : "") + 
                arVerb + " " + s.ar + " " + o.ar;

    if (t === "order") arRes = v.arOrd + " " + o.ar + "!";

    // English
    let enRes = "";
    if (t === "order") enRes = (m === "negative" ? "Don't " : "") + v.en + " " + o.en + "!";
    else if (t === "past") {
        if (m === "negative") enRes = `${s.en} did not ${v.en} ${o.en}`;
        else if (m === "interrogative") enRes = `Did ${s.en.toLowerCase()} ${v.en} ${o.en}?`;
        else enRes = `${s.en} ${v.enPast} ${o.en}`;
    } else {
        enRes = `${s.en} ${v.en}${s.p === "3" ? "s" : ""} ${o.en}`;
    }

    document.getElementById('ar-out').innerText = arRes;
    document.getElementById('en-out').innerText = enRes;
}

window.onload = init;

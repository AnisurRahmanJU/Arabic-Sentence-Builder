/* Arabic Sentence Builder Engine
   Developer: Md. Anisur Rahman
   Version: 2026 Advanced Logic
*/

// --- VERBS DATABASE ---
const verbs = [
    { id: "read", en: "read", enPast: "read", arPast: "قَرَأَ", arPres: "يَقْرَأُ", arOrd: "اِقْرَأْ" },
    { id: "eat", en: "eat", enPast: "ate", arPast: "أَكَلَ", arPres: "يَأْكُلُ", arOrd: "كُلْ" },
    { id: "drink", en: "drink", enPast: "drank", arPast: "شَرِبَ", arPres: "يَشْرَبُ", arOrd: "اِشْرَبْ" },
    { id: "open", en: "open", enPast: "opened", arPast: "فَتَحَ", arPres: "يَفْتَحُ", arOrd: "اِفْتَحْ" },
    { id: "write", en: "write", enPast: "wrote", arPast: "كَتَبَ", arPres: "يَكْتُبُ", arOrd: "اُكْتُبْ" },
    { id: "play", en: "play", enPast: "played", arPast: "لَعِبَ", arPres: "يَلْعَبُ", arOrd: "اِلْعَبْ" },
    { id: "watch", en: "watch", enPast: "watched", arPast: "شَاهَدَ", arPres: "يُشَاهِدُ", arOrd: "شَاهِدْ" },
    { id: "listen", en: "listen", enPast: "listened", arPast: "سَمِعَ", arPres: "يَسْمَعُ", arOrd: "اِسْمَعْ" },
    { id: "speak", en: "speak", enPast: "spoke", arPast: "تَكَلَّمَ", arPres: "يَتَكَلَّمُ", arOrd: "تَكَلَّمْ" },
    { id: "learn", en: "learn", enPast: "learned", arPast: "تَعَلَّمَ", arPres: "يَتَعَلَّمُ", arOrd: "تَعَلَّمْ" },
    { id: "teach", en: "teach", enPast: "taught", arPast: "دَرَّسَ", arPres: "يُدَرِّسُ", arOrd: "دَرِّسْ" },
    { id: "sleep", en: "sleep", enPast: "slept", arPast: "نَامَ", arPres: "يَنَامُ", arOrd: "نَمْ" },
    { id: "run", en: "run", enPast: "ran", arPast: "جَرَى", arPres: "يَجْرِي", arOrd: "اِجْرِ" },
    { id: "walk", en: "walk", enPast: "walked", arPast: "مَشَى", arPres: "يَمْشِي", arOrd: "اِمْشِ" }
];

// --- SUBJECTS DATABASE ---
const subjects = {
    boy: { ar: "الْوَلَدُ", en: "The boy", p: "3" },
    girl: { ar: "الْبِنْتُ", en: "The girl", p: "3" },
    i: { ar: "أَنَا", en: "I", p: "1" },
    we: { ar: "نَحْنُ", en: "We", p: "1" },
    youM: { ar: "أَنْتَ", en: "You", p: "2" },
    youF: { ar: "أَنْتِ", en: "You", p: "2" },
    he: { ar: "هُوَ", en: "He", p: "3" },
    she: { ar: "هِيَ", en: "She", p: "3" }
};

// --- OBJECTS DATABASE ---
const objects = {
    book: { ar: "الْكِتَابَ", en: "the book" },
    apple: { ar: "التُّفَّاحَةَ", en: "the apple" },
    water: { ar: "الْمَاءَ", en: "the water" },
    door: { ar: "الْبَابَ", en: "the door" },
    pen: { ar: "القَلَمَ", en: "the pen" },
    food: { ar: "الطَّعَامَ", en: "the food" },
    school: { ar: "المَدْرَسَةَ", en: "the school" },
    car: { ar: "السَّيَّارَةَ", en: "the car" }
};

// --- INITIALIZE DROPDOWNS ---
function init() {
    const vSel = document.getElementById('verb');
    const oSel = document.getElementById('object');
    const sSel = document.getElementById('subject');

    // Populate Verb dropdown
    vSel.innerHTML = "";
    verbs.forEach(v => vSel.add(new Option(`${v.en} (${v.arPast})`, v.id)));

    // Populate Object dropdown
    oSel.innerHTML = "";
    for (let key in objects) oSel.add(new Option(`${objects[key].en} (${objects[key].ar})`, key));

    // Populate Subject dropdown
    sSel.innerHTML = "";
    for (let key in subjects) sSel.add(new Option(`${subjects[key].en} (${subjects[key].ar})`, key));

    updateUI();
}

// --- UPDATE OUTPUT ---
function updateUI() {
    const t = document.getElementById('tense').value;   // past, present, order
    const m = document.getElementById('mode').value;    // affirmative, negative, interrogative
    const sKey = document.getElementById('subject').value;
    const vKey = document.getElementById('verb').value;
    const oKey = document.getElementById('object').value;

    const s = subjects[sKey];
    const v = verbs.find(x => x.id === vKey);
    const o = objects[oKey];

    // --- ARABIC LOGIC ---
    let arVerb = (t === "past") ? v.arPast : (t === "present" ? v.arPres : v.arOrd);

    // Adjust past tense for pronouns
    if (t === "past") {
        if (sKey === "i") arVerb = v.arPast.slice(0, -1) + "ْتُ";
        else if (sKey === "we") arVerb = v.arPast.slice(0, -1) + "ْنَا";
        else if (sKey === "girl") arVerb = v.arPast + "َتْ";
    }

    let arRes = "";
    if (t === "order") {
        arRes = v.arOrd + " " + o.ar + "!";
    } else {
        let prefix = "";
        if (m === "interrogative") prefix = "هَلْ ";
        if (m === "negative") prefix += (t === "past" ? "مَا " : "لَا ");
        arRes = prefix + arVerb + " " + s.ar + " " + o.ar;
    }

    // --- ENGLISH LOGIC ---
    let enRes = "";
    const is3rdPerson = (s.p === "3");

    if (t === "order") {
        let negPrefix = (m === "negative") ? "Don't " : "";
        enRes = negPrefix + v.en + " " + o.en + "!";
    } else if (t === "past") {
        if (m === "negative") enRes = `${s.en} did not ${v.en} ${o.en}`;
        else if (m === "interrogative") enRes = `Did ${s.en.toLowerCase()} ${v.en} ${o.en}?`;
        else enRes = `${s.en} ${v.enPast} ${o.en}`;
    } else {
        const helper = is3rdPerson ? "does" : "do";
        if (m === "negative") enRes = `${s.en} ${helper} not ${v.en} ${o.en}`;
        else if (m === "interrogative") {
            let capHelper = helper.charAt(0).toUpperCase() + helper.slice(1);
            enRes = `${capHelper} ${s.en.toLowerCase()} ${v.en} ${o.en}?`;
        } else {
            let verbForm = is3rdPerson ? v.en + "s" : v.en;
            enRes = `${s.en} ${verbForm} ${o.en}`;
        }
    }

    // --- OUTPUT ---
    document.getElementById('ar-out').innerText = arRes;
    document.getElementById('en-out').innerText = enRes;
}

// --- EVENT LISTENERS ---
window.onload = init;
document.getElementById('subject').addEventListener("change", updateUI);
document.getElementById('verb').addEventListener("change", updateUI);
document.getElementById('object').addEventListener("change", updateUI);
document.getElementById('tense').addEventListener("change", updateUI);
document.getElementById('mode').addEventListener("change", updateUI);

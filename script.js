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
    anisur:    { en: "Anisur", ar: "أَنِيسٌ", p: "3sm", n: "s" },
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
    nahnu:     { en: "We", ar: "نَحْنُ", p: "1p", n: "p" }
};

const verbs = {
    dhahaba: { en: "go", pastEn: "went", ar: {
        past: { "3sm":"ذَهَبَ", "3dm":"ذَهَبَا", "3pm":"ذَهَبُوا", "3sf":"ذَهَبَتْ", "3df":"ذَهَبَتَا", "3pf":"ذَهَبْنَ", "2sm":"ذَهَبْتَ", "2dm":"ذَهَبْتُمَا", "2pm":"ذَهَبْتُمْ", "2sf":"ذَهَبْتِ", "2df":"ذَهَبْتُمَا", "2pf":"ذَهَبْتُنَّ", "1s":"ذَهَبْتُ", "1p":"ذَهَبْنَا" },
        present: { "3sm":"يَذْهَبُ", "3dm":"يَذْهَبَانِ", "3pm":"يَذْهَبُونَ", "3sf":"تَذْهَبُ", "3df":"تَذْهَبَانِ", "3pf":"يَذْهَبْنَ", "2sm":"تَذْهَبُ", "2dm":"تَذْهَبَانِ", "2pm":"تَذْهَبُونَ", "2sf":"تَذْهَبِينَ", "2df":"تَذْهَبَانِ", "2pf":"تَذْهَبْنَ", "1s":"أَذْهَبُ", "1p":"نَذْهَبُ" },
        order: { "2sm":"اِذْهَبْ", "2sf":"اِذْهَبِي", "2dm":"اِذْهَبَا", "2df":"اِذْهَبَا", "2pm":"اِذْهَبُوا", "2pf":"اِذْهَبْنَ" }
    }},
    nasara: { en: "help", pastEn: "helped", ar: {
        past: { "3sm":"نَصَرَ", "3dm":"نَصَرَا", "3pm":"نَصَرُوا", "3sf":"نَصَرَتْ", "3df":"نَصَرَتَا", "3pf":"نَصَرْنَ", "2sm":"نَصَرْتَ", "2dm":"نَصَرْتُمَا", "2pm":"نَصَرْتُمْ", "2sf":"نَصَرْتِ", "2df":"نَصَرْتُمَا", "2pf":"نَصَرْتُنَّ", "1s":"نَصَرْتُ", "1p":"نَصَرْنَا" },
        present: { "3sm":"يَنْصُرُ", "3dm":"يَنْصُرَانِ", "3pm":"يَنْصُرُونَ", "3sf":"تَنْصُرُ", "3df":"تَنْصُرَانِ", "3pf":"يَنْصُرْنَ", "2sm":"تَنْصُرُ", "2dm":"تَنْصُرَانِ", "2pm":"تَنْصُرُونَ", "2sf":"تَنْصُرِينَ", "2df":"تَنْصُرَانِ", "2pf":"تَنْصُرْنَ", "1s":"أَنْصُرُ", "1p":"نَنْصُرُ" },
        order: { "2sm":"اُنْصُرْ", "2sf":"اُنْصُرِي", "2dm":"اُنْصُرَا", "2df":"اُنْصُرَا", "2pm":"اُنْصُرُوا", "2pf":"اُنْصُرْنَ" }
    }},
    akala: { en: "eat", pastEn: "ate", ar: {
        past: { "3sm":"أَكَلَ", "3dm":"أَكَلَا", "3pm":"أَكَلُوا", "3sf":"أَكَلَتْ", "3df":"أَكَلَتَا", "3pf":"أَكَلْنَ", "2sm":"أَكَلْتَ", "2dm":"أَكَلْتُمَا", "2pm":"أَكَلْتُمْ", "2sf":"أَكَلْتِ", "2df":"أَكَلْتُمَا", "2pf":"أَكَلْتُنَّ", "1s":"أَكَلْتُ", "1p":"أَكَلْنَا" },
        present: { "3sm":"يَأْكُلُ", "3dm":"يَأْكُلَانِ", "3pm":"يَأْكُلُونَ", "3sf":"تَأْكُلُ", "3df":"تَأْكُلَانِ", "3pf":"يَأْكُلْنَ", "2sm":"تَأْكُلُ", "2dm":"تَأْكُلَانِ", "2pm":"تَأْكُلُونَ", "2sf":"تَأْكُلِينَ", "2df":"تَأْكُلَانِ", "2pf":"تَأْكُلْنَ", "1s":"آكُلُ", "1p":"نَأْكُلُ" },
        order: { "2sm":"كُلْ", "2sf":"كُلِي", "2dm":"كُلَا", "2df":"كُلَا", "2pm":"كُلُوا", "2pf":"كُلْنَ" }
    }},
    shariba: { en: "drink", pastEn: "drank", ar: {
        past: { "3sm":"شَرِبَ", "3dm":"شَرِبَا", "3pm":"شَرِبُوا", "3sf":"شَرِبَتْ", "3df":"شَرِبَتَا", "3pf":"شَرِبْنَ", "2sm":"شَرِبْتَ", "2dm":"شَرِبْتُمَا", "2pm":"شَرِبْتُمْ", "2sf":"شَرِبْتِ", "2df":"شَرِبْتُمَا", "2pf":"شَرِبْتُنَّ", "1s":"شَرِبْتُ", "1p":"شَرِبْنَا" },
        present: { "3sm":"يَشْرَبُ", "3dm":"يَشْرَبَانِ", "3pm":"يَشْرَبُونَ", "3sf":"تَشْرَبُ", "3df":"تَشْرَبَانِ", "3pf":"يَشْرَبْنَ", "2sm":"تَسْرَبُ", "2dm":"تَسْرَبَانِ", "2pm":"تَسْرَبُونَ", "2sf":"تَسْرَبِينَ", "2df":"تَسْرَبَانِ", "2pf":"تَسْرَبْنَ", "1s":"أَشْرَبُ", "1p":"نَشْرَبُ" },
        order: { "2sm":"اِشْرَبْ", "2sf":"اِشْرَبِي", "2dm":"اِشْرَبَا", "2df":"اِشْرَبَا", "2pm":"اِشْرَبُوا", "2pf":"اِشْرَبْنَ" }
    }},
    kataba: { en: "write", pastEn: "wrote", ar: {
        past: { "3sm":"كَتَبَ", "3dm":"كَتَبَا", "3pm":"كَتَبُوا", "3sf":"كَتَبَتْ", "3df":"كَتَبَتَا", "3pf":"كَتَبْنَ", "2sm":"كَتَبْتَ", "2dm":"كَتَبْتُمَا", "2pm":"كَتَبْتُمْ", "2sf":"كَتَبْتِ", "2df":"كَتَبْتُمَا", "2pf":"كَتَبْتُنَّ", "1s":"كَتَبْتُ", "1p":"كَتَبْنَا" },
        present: { "3sm":"يَكْتُبُ", "3dm":"يَكْتُبَانِ", "3pm":"يَكْتُبُونَ", "3sf":"تَكْتُبُ", "3df":"تَكْتُبَانِ", "3pf":"يَكْتُبْنَ", "2sm":"تَكْتُبُ", "2dm":"تَكْتُبَانِ", "2pm":"تَكْتُبُونَ", "2sf":"تَكْتُبِينَ", "2df":"تَكْتُبَانِ", "2pf":"تَكْتُبْنَ", "1s":"أكْتُبُ", "1p":"نَكْتُبُ" },
        order: { "2sm":"اُكْتُبْ", "2sf":"اُكْتُبِي", "2dm":"اُكْتُبَا", "2df":"اُكْتُبَا", "2pm":"اُكْتُبُوا", "2pf":"اُكْتُبْنَ" }
    }},
    fataha: { en: "open", pastEn: "opened", ar: {
        past: { "3sm":"فَتَحَ", "3dm":"فَتَحَا", "3pm":"فَتَحُوا", "3sf":"فَتَحَتْ", "3df":"فَتَحَتَا", "3pf":"فَتَحْنَ", "2sm":"فَتَحْتَ", "2dm":"فَتَحْتُمَا", "2pm":"فَتَحْتُمْ", "2sf":"فَتَحْتِ", "2df":"فَتَحْتُمَا", "2pf":"فَتَحْتُنَّ", "1s":"فَتَحْتُ", "1p":"فَتَحْنَا" },
        present: { "3sm":"يَفْتَحُ", "3dm":"يَفْتَحَانِ", "3pm":"يَفْتَحُونَ", "3sf":"تَفْتَحُ", "3df":"تَفْتَحَانِ", "3pf":"يَفْتَحْنَ", "2sm":"تَفْتَحُ", "2dm":"تَفْتَحَانِ", "2pm":"تَفْتَحُونَ", "2sf":"تَفْتَحِينَ", "2df":"تَفْتَحَانِ", "2pf":"تَفْتَحْنَ", "1s":"أَفْتَحُ", "1p":"نَفْتَحُ" },
        order: { "2sm":"اِفْتَحْ", "2sf":"اِفْتَحِي", "2dm":"اِفْتَحَا", "2df":"اِفْتَحَا", "2pm":"اِفْتَحُوا", "2pf":"اِفْتَحْنَ" }
    }},
    jalasa: { en: "sit", pastEn: "sat", ar: {
        past: { "3sm":"جَلَسَ", "3dm":"جَلَسَا", "3pm":"جَلَسُوا", "3sf":"جَلَسَتْ", "3df":"جَلَسَتَا", "3pf":"جَلَسْنَ", "2sm":"جَلَسْتَ", "2dm":"جَلَسْتُمَا", "2pm":"جَلَسْتُمْ", "2sf":"جَلَسْتِ", "2df":"جَلَسْتُمَا", "2pf":"جَلَسْتُنَّ", "1s":"جَلَسْتُ", "1p":"جَلَسْنَا" },
        present: { "3sm":"يَجْلِسُ", "3dm":"يَجْلِسَانِ", "3pm":"يَجْلِسُونَ", "3sf":"تَجْلِسُ", "3df":"تَجْلِسَانِ", "3pf":"يَجْلِسْنَ", "2sm":"تَجْلِسُ", "2dm":"تَجْلِسَانِ", "2pm":"تَجْلِسُونَ", "2sf":"تَجْلِسِينَ", "2df":"تَجْلِسَانِ", "2pf":"تَجْلِسْنَ", "1s":"أَجْلِسُ", "1p":"نَجْلِسُ" },
        order: { "2sm":"اِجْلِسْ", "2sf":"اِجْلِسِي", "2dm":"اِجْلِسَا", "2df":"اِجْلِسَا", "2pm":"اِجْلِسُوا", "2pf":"اِجْلِسْنَ" }
    }},
    qaraa: { en: "read", pastEn: "read", ar: {
        past: { "3sm":"قَرَأَ", "3dm":"قَرَأَا", "3pm":"قَرَأُوا", "3sf":"قَرَأَتْ", "3df":"قَرَأَتَا", "3pf":"قَرَأْنَ", "2sm":"قَرَأْتَ", "2dm":"قَرَأْتُمَا", "2pm":"قَرَأْتُمْ", "2sf":"قَرَأْتِ", "2df":"قَرَأْتُمَا", "2pf":"قَرَأْتُنَّ", "1s":"قَرَأْتُ", "1p":"قَرَأْنَا" },
        present: { "3sm":"يَقْرَأُ", "3dm":"يَقْرَأَانِ", "3pm":"يَقْرَأُونَ", "3sf":"تَقْرَأُ", "3df":"تَقْرَأَانِ", "3pf":"يَقْرَأْنَ", "2sm":"تَقْرَأُ", "2dm":"تَقْرَأَانِ", "2pm":"تَقْرَأُونَ", "2sf":"تَقْرَأِينَ", "2df":"تَقْرَأَانِ", "2pf":"تَقْرَأْنَ", "1s":"أَقْرَأُ", "1p":"نَقْرَأُ" },
        order: { "2sm":"اِقْرَأْ", "2sf":"اِقْرَأِي", "2dm":"اِقْرَأَا", "2df":"اِقْرَأَا", "2pm":"اِقْرَأُوا", "2pf":"اِقْرَأْنَ" }
    }},
    ghasala: { en: "wash", pastEn: "washed", ar: {
        past: { "3sm":"غَسَلَ", "3dm":"غَسَلَا", "3pm":"غَسَلُوا", "3sf":"غَسَلَتْ", "3df":"غَسَلَتَا", "3pf":"غَسَلْنَ", "2sm":"غَسَلْتَ", "2dm":"غَسَلْتُمَا", "2pm":"غَسَلْتُمْ", "2sf":"غَسَلْتِ", "2df":"غَسَلْتُمَا", "2pf":"غَسَلْتُنَّ", "1s":"غَسَلْتُ", "1p":"غَسَلْنَا" },
        present: { "3sm":"يَغْسِلُ", "3dm":"يَغْسِلَانِ", "3pm":"يَغْسِلُونَ", "3sf":"تَغْسِلُ", "3df":"تَغْسِلَانِ", "3pf":"يَغْسِلْنَ", "2sm":"تَغْسِلُ", "2dm":"تَغْسِلَانِ", "2pm":"تَغْسِلُونَ", "2sf":"تَغْسِلِينَ", "2df":"تَغْسِلَانِ", "2pf":"تَغْسِلْنَ", "1s":"أَغْسِلُ", "1p":"نَغْسِلُ" },
        order: { "2sm":"اِغْسِلْ", "2sf":"اِغْسِلِي", "2dm":"اِغْسِلَا", "2df":"اِغْسِلَا", "2pm":"اِغْسِلُوا", "2pf":"اِغْسِلْنَ" }
    }},
    dakhala: { en: "enter", pastEn: "entered", ar: {
        past: { "3sm":"دَخَلَ", "3dm":"دَخَلَا", "3pm":"دَخَلُوا", "3sf":"دَخَلَتْ", "3df":"دَخَلَتَا", "3pf":"دَخَلْنَ", "2sm":"دَخَلْتَ", "2dm":"دَخَلْتُمَا", "2pm":"دَخَلْتُمْ", "2sf":"دَخَلْتِ", "2df":"دَخَلْتُمَا", "2pf":"دَخَلْتُنَّ", "1s":"دَخَلْتُ", "1p":"دَخَلْنَا" },
        present: { "3sm":"يَدْخُلُ", "3dm":"يَدْخُلَانِ", "3pm":"يَدْخُلُونَ", "3sf":"تَدْخُلُ", "3df":"تَدْخُلَانِ", "3pf":"يَدْخُلْنَ", "2sm":"تَدْخُلُ", "2dm":"تَدْخُلَانِ", "2pm":"تَدْخُلُونَ", "2sf":"تَدْخُلِينَ", "2df":"تَدْخُلَانِ", "2pf":"تَدْخُلْنَ", "1s":"أَدْخُلُ", "1p":"نَدْخُلُ" },
        order: { "2sm":"اُدْخُلْ", "2sf":"اُدْخُلِي", "2dm":"اُدْخُلَا", "2df":"اُدْخُلَا", "2pm":"اُدْخُلُوا", "2pf":"اُدْخُلْنَ" }
    }},
    kharaja: { en: "exit", pastEn: "exited", ar: {
        past: { "3sm":"خَرَجَ", "3dm":"خَرَجَا", "3pm":"خَرَجُوا", "3sf":"خَرَجَتْ", "3df":"خَرَجَتَا", "3pf":"خَرَجْنَ", "2sm":"خَرَجْتَ", "2dm":"خَرَجْتُمَا", "2pm":"خَرَجْتُمْ", "2sf":"خَرَجْتِ", "2df":"خَرَجْتُمَا", "2pf":"خَرَجْتُنَّ", "1s":"خَرَجْتُ", "1p":"خَرَجْنَا" },
        present: { "3sm":"يَخْرُجُ", "3dm":"يَخْرُجَانِ", "3pm":"يَخْرُجُونَ", "3sf":"تَخْرُجُ", "3df":"تَخْرُجَانِ", "3pf":"يَخْرُجْنَ", "2sm":"تَخْرُجُ", "2dm":"تَخْرُجَانِ", "2pm":"تَخْرُجُونَ", "2sf":"تَخْرُجِينَ", "2df":"تَخْرُجَانِ", "2pf":"تَخْرُجْنَ", "1s":"أَخْرُجُ", "1p":"نَخْرُجُ" },
        order: { "2sm":"اُخْرُجْ", "2sf":"اُخْرُجِي", "2dm":"اُخْرُجَا", "2df":"اُخْرُجَا", "2pm":"اُخْرُجُوا", "2pf":"اُخْرُجْنَ" }
    }},
    darasa: { en: "study", pastEn: "studied", ar: {
        past: { "3sm":"دَرَسَ", "3dm":"دَرَسَا", "3pm":"دَرَسُوا", "3sf":"دَرَسَتْ", "3df":"دَرَسَتَا", "3pf":"دَرَسْنَ", "2sm":"دَرَسْتَ", "2dm":"دَرَسْتُمَا", "2pm":"دَرَسْتُمْ", "2sf":"دَرَسْتِ", "2df":"دَرَسْتُمَا", "2pf":"دَرَسْتُنَّ", "1s":"دَرَسْتُ", "1p":"دَرَسْنَا" },
        present: { "3sm":"يَدْرُسُ", "3dm":"يَدْرُسَانِ", "3pm":"يَدْرُسُونَ", "3sf":"تَدْرُسُ", "3df":"تَدْرُسَانِ", "3pf":"يَدْرُسْنَ", "2sm":"تَدْرُسُ", "2dm":"تَدْرُسَانِ", "2pm":"تَدْرُسُونَ", "2sf":"تَدْرُسِينَ", "2df":"تَدْرُسَانِ", "2pf":"تَدْرُسْنَ", "1s":"أَدْرُسُ", "1p":"نَدْرُسُ" },
        order: { "2sm":"اُدْرُسْ", "2sf":"اُدْرُسِي", "2dm":"اُدْرُسَا", "2df":"اُدْرُسَا", "2pm":"اُدْرُسُوا", "2pf":"اُدْرُسْنَ" }
    }},
    faala: { en: "do", pastEn: "did", ar: {
        past: { "3sm":"فَعَلَ", "3dm":"فَعَلَا", "3pm":"فَعَلُوا", "3sf":"فَعَلَتْ", "3df":"فَعَلَتَا", "3pf":"فَعَلْنَ", "2sm":"فَعَلْتَ", "2dm":"فَعَلْتُمَا", "2pm":"فَعَلْتُمْ", "2sf":"فَعَلْتِ", "2df":"فَعَلْتُمَا", "2pf":"فَعَلْتُنَّ", "1s":"فَعَلْتُ", "1p":"فَعَلْنَا" },
        present: { "3sm":"يَفْعَلُ", "3dm":"يَفْعَلَانِ", "3pm":"يَفْعَلُونَ", "3sf":"تَفْعَلُ", "3df":"تَفْعَلَانِ", "3pf":"يَفْعَلْنَ", "2sm":"تَفْعَلُ", "2dm":"تَفْعَلَانِ", "2pm":"تَفْعَلُونَ", "2sf":"تَفْعَلِينَ", "2df":"تَفْعَلَانِ", "2pf":"تَفْعَلْنَ", "1s":"أَفْعَلُ", "1p":"نَفْعَلُ" },
        order: { "2sm":"اِفْعَلْ", "2sf":"اِفْعَلِي", "2dm":"اِفْعَلَا", "2df":"اِفْعَلَا", "2pm":"اِفْعَلُوا", "2pf":"اِفْعَلْنَ" }
    }},
    labisa: { en: "wear", pastEn: "wore", ar: {
        past: { "3sm":"لَبِسَ", "3dm":"لَبِسَا", "3pm":"لَبِسُوا", "3sf":"لَبِسَتْ", "3df":"لَبِسَتَا", "3pf":"لَبِسْنَ", "2sm":"لَبِسْتَ", "2dm":"لَبِسْتُمَا", "2pm":"لَبِسْتُمْ", "2sf":"لَبِسْتِ", "2df":"لَبِسْتُمَا", "2pf":"لَبِسْتُنَّ", "1s":"لَبِسْتُ", "1p":"لَبِسْنَا" },
        present: { "3sm":"يَلْبَسُ", "3dm":"يَلْبَسَانِ", "3pm":"يَلْبَسُونَ", "3sf":"تَلْبَسُ", "3df":"تَلْبَسَانِ", "3pf":"يَلْبَسْنَ", "2sm":"تَلْبَسُ", "2dm":"تَلْبَسَانِ", "2pm":"تَلْبَسُونَ", "2sf":"تَلْبَسِينَ", "2df":"تَلْبَسَانِ", "2pf":"تَلْبَسْنَ", "1s":"أَلْبَسُ", "1p":"نَلْبَسُ" },
        order: { "2sm":"اِلْبَسْ", "2sf":"اِلْبَسِي", "2dm":"اِلْبَسَا", "2df":"اِلْبَسَا", "2pm":"اِلْبَسُوا", "2pf":"اِلْبَسْنَ" }
    }},
    rakiba: { en: "ride", pastEn: "rode", ar: {
        past: { "3sm":"رَكِبَ", "3dm":"رَكِبَا", "3pm":"رَكِبُوا", "3sf":"رَكِبَتْ", "3df":"رَكِبَتَا", "3pf":"رَكِبْنَ", "2sm":"رَكِبْتَ", "2dm":"رَكِبْتُمَا", "2pm":"رَكِبْتُمْ", "2sf":"رَكِبْتِ", "2df":"رَكِبْتُمَا", "2pf":"رَكِبْتُنَّ", "1s":"رَكِبْتُ", "1p":"رَكِبْنَا" },
        present: { "3sm":"يَرْكَبُ", "3dm":"يَرْكَبَانِ", "3pm":"يَرْكَبُونَ", "3sf":"تَرْكَبُ", "3df":"تَرْكَبَانِ", "3pf":"يَرْكَبْنَ", "2sm":"تَرْكَبُ", "2dm":"تَرْكَبَانِ", "2pm":"تَرْكَبُونَ", "2sf":"تَرْكَبِينَ", "2df":"تَرْكَبَانِ", "2pf":"تَرْكَبْنَ", "1s":"أَرْكَبُ", "1p":"نَرْكَبُ" },
        order: { "2sm":"اِرْكَبْ", "2sf":"اِرْكَبِي", "2dm":"اِرْكَبَا", "2df":"اِرْكَبَا", "2pm":"اِرْكَبُوا", "2pf":"اِرْكَبْنَ" }
    }},
    nazara: { en: "look", pastEn: "looked", ar: {
        past: { "3sm":"نَظَرَ", "3dm":"نَظَرَا", "3pm":"نَظَرُوا", "3sf":"نَظَرَتْ", "3df":"نَظَرَتَا", "3pf":"نَظَرْنَ", "2sm":"نَظَرْتَ", "2dm":"نَظَرْتُمَا", "2pm":"نَظَرْتُمْ", "2sf":"نَظَرْتِ", "2df":"نَظَرْتُمَا", "2pf":"نَظَرْتُنَّ", "1s":"نَظَرْتُ", "1p":"نَظَرْنَا" },
        present: { "3sm":"يَنْظُرُ", "3dm":"يَنْظُرَانِ", "3pm":"يَنْظُرُونَ", "3sf":"تَنْظُرُ", "3df":"تَنْظُرَانِ", "3pf":"يَنْظُرْنَ", "2sm":"تَنْظُرُ", "2dm":"تَنْظُرَانِ", "2pm":"تَنْظُرُونَ", "2sf":"تَنْظُرِينَ", "2df":"تَنْظُرَانِ", "2pf":"تَنْظُرْنَ", "1s":"أَنْظُرُ", "1p":"نَنْظُرُ" },
        order: { "2sm":"اُنْظُرْ", "2sf":"اُنْظُرِي", "2dm":"اُنْظُرَا", "2df":"اُنْظُرَا", "2pm":"اُنْظُرُوا", "2pf":"اُنْظُرْنَ" }
    }},
    samia: { en: "hear", pastEn: "heard", ar: {
        past: { "3sm":"سَمِعَ", "3dm":"سَمِعَا", "3pm":"سَمِعُوا", "3sf":"سَمِعَتْ", "3df":"سَمِعَتَا", "3pf":"سَمِعْنَ", "2sm":"سَمِعْتَ", "2dm":"سَمِعْتُمَا", "2pm":"سَمِعْتُمْ", "2sf":"سَمِعْتِ", "2df":"سَمِعْتُمَا", "2pf":"سَمِعْتُنَّ", "1s":"سَمِعْتُ", "1p":"سَمِعْنَا" },
        present: { "3sm":"يَسْمَعُ", "3dm":"يَسْمَعَانِ", "3pm":"يَسْمَعُونَ", "3sf":"تَسْمَعُ", "3df":"تَسْمَعَانِ", "3pf":"يَسْمَعْنَ", "2sm":"تَسْمَعُ", "2dm":"تَسْمَعَانِ", "2pm":"تَسْمَعُونَ", "2sf":"تَسْمَعِينَ", "2df":"تَسْمَعَانِ", "2pf":"تَسْمَعْنَ", "1s":"أَسْمَعُ", "1p":"نَسْمَعُ" },
        order: { "2sm":"اِسْمَعْ", "2sf":"اِسْمَعِي", "2dm":"اِسْمَعَا", "2df":"اِسْمَعَا", "2pm":"اِسْمَعُوا", "2pf":"اِسْمَعْنَ" }
    }},
    daraba: { en: "hit", pastEn: "hit", ar: {
        past: { "3sm":"ضَرَبَ", "3dm":"ضَرَبَا", "3pm":"ضَرَبُوا", "3sf":"ضَرَبَتْ", "3df":"ضَرَبَتَا", "3pf":"ضَرَبْنَ", "2sm":"ضَرَبْتَ", "2dm":"ضَرَبْتُمَا", "2pm":"ضَرَبْتُمْ", "2sf":"ضَرَبْتِ", "2df":"ضَرَبْتُمَا", "2pf":"ضَرَبْتُنَّ", "1s":"ضَرَبْتُ", "1p":"ضَرَبْنَا" },
        present: { "3sm":"يَضْرِبُ", "3dm":"يَضْرِبَانِ", "3pm":"يَضْرِبُونَ", "3sf":"تَضْرِبُ", "3df":"تَضْرِبَانِ", "3pf":"يَضْرِبْنَ", "2sm":"تَضْرِبُ", "2dm":"تَضْرِبَانِ", "2pm":"تَضْرِبُونَ", "2sf":"تَضْرِبِينَ", "2df":"تَضْرِبَانِ", "2pf":"تَضْرِبْنَ", "1s":"أَضْرِبُ", "1p":"نَضْرِبُ" },
        order: { "2sm":"اِضْرِبْ", "2sf":"اِضْرِبِي", "2dm":"اِضْرِبَا", "2df":"اِضْرِبَا", "2pm":"اِضْرِبُوا", "2pf":"اِضْرِبْنَ" }
    }},
    arafa: { en: "know", pastEn: "knew", ar: {
        past: { "3sm":"عَرَفَ", "3dm":"عَرَفَا", "3pm":"عَرَفُوا", "3sf":"عَرَفَتْ", "3df":"عَرَفَتَا", "3pf":"عَرَفْنَ", "2sm":"عَرَفْتَ", "2dm":"عَرَفْتُمَا", "2pm":"عَرَفْتُمْ", "2sf":"عَرَفْتِ", "2df":"عَرَفْتُمَا", "2pf":"عَرَفْتُنَّ", "1s":"عَرَفْتُ", "1p":"عَرَفْنَا" },
        present: { "3sm":"يَعْرِفُ", "3dm":"يَعْرِفَانِ", "3pm":"يَعْرِفُونَ", "3sf":"تَعْرِفُ", "3df":"تَعْرِفَانِ", "3pf":"يَعْرِفْنَ", "2sm":"تَعْرِفُ", "2dm":"تَعْرِفَانِ", "2pm":"تَعْرِفُونَ", "2sf":"تَعْرِفِينَ", "2df":"تَعْرِفَانِ", "2pf":"تَعْرِفْنَ", "1s":"أَعْرِفُ", "1p":"نَعْرِفُ" },
        order: { "2sm":"اِعْرِفْ", "2sf":"اِعْرِفِي", "2dm":"اِعْرِفَا", "2df":"اِعْرِفَا", "2pm":"اِعْرِفُوا", "2pf":"اِعْرِفْنَ" }
    }},
    sajada: { en: "prostrate", pastEn: "prostrated", ar: {
        past: { "3sm":"سَجَدَ", "3dm":"سَجَدَا", "3pm":"سَجَدُوا", "3sf":"سَجَدَتْ", "3df":"سَجَدَتَا", "3pf":"سَجَدْنَ", "2sm":"سَجَدْتَ", "2dm":"سَجَدْتُمَا", "2pm":"سَجَدْتُمْ", "2sf":"سَجَدْتِ", "2df":"سَجَدْتُمَا", "2pf":"سَجَدْتُنَّ", "1s":"سَجَدْتُ", "1p":"سَجَدْنَا" },
        present: { "3sm":"يَسْجُدُ", "3dm":"يَسْجُدَانِ", "3pm":"يَسْجُدُونَ", "3sf":"تَسْجُدُ", "3df":"تَسْجُدَانِ", "3pf":"يَسْجُدْنَ", "2sm":"تَسْجُدُ", "2dm":"تَسْجُدَانِ", "2pm":"تَسْجُدُونَ", "2sf":"تَسْجُدِينَ", "2df":"تَسْجُدَانِ", "2pf":"تَسْجُدْنَ", "1s":"أَسْجُدُ", "1p":"نَسْجُدُ" },
        order: { "2sm":"اُسْجُدْ", "2sf":"اُسْجُدِي", "2dm":"اُسْجُدَا", "2df":"اُسْجُدَا", "2pm":"اُسْجُدُوا", "2pf":"اُسْجُدْنَ" }
    }}
};

const prepositions = {
    ila:  { en: "to",  ar: "إِلَى" }, // Put this first to auto-load
    none: { en: "None", ar: "" },      // Keep 'none' as an option
    fi:   { en: "in",  ar: "فِي" },
    ala:  { en: "on",  ar: "عَلَى" },
    min:  { en: "from", ar: "مِنْ" },
    an:   { en: "about", ar: "عَنْ" },
    inda: { en: "at",   ar: "عِنْدَ" },
    mAa:  { en: "with", ar: "مَعَ" },
    bi:   { en: "by", ar: "بِ" }
};

const objects = {
    madrasah: { en: "the school", ar: "الْمَدْرَسَةَ", arJer: "الْمَدْرَسَةِ", type: "noun" },
    ghurfah: { en: "the room", ar: "الْغُرْفَةَ", arJer: "الْغُرْفَةِ", type: "noun" },
    bait:    { en: "the house", ar: "الْبَيْتَ", arJer: "الْبَيْتِ", type: "noun" },
    masjid:  { en: "the mosque", ar: "الْمَسْجِدَ", arJer: "الْمَسْجِدِ", type: "noun" },
    jaridah: { en: "the newspaper", ar: "الْجَرِيدَةَ", arJer: "الْجَرِيدَةِ", type: "noun" },
    qissah:  { en: "the story", ar: "الْقِصَّةَ", arJer: "الْقِصَّةِ", type: "noun" },
    makan:   { en: "the place", ar: "الْمَكَانَ", arJer: "الْمَكَانِ", type: "noun" },
    ard:     { en: "the ground", ar: "الْأَرْضَ", arJer: "الْأَرْضِ", type: "noun" },
    chair:   { en: "the chair", ar: "الْكُرْسِيَّ", arJer: "الْكُرْسِيِّ", type: "noun" },
    lugha:   { en: "the language", ar: "اللُّغَةَ", arJer: "اللُّغَةِ", type: "noun" },
    kitab:   { en: "the book", ar: "الْكِتَابَ", arJer: "الْكِتَابِ", type: "noun" },
    ruzz:      { en: "rice", ar: "الرُّزَّ", arJer: "الرُّزِّ", type: "noun" },
    maa:       { en: "water", ar: "الْمَاءَ", arJer: "الْمَاءِ", type: "noun" },
    tuffah:    { en: "apple", ar: "التُّفَّاحَةَ", arJer: "التُّفَّاحَةِ", type: "noun" },
    walad:     { en: "the boy", ar: "الْوَلَدَ", arJer: "الْوَلَدِ", type: "noun" },
    bint:      { en: "the girl", ar: "الْبِنْتَ", arJer: "الْبِنْتِ", type: "noun" },
    imtihan: { en: "the exam", ar: "الِامْتِحَانَ", arJer: "الِامْتِحَانِ", type: "noun" },
    yadayn:  { en: "the hands", ar: "الْيَدَيْنِ", arJer: "الْيَدَيْنِ", type: "noun" },
    wajh:    { en: "the face", ar: "الْوَجْهَ", arJer: "الْوَجْهِ", type: "noun" },
    qamis:   { en: "the shirt", ar: "الْقَمِيصَ", arJer: "الْقَمِيصِ", type: "noun" },
    libas:   { en: "the clothes", ar: "اللِّبَاسَ", arJer: "اللِّبَاسِ", type: "noun" },
    darrajah:{ en: "the bicycle", ar: "الدَّرَّاجَةَ", arJer: "الدَّرَّاجَةِ", type: "noun" },
    safinah: { en: "the ship", ar: "السَّفِينَةَ", arJer: "السَّفِينَةِ", type: "noun" },
    shay:    { en: "the thing", ar: "الشَّيْءَ", arJer: "الشَّيْءِ", type: "noun" },
    samaa:   { en: "the sky", ar: "السَّمَاءَ", arJer: "السَّمَاءِ", type: "noun" },
    kalam:   { en: "the speech", ar: "الْكَلَامَ", arJer: "الْكَلَامِ", type: "noun" },
    khabar:  { en: "the news", ar: "الْخَبَرَ", arJer: "الْخَبَرِ", type: "noun" },
    ism:     { en: "the name", ar: "الِاسْمَ", arJer: "الِاسْمِ", type: "noun" },
    haqiqah: { en: "the truth", ar: "الْحَقِيقَةَ", arJer: "الْحَقِيقَةِ", type: "noun" },
    obj_me:        { en: "me", suffix: "نِي", type: "pronoun" },
    obj_us:        { en: "us", suffix: "نَا", type: "pronoun" },
    obj_it:        { en: "it", suffix: "هُ", type: "pronoun" },
    obj_him:       { en: "him", suffix: "هُ", type: "pronoun" },
    obj_her:       { en: "her", suffix: "هَا", type: "pronoun" },
    obj_them_m:    { en: "them(m)", suffix: "هُمْ", type: "pronoun" },
    obj_them_f:    { en: "them(f)", suffix: "هُنَّ", type: "pronoun" },
    obj_them_d:    { en: "them(dual)", suffix: "هُمَا", type: "pronoun" },
    obj_you_m:     { en: "you (m sg)", suffix: "كَ", type: "pronoun" },
    obj_you_f:     { en: "you (f sg)", suffix: "كِ", type: "pronoun" },
    obj_you_d:     { en: "you (dual)", suffix: "كُمَا", type: "pronoun" },
    obj_you_pm:    { en: "you (m pl)", suffix: "كُمْ", type: "pronoun" },
    obj_you_pf:    { en: "you (f pl)", suffix: "كُنَّ", type: "pronoun" }
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

function getJarSuffix(suffix) {
    const jarMap = {
        "هُ": "هِ",
        "هُمْ": "هِمْ",
        "هُنَّ": "هِنَّ",
        "هُمَا": "هِمَا"
    };
    return jarMap[suffix] || suffix;
}

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

        let vAr = v.ar[tense][s.p] || v.ar[tense]["3sm"] || "";
        let arRes = [];
        
        // INTERROGATIVE PARTICLE (Hal)
        if (mode === "interrogative") arRes.push("هَلْ");

        // VERBAL STRUCTURE: [Negation] -> Verb -> [Pronoun Obj] -> Subject
        if (tense === "order") {
            if (mode === "negative") {
                let prohibitionVerb = v.ar.present[s.p];
                if (s.p === "2sm") prohibitionVerb = prohibitionVerb.slice(0,-1) + "ْ"; 
                if (s.p === "2sf") prohibitionVerb = prohibitionVerb.replace("ينَ", "ي");
                if (s.p === "2dm" || s.p === "2df") prohibitionVerb = prohibitionVerb.replace("انِ", "ا");
                if (s.p === "2pm") prohibitionVerb = prohibitionVerb.replace("ونَ", "وا");
                arRes.push("لَا", prohibitionVerb);
            } else {
                arRes.push(vAr);
            }
        } else {
            if (mode === "negative") arRes.push(tense === "past" ? "مَا" : "لَا");
            arRes.push(vAr);
        }

        // Logic for Pronouns vs Nouns with getJarSuffix
        if (obj.type === "pronoun") {
            if (prep.ar !== "") {
                // Preposition exists: Push subject, then preposition+suffix
                arRes.push(s.ar);
                let prepBase = prep.ar;
                if (prepBase === "عَلَى") prepBase = "عَلَيْ";
                if (prepBase === "إِلَى") prepBase = "إِلَيْ";
                
                let finalSuffix = obj.suffix;
                const causesJarShift = ["عَلَيْ", "إِلَيْ", "بِ", "فِي"];
                if (causesJarShift.includes(prepBase)) finalSuffix = getJarSuffix(obj.suffix);
                arRes.push(prepBase + finalSuffix);
            } else {
                // Direct Object Pronoun: Attach to VERB, then push subject
                let verbWithSuffix = arRes.pop() + obj.suffix;
                arRes.push(verbWithSuffix, s.ar);
            }
        } else {
            // Noun Object: Push Subject first, then Noun
            arRes.push(s.ar);
            if (prep.ar !== "") {
                arRes.push(prep.ar, obj.arJer || obj.ar);
            } else {
                arRes.push(obj.ar);
            }
        }
        
        elements.arOut.textContent = arRes.join(" ");

        // English Output Logic
        let enRes = "";
        const isSing3rd = (s.p === "3sm" || s.p === "3sf");
        const doDoes = isSing3rd ? "does" : "do";
        const prepEn = prep.en !== "" ? prep.en + " " : "";

        if (tense === "past") {
            if (mode === "negative") enRes = `${s.en} did not ${v.en} ${prepEn}${obj.en}.`;
            else if (mode === "interrogative") enRes = `Did ${s.en} ${v.en} ${prepEn}${obj.en}?`;
            else enRes = `${s.en} ${v.pastEn} ${prepEn}${obj.en}.`;
        } else if (tense === "present") {
            if (mode === "negative") enRes = `${s.en} ${doDoes} not ${v.en} ${prepEn}${obj.en}.`;
            else if (mode === "interrogative") enRes = `${doDoes.charAt(0).toUpperCase() + doDoes.slice(1)} ${s.en} ${v.en} ${prepEn}${obj.en}?`;
            else {
                let verbS = isSing3rd ? (v.en === "go" ? "goes" : v.en + "s") : v.en;
                enRes = `${s.en} ${verbS} ${prepEn}${obj.en}.`;
            }
        } else if (tense === "order") {
            if (mode === "negative") enRes = `Do not ${v.en} ${prepEn}${obj.en}!`;
            else if (mode === "interrogative") enRes = `Do ${s.en.toLowerCase()} ${v.en} ${prepEn}${obj.en}?`;
            else enRes = `${v.en.toUpperCase()} ${prepEn}${obj.en}!`;
        }
        elements.enOut.textContent = enRes;
    }
}


function init() {
    const fill = (el, data) => { 
        el.innerHTML = ""; 
        for (let k in data) {
            let option = new Option(data[k].en, k);
            el.add(option);
        }
    };

    // 1. Populate dropdowns
    fill(elements.subj, subjects);
    fill(elements.verb, verbs);
    fill(elements.pred, predicates);
    fill(elements.obj, objects);
    fill(elements.prep, prepositions);

    // 2. Set Defaults (Ensuring 'anisur' exists in your subjects object)
    if (subjects.anisur) {
        elements.subj.value = "anisur";
    } else {
        // Fallback to first available subject if anisur isn't defined yet
        elements.subj.selectedIndex = 0; 
    }
    
    elements.prep.value = "ila"; // Auto-load 'to'

    // 3. Attach listeners
    [elements.subj, elements.pred, elements.verb, elements.obj, 
     elements.prep, elements.tense, elements.mode].forEach(el => {
        el.onchange = build;
    });

    // 4. Handle Type Switching
    elements.type.onchange = () => {
        const isNom = elements.type.value === "nominal";
        
        if (!isNom) {
            elements.prep.value = "ila"; // Reset to 'to' when clicking verbal
        }

        elements.nominalFields.forEach(f => f.style.display = isNom ? "block" : "none");
        elements.verbalFields.forEach(f => f.style.display = isNom ? "none" : "block");
        
        build(); // Triggers Arabic/English update on change
    };

    elements.btn.onclick = build;

    // 5. CRITICAL: Trigger initial display
    // This removes the need to "select first" manually
    elements.type.dispatchEvent(new Event('change'));
    build(); 
}

init();

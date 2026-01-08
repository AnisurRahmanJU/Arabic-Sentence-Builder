// Random colorful background
const backgrounds = ["#FFCDD2","#C8E6C9","#BBDEFB","#FFF9C4","#D1C4E9","#FFE0B2","#B2EBF2","#FFCCBC"];
document.body.style.background = backgrounds[Math.floor(Math.random()*backgrounds.length)];

// Random button colors
function randomColor() {
  const colors = ["#e91e63","#9c27b0","#3f51b5","#03a9f4","#4caf50","#ff9800","#ff5722","#795548"];
  return colors[Math.floor(Math.random()*colors.length)];
}

function shuffleArray(arr){ 
  return arr.sort(() => Math.random() - 0.5); 
}

// Categories
const categories = [
  {
    name: "ইসম",
    sentences: [
      {bangla:"এটি একটি কলম।", english:"This is a pen.", arabic:"هٰذَا قَلَمٌ", words:["هٰذَا","قَلَمٌ"]},
      {bangla:"এটি একটি বই।", english:"This is a book.", arabic:"هٰذَا كِتَابٌ", words:["كِتَابٌ","هٰذَا"]}
    ]
  },
  {
    name: "মারিফা নাকিরা",
    sentences: [
      {bangla:"আমি একটি বই পড়ছি।", english:"I am reading a book.", arabic:"أَنَا أَقْرَأُ كِتَابًا", words:["أَنَا","أَقْرَأُ","كِتَابًا"]},
      {bangla:"সে একটি টেবিল কিনেছে।", english:"He bought a table.", arabic:"هُوَ اشْتَرَى طَاوِلَةً", words:["طَاوِلَةً","هُوَ","اشْتَرَى"]}
    ]
  },
  {
    name: "মুয়ান্নাস মুযাক্কার",
    sentences: [
      {bangla:"মেয়ে খেলা করছে।", english:"The girl is playing.", arabic:"الْبِنْتُ تَلْعَبُ", words:["الْبِنْتُ","تَلْعَبُ"]},
      {bangla:"ছেলে দৌড়াচ্ছে।", english:"The boy is running.", arabic:"الْوَلَدُ يَرْكُضُ", words:["يَرْكُضُ","الْوَلَدُ"]}
    ]
  }
];

let currentCategory = 0;
let currentSentence = 0;
let points = 0;

const topText = document.getElementById('topText');
const wordsDiv = document.getElementById('words');
const sentenceDiv = document.getElementById('sentence');
const indicator = document.getElementById('indicator');
const nextBtn = document.getElementById('nextBtn');
const scoreDiv = document.getElementById('score');
const categorySelect = document.getElementById('categorySelect');

// Populate category select
categories.forEach((c,i)=>{
  const option = document.createElement('option');
  option.value = i;
  option.innerText = c.name;
  categorySelect.appendChild(option);
});

// Load sentence
function loadSentence(catIdx, sentIdx){
  indicator.innerHTML = "";
  nextBtn.style.display = 'none';
  sentenceDiv.innerHTML = "";
  wordsDiv.innerHTML = "";

  const q = categories[catIdx].sentences[sentIdx];
  topText.innerHTML = `<b>বাংলা:</b> ${q.bangla} <br> <b>English:</b> ${q.english}`;

  shuffleArray(q.words.slice()).forEach((w,i)=>{
    const span = document.createElement('span');
    span.className = 'word';
    span.id = 'word'+i;
    span.draggable = true;
    span.innerText = w;
    span.style.background = randomColor();
    span.addEventListener('dragstart', e => 
      e.dataTransfer.setData('text', e.target.id)
    );
    wordsDiv.appendChild(span);
  });
}

// Drag & drop
sentenceDiv.addEventListener('dragover', e => e.preventDefault());

sentenceDiv.addEventListener('drop', e => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text');
  const draggedWord = document.getElementById(id);
  sentenceDiv.appendChild(draggedWord);

  const q = categories[currentCategory].sentences[currentSentence];

  if(sentenceDiv.children.length === q.words.length){
    const formed = Array.from(sentenceDiv.children).map(c=>c.innerText).join(' ');
    if(formed === q.arabic){
      indicator.style.color = 'green';
      indicator.innerHTML = `সঠিক! +1 পয়েন্ট`;
      points++;
      scoreDiv.innerText = `পয়েন্ট: ${points}`;
      nextBtn.style.display = 'inline-block';
    } else {
      indicator.style.color = 'red';
      indicator.innerHTML = `ভুল! আবার চেষ্টা করুন।`;
    }
  }
});

// Next sentence
nextBtn.addEventListener('click', ()=>{
  currentSentence++;
  if(currentSentence >= categories[currentCategory].sentences.length){
    currentSentence = 0;
    alert("এই ক্যাটাগরির সব বাক্য শেষ। অন্য ক্যাটাগরি নির্বাচন করুন।");
  }
  loadSentence(currentCategory, currentSentence);
});

// Change category
categorySelect.addEventListener('change', e=>{
  currentCategory = parseInt(e.target.value);
  currentSentence = 0;
  loadSentence(currentCategory, currentSentence);
});

// Initial load
loadSentence(currentCategory, currentSentence);

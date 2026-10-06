// Vibe Finder: логика опроса, тем и итогового экрана.

const screens = {
  home: document.getElementById('home-screen'),
  survey: document.getElementById('survey-screen'),
  creation: document.getElementById('creation-screen'),
  vibe: document.getElementById('vibe-screen'),
};
const supportLink = document.getElementById('support-link');

const startButton = document.getElementById('start-btn');
const returnButton = document.getElementById('return-btn');
const progressLabel = document.getElementById('progress-label');
const progressFill = document.getElementById('progress-fill');
const progressBar = document.querySelector('.progress-bar');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const quoteText = document.getElementById('quote-text');
const themeName = document.getElementById('theme-name');
const themeDescription = document.getElementById('theme-description');
const quoteCard = document.getElementById('quote-card');
const particlesWrap = document.getElementById('particles');

const questions = [
  {
    text: 'Какое у тебя настроение прямо сейчас?',
    options: [
      { label: 'Спокойно', value: { cosmos: 2, solar: 0, neon: 1, forest: 2 } },
      { label: 'Тревожно', value: { cosmos: 0, solar: 1, neon: 2, forest: 0 } },
      { label: 'Энергично', value: { cosmos: 0, solar: 3, neon: 1, forest: 0 } },
      { label: 'Хочу отдохнуть', value: { cosmos: 3, solar: 1, neon: 0, forest: 3 } },
    ],
  },
  {
    text: 'Какая энергия ближе к тебе?',
    options: [
      { label: 'Лёгкая и мягкая', value: { cosmos: 3, solar: 0, neon: 1, forest: 3 } },
      { label: 'Жаркая и активная', value: { cosmos: 0, solar: 3, neon: 1, forest: 0 } },
      { label: 'Ночные импульсы', value: { cosmos: 0, solar: 1, neon: 3, forest: 0 } },
      { label: 'Нам нужен ресет', value: { cosmos: 2, solar: 1, neon: 0, forest: 2 } },
    ],
  },
  {
    text: 'Что хочется сделать прямо сейчас?',
    options: [
      { label: 'Побыть в тишине', value: { cosmos: 3, solar: 0, neon: 0, forest: 3 } },
      { label: 'Создать волну', value: { cosmos: 1, solar: 2, neon: 2, forest: 0 } },
      { label: 'Погрузиться в ритм', value: { cosmos: 0, solar: 1, neon: 3, forest: 0 } },
      { label: 'Сделать паузу и восстановиться', value: { cosmos: 2, solar: 1, neon: 0, forest: 3 } },
    ],
  },
  {
    text: 'Какой тип общения тебя сейчас тянет?',
    options: [
      { label: 'Тихий и уютный', value: { cosmos: 3, solar: 0, neon: 1, forest: 3 } },
      { label: 'Весёлый и живой', value: { cosmos: 1, solar: 3, neon: 1, forest: 0 } },
      { label: 'Креативный и яркий', value: { cosmos: 0, solar: 2, neon: 3, forest: 0 } },
      { label: 'В одиночестве', value: { cosmos: 2, solar: 0, neon: 1, forest: 2 } },
    ],
  },
  {
    text: 'Что лучше всего подходит под твой ритм?',
    options: [
      { label: 'Медленные мысли', value: { cosmos: 3, solar: 0, neon: 0, forest: 3 } },
      { label: 'Движение и свет', value: { cosmos: 0, solar: 3, neon: 1, forest: 0 } },
      { label: 'Неоновая энергия', value: { cosmos: 0, solar: 1, neon: 3, forest: 0 } },
      { label: 'Тихий reset', value: { cosmos: 2, solar: 0, neon: 0, forest: 3 } },
    ],
  },
  {
    text: 'В каком месте мысли становятся твоими?',
    options: [
      { label: 'На пустой ночной улице', value: {} },
      { label: 'У окна, пока идёт дождь', value: {} },
      { label: 'В мастерской с музыкой и красками', value: {} },
      { label: 'На солнечной тропе среди деревьев', value: {} },
    ],
  },
  {
    text: 'Какой темп сегодня ощущается правильным?',
    options: [
      { label: 'Медленно, как ровное дыхание', value: {} },
      { label: 'Спокойно, но с искрой любопытства', value: {} },
      { label: 'Быстро и без плана', value: {} },
      { label: 'Игриво, чтобы хотелось улыбаться', value: {} },
    ],
  },
  {
    text: 'Кого бы ты позвал разделить этот момент?',
    options: [
      { label: 'Никого — хочется личного пространства', value: {} },
      { label: 'Одного близкого человека', value: {} },
      { label: 'Всех, кто готов на спонтанность', value: {} },
      { label: 'Себя — на прогулку без маршрута', value: {} },
    ],
  },
  {
    text: 'Какой кадр хочется оставить перед глазами?',
    options: [
      { label: 'Неон в отражении мокрого асфальта', value: {} },
      { label: 'Туманное утро и мягкие оттенки', value: {} },
      { label: 'Пиксельный закат и яркие контуры', value: {} },
      { label: 'Тёплая комната в свете лампы', value: {} },
    ],
  },
  {
    text: 'Что было бы приятнее сделать прямо сейчас?',
    options: [
      { label: 'Исследовать тайное место', value: {} },
      { label: 'Что-нибудь нарисовать или придумать', value: {} },
      { label: 'Сыграть короткий аркадный раунд', value: {} },
      { label: 'Устроиться поудобнее и ничего не спешить', value: {} },
    ],
  },
];

const vibeThemes = {
  cosmos: {
    title: 'Спокойный космос',
    description: 'Плавное тёмно-фиолетовое пространство, мягкие звёзды и медитативная глубина. Здесь можно замедлиться и собраться с мыслями.',
    quotes: [
      'Тишина — это тоже движение. Просто очень красивое.',
      'Звёзды не спешат — и это делает их ближе.',
      'Каждая пауза — это маленький космос для себя.',
      'Внутри тебя уже есть пространство, в котором можно дышать.',
    ],
    palette: 'theme-cosmos',
    signature: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    game: { type: 'cosmos', title: 'Создай созвездие' },
  },
  solar: {
    title: 'Солнечный заряд',
    description: 'Тёплые жёлтые лучи, бодрящее сияние и очень приятная энергия. Это вайб для подъёма, мотивации и лёгкого драйва.',
    quotes: [
      'День начинается не с скорости, а с света.',
      'Энергия — это не шум, а тепло внутри.',
      'Когда внутри солнце, даже мелочи начинают играть.',
      'Двигайся к своему ритму — он тоже сияет.',
    ],
    palette: 'theme-solar',
    signature: [2, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    game: { type: 'solar', title: 'Собери солнечный поток' },
  },
  neon: {
    title: 'Ночной неон',
    description: 'Городские огни, чёрный фон и тикание ритма. Здесь можно включить характер и почувствовать ночную магию.',
    quotes: [
      'Ночь — это не затемнение, а свет в другом ключе.',
      'Ритм делает пространство живым, даже если вокруг тишина.',
      'Неон не кричит — он просто горит на своём волнении.',
      'Город дышит в ритме тех, кто умеет слышать его.',
    ],
    palette: 'theme-neon',
    signature: [1, 2, 2, 2, 2, 0, 2, 2, 0, 2],
    game: { type: 'neon', title: 'Неоновый ритм' },
  },
  forest: {
    title: 'Лесной отдых',
    description: 'Тёплый зелёный воздух, мягкий свет и спокойные ритмы природы. Здесь можно переключиться на уют, тишину и восстановление.',
    quotes: [
      'Под шумом листьев мысли становятся мягче.',
      'Тихий свет — это тоже бережность.',
      'Там, где есть воздух и листья, есть пространство для дыхания.',
      'Сделай паузу — лес уже умеет ей помогать.',
    ],
    palette: 'theme-forest',
    signature: [3, 0, 0, 0, 3, 3, 0, 3, 3, 3],
    game: { type: 'forest', title: 'Лесной отдых' },
  },
  night: {
    title: 'Ночная прогулка',
    description: 'Тихий город, свет в окнах и неоновые вывески. Иди в собственном ритме и замечай маленькие огни вокруг.',
    quotes: ['Ночью даже знакомый путь становится открытием.', 'Некоторые окна светят ровно тогда, когда нужно.', 'Город не одинок, пока в нём горит свет.'],
    palette: 'theme-night',
    signature: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    game: { type: 'night-walk', title: 'Night Walk' },
  },
  melancholic: {
    title: 'Дождливая меланхолия',
    description: 'Спокойные капли на стекле, тихие мысли и простор для чувств без спешки и оценок.',
    quotes: ['Дождю не нужно объяснять, почему он идёт.', 'Мягкий свет особенно красив в пасмурный день.', 'Пусть мысли побудут рядом, не требуя ответа.'],
    palette: 'theme-melancholic',
    signature: [1, 1, 0, 1, 3, 1, 1, 0, 1, 3],
    game: { type: 'melancholic', title: 'Лови капли' },
  },
  zen: {
    title: 'Тихая дзен-вода',
    description: 'Чистые линии, водные переливы и медленный ритм, в котором можно просто присутствовать.',
    quotes: ['Волна приходит и уходит — берег остаётся.', 'Достаточно одного спокойного вдоха.', 'Покой не нужно заслуживать.'],
    palette: 'theme-zen',
    signature: [3, 0, 3, 1, 3, 3, 0, 3, 1, 3],
    game: { type: 'zen', title: 'Дыхание воды' },
  },
  chaotic: {
    title: 'Искрящийся хаос',
    description: 'Яркие импульсы, неожиданные повороты и энергия, которой нужен простор для движения.',
    quotes: ['Не каждый поворот нужно было планировать.', 'Искра тоже знает, куда лететь.', 'Порядок подождёт — сейчас твой ход.'],
    palette: 'theme-chaotic',
    signature: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    game: { type: 'chaotic', title: 'Разнеси комнату' },
  },
  happy: {
    title: 'Солнечная радость',
    description: 'Лёгкое настроение, яркие цвета и повод замечать хорошее в самых простых моментах.',
    quotes: ['Радость любит маленькие поводы.', 'Улыбка тоже задаёт ритм.', 'Свет становится больше, когда им делятся.'],
    palette: 'theme-happy',
    signature: [2, 1, 1, 1, 1, 3, 3, 2, 2, 2],
    game: { type: 'happy', title: 'Лопай шарики' },
  },
  mysterious: {
    title: 'Тайная комната',
    description: 'Полутени, загадки и любопытство, которое ведёт к ответам шаг за шагом.',
    quotes: ['Подсказка часто прячется на виду.', 'Любопытство — хороший ключ.', 'Не всё тайное должно оставаться тёмным.'],
    palette: 'theme-mysterious',
    signature: [0, 2, 0, 3, 0, 0, 1, 0, 0, 0],
    game: { type: 'mysterious', title: 'Тихий поиск' },
  },
  creative: {
    title: 'Свободное ателье',
    description: 'Цвета, формы и идеи встречаются в маленьких деталях — собери пейзаж под своё настроение.',
    quotes: ['Идея может начаться с одной линии.', 'Необычное сочетание — тоже твой почерк.', 'Создавай не ради правил, а ради ощущения.'],
    palette: 'theme-creative',
    signature: [2, 1, 1, 2, 1, 2, 1, 1, 2, 1],
    game: { type: 'creative', title: 'Paint by Numbers' },
  },
  nature: {
    title: 'Лесной ветер',
    description: 'Зелёные тропы, движение листьев и живая тишина, в которой легко восстановиться.',
    quotes: ['Лес не торопит — и ты можешь не торопиться.', 'Ветер меняет направление, не теряя себя.', 'Каждый лист находит свой путь вниз.'],
    palette: 'theme-nature',
    signature: [3, 0, 3, 3, 3, 3, 0, 3, 3, 3],
    game: { type: 'nature', title: 'Поймай лист' },
  },
  retro: {
    title: 'Retro Arcade',
    description: 'Пиксельные огни, аркадные цвета и короткое путешествие в знакомый игровой ритм.',
    quotes: ['Новая попытка — классика жанра.', 'Собирай моменты, не только очки.', 'У хорошей игры всегда есть ещё один раунд.'],
    palette: 'theme-retro',
    signature: [2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
    game: { type: 'retro', title: 'Retro Arcade' },
  },
  cozy: {
    title: 'Домашний уют',
    description: 'Тёплый свет, мягкие вещи и пространство, которое можно обустроить именно под себя.',
    quotes: ['Уют складывается из того, что тебе подходит.', 'Плед и пауза — хороший план.', 'Дом начинается с ощущения безопасности.'],
    palette: 'theme-cozy',
    signature: [3, 0, 1, 3, 3, 3, 3, 1, 3, 3],
    game: { type: 'cozy-room', title: 'Cozy Room' },
  },
};

const state = {
  currentQuestion: 0,
  scores: { cosmos: 0, solar: 0, neon: 0, forest: 0 },
  answers: [],
  activeVibe: null,
  quoteIndex: 0,
  quoteTimer: null,
  gameCleanups: [],
  gameTimeouts: new Set(),
};

let answerPending = false;
const gameStage = document.getElementById('game-stage');
const asmrStage = document.getElementById('asmr-stage');
const creationMessage = document.getElementById('creation-message');
const vibeTransition = document.getElementById('vibe-transition');
const BACKGROUND_MUSIC_VOLUME = 0.10;
const UI_CLICK_VOLUME = 0.22;
const TRANSITION_VOLUME = 0.20;
const audioVolumeFades = new WeakMap();
const uiButtonAudio = new Audio('audio/ui/ui.mp3');
const transitionAudio = new Audio('audio/ui/transition.mp3');
let creationTimer = null;
let creationMessageTimer = null;
let vibeRevealTimer = null;
let creationSequence = 0;

function fadeAudioVolume(audio, targetVolume, duration) {
  const activeFade = audioVolumeFades.get(audio);
  if (activeFade !== undefined) window.clearInterval(activeFade);
  const startVolume = audio.volume;
  const startTime = performance.now();
  const fade = window.setInterval(() => {
    const progress = Math.min((performance.now() - startTime) / duration, 1);
    audio.volume = startVolume + (targetVolume - startVolume) * progress;
    if (progress === 1) {
      window.clearInterval(fade);
      audioVolumeFades.delete(audio);
    }
  }, 32);
  audioVolumeFades.set(audio, fade);
}

uiButtonAudio.preload = 'auto';
uiButtonAudio.volume = UI_CLICK_VOLUME;
transitionAudio.preload = 'auto';
transitionAudio.volume = TRANSITION_VOLUME;
let transitionFadeOutStarted = false;

transitionAudio.addEventListener('timeupdate', () => {
  const remaining = transitionAudio.duration - transitionAudio.currentTime;
  if (!transitionFadeOutStarted && Number.isFinite(remaining) && remaining <= 0.45) {
    transitionFadeOutStarted = true;
    fadeAudioVolume(transitionAudio, 0, Math.max(100, remaining * 1000));
  }
});

transitionAudio.addEventListener('ended', () => {
  transitionFadeOutStarted = false;
  transitionAudio.volume = TRANSITION_VOLUME;
});

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const clickedButton = event.target.closest('button');
  if (
    !clickedButton ||
    clickedButton.disabled ||
    clickedButton.getAttribute('aria-disabled') === 'true' ||
    clickedButton.closest('.asmr-keyboard')
  ) return;

  uiButtonAudio.currentTime = 0;
  const playback = uiButtonAudio.play();
  if (playback) {
    playback.catch((error) => {
      if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
        console.error('UI button sound failed: audio/ui/ui.mp3', error);
      }
    });
  }
}, true);

function startBackgroundPlaylist() {
  const tracks = [
    'audio/music/background4.mp3',
    'audio/music/background2.mp3',
    'audio/music/background3.mp3',
  ];
  const players = [new Audio(), new Audio()];
  players.forEach((player) => {
    player.preload = 'auto';
    player.volume = 0;
  });
  let activeAudio = players[0];
  let preloadedAudio = players[1];
  let trackIndex = 0;
  let started = false;
  let trackFadeOutStarted = false;
  const configureTrack = (player, index) => {
    player.pause();
    player.src = tracks[index];
    player.load();
  };
  const resumeOnInteraction = () => {
    if (started) return;
    startCurrentTrack();
  };
  const removeInteractionFallback = () => {
    document.removeEventListener('pointerdown', resumeOnInteraction);
    document.removeEventListener('keydown', resumeOnInteraction);
  };
  const installInteractionFallback = () => {
    document.addEventListener('pointerdown', resumeOnInteraction);
    document.addEventListener('keydown', resumeOnInteraction);
  };
  const startCurrentTrack = () => {
    activeAudio.volume = 0;
    const playback = activeAudio.play();
    if (!playback) {
      started = true;
      fadeAudioVolume(activeAudio, BACKGROUND_MUSIC_VOLUME, 700);
      removeInteractionFallback();
      return;
    }
    playback.then(() => {
      started = true;
      fadeAudioVolume(activeAudio, BACKGROUND_MUSIC_VOLUME, 700);
      removeInteractionFallback();
    }).catch((error) => {
      started = false;
      if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
        console.error(`Background track failed: ${tracks[trackIndex]}`, error);
      }
      installInteractionFallback();
    });
  };

  const advanceTrack = (event) => {
    if (event.currentTarget !== activeAudio) return;
    trackIndex = (trackIndex + 1) % tracks.length;
    [activeAudio, preloadedAudio] = [preloadedAudio, activeAudio];
    configureTrack(preloadedAudio, (trackIndex + 1) % tracks.length);
    trackFadeOutStarted = false;
    startCurrentTrack();
  };
  players.forEach((player) => {
    player.addEventListener('ended', advanceTrack);
    player.addEventListener('timeupdate', () => {
      if (player !== activeAudio || trackFadeOutStarted) return;
      const remaining = player.duration - player.currentTime;
      if (Number.isFinite(remaining) && remaining <= 0.7) {
        trackFadeOutStarted = true;
        fadeAudioVolume(player, 0, Math.max(100, remaining * 1000));
      }
    });
    player.addEventListener('error', () => {
      if (player.error?.code !== 1) {
        console.error(`Background track failed: ${player.currentSrc || player.src}`);
      }
    });
  });
  configureTrack(activeAudio, trackIndex);
  configureTrack(preloadedAudio, trackIndex + 1);
  startCurrentTrack();
}

function initParticles() {
  particlesWrap.innerHTML = '';
  for (let index = 0; index < 48; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
    particle.style.setProperty('--speed', `${Math.random() * 12 + 12}s`);
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particlesWrap.appendChild(particle);
  }
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle('active', key === name);
  });
  supportLink.hidden = name === 'survey' || name === 'vibe';
}

function cancelVibeCreation() {
  creationSequence += 1;
  if (creationTimer !== null) {
    clearTimeout(creationTimer);
    creationTimer = null;
  }
  if (creationMessageTimer !== null) {
    clearInterval(creationMessageTimer);
    creationMessageTimer = null;
  }
  if (vibeRevealTimer !== null) {
    clearTimeout(vibeRevealTimer);
    vibeRevealTimer = null;
  }
  vibeTransition.classList.remove('is-visible');
}

function startVibeCreation(vibeKey) {
  cancelVibeCreation();
  const sequence = creationSequence;
  const messages = [
    'Анализируем ваши ответы',
    'Подбираем атмосферу',
    'Настраиваем настроение',
    'Ваш вайб почти готов',
  ];
  let messageIndex = 0;
  creationMessage.textContent = messages[messageIndex];
  showScreen('creation');

  transitionAudio.pause();
  const transitionFade = audioVolumeFades.get(transitionAudio);
  if (transitionFade !== undefined) {
    window.clearInterval(transitionFade);
    audioVolumeFades.delete(transitionAudio);
  }
  transitionAudio.currentTime = 0;
  transitionAudio.volume = 0;
  transitionFadeOutStarted = false;
  const playback = transitionAudio.play();
  if (playback) {
    playback.catch((error) => {
      if (error.name !== 'AbortError') {
        console.error('Transition sound failed: audio/ui/transition.mp3', error);
      }
    });
  }
  fadeAudioVolume(transitionAudio, TRANSITION_VOLUME, 100);

  creationMessageTimer = window.setInterval(() => {
    messageIndex = Math.min(messageIndex + 1, messages.length - 1);
    creationMessage.textContent = messages[messageIndex];
  }, 1250);
  creationTimer = window.setTimeout(() => {
    if (sequence !== creationSequence) return;
    clearInterval(creationMessageTimer);
    creationMessageTimer = null;
    creationTimer = null;
    const revealVibe = () => {
      if (sequence !== creationSequence) return;
      renderVibe(vibeKey);
      showScreen('vibe');
      screens.vibe.classList.add('vibe-screen-reveal');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        vibeTransition.classList.remove('is-visible');
        return;
      }
      vibeRevealTimer = window.setTimeout(() => {
        if (sequence === creationSequence) {
          vibeTransition.classList.remove('is-visible');
        }
        vibeRevealTimer = null;
      }, 350);
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    vibeTransition.classList.add('is-visible');
    vibeRevealTimer = window.setTimeout(() => {
      vibeRevealTimer = null;
      revealVibe();
    }, reducedMotion ? 250 : 1350);
  }, 5000);
}

function updateProgress() {
  const percent = ((state.currentQuestion + 1) / questions.length) * 100;
  progressLabel.textContent = `Вопрос ${state.currentQuestion + 1} из ${questions.length}`;
  progressFill.style.width = `${percent}%`;
  progressBar.setAttribute('aria-valuenow', String(state.currentQuestion + 1));
}

function renderQuestion() {
  answerPending = false;
  const current = questions[state.currentQuestion];
  questionText.textContent = current.text;
  answersContainer.innerHTML = '';

  current.options.forEach((option, optionIndex) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.type = 'button';
    button.textContent = option.label;
    button.addEventListener('click', () => {
      if (answerPending) return;
      answerPending = true;
      document.querySelectorAll('.option-btn').forEach((item) => {
        item.classList.remove('selected');
        item.disabled = true;
      });
      button.classList.add('selected');
      setTimeout(() => {
        applyAnswer(option.value, optionIndex);
      }, 180);
    });
    answersContainer.appendChild(button);
  });

  updateProgress();
}

function applyAnswer(scoreMap, answerIndex) {
  Object.entries(scoreMap).forEach(([key, value]) => {
    state.scores[key] += value;
  });
  state.answers.push(answerIndex);

  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion += 1;
    renderQuestion();
    return;
  }

  determineVibe();
}

function determineVibe() {
  const ranked = Object.entries(vibeThemes).map(([id, vibe]) => {
    let exactMatches = 0;
    let lastMatch = -1;
    vibe.signature.forEach((answer, index) => {
      if (state.answers[index] === answer) {
        exactMatches += 1;
        lastMatch = index;
      }
    });
    const legacyBonus = (state.scores[id] || 0) * 0.02;
    return { id, exactMatches, lastMatch, score: exactMatches * 2 + legacyBonus };
  });
  ranked.sort((a, b) =>
    b.score - a.score ||
    b.exactMatches - a.exactMatches ||
    b.lastMatch - a.lastMatch ||
    a.id.localeCompare(b.id)
  );
  const chosen = ranked[0].id;
  state.activeVibe = chosen;
  startVibeCreation(chosen);
}

function renderVibe(vibeKey) {
  const config = vibeThemes[vibeKey];
  if (!config) return;

  screens.vibe.classList.remove('vibe-screen-reveal');
  clearGame();
  document.body.classList.remove(...Object.values(vibeThemes).map((vibe) => vibe.palette));
  document.body.classList.add(config.palette);
  screens.vibe.dataset.vibe = vibeKey;

  if (state.quoteTimer) {
    clearInterval(state.quoteTimer);
  }

  themeName.textContent = config.title;
  themeDescription.textContent = config.description;
  quoteText.textContent = config.quotes[0];
  state.quoteIndex = 0;
  state.quoteTimer = window.setInterval(updateQuote, 4500);

  if (vibeKey !== 'cozy') renderMiniGame(config.game);
  if (vibeKey === 'cozy') renderAsmrGame();
  updateQuote();
}

function updateQuote() {
  const config = vibeThemes[state.activeVibe];
  if (!config) return;
  const nextQuote = config.quotes[state.quoteIndex % config.quotes.length];
  quoteText.textContent = nextQuote;
  state.quoteIndex += 1;
}

quoteCard.addEventListener('click', updateQuote);
quoteCard.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    updateQuote();
  }
});

function resetSurvey() {
  cancelVibeCreation();
  state.currentQuestion = 0;
  state.scores = { cosmos: 0, solar: 0, neon: 0, forest: 0 };
  state.answers = [];
  state.activeVibe = null;
  renderQuestion();
  showScreen('survey');
}

startButton.addEventListener('click', () => {
  resetSurvey();
});

returnButton.addEventListener('click', () => {
  cancelVibeCreation();
  clearGame();
  if (state.quoteTimer) {
    clearInterval(state.quoteTimer);
    state.quoteTimer = null;
  }
  state.currentQuestion = 0;
  state.scores = { cosmos: 0, solar: 0, neon: 0, forest: 0 };
  state.answers = [];
  state.activeVibe = null;
  document.body.classList.remove(...Object.values(vibeThemes).map((vibe) => vibe.palette));
  delete screens.vibe.dataset.vibe;
  showScreen('home');
});

function registerGameCleanup(cleanup) {
  state.gameCleanups.push(cleanup);
}

function clearGame() {
  state.gameCleanups.forEach((cleanup) => cleanup());
  state.gameCleanups = [];
  state.gameTimeouts.forEach((timeout) => window.clearTimeout(timeout));
  state.gameTimeouts.clear();
  gameStage.replaceChildren();
  asmrStage.replaceChildren();
}

function gameTimeout(callback, delay) {
  const timeouts = state.gameTimeouts;
  const timeout = window.setTimeout(() => {
    timeouts.delete(timeout);
    callback();
  }, delay);
  timeouts.add(timeout);
  return timeout;
}

function gameInterval(callback, delay) {
  const interval = window.setInterval(callback, delay);
  registerGameCleanup(() => window.clearInterval(interval));
  return interval;
}

function addMovementControls(container, move) {
  const pad = document.createElement('div');
  pad.className = 'direction-pad';
  pad.setAttribute('role', 'group');
  pad.setAttribute('aria-label', 'Управление движением');

  const directions = [
    { direction: 'up', key: 'W', label: '↑', name: 'Вверх', gridArea: 'up' },
    { direction: 'left', key: 'A', label: '←', name: 'Влево', gridArea: 'left' },
    { direction: 'right', key: 'D', label: '→', name: 'Вправо', gridArea: 'right' },
    { direction: 'down', key: 'S', label: '↓', name: 'Вниз', gridArea: 'down' },
  ];
  directions.forEach(({ direction, key, label, name, gridArea }) => {
    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'direction-btn';
    control.textContent = label;
    control.style.gridArea = gridArea;
    control.setAttribute('aria-label', `${name} (${key})`);
    control.addEventListener('click', () => move(direction));
    pad.appendChild(control);
  });
  container.appendChild(pad);

  const keyDirections = { w: 'up', a: 'left', s: 'down', d: 'right' };
  const keyHandler = (event) => {
    if (!screens.vibe.classList.contains('active')) return;
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
    const direction = keyDirections[event.key.toLowerCase()];
    if (!direction) return;
    event.preventDefault();
    move(direction);
  };
  document.addEventListener('keydown', keyHandler);
  const cleanup = () => document.removeEventListener('keydown', keyHandler);
  registerGameCleanup(cleanup);
  return cleanup;
}

function renderMiniGame(config) {
  const game = document.createElement('section');
  game.className = `mini-game game-${config.type}`;
  const heading = document.createElement('div');
  heading.className = 'game-heading';
  const title = document.createElement('h3');
  title.textContent = config.title;
  const score = document.createElement('output');
  score.className = 'game-stat';
  score.setAttribute('aria-live', 'polite');
  score.textContent = '0';
  heading.append(title, score);

  const status = document.createElement('p');
  status.className = 'game-status';
  status.setAttribute('role', 'status');
  const board = document.createElement('div');
  board.className = 'game-board';
  board.setAttribute('aria-label', config.title);
  const controls = document.createElement('div');
  controls.className = 'game-tools';
  game.append(heading, status, board, controls);
  gameStage.replaceChildren(game);

  let points = 0;
  const setStatus = (message) => { status.textContent = message; };
  const setScore = (value) => {
    points = value;
    score.textContent = String(points);
  };
  const addPoint = (amount = 1) => setScore(points + amount);
  const button = (label, action, className = 'game-btn') => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = className;
    item.textContent = label;
    item.addEventListener('click', action);
    return item;
  };
  const target = (label, action, extraClass = '') => {
    const item = button(label, action, `game-target ${extraClass}`.trim());
    item.style.left = `${8 + Math.random() * 78}%`;
    item.style.top = `${8 + Math.random() * 74}%`;
    board.appendChild(item);
    return item;
  };
  const moveTarget = (item) => {
    item.style.left = `${8 + Math.random() * 78}%`;
    item.style.top = `${8 + Math.random() * 74}%`;
  };
  const createPlayfield = () => {
    const playfield = document.createElement('div');
    playfield.className = 'game-board__playfield';
    board.appendChild(playfield);
    return playfield;
  };

  if (config.type === 'cosmos') {
    board.classList.add('game-board--constellation');
    board.setAttribute('aria-label', 'Созвездие для соединения');
    const playfield = createPlayfield();
    const starPositions = [
      { x: 12, y: 30 },
      { x: 27, y: 66 },
      { x: 42, y: 38 },
      { x: 58, y: 70 },
      { x: 73, y: 32 },
      { x: 88, y: 60 },
    ];
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const lines = document.createElementNS(svgNamespace, 'svg');
    lines.classList.add('constellation-lines');
    lines.setAttribute('viewBox', '0 0 100 100');
    lines.setAttribute('preserveAspectRatio', 'none');
    lines.setAttribute('aria-hidden', 'true');
    playfield.appendChild(lines);
    let nextStar = 0;
    const starButtons = starPositions.map((position, index) => {
      const star = button('✦', () => {
        if (index !== nextStar) {
          setStatus(`Сейчас нужна звезда ${nextStar + 1}.`);
          return;
        }
        if (index > 0) {
          const previous = starPositions[index - 1];
          const line = document.createElementNS(svgNamespace, 'line');
          line.setAttribute('x1', String(previous.x));
          line.setAttribute('y1', String(previous.y));
          line.setAttribute('x2', String(position.x));
          line.setAttribute('y2', String(position.y));
          lines.appendChild(line);
        }
        nextStar += 1;
        star.disabled = true;
        star.setAttribute('aria-pressed', 'true');
        addPoint();
        if (nextStar === starPositions.length) {
          game.classList.add('is-complete');
          setStatus('Созвездие готово! Ты соединил(а) все звёзды.');
        } else {
          setStatus(`Соединено звёзд: ${nextStar}/${starPositions.length}.`);
        }
      }, 'constellation-star');
      star.dataset.sequence = String(index + 1);
      star.setAttribute('aria-label', `Звезда ${index + 1}`);
      star.setAttribute('aria-pressed', 'false');
      star.style.left = `${position.x}%`;
      star.style.top = `${position.y}%`;
      playfield.appendChild(star);
      return star;
    });
    const restart = button('Начать заново', () => {
      nextStar = 0;
      lines.replaceChildren();
      starButtons.forEach((star) => {
        star.disabled = false;
        star.setAttribute('aria-pressed', 'false');
      });
      game.classList.remove('is-complete');
      setScore(0);
      setStatus('Соедини звёзды по порядку: от 1 до 6.');
    });
    controls.appendChild(restart);
    setStatus('Соедини звёзды по порядку: от 1 до 6.');
  } else if (config.type === 'solar') {
    setStatus('Касайся появляющихся солнечных искр.');
    const spawn = () => {
      if (board.children.length > 7) return;
      target('✦', (event) => {
        event.currentTarget.remove();
        addPoint();
      });
    };
    spawn();
    gameInterval(spawn, 1200);
  } else if (config.type === 'neon') {
    setStatus('Лови световой импульс, пока он движется.');
    const spawn = () => target('●', (event) => {
      event.currentTarget.remove();
      addPoint();
      gameTimeout(spawn, 350);
    });
    const pulse = spawn();
    pulse.classList.add('neon-target');
    pulse.style.animation = 'neon-drift 2.4s linear infinite alternate';
    pulse.style.left = '8%';
    gameInterval(() => {
      const current = board.querySelector('.neon-target');
      if (current) current.style.left = current.style.left === '8%' ? '82%' : '8%';
    }, 1200);
  } else if (config.type === 'forest') {
    setStatus('Собирай мерцающие листья и наслаждайся тишиной.');
    for (let index = 0; index < 7; index += 1) {
      target('❧', (event) => {
        event.currentTarget.disabled = true;
        event.currentTarget.textContent = '✓';
        addPoint();
      }, 'leaf-target');
    }
  } else if (config.type === 'night-walk') {
    board.classList.add('game-board--night-walk');
    board.setAttribute('aria-label', 'Night Walk — исследуй ночную улицу');
    score.textContent = '0/3';
    const scene = document.createElement('div');
    scene.className = 'night-scene';
    const objects = [
      { kind: 'lamp', name: 'Фонарь', symbol: '♧', x: 0, y: 0 },
      { kind: 'window', name: 'Окна', symbol: '▦', x: 4, y: 0 },
      { kind: 'neon', name: 'Вывеска', symbol: 'N', x: 2, y: 1 },
      { kind: 'puddle', name: 'Лужа', symbol: '≈', x: 0, y: 2 },
      { kind: 'memory', name: 'Световой след', symbol: '✦', x: 1, y: 0 },
      { kind: 'memory', name: 'Световой след', symbol: '✧', x: 3, y: 1 },
      { kind: 'memory', name: 'Световой след', symbol: '✦', x: 4, y: 2 },
    ];
    const position = { x: 2, y: 2 };
    const memoryItems = [];
    let found = 0;
    let finished = false;
    const player = document.createElement('span');
    player.className = 'night-player';
    player.textContent = '●';
    player.setAttribute('role', 'img');
    player.setAttribute('aria-label', 'Твой персонаж');

    const placeAt = (element, x, y) => {
      element.style.left = `${((x + 0.5) / 5) * 100}%`;
      element.style.top = `${((y + 0.5) / 3) * 100}%`;
    };
    const updatePlayer = () => placeAt(player, position.x, position.y);
    const finishIfReady = () => {
      if (found !== memoryItems.length || finished) return;
      finished = true;
      game.classList.add('is-complete');
      setStatus('Ты собрал(а) все три световых следа. Ночная улица проснулась.');
    };
    const collect = (item) => {
      if (item.classList.contains('is-collected')) return;
      item.classList.add('is-collected');
      item.disabled = true;
      found += 1;
      score.textContent = `${found}/3`;
      if (found === memoryItems.length) {
        finishIfReady();
      } else {
        setStatus(`Световой след найден: ${found}/3. Исследуй улицу дальше.`);
      }
    };
    const withinReach = (item) =>
      Math.abs(position.x - Number(item.dataset.x)) + Math.abs(position.y - Number(item.dataset.y)) <= 1;
    const interact = (item) => {
      if (finished) return;
      if (!withinReach(item)) {
        setStatus(`Подойди ближе к объекту «${item.dataset.name}».`);
        return;
      }
      if (item.dataset.kind === 'memory') {
        collect(item);
        return;
      }
      const isLit = item.classList.toggle('is-lit');
      if (item.dataset.kind === 'puddle') {
        item.classList.remove('is-rippled');
        void item.offsetWidth;
        item.classList.add('is-rippled');
        setStatus('По луже расходятся круги дождя.');
      } else {
        setStatus(isLit ? `Загорелся объект «${item.dataset.name}».` : `Объект «${item.dataset.name}» снова погас.`);
      }
    };
    objects.forEach((object) => {
      const item = button(object.symbol, () => interact(item), `night-object night-object--${object.kind}`);
      item.dataset.kind = object.kind;
      item.dataset.name = object.name;
      item.dataset.x = String(object.x);
      item.dataset.y = String(object.y);
      item.setAttribute('aria-label', object.name);
      placeAt(item, object.x, object.y);
      scene.appendChild(item);
      if (object.kind === 'memory') memoryItems.push(item);
    });
    const grid = document.createElement('div');
    grid.className = 'night-grid';
    grid.setAttribute('aria-hidden', 'true');
    scene.append(grid, player);
    const updateMemoryAtPosition = () => {
      const item = memoryItems.find((candidate) =>
        Number(candidate.dataset.x) === position.x && Number(candidate.dataset.y) === position.y
      );
      if (item) collect(item);
    };
    const move = (direction) => {
      if (finished) return;
      if (direction === 'up') position.y = Math.max(0, position.y - 1);
      if (direction === 'down') position.y = Math.min(2, position.y + 1);
      if (direction === 'left') position.x = Math.max(0, position.x - 1);
      if (direction === 'right') position.x = Math.min(4, position.x + 1);
      updatePlayer();
      const previousFound = found;
      updateMemoryAtPosition();
      if (!finished && found === previousFound) {
        setStatus('Ищи три световых следа. Нажми E рядом с фонарём, окном, вывеской или лужей.');
      }
    };
    scene.addEventListener('click', (event) => {
      if (event.target.closest('.night-object')) return;
      const bounds = scene.getBoundingClientRect();
      const targetX = Math.max(0, Math.min(4, Math.floor(((event.clientX - bounds.left) / bounds.width) * 5)));
      const targetY = Math.max(0, Math.min(2, Math.floor(((event.clientY - bounds.top) / bounds.height) * 3)));
      const deltaX = targetX - position.x;
      const deltaY = targetY - position.y;
      if (deltaX !== 0 && Math.abs(deltaX) >= Math.abs(deltaY)) {
        position.x += Math.sign(deltaX);
      } else if (deltaY !== 0) {
        position.y += Math.sign(targetY - position.y);
      } else if (deltaX !== 0) {
        position.x += Math.sign(deltaX);
      }
      updatePlayer();
      const previousFound = found;
      updateMemoryAtPosition();
      if (!finished && found === previousFound) setStatus('Шаг за шагом исследуй ночную улицу.');
    });
    const interactKeyHandler = (event) => {
      if (!screens.vibe.classList.contains('active') || event.key.toLowerCase() !== 'e') return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      event.preventDefault();
      const nearest = [...scene.querySelectorAll('.night-object')]
        .filter((item) => !item.disabled && withinReach(item))
        .sort((first, second) => {
          const distance = (item) => Math.abs(position.x - Number(item.dataset.x)) + Math.abs(position.y - Number(item.dataset.y));
          return distance(first) - distance(second);
        })[0];
      if (nearest) interact(nearest);
    };
    document.addEventListener('keydown', interactKeyHandler);
    registerGameCleanup(() => document.removeEventListener('keydown', interactKeyHandler));
    addMovementControls(controls, move);
    controls.appendChild(button('Начать заново', () => {
      position.x = 2;
      position.y = 2;
      found = 0;
      finished = false;
      score.textContent = '0/3';
      game.classList.remove('is-complete');
      memoryItems.forEach((item) => {
        item.disabled = false;
        item.classList.remove('is-collected');
      });
      scene.querySelectorAll('.night-object--lamp, .night-object--window, .night-object--neon, .night-object--puddle')
        .forEach((item) => item.classList.remove('is-lit', 'is-rippled'));
      updatePlayer();
      setStatus('Исследуй улицу с WASD или экранными кнопками: собери три световых следа. Нажми E рядом с объектом.');
    }));
    board.appendChild(scene);
    updatePlayer();
    setStatus('Исследуй улицу с WASD или экранными кнопками: собери три световых следа. Нажми E рядом с объектом.');
  } else if (config.type === 'melancholic') {
    board.classList.add('rain-board');
    setStatus('Касайся капель на стекле. Здесь не бывает проигрыша.');
    const spawnDrop = () => {
      if (board.children.length > 9) return;
      const drop = button(' ', () => {
        drop.remove();
        addPoint();
        setStatus('Капля растаяла на стекле.');
      }, 'raindrop');
      drop.style.left = `${5 + Math.random() * 88}%`;
      drop.style.animationDuration = `${4 + Math.random() * 2}s`;
      board.appendChild(drop);
      gameTimeout(() => drop.remove(), 6200);
    };
    spawnDrop();
    gameInterval(spawnDrop, 1100);
  } else if (config.type === 'zen') {
    board.classList.add('zen-board');
    setStatus('Нажми и удерживай, когда волна расширяется. Можно просто наблюдать.');
    const wave = document.createElement('div');
    wave.className = 'zen-wave';
    wave.textContent = 'нажми и дыши';
    wave.setAttribute('role', 'button');
    wave.tabIndex = 0;
    board.appendChild(wave);
    const begin = () => {
      wave.style.animationPlayState = 'paused';
      addPoint();
      setStatus('Волна замерла. Отпусти, когда будешь готов(а).');
    };
    const end = () => {
      wave.style.animationPlayState = 'running';
      setStatus('Волна снова дышит в своём ритме.');
    };
    wave.addEventListener('pointerdown', begin);
    wave.addEventListener('pointerup', end);
    wave.addEventListener('pointerleave', end);
  } else if (config.type === 'chaotic') {
    board.classList.add('chaos-board');
    let remaining = 25;
    const roomItems = ['⚡', '🪴', '📚'].map((icon) => {
      let item;
      item = target(icon, () => {
        addPoint();
        moveTarget(item);
        setStatus('Ещё один предмет отправился в полёт!');
      });
      return item;
    });
    const timerLabel = document.createElement('span');
    timerLabel.className = 'game-stat';
    controls.append('Время: ', timerLabel);
    setStatus('Нажимай на предметы комнаты: раунд длится 25 секунд.');
    const timer = gameInterval(() => {
      remaining -= 1;
      timerLabel.textContent = `${remaining} с`;
      if (remaining <= 0) {
        clearInterval(timer);
        roomItems.forEach((item) => { item.disabled = true; });
        setStatus(`Раунд завершён. Ты разнёс(ла) ${points} предмет(а)!`);
      }
    }, 1000);
    timerLabel.textContent = '25 с';
  } else if (config.type === 'happy') {
    setStatus('Лопай шарики: каждое попадание подряд увеличивает комбо.');
    let combo = 0;
    let comboTimeout = null;
    let balloonIndex = 0;
    const balloonColors = ['#ff6f91', '#ffc857', '#64d9cb', '#a78bfa', '#ff91d2'];
    const spawnBalloon = () => {
      if (board.querySelectorAll('.balloon').length > 6) return;
      const balloon = target('🎈', (event) => {
        event.currentTarget.remove();
        combo += 1;
        addPoint(combo);
        setStatus(`Поп! Комбо ×${combo}`);
        if (comboTimeout) window.clearTimeout(comboTimeout);
        comboTimeout = gameTimeout(() => { combo = 0; }, 1500);
      }, 'balloon');
      balloon.style.background = `linear-gradient(145deg,${balloonColors[balloonIndex % balloonColors.length]},color-mix(in srgb,${balloonColors[balloonIndex % balloonColors.length]} 45%,#ffffff))`;
      balloonIndex += 1;
    };
    spawnBalloon();
    gameInterval(spawnBalloon, 950);
  } else if (config.type === 'mysterious') {
    board.classList.add('game-board--secret-room');
    board.setAttribute('aria-label', 'Тайная комната со скрытыми звёздами');
    const playfield = createPlayfield();
    const clues = [
      { x: 14, y: 23 },
      { x: 78, y: 22 },
      { x: 47, y: 49 },
      { x: 25, y: 79 },
      { x: 82, y: 76 },
    ];
    const found = new Set();
    let active = false;
    const startButton = button('Начать тихий поиск', () => {
      active = true;
      startButton.hidden = true;
      board.classList.add('is-searching');
      setStatus('Проведи светом по комнате и коснись найденных звёзд.');
    });
    const restartButton = button('Начать заново', () => {
      active = true;
      found.clear();
      setScore(0);
      game.classList.remove('is-complete');
      board.classList.add('is-searching');
      clues.forEach((_, index) => {
        const star = starButtons[index];
        star.hidden = true;
        star.disabled = false;
        star.classList.remove('is-found');
      });
      restartButton.hidden = true;
      setStatus('Проведи светом по комнате и коснись найденных звёзд.');
    });
    restartButton.hidden = true;
    const revealNearby = (event) => {
      if (!active) return;
      const bounds = playfield.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const normalizedX = Math.max(0, Math.min(100, (x / bounds.width) * 100));
      const normalizedY = Math.max(0, Math.min(100, (y / bounds.height) * 100));
      board.style.setProperty('--light-x', `${normalizedX}%`);
      board.style.setProperty('--light-y', `${normalizedY}%`);
      clues.forEach((clue, index) => {
        if (found.has(index)) return;
        const clueX = bounds.width * (clue.x / 100);
        const clueY = bounds.height * (clue.y / 100);
        if (Math.hypot(x - clueX, y - clueY) <= 90) {
          starButtons[index].hidden = false;
        }
      });
    };
    board.addEventListener('pointermove', revealNearby);
    board.addEventListener('pointerdown', revealNearby);
    registerGameCleanup(() => {
      board.removeEventListener('pointermove', revealNearby);
      board.removeEventListener('pointerdown', revealNearby);
    });
    const starButtons = clues.map((clue, index) => {
      const star = button('✧', () => {
        if (!active || found.has(index)) return;
        found.add(index);
        star.disabled = true;
        star.classList.add('is-found');
        addPoint();
        if (found.size === clues.length) {
          active = false;
          game.classList.add('is-complete');
          restartButton.hidden = false;
          setStatus('Комната наполнилась мягким светом. Ты нашёл(ла) все звёзды.');
        } else {
          setStatus(`Найдено звёзд: ${found.size}/5. В комнате становится светлее.`);
        }
      }, 'secret-room-star');
      star.setAttribute('aria-label', `Скрытая звезда ${index + 1}`);
      star.style.left = `${clue.x}%`;
      star.style.top = `${clue.y}%`;
      star.hidden = true;
      playfield.appendChild(star);
      return star;
    });
    controls.append(startButton, restartButton);
    setStatus('Начни поиск, когда будешь готов(а). Здесь нет таймера и неправильных ответов.');
  } else if (config.type === 'creative') {
    setStatus('Выбери номер цвета, затем закрась области с таким же номером.');
    board.classList.add('paint-by-numbers-board');
    board.setAttribute('aria-label', 'Раскраска по номерам: закат над горами и озером');
    board.innerHTML = `
      <svg class="paint-illustration" viewBox="0 0 600 360" role="group" aria-label="Контурный пейзаж для раскрашивания">
        <title>Закат над озером</title>
        <desc>Восемь пронумерованных областей: небо, солнце, горы, озеро, отражение, холм и звезда.</desc>
        <rect class="paint-paper" x="14" y="14" width="572" height="332" rx="26"></rect>
        <g class="paint-region" data-number="1" data-color="#f2a47d" tabindex="0" role="button" aria-label="Область 1: небо">
          <path d="M28 30H572V192L500 207L438 186L360 208L289 190L215 211L144 190L78 211L28 194Z"></path>
          <text x="300" y="82">1</text>
        </g>
        <g class="paint-region" data-number="3" data-color="#80649b" tabindex="0" role="button" aria-label="Область 3: дальние горы">
          <path d="M28 194L78 211L144 190L215 211L260 204L306 250L28 258Z"></path>
          <text x="91" y="231">3</text>
        </g>
        <g class="paint-region" data-number="4" data-color="#53658e" tabindex="0" role="button" aria-label="Область 4: дальние горы">
          <path d="M260 204L289 190L360 208L438 186L500 207L572 192V258H306Z"></path>
          <text x="459" y="229">4</text>
        </g>
        <g class="paint-region" data-number="2" data-color="#ffd36e" tabindex="0" role="button" aria-label="Область 2: солнце">
          <circle cx="300" cy="128" r="42"></circle>
          <text x="300" y="134">2</text>
        </g>
        <g class="paint-region" data-number="5" data-color="#54a8ae" tabindex="0" role="button" aria-label="Область 5: озеро">
          <path d="M28 258L306 250L572 258V332H28Z"></path>
          <text x="97" y="300">5</text>
        </g>
        <g class="paint-region" data-number="7" data-color="#5d8d78" tabindex="0" role="button" aria-label="Область 7: передний холм">
          <path d="M28 285L137 270L232 290L322 275L405 293L500 276L572 286V332H28Z"></path>
          <text x="487" y="315">7</text>
        </g>
        <g class="paint-region" data-number="6" data-color="#f5c879" tabindex="0" role="button" aria-label="Область 6: отражение в воде">
          <path d="M278 176H322L339 202H261Z"></path>
          <path d="M252 268H348L361 278H239Z"></path>
          <text x="300" y="198">6</text>
        </g>
        <g class="paint-region" data-number="8" data-color="#fff0c2" tabindex="0" role="button" aria-label="Область 8: звезда">
          <path d="M510 75L516 89L531 90L520 100L523 115L510 107L497 115L500 100L489 90L504 89Z"></path>
          <text x="510" y="99">8</text>
        </g>
      </svg>`;
    const regions = [...board.querySelectorAll('.paint-region')];
    const colors = [
      { number: '1', name: 'Персиковое небо', value: '#f2a47d' },
      { number: '2', name: 'Золотое солнце', value: '#ffd36e' },
      { number: '3', name: 'Лиловые горы', value: '#80649b' },
      { number: '4', name: 'Синие горы', value: '#53658e' },
      { number: '5', name: 'Бирюзовое озеро', value: '#54a8ae' },
      { number: '6', name: 'Золотое отражение', value: '#f5c879' },
      { number: '7', name: 'Зелёный холм', value: '#5d8d78' },
      { number: '8', name: 'Светлая звезда', value: '#fff0c2' },
    ];
    const filled = new Set();
    let selectedColor = '1';
    score.textContent = `0/${regions.length}`;
    const paletteButtons = colors.map((color) => {
      const colorButton = button(color.number, () => {
        selectedColor = color.number;
        paletteButtons.forEach((candidate) => {
          const selected = candidate === colorButton;
          candidate.classList.toggle('is-selected', selected);
          candidate.setAttribute('aria-pressed', String(selected));
        });
        setStatus(`Выбран цвет ${color.number} — ${color.name}. Найди области с номером ${color.number}.`);
      }, 'paint-color');
      colorButton.dataset.color = color.number;
      colorButton.style.setProperty('--paint-color', color.value);
      colorButton.setAttribute('aria-label', `Цвет ${color.number}: ${color.name}`);
      colorButton.setAttribute('aria-pressed', String(color.number === selectedColor));
      if (color.number === selectedColor) colorButton.classList.add('is-selected');
      return colorButton;
    });
    const selectRegion = (region) => {
      const number = region.dataset.number;
      if (filled.has(number)) {
        setStatus(`Область ${number} уже раскрашена.`);
        return;
      }
      if (selectedColor !== number) {
        region.classList.remove('is-wrong');
        void region.getBoundingClientRect();
        region.classList.add('is-wrong');
        gameTimeout(() => region.classList.remove('is-wrong'), 450);
        setStatus(`Не тот цвет: области ${number} нужен цвет ${number}.`);
        return;
      }
      filled.add(number);
      region.classList.add('is-filled');
      region.querySelectorAll('path').forEach((path) => { path.style.fill = region.dataset.color; });
      score.textContent = `${filled.size}/${regions.length}`;
      if (filled.size === regions.length) {
        game.classList.add('is-complete');
        setStatus('Пейзаж готов — цвета сложились в твой закат.');
      } else {
        setStatus(`Верно! Раскрашено ${filled.size} из ${regions.length} областей.`);
      }
    };
    board.addEventListener('click', (event) => {
      const region = event.target.closest('.paint-region');
      if (region && board.contains(region)) selectRegion(region);
    });
    board.addEventListener('keydown', (event) => {
      if (!['Enter', ' '].includes(event.key)) return;
      const region = event.target.closest('.paint-region');
      if (!region || !board.contains(region)) return;
      event.preventDefault();
      selectRegion(region);
    });
    controls.append(...paletteButtons, button('Начать заново', () => {
      filled.clear();
      selectedColor = '1';
      game.classList.remove('is-complete');
      regions.forEach((region) => {
        region.classList.remove('is-filled', 'is-wrong');
        region.querySelectorAll('path').forEach((path) => { path.style.fill = ''; });
      });
      paletteButtons.forEach((candidate, index) => {
        const selected = index === 0;
        candidate.classList.toggle('is-selected', selected);
        candidate.setAttribute('aria-pressed', String(selected));
      });
      score.textContent = `0/${regions.length}`;
      setStatus('Раскраска сброшена. Выбери цвет и найди области с таким номером.');
    }));
  } else if (config.type === 'nature') {
    setStatus('Лови листья: ветер меняет направление их полёта.');
    const leaves = [];
    const leafGoal = 5;
    let windInterval = null;
    const moveLeaves = () => {
      leaves.forEach((leaf) => {
        if (!leaf.isConnected || leaf.disabled) return;
        leaf.style.left = `${4 + Math.random() * 88}%`;
        leaf.style.top = `${4 + Math.random() * 78}%`;
      });
    };
    const restartButton = button('Начать заново', () => {
      setScore(0);
      game.classList.remove('is-complete');
      restartButton.hidden = true;
      leaves.forEach((leaf) => {
        leaf.disabled = false;
        leaf.textContent = '❧';
        leaf.classList.remove('is-collected');
        moveTarget(leaf);
      });
      window.clearInterval(windInterval);
      windInterval = window.setInterval(moveLeaves, 1800);
      setStatus('Собирай мерцающие листья и наслаждайся тишиной.');
    });
    restartButton.hidden = true;
    controls.appendChild(restartButton);
    const spawnLeaf = () => {
      const leaf = target('❧', (event) => {
        event.currentTarget.disabled = true;
        event.currentTarget.textContent = '✓';
        event.currentTarget.classList.add('is-collected');
        addPoint();
        if (points === leafGoal) {
          window.clearInterval(windInterval);
          game.classList.add('is-complete');
          restartButton.hidden = false;
          setStatus('Все листья собраны. Лес снова тих и спокоен.');
        } else {
          setStatus(`Собрано листьев: ${points}/${leafGoal}. Ветер меняет направление.`);
        }
      }, 'leaf-target');
      leaves.push(leaf);
    };
    for (let index = 0; index < 5; index += 1) spawnLeaf();
    windInterval = window.setInterval(moveLeaves, 1800);
    registerGameCleanup(() => window.clearInterval(windInterval));
  } else if (config.type === 'retro') {
    setStatus('Двигайся клавишами WASD или экранными кнопками, собирай ★ и обходи ■.');
    board.classList.add('retro-board');
    board.tabIndex = 0;
    const cells = [];
    for (let index = 0; index < 81; index += 1) {
      const cell = document.createElement('span');
      cell.className = 'retro-cell';
      cells.push(cell);
      board.appendChild(cell);
    }
    const walls = new Set([11, 20, 29, 48, 57, 66]);
    let position = 36;
    let collectible = 4;
    const paint = () => cells.forEach((cell, index) => {
      cell.textContent = index === position ? '☺' : index === collectible ? '★' : walls.has(index) ? '■' : '';
    });
    paint();
    const move = (key) => {
      let next = position;
      if (key === 'ArrowLeft') next -= 1;
      if (key === 'ArrowRight') next += 1;
      if (key === 'ArrowUp') next -= 9;
      if (key === 'ArrowDown') next += 9;
      if (next < 0 || next >= 81 || (next % 9 === 0 && position % 9 === 8) || (next % 9 === 8 && position % 9 === 0) || walls.has(next)) return;
      position = next;
      if (position === collectible) {
        addPoint();
        do { collectible = Math.floor(Math.random() * 81); } while (walls.has(collectible) || collectible === position);
      }
      paint();
    };
    const keyHandler = (event) => {
      if (!screens.vibe.classList.contains('active')) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target.isContentEditable) return;
      const directions = { a: 'ArrowLeft', d: 'ArrowRight', w: 'ArrowUp', s: 'ArrowDown' };
      const direction = directions[event.key.toLowerCase()];
      if (!direction) return;
      event.preventDefault();
      move(direction);
    };
    document.addEventListener('keydown', keyHandler);
    registerGameCleanup(() => document.removeEventListener('keydown', keyHandler));
    controls.append(
      button('←', () => move('ArrowLeft')),
      button('↑', () => move('ArrowUp')),
      button('↓', () => move('ArrowDown')),
      button('→', () => move('ArrowRight'))
    );
  } else if (config.type === 'cozy-room') {
    board.classList.add('game-board--cozy-room');
    score.textContent = '0/4';
    const room = document.createElement('div');
    room.className = 'cozy-room-scene';
    room.setAttribute('aria-label', 'Перетаскиваемые предметы уютной комнаты');
    room.style.setProperty('--room-warmth', 'rgba(255, 194, 124, 0.04)');
    const windowFrame = document.createElement('div');
    windowFrame.className = 'room-window';
    windowFrame.setAttribute('aria-hidden', 'true');
    room.appendChild(windowFrame);
    const objects = [
      { id: 'armchair', name: 'Кресло', symbol: '🪑', x: 24, y: 70 },
      { id: 'lamp', name: 'Лампа', symbol: '🪔', x: 78, y: 57 },
      { id: 'plant', name: 'Растение', symbol: '🪴', x: 12, y: 56 },
      { id: 'blanket', name: 'Плед', symbol: '🧶', x: 43, y: 80 },
      { id: 'books', name: 'Книги', symbol: '📚', x: 60, y: 72 },
      { id: 'cushion', name: 'Подушка', symbol: '🛏️', x: 35, y: 57 },
      { id: 'candle', name: 'Свеча', symbol: '🕯️', x: 87, y: 78 },
    ];
    const arranged = new Set();
    const itemElements = [];
    const updateProgress = () => {
      score.textContent = `${Math.min(arranged.size, 4)}/4`;
      room.style.setProperty('--room-warmth', `rgba(255, 194, 124, ${0.04 + Math.min(arranged.size, 4) * 0.045})`);
      if (arranged.size >= 4) {
        game.classList.add('is-complete');
        setStatus('Комната готова. Ты расставил(а) вещи по-своему — уют получился.');
      }
    };
    const registerPlacement = (item) => {
      const distanceX = Number(item.dataset.x) - Number(item.dataset.originX);
      const distanceY = Number(item.dataset.y) - Number(item.dataset.originY);
      if (Math.hypot(distanceX, distanceY) < 6 || arranged.has(item.dataset.id)) return;
      arranged.add(item.dataset.id);
      item.classList.add('is-arranged');
      updateProgress();
    };
    let activeDrag = null;
    const onPointerMove = (event) => {
      if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
      const bounds = room.getBoundingClientRect();
      const x = activeDrag.startX + ((event.clientX - activeDrag.pointerX) / bounds.width) * 100;
      const y = activeDrag.startY + ((event.clientY - activeDrag.pointerY) / bounds.height) * 100;
      if (Math.hypot(event.clientX - activeDrag.pointerX, event.clientY - activeDrag.pointerY) > 3) {
        activeDrag.didMove = true;
      }
      activeDrag.item.dataset.x = String(Math.max(6, Math.min(94, x)));
      activeDrag.item.dataset.y = String(Math.max(12, Math.min(88, y)));
      activeDrag.item.style.left = `${activeDrag.item.dataset.x}%`;
      activeDrag.item.style.top = `${activeDrag.item.dataset.y}%`;
    };
    const onPointerUp = (event) => {
      if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
      const { item, didMove } = activeDrag;
      activeDrag = null;
      item.classList.remove('is-dragging');
      if (didMove) {
        item.dataset.suppressClick = 'true';
        gameTimeout(() => { delete item.dataset.suppressClick; }, 0);
      }
      registerPlacement(item);
      if (didMove && arranged.size < 4) {
        setStatus(`Комната становится уютнее: перемещено предметов ${arranged.size}/4.`);
      }
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    registerGameCleanup(() => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    });

    objects.forEach((object) => {
      const item = button(object.symbol, () => {
        if (item.dataset.suppressClick === 'true') {
          delete item.dataset.suppressClick;
          return;
        }
        room.querySelectorAll('.room-object').forEach((other) => other.classList.remove('is-selected'));
        item.classList.add('is-selected');
        setStatus(`${object.name} выбрано. Перетащи предмет или передвинь его клавишами WASD.`);
      }, `room-object room-object--${object.id}`);
      item.dataset.id = object.id;
      item.dataset.name = object.name;
      item.dataset.x = String(object.x);
      item.dataset.y = String(object.y);
      item.dataset.originX = String(object.x);
      item.dataset.originY = String(object.y);
      item.style.left = `${object.x}%`;
      item.style.top = `${object.y}%`;
      item.setAttribute('aria-label', `${object.name}. Перетащи, чтобы переместить.`);
      item.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 && event.pointerType !== 'touch') return;
        event.preventDefault();
        activeDrag = {
          item,
          pointerId: event.pointerId,
          pointerX: event.clientX,
          pointerY: event.clientY,
          startX: Number(item.dataset.x),
          startY: Number(item.dataset.y),
          didMove: false,
        };
        item.classList.add('is-dragging');
      });
      item.addEventListener('keydown', (event) => {
        const directions = { w: [0, -3], a: [-3, 0], s: [0, 3], d: [3, 0] };
        const delta = directions[event.key.toLowerCase()];
        if (!delta) return;
        event.preventDefault();
        const x = Math.max(6, Math.min(94, Number(item.dataset.x) + delta[0]));
        const y = Math.max(12, Math.min(88, Number(item.dataset.y) + delta[1]));
        item.dataset.x = String(x);
        item.dataset.y = String(y);
        item.style.left = `${x}%`;
        item.style.top = `${y}%`;
        registerPlacement(item);
        if (arranged.size < 4) setStatus(`${object.name} перемещён(а). Расставь любые четыре предмета.`);
      });
      itemElements.push(item);
      room.appendChild(item);
    });

    controls.appendChild(button('Начать заново', () => {
      activeDrag = null;
      arranged.clear();
      game.classList.remove('is-complete');
      itemElements.forEach((item) => {
        const object = objects.find((candidate) => candidate.id === item.dataset.id);
        item.dataset.x = String(object.x);
        item.dataset.y = String(object.y);
        item.style.left = `${object.x}%`;
        item.style.top = `${object.y}%`;
        item.classList.remove('is-arranged', 'is-dragging', 'is-selected');
      });
      updateProgress();
      setStatus('Перетащи любые четыре предмета и создай свою уютную комнату.');
    }));
    board.appendChild(room);
    setStatus('Перетащи любые четыре предмета. На компьютере двигай выбранный предмет клавишами WASD.');
  }
}

function renderAsmrGame() {
  const panel = document.createElement('section');
  panel.className = 'asmr-game';
  const title = document.createElement('h3');
  title.textContent = 'ASMR-прогулка по клавишам';
  const walker = document.createElement('div');
  walker.className = 'keyboard-walker';
  walker.textContent = '🐾';
  walker.setAttribute('aria-hidden', 'true');
  const status = document.createElement('p');
  status.className = 'game-status';
  status.setAttribute('role', 'status');
  status.textContent = 'Выбери клавишу: персонаж перейдёт на неё, а игра воспроизведёт ASMR-звук.';
  const keyboard = document.createElement('div');
  keyboard.className = 'asmr-keyboard';
  const keyRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
  const keys = keyRows.join('').split('');
  const audios = new Set();
  const walkToKey = (key, keyButton) => {
    keyboard.querySelectorAll('.keyboard-key').forEach((item) => item.classList.remove('is-pressed'));
    keyButton.classList.add('is-pressed');
    keyButton.appendChild(walker);
    const audioFile = `audio/asmr/key-${key.toLowerCase()}.mp3`;
    if (typeof Audio === 'undefined') {
      status.textContent = 'Звук недоступен в этом браузере.';
      return;
    }
    const audio = new Audio(audioFile);
    audios.add(audio);
    audio.addEventListener('error', () => {
      status.textContent = `Звук клавиши ${key} недоступен.`;
      audios.delete(audio);
    }, { once: true });
    audio.addEventListener('ended', () => audios.delete(audio), { once: true });
    audio.play().then(() => {
      status.textContent = `Персонаж наступил на ${key}.`;
    }).catch(() => {
      status.textContent = `Не удалось воспроизвести звук клавиши ${key}.`;
    });
  };
  keyRows.forEach((rowKeys) => {
    const row = document.createElement('div');
    row.className = 'keyboard-row';
    rowKeys.split('').forEach((key) => {
      const keyButton = document.createElement('button');
      keyButton.type = 'button';
      keyButton.className = 'keyboard-key';
      keyButton.dataset.key = key;
      keyButton.textContent = key;
      keyButton.setAttribute('aria-label', `Наступить на клавишу ${key}`);
      keyButton.addEventListener('click', () => walkToKey(key, keyButton));
      row.appendChild(keyButton);
    });
    keyboard.appendChild(row);
  });
  const firstKey = keyboard.querySelector('.keyboard-key');
  firstKey.classList.add('is-pressed');
  firstKey.appendChild(walker);
  panel.append(title, status, keyboard);
  asmrStage.replaceChildren(panel);
  const keyHandler = (event) => {
    if (!screens.vibe.classList.contains('active') || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
    const key = event.key.toUpperCase();
    if (!keys.includes(key)) return;
    const keyButton = [...keyboard.querySelectorAll('.keyboard-key')].find((item) => item.dataset.key === key);
    if (keyButton) walkToKey(key, keyButton);
  };
  document.addEventListener('keydown', keyHandler);
  registerGameCleanup(() => document.removeEventListener('keydown', keyHandler));
  registerGameCleanup(() => {
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
}

initParticles();
renderQuestion();
showScreen('home');
startBackgroundPlaylist();

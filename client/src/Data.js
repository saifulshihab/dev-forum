export const Question = [
  {
    _id: 1,
    title: 'Does Redux worth learning?',
    description:
      'I am new at redux, just learning it, I think it is hard to learn, how can I learn it easily any suggesstion?',
    answers: [
      {
        _id: '12121',
        answer: 'Hmm, this is hard to learn.',
        upvote: 0,
        downvote: 5,
        user: {
          username: 'shihab',
          fullname: 'Saiful Islam Shihab',
          dp: require('./demo.png'),
        },
      },
      {
        _id: '1341',
        answer: 'Yeah, its worth to learn',
        upvote: 80,
        downvote: 0,
        user: {
          username: 'shihab',
          fullname: 'Saiful Islam Shihab',
          dp: require('./demo.png'),
        },
      },
    ],
    topic: ['JavaScript'],
    user: {
      username: 'shihab',
      fullname: 'Saiful Islam Shihab',
      dp: require('./demo.png'),
    },
    createdAt: '1h',
  },
  {
    _id: 2,
    title: 'What is _loadash?',
    description: '',
    type: 'question',
    answers: [
      {
        _id: '12121',
        answer: 'Whoooooooooooop',
        upvote: 0,
        downvote: 5,
        user: {
          username: 'shihab',
          fullname: 'Saiful Islam Shihab',
          dp: require('./demo.png'),
        },
      },
      {
        _id: '1341',
        answer: 'Lol, redux is easy :)',
        upvote: 80,
        downvote: 0,
        user: {
          username: 'johndo9',
          fullname: 'Saiful Islam Shihab',
          dp: require('./demo.png'),
        },
      },
    ],
    topic: ['JavaScript'],
    user: {
      username: 'johndo9',
      fullname: 'John Doe',
      dp: require('./demo.png'),
    },
    createdAt: '1h',
  },
];

export const ArticleData = [
  {
    _id: 23,
    title: 'Redux.js explained! Redux + React = Fire"^"',
    body:
      'Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebooks Flux architecture, it was created by Dan Abramov and Andrew Clark Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebooks Flux architecture, it was created by Dan Abramov and Andrew Clark.Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebooks Flux architecture, it was created by Dan Abramov and Andrew Clark. Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebooks Flux architecture, it was created by Dan Abramov and Andrew Clark Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebooks Flux architecture, it was created by Dan Abramov and Andrew Clark.Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebooks Flux architecture, it was created by Dan Abramov and Andrew Clark. ',
    topic: ['JavaScript'],
    user: {
      username: 'johndo9',
      fullname: 'John Doe',
      dp: require('./demo.png'),
    },
    upvote: 23,
    downvote: 2,
    createdAt: '18h',
    comments: [
      {
        _id: 34,
        comment: 'Awesome wrting',
        user: {
          _id: 34536,
          username: 'shihab',
          dp: '',
          fullname: 'saidu shih sdhisgf',
        },
      },
      {
        _id: 894,
        comment: 'Good',
        user: {
          _id: 34536,
          username: 'shihab',
          dp: '',
          fullname: 'saidu shih sdhisgf',
        },
      },
    ],
    share: 5,
  },
  {
    _id: 25,
    title: 'Vue 3 Composition API',
    body:
      'Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebooks Flux architecture, it was created by Dan Abramov and Andrew Clark.',
    topic: ['JavaScript'],
    user: {
      username: 'johndo9',
      fullname: 'John Doe',
      dp: require('./demo.png'),
    },
    upvote: 723,
    downvote: 2,
    createdAt: '18h',
    comments: [],
    share: 5,
  },
  {
    _id: 7,
    title: 'React.js, A library to build user interface',
    body:
      'Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebooks Flux architecture, it was created by Dan Abramov and Andrew Clark.',
    topic: ['JavaScript'],
    user: {
      username: 'johndo9',
      fullname: 'John Doe',
      dp: require('./demo.png'),
    },
    upvote: 4345,
    downvote: 45,
    createdAt: '18h',
    comments: [],
    share: 5,
  },
];

export const FreelanceProjectData = [
  {
    _id: 1,
    title: 'Looking for PHP Laravel developer',
    description:
      'I have ongoing project mobile (Java & Swift) and desktop (electron) app for chatting and i would like to integrate Jitsi meeting on it and add some more feature.',
    languages: ['PHP', 'Html', 'css', 'JavaScript'],
    budget: '10k',
    duration: 7,
  },
  {
    _id: 2,
    title: 'MERN stack dveloper needed',
    description:
      'Need a mern stacjk developer who can heko both as a front-end & back-end developer, w need a social nedia application ehere user can foloow each other, post photos, status, chat with others, and get daily update news of whole world, Need a mern stacjk developer who can heko both as a front-end & back-end developer, w need a social nedia application ehere user can foloow each other, post photos, status, chat with others, and get daily update news of whole world. Need a mern stacjk developer who can heko both as a front-end & back-end developer, w need a social nedia application ehere user can foloow each other, post photos, status, chat with others, and get daily update news of whole world. Need a mern stacjk developer who can heko both as a front-end & back-end developer, w need a social nedia application ehere user can foloow each other, post photos, status, chat with others, and get daily update news of whole world',
    languages: ['React.js', 'Node.js', 'Express', 'MongoDB'],
    budget: '69k',
    duration: 7,
  },
  {
    _id: 3,
    title: 'Swift developer needed',
    description:
      'I have ongoing project mobile (Java & Swift) and desktop (electron) app for chatting and i would like to integrate Jitsi meeting on it and add some more feature.',
    languages: ['Swift', 'iOS', 'C#'],
    budget: '50k',
    duration: 7,
  },
  {
    _id: 4,
    title: 'Need Python Django Developer (Django REST Framework)',
    description:
      'I have ongoing project mobile (Java & Swift) and desktop (electron) app for chatting and i would like to integrate Jitsi meeting on it and add some more feature.',
    languages: ['Django', 'python', 'RESTful ', 'API'],
    budget: '20k',
    duration: 7,
  },
];

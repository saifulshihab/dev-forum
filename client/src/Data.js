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
          dp: '',
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
          dp: '',
        },
      },
    ],
    topic: ['JavaScript'],
    user: {
      username: 'shihab',
      fullname: 'Saiful Islam Shihab',
      dp: '',
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
          dp: '',
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
          dp: '',
        },
      },
    ],
    topic: ['JavaScript'],
    user: {
      username: 'johndo9',
      fullname: 'John Doe',
      dp: '',
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
      dp: '',
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
      dp: '',
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
      dp: '',
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

export const ProfileData = {
  full_name: 'Saiful Islam Shihab',
  username: 'saifulshihab',
  dp: 'images',
  cover: 'images',
  bio: 'React & Node.js Enthusiast <3',
  email: 'saiful35-1970@diu.edu.bd',
  website: 'shihabms-portfolio.netlify.app',
  location: '79 Kazi Nazrul Islam Eve, Farmgate, Dhaka-1215',
  github: 'saifulshihab',
  social_links: [
    {
      category: 'fb',
      link: 'https://facebook.com/isihsihab',
    },
    {
      category: 'tweet',
      link: 'https://twitter.com/isihsihab',
    },
    {
      category: 'insta',
      link: 'https://instagram.com/isihsihab',
    },
  ],
  education: [
    {
      type: 'SSC',
      institute: 'Sholla School & College',
      from: 'Jul 2009',
      to: 'Feb 2014',
      present: false,
      desc: 'Background: Science | GPA 4.75',
    },
    {
      type: 'HSC',
      institute: 'Hajigonj Model University College',
      from: 'Jan 2014',
      to: 'Aug 2016',
      present: false,
      desc: 'Background: Science | GPA 4.75',
    },
    {
      type: 'Bachelor Degree',
      institute: 'Sholla School & College',
      from: 'Jan 2017',
      present: true,
      desc: 'BSc in Software Engineering | CGPA 3.83',
    },
  ],
  experiences: [
    {
      company: 'SoftCare IT USA',
      role: 'Junior Software Engineer',
      from: 'Feb 2012',
      to: 'Dec 2015',
      present: false,
      desc: 'My first job. Had a good experience.',
    },
    {
      company: 'Brain Station 23',
      role: 'Full Stack Engineer',
      from: 'Jan 2015',
      to: 'Feb 2018',
      present: false,
      desc: 'Second job. Was definitely good',
    },
    {
      company: 'Fiverr',
      role: 'Full Stack Web Developer',
      from: 'Oct 2019',
      present: true,
      desc:
        'Freelancing, working as a full stack web developer, Have 5 star rated profile.',
    },
  ],
  createdAt: 'June 29 2019',
};

export const JobData = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'ES Soft Lab',
    topSkills: ['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    salary: '30k-40k',
    job_type: 'Full-Time',
    location: 'Dhaka, Bangladesh',
    description:
      'You love building great software. Your work could be supporting new feature development, migrating existing features, or creating APIs. Youll have to focus on backend development in (NodeJS, GraphQL) but also in frontend development using Javascript. Our client’s tech stack is (React,node.js,GraphQL and AWS). We use modern tools, which means you’ll have the opportunity to work with software like Webpack, Redux, Apollo, Styled Components, AWS and other cloud platforms, and much more You have worked with teams before on large and demonstrable projects. You’re also familiar with frameworks and tools like (enter applicable frameworks here), You understand server side languages. You understand Agile software development, DevOps practices, and can work closely with QA teams to optimize your code.      You relish creating high quality code from the comfort of your own home. Your engineering projects will focus on understanding customers needs and translating those needs from product specifications into functional, production ready code. You will have the opportunity to ship code daily that will be used by customers.You love learning. Engineering is an ever-evolving world. You enjoy playing with new tech and exploring areas that you might not have experience with yet.  You are self-driven, self-learner willing to share knowledge and participate actively in your community.Having overlap with your team is critical when working in a global remote team. Modus requires all team members to overlap with EST morning hours daily. In addition, reliable high speed internet is a must.',
    createdAt: '1d',
  },
  {
    id: 2,
    role: 'Senior Web Developer',
    company: 'Google Inc.',
    topSkills: ['Vue.js', 'Nuxt.js', 'PHP', 'MySQL', 'CMS'],
    salary: '40k-60k',
    job_type: 'Full-Time',
    location: 'Khulna, Bangladesh',
    description:
      'You love building great software. Your work could be supporting new feature development, migrating existing features, or creating APIs. Youll have to focus on backend development in (NodeJS, GraphQL) but also in frontend development using Javascript. Our client’s tech stack is (React,node.js,GraphQL and AWS). We use modern tools, which means you’ll have the opportunity to work with software like Webpack, Redux, Apollo, Styled Components, AWS and other cloud platforms, and much more You have worked with teams before on large and demonstrable projects. You’re also familiar with frameworks and tools like (enter applicable frameworks here), You understand server side languages. You understand Agile software development, DevOps practices, and can work closely with QA teams to optimize your code.      You relish creating high quality code from the comfort of your own home. Your engineering projects will focus on understanding customers needs and translating those needs from product specifications into functional, production ready code. You will have the opportunity to ship code daily that will be used by customers.You love learning. Engineering is an ever-evolving world. You enjoy playing with new tech and exploring areas that you might not have experience with yet.  You are self-driven, self-learner willing to share knowledge and participate actively in your community.Having overlap with your team is critical when working in a global remote team. Modus requires all team members to overlap with EST morning hours daily. In addition, reliable high speed internet is a must.',
    createdAt: '2h',
  },
  {
    id: 3,
    role: 'Front-end Developer',
    company: 'Microsoft Corporation',
    topSkills: ['React.js', 'Angular', 'Vue', 'Ember.js', 'Bootstrap'],
    salary: 'Negotiable',
    job_type: 'Full-Time',
    location: 'Dhaka, Bangladesh',
    description:
      'You love building great software. Your work could be supporting new feature development, migrating existing features, or creating APIs. Youll have to focus on backend development in (NodeJS, GraphQL) but also in frontend development using Javascript. Our client’s tech stack is (React,node.js,GraphQL and AWS). We use modern tools, which means you’ll have the opportunity to work with software like Webpack, Redux, Apollo, Styled Components, AWS and other cloud platforms, and much more You have worked with teams before on large and demonstrable projects. You’re also familiar with frameworks and tools like (enter applicable frameworks here), You understand server side languages. You understand Agile software development, DevOps practices, and can work closely with QA teams to optimize your code.      You relish creating high quality code from the comfort of your own home. Your engineering projects will focus on understanding customers needs and translating those needs from product specifications into functional, production ready code. You will have the opportunity to ship code daily that will be used by customers.You love learning. Engineering is an ever-evolving world. You enjoy playing with new tech and exploring areas that you might not have experience with yet.  You are self-driven, self-learner willing to share knowledge and participate actively in your community.Having overlap with your team is critical when working in a global remote team. Modus requires all team members to overlap with EST morning hours daily. In addition, reliable high speed internet is a must.',
    createdAt: '23d',
  },
];

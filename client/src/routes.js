import ArticleScreen from './Screens/Developer/ArticleScreen';
import AskQuestionsScreen from './Screens/Developer/AskQuestionsScreen';
import FreelanceScreen from './Screens/Developer/FreelanceScreen';
import QuestionScreen from './Screens/Developer/QuestionScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginPage from './Screens/LoginPage';

export const routes = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/h',
    component: HomeScreen,
    routes: [
      {
        path: '/h/questionArticle',
        component: AskQuestionsScreen,
        routes: [
          {
            path: '/articles',
            component: ArticleScreen,
          },
          {
            path: '/questions',
            component: QuestionScreen,
          },
        ],
      },
      {
        path: '/h/freelance',
        component: FreelanceScreen,
      },
    ],
  },
];

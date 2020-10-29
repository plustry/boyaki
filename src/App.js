import React from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AllPosts from './containers/AllPosts';
import PostsBySpecifiedUser from './containers/PostsBySpecifiedUser';

import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub'
import awsmobile from './aws-exports';

// 翻訳
// import { I18n } from 'aws-amplify';
// import { vocabularies } from './dictionary.js'
// I18n.putVocabulariesForLanguage("ja", vocabularies);


Amplify.configure(awsmobile);
PubSub.configure(awsmobile)

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1EA1F2',
      contrastText: "#fff",
    },
    background: {
      default: '#15202B',
      paper: '#15202B',
    },
    divider: '#37444C',
  },
  overrides: {
    MuiButton: {
      color: 'white',
    },
  },
  typography: {
    fontFamily: [
      'Arial', 
    ].join(','),
  },
  status: {
    danger: 'orange',
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    width: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  appBar: {
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      {/* Material-UIのクラスで、アプリケーション全体のCSSテーマをセット */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/*静的サイト内でブラウザの戻る機能を利用したり、外部から直接特定のコンポーネントにアクセスするため、今回はHashRouterを使用しています
          https://example.com/#/global-timelineのような形式で、ルーティングが行われます*/}
        <HashRouter>
          {/* 配下のRouteのうち、どれか一つにマッチしたらそれのみをレンダリング(Switchなしだとマッチしたもの全てがレンダリングされる) */}
          <Switch>
            <Route exact path='/' component={AllPosts} />
            <Route exact path='/global-timeline' component={AllPosts} />
            <Route exact path='/:userId' component={PostsBySpecifiedUser}/>
            <Redirect path="*" to="/" />
          </Switch>
        </HashRouter>
      </ThemeProvider>
    </div>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});
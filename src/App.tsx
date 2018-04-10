import * as React from 'react';
import * as Radium from 'radium';
import { Provider } from 'react-redux';
import { Col, Row } from 'react-flexbox-grid';

import store from './store';

import Root from './components/Root';
import Step from './components/Step';
import List from './components/List';
import Code from './components/Code';
import Welcome from './components/Welcome';
import Evolution from './components/Evolution';
import FeaturesAnimated from './components/FeaturesAnimated';
import Premonition from './components/Premonition';
import TreeView from './components/TreeView';
import State from './components/State';
import Library from './components/Library';
import Chapter from './components/Chapter';
import History from './components/History';

import * as Impl from './misc/codes-and-implementations';

class App extends React.Component {
  render() {
    return (
      <Radium.StyleRoot>
        <Provider store={store}>
          <Root defaultFontColor="#E76720" defaultBackgroundColor="#fff">
            <Step steps={2}>
              <Welcome />
            </Step>
            <Premonition src="images/connect-4.jpg" />
            <Step fontcolor="#E76720">
              <List
                title={`A game of "Connect-4"`}
                points={['MVP', 'Customization', '0 bugs objective']}
              />
            </Step>
            <Step>
              <h4>Skills and Libs 👨‍💻</h4>
            </Step>
            <Library
              src="http://blog.xebia.fr/wp-content/uploads/2014/03/typescript-logo.png"
              name="Microsoft/TypeScript"
            />
            <Library
              src="https://blog.octo.com/wp-content/uploads/2015/12/react-logo-1000-transparent.png"
              name="facebook/react"
            />
            <Library src="images/redux-logo.png" name="reactjs/redux" />
            <Library
              src="https://redux-observable.js.org/logo/logo-small.gif"
              name="redux-observable/redux-observable"
            />
            <Library icon="💅" name="styled-components/styled-components" />
            <Library
              src="https://pbs.twimg.com/profile_images/821713465245102080/mMtKIMax_400x400.jpg"
              name="facebook/jest"
            />
            <Library
              src="https://avatars0.githubusercontent.com/u/698437?s=400&v=4"
              name="airbnb/enzyme"
            />
            <Step>
              <h4>Architecture 🏢</h4>
            </Step>
            <Code
              backgroundcolor="#1E1F21"
              highlightedLines={[
                null,
                [4, 5, 6, 7, 8, 9, 10],
                [11],
                [12, 13, 14, 15],
                [16],
                [17, 18, 19],
                [20, 21, 22, 23],
                [3],
                null
              ]}
            >
              {Impl.ConnectFourState}
            </Code>
            <Step>
              <h4>Actions 🏃</h4>
            </Step>
            <Code backgroundcolor="#1E1F21" highlightedLines={[null]}>
              {Impl.ActionDeclarations}
            </Code>
            <Code backgroundcolor="#1E1F21" highlightedLines={[null]}>
              {Impl.ActionExample}
            </Code>
            <Step>
              <h4>Effects 🦆</h4>
            </Step>
            <Code
              backgroundcolor="#1E1F21"
              highlightedLines={[null, [11], [13, 14, 15]]}
            >
              {Impl.EpicExample}
            </Code>
            <Step>
              <h4>Demo! 📦</h4>
              <Premonition src="https://usatftw.files.wordpress.com/2016/04/obama.gif?w=1000" />
            </Step>
            <Step>
              <h4>Code review ? 🗞</h4>
            </Step>
            <Step fontcolor="#46BA98" backgroundcolor="#eee">
              <h2>Thank you!</h2>
              <h3>Questions ?</h3>
            </Step>
          </Root>
        </Provider>
      </Radium.StyleRoot>
    );
  }
}

export default App;

import React, { Suspense } from 'react';
import { isMobile } from 'react-device-detect';

import './styles/home.css';
import './styles/fallback.css';

const MobileHeader = React.lazy(() => import('./components/mobile/Header'));
const MobileMain = React.lazy(() => import('./components/mobile/Main'));

const Header = React.lazy(() => import('./components/Header'));
const Main = React.lazy(() => import('./components/Main'));
const Cursor = React.lazy(() => import('./components/Cursor'));

// const isMobile = ( /\bmob/i.test(navigator.userAgent) )

const Fallback = () => (
  <div style={{ 
    backgroundColor: "#f7f8fa", 
    height: "100vh", 
    width: "100vw", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center" 
  }}>
    {/* <div className="rectangle" /> */}
  </div>
)

const Web = () => (
  <div className="app">
    <Suspense fallback={<Fallback />}>
      <Header />
      <Main />
      <Cursor />
    </Suspense>
  </div>
)

const Mobile = () => (
  <div className="app">
    <Suspense fallback={<Fallback />}>
      <MobileHeader />
      <MobileMain />
    </Suspense>
  </div>
)

const App = () => isMobile ? <Mobile /> : <Web />
// const App = () => <Fallback/>

export default App
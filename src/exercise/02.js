// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext();

function Toggle({children}) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  // 💰 React.Children.map(props.children, child => {/* return child clone here */})
  // 📜 https://react.dev/reference/react/Children
  // 📜 https://react.dev/reference/react/cloneElement

  // Passes in child components with on and toggle props
  return <ToggleContext.Provider value={{on, toggle}}>{children}</ToggleContext.Provider>;
}

function useToggle() {
  var context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggle must be used within a <Toggle />');
  }

  return context;
}

// Accepts `on` and `children` props and returns `children` if `on` is true
function ToggleOn ({children}) {
  const {on} = useToggle();
  return on ? children : null;
}

function ToggleOff ({children}) {
  const {on} = useToggle();
  return !on ? children : null;
}

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
function ToggleButton({...props}) {
  const {on, toggle} = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span> Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/

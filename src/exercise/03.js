// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  return (
    <ToggleContext.Provider
      value={{
        on,
        toggle,
      }}
    >
      {children}
    </ToggleContext.Provider>
  )
}

const useToggleContext = () => {
  const context = React.useContext(ToggleContext)
  if (!context)
    throw Error('Toggle context must be used inside ToggleContext.Provider')
  return context
}
function ToggleOn({children}) {
  const {on} = useToggleContext()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggleContext()
  return on ? null : children
}

function ToggleButton({...props}) {
  const {on, toggle} = useToggleContext()

  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

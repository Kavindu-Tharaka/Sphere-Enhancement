import { useState } from 'react'

function App() {
  const [count, setCount] = useState(125)

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      Count is {count}
    </button>
  )
}

export default App
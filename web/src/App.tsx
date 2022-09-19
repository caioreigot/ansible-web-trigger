import './styles/main.css'

import runAnsible from './runAnsible'

function App() {
  return (
    <div className="h-full flex flex-col items-center justify-center w-4/5 p-[24px]">
      <h1 className="font-medium text-3xl text-center">Ansible Web</h1>
      <button onClick={runAnsible} className="border-2 border-black py-[8px] w-1/4 my-[16px] hover-black-bg">
        Rodar
      </button>
      <div className="grow w-full bg-black rounded-[4px]">

      </div>
    </div>
  )
}

export default App
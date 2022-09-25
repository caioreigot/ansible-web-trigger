import './styles/jsonFormatterStyles.css';
import './styles/main.css';

import { useState, ReactElement } from 'react';
import { AnsibleCallback } from './aux/interfaces';
import runAnsible from './aux/runAnsible';
import openJsonFormatter from './aux/openJsonFormatter';

function App() {
  const [log, setLog] = useState<AnsibleCallback | null>(null);

  const renderLog = (): ReactElement[] => {
    const statsElements: ReactElement[] = [];

    Object.keys(log!.stats).forEach((key, index) => {
      const stat = log!.stats[key];

      statsElements.push(
        <div className="block" key={index}>
          <p className="block text-cyan-400">[{key}]</p>
          <p className="block">
            <span className="text-green-300">ok={stat?.ok ?? '?'}</span>&nbsp;
            <span className="text-yellow-300">changed={stat?.changed ?? '?'}</span>&nbsp;
            <span className="text-red-300">unreachable={stat?.unreachable ?? '?'}</span>&nbsp;
            <span className="text-red-300">failures={stat?.failures ?? '?'}</span>&nbsp;
            <span className="text-sky-300">skipped={stat?.skipped ?? '?'}</span>
          </p>
          <br />
        </div>
      );
    });

    return statsElements;
  }

  return (
    <div className="h-full flex flex-row items-center justify-center space-x-8 w-full p-[16px]">
      <div className="w-1/4 flex flex-col justify-center items-center">
        <h1 className="font-medium text-3xl text-center text-black">
          Ansible Web Trigger
        </h1>
        <button onClick={e => runAnsible(e, setLog)} className="w-full min-w-[80px] font-black text-black border-2 border-black py-[8px] my-[16px] hover-black-bg rounded-[2px]">
          Run
        </button>
        <a className="footer text-white text-sm text-center bg-black w-[180px] py-[6px] rounded-[2px]" href="https://github.com/caioreigot" target="_blank">
          Caio Costa
        </a>
      </div>
      <div className="h-full w-3/4 min-w-[400px] bg-black rounded-[4px] p-[24px] overflow-y-auto scrollbar">
        {log &&
          <>
            {renderLog()}
            <p className="block">Click <span onClick={openJsonFormatter} className="font-black text-teal-300 hover:cursor-pointer">here</span> to see the full result in JSON</p>
          </>
        }
      </div>
    </div>
  );
}

export default App;
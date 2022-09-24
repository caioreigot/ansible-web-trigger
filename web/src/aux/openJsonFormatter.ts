import JSONFormatter from "json-formatter-js";
import { ansibleJsonResponse } from "./runAnsible";


const createModal = (): HTMLDivElement => {
  const jsonFormatterConfig = {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewFieldCount: 5,
    theme: 'dark',
    animateOpen: true,
    animateClose: true,
    useToJSON: true,
    exposePath: false
  }
  
  const parentDiv: HTMLDivElement = document.createElement('div');
  const formatter = new JSONFormatter(ansibleJsonResponse, 1, jsonFormatterConfig);
  const jsonFormatterDisplay: HTMLDivElement = formatter.render();
  const closeButton = document.createElement('button');

  parentDiv.classList.add('json-formatter-modal');
  jsonFormatterDisplay.classList.add('json-formatter-display')
  closeButton.classList.add('close-button');

  closeButton.innerHTML = '&times;';

  closeButton.onclick = (e: any) => {
    e.target // Close Button
      .parentNode // Display
      .parentNode // Modal
      .remove();
  }

  parentDiv.appendChild(jsonFormatterDisplay);
  jsonFormatterDisplay.appendChild(closeButton);

  return parentDiv;
}

export default function openJsonFormatter() {
  const root = document.getElementById('root');
  const modal = createModal();
  root?.appendChild(modal);
}
import axios from 'axios';

export default function runAnsible() {
  const data = JSON.stringify({
    hello: "world"
  });

  axios.post('http://127.0.0.1:5000', data);
}
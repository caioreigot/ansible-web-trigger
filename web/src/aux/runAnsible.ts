import axios from 'axios';
import React from 'react';
import { AnsibleCallback } from './interfaces';

declare type LogSetter = React.Dispatch<React.SetStateAction<AnsibleCallback | null>>;

export let ansibleJsonResponse;

export default function runAnsible(e: any, setLog: LogSetter) {
  e.target.innerText = 'Loading';

  axios.get('http://127.0.0.1:5000/')
    .then(res => {
      setLog(res.data);
      ansibleJsonResponse = res.data;
      console.log("Data returned by Ansible:", res.data);
      e.target.innerText = 'Run';
    });
}
import axios from 'axios';
import React from 'react';
import { AnsibleCallback } from './interfaces';

declare type LogSetter = React.Dispatch<React.SetStateAction<AnsibleCallback | null>>;

export default function runAnsible(setLog: LogSetter) {
  axios.get('http://127.0.0.1:5000/')
    .then(res => {
      setLog(res.data);
      console.log("Data returned by Ansible:", res.data);
    });
}
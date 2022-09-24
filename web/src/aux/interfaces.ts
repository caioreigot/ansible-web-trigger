interface Play {
  play: {
    id: string,
    name: string
  },
  tasks: Task[]
}

interface Task {
  hosts: {
    [key: string]: object
  },
  task: {
    id: string,
    name: string
  }
}

export interface Stats {
  changed: number,
  failures: number,
  ok: number,
  skipped: number,
  unreachable: number
}

export interface AnsibleCallback {
  plays: Play[],
  stats: {
    [key: string]: Stats | undefined
  }
}
  type TodoType = {
    id: number
    input: string
    priority: string
    isFinished: boolean
  }
  
  type FilterType = '전체' | '완료' | '미완료'
  
  export type { TodoType, FilterType }
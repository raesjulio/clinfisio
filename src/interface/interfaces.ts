export interface ITransaction{
    id?: string
    title: string
    price: number
    description: string
    type: boolean
    created_at: string
}
export interface ITable{
    handleTransaction: (e:ITransaction)=>void
  }
  export interface IValuesTransactionModal {
    id?: Number
    title: string
    price: string
    description: string
    type: boolean
}

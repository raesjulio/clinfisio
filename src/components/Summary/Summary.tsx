import { useEffect, useState } from "react"
import { ITransaction } from "../../interface/interfaces"
import { queryClient } from "../../services/queryClient"
import styles from "./styles.module.scss"

export const Summary = () => {
  const prev = queryClient.getQueryData<ITransaction[]>("list")
  const [entrada, setEntrada] = useState("R$ 0")
  const [saida, setSaida] = useState("R$ 0")
  const [total, setTotal] = useState(0)
 
  useEffect(() => {
    if (prev?.length > 0) {
      let inValue = 0, outValue = 0
      prev.forEach(item => {
        if (item.type) {
          return inValue = inValue + item.price
        }
        return outValue = outValue + item.price
      })
      
      let inV =new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(inValue/100)
      setEntrada(inV)
      let out =new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(outValue/100)
      setSaida(out)
      setTotal((inValue - outValue) / 100)
    }
  }, [prev])
  return (
    <div className={styles.container}>
      <div>
        <header>
          <p>Entradas</p>
          <img src="/images/income.svg" alt="Entradas" />
        </header>
        <strong className={styles.deposit}>{entrada}</strong>
        <label>Ultima entrada dia 13</label>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src="/images/outcome.svg" alt="Saidas" />
        </header>
        <strong className={styles.withraw}>- {saida}</strong>
        <label>Ultima saida dia 13</label>
      </div>
      <div className={styles.total} style={total< 0 ? {background:"var(--red)", color:"var(--shape)"}: {}}>
        <header>
          <p>Total</p>
          <img src="/images/total.svg" alt="Total" />
        </header>
        <strong>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}</strong>
        <label>01 à 15 de abril</label>
      </div>
    </div>
  )
}

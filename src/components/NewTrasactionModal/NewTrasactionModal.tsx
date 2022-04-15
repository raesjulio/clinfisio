
import { ChangeEvent, FormEvent, useState } from "react"
import ReactModal from "react-modal"
import { ITransaction } from "../../interface/interfaces"
import { api } from "../../services/api"
import { queryClient } from "../../services/queryClient"
import styles from "./styles.module.scss"
interface Props {
    isOpen: boolean
    onRequestClose: () => void
}
interface IValuesTransactionModal {
    title: string
    price: string
    description: string
    type: boolean
}
const initialValues = () => {
    return {
        title: '',
        price: "",
        description: '',
        type: true
    }
}
ReactModal.setAppElement("#__next")
export const NewTrasactionModal = (props: Props) => {
    const [type, setType] = useState(false)
    const [values, setValues] = useState<IValuesTransactionModal>(initialValues)
    const [error, setError] = useState(false)
    const handleCreateNewTransaction = async (e: FormEvent) => {
        e.preventDefault()
        const objSend = {
            ...values,
            price: values.price.replace(/[^0-9]/g, ''),
            type: type,
        }
        let arrayTransaction = queryClient.getQueryData<ITransaction[]>("list")
        const response = await api
            .post("/newtransaction", objSend)
            .then(item => item.data)
            .catch(()=>setError(true))
        if (response) {
            arrayTransaction = [...arrayTransaction, response[0]]
            queryClient.setQueryData("list", arrayTransaction)
            setValues(initialValues)
            return props.onRequestClose()
        }

    }
    const onChangeInputs = (e: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name === "price") {
            return setValues({ ...values, [name]: new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(Number(value.replace(/[^0-9]/g, '')) / 100) })
        }
        setValues({ ...values, [name]: value })
    }

    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            overlayClassName={`${styles.modalOverlay}`}
            className={`${styles.modalContent}`}
        >
            <button
                className={styles.modalClose}
                type="button"
                onClick={props.onRequestClose}>
                <img src="/images/close.svg" alt="fechar modal" />
            </button>
            <form className={styles.container} onSubmit={handleCreateNewTransaction}>
                <h2>Cadastar Transação</h2>
                <input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={e => onChangeInputs(e)}
                    placeholder="Titulo" />
                <input
                    type="text"
                    name="price"
                    value={values.price.toString()}
                    onChange={e => onChangeInputs(e)}
                    placeholder="Valor" />
                    <div className={styles.typeTransaction}>
                    <button
                        className={type ? styles.deposit : ""}
                        type="button"
                        onClick={() => setType(true)}>
                        <img src="/images/income.svg" alt="Entrada" />
                        <span>Entrada</span>
                    </button>
                    <button
                        className={type ? "" : styles.withraw}
                        type="button"
                        onClick={() => setType(false)}>
                        <img src="/images/outcome.svg" alt="Saida" />
                        <span>Saida</span>
                    </button>
                </div>
                <textarea
                    
                    name="description"
                    value={values.description}
                    onChange={e => onChangeInputs(e)}
                    placeholder="Descrição" />
                
                <button type="submit">Cadastrar</button>
            </form>
        </ReactModal>
    )
}

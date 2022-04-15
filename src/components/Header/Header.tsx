
import { Box, Fab, Input } from "@mui/material"
import { useState } from "react"
import styles from "./styles.module.scss"
import AddIcon from '@mui/icons-material/Add';
import { GroupButtons } from "../GroupButtons/GroupButtons";
interface Props {
    onOpenNewTransactionModal: () => void
}
export const Header = ({ onOpenNewTransactionModal }: Props) => {
    const [checked, setChecked] = useState(false)
   
    return (<>
        <header className={styles.containerHeader}>
            <div className={styles.content}>
                <div>
                    <img src="/images/logo.png" alt="" />
                    <button type="button" className={styles.out}>Sair</button>
                </div>

                <div>
                    <input type="checkbox" name="filter" id="filter" checked={checked} onChange={() => setChecked(!checked)} />
                    <label className={checked ? styles.checked : ''} htmlFor="filter" >Filtro</label>
                    <button
                        onClick={onOpenNewTransactionModal}
                        type='button'
                    >Nova Transação</button>
                </div>
               
            {checked ? <GroupButtons/>:""}
            </div>
        </header>
       
        <section className={styles.add} onClick={onOpenNewTransactionModal}>
            <span>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab style={{ zIndex: "-1" }} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Box>
            </span>
        </section>
           
    </>
    )
}

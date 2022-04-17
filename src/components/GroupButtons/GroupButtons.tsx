
import React, { useState } from 'react'
import styles from "./styles.module.scss"

export const GroupButtons = () => {
    const grupButtons = [
        { name: "Mês", id: 1 },
        { name: "Semana", id: 2 },
        { name: "Dia", id: 3 },
    ]
    const [valueGroup, setValueGroup] = useState(1)

    return (
        <aside className={styles.group}>
            {grupButtons.map(item => {
                return <>
                    <input 
                        value={item.id}
                        key={item.id+item.name}
                        checked={valueGroup === item.id}
                        type="checkbox"
                        name={item.name}
                        id={item.name}
                        onChange={(e) => setValueGroup(Number(e.target.value))} />
                    <label 
                        className={valueGroup === item.id ? styles.checked: ""}
                    htmlFor={item.name}>{item.name}</label>
                </>
            })}
        </aside>
    )
}

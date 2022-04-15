import axios from "axios"
import { useQuery } from "react-query"

const resposeTransaction = async () => {
    return await axios.get("http://localhost:3000/api/listtrasaction").then(item => {
        return item.data
    })

}
export default () => {
    const data = useQuery("list", resposeTransaction)
    return data
}

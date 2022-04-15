import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../services/supabase";


export default async (request: NextApiRequest, response: NextApiResponse) =>{
    if (request.method === "GET") {
        const { data, error } = await supabase.from("transation").select("*")
        if (data) {
            return response.status(200).json(data)
        }
        return response.status(400).json(error)
    }
}
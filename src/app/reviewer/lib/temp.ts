import { headers } from "next/headers";

const BASE_URL =
  "https://a2sv-application-platform-backend-team12.onrender.com/docs#";


export async function fetch_review() {
    try{
        var res = await fetch(`${BASE_URL}/reviews`,{
            headers: {
                "Accept": "application/json",
            },
        });

        if (!res) throw new Error("there is an error!");

        const data =  res.json();

        return data
    }catch{
        alert("there is an error!");
        return [];
    }
    
}
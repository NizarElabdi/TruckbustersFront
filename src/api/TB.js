// import { config } from "../config";

export function getAllRDV() {
    return fetch('http://localhost:5300/api/v1/book')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Reqète réussi")
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });

}
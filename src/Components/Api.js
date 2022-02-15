import axios from "axios";
import  BaseUrlApi from "../../package.json";

export async function getApi(typeUrl) {
    let result;
    await axios.get(BaseUrlApi + typeUrl)
        .then(response => result = response)
        .catch(error => {
            console.error("Error from API: ", error);
        });
    return result;
}
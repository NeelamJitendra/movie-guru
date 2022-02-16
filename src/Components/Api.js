import axios from "axios";
let BaseUrlApi= "http://192.168.0.107:5000"
export async function getApi(typeUrl, movie, city) {
    let result;
    let url = BaseUrlApi+ typeUrl;
    await axios.get(url , {
        params: {
          city: city,
          movie: movie
        }
      })
        .then(response => result = response)
        .catch(error => {
            console.error("Error from API: ", error);
        });
    return result;
}

export async function reserveApi(typeUrl,body) {
    let result;
    let url = BaseUrlApi+ typeUrl;
    await axios.post(url , body)
        .then(response => result = response)
        .catch(error => {
            console.error("Error from API: ", error);
        });
    return result;
}
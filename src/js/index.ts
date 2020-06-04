import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface ISki {
    id: Number;
    skiLength: Number;
    skiType: String;
    price: Number;
}

let baseUrl: string = "https://skishopoliver.azurewebsites.net/api/Ski"

new Vue({
    el: "#app",
    data: {
        skis: [],
        errors: [],
        // errorMessage: "",
        formData: {
            id: 0,
            skiLength: 0,
            skiType: "",
            price: 0
        },
        addMessage: "",
    },

    methods: {
    getAllSkis() {
        console.log("getAllSkis")
        axios.get<ISki[]>(baseUrl)
            .then((response: AxiosResponse<ISki[]>) => {
                console.log(response.data)
                this.skis = response.data
            })

            .catch((error: AxiosError) => {
                this.errorMessage = error.message
            })
        
    },

    addSki() {

        let addIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addId")
        let addSkiLengthElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addSkiLength");
        let addSkiTypeElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addSkiType")
        let addPriceElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addPrice");

        let myskiID: number = Number(addIdElement.value);
        let myskiLength: number = Number(addSkiLengthElement.value);
        let myskiType: string = addSkiTypeElement.value;
        let myskiPrice: number = Number(addPriceElement.value);

        axios.post<ISki>(baseUrl, { id: myskiID, skiLength: myskiLength, skiType: myskiType, price: myskiPrice })
            .then((response: AxiosResponse) => {
                let message: string = "response " + response.status + " " + response.statusText
                this.addMessage = message
                this.getAllSkis()
            })
            .catch((error: AxiosError) => {
                // this.addMessage = error.message
                alert(error.message)
            })
        }
    }
}
})

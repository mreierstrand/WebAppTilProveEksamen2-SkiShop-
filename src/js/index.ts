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

let baseUrl: string = "https://skishopserviceeksamen.azurewebsites.net/api/Ski"

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
        updateData: {
            id: 0,
            skiLength: 0,
            skiType: "",
            price: 0
        },
        addMessage: "",
        deleteMessage: "",
        deleteId: 0,
        updateMessage: ""
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

            let addIdElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addId")
            let addSkiLengthElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addSkiLength");
            let addSkiTypeElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addSkiType")
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
        },

        deleteSki(deleteId: number) {
            let uri: string = baseUrl + "/" + deleteId
            axios.delete<void>(uri)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = response.status + " " + response.statusText
                    this.getAllSkis()
                })
                .catch((error: AxiosError) => {
                    //this.deleteMessage = error.message
                    alert(error.message)
                })
        },

        updateSki() {
            let uri: string = baseUrl + "/" + this.updateData.id
            axios.put<ISki>(uri, this.updateData)
                .then((response: AxiosResponse) => {
                    let message: string = "response " + response.status + " " + response.statusText
                    this.updateMessage = message
                    this.getAllSkis()
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        }
    }
})

import Observer from "./Observer.js";

class SensorsDisplay extends Observer {
    constructor() {
        super();
        this.maxExtTempSpan = document.getElementById('max-temp-out');
        this.minExtTempSpan = document.getElementById('min-temp-out');

        this.maxIntTempSpan = document.getElementById('max-temp-in');
        this.minIntTempSpan = document.getElementById('min-temp-in');

        if (localStorage.getItem("sensorsTemps"))
            this.unloadData()
    }

    unloadData() {
        let data = JSON.parse(localStorage.getItem("sensorsTemps"));

        this.maxIntTempSpan.innerText = data.intMax;
        this.minIntTempSpan.innerText = data.intMin;
        this.maxExtTempSpan.innerText = data.extMax;
        this.minExtTempSpan.innerText = data.extMin;
    }

    storeData(extMax, extMin, intMax, intMin) {
        const data = {
            extMax: extMax,
            extMin: extMin,
            intMax: intMax,
            intMin: intMin
        };
        localStorage.setItem("sensorsTemps", JSON.stringify(data));
    }

    update(data) {
        document.getElementById("out-temp").innerText = data.state[1].Valeur;
        document.getElementById('in-temp').innerText = data.state[0].Valeur;

        const maxTempExt = this.maxExtTempSpan.innerText;
        const minTempExt = this.minExtTempSpan.innerText;

        const maxTempIn = this.maxIntTempSpan.innerText;
        const minTempIn = this.minIntTempSpan.innerText;

        if (maxTempExt !== '') {
            if (maxTempExt < data.state[1].Valeur) {
                this.maxExtTempSpan.innerText = data.state[1].Valeur;
            } else if (minTempExt > data.state[1].Valeur) {
                this.minExtTempSpan.innerText = data.state[1].Valeur;
            }

            if (maxTempIn < data.state[1].Valeur) {
                this.maxIntTempSpan.innerText = data.state[0].Valeur;
            } else if (minTempIn > data.state[1].Valeur) {
                this.minIntTempSpan.innerText = data.state[0].Valeur;
            }
        } else {
            this.maxExtTempSpan.innerText = data.state[1].Valeur;
            this.minExtTempSpan.innerText = data.state[1].Valeur;

            this.maxIntTempSpan.innerText = data.state[0].Valeur;
            this.minIntTempSpan.innerText = data.state[0].Valeur;
        }

        this.storeData(this.maxExtTempSpan.innerText, this.minExtTempSpan.innerText,
            this.maxIntTempSpan.innerText, this.minIntTempSpan.innerText);
    }
}

export default SensorsDisplay;
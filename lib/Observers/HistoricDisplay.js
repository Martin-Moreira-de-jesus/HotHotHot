import Observer from "./Observer.js";

class HistoricDisplay extends Observer {
    _callback;

    set callback(value) {
        this._callback = value;
    }

    constructor() {
        super();

        this.historicTableBody = document.querySelector('#historic tbody');
        this.tableEntryTemplate = document.querySelector('#entry-template');

        if (localStorage.getItem("histori")) {
            this.unloadData();
        }
    }

    unloadData() {

    }

    loadData(data) {
        console.log(data);
        data.forEach(entry => {

            }
        )
        if (!localStorage.getItem("historic")) {
            localStorage.setItem("historic", data);
        }
    }

    update(data) {
        data.state.forEach(sensor => {
            let clonedRow = document.importNode(this.tableEntryTemplate.content, true);

            let cells = clonedRow.querySelectorAll('td');

            cells[0].innerText = sensor.Valeur + '°C';
            cells[1].innerText = sensor.Nom;
            cells[2].innerText = new Date().toLocaleString();

            this.historicTableBody.append(clonedRow);
            this._callback.notify();
        });

        this.loadData(data.state);
    }
}

export default HistoricDisplay;
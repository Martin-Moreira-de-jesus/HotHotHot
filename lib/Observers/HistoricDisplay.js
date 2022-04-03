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

        if (localStorage.getItem("historic")) {
            this.unloadData();
        }
    }

    unloadData() {
        let arr = JSON.parse(localStorage.getItem("historic"));
        arr.forEach(element => {
            this.addRow(element);
        });
    }

    loadData(data) {
        if (!localStorage.getItem("historic")) {
            localStorage.setItem("historic", '[]');
        }
        let arr = JSON.parse(localStorage.getItem("historic"));
        data.forEach(entry => {
            arr.push({
                Nom: entry.Nom,
                Valeur: entry.Valeur,
                Date: entry.Date,
            })
        });
        localStorage.setItem("historic", JSON.stringify(arr));
    }

    addRow(sensor) {
        let clonedRow = document.importNode(this.tableEntryTemplate.content, true);

        let cells = clonedRow.querySelectorAll('td');

        cells[0].innerText = sensor.Valeur + '°C';
        cells[1].innerText = sensor.Nom;
        cells[2].innerText = sensor.Date ? sensor.Date : new Date().toLocaleString();

        this.historicTableBody.append(clonedRow);

        if (this._callback) {
            this._callback.notify();
        }
    }

    update(data) {
        data.state.forEach(sensor => {
            sensor.Date = new Date().toLocaleString();
            this.addRow(sensor);
        });

        this.loadData(data.state);
    }
}

export default HistoricDisplay;
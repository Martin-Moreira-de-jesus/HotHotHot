const labels = [];
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Intérieur',
            data: [],
            borderColor: 'rgba(255, 0, 0, 1)',
        },
        {
            label: 'Extérieur',
            data: [],
            borderColor: 'rgba(0, 255, 0, 1)',
        },
    ]
}
const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Moyenne des temperatures par jour'
            }
        }
    }
});

function getDays(data) {
    const days = [];
    for (let i = 0; i < data.length; i++) {
        let day = data[i].Date.split('/')[0];
        if (day[0] === "0") {
            day = day.substring(1);
        }
        if (!days.includes(day)) {
            days.push(day);
        }
    }
    return days;
}

function getAverageValueForDayAndName(data, givenDay, name) {
    let sum = 0;
    let count = 0;
    data.forEach(element => {
        let day = element.Date.split('/')[0];
        if (day[0] === "0") {
            day = day.substring(1);
        }
        // console.log("day", day, "givenDay", givenDay);
        // console.log("element", element.Nom, "name", name);
        if (day === givenDay && element.Nom === name) {
            sum += parseInt(element.Valeur);
            count++;
        }
    });
    return sum / count;
}

function handler() {
    if (localStorage.getItem("historic")) {
        data.labels = [];
        data.datasets[0].data = [];
        data.datasets[1].data = [];
        const historic = JSON.parse(localStorage.getItem("historic"));
        historic.sort((a, b) => a.Date - b.Date);
        getDays(historic).forEach(day => {
            data.labels.push(day);
            data.datasets[0].data.push(getAverageValueForDayAndName(historic, day, "interieur"));
            data.datasets[1].data.push(getAverageValueForDayAndName(historic, day, "exterieur"));
        });

        myChart.update();
    }
}

handler();
let interval = setInterval(handler, 10000);

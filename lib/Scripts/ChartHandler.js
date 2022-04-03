const labels = ['Janvier', 'Février', 'Mars', 'Avril'];
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Intérieur',
            data: [10, 20, 30, 40],
            borderColor: 'rgba(255, 0, 0, 1)',
        },
        {
            label: 'Extérieur',
            data: [15, 25, 35, 45],
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
                text: 'Historique des températures'
            }
        }
    }
});


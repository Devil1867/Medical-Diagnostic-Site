const benignData = [0.55, 0.01, 0.05, 0.36, 0.10, 0.45, 0.44, 0.43, 0.48, 0.21, 0.20, 0.11, 0.16, 0.54, 0.20, 0.38, 0.01, 0.35, 0.21, 0.21];
const malignantData = [0.45, 0.99, 0.95, 0.64, 0.90, 0.55, 0.56, 0.57, 0.52, 0.79, 0.80, 0.89, 0.84, 0.46, 0.80, 0.62, 0.99, 0.65, 0.79, 0.79];
const labels = Array.from({ length: 20 }, (_, i) => (i + 1).toString());

// Line Chart
const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Benign Probability',
        data: benignData,
        borderColor: 'green',
        backgroundColor: 'green',
        fill: false,
        tension: 0.1,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBackgroundColor: 'green'
      },
      {
        label: 'Malignant Probability',
        data: malignantData,
        borderColor: 'red',
        backgroundColor: 'red',
        fill: false,
        tension: 0.1,
        pointStyle: 'cross',
        pointRadius: 5,
        pointBackgroundColor: 'red'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Probabilities for Top 20 Patients'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Probability'
        },
        min: 0,
        max: 1
      },
      x: {
        title: {
          display: true,
          text: 'Patient Number'
        }
      }
    }
  }
});


const label = Array.from({ length: 20 }, (_, i) => `${i + 1}`);
const imagePaths = label.map(i => `liver_img/image${i}.jpg`);

// Pie Chart - Interactive
const pieCtx = document.getElementById('pieChart').getContext('2d');
let pieChart = new Chart(pieCtx, {
  type: 'pie',
  data: {
    labels: ['Benign', 'Malignant'],
    datasets: [{
      label: 'Probability',
      data: [0, 0],
      backgroundColor: ['green', 'red']
    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false
  }
});

document.getElementById('patientInput').addEventListener('input', function () {
  const val = parseInt(this.value);
  const imgEl = document.getElementById("patientImage");

  if (val >= 1 && val <= 20) {
    pieChart.data.datasets[0].data = [benignData[val - 1], malignantData[val - 1]];
    pieChart.update();

    imgEl.src = imagePaths[val - 1];
    imgEl.style.display = "block";
  } else {
    imgEl.style.display = "none";
    pieChart.data.datasets[0].data = [0, 0];
    pieChart.update();
  }
});


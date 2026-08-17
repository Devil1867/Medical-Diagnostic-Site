const benignData = [0.00, 0.08, 0.15, 0.30, 0.83, 0.01, 0.04, 0.00, 0.85, 0.00, 0.00, 0.00, 0.90, 0.00, 0.27, 0.00, 0.02, 0.01, 0.00, 0.70];
const malignantData = [1.00, 0.92, 0.85, 0.70, 0.18, 0.99, 0.96, 1.00, 0.15, 1.00, 1.00, 1.00, 0.09, 0.99, 0.72, 1.00, 0.98, 0.99, 1.00, 0.30];
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
const imagePaths = label.map(i => `lungs_img/image${i}-2.jpg`);


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

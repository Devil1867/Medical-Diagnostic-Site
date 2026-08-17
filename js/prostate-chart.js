const benignData = [0, 0.02, 0.02, 0.2, 0.01, 0.22, 0.01, 0.22, 0.13, 0.1, 0.33, 0.22, 0, 0.18, 0.07, 0.09, 0.6, 0.03, 0.02, 0.73];
const malignantData = [1, 0.98, 0.98, 0.8, 0.99, 0.78, 0.99, 0.78, 0.87, 0.9, 0.67, 0.78, 1, 0.82, 0.93, 0.91, 0.4, 0.97, 0.98, 0.27];
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
const imagePaths = label.map(i => `prostate_img/${i}output.jpg`);


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

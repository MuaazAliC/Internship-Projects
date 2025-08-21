const dashboard = document.getElementById("Dashboard");

Chart.defaults.devicePixelRatio = window.devicePixelRatio || 1;

const competitionCtx = document.getElementById('competitionChart').getContext('2d');
new Chart(competitionCtx, {
  type: 'bar',
  data: {
    labels: ['Marathon', 'Runner', 'Elite Run', 'Fast Runner', 'Champions', 'Run Town', 'Walkers'],
    datasets: [{
      label: 'Participants',
      data: [900, 400, 200, 300, 600, 500, 450],
      backgroundColor: '#00FF00',
      borderRadius: 10,
      barThickness: 23,
      borderDash: [5, 5],
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 6,
          font: { size: 12 }
        },
        grid: {
          color: '#5555553d',
          // borderDash: [100],
          lineWidth: 1.5,
          drawTicks: false
        }
      },
      x: {
        ticks: { font: { size: 9 } },
        grid: { display: false }
      }
    }
  }
});


const stepsCtx = document.getElementById('stepsChart').getContext('2d');


function createGradients(ctx) {
  const gradientBorder = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradientBorder.addColorStop(0, "rgba(0, 255, 0, 1)");
  gradientBorder.addColorStop(0.5, "rgba(0, 255, 0, 0.5)");
  gradientBorder.addColorStop(1, "rgba(0, 255, 0, 0)");

  const gradientFill = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradientFill.addColorStop(0, "rgba(54, 231, 63, 0.93)");
  gradientFill.addColorStop(1, "rgba(7, 245, 19, 0.18)");

  return { gradientBorder, gradientFill };
}

let { gradientBorder, gradientFill } = createGradients(stepsCtx);

let stepsChart = new Chart(stepsCtx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Steps',
      data: [3000, 7500, 12000, 10000, 15000, 8000, 17000],
      borderColor: gradientBorder,
      backgroundColor: gradientFill,
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { maxTicksLimit: 6, font: { size: 12 } },
        grid: { color: '#5555553b', borderDash: [15, 10], lineWidth: 1.5 }
      },
      x: {
        ticks: { font: { size: 12 } },
        grid: { display: false }
      }
    }
  }
});


window.addEventListener("resize", () => {
  const grads = createGradients(stepsCtx);
  stepsChart.data.datasets[0].borderColor = grads.gradientBorder;
  stepsChart.data.datasets[0].backgroundColor = grads.gradientFill;
  stepsChart.update();
});


function updateStepsChart(period) {
  const selected = document.getElementById("selectedPeriod");
 if (period === 'daily') {
    stepsChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    stepsChart.data.datasets[0].data = [1200, 1500, 1800, 2000, 1700, 1900, 2200];
    selected.innerHTML = `Daily 
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline; vertical-align:middle; margin-left:5px;">
        <path d="M2.89627 1.87562L2.49584 1.24932C2.1737 0.745738 1.50402 0.598684 0.99991 0.920299C0.676709 1.12766 0.500032 1.47678 0.500032 1.83436C0.500032 2.03431 0.555046 2.23638 0.670891 2.41729L1.07132 3.04359C2.32022 4.99549 3.90502 6.64589 5.78075 7.95033C6.52131 8.46449 7.47875 8.46449 8.21931 7.95033C10.095 6.64589 11.6798 4.99549 12.9287 3.04359L13.3292 2.41729C13.6524 1.91159 13.5043 1.24297 13.0002 0.920299C12.496 0.598685 11.8264 0.745739 11.5042 1.24932L11.1038 1.87562C10.0093 3.58526 8.62292 5.03041 7.01749 6.17087C5.37715 5.03041 3.99071 3.58526 2.89627 1.87562Z" fill="#009865"/>
      </svg>`;
}

  else if (period === 'weekly') {
    stepsChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    stepsChart.data.datasets[0].data = [12000, 15000, 17000, 14000];
    selected.innerHTML = `Weekly 
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline; vertical-align:middle; margin-left:5px;">
        <path d="M2.89627 1.87562L2.49584 1.24932C2.1737 0.745738 1.50402 0.598684 0.99991 0.920299C0.676709 1.12766 0.500032 1.47678 0.500032 1.83436C0.500032 2.03431 0.555046 2.23638 0.670891 2.41729L1.07132 3.04359C2.32022 4.99549 3.90502 6.64589 5.78075 7.95033C6.52131 8.46449 7.47875 8.46449 8.21931 7.95033C10.095 6.64589 11.6798 4.99549 12.9287 3.04359L13.3292 2.41729C13.6524 1.91159 13.5043 1.24297 13.0002 0.920299C12.496 0.598685 11.8264 0.745739 11.5042 1.24932L11.1038 1.87562C10.0093 3.58526 8.62292 5.03041 7.01749 6.17087C5.37715 5.03041 3.99071 3.58526 2.89627 1.87562Z" fill="#009865"/>
      </svg>`;
  } 
  else if (period === 'monthly') {
    stepsChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    stepsChart.data.datasets[0].data = [60000, 75000, 80000, 70000, 85000, 90000];
    selected.innerHTML = `Monthly
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline; vertical-align:middle; margin-left:5px;">
        <path d="M2.89627 1.87562L2.49584 1.24932C2.1737 0.745738 1.50402 0.598684 0.99991 0.920299C0.676709 1.12766 0.500032 1.47678 0.500032 1.83436C0.500032 2.03431 0.555046 2.23638 0.670891 2.41729L1.07132 3.04359C2.32022 4.99549 3.90502 6.64589 5.78075 7.95033C6.52131 8.46449 7.47875 8.46449 8.21931 7.95033C10.095 6.64589 11.6798 4.99549 12.9287 3.04359L13.3292 2.41729C13.6524 1.91159 13.5043 1.24297 13.0002 0.920299C12.496 0.598685 11.8264 0.745739 11.5042 1.24932L11.1038 1.87562C10.0093 3.58526 8.62292 5.03041 7.01749 6.17087C5.37715 5.03041 3.99071 3.58526 2.89627 1.87562Z" fill="#009865"/>
      </svg>`;
  } 
  else if (period === 'yearly') {
    stepsChart.data.labels = ['2021', '2022', '2023', '2024'];
    stepsChart.data.datasets[0].data = [720000, 850000, 900000, 950000];
   selected.innerHTML = `Yearly
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline; vertical-align:middle; margin-left:5px;">
        <path d="M2.89627 1.87562L2.49584 1.24932C2.1737 0.745738 1.50402 0.598684 0.99991 0.920299C0.676709 1.12766 0.500032 1.47678 0.500032 1.83436C0.500032 2.03431 0.555046 2.23638 0.670891 2.41729L1.07132 3.04359C2.32022 4.99549 3.90502 6.64589 5.78075 7.95033C6.52131 8.46449 7.47875 8.46449 8.21931 7.95033C10.095 6.64589 11.6798 4.99549 12.9287 3.04359L13.3292 2.41729C13.6524 1.91159 13.5043 1.24297 13.0002 0.920299C12.496 0.598685 11.8264 0.745739 11.5042 1.24932L11.1038 1.87562C10.0093 3.58526 8.62292 5.03041 7.01749 6.17087C5.37715 5.03041 3.99071 3.58526 2.89627 1.87562Z" fill="#009865"/>
      </svg>`;
  }

  stepsChart.update();
}

const items = document.querySelectorAll("#menu li");

   items.forEach(item => {
     item.addEventListener("click", () => {
     
       items.forEach(i => i.classList.remove("active"));
     
       item.classList.add("active");
     });
   });

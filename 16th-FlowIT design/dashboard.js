const dashboard = document.getElementById("Dashboard");


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
      barThickness: 23
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 6,
          font: { size: 10 }
        },
         grid: {
        color: '#5555553d',
        borderDash: [100], 
        lineWidth: 1.5,
        drawTicks: false
         }
      },
      x: {
        ticks: {
          font: { size: 9 }
        },
        grid: { 
          display: false
        }
      }
    }
  }
});


 const items = document.querySelectorAll("#menu li");

    items.forEach(item => {
      item.addEventListener("click", () => {
      
        items.forEach(i => i.classList.remove("active"));
      
        item.classList.add("active");
      });
    });

   const stepsCtx = document.getElementById('stepsChart').getContext('2d');


const gradientBorder = stepsCtx.createLinearGradient(0, 0, 0, stepsCtx.canvas.height);
gradientBorder.addColorStop(0, "rgba(0, 255, 0, 1)");     
gradientBorder.addColorStop(0.5, "rgba(0, 255, 0, 0.5)"); 
gradientBorder.addColorStop(1, "rgba(0, 255, 0, 0)");    

const gradientFill = stepsCtx.createLinearGradient(0, 0, 0, stepsCtx.canvas.height);
gradientFill.addColorStop(0, "rgba(54, 231, 63, 0.93)");  
gradientFill.addColorStop(1, "rgba(7, 245, 19, 0.18)");   

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
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { maxTicksLimit: 6, font: { size: 10 } },
        grid: { color: '#5555553b', borderDash: [15, 10], lineWidth: 1.5 }
      },
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false }
      }
    }
  }
});


// 🔥 Update chart based on dropdown selection
function updateStepsChart(period) {
  const selected = document.getElementById("selectedPeriod");
  
  if (period === 'daily') {
    stepsChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    stepsChart.data.datasets[0].data = [1200, 1500, 1800, 2000, 1700, 1900, 2200];
    selected.innerText = "Daily ▾";
  } 
  else if (period === 'weekly') {
    stepsChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    stepsChart.data.datasets[0].data = [12000, 15000, 17000, 14000];
    selected.innerText = "Weekly ▾";
  } 
  else if (period === 'monthly') {
    stepsChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    stepsChart.data.datasets[0].data = [60000, 75000, 80000, 70000, 85000, 90000];
    selected.innerText = "Monthly ▾";
  } 
  else if (period === 'yearly') {
    stepsChart.data.labels = ['2021', '2022', '2023', '2024'];
    stepsChart.data.datasets[0].data = [720000, 850000, 900000, 950000];
    selected.innerText = "Yearly ▾";
  }

  stepsChart.update();
}

let myChart;

document.getElementById("generateBtn").addEventListener("click", function () {
  const rowCount = parseInt(document.getElementById("rows").value);
  const container = document.getElementById("inputGrid");

  container.innerHTML = "";

  if (rowCount<0) {
    container.innerHTML = "<p style='color: red;'>Enter a valid number of rows.</p>";
    return;
  }

  const inputData = [];

  for (let i = 0; i < rowCount; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = `Name ${i + 1}`;

    const valueInput = document.createElement("input");
    valueInput.type = "number";
    valueInput.placeholder = `Value ${i + 1}`;

    nameInput.addEventListener("input", () => updateChart(inputData));
    valueInput.addEventListener("input", () => updateChart(inputData));

    rowDiv.appendChild(nameInput);
    rowDiv.appendChild(valueInput);
    container.appendChild(rowDiv);

    inputData.push({ nameInput, valueInput });
  }

  createChart(inputData);
});

function createChart(inputData) {
  const ctx = document.getElementById("myChart").getContext("2d");

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        label: "Values",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  updateChart(inputData);
}

function updateChart(inputData) {
  const labels = [];
  const values = [];
  const bgColors = [];
  const borderColors = [];

  inputData.forEach(({ nameInput, valueInput }) => {
    const name = nameInput.value.trim();
    const value = parseFloat(valueInput.value);

    if (name) {
      labels.push(name);
      values.push(isNaN(value) ? 0 : value);
      const color = getRandomColor();
      bgColors.push(color.replace("1)", "0.4)"));
      borderColors.push(color);
    }
  });

  myChart.data.labels = labels;
  myChart.data.datasets[0].data = values;
  myChart.data.datasets[0].backgroundColor = bgColors;
  myChart.data.datasets[0].borderColor = borderColors;

  myChart.update();
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 150);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 100);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

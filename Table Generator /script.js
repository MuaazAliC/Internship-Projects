document.getElementById("btn").addEventListener("click", function () {
  const row = parseInt(document.getElementById("num").value);
  const times = parseInt(document.getElementById("times").value);
  document.getElementById("remove").style.display = "block";
  const tableDiv = document.getElementsByClassName("table")[0];
  tableDiv.innerHTML = '';

  if (row < 100 && times < 100) {
    for (let i = 1; i <= times; i++) {
      tableDiv.innerHTML += row + " * " + i + " = " + (i * row) + "<br>";
    }
  } else if (!row || !times) {
    tableDiv.innerHTML = '<span style="color: red;">Please Enter the values to start the program</span>';
  } else {
    tableDiv.innerHTML = '<span style="color: red;">Number and Times must be less than 100.<br>Press Remove to restart the program</span>';
  }
});

document.getElementById("remove").addEventListener("click", function () {
  document.getElementsByClassName("table")[0].innerHTML = '';
  document.getElementById("remove").style.display = "none";
  document.getElementById("num").value = '';
  document.getElementById("times").value = '';
});


document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    document.getElementById("btn").click();
  } else if (event.key === "Backspace") {
    document.getElementById("remove").click();
    event.preventDefault(); 
  }
});


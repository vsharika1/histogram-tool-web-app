function init() {
  document
    .getElementById("choose_file")
    .addEventListener("change", handleFileSelect, false);

  implementValidation();
}

function handleFileSelect(event) {
  if (!event.target.files || event.target.files.length === 0) {
    console.log("No file selected.");
    return;
  }

  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
  var dataMap = createMap(event);

  histogramGenerator(dataMap);

  const personWithHighestPercentage = highestPercentage(dataMap);
  const highestSpan = document.getElementById("highest_percentage");
  highestSpan.textContent = personWithHighestPercentage;

  const personWithLowestPercentage = lowestPercentage(dataMap);
  const lowestSpan = document.getElementById("lowest_percentage");
  lowestSpan.textContent = personWithLowestPercentage;

  const mean = meanOfPercentages(dataMap);
  const meanSpan = document.getElementById("mean");
  meanSpan.textContent = mean;

  const median = medianOfPercentages(dataMap);
  const medianSpan = document.getElementById("median");
  medianSpan.textContent = median;
}

function histogramGenerator(dataMap) {
  const maxBound = parseFloat(document.getElementById("max_bound").value);
  const APlusBound = parseFloat(document.getElementById("A+_bound").value);
  const ABound = parseFloat(document.getElementById("A_bound").value);
  const AMinusBound = parseFloat(document.getElementById("A-_bound").value);
  const BPlusBound = parseFloat(document.getElementById("B+_bound").value);
  const BBound = parseFloat(document.getElementById("B_bound").value);
  const BMinusBound = parseFloat(document.getElementById("B-_bound").value);
  const CPlusBound = parseFloat(document.getElementById("C+_bound").value);
  const CBound = parseFloat(document.getElementById("C_bound").value);
  const CMinusBound = parseFloat(document.getElementById("C-_bound").value);
  const DBound = parseFloat(document.getElementById("D_bound").value);
  const FBound = parseFloat(document.getElementById("F_bound").value);

  const numOfPeopleWithGrade = {
    APlus: 0,
    A: 0,
    AMinus: 0,
    BPlus: 0,
    B: 0,
    BMinus: 0,
    CPlus: 0,
    C: 0,
    CMinus: 0,
    D: 0,
    F: 0,
  };

  dataMap.forEach((percentage) => {
    if (percentage >= APlusBound && percentage <= maxBound) {
      numOfPeopleWithGrade.APlus++;
    } else if (percentage >= ABound) {
      numOfPeopleWithGrade.A++;
    } else if (percentage >= AMinusBound) {
      numOfPeopleWithGrade.AMinus++;
    } else if (percentage >= BPlusBound) {
      numOfPeopleWithGrade.BPlus++;
    } else if (percentage >= BBound) {
      numOfPeopleWithGrade.B++;
    } else if (percentage >= BMinusBound) {
      numOfPeopleWithGrade.BMinus++;
    } else if (percentage >= CPlusBound) {
      numOfPeopleWithGrade.CPlus++;
    } else if (percentage >= CBound) {
      numOfPeopleWithGrade.C++;
    } else if (percentage >= CMinusBound) {
      numOfPeopleWithGrade.CMinus++;
    } else if (percentage >= DBound) {
      numOfPeopleWithGrade.D++;
    } else if (percentage >= FBound) {
      numOfPeopleWithGrade.F++;
    }
  });

  var divBlock = document.createElement("div");
  divBlock.style.backgroundColor = "#cc0633";
  divBlock.style.width = "30px";
  divBlock.style.height = "30px";

  insertDivBlock(
    document.getElementById("A+_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.APlus
  );
  insertDivBlock(
    document.getElementById("A_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.A
  );
  insertDivBlock(
    document.getElementById("A-_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.AMinus
  );
  insertDivBlock(
    document.getElementById("B+_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.BPlus
  );
  insertDivBlock(
    document.getElementById("B_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.B
  );
  insertDivBlock(
    document.getElementById("B-_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.BMinus
  );
  insertDivBlock(
    document.getElementById("C+_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.CPlus
  );
  insertDivBlock(
    document.getElementById("C_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.C
  );
  insertDivBlock(
    document.getElementById("C-_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.CMinus
  );
  insertDivBlock(
    document.getElementById("D_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.D
  );
  insertDivBlock(
    document.getElementById("F_histogram_container"),
    divBlock,
    numOfPeopleWithGrade.F
  );
}

function insertDivBlock(container, divBlock, num) {
  for (var i = 0; i < num; i++) {
    const divBlockClone = divBlock.cloneNode(true);
    container.appendChild(divBlockClone);
  }
}

function createMap(event) {
  const fileContent = event.target.result;
  const lines = fileContent.split("\r\n");

  const dataMap = new Map();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const [name, percentage] = line.split(",");
    dataMap.set(name, parseFloat(percentage));
  }

  return dataMap;
}

function highestPercentage(dataMap) {
  var maxPercentage = -1;
  var personWithHighestPercentage = "";

  dataMap.forEach((percentage, name) => {
    if (percentage > maxPercentage) {
      maxPercentage = percentage;
      personWithHighestPercentage = name;
    }
  });

  var highestData = personWithHighestPercentage + "(" + maxPercentage + "%)";

  return highestData;
}

function lowestPercentage(dataMap) {
  var minPercentage = Number.MAX_VALUE;
  var personWithLowestPercentage = "";

  dataMap.forEach((percentage, name) => {
    if (percentage < minPercentage) {
      minPercentage = percentage;
      personWithLowestPercentage = name;
    }
  });

  var lowestData = personWithLowestPercentage + "(" + minPercentage + "%)";

  return lowestData;
}

function meanOfPercentages(dataMap) {
  let totalPercentage = 0;
  let numOfPeople = 0;

  dataMap.forEach((percentage) => {
    totalPercentage += percentage;
    numOfPeople++;
  });

  const mean = (totalPercentage / numOfPeople).toFixed(2) + "%";

  return mean;
}

function medianOfPercentages(dataMap) {
  const percentages = Array.from(dataMap.values());

  percentages.sort((a, b) => a - b);

  const count = percentages.length;
  var median = 0;

  if (count % 2 === 0) {
    const middleIndex1 = count / 2 - 1;
    const middleIndex2 = count / 2;
    median = (percentages[middleIndex1] + percentages[middleIndex2]) / 2;
  } else {
    const middleIndex = Math.floor(count / 2);
    median = percentages[middleIndex];
  }

  return median + "%";
}

function validateBounds(upperBound, inputBound, lowerBound) {
  if (parseFloat(inputBound.value) >= parseFloat(upperBound.value)) {
    inputBound.value = parseFloat(upperBound.value) - 1;
  }

  if (parseFloat(inputBound.value) <= parseFloat(lowerBound.value)) {
    inputBound.value = parseFloat(lowerBound.value) + 1;
  }
}

function implementValidation() {
  const maxBoundInput = document.getElementById("max_bound");
  const aPlusBoundInput = document.getElementById("A+_bound");
  const aBoundInput = document.getElementById("A_bound");
  const aMinusBoundInput = document.getElementById("A-_bound");
  const bPlusBoundInput = document.getElementById("B+_bound");
  const bBoundInput = document.getElementById("B_bound");
  const bMinusBoundInput = document.getElementById("B-_bound");
  const cPlusBoundInput = document.getElementById("C+_bound");
  const cBoundInput = document.getElementById("C_bound");
  const cMinusBoundInput = document.getElementById("C-_bound");
  const dBoundInput = document.getElementById("D_bound");
  const fBoundInput = document.getElementById("F_bound");

  document.getElementById("max_bound").addEventListener("input", function () {
    const maxValue = 100;

    if (parseFloat(maxBoundInput.value) > maxValue) {
      maxBoundInput.value = maxValue;
    }

    if (parseFloat(maxBoundInput.value) <= parseFloat(aPlusBoundInput.value)) {
      maxBoundInput.value = parseFloat(aPlusBoundInput.value) + 1;
    }
  });

  document.getElementById("A+_bound").addEventListener("input", function () {
    validateBounds(maxBoundInput, aPlusBoundInput, aBoundInput);
  });

  document.getElementById("A_bound").addEventListener("input", function () {
    validateBounds(aPlusBoundInput, aBoundInput, aMinusBoundInput);
  });

  document.getElementById("A-_bound").addEventListener("input", function () {
    validateBounds(aBoundInput, aMinusBoundInput, bPlusBoundInput);
  });

  document.getElementById("B+_bound").addEventListener("input", function () {
    validateBounds(aMinusBoundInput, bPlusBoundInput, bBoundInput);
  });

  document.getElementById("B_bound").addEventListener("input", function () {
    validateBounds(bPlusBoundInput, bBoundInput, bMinusBoundInput);
  });

  document.getElementById("B-_bound").addEventListener("input", function () {
    validateBounds(bBoundInput, bMinusBoundInput, cPlusBoundInput);
  });

  document.getElementById("C+_bound").addEventListener("input", function () {
    validateBounds(bMinusBoundInput, cPlusBoundInput, cBoundInput);
  });

  document.getElementById("C_bound").addEventListener("input", function () {
    validateBounds(cPlusBoundInput, cBoundInput, cMinusBoundInput);
  });

  document.getElementById("C-_bound").addEventListener("input", function () {
    validateBounds(cBoundInput, cMinusBoundInput, dBoundInput);
  });

  document.getElementById("D_bound").addEventListener("input", function () {
    validateBounds(cMinusBoundInput, dBoundInput, fBoundInput);
  });

  document.getElementById("F_bound").addEventListener("input", function () {
    const minValue = 0;

    if (parseFloat(fBoundInput.value) >= parseFloat(dBoundInput.value)) {
      fBoundInput.value = parseFloat(dBoundInput.value) - 1;
    }

    if (parseFloat(fBoundInput.value) < minValue) {
      fBoundInput.value = minValue;
    }
  });
}

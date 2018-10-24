function chain(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
      array.push([]);
    }
    return array;
  }

  function midSquare(keyValue, size) {

    let r = String(keyValue).length,
      square = String(Math.pow(keyValue, 2));

    if (square.length <= 2) {
      return parseInt(square) % size;
    }

    let x = Math.floor(square.length / r) - 1,
      index = parseInt(square.substr(x, x + r - 1));

    return index % size;
  }

  function nextAddress(array, index, size) {
    let j = index;
    while (array[j]) {
      if (j == size - 1) {
        j = 0;
      } else {
        j++;
      }
    }
    return j;
  }
  function calculateCollisions(size, isKey) {

    let keyScale = size * 3,
      keyValue,
      index,
      chainArray = chain(size),
      chainCollisions = 0,
      chainLoad = [],
      openArray = [],
      openLoad = [],
      openCollisions = 0;

    for (let i = 0; i < size; i++) {

      keyValue = Math.floor(Math.random() * keyScale);
      index = isKey ? (keyValue % size) : midSquare(keyValue, size);

      if (chainArray[index].length > 0) chainCollisions++;
      chainArray[index].push(keyValue);

      if (openArray[index]) {
        openCollisions++;
        let j = nextAddress(openArray, index, size)
        openArray[j] = keyValue;
      } else {
        openArray[index] = keyValue;
      }

      chainLoad.push(chainCollisions);
      openLoad.push(openCollisions);
    }
    return {
      chainCollisions,
      chainLoad,
      openCollisions,
      openLoad
    }
  }




  function init(sizes) {
    let keyResults = [];
    let squareResults = [];
    for (let i = 0; i < sizes.length; i++) {
      keyResults.push(calculateCollisions(sizes[i], true));
      squareResults.push(calculateCollisions(sizes[i], false));
    }
    return {
      keyResults,
      squareResults
    }

  }

  const TABLE_SIZES = [100, 250, 500];
  const TRIALS = TABLE_SIZES.length;
  const HASHING_ANALYSIS = init(TABLE_SIZES);

  for (let i = 0; i < TRIALS; i++) {
    console.log("Trial #" + (i + 1) + " - Table Size = " + TABLE_SIZES[i] + ":");
    console.log("\nHash Function:\t Key Mod Table Size");
    console.log("Collision Resolution: Seperate Chaining:\t" + HASHING_ANALYSIS.keyResults[i].chainCollisions);
    console.log("Collision Resolution: Open Addressing:\t\t" + HASHING_ANALYSIS.keyResults[i].openCollisions);
    console.log("\nHash Function:\t Mid Square");
    console.log("Collision Resolution: Seperate Chaining:\t" + HASHING_ANALYSIS.squareResults[i].chainCollisions);
    console.log("Collision Resolution: Open Addressing:\t\t" + HASHING_ANALYSIS.squareResults[i].openCollisions);
    console.log("\n");
  }


  //make nice arrays for graphing
getGraphs();

function getGraphs() {
  var xVals = [];
  var plots = [[], [], [], []];
  var layouts = [];
  for (let i = 0; i < TRIALS; i++) {
    let l = TABLE_SIZES[i];
    let v = [];
    for (let j = 0; j < l; j++) {
      v.push((j + 1) / l);
    }
    ;
    xVals.push(v);
  }
  console.log(xVals);
  for (let i = 0; i < TRIALS; i++) {
    plots[0].push({
      x: xVals[i],
      y: HASHING_ANALYSIS.keyResults[i].chainLoad,
      mode: 'lines+markers',
      name: TABLE_SIZES[i]
    });
    layouts.push({
      title: 'Key Mod + Chaining',
      xaxis: {
        title: 'Load Factor'
      },
      yaxis: {
        title: '# of Collisions'
      }
    });
    plots[1].push({
      x: xVals[i],
      y: HASHING_ANALYSIS.keyResults[i].openLoad,
      mode: 'lines+markers',
      name: TABLE_SIZES[i]
    });
    layouts.push({
      title: 'Key Mod + Open Address',
      xaxis: {
        title: 'Load Factor'
      },
      yaxis: {
        title: '# of Collisions'
      }
    });
    plots[2].push({
      x: xVals[i],
      y: HASHING_ANALYSIS.squareResults[i].chainLoad,
      mode: 'lines+markers',
      name: TABLE_SIZES[i]
    });
    layouts.push({
      title: 'Mid Square + Chaining',
      xaxis: {
        title: 'Load Factor'
      },
      yaxis: {
        title: '# of Collisions'
      }
    });
    plots[3].push({
      x: xVals[i],
      y: HASHING_ANALYSIS.squareResults[i].openLoad,
      mode: 'lines+markers',
      name: TABLE_SIZES[i]
    });
    layouts.push({
      title: 'Mid Square + Open Address',
      xaxis: {
        title: 'Load Factor'
      },
      yaxis: {
        title: '# of Collisions'
      }
    });
  }
  Plotly.newPlot('myDiv1', plots[0], layouts[0]);
  Plotly.newPlot('myDiv2', plots[1], layouts[1]);
  Plotly.newPlot('myDiv3', plots[2], layouts[2]);
  Plotly.newPlot('myDiv4', plots[3], layouts[3]);
}


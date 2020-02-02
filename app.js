//Button idea: Create each button as an object, able to manipulate values and save to localstorage

const workoutController = (() => {
  //Create constructor for workout snapshot
  const Workout = function(pos, sets, reps, name, weight) {
    this.pos = pos;
    this.sets = sets;
    this.reps = reps;
    this.name = name;
    this.weight = weight;
  };

  //Create constructor for weight incrementing buttons
  const Increment = function(id, weight) {
    this.id = id;
    this.weight = weight;
  };

  //Create data structure to hold workout items -- For now only three shown at a time
  const data = {
    items: localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [],
    btns: []
  };

  Workout.prototype.updateWeight = function() {
    document
      .querySelector("#increase__amount--1--first")
      .addEventListener("click", event => {
        console.log(event);
      });
  };

  //Create a new workout item
  return {
    addNewWorkout: (id, set, rep, title, weight) => {
      let newItem, pos;
      //Create new workout object
      newItem = new Workout(id, set, rep, title, weight);
      //If no items contained in the data structure, set the position to 0
      if (data.items.length > 0) {
        pos = id;
      } else {
        pos = 0;
      }
      //Push item into data structure
      if (pos === 0) {
        data.items.push(newItem);
      } else if (pos === "first") {
        data.items.splice(0, 1, newItem);
      } else if (pos === "second") {
        data.items.splice(1, 1, newItem);
      } else {
        data.items.splice(2, 1, newItem);
      }

      localStorage.setItem("items", JSON.stringify(data.items));

      //Return new element
      return newItem;
    },

    addWeight: (id, set, rep, title, weight) => {
      let newWeight;

      newWeight = new Workout(id, set, rep, title, weight);

      if (id === "first") {
        data.items.splice(0, 1, newItem);
      } else if (pos === "second") {
        data.items.splice(1, 1, newItem);
      } else {
        data.items.splice(2, 1, newItem);
      }

      localStorage.setItem("items", JSON.stringify(data.items));

      return newWeight;
    },

    testing: () => {
      console.log(data);
    }
  };
})();

//USER INTERFACE CONTROLLER
const uiController = (() => {
  const DOMStrings = {
    workoutPosition: ".workout__position",
    workoutStartWeight: ".workout__weight",
    workoutName: ".workout__name",
    workoutInfoSave: ".workout__input--add",
    workoutSets: ".workout__sets",
    workoutReps: ".workout__reps",
    repsSetsID1: "#reps__sets--1",
    repsSetsID2: "#reps__sets--2",
    repsSetsID3: "#reps__sets--3",
    weight1: "#weight__amount--1",
    weight2: "#weight__amount--2",
    weight3: "#weight__amount--3",
    nameId1: "#workout__name--1",
    nameId2: "#workout__name--2",
    nameId3: "#workout__name--3",
    workoutContainer1: "#snapshot__container--1",
    workoutContainer2: "#snapshot__container--2",
    workoutContainer3: "#snapshot__container--3",
    incBtnContainer1: "#weight__increase--container--1",
    incBtn1: "#increase__amount--1--first",
    incBtn2: "#increase__amount--2--first",
    incBtn3: "#increase__amount--3--first",
    incBtn4: "#increase__amount--1--second",
    incBtn5: "#increase__amount--2--second",
    incBtn6: "#increase__amount--3--second",
    incBtn7: "#increase__amount--1--third",
    incBtn8: "#increase__amount--2--third",
    incBtn9: "#increase__amount--3--third"
  };

  return {
    //Get user input from input elements at top
    getInput: () => {
      return {
        pos: document.querySelector(DOMStrings.workoutPosition).value,
        sets: document.querySelector(DOMStrings.workoutSets).value,
        reps: document.querySelector(DOMStrings.workoutReps).value,
        name: document.querySelector(DOMStrings.workoutName).value,
        weight: document.querySelector(DOMStrings.workoutStartWeight).value
      };
    },

    addWorkout: (obj, pos) => {
      //Select text content of reps/sets, name, and weight and change to user input
      if (pos === "first") {
        //Change contents of first position workout snapshot
        document.querySelector(
          DOMStrings.repsSetsID1
        ).textContent = `${obj.sets} x ${obj.reps}`;
        document.querySelector(
          DOMStrings.weight1
        ).textContent = `${obj.weight} lbs`;
        document.querySelector(DOMStrings.nameId1).textContent = `${obj.name}`;
      } else if (pos === "second") {
        //Change contents of second position workout snapshot
        document.querySelector(
          DOMStrings.repsSetsID2
        ).textContent = `${obj.sets} x ${obj.reps}`;
        document.querySelector(
          DOMStrings.weight2
        ).textContent = `${obj.weight} lbs`;
        document.querySelector(DOMStrings.nameId2).textContent = `${obj.name}`;
      } else {
        //Change contents of third position workout snapshot
        document.querySelector(
          DOMStrings.repsSetsID3
        ).textContent = `${obj.sets} x ${obj.reps}`;
        document.querySelector(
          DOMStrings.weight3
        ).textContent = `${obj.weight} lbs`;
        document.querySelector(DOMStrings.nameId3).textContent = `${obj.name}`;
      }
    },

    addWeight: (obj, pos) => {},

    clearFields: () => {
      let fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMStrings.workoutReps +
          ", " +
          DOMStrings.workoutSets +
          ", " +
          DOMStrings.workoutStartWeight +
          ", " +
          DOMStrings.workoutName
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(curr => {
        curr.value = "";
      });

      fieldsArr[0].focus();
    },

    getDOMStrings: () => {
      //Return DOMStrings object to global scope
      return DOMStrings;
    }
  };
})();

//GLOBAL APP CONTROLLER
const appController = ((wkoutCtrl, uiCtrl) => {
  //Set up event listeners for entire page
  const setupEventListeners = () => {
    const DOM = uiCtrl.getDOMStrings();
    const btnSet1 = document.querySelectorAll(
      DOM.incBtn1 + ", " + DOM.incBtn2 + ", " + DOM.incBtn3
    );
    const btnSet2 = document.querySelectorAll(
      DOM.incBtn4 + ", " + DOM.incBtn5 + ", " + DOM.incBtn6
    );
    const btnSet3 = document.querySelectorAll(
      DOM.incBtn7 + ", " + DOM.incBtn8 + ", " + DOM.incBtn9
    );

    //EVENT LISTENER FOR 'SAVE' BUTTON
    document
      .querySelector(DOM.workoutInfoSave)
      .addEventListener("click", ctrlAddItem);

    //document.querySelector(DOM.incBtnFirst1).addEventListener('click', uiCtrl.addWeight(0, 5, ))

    document.addEventListener("keypress", event => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    //Event listener for hiding top inputs
    document
      .querySelector(".settings__toggle")
      .addEventListener("click", elem => {
        document.querySelector(".top").classList.toggle("hidden");
        document
          .querySelector(".settings__toggle")
          .classList.toggle("hidden__span");
      });

    btnSet1.forEach(btn => {
      btn.addEventListener("click", event => {
        ctrlAddWeight(0, event);
      });
    });

    btnSet2.forEach(btn => {
      btn.addEventListener("click", event => {
        ctrlAddWeight(1, event);
      });
    });

    btnSet3.forEach(btn => {
      btn.addEventListener("click", event => {
        ctrlAddWeight(2, event);
      });
    });
  };

  const ctrlAddWeight = (index, btn) => {
    let savedWeight, DOM, setWeight;

    DOM = uiCtrl.getDOMStrings();

    //Retrieve items from localstorage
    savedWeight = JSON.parse(localStorage.getItem("items"));

    setWeight = parseFloat(
      (savedWeight[index].weight =
        parseFloat(btn.target.value) + parseFloat(savedWeight[index].weight))
    );

    if (
      `#${btn.target.id}` === DOM.incBtn1 ||
      `#${btn.target.id}` === DOM.incBtn2 ||
      `#${btn.target.id}` === DOM.incBtn3
    ) {
      wkoutCtrl.addNewWorkout(
        savedWeight[index].pos,
        savedWeight[index].sets,
        savedWeight[index].reps,
        savedWeight[index].name,
        setWeight
      );

      document.querySelector(
        DOM.weight1
      ).textContent = `${savedWeight[index].weight} lbs`;
    } else if (
      `#${btn.target.id}` === DOM.incBtn4 ||
      `#${btn.target.id}` === DOM.incBtn5 ||
      `#${btn.target.id}` === DOM.incBtn6
    ) {
      wkoutCtrl.addNewWorkout(
        savedWeight[index].pos,
        savedWeight[index].sets,
        savedWeight[index].reps,
        savedWeight[index].name,
        setWeight
      );

      document.querySelector(
        DOM.weight2
      ).textContent = `${savedWeight[index].weight} lbs`;
    } else if (
      `#${btn.target.id}` === DOM.incBtn7 ||
      `#${btn.target.id}` === DOM.incBtn8 ||
      `#${btn.target.id}` === DOM.incBtn9
    ) {
      wkoutCtrl.addNewWorkout(
        savedWeight[index].pos,
        savedWeight[index].sets,
        savedWeight[index].reps,
        savedWeight[index].name,
        setWeight
      );

      document.querySelector(
        DOM.weight3
      ).textContent = `${savedWeight[index].weight} lbs`;
    }
  };

  const ctrlAddItem = () => {
    let input, newItem, saved;

    //Get input values from UI controller
    input = uiCtrl.getInput();
    //saved = uiCtrl.getSavedWorkout();

    if (
      input.name !== "" &&
      input.sets !== "" &&
      input.reps !== "" &&
      input.weight !== "" &&
      input.sets > 0 &&
      input.reps > 0 &&
      input.weight > 0
    ) {
      //Add item to workout controller
      newItem = wkoutCtrl.addNewWorkout(
        input.pos,
        input.sets,
        input.reps,
        input.name,
        input.weight
      );
      //Clear input fields
      uiCtrl.clearFields();

      //Add new item to UI
      uiCtrl.addWorkout(newItem, newItem.pos);
    }
  };
  //1. Collect user input from top section
  //2. Update UI with workout name, position, and reps/sets

  return {
    init: () => {
      console.log("App has started");
      const getSaved = JSON.parse(localStorage.getItem("items"));

      if (getSaved) {
        getSaved.forEach(item => {
          uiCtrl.addWorkout(
            {
              reps: item.reps,
              sets: item.sets,
              name: item.name,
              weight: item.weight
            },
            item.pos
          );
        });
      } else {
        uiCtrl.addWorkout(
          {
            reps: 0,
            sets: 0,
            name: "- - - -",
            weight: 0 + " lbs"
          },
          "first"
        );
        uiCtrl.addWorkout(
          {
            reps: 0,
            sets: 0,
            name: "- - - -",
            weight: 0 + " lbs"
          },
          "second"
        );
        uiCtrl.addWorkout(
          {
            reps: 0,
            sets: 0,
            name: "- - - -",
            weight: 0 + " lbs"
          },
          "third"
        );
      }

      setupEventListeners();
    }
  };
})(workoutController, uiController);

appController.init();

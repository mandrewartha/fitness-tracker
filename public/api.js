const API = {
  async getLastWorkout() {
    let res;
    try {
      //if it gets data it makes a fetch api/workouts
      res = await fetch("/api/workouts");
    } catch (err) {
      //if no data, error
      console.log(err)
    }
    //turning data into json
    const json = await res.json();
//returning only the last workout
    return json[json.length - 1];
  },

  async addExercise(data) {
    //adding the workout id to the browser url
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
//if we get data, we return json
    const json = await res.json();

    return json;
  },
  //creating an empty object
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    //returning the data
    const json = await res.json();

    return json;
  },
//fetching most recent 7
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};

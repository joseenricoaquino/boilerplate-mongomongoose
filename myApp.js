require("dotenv").config();
const mongoose = require("mongoose");
let validator = require('validator');

mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model("Person", PersonSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "playa", age: 24, favoriteFoods: ["lemon", "coke", "royal"]
  })

  person.save((err, data) => {
    if(err) return console.error(err)
    done(null, data)
  })
}

 const arrayOfPeople = [
    { name: "jake", age: 14, favoriteFoods: ["fries", "donut"]},
    { name: "nathalia", age: 22, favoriteFoods: ["hotdog", "burger"]}
  ];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err)
      done(null, people)
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, (err, personFound) => {
    if(err) return console.log(err)
      done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if(err) return console.log(err)
      done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return console.log(err)
      done(null, data)
  })

  pe
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err)

      person.favoriteFoods.push(foodToAdd);
      
    person.save((err, updatedPerson) => {
      if(err) return console.log(err)
        done(null, updatedPerson)
    })
  })
};

// findOneAndUpdate uses ( conditions , update , options , callback ) as arguments.
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err)
      done(null, updatedDoc)
  } )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if(err) return console.log(err)
      done(null, removedDoc)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err)
      done(null, response)
  })
};

const queryChain = function(done) {
  const foodToSearch = "burrito";
  
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: -1 })          // sort alphabetically
    .limit(2)                   // limit results to 2
    .select({ age: 0 })         // exclude the age field
    .exec(function(err, data) {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

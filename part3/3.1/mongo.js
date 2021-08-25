const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
} else if (process.argv.length == 6) {
  console.log('Please enclose name with quotes ""');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://rafxar:${password}@cluster0.euuqm.mongodb.net/discordBOT?retryWrites=true&w=majority`;
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);
if (name && number) {
  //if I use these the connection fails saying these are not supported
  //useFindAndModify: false,
  //useCreateIndex: true,
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      const person = new Person({
        name: name,
        number: number,
      });
      person.save().then((result) => {
        console.log(
          `added ${person.name} number ${person.number} to phonebook`
        );
        mongoose.connection.close();
      });
    });
} else {
  //If you don't do mongoose.connect.then() only adding a new person will work
  //and find will give you TypeError: cursor.toArray is not a function
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      Person.find({}).then((res) => {
        res.forEach((p) => {
          console.log(p);
        });
        mongoose.connection.close();
      });
    });
}

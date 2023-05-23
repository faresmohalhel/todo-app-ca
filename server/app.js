const express = require("express");
const fs = require("firebase-admin");

const serviceAccount = require("./todo-app-ca-fd5fb-4693438d2dfa.json");
const app = express();
app.use(express.json());

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const userRoute = require("./routes/user-route");

const docRef = db.collection("users").doc("farse.mohalhel@gmail.com");
app.post("/create", async (req, res) => {
  try {
    const response = await docRef.set({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
    });
    res.status(200).json(response, req.body.firstName);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.body.email);
    const doc = await userRef.get();
    if (doc.exists) {
      res.status(404).json({ message: "user exists" });
    } else {
      84;
      const docRef = db.collection("users").doc(req.body.email);
      const response = await docRef.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        token: "placeholder",
        todoList: JSON.stringify([]),
      });
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

app.post("/users/:id/task", async (req, res) => {
  const docRef = db.collection("users");
  const snapshot = await docRef.where("email", "==", req.params.id).get();
  snapshot.forEach(async (doc) => {
    let newTodoList = doc.data().todoList;

    newTodoList = JSON.parse(newTodoList);

    newTodoList.push({
      title: req.body.title,
      description: req.body.description,
      id: Math.random(),
      priority: req.body.priority,
      completed: req.body.completed,
    });

    const response = await docRef.doc(req.params.id).update({
      todoList: JSON.stringify(newTodoList),
    });
  });
  // console.log(snapshot);
});

app.get("/tasks/:id", async (req, res) => {
  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    if (doc.id === req.params.id) {
      console.log(doc.id, "=>", doc.data());
      res.status(200).json(doc.data());
    }
  });
});

app.post("/update/:UserId", async (req, res) => {
  try {
    const docRef = db.collection("users");
    const snapshot = await docRef.where("email", "==", req.params.UserId).get();

    snapshot.forEach(async (doc) => {
      let newTodoList = doc.data().todoList;

      newTodoList = JSON.parse(newTodoList);

      newTodoList.forEach((item, i) => {
        if ((item.id = req.body.id)) {
          return {
            title: req.body.title,
            description: req.body.description,
            id: Math.random(),
            priority: req.body.priority,
            completed: req.body.completed,
          };
        }
      });

      const response = await docRef.doc(req.params.UserId).update({
        todoList: JSON.stringify(newTodoList),
      });
    });
    // console.log(snapshot);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.use("/user", userRoute);

app.listen(8000, () => {
  console.log("server starting at port 8000");
});

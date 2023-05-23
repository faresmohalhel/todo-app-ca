const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

const serviceAccount = require("./todo-app-ca-fd5fb-4693438d2dfa.json");
const app = express();
app.use(express.json());
app.use(cors());

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

const userRoute = require("./Routes/User-route");

const docRef = db.collection("users").doc("farse.mohalhel@gmail.com");

app.use("/user", userRoute);

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

      const objIndex = newTodoList.findIndex((obj) => obj.id === req.body.id);
      newTodoList[objIndex].title = req.body.title;
      newTodoList[objIndex].description = req.body.description;
      newTodoList[objIndex].priority = req.body.priority;
      newTodoList[objIndex].completed = req.body.completed;

      const response = await docRef.doc(req.params.UserId).update({
        todoList: JSON.stringify(newTodoList),
      });
      res.status(201).json(response);
    });
    // console.log(snapshot);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.delete("/delete/:UserId", async (req, res) => {
  try {
    const docRef = db.collection("users");
    const snapshot = await docRef.where("email", "==", req.params.UserId).get();

    snapshot.forEach(async (doc) => {
      let newTodoList = doc.data().todoList;

      newTodoList = JSON.parse(newTodoList);

      const objIndex = newTodoList.findIndex((obj) => obj.id == req.body.id);
      // newTodoList[objIndex].title = req.body.title;
      // newTodoList[objIndex].description = req.body.description;
      // newTodoList[objIndex].priority = req.body.priority;
      // newTodoList[objIndex].completed = req.body.completed;

      if (objIndex > -1) {
        console.log(newTodoList, objIndex);
        newTodoList = newTodoList.filter((obj) => obj.id !== req.body.id);
        console.log(newTodoList);
        const response = await docRef.doc(req.params.UserId).update({
          todoList: JSON.stringify(newTodoList),
        });
        res.status(201).json(response);
      } else {
        res.status(404).json({ message: "couldnt find element" });
      }
    });
    // console.log(snapshot);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Authenticate user
  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      // Verify password
      admin
        .auth()
        .getUserByEmail(email)
        .then(() => {
          // Generate a JWT token
          const token = generateToken(userRecord.uid);

          console.log("Login successful. Token:", token);

          res.json({ token });
        })
        .catch((error) => {
          console.log("Error verifying password:", error);
          res.status(401).json({ error: "Invalid email or password" });
        });
    })
    .catch((error) => {
      console.log("Error getting user:", error);
      res.status(401).json({ error: "Invalid email or password" });
    });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, "12345", (err, decoded) => {
      if (err) {
        console.log("Error verifying token:", err);
        return res.sendStatus(403);
      }

      req.userId = decoded.userId;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

app.post("/signup", (req, res) => {
  console.log(req.body.email);
  const docRef = db.collection("users").doc(req.body.email);
  docRef.set({ email: req.body.email, password: req.body.password });
});

// Example protected route
app.get("/", verifyToken, (req, res) => {
  // Access user ID from the decoded token
  const userId = req.userId;

  console.log("Authenticated user ID:", userId);

  // Use the user ID to perform protected operations (e.g., fetching user data from Firestore)
  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        res.json(userData);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
      res.status(500).json({ error: "Failed to fetch user data" });
    });
});

// Helper function to generate JWT token
function generateToken(userId) {
  const payload = { userId };
  const secretKey = "12345";
  const expiresIn = "1h";

  return jwt.sign(payload, secretKey, { expiresIn });
}

app.listen(8000, () => {
  console.log("server starting at port 8000");
});
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json("hello from user route");
});

module.exports = router;
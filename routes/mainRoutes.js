const foodTableRouter = require("./routes/foodTable");
const authUser = require("../auth/basicAuth");

app.use(express.json());
app.use(setUser);
app.use("/foodtable", foodTableRouter);

app.post("/", authUser, (req, res) => {
  res.send("FoodTable Page");
});

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}

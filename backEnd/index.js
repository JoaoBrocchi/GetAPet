const Express = require("express")
const cors = require("cors")
const path  = require('node:path');
const userRouter  = require("./routes/userRoutes.js")
const petRouter = require("./routes/petRoutes.js")
// const petRouter  = require("./routes/petRoutes.js")



const app = Express()
app.use(Express.json())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  // Outros cabeçalhos CORS, se necessário
  next();
});
app.use(Express.static(path.join(__dirname, "public")))
app.use("/user", userRouter)
app.use("/pet", petRouter)

app.listen(8080,()=>{
    console.log("app ouvindo na Porta :", 8080)
})
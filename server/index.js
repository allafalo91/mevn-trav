import express from "express"
import cors from "cors"
import posts from "./routes/api/posts.js "
import bodyParser from "body-parser"

const app = express()



 app.use(express.json())
 app.use(cors())
 app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});

 app.use((req, res, next) => {
     console.log(req.originalUrl)
     next()
 })

 app.use('/api/posts', posts)

 const PORT = process.env.PORT || 5000

 app.listen(PORT, () => console.log(`Server started on ${PORT}`))
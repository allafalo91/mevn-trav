import express from "express"
import mongodb from "mongodb"

const router = express.Router()

router.get('/', async (req, res) => {
    const posts = await loadPostsCollections()
    res.send(await posts.find({}).toArray()) 
})
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollections()
    // const id = JSON.stringify(req.params.id);
    await posts.deleteOne({_id:  mongodb.ObjectID(req.params.id) })
    res.status(200).send();

})
router.post('/', async (req, res) => {
   const posts = await loadPostsCollections()
   await posts.insertOne({
       text: req.body.text,
       createdAt: new Date()
   })
   res.status(201).send();
})

const loadPostsCollections = async () => {
    const client = await mongodb.MongoClient.connect("mongodb+srv://rinat:rinat1@cluster0.8zgzc.mongodb.net/vue?retryWrites=true&w=majority", 
    {useNewUrlParser: true,useUnifiedTopology: true, useUnifiedTopology: true })
    
    return client.db("vue").collection("posts")
}

 export default router
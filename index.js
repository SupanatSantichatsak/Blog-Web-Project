import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let contents = ["It's a nice day, isn't it?","Let's learn some coding!"]; 

app.get("/",(req,res)=>{
    res.render("index.ejs",{content: contents});
})

app.post("/",(req,res)=>{
    const newPost = req.body.content;
    if(newPost && newPost.length > 0){
    contents.push(newPost);
    }

    const editPost = req.body.textEdit;
    if(editPost && editPost.length > 0){
        const updatePost = req.body.textEdit;
        const id = parseInt(req.body.id);
        contents[id] = updatePost;
    }
    res.redirect("/");
})

app.post("/edit",(req,res)=>{
    const index = parseInt(req.body.id);
    const textEdit = contents[index];
    res.render("post.ejs",{content:textEdit ,id:index});
})

app.post("/delete",(req,res)=>{
    const index = parseInt(req.body.id);
    contents.splice(index,1);
    res.redirect("/");
})

app.get("/about",(req,res)=>{
    res.render("about.ejs");
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
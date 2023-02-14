const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')


const items = [];
const workItems = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {

    let day = date.getDate();

    res.render("list", { listTitle: day, newListItems: items });
    res.send();
})

app.post("/", function (req, res) {

    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
    }

    
})

app.get('/work', function (req, res) {
    res.render("list", { listTitle: 'Work List', newListItems: workItems });
    res.send();
})

app.post('/work', function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(3000, function () {
    console.log('Server is running on port 3000');
});



[toc]

mongodb使用
====

## 启动
mongod --dbpath /Users/wikipeng/Documents/data/db

## bower使用
bower install bootstrap


## post表单
http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js

If you use Express (high-performance, high-class web development for Node.js), you can do this:

HTML:

<form method="post" action="/">
    <input type="text" name="user[name]">
    <input type="text" name="user[email]">
    <input type="submit" value="Submit">
</form>
JavaScript:

app.use(express.bodyParser());

app.post('/', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});
UPDATED on 1/June/2016:

Method above is deprecated use now:

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/", function (req, res) {
    console.log(req.body.user.name)
});

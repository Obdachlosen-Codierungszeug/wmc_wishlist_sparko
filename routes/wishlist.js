var express = require('express');
var router = express.Router();
var maxId = 0;
var children = [{ id: -1, name: "violet", age: 17, wishes: [{ id: 0, name: "Car", url: "https://www.amazon.de/-/en/1579-Nissan-Nismo-Plastic-Rubber/dp/B09TTN1N84/ref=sr_1_5?keywords=toy+car&qid=1703068195&sr=8-5", imageUrl: "https://m.media-amazon.com/images/I/51VITQDUkIL._AC_UL640_FMwebp_QL65_.jpg" }] }];
router.get('/', function (req, res, next) {
    res.sendFile('wishlist.html', { root: './public' });
});
router.get('/children', function (req, res, next) {
    res.send(children);
});
router.post('/children', function (req, res, nexxt) {
    var childData = JSON.parse(req.body.child);
    var id = maxId++;
    var name = childData.name;
    var age = childData.age;
    var wishes = childData.wishes;
    var child = { id: id, name: name, age: age, wishes: wishes };
    children.push(child);
    res.send(children);
});
module.exports = router;

let express = require('express');
let router = express.Router();


interface IWish {
    id: number,
    name: string,
    url: string,
    imageUrl: string,
}

interface IChild {
    id: number,
    name: string,
    age: number,
    wishes: IWish[],
}


let maxId: number = 0;
let children: IChild[] = [{id: -1, name: "violet", age: 17, wishes: [{id: 0, name: "Car", url: "https://www.amazon.de/-/en/1579-Nissan-Nismo-Plastic-Rubber/dp/B09TTN1N84/ref=sr_1_5?keywords=toy+car&qid=1703068195&sr=8-5", imageUrl: "https://m.media-amazon.com/images/I/51VITQDUkIL._AC_UL640_FMwebp_QL65_.jpg"}]}];

router.get('/', function(req, res, next) {
    res.sendFile('wishlist.html', {root: './public'});
});

router.get('/children', function(req, res, next) {
    res.send(children);
});

router.post('/children', function(req, res, nexxt) {
    let childData = JSON.parse(req.body.child)

    let id: number = maxId++;
    let name: string = childData.name;
    let age: number = childData.age;
    let wishes: IWish[] = childData.wishes;

    let child: IChild = {id, name, age, wishes};

    children.push(child);

    res.send(children);
});


module.exports = router;
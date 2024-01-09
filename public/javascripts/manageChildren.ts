let formular = document.getElementById("formular1");
let formular2 = document.getElementById("formular2");

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

formular.addEventListener("submit", async (event) => {
    event.preventDefault();

    let name = (<HTMLInputElement>document.getElementById("name")).value;
    let age = (<HTMLInputElement>document.getElementById("age")).value;

    let num: number = parseInt(age);
    let child: IChild = {id: -1, name, age: num, wishes: []};

    console.log(name, age);
    let data = new URLSearchParams();
    data.append("child", JSON.stringify(child));
    fetch("http://localhost:3000/wishlist/children", {
        method: "POST",
        body: data
    }).then();
});

formular2.addEventListener("submit", async (event) => {
    event.preventDefault();
    let id: number;
    await loadChildren().then(children => {
        let childName = (<HTMLInputElement>document.getElementById("selectedChild")).value;
        let child: IChild = children.find(child => child.name === childName);
        id = child.id;
    });

    let wishname = (<HTMLInputElement>document.getElementById("wishName")).value;
    let url = (<HTMLInputElement>document.getElementById("wishURL")).value;
    let imageUrl = (<HTMLInputElement>document.getElementById("imageURL")).value;

    let wish: IWish = {id: -1, name: wishname, url, imageUrl};


    let data = new URLSearchParams();
    data.append("wish", JSON.stringify(wish));
    fetch(`http://localhost:3000/wishlist/${id}/wishes`, {
        method: "POST",
        body: data
    }).then();
});

const loadChildren = async (): Promise<IChild[]> => {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3000/wishlist/children").then(response => {
            response.json().then(children => resolve(children));
        });
    });
}

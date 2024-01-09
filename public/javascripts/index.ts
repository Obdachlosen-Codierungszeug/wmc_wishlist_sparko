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


let children: IChild[] = [];


const loadChildren = async (): Promise<IChild[]> => {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3000/wishlist/children").then(response => {
            response.json().then(children => resolve(children));
        });
    });
}

const postChild = async (child: IChild): Promise<IChild[]> => {
    let data = new URLSearchParams();
    data.append("child", JSON.stringify(child));

    return new Promise((resolve, reject) => {
        fetch("http://localhost:3000/wishlist/children", {
            method: "POST",
            body: data
        }).then(response => {
            response.json().then(children => resolve(children));
        });
    });
}

const createWishesTable = (child: IChild) => {
    const header = document.getElementById("wishes-header");
    const tableBody = document.getElementById("wishes-table-body");

    header.innerHTML = `Wishes for ${child.name}`;
    tableBody.innerHTML = "";

    child.wishes.forEach(wish => {
        tableBody.innerHTML += `<tr><td>${wish.name}</td><td><a href="${wish.url}">Link</a></td><td><img src="${wish.imageUrl}" alt="${wish.imageUrl}"></td></tr>`
    });
}

const createChildrenTable = (children: IChild[]) => {
    const tableBody = document.getElementById("children-table-body");

    tableBody.innerHTML = "";

    children.forEach(child => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${child.name}</td><td>${child.age}</td>`;
        tr.onclick = () => createWishesTable(child);

        tableBody.appendChild(tr);
    });
};


window.onload = async () => {
    children = await loadChildren();

    createChildrenTable(children);
};
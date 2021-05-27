class Meme {
    id: number;
    name: string; //название мема
    image: string; //путь до изобр-я
}

let first = new Meme(),
    second = new Meme(),
    third = new Meme();

first.id = 1;
first.name = "Pepe";
first.image = "img/catalog/1.jpeg";

second.id = 2;
second.name = "Burning Girl";
second.image = "img/catalog/2.jpg";

third.id = 3;
third.name = "Let's think about it";
third.image = "img/catalog/3.jpeg";

const CATALOG = [
    //это объекты каталога, которые отображаются
    first,
    second,
    third,
];
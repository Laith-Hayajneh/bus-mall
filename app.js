'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let product = [];

function ProductImage(productName) {
    this.productName = productName.split('.')[0];
    this.source = 'images/' + productName;
    this.clicks = 0;
    this.views = 0;
    product.push(this);
}

let productImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg',];
for (let i = 0; i < productImage.length; i++) {
    new ProductImage(productImage[i])
};

function generateImage() {
    //0-1 >> 0-7
    return Math.floor(Math.random() * product.length);
};

let lImgEl = document.getElementById('leftImg');
let mImgEl = document.getElementById('middleImg');
let rImgEl = document.getElementById('rightImg');

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

function renderImg() {

    leftImageIndex = generateImage();
    middleImageIndex = generateImage();
    rightImageIndex = generateImage();
    while (leftImageIndex === middleImageIndex || leftImageIndex === rightImageIndex ) {
        leftImageIndex = generateImage();

    };
    while (middleImageIndex === rightImageIndex) {
        middleImageIndex = generateImage();

        
    }

    lImgEl.setAttribute('src', product[leftImageIndex].source);
    lImgEl.setAttribute('title', product[leftImageIndex].source);
    product[leftImageIndex].views++;

    mImgEl.setAttribute('src', product[middleImageIndex].source);
    mImgEl.setAttribute('title', product[middleImageIndex].source);
    product[middleImageIndex].views++;

    rImgEl.setAttribute('src', product[rightImageIndex].source);
    rImgEl.setAttribute('title', product[rightImageIndex].source);
    product[rightImageIndex].views++;
    attemptsEl.textContent = attempts;
}
renderImg();
console.log(product);

lImgEl.addEventListener('click', handelClicks);
mImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);
function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        if (event.target.id === 'leftImg') {
            product[leftImageIndex].clicks++;

        }
        else if (event.target.id === 'middleImg') {
            product[middleImageIndex].clicks++;

        }
        else if (event.target.id === 'rightImg') {
            product[rightImageIndex].clicks++;

        }
        renderImg();

    }
    else{
        let ulEl = document.getElementById('results');
        let liE1;
        for (let i = 0; i < product.length; i++) {
            liE1 =document.createElement('li');
            ulEl.appendChild(liE1);
            liE1.textContent = `${product[i].productName} has ${product[i].views} views and has ${product[i].clicks} clicks`
        }
        lImgEl.removeEventListener('click',handelClicks);
        mImgEl.removeEventListener('click',handelClicks);
        rImgEl.removeEventListener('click',handelClicks);

    }

}

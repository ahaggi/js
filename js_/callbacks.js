const loadImage = (uri, callBack) => {
    let image = new Image();

    image.onload = () => { callBack(null, image) }

    image.onerror = () => { callBack('Could not load image at' + uri) }

    image.src = uri;
}


let callBack = (err, image) => {
    if (err)
        console.log(err)
    else
        addImage(image)
};

let addImage = (image) => {
    let img = document.createElement('img');
    img.src = image.src;
    document.body.appendChild(img)
};

loadImage('./resoures/img1.jpg', callBack)
loadImage('./resoures/img2.jpg', callBack)
loadImage('./resoures/img3.jpg', callBack)
loadImage('./resoures/img.jpg', callBack)



const loadImagePromise = (uri) =>
     new Promise((resolv, reject) => {
        let image = new Image();

        image.onload = () => { resolv(image) }

        image.onerror = () => { rejuct('Could not load image at' + uri) }

        image.src = uri;
    })

const promises = [
    loadImagePromise('./resoures/img1.jpg'),
    loadImagePromise('./resoures/img2.jpg'),
    loadImagePromise('./resoures/img3.jpg'),
    loadImagePromise('./resoures/img2.jpg'),
    loadImagePromise('./resoures/img1.jpg')
];
// prm.then((image)=>{
//     addImage(image)
// })

//OBS dot then vil blir utført kun en gang, når alle images blir lastet opp..
//den vil ikke blir kjørt for hver poromise for seg, men blir kjørt en gang for alle promises. 
Promise.all(promises).then((images)=>{
        images.map((image)=> addImage(image))
    })
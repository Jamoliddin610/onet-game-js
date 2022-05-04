const pokemons = [{
        id: 1,
        img: "https://www.serebii.net/pokemongo/pokemon/001.png"
    },
    {
        id: 2,
        img: "https://www.serebii.net/pokemongo/pokemon/013.png"
    },
    {
        id: 3,
        img: "https://www.serebii.net/pokemongo/pokemon/002.png"
    },
    {
        id: 4,
        img: "https://www.serebii.net/pokemongo/pokemon/014.png"
    },
    {
        id: 5,
        img: "https://www.serebii.net/pokemongo/pokemon/004.png"
    },
    {
        id: 6,
        img: "https://www.serebii.net/pokemongo/pokemon/015.png"
    },
    {
        id: 7,
        img: "https://www.serebii.net/pokemongo/pokemon/005.png"
    },
    {
        id: 8,
        img: "https://www.serebii.net/pokemongo/pokemon/016.png"
    },
    {
        id: 9,
        img: "https://www.serebii.net/pokemongo/pokemon/006.png"
    },
    {
        id: 10,
        img: "https://www.serebii.net/pokemongo/pokemon/017.png"
    },
    {
        id: 11,
        img: "https://www.serebii.net/pokemongo/pokemon/007.png"
    },
    {
        id: 12,
        img: "https://www.serebii.net/pokemongo/pokemon/025.png"
    },
    {
        id: 13,
        img: "https://www.serebii.net/pokemongo/pokemon/008.png"
    },
    {
        id: 14,
        img: "https://www.serebii.net/pokemongo/pokemon/019.png"
    },
    {
        id: 15,
        img: "https://www.serebii.net/pokemongo/pokemon/009.png"
    },
]
let boxs = [];
let cord = [];
let imgs = [];
let imgs_length = 60;
for (let a = 1; a <= 8; a++) {
    for (let b = 1; b <= 12; b++) {
        let boxobj = {
            x: a,
            y: b,
        }
        cord.push(boxobj)
    }
}
for (let a = 2; a <= 7; a++) {
    for (let b = 2; b <= 11; b++) {
        let boxobj = {
            x: a,
            y: b,
        }
        boxs.push(boxobj)
    }
}
for (let i = 0; i < 4; i++) {
    pokemons.forEach((item) => {
        imgs.push(item.id)
    })
}
for (let i = 0; i < 100; i++) {
    let idx1 = Math.floor(Math.random() * imgs_length);
    let idx2 = Math.floor(Math.random() * imgs_length);
    let temp = imgs[idx1];
    imgs[idx1] = imgs[idx2];
    imgs[idx2] = temp;
}
imgs.forEach((item, i) => {
    boxs[i].i = item
})
let ul = document.querySelector('.game__list')
cord.forEach((item) => {
    let li = document.createElement('li')
    li.className = `game__items x_${item.x} y_${item.y}`
    ul.appendChild(li)
})
let elemnts = document.querySelectorAll(".game__items")
elemnts.forEach((item) => {
    boxs.forEach((elem) => {
        if (item.className.includes(`x_${elem.x}`) && item.className.includes(`y_${elem.y}`)) {
            let boxchik = document.createElement('div')
            boxchik.className = `game__box x_${elem.x} y_${elem.y}`
            boxchik.id = elem.i
            item.classList.add('busy')
            item.appendChild(boxchik)
        }

    })
})
let boxshik = document.querySelectorAll('.game__box')
boxshik.forEach((imgs) => {
    pokemons.forEach((ings) => {
        if (imgs.id == ings.id) {
            imgs.innerHTML = `<img src="${ings.img}" alt="img">`
        }
    })
})





boxshik.forEach((item) => {
    item.addEventListener("click", () => {
        clicked(item)
    })
})
let newArr = []
let firstIndex = 0
let secondIndex = 0
let count = 1

function clicked(item) {
    let cardinat = item.className.split(' ')
    let idiat = item.id
    cardinat.shift()
    cardinat.push(idiat)
    newArr.push(cardinat)
    if (count == 2) {
        firstIndex = newArr[0]
        secondIndex = newArr[1]
        if (firstIndex[0] == secondIndex[0] && firstIndex[1] == secondIndex[1]) {
            count = 0
        } else if (firstIndex[2] == secondIndex[2]) {
            finderX(firstIndex, secondIndex)
        }
        count = 0
        firstIndex = 0
        secondIndex = 0
    }
    if (newArr.length >= 2) {
        newArr = []
    }
    count++
}

function finderX(a, b) {
    let start = a[0].split('')
    let finish = a[1].split('')
    console.log(start,finish);
    maker(start, finish, b)
}

function maker(start, finish, b) {
    let starter = 0
    let finisher = 0
    let abs = finish[2].concat(finish[3])
    let abc = start[2].concat(start[3])
    if (finish.length == 4) {
        finisher = Number(abs)
    } else {
        for (let i = 0; i <= finish.length; i++) {
            if (!isNaN(finish[i])) {
                finisher = finish[i]
            }
        }
    }
    if (start.length == 4) {
        starter = Number(abc)
    } else {
        for (let i = 0; i <= start.length; i++) {
            if (!isNaN(start[i])) {
                starter = start[i]
            }
        }
    }
    remov(starter, finisher, b)
}

function remov(x, y, b) {
    elemnts.forEach((item) => {
        if (item.className.includes(`x_${x-1}`) && item.className.includes(`y_${y}`) ) {
            if (item.className.includes('busy')) {
                rem(item, b, x, y)
            } else {
                findrem(item, b)
            }
        }

        if (item.className.includes(`x_${x}`) && item.className.includes(`y_${y + 1}`) ) {
            if (item.className.includes('busy')) {
                rem(item, b, x, y)
            } else {
                findrem(item, b)

            }
        }
        if (item.className.includes(`x_${x + 2}`) && item.className.includes(`y_${y}`) ) {
            if (item.className.includes('busy')) {
                rem(item, b, x, y)
            } else {
                findrem(item, b)

            }

        }
        if (item.className.includes(`x_${x}`) && item.className.includes(`y_${y-1}`) ) {
            if (item.className.includes('busy')) {
                rem(item, b, x, y)
            } else {
                findrem(item, b)

            }

        }
    })
}

function rem(item, b, x, y) {
    if (item.firstChild.className.includes(b[0]) && item.firstChild.className.includes(b[1])) {
        item.classList.remove('busy')
        item.firstChild.style.display = `none`
        boxshik.forEach((elem) => {
            if (elem.className.includes(`x_${x}`) && elem.className.includes(`y_${y}`)) {
                elem.style.display = `none`
                elem.parentNode.classList.remove('busy')

            }
        })
    }
}

function findrem(item, b) {
    let cardinat = item.className.split(' ')
    cardinat.shift()
    console.log(item);
    item.style.background = 'red'

        finderX(cardinat,b)
}
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
let newArr = []
let firstIndex = 0
let secondIndex = 0
let thirdIndex = 0
let count = 1
boxshik.forEach((item) => {
    item.addEventListener("click", () => {
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
            } else if (firstIndex[0] == secondIndex[0] && firstIndex[2] == secondIndex[2]) {
                // removeBorder(firstIndex, secondIndex)
                removeX(firstIndex, secondIndex)

            } else if (firstIndex[1] == secondIndex[1] && firstIndex[2] == secondIndex[2]) {
                removeY(firstIndex, secondIndex)
                // removeBorderY(firstIndex, secondIndex)

            } else if (firstIndex[2] == secondIndex[2]) {
                remove(firstIndex, secondIndex)
            }


            count = 0
            firstIndex = 0
            secondIndex = 0
        }
        if (newArr.length >= 2) {
            newArr = []
        }
        count++
    })
})

function removeX(first, second) {
    boxshik.forEach((item) => {
        let start = first[1].split('')
        let finish = second[1].split('')
        let starter = 0
        let finisher = 0
        let strfnsh = []
        let abs = finish[2].concat(finish[3])
        for (let i = 0; i <= start.length; i++) {
            if (!isNaN(start[i])) {
                starter = start[i]
            }
        }
        if (finish.length == 4) {
            finisher = Number(abs)
        } else {
            for (let i = 0; i <= finish.length; i++) {
                if (!isNaN(finish[i])) {
                    finisher = finish[i]
                }
            }
        }
        for (let i = starter; i < finisher; i++) {
            strfnsh.push(i)
        }
        strfnsh.shift()
        if (strfnsh.length != 0) {
            strfnsh.forEach((elem) => {
                if (item.parentNode.className.includes(`y_${elem}`) && item.parentNode.className.includes(first[0])) {
                    if (!item.parentNode.className.includes('busy')) {
                        boxshik.forEach((el) => {
                            if (el.className.includes(first[0]) && el.className.includes(first[1])) {
                                el.parentNode.classList.remove('busy')
                                el.innerHTML = '<span  class="game-line" ></span >'
                                item.innerHTML = '<span  class="game-line" ></span >'

                            }
                            if (el.className.includes(second[0]) && el.className.includes(second[1])) {
                                el.parentNode.classList.remove('busy')
                                el.innerHTML = '<span  class="game-line" ></span >'
                                item.innerHTML = '<span  class="game-line" ></span >'



                            }
                        })
                    }
                }
            })
        } else {
            if (item.className.includes(first[0]) && item.className.includes(first[1])) {
                item.parentNode.classList.remove('busy')

                item.innerHTML = '<span  class="game-line" ></span >'

            }
            if (item.className.includes(second[0]) && item.className.includes(second[1])) {
                item.parentNode.classList.remove('busy')
                item.innerHTML = '<span  class="game-line" ></span >'


            }
        }
    })
}

function removeY(first, second) {
    boxshik.forEach((item) => {
        let start = first[0].split('')
        let finish = second[0].split('')
        let starter = 0
        let finisher = 0
        let strfnsh = []
        let abs = finish[2].concat(finish[3])
        for (let i = 0; i <= start.length; i++) {
            if (!isNaN(start[i])) {
                starter = start[i]
            }
        }
        for (let i = 0; i <= finish.length; i++) {
            if (!isNaN(finish[i])) {
                finisher = finish[i]
            }
        }
        for (let i = starter; i < finisher; i++) {
            strfnsh.push(i)
        }
        strfnsh.shift()
        if (strfnsh.length != 0) {
            strfnsh.forEach((elem) => {
                if (item.parentNode.className.includes(`y_${elem}`) && item.parentNode.className.includes(first[0])) {
                    if (!item.parentNode.className.includes('busy')) {
                        boxshik.forEach((el) => {
                            if (el.className.includes(first[0]) && el.className.includes(first[1])) {
                                el.innerHTML = '<span  class="game-line-y" ></span >'
                                item.innerHTML = '<span  class="game-line-y" ></span >'

                            }
                            if (el.className.includes(second[0]) && el.className.includes(second[1])) {
                                el.innerHTML = '<span  class="game-line-y" ></span >'
                                item.innerHTML = '<span  class="game-line-y" ></span >'


                            }
                        })
                    }
                }
            })
        } else {
            if (item.className.includes(first[0]) && item.className.includes(first[1])) {
                item.parentNode.classList.remove('busy')
                item.innerHTML = '<span  class="game-line-y" ></span >'

            }
            if (item.className.includes(second[0]) && item.className.includes(second[1])) {
                item.parentNode.classList.remove('busy')
                item.innerHTML = '<span  class="game-line-y"></span >'


            }
        }
    })
}


function remove(a, b) {
    elemnts.forEach((items) => {
        let karobka = ''
        let kbk = ''

        if (items.className.includes(a[0]) && items.className.includes(b[1])) {
            karobka = items.className
            kbk = karobka.split(' ')
        }
        let start = kbk[1]
        let finish = kbk[2]
        let starter = 0
        let finisher = 0

        if (start != undefined) {
            start.split(''),
                finish.split('')
            let abs = finish[2].concat(finish[3])

            for (let i = 0; i <= start.length; i++) {
                if (!isNaN(start[i])) {
                    starter = start[i]
                }
            }
            if (finish.length == 4) {
                finisher = Number(abs)
            } else {
                for (let i = 0; i <= finish.length; i++) {
                    if (!isNaN(finish[i])) {
                        finisher = finish[i]
                    }
                }
            }
            console.log(starter,finisher);
        }
        elemnts.forEach((el)=>{
            let anb = a[1].split('')
            let ana = b[1].split('')
            let anber = 0
            let bnber = 0
            let abrer = anb[2].concat(anb[3])
            let barer = ana[2].concat(ana[3])
            for (let i = 0; i <= anb.length; i++) {
                if (!isNaN(anb[i])) {
                    anber = anb[i]
                }
            }
            if (anb.length == 4) {
                anber = Number(abrer)
            } else {
                for (let i = 0; i <= anb.length; i++) {
                    if (!isNaN(anb[i])) {
                        anber = anb[i]
                    }
                }
            }
            for (let i = 0; i <= ana.length; i++) {
                if (!isNaN(ana[i])) {
                    bnber = ana[i]
                }
            }
            if (ana.length == 4) {
                bnber = Number(barer)
            } else {
                for (let i = 0; i <= ana.length; i++) {
                    if (!isNaN(ana[i])) {
                        bnber = ana[i]
                    }
                }
            }
            let nk = Number(anber)+1
            let bk = Number(bnber)+1
            console.log(bk);
            if (el.className.includes(a[0])) {
                console.log('ok');
                for (let i = nk; i <= finisher; i++) {
                    if (el.className.includes(`y_${i}`) && !el.className.includes('busy')  ){
                        boxshik.forEach((elem) => {
                            if (elem.className.includes(a[0]) && elem.className.includes(a[1])) {
                                elem.innerHTML = '<span  class="game-line-y" ></span >'
                                el.innerHTML = '<span  class="game-line" ></span >'

                            }
                            if (elem.className.includes(b[0]) && elem.className.includes(b[1])) {
                                elem.innerHTML = '<span  class="game-line-y" ></span >'
                                el.innerHTML = '<span  class="game-line" ></span >'


                            }
                        })
                    }
                }
            } else if(el.className.includes(a[1])){
                console.log('mttt');
                for (let i = bk; i <= bnber; i++) {
                    console.log(i + '       salom');
                    if (el.className.includes(`y_${i}`) && !el.className.includes('busy')) {
                        boxshik.forEach((elem) => {
                            if (elem.className.includes(a[0]) && elem.className.includes(a[1])) {
                                elem.innerHTML = '<span  class="game-line-y" ></span >'
                                el.innerHTML = '<span  class="game-line" ></span >'

                            }
                            if (elem.className.includes(b[0]) && elem.className.includes(b[1])) {
                                elem.innerHTML = '<span  class="game-line-y" ></span >'
                                el.innerHTML = '<span  class="game-line" ></span >'


                            }
                        })
                    }
                }
            }

        })
    })
}
function removeBorder(first,second) {
    boxshik.forEach((item)=>{
        let startX = first[0].split('')
        let num = Number(startX[2])-1
        let nub = Number(startX[2])+1
        let start = first[1].split('')
        let finish = second[1].split('')
        let starter = 0
        let finisher = 0
        let strfnsh = []
        let abs = finish[2].concat(finish[3])
        for (let i = 0; i <= start.length; i++) {
            if (!isNaN(start[i])) {
                starter = start[i]
            }
        }
        if (finish.length == 4) {
            finisher = Number(abs)
        } else {
            for (let i = 0; i <= finish.length; i++) {
                if (!isNaN(finish[i])) {
                    finisher = finish[i]
                }
            }
        }
        for (let i = starter; i <= finisher; i++) {
            strfnsh.push(i)
        }

        if (item.className.includes(first[0]) && item.className.includes(first[1])) {
            console.log(item);
            elemnts.forEach((elem)=>{
                strfnsh.forEach((el)=>{
                    if (elem.className.includes(`x_${num}`)) {
                        if (elem.className.includes(`y_${el}`)) {
                            if (!elem.className.includes('busy')) {
                                boxshik.forEach((el) => {
                                    if (el.className.includes(first[0]) && el.className.includes(first[1])) {
                                        el.parentNode.classList.remove('busy')
                                        el.innerHTML = '<span  class="game-line-y" ></span >'
                                        elem.innerHTML = '<span  class="game-line" ></span >'

                                    }
                                    if (el.className.includes(second[0]) && el.className.includes(second[1])) {
                                        el.parentNode.classList.remove('busy')
                                        el.innerHTML = '<span  class="game-line-y" ></span >'
                                        elem.innerHTML = '<span  class="game-line" ></span >'
                                    }
                                })
                            }
                        }
                    } else if (elem.className.includes(`x_${nub}`)) {
                        if (elem.className.includes(`y_${el}`)) {
                            if (!elem.className.includes('busy')) {
                                boxshik.forEach((el) => {
                                    if (el.className.includes(first[0]) && el.className.includes(first[1])) {
                                        el.parentNode.classList.remove('busy')
                                        el.innerHTML = '<span  class="game-line-y" ></span >'
                                        elem.innerHTML = '<span  class="game-line" ></span >'

                                    }
                                    if (el.className.includes(second[0]) && el.className.includes(second[1])) {
                                        el.parentNode.classList.remove('busy')
                                        el.innerHTML = '<span  class="game-line-y" ></span >'
                                        elem.innerHTML = '<span  class="game-line" ></span >'
                                    }
                                })
                            }
                        }
                    }
                })
            })
        }else{
            removeX(first,second)
        }
    }) 
}
// function removeBorderY(first, second) {
//     boxshik.forEach((item) => {
//         let startX = first[0].split('')
//         let num = Number(startX[1]) - 1
//         let nub = Number(startX[1]) + 1
//         let start = first[0].split('')
//         let finish = second[0].split('')
//         let starter = 0
//         let finisher = 0
//         let strfnsh = []
//         let abs = finish[2].concat(finish[3])
//         for (let i = 0; i <= start.length; i++) {
//             if (!isNaN(start[i])) {
//                 starter = start[i]
//             }
//         }
//         if (finish.length == 4) {
//             finisher = Number(abs)
//         } else {
//             for (let i = 0; i <= finish.length; i++) {
//                 if (!isNaN(finish[i])) {
//                     finisher = finish[i]
//                 }
//             }
//         }
//         for (let i = starter; i <= finisher; i++) {
//             strfnsh.push(i)
//         }

//         if (item.className.includes(first[0]) && item.className.includes(first[1])) {
//             console.log(item);
//             elemnts.forEach((elem) => {
//                 strfnsh.forEach((el) => {
//                     if (elem.className.includes(`x_${num}`)) {
//                         if (elem.className.includes(`y_${el}`)) {
//                             if (!elem.className.includes('busy')) {
//                                 boxshik.forEach((el) => {
//                                     if (el.className.includes(first[0]) && el.className.includes(first[1])) {
//                                         el.parentNode.classList.remove('busy')
//                                         el.innerHTML = '<span  class="game-line" ></span >'
//                                         elem.innerHTML = '<span  class="game-line-y" ></span >'

//                                     }
//                                     if (el.className.includes(second[0]) && el.className.includes(second[1])) {
//                                         el.parentNode.classList.remove('busy')
//                                         el.innerHTML = '<span  class="game-line" ></span >'
//                                         elem.innerHTML = '<span  class="game-line-y" ></span >'
//                                     }
//                                 })
//                             }
//                         }
//                     } else if (elem.className.includes(`x_${nub}`)) {
//                         if (elem.className.includes(`y_${el}`)) {
//                             if (!elem.className.includes('busy')) {
//                                 boxshik.forEach((el) => {
//                                     if (el.className.includes(first[0]) && el.className.includes(first[1])) {
//                                         el.parentNode.classList.remove('busy')
//                                         el.innerHTML = '<span  class="game-line" ></span >'
//                                         elem.innerHTML = '<span  class="game-line-y" ></span >'

//                                     }
//                                     if (el.className.includes(second[0]) && el.className.includes(second[1])) {
//                                         el.parentNode.classList.remove('busy')
//                                         el.innerHTML = '<span  class="game-line" ></span >'
//                                         elem.innerHTML = '<span  class="game-line-y" ></span >'
//                                     }
//                                 })
//                             }
//                         }
//                     }
//                 })
//             })
//         }
//     })
// }
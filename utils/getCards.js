const pokemon = require('pokemontcgsdk');

async function getCards(set) {

    let commons = await getCommons(set)
    // console.log(commons)
    let uncommons = await getUncommons(set)
    // console.log(uncommons)
    let rare = await getRare(set)
    // console.log(rare)

    let cards = {
        commons: commons,
        uncommons: uncommons,
        rare: rare
    }

    return cards;
}

async function getCommons(set) {
    let cards = []
    let chosen = []
    let i = 0
    await pokemon.card.where({ q: `set.id:${set} rarity:common` })
        .then(result => {
            cards = result.data
        }).catch(error => {
            console.error(error.message)
            return
        })
    while (i < 6) {
        let obj_keys = Object.keys(cards)
        let random_key = obj_keys[Math.floor(Math.random() * obj_keys.length)]
        chosen.push(cards[random_key])
        delete cards[random_key]
        i++
    }
    return chosen
}

async function getUncommons(set) {
    let cards = []
    let chosen = []
    let i = 0
    await pokemon.card.where({ q: `set.id:${set} rarity:uncommon` })
        .then(result => {
            // console.log(result)
            cards = result.data
        }).catch(error => {
            console.error(error.message)
            return
        })
    while (i < 3) {
        let obj_keys = Object.keys(cards)
        let random_key = obj_keys[Math.floor(Math.random() * obj_keys.length)]
        chosen.push(cards[random_key])
        delete cards[random_key]
        i++
    }
    return chosen
}

async function getRare(set) {
    let cards = []
    let chosen = []
    await pokemon.card.where({ q: `set.id:${set} rarity:rare` })
        .then(result => {
            // console.log(result)
            cards = result.data
        }).catch(error => {
            console.error(error.message)
            return
        })
    let obj_keys = Object.keys(cards)
    let random_key = obj_keys[Math.floor(Math.random() * obj_keys.length)]
    chosen.push(cards[random_key])

    return chosen
}

module.exports = {
    getCards
}
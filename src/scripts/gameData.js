const uuidv4 = require('uuid/v4')


const getCurrencyNumber = (number) => {
    if (number === -1) return
    if (typeof number == "string"){
        const letter = number.slice(-1)
        const amount = parseInt(number.slice(0, -1), 10)
        if (letter === 'K'){ return amount * 1000 }
        if (letter === 'M'){ return amount * 1000000 }
        if (letter === 'B'){ return amount * 1000000000 }
        if (letter === 'T'){ return amount * 1000000000000 }
        if (letter === 'Q'){ return amount * 1000000000000000 }
    } else {
        return number
    }
}

// money should have a VALUE limit
const gameData = {
    minions: {},
    estate: {},
    upgrades: {},
    achievements: {},
    playerResources: {},
    getGameAsset(gameAsset){
        if (this.hasOwnProperty(gameAsset)){
            return this[gameAsset]
        } else {
            return null
        }
    },
    getMinionData(name){
        return this.minions[name]
    },
    getBuyable(...gameAssets){ 
        //returns an array of objects: minions, resources, etc with createsBuyButton enabled
        const buyableArray = []
        if (!Array.isArray(gameAssets) || !gameAssets.length) {
            console.log("TODO: return every custom asset when no parameter is given")
        }
        gameAssets.forEach((asset) => {
            //asset = 'minions'
            if (gameData.hasOwnProperty(asset)){
                for (let assetElementName in gameData[asset]){
                    const assetElement = gameData[asset][assetElementName]
                    if (assetElement.isBuyable) buyableArray.push(assetElement)
                }
            } else {
                console.log("WARNING: getBuyable() Asset does not exist!")
            }
        });
        return buyableArray
    },
    addMinion(name, displayName = undefined,
              costObject,
              effectObject,
              defaultAmount = 0,
              isBuyable = true,
              unlocked = false,
              startsUnlocked = true){
        if (displayName === undefined || displayName === "" ) {
            displayName = name.charAt(0).toUpperCase() + name.slice(1)
        } 
        const isNewMinion = name in this ? false : true

        this.minions[name] = {
            id : uuidv4(),
            displayName : displayName,
            amount      : defaultAmount,
            isBuyable   : isBuyable,
            cost        : costObject,
            effect      : effectObject,
            unlocked    : unlocked
        }
        return isNewMinion
    },
    addUpgrade(name, displayName = undefined,
               cost = 0, type = null, value = null, hidden = false){
        if (displayName === undefined || displayName === "" ) {
            displayName = pascalToWords(name)
        } 
        this.upgrades[name] = {
            id : uuidv4(),
            displayName : displayName,
            cost   : cost,
            type   : type, 
            value  : value,
            hidden : hidden
        }
    },
    addPlayerResource(name = "newResource",
                      isMinion = false,
                      defaultMax = 10,
                      showMax = true,
                      hidden = false,
                      iconName = undefined,
                      defaultAmount = 0,
                      ){
        const isNewResource = name in this ? false : true
        if (iconName === undefined || iconName === "" ) {
            iconName = name
        }
        
        this.playerResources[name] = {
            id : uuidv4(),
            iconName        : iconName,
            displayName     : name.charAt(0).toUpperCase() + name.slice(1),
            amount          : defaultAmount,
            defaultAmount   : defaultAmount,
            max             : defaultMax,
            defaultMax      : defaultMax,
            showMax         : showMax,
            hidden          : hidden,
            isMinion        : isMinion,
            increasePerTick : 0
        }
        return isNewResource
    },
    addEstate(name = "newEstate",
              cost,
              currencyLimit = -1,
              iconName = undefined,
              active = false
              ){
        const isNewResource = name in this ? false : true
        if (iconName === undefined || iconName === "" ) {
            iconName = name
        }

        const currencyAmount = getCurrencyNumber(currencyLimit)
        const costAmount = getCurrencyNumber(cost)
        this.estate[name] = {
            id          : uuidv4(),
            iconName : iconName,
            active      : active,
            displayName : name.charAt(0).toUpperCase() + name.slice(1),
            cost        : costAmount,
            limit       : currencyAmount
        }
        return isNewResource
    }
}
/*
Imp: base cost 5 energy, multiplier 1.1, per tick, +0.1energy
upgrades:
    sharp claws  : more dark energy per tick
    mob mentality: every X imps, each imp gets a little more dark energy
    employee of the month: every X ticks, an imp evolves into a devil

Lawyers: base cost 100 currency, drains x per tick, adds y-z per day (12am)
    pro bono : drains less per tick
    jurisprudence  : increases the minimum gained (y)
    gerrymandering : increases maximum gain (z)
    sentencing     : lawyers now produce pain
    faustian pact  : devils are cheaper

Skeleton base cost 500 energy, they pillage
    Gallons of Milk: Skeletons pillage more
    Top hat : skeletons produce pain

Succubus/incubus: base cost 50 pain 50 dark energy, produces money
    sadism : succubus now produce pain
    s u c c: chance of producing soul

Devil costs pain and dark energy, produces dark energy and souls
    Pitchforks : now produce pain
    Whip : Imps are improved per devil

Nightmares base cost 10k dark energy, produces 10 during the night/0 day
    nightmares are only effective during night
    sleep paralysis : every x tick, chance of summoning a succubus/incubus
    Umbral Barding: nightmares work during the day (half capacity)

Necromancer costs 1mil currency, produces skeletons
    famine : produces skeletons faster
    Dark Barracks:  devils, skeletons and imps are slightly better

Lich costs 10mil currency, 1mil souls, produces Dark Energy
    Summoning Circle  : Raise Imp
    Summoning Square  : Raise Succubus
    Summoning Lemniscate: Raise Nightmares 

*/



const camelToWords = string => {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}
const pascalToWords = string => {
    const camel = camelToWords(string)
    return camel.charAt(0).toUpperCase() + camel.slice(1)
}

const create = {
    minion : (options) => {
        if (!options.hasOwnProperty('displayName')) { options.displayName = camelToWords(options.name) }
        if (!options.hasOwnProperty('defaultMax')) { options.defaultMax = 10 }
        if (!options.hasOwnProperty('upgradeSuffix')) { options.upgradeSuffix = "Rune" }
        gameData.addPlayerResource(options.name, true, options.defaultMax, true, true, options.name)
        gameData.addMinion(options.name, options.displayName, options.minionCost, options.effectObject, 0, true, false, false)
        gameData.addUpgrade(options.name, pascalToWords(options.displayName + options.upgradeSuffix), options.upgradeCost, 'minion', options.name)
    }
}

//initializing player resources
gameData.addPlayerResource('energy', false, 10000000000)
gameData.addPlayerResource('currency')

//gameData.addUpgrade('houseSize', 'The Big House :)', 10, 'estate', {currency: 50, energy: 50})

gameData.addUpgrade('sharpClaws', undefined, 5, 'buff', {
    imp: { effectObject : { energy : 0.2 }}}, true)

gameData.addUpgrade('gallonsOfMilk', undefined, 105, 'buff', {
    skeleton: { effectObject : { currency : 2 }}}, true)

create.minion({
    name : 'imp',
    minionCost  : {energy : 5},
    upgradeCost : 5,
    effectObject: {energy : 0.1},
    description: "wenk"
})

create.minion({
    name : 'lawyer',
    upgradeSuffix: "Contract",
    minionCost  : {energy : 5},
    upgradeCost : 105,
    effectObject: {energy : 0.1},
    description: "wenk"
})

create.minion({
    name : 'skeleton',
    minionCost  : {energy : 5},
    upgradeCost : 2,
    effectObject: {energy : 100000, currency : 100000},
    description: "wenk"
})

create.minion({
    name : 'succubus',
    minionCost  : {energy : 5},
    upgradeCost : 250999,
    effectObject: {energy : 0.1},
    description: "wenk"
})

create.minion({
    name : 'devil',
    minionCost  : {energy : 5},
    upgradeCost : 10000,
    effectObject: {energy : 0.1, currency: 5},
    description: "wenk"
})

gameData.addEstate('shack', 0, 10, undefined, true)
gameData.addEstate('house', 10, 200)
gameData.addEstate('twinHouse', 200, '5K')
gameData.addEstate('manor', 3500, '25K')
gameData.addEstate('mansion', '20K', '100K')
gameData.addEstate('castle', '85K', '250K')
gameData.addEstate('castleTown', '200K', '1M')
gameData.addEstate('kingdom', '850K', '30M')
gameData.addEstate('conurbation', '25M', '150M')
gameData.addEstate('empire', '120M', '500M')
gameData.addEstate('superstate', '450M', '1B')
gameData.addEstate('worldFederation', '750M', '3B')
gameData.addEstate('planetarySystem', '2B', '10B')
gameData.addEstate('starSystem', '9B', '30B')
gameData.addEstate('galacticArm', '25B', '200B')
gameData.addEstate('galaxy', '175B', '1T')
gameData.addEstate('localGroup', '850B', '10T')
gameData.addEstate('superCluster', '9T', '50T')
gameData.addEstate('observableUniverse', '45T', '300T')
gameData.addEstate('universe', '250T', '1Q')

export default gameData;

import jsxicon from './jsxicon.jsx'
const uuidv4 = require('uuid/v4')


// money should have a VALUE limit
const gameData = {
    minions: {},
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
            displayName = name
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
            displayName = name
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
            _iconName : iconName,

            id : uuidv4(),
            displayName     : name.charAt(0).toUpperCase() + name.slice(1),
            icon            : jsxicon(iconName),
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
    }
}

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
gameData.addPlayerResource('level', false, 99, false, false, 'eye')
gameData.addPlayerResource('energy')
gameData.addPlayerResource('currency')

gameData.addUpgrade('houseSize', 'The Big House :)', 10, 'estate', {currency: 50, energy: 50})

create.minion({
    name : 'imp',
    minionCost  : {energy : 5},
    upgradeCost : 5,
    effectObject: {energy : 0.1},
    description: "wenk"
})

create.minion({
    name : 'zombie',
    minionCost  : {energy : 5},
    upgradeCost : 5,
    effectObject: {energy : 0.2},
    description: "wenk"
})

create.minion({
    name : 'skeleton',
    minionCost  : {energy : 5},
    upgradeCost : 5,
    effectObject: {energy : 0.3},
    description: "wenk"
})

create.minion({
    name : 'lawyer',
    upgradeSuffix: "Contract",
    minionCost  : {energy : 5},
    upgradeCost : 5,
    effectObject: {energy : 0.1},
    description: "wenk"
})

create.minion({
    name : 'devil',
    minionCost  : {energy : 5},
    upgradeCost : 5,
    effectObject: {energy : 0.1},
    description: "wenk"
})

export default gameData;

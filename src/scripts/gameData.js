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

//initializing player resources
gameData.addPlayerResource('level', false, 99, false, false, 'eye')
gameData.addPlayerResource('energy')
gameData.addPlayerResource('currency')

gameData.addPlayerResource('imp', true, 10, true, true, undefined)
gameData.addPlayerResource('ghost', true, 10, true, true, undefined)
gameData.addPlayerResource('devil', true, 10, true, true, undefined)
gameData.addPlayerResource('nightmare', true, 10, true, true, undefined)

function newResourceGroup(groupObject){
    const resourceExists = (resourceName) => gameData.playerResources.hasOwnProperty(resourceName)
    if (Object.keys(groupObject).every(resourceExists)){
        return groupObject
    } else {
        console.log(groupObject, 'resourceGroup key is invalid')
    }
}

const costs = {
    imp       : newResourceGroup({ energy : 5}),
    ghost     : newResourceGroup({ energy : 10, currency : 5}),
    devil     : newResourceGroup({ energy : 15, currency : 10}),
    nightmare : newResourceGroup({ energy : 20, currency : 15})
}

const effect = {
    imp       : newResourceGroup({ energy : 0.1 }),
    ghost     : newResourceGroup({ energy : 0.2, currency : 0.01}),
    devil     : newResourceGroup({ energy : 0.3, currency : 0.05}),
    nightmare : newResourceGroup({ energy : 0.1})
}

/* todo: search for the cost/effect object using cost['minionName']*/
gameData.addMinion('imp', 'Imp', costs.imp, effect.imp)
gameData.addMinion('ghost', 'Ghost', costs.ghost, effect.ghost)
gameData.addMinion('devil', 'Devil', costs.devil, effect.devil)
gameData.addMinion('nightmare', 'Nightmare', costs.nightmare, effect.nightmare)

gameData.addUpgrade('impRune', 'Imp Rune', 5, 'minion', 'imp')
gameData.addUpgrade('ghostRune', 'Ghost Rune', 10, 'minion', 'ghost')
gameData.addUpgrade('devilRune', 'Devil Rune', 15, 'minion', 'devil')
gameData.addUpgrade('nightmareRune', 'Nightmare Rune', 20, 'minion', 'nightmare')

gameData.addUpgrade('houseSize', 'The Big House :)', 10, 'estate', {currency: 50})
/* minions by default are buyable and startunlocked for each minion
   make a buyable glyph, glyphs can be unlocked */

export default gameData;

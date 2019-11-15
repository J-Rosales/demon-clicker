const gameData = {
    minions: {},
    playerResources: {},
    getMinionData(name){
        return this.minions[name]
    },
    getBuyable(...gameAssets){ //returns an array of objects: minions, resources, etc with createsBuyButton enabled
        const buyableArray = []
        if (!Array.isArray(gameAssets) || !gameAssets.length) {
            
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
    },
    addMinion(name, costObject, defaultAmount = 0,
              isBuyable = true, startsUnlocked = true){
        const isNewMinion = name in this ? false : true
        this.minions[name] = {
            amount: defaultAmount,
            isBuyable : isBuyable,
            cost: new cost(costObject),

        }
        return isNewMinion
    },
    addPlayerResource(name = "newResource", iconName,
                      defaultAmount = 0, min = 0, max = -1){
        const isNewResource = name in this ? false : true
        
        if (iconName === undefined || iconName === "" ) {
            iconName = name
        }

        this.playerResources[name] = {
            displayName: name,
            iconName: iconName,
            defaultAmount : defaultAmount,
            min : min,
            max: max
        }
        return isNewResource
    }
}

function cost(costObject){
    for (let resourceName in costObject){
        if (costObject.hasOwnProperty(resourceName)){
            const resourceExists = Object.keys(gameData.playerResources).includes(resourceName)
            if (!resourceExists){
                console.log("WARNING: PLAYER RESOURCE DOES NOT EXIST")
            }
        }
    }
}
//initializing player resources
gameData.addPlayerResource('energy')
gameData.addPlayerResource('gold')
gameData.addPlayerResource('platinum')

gameData.addMinion('imp', {'energy' : 5})
/* minions by default are buyable and startunlocked for each minion: make a buyable glyph, glyphs can be unlocked */

export default gameData;
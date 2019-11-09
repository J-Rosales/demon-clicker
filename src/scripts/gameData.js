const gameData = function(){
  this.someStruct = "data"
  this.minions;
  this.resources;
  return this
}

gameData.prototype.getMinionData(name){
    return gameData[minions.name]
}

gameData.prototype.addMinion(name, costsArray, defaultAmount = 0){
    gameData.prototype.minions[name] = {
        amount: defaultAmount,
        cost: costsArray //assumes it already exists
    }
}

gameData.prototype.addPlayerResource(name = "newResource", iconName, defaultAmount = 0, min = 0, max = -1){
    gameData.prototype.playerResources[name] = {
        name: name,
        iconName: iconName,
        defaultAmount : defaultAmount,
        min : min,
        max: max
    }
}

imps: { 
    amount: 0,
    cost: {
      [...]
    }
const themeColors = {
    bone     : '#E3DAC9',
    beige    : '#F5F5DC',
    gold     : '#A57C00',
    darkcandy: '#A40000',
    midnight : '#18184E',
    darkberry: '#872657',
    jindigo  : '#264348'
}



const colors = {...themeColors}
/*for (const color in themeColors){
    colors[colors + "-lightest"] = hexSum(themeColors[color], '303030', '+')
    colors[colors + "-lighter"]  = hexSum(themeColors[color], '202020', '+')
    colors[colors + "-light"]    = hexSum(themeColors[color], '101010', '+')
    colors[colors + "-dark"]     = hexSum(themeColors[color], '101010', '-')
    colors[colors + "-darker"]   = hexSum(themeColors[color], '202020', '-')
    colors[colors + "-darkest"]  = hexSum(themeColors[color], '303030', '-')
} */

export default colors
import React from 'react';
import colors from './../../scripts/colors.js'
import jsxicon from '../../scripts/jsxicon.jsx';
const UINumber = props => {
    const suffixes = {
        currencyNames : ['copper', 'silver', 'gold', 'electrum', 'platinum', 'palladium', 'draconium'],
        powers : ['', 'K', 'M', 'B', 'T', 'Q'],
        value : props.value.toFixed(0),
        currency : () => {
            const scale = 100
            const power = Math.log10(scale)
            for (const i = 0; i < power; i++){
                
            }
            while (this.value > 100){}
            return (
                <>
                (value / Math.pow(scale, power)) jsxicon(currencyNames[i])
                </>
            )
        },
        number : () => {
            const scale = 1000
            const power = Math.floor(Math.log(this.value) / Math.log(scale))
            const i = 0
            return (
                <>
                {(this.value / Math.pow(scale, power))} {this.currencyNames[i]}
                </>
            )
        },
        default: () => {
            return props.value
        }
    }

    if (props.value > 100){

    }
        const warningThreshold = 0.9
        let numberColor;
    if (props.value < props.max * warningThreshold){
        numberColor = colors.midnight
    }else if (props.value >= props.max * warningThreshold && props.value < props.max){
        numberColor = colors.gold
    } else if (props.value === props.max){
        numberColor = colors.darkcandy
    }
    
      return (
        <span style={{color : numberColor }}>
            {Math.floor(props.value)}
        </span>
        
    )
}

export default UINumber
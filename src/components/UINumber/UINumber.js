import React from 'react';

const UINumber = props => {
    const themeColors = {
        bone     : '#E3DAC9',
        beige    : '#F5F5DC',
        gold: '#A57C00',
        darkcandy: '#A40000',
        midnight : '#18184E',
        darkberry: '#872657',
        jindigo  : '#264348'
    }

    const warningThreshold = 0.9
    let numberColor;
    if (props.value < props.max * warningThreshold){
        numberColor = themeColors.midnight
    }else if (props.value >= props.max * warningThreshold && props.value < props.max){
        numberColor = themeColors.gold
    } else if (props.value === props.max){
        numberColor = themeColors.darkcandy
    }
    
      return (
        <span style={{color : numberColor }}>
            {Math.floor(props.value)}
        </span>
        
    )
}

export default UINumber
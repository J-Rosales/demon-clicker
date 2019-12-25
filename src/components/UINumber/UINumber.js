import React from 'react';
//import colors from './../../scripts/colors.js'
import jsxicon from '../../scripts/jsxicon.jsx';

const UINumber = props => {
    let value = props.value
    if (props.type === 'currency'){
        const currencies = ['copper', 'silver', 'gold', 'electrum', 'platinum', 'palladium', 'draconium']
        const digits = 2
        const valueArray = value.toString().match(new RegExp('(\\d+?)(?=(\\d{' + digits + '})+(?!\\d)|$)','g'))
        const currencyArray = currencies.slice(0, valueArray.length).reverse()
        const label = currencyArray.map((currency, index) => {
            return valueArray[index] === '00' ? null : (
            <span className="mr-2" key={index}>
                {valueArray[index]} {jsxicon(currency, undefined, 'small')}
            </span>
        )})
        return (
            <>
            {label}
            </>
        )
    } else if (props.type === 'accounting') {
        value = Math.trunc(value)
        const powers = ['', 'K', 'M', 'B', 'T', 'Q']
        const digits = 3
        const valueArray = value.toString().match(new RegExp('(\\d+?)(?=(\\d{' + digits + '})+(?!\\d)|$)','g'))
        return (
            <span className="mx-1">
                {valueArray[0]}{valueArray.length > 1  && valueArray[1] !== '000' ? ("." + valueArray[1].slice(0, -1)): null}{powers[valueArray.length - 1]}
            </span>
        )
    } else return null
}

export default UINumber
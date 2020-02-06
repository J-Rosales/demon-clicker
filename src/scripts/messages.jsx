import React from 'react'
import jsxicon from './jsxicon'
import {Badge} from 'reactstrap'

const messages = {
    start : (<>
        Welcome to Demon Clicker. Your goal is to become the most powerful Warlock
        in the land. Click <Badge className="mx-1" color="jindigo">Pillage</Badge>
        to begin your  quest for dark energies, riches and power. You can learn
        additional information by hovering over various elements if on desktop, or
        by clicking / tapping the {jsxicon('question', undefined, 'small')} icons.</>)
}

export default messages
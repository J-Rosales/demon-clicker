import React from 'react'
import jsxicon from '../../scripts/jsxicon'
import './UIPanel.css'

const UIPanel = props => {
    const icons = {
        vdrag : jsxicon('vdrag'),
        eye   : jsxicon('eye')
    }

    const dragButton = props.isTop ? (
        <button className="btn p-0 m-0 float-left"
                onClick={props.dragButtonClick}>
            {icons.vdrag}
        </button>
    ) : null

    const viewButton = props.isTop ? (
        <button className="btn p-0 m-0 float-right"
                onClick={props.viewButtonClick}>
            {icons.eye}
        </button>
    ) : null
    
    const headerClassString = props.isTop ? "h4 headerspan" : "h5 headerspan"
    const styleClassString = props.isTop ? "top" : "child"

    return (
        <>
            <div className="row py-1 border-gold border-top border-bottom headerrow">
                <div className="col">
                    {dragButton}
                    <span className={headerClassString}>
                        {props.header}
                    </span>
                    {viewButton}
                </div>
            </div>
            <div className='row py-1'>
                {props.children}
            </div>
        </>
    )
}

export default UIPanel

import React, {Component} from 'react'
import jsxicon from '../../scripts/jsxicon'
import './UIPanel.css'
import Draggable from 'react-draggable'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
const uuidv4 = require('uuid/v4')

class UIPanel extends Component {
    static getDerivedStateFromProps(props, state) {
      if (props.data !== state.data) {
        return { data: props.data }
      }
      return null
    }
    constructor(props){
        super(props)
        this.state = {
            key        : uuidv4(),
            data       : props.children,
            header     : props.header,
            isTop      : props.isTop,
            content    : props.children,
            hidden     : false,
            icons: {
                hidden : jsxicon('eye'),
                vdrag  : jsxicon('vdrag')
            }
        }
    }

    dragButtonHandler = () => {

    }

    viewButtonHandler = () => {
        this.setState((prevState) => ({
            hidden: !prevState.hidden,
            }))

        this.setState((prevState) => ({
            content : prevState.hidden ? null : prevState.data,
            icons: {...prevState.icons,
                hidden : prevState.hidden ? jsxicon('eyeslash') : jsxicon('eye')
            }
        }))
    }
    render(){
        const dragButton = this.state.isTop ? (
            <button className="btn p-0 m-0 float-left dragbutton"
                onClick={() => this.dragButtonHandler()}>
            {this.state.icons.vdrag}
        </button>
        ) : null

        const viewButton = this.state.isTop ? (
            <button className="btn p-0 m-0 float-right viewbutton"
                onClick={() => this.viewButtonHandler()}>
            {this.state.icons.hidden}
        </button>
        ) : null
        
        const headerClassString = this.state.isTop ? "h4 headerspan" : "h5 headerspan"

        return (
            <Draggable axis="y" bounds="parent" handle=".dragbutton">
                <div className='container w-80 bg-light'>
                  <div className="row py-1 border-gold border-top border-bottom headerrow">
                      <div className="col">
                          {dragButton}
                          <span className={headerClassString}>
                              {this.state.header}
                          </span>
                          {viewButton}
                      </div>
                  </div>
                    <ReactCSSTransitionGroup
                        transitionName="hiderow"
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}>
                      {this.state.content}
                    </ReactCSSTransitionGroup>
                </div>
        </Draggable>
        )
    }
}

export default UIPanel

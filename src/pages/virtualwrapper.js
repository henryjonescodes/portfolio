import React from 'react'
import reactDom from 'react-dom'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/VirtualPortfolio/theme'
import virtualportfolio from './virtualportfolio';
const modalRoot = document.getElementById('canvas');

class webGLMounter extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount(){
        modalRoot.appendChild(this.el);
    }
    componentWillUnmount(){
        modalRoot.removeChild(this.el);
    }
    render() {
        return reactDom.createPortal(
          virtualportfolio,
          this.el
        );
    }
}

class virtualwrapper extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            doRouting: false,
            target: null,
            loaded: false,
            progress: 0,
            progressText: "",
        }
    }
  
    render(){
        return (
            <>
                <RoutedSideBar isOpen = {this.state.isOpen} toggle = {() => this.setState({isOpen: !this.state.isOpen})} theme = {theme}/>
                <LinkBar toggle = {() => this.setState({isOpen: !this.state.isOpen})} title = "About" theme = {theme} transparent = {true}/>
                <webGLMounter/>
            </>
        )
    }
}


export default virtualwrapper

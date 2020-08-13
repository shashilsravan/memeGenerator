import React, { Component } from 'react'
import './Header.css'

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state={
            topText: "",
            bottomText: "",
            allMemeImgs: [],
            randomImage: "https://i.ytimg.com/vi/sxrzdev5l3A/maxresdefault.jpg"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log(memes)
            this.setState({
                allMemeImgs: memes
            })
        })
    }
    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }
    handleSubmit(event){
        event.preventDefault()
        const num = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const img = this.state.allMemeImgs[num].url
        this.setState({
            randomImage: img
        })
    }
    render(){
        return(
            <div className="memeArea">
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange}
                        placeholder="Enter Top Text" name="topText"
                        value={this.state.topText}>
                    </input>
                    <input type="text" onChange={this.handleChange}
                        placeholder="Enter Bottom Text" name="bottomText"
                        value={this.state.bottomText}>
                    </input>
                    <button>Random Image</button>
                </form>
                <div className="meme">
                    <img
                        src={this.state.randomImage}
                        alt="There's a problem"
                        />
                    <h2 className="top">{ this.state.topText }</h2>
                    <h2 className="bottom">{ this.state.bottomText }</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
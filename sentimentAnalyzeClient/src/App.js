import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
	state = {
		innercomp: <textarea rows="4" cols="50" id="textinput"/>,
		mode: "text",
		sentimentOutput: [],
		sentiment: true
	}

	renderTextArea = () => {
		document.getElementById("textinput").value = "";
		if (this.state.mode === "url") {
			this.setState({
				innercomp: <textarea rows="4" cols="50" id="textinput"/>,
				mode: "text",
				sentimentOutput: [],
				sentiment: true
			})
		}
	}

	renderTextBox = () => {
		document.getElementById("textinput").value = "";
		if (this.state.mode === "text") {
			this.setState({
				innercomp: <textarea rows="1" cols="50" id="textinput"/>,
				mode: "url",
				sentimentOutput: [],
				sentiment: true
			})
		}
	}

	sendForSentimentAnalysis = () => {
		this.setState({sentiment: true});
		let ret = "";
		let url = `${ process.env.REACT_APP_SERVER }`;

		if (this.state.mode === "url") {
			url = url + "/url/sentiment?url=" + document.getElementById("textinput").value;
		} else {
			url = url + "/text/sentiment?text=" + document.getElementById("textinput").value;
		}
		ret = axios.get(url);
		ret.then((response) => {

			//Include code here to check the sentiment and fomrat the data accordingly
			// this.setState({sentimentOutput: response.data});
			let output = {};
			if (response.data.sentiment.document.label === "positive") {
				output = ( <div style={{color: "green", fontSize: 20}}>{response.data.sentiment.document.label}</div> )
			} else if (response.data.sentiment.document.label === "negative") {
				output = ( <div style={{color: "red", fontSize: 20}}>{response.data.sentiment.document.label}</div>)
			} else {
				output = (<div style={{color: "orange", fontSize: 20}}>{response.data.sentiment.document.label}</div>)
			}
			this.setState({sentimentOutput: output});
		});
	}

	sendForEmotionAnalysis = () => {
		this.setState({sentiment: false});
		let ret = "";
		let url = `${ process.env.REACT_APP_SERVER }`;

		if (this.state.mode === "url") {
			url = url + "/url/emotion?url=" + document.getElementById("textinput").value;
			ret = axios.get(url);
			let output = {}
			ret.then( (response) => {
				output = (<div style={{fontSize: 20}}>{response.data.sentiment.document.label}</div>)
				this.setState({sentimentOutput: output});
			} );
		} else {
			url = url + "/text/emotion?text=" + document.getElementById("textinput").value;
			ret = axios.get(url);

			ret.then((response) => {
				this.setState({sentimentOutput: <EmotionTable emotions={response.data.emotion.document}/>});
			});
		}
	}


	render() {
		return (
			<div className="App mt-3">
				<button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
				<button className="btn btn-dark" onClick={this.renderTextBox}>URL</button>
				<br/><br/>
				{this.state.innercomp}
				<br/>
				<button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
				<button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
				<br/>
				<div className="mt-3">
					{this.state.sentimentOutput}
				</div>
			</div>
		);
	}
}

export default App;

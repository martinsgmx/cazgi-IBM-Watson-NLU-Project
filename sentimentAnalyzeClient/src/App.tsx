import React, {useEffect, useState} from 'react';
import axios from "axios";

import './App.scss';

import Navbar from "./components/Navbar";
import TextBox from "./components/TextBox";
import Chart from "./components/Chart";
import LoadingModal from "./components/LoadingModal";
import Footer from "./components/Footer";

export default function () {
	const JC: string = 'Skill alone cannot teach or produce a great short story, which condenses the obsession of the creature; it is a hallucinatory presence manifest from the first sentence to fascinate the reader, to make him lose contact with the dull reality that surrounds him, submerging him in another that is more intense and compelling.';

	const [flag, setFlag]: any = useState(false);
	const [isDataReady, setIsDataReady]: any = useState(false);
	const [text, setText]: any = useState('');

	const [response, setResponse]: any = useState('');

	useEffect( () => {
		setIsDataReady( false );
	}, [ text ]);

	function getEmotionsAnalysis(): any {
		if ( text.length < 30) {
			alert('Please, make sure your text length is mayor to 30 characters!');
			return;
		}

		setFlag( true );
		setIsDataReady( false );
		let url: string = '.';

		url = `${ url }/text/emotion?text=${ text }`;

		axios.get( url )
			.then( ( response: any ) => {
				setResponse( response.data.emotion.document );
				setIsDataReady( true );
				setFlag( false );
		} );
	};

	return (
		<>
			{/* navbar */}
			<Navbar />
			{/* main container */}
			<div
				className={
				"container" }
			>
				{/* input text area */}
				<TextBox text={ text } textHandler={ setText } limit={ 1023 }/>

				{/* submit button */}
				<div className={ "row justify-content-center mt-3" }>
					<div className={"col-md-8"}>
						<button
							className={ "btn btn-primary shadow white-text" }
							onClick={ function () { getEmotionsAnalysis() } }
						>
							Submit
						</button>
						<span
							className={ "mx-2 sample-text" }
							onClick={ function () { setText( JC ) } }
						>
							Example text
						</span>
					</div>
				</div>

				{/* show chart */}
				{
					isDataReady &&
							<>
								<div className={ "row justify-content-center mt-3" }>
									<div className={ "col-md-8 text-center" }>
										<h3>
											Results
										</h3>
									</div>
								</div>
								<Chart emotions={ response }/>
							</>
				}

				{/* conditional modal loading */}
				<LoadingModal show={ flag } />
			</div>
			{/* footer with trademarks disclaimer */}
			<Footer/>
		</>
	)
}
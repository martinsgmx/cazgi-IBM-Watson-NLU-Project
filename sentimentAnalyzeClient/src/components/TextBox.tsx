import React, {useEffect, useState} from 'react';

export default function ( { text, textHandler, limit }: any ) {
	const [ characterCounter, setCharacterCounter ] = useState(0);

	function watchText( e: any ) {
		textHandler( e.target.value );
		setCharacterCounter( e.target.value.length )
	}

	return (
		<>
			<div className={"row justify-content-center"}>
				<div className={"col-md-8"}>
					<div className={ "d-flex justify-content-end mt-2" }
					>
						<span>
							{ characterCounter } / { limit }
						</span>
					</div>
				</div>
			</div>

			<div className={ "row justify-content-center mt-3" } >
				<div className={ "col-md-8" } >
					<textarea
						className="shadow form-control"
						placeholder={ "Type or copy a text with minimum 30 character for optimal results..." }
						onChange={ ( e ) => watchText( e ) }
						value={ text }
					/>
				</div>
			</div>
		</>
	)
};
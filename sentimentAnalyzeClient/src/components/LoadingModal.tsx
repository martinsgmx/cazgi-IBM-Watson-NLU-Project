import React from 'react';
import { Modal } from 'react-bootstrap';

export default function ( { show }: any ) {
	return (
		<>
			<Modal show={ show } >
				<Modal.Header>
					<Modal.Title>
						Retrieving data...
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className={"text-center"}>
						<div className="spinner-grow text-primary" role="status" />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={ "text-center" }>
						Crafted with { '❤️' }
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
};
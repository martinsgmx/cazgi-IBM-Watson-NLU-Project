import React, {useEffect, useState} from 'react';
import { Doughnut } from 'react-chartjs-2';

import COLORS from '../consts/COLORS';

export default function ( { emotions }: any ) {
	const [dataSet, setDataSet]: any = useState('');

	useEffect(() => {
		const data: any = {
			labels: [
				'Anger',
				'Disgust',
				'Fear',
				'Joy',
				'Sadness'
			],
			datasets: [{
				data: [
					emotions.emotion.anger,
					emotions.emotion.disgust,
					emotions.emotion.fear,
					emotions.emotion.joy,
					emotions.emotion.sadness
				],
				backgroundColor: [
					COLORS.anger_bg,
					COLORS.disgust_bg,
					COLORS.fear_bg,
					COLORS.joy_bg,
					COLORS.sadness_bg
				],
				hoverBackgroundColor: [
					COLORS.anger_hg,
					COLORS.disgust_hg,
					COLORS.fear_hg,
					COLORS.joy_hg,
					COLORS.sadness_hg
				]
			}]
		};

		setDataSet( data );
	}, [ ]);

	return (
		<>
			<div className={ "row justify-content-center mt-2" }>
				<div className={ "col-md-8 col-xl-4" }>
					<Doughnut data={ dataSet } type={ 'doughnut' }/>
				</div>
			</div>
		</>
	)
};
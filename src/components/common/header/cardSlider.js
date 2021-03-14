import React from 'react';
import MyImage from '../lazyImage';

const CardSlider = ({ cardList }) => {
	return (
		<>
			<div id="card-slider-container" className="card-slider-container">
				<div className="slider-stack">
					<div className="card-wrapper">
						{ cardList.map((item, index) => 
							<div className="card-item" key={index}>
								<a href={item.node.href}>
									<div style={{ width:'100%' }}>
										<MyImage src={item.node.imageUrl.fluid.srcWebp} alt="" />
									</div>
								</a>
							</div>
						)}                        
					</div>
				</div>
			</div>
		</>
	)
}

export default CardSlider
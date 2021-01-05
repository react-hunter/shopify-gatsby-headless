import React from 'react';
import { customizePageData } from '../data/customizePage' 

const CustomizePage = ({ data }) => {
    const revert = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    const handleKeyDown = (e) => {
      console.log('key down');
      e.preventDefault();
    }
    const selectArrangement = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    const hideLetters = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }

    const previous = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    const next = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    const AddToBag = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    const setNumberStyle = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    const setBox = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    const hideNumbers = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    const setLetterStyle = (e) => {
      console.log('show sidenav');
      e.preventDefault();
    }
    return (
      <>
        <div className="container">
          <div className="arrangement-sections_container">
            <div id="mobile-panel" className="arrangement-choices_container-mobile" style={{ display: 'block' }}>
              <div className="arrangement-choices_row">
                <div className="arrangement_row_left" id="arr-title-mobile">
                    <span style={{color:'rgb(0,0,0)',fontWeight:'600'}}>Your arrangement</span>
                </div>
              </div>
              <div className="arrangement-choices_row">
                <div className="arrangement_row_left" id="arr-choice-mobile">
                    <span id="mobile-arr-type">Large Square</span>
                </div>
                <div className="arrangement_row_right" id="arr-price-mobile">
                    <span id="mobile-arr-price-span">$-</span>
                </div>
              </div>
              <div className="arrangement-choices_row">
                <div className="arrangement_row_left" id="arr-rose1-mobile">
                  <span id="rose-mobile-type">Rose Color 1: <span id="rose-mobile-1" className="rose-selection">-</span></span>
                </div>
                <div className="arrangement_row_right" id="arr-rose2-mobile">
                  <span id="rose-mobile-type">Rose Color 2: <span id="rose-mobile-2" className="rose-selection">-<span></span></span></span>
                </div>
              </div>
            </div>

            <div className="arrangement-column col-left">
              <div className="arrangement-header">
                <span>YOUR ARRANGEMENT</span>
              </div>
              <div className="statusBox" id="statbox-0">
                <h5 className="statusBox-edit" onClick={revert} onKeyDown={handleKeyDown} role="presentation">Edit</h5> 
                <h5 style={{fontWeight:'bold'}}>ARRANGEMENT:</h5> 
                <h5 style={{ fontSize: '1rem', textTransform: 'capitalize' }} id="arr-Type">Large Square</h5> 
                <span id="sub-text">7 X 7 - 49 ROSES</span>
              </div>
              <div className="statusBox" id="statbox-1">
                <h5 className="statusBox-edit" onClick={revert} onKeyDown={handleKeyDown} role="presentation">Edit</h5> 
                <h5 style={{fontWeight:'bold'}}>BOX:</h5> 
                <h5 style={{ fontSize: '1rem', textTransform: 'capitalize' }} id="BOX-Type">White Suede</h5> 
                <span id="sub-text"></span>
              </div>
            </div>

            <div className="arrangement-column arrangement-center">
              <img id="mainIMG" src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/white_suede_Ze4idkLO1.jpg" alt="" />
            </div>

            <div className="arrangement-column arr-col-right">
              <div className="arrangement-header">
                  <span id="arrangementSelector_title">CHOOSE BOX</span>
              </div>
              <div id="col-right">

                <div id="arrangementSelector-0" style={{display: 'none'}}>
                  {customizePageData.arrangementSelector0.items.map((item, index) => 
                  <div className="arr-type-box" onClick={selectArrangement} key={index} onKeyDown={handleKeyDown} role="presentation"
                    data-productid={item.dataId} id={item.id} style={{ backgroundColor: item.divBackgroundColor }}>
                    <span style={{ color: item.spanColor }}>{item.title}</span>
                  </div>
                  )}
                </div>

                <div id="arrangementSelector-Letters" className="arrangement-container" style={{ marginTop: '10px', display: 'none' }}> 
                  <div className="arrangement-pattern" id="goBack" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={hideLetters} style={{ background: 'rgb(0, 0, 0)', minWidth:'95%'}} onKeyDown={handleKeyDown} role="presentation">
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter A" style={{color:'rgb(255,255,255)'}}>Go Back</span>
                  </div>

                  {customizePageData.arrangementSelectorLetters.items.map((item, index) => 
                  <div className="arrangement-pattern letterChoice" id={item.divId} key={index} onKeyDown={handleKeyDown} role="presentation"
                    data-preview='//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454'
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)' }}>
                      <span className="arrangement-pattern_title styleOption" id={item.spanId} style={{color: 'rgb(0,0,0)' }}>{item.title}</span>
                  </div>
                  )}
                </div>

                <div id="arrangementSelector-Numbers" className="arrangement-container" style={{marginTop: '10px', display:'none'}}> 
                  <div className="arrangement-pattern" id="goBack" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={hideNumbers} style={{background: 'rgb(0, 0, 0)', minWidth:'95%'}} onKeyDown={handleKeyDown} role="presentation">
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter A" style={{color:'rgb(255,255,255)'}} >Go Back</span>
                  </div>

                  {customizePageData.arrangementSelectorNumbers.items.map((item, index) => 
                  <div className="arrangement-pattern numberChoice" id={item.divId} key={index} 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}} onKeyDown={handleKeyDown} role="presentation">
                      <span className="arrangement-pattern_title styleOption" id={item.spanId} style={{color:'rgb(0,0,0)'}} >{item.title}</span>
                  </div>
                  )}
                </div>
                
                <div id="arrangementSelector-1">
                  <div className="box-contents">
                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/black_suede_Dv9MphdnPn.jpg" title="Black Suede" id="Black-Suede" className="boxSoldOut" alt="" />

                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/white_suede_Ze4idkLO1.jpg" title="White Suede" id="White-Suede" 
                      onClick={setBox}  onKeyDown={handleKeyDown} role="presentation"
                      className="boxs" style={{ boxShadow: 'rgb(0, 0, 0)'}} alt="" />

                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/red_suede_p_9N7KXus.jpg" title="Red Suede" id="Red-Suede" 
                      onClick={setBox} onKeyDown={handleKeyDown} role="presentation"
                      className="boxs"  alt="" />
                    
                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/pink_suede_DX4cKzoL-.jpg" title="Pink Suede" id="Pink-Suede" 
                      onClick={setBox}   onKeyDown={handleKeyDown} role="presentation"
                      className="boxs"  alt="" />
                    
                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/blue_suede_pa_sWjpPgL.jpg" title="Blue Suede" id="Blue-Suede" 
                      onClick={setBox}  onKeyDown={handleKeyDown} role="presentation"
                      className="boxs"  alt="" />
                  </div>
                </div>
              </div>

              <form id="AddToCartForm" className="product_form AddToCartFormСustom" method="post" action="#" style={{display:'none'}} >
                <input className="update" type="text" value="324748289" name="id" size="8" /> 
                <input type="text" value="1" name="quantity" size="3" />
                <div id="pro">
                </div>
              </form>

              <div className="step-container">
                <div className="step-wrapper">
                    <div className="step-previous" onClick={previous} onKeyDown={handleKeyDown} role="presentation">Back</div>
                    <div className="step-next" id="step-next" onClick={next} onKeyDown={handleKeyDown} role="presentation">Next</div>
                    <div style={{display:'none'}} className="step-next" id="addToBAG" onClick={AddToBag} onKeyDown={handleKeyDown} role="presentation">Add To Bag</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
  
export default CustomizePage
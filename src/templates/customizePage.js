import React from 'react';
import { customizePageData } from '../data/customizePage' 

const CustomizePage = ({ data }) => {
    const revert = (e) => {
      console.log('show sidenav');
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
                <h5 className="statusBox-edit" onClick={revert}>Edit</h5> 
                <h5 style={{fontWeight:'bold'}}>ARRANGEMENT:</h5> 
                <h5 style={{ fontSize: '1rem', textTransform: 'capitalize' }} id="arr-Type">Large Square</h5> 
                <span id="sub-text">7 X 7 - 49 ROSES</span>
              </div>
              <div className="statusBox" id="statbox-1">
                <h5 className="statusBox-edit" onClick={revert}>Edit</h5> 
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
                  <div className="arr-type-box" onClick={selectArrangement} 
                    data-productid={item.dataId} id={item.id} 
                    style={{ backgroundColor: item.divBackgroundColor }}>
                    <span style={{ color: item.spanColor }}>{item.title}</span>
                  </div>
                  )}
                </div>

                <div id="arrangementSelector-Letters" className="arrangement-container" style={{ marginTop: '10px', display: 'none' }}> 
                  <div className="arrangement-pattern" id="goBack" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={hideLetters} style={{ background: 'rgb(0, 0, 0)', minWidth:'95%'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter A" style={{color:'rgb(255,255,255)'}}>Go Back</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-A" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter A" style={{color:'rgb(0,0,0)'}}>A</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-B" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter B" style={{color:'rgb(0,0,0)'}}>B</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-C" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter C" style={{color:'rgb(0,0,0)'}}>C</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-D" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter D" style={{color:'rgb(0,0,0)'}} >D</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-E" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter E" style={{color:'rgb(0,0,0)'}} >E</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-F" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter F" style={{color:'rgb(0,0,0)'}} >F</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-G" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter G" style={{color:'rgb(0,0,0)'}} >G</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-H" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter H" style={{color:'rgb(0,0,0)'}} >H</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-I" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter I" style={{color:'rgb(0,0,0)'}} >I</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-J" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter J" style={{color:'rgb(0,0,0)'}} >J</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-K" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter K" style={{color:'rgb(0,0,0)'}} >K</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-L" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter L" style={{color:'rgb(0,0,0)'}} >L</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-M" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter M" style={{color:'rgb(0,0,0)'}} >M</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-N" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter N" style={{color:'rgb(0,0,0)'}} >N</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-O" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter O" style={{color:'rgb(0,0,0)'}} >O</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-P" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter P" style={{color:'rgb(0,0,0)'}} >P</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-Q" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter Q" style={{color:'rgb(0,0,0)'}} >Q</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-R" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter R" style={{color:'rgb(0,0,0)'}} >R</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-S" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter S" style={{color:'rgb(0,0,0)'}} >S</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-T" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter T" style={{color:'rgb(0,0,0)'}} >T</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-U" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter U" style={{color:'rgb(0,0,0)'}} >U</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-V" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter V" style={{color:'rgb(0,0,0)'}} >V</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-W" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter W" style={{color:'rgb(0,0,0)'}} >W</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-X"  
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter X" style={{color:'rgb(0,0,0)'}} >X</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-Y" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter Y" style={{color:'rgb(0,0,0)'}} >Y</span>
                  </div>
                  
                  <div className="arrangement-pattern letterChoice" id="Letter-Z"  
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setLetterStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter Z" style={{color:'rgb(0,0,0)'}} >Z</span>
                  </div>
                </div>

                <div id="arrangementSelector-Numbers" className="arrangement-container" style={{marginTop: '10px', display:'none'}}> 
                  <div className="arrangement-pattern" id="goBack" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={hideNumbers} style={{background: 'rgb(0, 0, 0)', minWidth:'95%'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Letter A" style={{color:'rgb(255,255,255)'}} >Go Back</span>
                  </div>
                  <div className="arrangement-pattern numberChoice" id="Number-0" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 0" style={{color:'rgb(0,0,0)'}} >0</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-1" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 1" style={{color:'rgb(0,0,0)'}} >1</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-2" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 2" style={{color:'rgb(0,0,0)'}} >2</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-3" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 3" style={{color:'rgb(0,0,0)'}} >3</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-4" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 4" style={{color:'rgb(0,0,0)'}} >4</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-5" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 5" style={{color:'rgb(0,0,0)'}} >5</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-6" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 6" style={{color:'rgb(0,0,0)'}} >6</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-7" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 7" style={{color:'rgb(0,0,0)'}} >7</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-8" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 8" style={{color:'rgb(0,0,0)'}} >8</span>
                  </div>

                  <div className="arrangement-pattern numberChoice" id="Number-9" 
                    data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                    onClick={setNumberStyle} style={{background: 'rgb(255, 255, 255)'}}>
                      <span className="arrangement-pattern_title styleOption" id="StyleText-Number 9" style={{color:'rgb(0,0,0)'}} >9</span>
                  </div>
                </div>
                
                <div id="arrangementSelector-1">
                  <div className="box-contents">
                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/black_suede_Dv9MphdnPn.jpg" title="Black Suede" id="Black-Suede" className="boxSoldOut" alt="" />

                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/white_suede_Ze4idkLO1.jpg" title="White Suede" id="White-Suede" 
                      onClick={setBox} 
                      className="boxs" style={{ boxShadow: 'rgb(0, 0, 0)'}} alt="" />

                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/red_suede_p_9N7KXus.jpg" title="Red Suede" id="Red-Suede" 
                      onClick={setBox}
                      className="boxs"  alt="" />
                    
                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/pink_suede_DX4cKzoL-.jpg" title="Pink Suede" id="Pink-Suede" 
                      onClick={setBox}  
                      className="boxs"  alt="" />
                    
                    <img src="https://ik.imagekit.io/vajwlqjsrw/Large_Square/blue_suede_pa_sWjpPgL.jpg" title="Blue Suede" id="Blue-Suede" 
                      onClick={setBox} 
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
                    <div className="step-previous" onClick={previous}>Back</div>
                    <div className="step-next" id="step-next" onClick={next}>Next</div>
                    <div style={{display:'none'}} className="step-next" id="addToBAG" onClick={AddToBag}>Add To Bag</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
  
export default CustomizePage
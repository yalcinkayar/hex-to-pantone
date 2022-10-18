import React, {useEffect, useState} from 'react';
import {ChromePicker} from 'react-color';
import axios from 'axios';
import './App.css';

function App(){

    var [defaultColor, setColor] = useState("#00D1B2");

    useEffect(() => {
        document.getElementById('hex').value = "#00D1B2";
        document.getElementById('rgba-text').value = "rgba(0, 209, 178, 1)";
        document.querySelector(".pantone-title > p").innerHTML = "333C";
        document.getElementById('rgba-text').value = "rgba(0, 209, 178, 1)";
    }, []);    

    //hex input
    var onChangeHex = React.useCallback(() => {
      var hexCode = document.getElementById('hex').value;
      setColor(hexCode);
      if(hexCode.includes('#')){
          hexCode = hexCode.replace('#', '');
      }
  

      axios.get(`http://127.0.0.1:8000/api/colordata/${hexCode}`, {
         
      }).then((res) => {
          if(res.data.success){
              var r = res.data.data;
              var aRgbHex = hexCode.match(/.{1,2}/g);
              var aRgb = [
                  parseInt(aRgbHex[0], 16),
                  parseInt(aRgbHex[1], 16),
                  parseInt(aRgbHex[2], 16)
              ];
          
              document.getElementById('rgba').value = 'rgba('+ r.red+','+ r.green+','+r.blue+', 1)';
          }else{
              const simpleColorConverter = require('simple-color-converter');

              var color_hex = new simpleColorConverter({
                from: hexCode, 
                to: 'pantone' 
              })
              var aRgbHex = hexCode.match(/.{1,2}/g);
              var aRgb = [
                  parseInt(aRgbHex[0], 16),
                  parseInt(aRgbHex[1], 16),
                  parseInt(aRgbHex[2], 16)
              ];
              document.getElementById('rgba').value = 'rgba('+ aRgb[0]+','+ aRgb[1]+','+aRgb[2]+', 1)';
             
              axios({
                method: 'post',
                url: `http://127.0.0.1:8000/api/create_color/${hexCode}`,
                data: JSON.stringify({ color_name: color_hex.color, hex: hexCode, red :  aRgb[0], green : aRgb[1], blue: aRgb[2]})
            })
              .then(response => {
                    console.log(response.data)
              })
              .catch(e => {
                console.log(e);
              })
          }
      }).catch(e => {
          console.log(e);
      })
    
    }, []);

    //color picker
    var onChangePicker = React.useCallback((color_picked) => {
      setColor(color_picked.hex);
      console.log(JSON.stringify(color_picked.hex))
      var hexCode = color_picked.hex;

      document.getElementById('hex').value = hexCode;
      document.getElementById('pantone-box').style.background = hexCode;
      document.querySelector(".hex2 > p").innerHTML = hexCode;

      if(hexCode.includes('#')){
          hexCode = hexCode.replace('#', '');
      }

      axios.get(`http://127.0.0.1:8000/api/colordata/${hexCode}`, {
         
      }).then((res) => {
          if(res.data.success){
              var r = res.data.data;
              var aRgbHex = hexCode.match(/.{1,2}/g);
              var aRgb = [
                  parseInt(aRgbHex[0], 16),
                  parseInt(aRgbHex[1], 16),
                  parseInt(aRgbHex[2], 16)
              ];
              console.log('rgb ' + aRgb);
              document.getElementById('rgba').value = 'rgba('+ r.red+','+ r.green+','+r.blue+', 1)';
              document.querySelector(".pantone-title > p").innerHTML = r.color_name;
              
          }else{
            const simpleColorConverter = require('simple-color-converter');

            var color_hex = new simpleColorConverter({
                from: hexCode, 
                to: 'pantone' 
            })
              var aRgbHex = hexCode.match(/.{1,2}/g);
              var aRgb = [
                  parseInt(aRgbHex[0], 16),
                  parseInt(aRgbHex[1], 16),
                  parseInt(aRgbHex[2], 16)
              ];
              document.getElementById('rgba').value = 'rgba('+ aRgb[0]+','+ aRgb[1]+','+aRgb[2]+', 1)';
              document.querySelector(".pantone-title > p").innerHTML = color_hex.color;
             
              axios({
                method: 'post',
                url: `http://127.0.0.1:8000/api/create_color/${hexCode}`,
                data: JSON.stringify({ color_name: color_hex.color, hex: hexCode, red :  aRgb[0], green : aRgb[1], blue: aRgb[2]})
            })
              .then(response => {
                    console.log(response.data)
              })
              .catch(e => {
                console.log(e);
              })
          }
      }).catch(e => {
          console.log(e);
      })
    
    }, []);

    return (
                <div className="container">    
                <div className="main-container">
                  <div className="header">
                        <b>Hex to Pantone</b>
                  </div>
                
                  <div id="box-left">
                      <ChromePicker id="colorpicker" style={{width:'150px', height:'200px'}} color={defaultColor} onChange={a => onChangePicker(a)} />
                  </div>
                  <div id="box-middle">
                      <div id="hex-title">
                      <label htmlFor="hex">Hex</label>
                      </div>
                      <div id="hex-text">
                      <input type="text" id="hex" onChange={onChangeHex} />
                      </div>
                  

                      <div id="rgba-title">
                      <label htmlFor="rgba">RGBA</label>
                      </div>
                      <div id="rgba-text">
                      <input type="text" id="rgba" />
                      </div>
                  </div>
                  <div id="box-right">
                      <div className="pantone-title">
                        <p></p>
                      </div>
                      <div id="pantone-box" style={{background: defaultColor}}></div>
                      <div className="hex2">
                          <p></p>
                      </div>
                  </div>
                </div>
                </div>
    )
}

export default App;
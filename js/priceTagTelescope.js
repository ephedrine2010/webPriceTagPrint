//------This script written by M.Shanab April 2023 ------//
//------Feel free to update this script ------//
//------Regards -----ephedrine2010@gmail.com ------//
$(document).ready(function() {
    processUrlText();
  });
  
  const items = [];

    async function processUrlText(){
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      let text= urlParams.get('text');
      //text="100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20100015980,Panadol-Extra%20Tablet%2024%20pcs,بانادول%20اكسترا%2024%20قرص,8.0,0%20***%20";
      
      //console.log('first receive');

      //console.log(text);
      //console.log('first receive');

      //console.log(text);
      var receivedData=text.split("***");
      //console.log(receivedData);
      
      for(let i=0;i<receivedData.length;i++){
        var subxItem=receivedData[i].split(",");

        let vatAr='';
        let vatEn='';
          console.log(subxItem);
        if(subxItem[4]==='0 '){
          vatAr='معفي الضريبة';
          vatEn='VAT Exempt';
        }else{
          vatAr='شامل الضريبة';
          vatEn='Including VAT';          
        }


        items.push({
          item_Number: subxItem[0],
            item_barcode:subxItem[0],
              itemNameAr: subxItem[1],
              itemNameEn: subxItem[2],
              vatEntxt: vatEn,
              vatArtxt: vatAr,   
              price: subxItem[3],
              item_information:subxItem[1]
        });
      

      }

          items.pop();
        
          //Generate barcode
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let qrCode = await generateBarcode(item.item_Number);
            item.item_barcode = qrCode;
          }

      const LargePriceTag = document.getElementById("outputLarge");
      const SmallPriceTag = document.getElementById("outputSmall");
      items.forEach(item => {
        //console.log(item.item_barcode);
        //outputDiv.innerHTML += createHTML(item);
        LargePriceTag.innerHTML += LargeSizeTagHTML(item);
        SmallPriceTag.innerHTML += smallSizeTagHTML(item);

      });

      
    }

    //-------------------------------------------------

      //create barcode
     async function generateBarcode(number) {
          const canvas = document.createElement('canvas');

          JsBarcode(canvas, number, {
              format: "CODE128",
              displayValue: false,
              width: 2,
              height: 50,
              margin: 0,
              text: number,
              textAlign: "center",
              textPosition: "bottom"
          });

          // Create a new canvas element with a rotated context
          const rotatedCanvas = document.createElement('canvas');
          rotatedCanvas.width = canvas.height;
          rotatedCanvas.height = canvas.width;
          const ctx = rotatedCanvas.getContext('2d');
          ctx.translate(rotatedCanvas.width, 0);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(canvas, 0, 0);

          const dataURL = canvas.toDataURL();

          return dataURL;
      }
  
          
      //price template function   font-family: Arial Black;
      function LargeSizeTagHTML(item) {
        return`
          <!-- template 3 -->
          <div class="col pricebox thickborder">
            <div class="div-horiz" style="box-sizing: border-box;">
                <table>
                    <tbody>
                        <tr>
                            <td style="text-align:left">
                                <div style="font-weight:normal ; font-size:Small;-webkit-transform: translate(0,-10px) ">
                                    SAR
                                </div>
                            </td>
                            <td rowspan="2" style="text-align:right">
                                <div style="font-size:xx-small">
                                    <br />${item.vatEntxt}
                                    <br />${item.vatArtxt}
                                </div>

                            </td>
                        </tr>

                        <tr>
                            <td style="text-align:left ">
                                <div style="font-weight: bold; font-size: 28px; -webkit-transform: translate(0,-15px) ">
                                  ${item.price}
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td colspan="2" style="text-align:left">
                                <div style="font-weight: bold; font-size: 11px; -webkit-transform: translate(0,-15px) ">
                                  ${item.itemNameEn}
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align:left">
                                <div style="font-weight: bold; font-size: 11px; -webkit-transform: translate(0,-15px) ">
                                  ${item.itemNameAr}
                                </div>

                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>

            <!-- barcode dive -->
            <div class="div-vertical" >
                <div class="fa-rotate-90">
                    <img src="${item.item_barcode}" alt="qrocde" style="height: 20px; width: 125px; -webkit-transform: translate(-20px,0)" />
                    <br />
                    <div style="-webkit-transform:translate(5px,0) ;font-size: 12px;"> ${item.item_Number} </div>
                </div>
            </div>
            </div>
  
          `
      }


      //============== small size template
      //price template function   font-family: Arial Black;
      function smallSizeTagHTML(item) {
        return`
          <!-- template 3 -->
          <div class="col smalltag thickborder">
            <div class="div-horiz" style="box-sizing: border-box;">
              <table style="-webkit-transform: translate(0,-15px)">
                  <tbody>
                      <tr>
                          <td style="text-align:left">
                              <div style="font-weight: normal; font-size: xx-small ">
                                  SAR
                              </div>
                          </td>
                          <td rowspan="2" style="text-align: right; -webkit-transform: translate(0,-15px)">
                              <div style="font-size:xx-small">
                                  <br />${item.vatEntxt}
                                  <br />${item.vatArtxt}
                              </div>

                          </td>
                      </tr>

                      <tr>
                          <td style="text-align:left ">
                              <div style="font-weight: bold; Black; font-size: 20px; -webkit-transform: translate(0,-10px) ">
                                  ${item.price}
                              </div>
                          </td>

                      </tr>

                      <tr>
                          <td colspan="2" style="text-align:left">
                              <div style="font-weight: bold; font-size: 8px; -webkit-transform: translate(0,-15px) ">
                                ${item.itemNameEn}
                              </div>

                          </td>
                      </tr>
                      <tr>
                          <td colspan="2" style="text-align:left">
                              <div style="font-weight: bold; font-size: 8px; -webkit-transform: translate(0,-15px) ">
                                ${item.itemNameAr}
                              </div>

                          </td>
                      </tr>

                  </tbody>
              </table>

            </div>

              <!-- barcode dive -->
                <div class="div-vertical">
                    <div class="fa-rotate-90">
                        <img src="${item.item_barcode}" alt="qrocde" style="height: 15px; width: 70px; -webkit-transform: translate(-20px,0)" />
                        <br />
                        <div style="font-size: xx-small; -webkit-transform: translate(-10px,0)"> ${item.item_Number} </div>
                    </div>
                </div>
          </div>
  
          `
      }
        
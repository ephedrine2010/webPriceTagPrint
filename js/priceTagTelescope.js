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

      const text= urlParams.get('text');
      
      console.log(text);


      console.log(text);
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

      const outputDiv = document.getElementById("output");
      items.forEach(item => {
        //console.log(item.item_barcode);
        outputDiv.innerHTML += createHTML(item);
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
  
          
      //price template function
      function createHTML(item) {
        return`
          <!-- template 3 -->
          <div class="col pricebox thickborder">
            <div class="div-horiz" style="box-sizing: border-box;">
                <table>
                    <tbody>
                        <tr>
                            <td style="text-align:left">
                                <div style="font-weight:normal ; font-size:Medium;-webkit-transform: translate(0,-10px) ">
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
                                <div style="font-weight: bold; font-family: Arial Black; font-size: 25px; -webkit-transform: translate(0,-15px) ">
                                  ${item.price}
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td colspan="2" style="text-align:left">
                                <div style="font-weight: bold; font-size: 12px; -webkit-transform: translate(0,-15px) ">
                                  ${item.itemNameEn}
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align:left">
                                <div style="font-weight: bold; font-size: 12px; -webkit-transform: translate(0,-15px) ">
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
        
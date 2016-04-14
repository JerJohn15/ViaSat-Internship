/**
 * Created by eweng on 7/27/2015.
 */

//Query
var queryText = "SELECT 'timestamp','latitude','longitude', 'upload', 'download', 'latency','serverName' FROM " +
    "1HTPwELCkeMZRG7Afkt2bmOmITmBWZ7GttKne7F1_";
var apiKey ="&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
var query = new google.visualization.Query(
    'https://www.googleapis.com/fusiontables/v1/query?sql='+encodeURIComponent(queryText)+apiKey+'&callback=handlerMap');
query.send();

function handlerMap(response){

    function createArray(){
        var columns = ['Lat','Long','Name'];
        var rows=[];
        //LL array
        for(var row = 0; row<response.rows.length; row++){
            var LL=[];
            for(var col = 0; col<response.rows[row].length; col++){
                if(col===1||col===2){
                    LL.push(response.rows[row][col]);
                }//end if
            }
            rows.push(LL);
        }
        //Add descriptions
        for(row = 0; row<response.rows.length; row++){
            LL="";
            for(col = 0; col<response.rows[row].length; col++){
                if(col===0){
                    var formatter = new google.visualization.DateFormat({pattern: "MMMM d, ''yy"});
                    LL+="\r\nDate: ";
                    LL+=formatter.formatValue(new Date(response.rows[row][col]));
                }else if (col===3){
                    LL+="\r\nUpload Speed: ";
                    LL+=response.rows[row][col];
                }else if (col===4){
                    LL+="\r\nDownload Speed: ";
                    LL+=response.rows[row][col];
                }else if (col===5){
                    LL+="\r\nLatency: ";
                    LL+=response.rows[row][col];
                }else if (col===6){
                    LL+="\r\nServer Name: ";
                    LL+=response.rows[row][col];
                }//end ifs
            }
            rows[row].push(LL);
        }
        var Data=[[]];
        Data[0]=columns;
        Data=Data.concat(rows);

        return Data;
    }//end createArray

    google.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(createArray());
        var map = new google.visualization.Map(document.getElementById('map'));
        var options = {
            showTip: true,
            useMapTypeControl:true,
            mapType:'normal',
        }
        map.draw(data, options);
    }//end drawChart

}//end handlerMap
/**
 * Created by eweng on 8/4/2015.
 */

//Query
var queryText = "SELECT 'date','latitude','longitude','responseTime','website','modemSwVersion', 'modemHwRevision', 'macAddress' FROM " +
    "1ra6ZZmVhrCKJwprhfvqOBBQYv7-ABglEJZ6jYnCE";
var apiKey ="&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
var query = new google.visualization.Query(
    'https://www.googleapis.com/fusiontables/v1/query?sql='+encodeURIComponent(queryText)+apiKey+'&callback=handlerMap');
query.send();

var URL ="https://docs.google.com/spreadsheets/d/1WOG4vNj8mJn37xF0Fw_n7QCJMfAlErZyDCsyaXx3DoI/edit?usp=sharing";

function drawChart() {
    var query = new google.visualization.Query(URL);
    query.send(handler);
}

function handler(response) {
    var data = response.getDataTable();
    var chart = new google.visualization.(document.getElementById('columnchart'));
    chart.draw(data, null);
}

function handlerMap(response){

    function createArray(){
        var columns = ['Name (First and Last)','College','City of College','State of College (Postal Abbreviation, e.g. CA)','Major'];
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
                    LL+="\r\n";
                    LL+=formatter.formatValue(new Date(response.rows[row][col]));
                }else if (col===3){
                    LL+="\r\nResponse Time: ";
                    LL+=response.rows[row][col];
                }else if (col===4){
                    LL+="\r\nWebsite: ";
                    LL+=response.rows[row][col];
                }else if (col===5){
                    LL+="\r\nModem Software Version: ";
                    LL+=response.rows[row][col];
                }else if (col===6){
                    LL+="\r\nModem Hardware Revision: ";
                    LL+=response.rows[row][col];
                }else if (col===7){
                    LL+="\r\nMAC Address: ";
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

        map.draw(data, options);
    }//end drawChart

}//end handlerMap
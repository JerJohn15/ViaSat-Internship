/**
 * Created by eweng on 8/4/2015.
 */

//It works if I move google.setOnLoadCallback(function) to the top, instead of in handlerLine(response). Why?

google.setOnLoadCallback(drawLine(1));
function drawLine(value){

    val=value;

    var queryText;
    if(value==1){
        queryText = "SELECT 'date','responseTime' FROM " +//, 'website', 'modemSwVersion', 'modemHwRevision', 'macAddress'
            "1ra6ZZmVhrCKJwprhfvqOBBQYv7-ABglEJZ6jYnCE";
        title = "Response Time vs. Date/Time";
    }
    else if(value==2){
        queryText = "SELECT 'runIteration','responseTime', 'website' FROM " +//, 'modemSwVersion', 'modemHwRevision', 'macAddress'
            "1ra6ZZmVhrCKJwprhfvqOBBQYv7-ABglEJZ6jYnCE";
        title = "Response Time vs. Iteration Number";
    }

    var apiKey = "&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
    var query = new google.visualization.Query(
        'https://www.googleapis.com/fusiontables/v1/query?sql=' + encodeURIComponent(queryText) + apiKey + '&callback=handlerLine');
    query.send();

}

function handlerLine(response) {

    draw();
    function draw() {
        //var dataView = new google.visualization.DataView(data);
        //dataView.setColumns([0,1]);

        var data = [];
        data.push(response.columns);
        var rows = response.rows;

        if(val==1){
            for (var index= 0; index<rows.length;index++){
                rows[index][0]=new Date(rows[index][0]);
            }
            rows.sort(function(a,b){return a[0] - b[0];});
            data = data.concat(rows);
            data = google.visualization.arrayToDataTable(data);

            var formatter = new google.visualization.DateFormat({pattern: "MMM d, ''yy"});
            formatter.format(data,0);
        }

        if(val==2) {
            data = data.concat(rows);
            data = google.visualization.arrayToDataTable(data);
        }

        var options = {
            /*title: 'Upload and Download Speeds',
            pointSize: 3,
            curveType:'function',
            legend:{position: 'top'},*/
            chart: {
                title: title,
                subtitle: "Raspberry Pi Visualization Data"
            },
            width: 800,
            height: 500,
            backgroundColor: {fill: "white"}
        };

        //var chart = new google.charts.Line(document.getElementById('line'));
        //chart.draw(data, google.charts.Line.convertOptions(options));

         var controlWrap = new google.visualization.ControlWrapper({
         'controlType': 'NumberRangeFilter',
         'containerId': 'line_range',
         'options': {'filterColumnLabel': "responseTime"}
         });

        if(val==1){
            var controlWrap2 = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'line_dropdown',
                options:{filterColumnLabel:'date'}
            });
        }

         var wrapper = new google.visualization.ChartWrapper({
         containerId:"line",
         chartType:'Line',
         'options':google.charts.Line.convertOptions(options),
         });

        var dashboard = new google.visualization.Dashboard(document.getElementById('line_dash'));
        if(val==1){
            dashboard.bind([controlWrap,controlWrap2],wrapper);
        }
        if(val==2){
            dashboard.bind(controlWrap,wrapper);
        }
         dashboard.draw(data);
    }
}//end handler
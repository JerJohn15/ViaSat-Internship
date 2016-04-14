/**
 * Created by eweng on 8/12/2015.
 */

    var queryText = "SELECT 'time','subs' FROM 1-BIpyEwzBhrz3Dg3bLJX2B3O3JLhNrC6NBmoIJKY";
        title = "Response Time vs. Date/Time";
    var apiKey = "&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
    var query = new google.visualization.Query(
        'https://www.googleapis.com/fusiontables/v1/query?sql=' + encodeURIComponent(queryText) + apiKey + '&callback=handlerLine2');
    query.send();

function handlerLine2(response) {

    google.setOnLoadCallback(draw());
    function draw() {
        //var dataView = new google.visualization.DataView(data);
        //dataView.setColumns([0,1]);

        var data = [];
        data.push(response.columns);
        var rows = response.rows;
        for(var i=0;i<response.rows.length;i++){
            rows[i][1]+=".0";
        }
        data = data.concat(rows);
        data = google.visualization.arrayToDataTable(data);

        var options = {
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

        var wrapper = new google.visualization.ChartWrapper({
            containerId:"line2",
            chartType:'Line',
            'options':google.charts.Line.convertOptions(options),
            dataTable:data
        });
wrapper.draw();
    }
}//end handler
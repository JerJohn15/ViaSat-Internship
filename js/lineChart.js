/**
 * Created by eweng on 7/27/2015.
 */

var queryText = "SELECT 'timestamp', 'upload', 'download' , 'latency','serverName' FROM " +
    "1HTPwELCkeMZRG7Afkt2bmOmITmBWZ7GttKne7F1_";
var apiKey ="&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
var query = new google.visualization.Query(
    'https://www.googleapis.com/fusiontables/v1/query?sql='+encodeURIComponent(queryText)+apiKey+'&callback=handlerLine');
query.send();

function handlerLine(response){

    google.setOnLoadCallback(draw);
    function draw(){

        var data=[];
        data.push(response.columns);
        var rows=response.rows;
        var formatter = new google.visualization.DateFormat({pattern: "MMMM d, ''yy"});
        for (var index= 0; index<rows.length;index++){
            rows[index][0]=new Date(rows[index][0]);
        }
        rows.sort(function(a,b){return a[0] - b[0];});
        data=data.concat(rows);
        data=google.visualization.arrayToDataTable(data);

        var options={
            //title: 'Upload and Download Speeds',
            //pointSize: 3,
            //curveType:'function',
            //legend:{position: 'top'},
            chart: {
                title: 'Upload and Download Speeds',
                subtitle: 'Raspberry Pis'
            },
            width: 800,
            height: 500,
            series: {0: {axis: 'upload'},1: {axis: 'download'}},
            axes: {
                x:{0: {side: 'bottom',label:'Date'}},
                y: {
                    upload: {label: 'Upload Speed (MBps)'},download: {label: 'Download Speed (MBps)'},//latency:{label:"Latency (ms)"}
                }
            },
            backgroundColor: {fill:"white"},

        };

        var chart = new google.charts.Line(document.getElementById('line'));
        chart.draw(data, google.charts.Line.convertOptions(options));

        /*var dashboard = new google.visualization.Dashboard(document.getElementById('lineDashboard'));
        var controlWrap = new google.visualization.ControlWrapper({
            'controlType': 'NumberRangeFilter',
            'containerId': 'lineRange',
            'options': {
                'filterColumnIndex': 1,
                //'minValue': 1,
                //'maxValue': 10
            }
        });
        var controlWrap2 = new google.visualization.ControlWrapper({
            'controlType': 'CategoryFilter',
            'containerId': 'lineDropdown',
            options:{
                filterColumnLabel:'upload'
            }
        });

        var wrapper = new google.visualization.ChartWrapper({
            containerId:"line",
            chartType:'LineChart',
            "refreshInterval": 5,
            'options':google.charts.Line.convertOptions(options),
        });

        dashboard.bind([controlWrap,controlWrap2],wrapper);
        dashboard.draw(data);*/
    }
}
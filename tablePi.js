/**
 * Created by eweng on 7/27/2015.
 */

//drawTable();
//function drawTable(){

var queryText = "SELECT 'date','runIteration','responseTime','website','latitude','longitude', 'modemSwVersion', 'modemHwRevision', 'macAddress' FROM " +
    "1ra6ZZmVhrCKJwprhfvqOBBQYv7-ABglEJZ6jYnCE";
/*var serverName = document.getElementById('name').value;
 if(serverName!=="hi"){
 queryText+="WHERE 'serverName' = '"+serverName+"'";
 }*/
var apiKey ="&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
var query = new google.visualization.Query(
    'https://www.googleapis.com/fusiontables/v1/query?sql='+encodeURIComponent(queryText)+apiKey+'&callback=handler');
query.send();

//}//end drawTable
function handler(response){

    google.setOnLoadCallback(drawDashboard);
    function drawDashboard(){

        var dashboard = new google.visualization.Dashboard(document.getElementById('table_dash'));

        var data=[];
        data.push(response.columns);
        data=data.concat(response.rows);
        var formatter = new google.visualization.DateFormat({pattern: "MMM d, ''yy"});

        for (var index= 1; index<data.length;index++){
            data[index][0]=new Date(data[index][0]);
        }

        data=google.visualization.arrayToDataTable(data);
        formatter.format(data, 0);

        var controlWrapper = new google.visualization.ControlWrapper({
            containerId:"table_range1",
            controlType:"DateRangeFilter",
            options: {
                filterColumnIndex:0,
                'ui':{
                    label:'Date:\xA0\xA0\xA0\xA0\xA0',
                },
            },
        });
        var controlWrapper2 = new google.visualization.ControlWrapper({
            containerId:"table_range2",
            controlType:"NumberRangeFilter",
            options: {
                filterColumnIndex:2,
                'ui':{
                    label:'Run Iteration:\xA0\xA0\xA0\xA0',
                },
            },
        });
        var controlWrapper3 = new google.visualization.ControlWrapper({
            containerId:"table_range3",
            controlType:"NumberRangeFilter",
            options: {
                filterColumnIndex:2,
                'ui':{
                    label:'Response Time:',
                },
            },
        });
        var dropdownWrap = new google.visualization.ControlWrapper({
            containerId:"table_dropdown",
            controlType:"CategoryFilter",
            options: {
                filterColumnIndex:8,
                'ui':{
                    label:'MAC Address:\xA0\xA0',
                },
            },
        });
        var chartWrapper = new google.visualization.ChartWrapper({
            "containerId": "table",
            "chartType": "Table",
            "options": {
                showRowNumber: true,
                'width': '100%',
                'height': '100%',
                allowHTML:true,
            }
        });

        dashboard.bind([controlWrapper,controlWrapper2,controlWrapper3,dropdownWrap], chartWrapper);
        dashboard.draw(data);
    }//end drawDashboard
}//end handler

//https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20'timestamp'%2C'latitude'%2C'longitude'%2C%20'upload'%2C%20'download'%2C%20'latency'%2C'serverName'%2C'intIP'%2C%20'extIP'%20FROM%201HTPwELCkeMZRG7Afkt2bmOmITmBWZ7GttKne7F1_&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk&callback=draw/**

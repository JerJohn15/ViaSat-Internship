/**
 * Created by eweng on 7/27/2015.
 */

//drawTable();
//function drawTable(){

    var queryText = "SELECT 'timestamp','latitude','longitude', 'upload', 'download', 'latency','serverName','intIP', 'extIP' FROM " +
        "1HTPwELCkeMZRG7Afkt2bmOmITmBWZ7GttKne7F1_";
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

        var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));

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
                filterColumnIndex:3,
                'ui':{
                    label:'Upload Speed:\xA0\xA0\xA0\xA0',
                },
            },
        });
        var controlWrapper3 = new google.visualization.ControlWrapper({
            containerId:"table_range3",
            controlType:"NumberRangeFilter",
            options: {
                filterColumnIndex:4,
                'ui':{
                    label:'Download Speed:',
                },
            },
        });
        var dropdownWrap = new google.visualization.ControlWrapper({
            containerId:"table_dropdown",
            controlType:"CategoryFilter",
            options: {
                filterColumnIndex:6,
                'ui':{
                    label:'Server Name:\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0',
                },
            },
        });
        var chartWrapper = new google.visualization.ChartWrapper({
            "containerId": "table",
            "chartType": "Table",
            "options": {
                showRowNumber: true,
                'width': '100%',
                'height': '100%'}
        });

        dashboard.bind([controlWrapper,controlWrapper2,controlWrapper3,dropdownWrap], chartWrapper);
        dashboard.draw(data);
    }//end drawDashboard
}//end handler

//https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20'timestamp'%2C'latitude'%2C'longitude'%2C%20'upload'%2C%20'download'%2C%20'latency'%2C'serverName'%2C'intIP'%2C%20'extIP'%20FROM%201HTPwELCkeMZRG7Afkt2bmOmITmBWZ7GttKne7F1_&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk&callback=draw
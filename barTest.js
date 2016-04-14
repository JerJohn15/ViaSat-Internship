/**
 * Created by eweng on 8/5/2015.
 */

google.setOnLoadCallback(drawBar(1));

function drawBar(value) {
    val = value;
    var queryText= "SELECT 'url','coldView','warmView','siteAverage' FROM 15mGURXxMmRLFXokW4gnBrF-bVKnQT9jlc7kEG4f3";
    var apiKey = "&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
    var query = new google.visualization.Query(
        'https://www.googleapis.com/fusiontables/v1/query?sql=' + encodeURIComponent(queryText) + apiKey + '&callback=handlerBar');
    query.send();
}

function handlerBar(response) {

    google.setOnLoadCallback(draw());
    function draw() {

        var data = [];
        data.push(response.columns);
        var rows = response.rows;
        rows.sort(function(a,b){return a[val] - b[val];});
        data = google.visualization.arrayToDataTable(data.concat(rows));

        var view = new google.visualization.DataView(data);
        if(val==1) {
            view.setColumns([0, 1]);
            var title = "Cold View Response Times for various websites";
        }
        if(val==2) {
            view.setColumns([0, 2]);
            title = "Warm View Response Times for various websites";
        }
        if(val==3) {
            view.setColumns([0, 3]);
            title = "Site Average Response Times for various websites";
        }

        options = {
            legend:{position: "none"},
            chart: {title: title},
            width: 800,
            height: 500,
            backgroundColor: {fill: "white"},
            hAxis: {title:"URLs of Website"},
            vAxis: {title:"Response Time"}
        };

        var controlWrap = new google.visualization.ControlWrapper({
            'controlType': 'NumberRangeFilter',
            'containerId': 'bar_range',
            'options': {'filterColumnIndex':1,ui:{label:'Values:\xA0\xA0\xA0'}}
        });
        var controlWrap2 = new google.visualization.ControlWrapper({
            'controlType': 'CategoryFilter',
            'containerId': 'bar_dropdown',
            options:{filterColumnIndex:0,ui:{label:'URL:\xA0\xA0\xA0',allowTyping:false}}
        });

        var wrapper = new google.visualization.ChartWrapper({
            containerId:"bar",
            chartType:'Bar',
            'options':google.charts.Bar.convertOptions(options)
        });

        var dashboard = new google.visualization.Dashboard(document.getElementById('bar_dash'));
        dashboard.bind([controlWrap, controlWrap2],wrapper);
        dashboard.draw(view);
    }
}//end handler
/**
 * Created by eweng on 8/5/2015.
 */



    var queryText= "SELECT 'website','responseTime' FROM 1ra6ZZmVhrCKJwprhfvqOBBQYv7-ABglEJZ6jYnCE";
    var apiKey = "&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
    var query = new google.visualization.Query(
        'https://www.googleapis.com/fusiontables/v1/query?sql=' + encodeURIComponent(queryText) + apiKey + '&callback=handlerBar');
    query.send();


function handlerBar(response) {

    google.setOnLoadCallback(draw());
    function draw() {

        var data=[["category","value"],["0.8-0.85"],["0.85-0.87"],["0.87-0.88"],["0.88-0.91"],["0.91-1.0"],["1.0-1.2"],["1.2-1.9"],["1.9-2.0"]];

        var a=0, b=0, c=0, d= 0,e= 0,f= 0,g= 0,h=0;
        //var cola="",colb="",colc="",cold="",cole="",colf="";
        for(var i= 0; i<response.rows.length;i++){
            if(response.rows[i][1]<.85&&response.rows[i][1]>=.8){
                a++;
            }
            if(response.rows[i][1]<.87&&response.rows[i][1]>=.85){
                b++;
            }
            if(response.rows[i][1]<.88&&response.rows[i][1]>=.87){
                c++;
            }
            if(response.rows[i][1]<.91&&response.rows[i][1]>=.88){
                d++;
            }
            if(response.rows[i][1]<1&&response.rows[i][1]>=.91){
                e++;
            }
            if(response.rows[i][1]<1.2&&response.rows[i][1]>=1){
                f++;
            }
            if(response.rows[i][1]<1.9&&response.rows[i][1]>=1.2){
                g++;
            }
            if(response.rows[i][1]<2&&response.rows[i][1]>=1.9){
                h++;
            }
        }

        data[1][1]=a;
        data[2][1]=b;
        data[3][1]=c;
        data[4][1]=d;
        data[5][1]=e;
        data[6][1]=f;
        data[7][1]=g;
        data[8][1]=h;

        data= google.visualization.arrayToDataTable(data);
        //data.addColumn({role:"tooltip", type:"string"});

        /*data.setCell(0,2,cola);
        data.setCell(1,2,colb);
        data.setCell(2,2,colc);
        data.setCell(3,2,cold);
        data.setCell(4,2,cole);
        data.setCell(5,2,colf);*/

        //var view = new google.visualization.DataView(data);
        //view.setColumns([0,1,{type:'string', role:'tooltip'}]);

        var options = {
            legend:{ position: "none" },
            chart: {title: "hi"},
            width: 800,
            height: 500,
            backgroundColor: {fill: "white"},
            trendlines: {
                0: {
                    type: 'polynomial',
                    color: 'blue',
                    lineWidth: 3,
                }
            }
        };

        //var chart = new google.charts.Line(document.getElementById('line'));
        //chart.draw(data, google.charts.Line.convertOptions(options));

        var controlWrap = new google.visualization.ControlWrapper({
            'controlType': 'NumberRangeFilter',
            'containerId': 'bar_range',
            'options': {'filterColumnIndex':1}
        });

            var controlWrap2 = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'bar_dropdown',
                options:{filterColumnIndex:1,ui:{allowTyping:false}}
            });

        var wrapper = new google.visualization.ChartWrapper({
            containerId:"bar",
            chartType:'Bar',
            'options':google.charts.Bar.convertOptions(options)
        });

        var dashboard = new google.visualization.Dashboard(document.getElementById('bar_dash'));
        dashboard.bind([controlWrap, controlWrap2],wrapper);
        dashboard.draw(data);
    }
}//end handler
/**
 * Created by eweng on 8/11/2015.
 */

var queryText= "SELECT 'time','subs' FROM 1-BIpyEwzBhrz3Dg3bLJX2B3O3JLhNrC6NBmoIJKY";
var apiKey = "&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
var query = new google.visualization.Query(
    'https://www.googleapis.com/fusiontables/v1/query?sql=' + encodeURIComponent(queryText) + apiKey + '&callback=handlerBellJet');
query.send();


function handlerBellJet(response) {

    google.setOnLoadCallback(draw());
    function draw() {

        var data=[["category","value"],["0-150"],["150-300"],["300-450"],["450-600"],["600-750"],["750-900"],["900-1050"],["1050-1200"],["1200-1350"],["1350-1500"],["1500-1650"],["1650-1800"]];

        var a=0, b=0, c=0, d= 0,e= 0,f= 0,g= 0,h= 0,i= 0,j= 0,k= 0,l=0;
        //var cola="",colb="",colc="",cold="",cole="",colf="";
        for(var x= 0; x<response.rows.length;x++){
            if(response.rows[x][1]<150&&response.rows[x][1]>=0){
                a++;
            }
            if(response.rows[x][1]<300&&response.rows[x][1]>=150){
                b++;
            }
            if(response.rows[x][1]<450&&response.rows[x][1]>=300){
                c++;
            }
            if(response.rows[x][1]<600&&response.rows[x][1]>=450){
                d++;
            }
            if(response.rows[x][1]<750&&response.rows[x][1]>=600){
                e++;
            }
            if(response.rows[x][1]<900&&response.rows[x][1]>=750){
                f++;
            }
            if(response.rows[x][1]<1050&&response.rows[x][1]>=900){
                g++;
            }
            if(response.rows[x][1]<1200&&response.rows[x][1]>=1050){
                h++;
            }
            if(response.rows[x][1]<1350&&response.rows[x][1]>=1200){
                i++;
            }
            if(response.rows[x][1]<1500&&response.rows[x][1]>=1350){
                j++;
            }
            if(response.rows[x][1]<1650&&response.rows[x][1]>=1500){
                k++;
            }
            if(response.rows[x][1]<1800&&response.rows[x][1]>=1650){
                l++;
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
        data[9][1]=i;
        data[10][1]=j;
        data[11][1]=k;
        data[12][1]=l;

        data= google.visualization.arrayToDataTable(data);

        var options = {
            legend:{ position: "none" },
            chart: {title: "Anonymous Anonymous"},
            width: 800,
            height: 500,
            backgroundColor: {fill: "white"},
            trendlines: {
                0: {
                    type: 'polynomial',
                    color: 'blue',
                    lineWidth: 3
                }
            }
        };

/*
        var controlWrap = new google.visualization.ControlWrapper({
            'controlType': 'NumberRangeFilter',
            'containerId': 'bell-jet_range',
            'options': {'filterColumnIndex':1}
        });

        var controlWrap2 = new google.visualization.ControlWrapper({
            'controlType': 'CategoryFilter',
            'containerId': 'bell-jet_dropdown',
            options:{filterColumnIndex:1,ui:{allowTyping:false}}
        });
*/
        var wrapper = new google.visualization.ChartWrapper({
            containerId:"bell-jet",
            chartType:'Bar',
            'options':google.charts.Bar.convertOptions(options),
            dataTable:data
        });

        wrapper.draw();

        /*var dashboard = new google.visualization.Dashboard(document.getElementById('bell-jet_dash'));
        dashboard.bind([controlWrap, controlWrap2],wrapper);
        dashboard.draw(data);*/
    }
}//end handler
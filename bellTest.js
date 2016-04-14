/**
 * Created by eweng on 8/7/2015.
 */

google.setOnLoadCallback(drawBell(1));
function drawBell(value){
    val=value;
    var queryText= "SELECT 'url','coldView'  FROM 15mGURXxMmRLFXokW4gnBrF-bVKnQT9jlc7kEG4f3";//'coldView', 'warmView','siteMedian',
    var apiKey = "&key=AIzaSyB9lGkRr185Oen4WlR7gTYxzFYoNQ0cfSk";
    var query = new google.visualization.Query(
        'https://www.googleapis.com/fusiontables/v1/query?sql=' + encodeURIComponent(queryText) + apiKey + '&callback=handlerBell');
    query.send();
}

function setData(response){
    var resp=response;
    if (val==1){
        return drawData(resp);
    }
    else if (val==2){
        return drawData2(resp);
    }
}
function drawData(response){
    var data=[["category","value"],["0-4k",0],["4-8k",0],["8-12k",0],["12-16k",0]];

    var a=0, b=0, c=0, d=0;
    var cola="",colb="",colc="",cold="";
    for(var i= 0; i<response.rows.length;i++){
        if(response.rows[i][1]<4000&&response.rows[i][1]>=0){
            a++;
            cola+=response.rows[i][0]+=": ";
            cola+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<8000&&response.rows[i][1]>=4000){
            b++;
            colb+=response.rows[i][0]+=": ";
            colb+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<12000&&response.rows[i][1]>=8000){
            c++;
            colc+=response.rows[i][0]+=": ";
            colc+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<16000&&response.rows[i][1]>=12000){
            d++;
            cold+=response.rows[i][0]+=": ";
            cold+=response.rows[i][1]+="\n";
        }
    }
    data[1][1]=a;
    data[2][1]=b;
    data[3][1]=c;
    data[4][1]=d;

    data= google.visualization.arrayToDataTable(data);
    data.addColumn({role:"tooltip", type:"string"});

    data.setCell(0,2,cola);
    data.setCell(1,2,colb);
    data.setCell(2,2,colc);
    data.setCell(3,2,cold);
    return data;
}
function drawData2(response){
    var data=[["category","value"],["0-2k",0],["2-4k",0],["4-6k",0],["6-8k",0],["8-10k",0],["10-12k",0],["12-14k",0],["14-16k",0]];

    var a=0, b=0, c=0, d= 0,e= 0,f= 0,g= 0,h=0;
    var cola="",colb="",colc="",cold="",cole="",colf="",colg="",colh="";
    for(var i= 0; i<response.rows.length;i++){
        if(response.rows[i][1]<2000&&response.rows[i][1]>=0){
            a++;
            cola+=response.rows[i][0]+=": ";
            cola+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<4000&&response.rows[i][1]>=2000){
            b++;
            colb+=response.rows[i][0]+=": ";
            colb+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<6000&&response.rows[i][1]>=4000){
            c++;
            colc+=response.rows[i][0]+=": ";
            colc+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<8000&&response.rows[i][1]>=6000){
            d++;
            cold+=response.rows[i][0]+=": ";
            cold+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<10000&&response.rows[i][1]>=8000){
            e++;
            cole+=response.rows[i][0]+=": ";
            cole+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<12000&&response.rows[i][1]>=10000){
            f++;
            colf+=response.rows[i][0]+=": ";
            colf+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<14000&&response.rows[i][1]>=12000){
            g++;
            colg+=response.rows[i][0]+=": ";
            colg+=response.rows[i][1]+="\n";
        }
        if(response.rows[i][1]<16000&&response.rows[i][1]>=14000){
            h++;
            colh+=response.rows[i][0]+=": ";
            colh+=response.rows[i][1]+="\n";
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
    data.addColumn({role:"tooltip", type:"string"});

    data.setCell(0,2,cola);
    data.setCell(1,2,colb);
    data.setCell(2,2,colc);
    data.setCell(3,2,cold);
    data.setCell(4,2,cole);
    data.setCell(5,2,colf);
    data.setCell(6,2,colg);
    data.setCell(7,2,colh);
    return data;
}

function handlerBell(response) {
    google.setOnLoadCallback(draw());
    function draw() {
        var options = {
            title: 'Cold View',
            legend:{position: "none"},
            width: 800,
            height: 500,
            backgroundColor: {fill: "white"},
            hAxis: {title:"Cold View Response Time"},
            vAxis: {title:"Number of Websites with given Response Time"}
        };
        var wrapper = new google.visualization.ChartWrapper({
            containerId:"bell",
            chartType:'ColumnChart',
            'options':options,
            dataTable:setData(response)
        });
        wrapper.draw();
    }
}//end handler
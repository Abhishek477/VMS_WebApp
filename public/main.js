//const jsdom = require('jsdom');
//const{
//    JSDOM
//} = jsdom;

//global.document = new JSDOM('index').window.document;
var form = document.getElementById('vote-form');

function updateTextInput(val,wwhich) {
    document.getElementById(wwhich).value=val; 
}
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

if(form) {
    form.addEventListener('submit', function (e) {

        var choice1 = document.querySelector('input[id=Q1]').value;
        var name1 = document.querySelector('input[id=Q1]').className;
        var choice2 = document.querySelector('input[id=Q2]').value;
        var name2 = document.querySelector('input[id=Q2]').className;
        var choice3 = document.querySelector('input[id=Q3]').value;
        var name3 = document.querySelector('input[id=Q3]').className;
        var choice4 = document.querySelector('input[id=Q4]').value;
        var name4 = document.querySelector('input[id=Q4]').className;

        var data = {
            os1:choice1,
            os2:choice2,
            os3:choice3,
            os4:choice4,
            nm1 : name1,
            nm2 : name2,
            nm3 : name3,
            nm4 : name4
        };
        console.log(data);


        fetch('http://192.168.43.249:3000/users', {
            method: 'post',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err=>console.log(err));
        e.preventDefault();
        
        document.location.reload(true);
        alert("Thanks for voting!");
    });
}

function  npsScore1( array,total) {
    var attr =0 , dttr=0 ;
    for ( var i =0 ; i < array.length ; i++)
    {
        if( parseInt(array[i].points1) >= 9)
        {
            attr += 1;
        }
        else if (parseInt(array[i].points1) < 7)
        {
            dttr += 1;
        }
    }
    var nps = (attr/total)*100 - (dttr/total)*100;
    return nps;
}
function  npsScore2( array,total) {
    var attr =0 , dttr=0 ;
    for ( var i =0 ; i < array.length ; i++)
    {
        if( parseInt(array[i].points2) >= 9)
        {
            attr += 1;
        }
        else if (parseInt(array[i].points2) < 7)
        {
            dttr += 1;
        }
    }
    var nps = (attr/total)*100 - (dttr/total)*100;
    return nps;
}
function  npsScore3( array,total) {
    var attr =0 , dttr=0 ;
    for ( var i =0 ; i < array.length ; i++)
    {
        if( parseInt(array[i].points3) >= 9)
        {
            attr += 1;
        }
        else if (parseInt(array[i].points3) < 7)
        {
            dttr += 1;
        }
    }
    var nps = (attr/total)*100 - (dttr/total)*100;
    return nps;
}
function  npsScore4( array,total) {
    var attr =0 , dttr=0 ;
    for ( var i =0 ; i < array.length ; i++)
    {
        if( parseInt(array[i].points4) >= 9)
        {
            attr += 1;
        }
        else if (parseInt(array[i].points4) < 7)
        {
            dttr += 1;
        }
    }
    var nps = (attr/total)*100 - (dttr/total)*100;
    return nps;
}


fetch("http://192.168.43.249:3000/users")
    .then( res => res.json())
    .then( data => {
        var votes = data.votes ;
        var totalVotes = data.length;

        var voteCounts1 = votes.reduce(
            (acc , vote) => (
            (acc[vote.os1] = (acc[vote.os1] || 0) + parseInt(vote.points1)), acc ) ,{});
        var voteCounts2 = votes.reduce(
            (acc , vote) => (
            (acc[vote.os2] = (acc[vote.os2] || 0) + parseInt(vote.points2)), acc ) ,{});
        var voteCounts3 = votes.reduce(
            (acc , vote) => (
            (acc[vote.os3] = (acc[vote.os3] || 0) + parseInt(vote.points3)), acc ) ,{});
        var voteCounts4 = votes.reduce(
            (acc , vote) => (
            (acc[vote.os4] = (acc[vote.os4] || 0) + parseInt(vote.points4)), acc ) ,{});

    var name1 = document.querySelector('input[id=Q1]').className;
    var name2 = document.querySelector('input[id=Q2]').className;
    var name3 = document.querySelector('input[id=Q3]').className;
    var name4 = document.querySelector('input[id=Q4]').className;

let dataPoints = [
    { label : name1, y: npsScore1( votes, votes.length)},
    { label : name2, y: npsScore2( votes, votes.length)},
    { label : name3, y: npsScore3( votes, votes.length)},
    { label : name4, y: npsScore4( votes, votes.length)},

];


var chartContainer = document.querySelector('#chartContainer');

if(chartContainer){
    var chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled : true,
        theme : 'theme3',
        title: { text: `Total Responses : ${votes.length}`},
        axisY: {
            title: "NP Score",
            suffix: ".0",
            includeZero: true
        },
        axisX: {
            title: "FEEDBACK"
        },
        data : [
            {
                type : 'column',
                dataPoints : dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('4e94b627fd5fa993dcef', {
        cluster: 'ap2',
        encrypted: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data)
    {
        console.log(data);
        dataPoints = dataPoints.map( function (x) {
            if(x.label == data.os1){
                x.y = npsScore1(votes, votes.length);
                return x;
            }
            else if(x.label == data.os2){
                x.y = npsScore2(votes, votes.length);
                return x;
            }
            else if(x.label == data.os3){
                x.y = npsScore3(votes , votes.length);
                return x;
            }
            else if(x.label == data.os4){
                x.y = npsScore4(votes , votes.length);
                return x;
            }
            else
            {
                console.log("false")
                return x;
            }
        });
        chart.render();
    });
}

});

/*let dataPoints = [
    { label : 'windows', y: 0},
    { label : 'macos', y: 0},
    { label : 'linux', y: 0},
    { label : 'others', y: 0},
];

var chartContainer = document.querySelector('#chartContainer');

if(chartContainer){
    var chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled : true,
        theme : 'theme1',
        title: { text: 'OS Results'},
        data : [
            {
                type : 'bar',
                dataPoints : dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('4e94b627fd5fa993dcef', {
        cluster: 'ap2',
        encrypted: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data)
    {
        console.log(data);
        dataPoints = dataPoints.map( function (x) {
            if(x.label == data.os1){
                x.y += parseInt(data.points1);
                return x;
            }
            else if(x.label == data.os2){
                x.y += parseInt(data.points2);
                return x;
            }
            else if(x.label == data.os3){
                x.y += parseInt(data.points3);
                return x;
            }
            else if(x.label == data.os4){
                x.y += parseInt(data.points4);
                return x;
            }
            else
            {
                console.log("false")
                return x;
            }
        });
        chart.render();
    });

}

*/



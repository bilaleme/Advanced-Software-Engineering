
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(messages) {
    if(messages != null) {
        var arr = [['Message', 'Positive', 'Negative']];

        console.log(messages);
        for (x in messages) {
            console.log(messages[x].message);
            arr.push([messages[x].message, parseFloat(messages[x].positive), parseFloat(messages[x].negative)]);
        }

        var data = google.visualization.arrayToDataTable(arr);

        var options = {
            title: 'Messages Trend',
            curveType: 'function',
            legend: {position: 'bottom'}
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
    }
    else {

    }
}


var app = angular.module('sentiment',[]);

app.controller('tableController',function($scope,$http){

    fbdb.on('value', function(snapshot){
        $scope.messages = snapshot.val();
        drawChart(snapshot.val());
        $scope.$apply();
    });

    $scope.callRest = function(query){
        myUrl  = 'http://127.0.0.1:8081/pushMessage';

        $http({
            method:'GET',
            url:myUrl+'?text='+query,
        }).then(function(response){
            console.log(response);
            $scope.query = '';
            $scope.response = "Operation done successfully !"
        });
    }



});
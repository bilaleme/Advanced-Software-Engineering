

viewId = -1;

angular.module('starter.service',[])

.controller('test',function($scope,$http){

    $scope.cAlert = function(){
        alert(this.uName + ' ' + this.email);
        this.uName = '';
        this.email = '';
    }
    $scope.temp = getTemplate();
    $scope.call = function(valu){
        if(valu == undefined){
            valu = -1;
        }
        
        if(valu == 0){
            $scope.positive = 0;
            $scope.negative = 0;
        }
        
        viewId = valu;
        $scope.temp = getTemplate();
        console.log(valu);
    }
    
    $scope.sentiment = function(){
    $http.get('https://api.uclassify.com/v1/uClassify/Sentiment/classify',{
        params:{
            readKey:'jQ6SEmI3Kgrl',
            text: this.query
        }
    })
    .then(function(response){
        $scope.positive = response.data.positive;
        $scope.negative = response.data.negative;
    });
        
    $http.get('https://api.uclassify.com/v1/uClassify/topics/classify',{
        params:{
            readKey:'jQ6SEmI3Kgrl',
            text: this.query
        }
    })
    .then(function(response){
        
        list = [];
        
        max = -1;
        ind = -1;
        for(y=0;y<5;y++){
        
            for(x in response.data){
                if(response.data[x] > max){
                    max = response.data[x];
                    ind = x;
                }
            }
            
            list.push([ind,Math.round(response.data[ind]*100)]);
            delete response.data[ind];
            max = -1;
            
        }
        
        $scope.items = list;
    });
        
    
    }
})

function getTemplate(){
    console.log('bilal');
    root = "templates/";
    switch(viewId)
    {
        case 0:
          return root+"home.html";
        case 1:
          return root+"register.html";
        default:
          return root+"login.html";
    }   
}


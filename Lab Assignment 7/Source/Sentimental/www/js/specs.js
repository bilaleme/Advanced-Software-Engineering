

result = null;
resp = null;

result1 = null;
resp1 = null;

$.ajax({
   url:'https://api.uclassify.com/v1/uClassify/Sentiment/classify?' + 'readKey=' + 'jQ6SEmI3Kgrl&' + 'text=' + "I am feeling happy",
   success:function(response){
       result = response !== null;
       resp = response;
   },
   async : false
});

$.ajax({
   url:'https://api.uclassify.com/v1/uClassify/topics/classify' + 'readKey=' + 'jQ6SEmI3Kgrl&' + 'text=' + "I am feeling sports",
   success:function(response){
       result1 = response !== null;
       resp1 = response;
   },
   async : false
});



describe('Web infrastructure test cases',function(){
   
        it('Checks for the sentiment results returned from the service',function(){
                expect(result).toBe(true);
        });
    
        it('Checks for positive and negative keys in the response',function(){
                expect(resp.positive !== null && resp.negative !== null).toBe(true);
        });
    
        it('It checks for the successful execution of the topics service',function(){
                expect(result1 !== null).toBe(true);
        });
    
        it('Checks for sample Games topic in the response',function(){
                expect(resp1.game !== null).toBe(true);
        });
    
});
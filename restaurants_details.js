var urlParams = new URLSearchParams(window.location.search);

//get restaurant id
var r_id=urlParams.get('r_id');

//to get restaurant's details
var a = new XMLHttpRequest();
a.open("GET", "https://developers.zomato.com/api/v2.1/restaurant?res_id="+r_id,true);
a.setRequestHeader('Accept', 'application/json');
a.setRequestHeader('user-key','36f0d5e50d2bd8f1ff1e8a8d087dddc4');

//to get reviews
var q = new XMLHttpRequest();
q.open("GET", "https://developers.zomato.com/api/v2.1/reviews?res_id="+r_id,true);
q.setRequestHeader('Accept', 'application/json');
q.setRequestHeader('user-key','36f0d5e50d2bd8f1ff1e8a8d087dddc4');

var response,i,r_request,user_name,review_text, reviews,user_profile;
var button=document.createElement('button');

a.onload = function ()
    {
        if (a.status == 200)
        {
        response=JSON.parse(a.responseText);

        //get details of restaurant
        detail();   
        }
    }
    a.send();
    
    function detail()
    {
        var y=document.getElementById("details");
        var div1=document.createElement('div');
        div1.setAttribute('id','detailed_image');
        var table=document.createElement('table');
        table.setAttribute('id','table_details');
        table.setAttribute('cellpadding','10px');

        //get restaurant's image
        var restaurant_img=document.createElement('img');
        restaurant_img.setAttribute('id','image_detail');
        restaurant_img.src=response.featured_image;

        //get restaurant's name
        var tr1=document.createElement('tr');
        var td1=document.createElement('td');
        td1.setAttribute('id','rest_name');
        var restaurant_name=document.createTextNode(response.name);
        td1.appendChild(restaurant_name);

        //get restaurant's rating
        var tr2=document.createElement('tr');
       var td3=document.createElement('td');
       td3.setAttribute('id','rest_reviews')
        var restaurant_rating=document.createTextNode(response.user_rating.aggregate_rating);
        td3.appendChild(restaurant_rating);

        //get restaurant's votes
        var restaurant_votes=document.createTextNode(" ("+response.user_rating.votes+") ");
        td3.appendChild(restaurant_votes);


        var td2=document.createElement('td');
        td2.setAttribute('id','like');
        td2.setAttribute('align','right');
        button.setAttribute('name','\u1F44D');
        button.setAttribute('id','like_button');

        //button.setAttribute('value','on');
        var values=document.createTextNode("Like");
        button.appendChild(values);
        button.setAttribute('value','like');
        button.setAttribute('onclick',"like();");
	 if(window.localStorage.getItem(r_id))
  {
 button.style.background=("rgb(0, 128, 255)"); 
   
  }
  else
  {
       button.style.background=("rgb(255, 255, 255)");
  }
        td2.appendChild(button);

       
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr2.appendChild(td3);

        table.appendChild(tr1);
        
        div1.appendChild(restaurant_img);
        y.appendChild(div1);

        //get cost of restaurant for 2
        var div2=document.createElement('div');
        div2.setAttribute('id','cost');
        var text21=document.createTextNode("Cost for 2 : ");
        var text22=document.createTextNode(response.average_cost_for_two);
        div2.appendChild(text21);
        div2.appendChild(text22);
        
        //get restaurant's reviews
        q.onload = function ()
                {
                     if (q.status == 200)
                     {
                        r_request=JSON.parse(q.responseText);
                          reviews=document.createElement('span');

                          //get Review Count
                         var review=document.createTextNode("| "+r_request.reviews_count+"reviews");
                         td3.appendChild(review);
                         tr2.appendChild(td3);
                         table.appendChild(tr2);
                        

                        //get user's details
                         for(var i=0;i<2;i++)
                         {
                            var div3=document.createElement('div');
                            div3.setAttribute('id','user');
                            
                             user_name=document.createElement('span');
                             u_name=document.createTextNode(r_request.user_reviews[i].review.user.name);
                             user_name.setAttribute('id','user_name');
                             user_name.appendChild(u_name);
                             review_text=document.createTextNode(r_request.user_reviews[i].review.review_text);
                             user_profile=document.createElement('img');
                             user_profile.setAttribute('id','user_image');
                             user_profile.src=r_request.user_reviews[i].review.user.profile_image;
                             var div31=document.createElement('div');
                             div31.setAttribute('id','user_profile');
                             div31.appendChild(user_profile);
                             div31.appendChild(user_name);
                             var rating_stars=document.createElement('div');
                             var u_rating=(Number)(r_request.user_reviews[i].review.rating);
                            var star=" ";
                             for(var k=0;k<u_rating;k++)
                             {
                                 star="\u2605";
                                 var stars=document.createTextNode(star);
                                 rating_stars.appendChild(stars);
                             }
                            
                             for(var j=u_rating;j<5;j++)
                             {
                                 star="\u2606";
                                 var stars=document.createTextNode(star);
                                 rating_stars.appendChild(stars);
                             }
                             div31.appendChild(rating_stars);
                    

                             div3.appendChild(div31);
                            // div3.appendChild(user_name);
                             div3.appendChild(review_text);
                             y.appendChild(div3);

                            
                         }
                         var all_review=document.createElement('div');
                         var a_review=document.createElement('a');
                         var all_reviews=document.createElement('span');
                         var text=document.createTextNode("See more reviews");
                         all_review.setAttribute('id','div_review');
                         all_reviews.setAttribute('id','a_review');
                         all_reviews.appendChild(text);
                         a_review.appendChild(all_reviews);
                         a_review.setAttribute('href','reviews.html?r_id='+r_id)
                         all_review.appendChild(a_review);
                         y.appendChild(all_review);
                     }
                     

                }
                q.send();
        
        

        //get address of restaurant
        var div4=document.createElement('div');
        div4.setAttribute('id','address');
        var text31=document.createTextNode("Address:");
        var br=document.createElement('br');
        var text32=document.createTextNode(response.location.address);
        div4.appendChild(text31);
        div4.appendChild(br);
        div4.appendChild(text32);
        
         
        y.appendChild(table);
        y.appendChild(div2);
        y.appendChild(div4);
     
      
       
    }
    function like()
    {
        
  var liked=document.getElementById('like_button');
  if(window.localStorage.getItem(r_id))
  {
      liked.style.background=("rgb(255, 255, 255)");
    window.localStorage.removeItem(r_id);
    liked.value="liked";
  }
  else
  {
     liked.style.background=("rgb(0, 128, 255)"); 
     window.localStorage.setItem(r_id,'liked');
     liked.value="liked";
  }

  liked.style.border=("0px")
    }
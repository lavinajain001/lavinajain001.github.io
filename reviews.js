var urlParams = new URLSearchParams(window.location.search);
//get restaurant id
var r_id=urlParams.get('r_id');
var q = new XMLHttpRequest();
q.open("GET", "https://developers.zomato.com/api/v2.1/reviews?res_id="+r_id,true);
q.setRequestHeader('Accept', 'application/json');
q.setRequestHeader('user-key','36f0d5e50d2bd8f1ff1e8a8d087dddc4');
var r_request;

q.onload = function ()
{
     if (q.status == 200)
     {
        r_request=JSON.parse(q.responseText);
        all_reviews();
     }
}
q.send();

function all_reviews()
{
    var x=document.getElementById("reviews_all");


    //get user's details


         for(var i=0;i<5;i++)
         {
             var br1=document.createElement('br');
             var br2=document.createElement('br');
             x.appendChild(br1);
             x.appendChild(br2);
             var div3=document.createElement('div');
             div3.setAttribute('id','user_reviews');

             //get user's name
             user_name=document.createElement('span');
             u_name=document.createTextNode(r_request.user_reviews[i].review.user.name);
             user_name.setAttribute('id','user_name');
             user_name.appendChild(u_name);

             //get review text
             review_text=document.createTextNode(r_request.user_reviews[i].review.review_text);

             //get user's profile photo
             user_profile=document.createElement('img');
             user_profile.setAttribute('id','user_image');
             user_profile.src=r_request.user_reviews[i].review.user.profile_image;

             //get ratings
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

             var div31=document.createElement('div');
             div31.setAttribute('id','user_profile');
             div31.appendChild(user_profile);
             div31.appendChild(user_name);
             div31.appendChild(rating_stars);
             div3.appendChild(div31);
             div3.appendChild(review_text);
             x.appendChild(div3);
            
         }
}
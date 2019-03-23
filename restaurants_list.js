
var urlParams = new URLSearchParams(window.location.search);

//get variables.
var pno=Number(urlParams.get('pno'));
var latitude=Number(urlParams.get('lat'));
var longitude=Number(urlParams.get('lon'));  
var x=document.getElementById("restaurants_list");


//get city id
var id=urlParams.get('id'); 

//infinite paging
load(pno);
window.addEventListener("scroll",function(event) {
  var scrollHeight = this.scrollY;
  y=scrollHeight+ window.innerHeight;
  if(y > x.offsetHeight) {
  load(++pno);
  }
  });
function load(pno)
{
var r = new XMLHttpRequest();
r.open("GET", "https://developers.zomato.com/api/v2.1/search?entity_id="+id+"&entity_type=city&start="+10*(pno-1)+ "&count=10 &lat="+latitude+"&lon="+longitude+"&sort=real_distance&order=asc",true);
r.setRequestHeader('Accept', 'application/json');
r.setRequestHeader('user-key','36f0d5e50d2bd8f1ff1e8a8d087dddc4');
var request,r_request, n;
r.onload = function ()
{
    if (r.status == 200)
    {
        request=JSON.parse(r.responseText);
        n=Number(request.restaurants.length);

        //display restaurant's list in a given city
        list(0);   
    }
}
r.send();


function list(i)
{
  if(i<n)
  {
    var all_details=document.createElement('div');
               
    var br1=document.createElement('br');
    var br2=document.createElement('br');
    var r_id=request.restaurants[i].restaurant.R.res_id;

    var a=document.createElement('a');
    all_details.setAttribute('id','rest_details');
    var table=document.createElement('table');
    table.setAttribute('id','table_list');

                
    var div=document.createElement('div');
    div.setAttribute('id','restaurant');
                

    var img=document.createElement('img');
    img.setAttribute('id','image');               
    img.src=request.restaurants[i].restaurant.featured_image;
    div.appendChild(img);

              
    var table=document.createElement('table');
    table.setAttribute('id','table_list');
        
        
    //get restaurant's name
    var tr1=document.createElement('tr');
    var td1=document.createElement('td');
    td1.setAttribute('colspan','3');
    var restaurant_name=document.createTextNode(request.restaurants[i].restaurant.name);
    td1.appendChild(restaurant_name);
    td1.setAttribute('align','center');
        
    //get restaurant's rating
    var tr2=document.createElement('tr');
    var td3=document.createElement('td');
    var restaurant_rating=document.createTextNode("("+request.restaurants[i].restaurant.user_rating.aggregate_rating+")");
    td3.appendChild(restaurant_rating);
    td3.setAttribute('align','right');
        
    //get restaurant's votes
    var td4=document.createElement('td');
    var restaurant_votes=document.createTextNode(request.restaurants[i].restaurant.user_rating.votes+"votes");
    td4.appendChild(restaurant_votes);
    td4.setAttribute('align','center');
    tr1.appendChild(td1);
    tr2.appendChild(td3);
    tr2.appendChild(td4);
    table.appendChild(tr1);
               
  var q = new XMLHttpRequest();
  var reviews;
  q.open("GET", "https://developers.zomato.com/api/v2.1/reviews?res_id="+r_id,true);
  q.setRequestHeader('Accept', 'application/json');
  q.setRequestHeader('user-key','36f0d5e50d2bd8f1ff1e8a8d087dddc4');
  q.onload = function ()
  {
    if (q.status == 200)
    {
      r_request=JSON.parse(q.responseText);
      reviews=document.createElement('span');
      reviews.setAttribute('id','reviews');
      var review=document.createTextNode("| "+r_request.reviews_count+"reviews");
      reviews.appendChild(review);
      var td2=document.createElement('td');
      var td5=document.createElement('td');
      td2.setAttribute('align','left');
      td2.appendChild(reviews);
      tr2.appendChild(td2);
      tr2.appendChild(td5);
      table.appendChild(tr2);
     }

  }
  q.send();
  all_details.appendChild(table);
  all_details.appendChild(div);
  a.appendChild(all_details);
  a.setAttribute('href',"restaurants_details.html?r_id="+r_id );
               
      
  x.appendChild(br1);
  x.appendChild(br2);
  x.appendChild(a);
  list(i+1);
  }
}
}

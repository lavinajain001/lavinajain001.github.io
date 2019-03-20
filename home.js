var response, latitude, longitude;
navigator.geolocation.getCurrentPosition(show_location);
function show_location(position)
{
    //get current latitude and longitude
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

         //append latitude and longitude to links of city
         for(var i=0; i<5; i++)
         {
                 var x=document.getElementsByClassName("city")[i];
                x.href+="&lat="+latitude+"&lon="+longitude;
        }

        var r = new XMLHttpRequest();

r.open("GET", "https://developers.zomato.com/api/v2.1/search?lat="+latitude+"&lon="+longitude+"&sort=real_distance&order=asc",true);
r.setRequestHeader('Accept', 'application/json');
r.setRequestHeader('user-key','36f0d5e50d2bd8f1ff1e8a8d087dddc4 ');


r.onload = function ()
{
if (r.status == 200)
{
    response=JSON.parse(r.responseText);
  
    near_restaurants();
}
}
r.send();

//function to display nearby restaurants
function near_restaurants()
{
    var near=document.getElementById('near_restaurant');

    var table=document.createElement('table');
    table.setAttribute('id','nearby');
    table.setAttribute('align','center');
    table.setAttribute('cellspacing','30px');
    var tr1=document.createElement('tr');
    var text = document.createTextNode("Restaurants nearby you");
    var span=document.createElement('span');
    span.appendChild(text);
    span.setAttribute('id', 'near');
    var td=document.createElement('td');
    td.setAttribute('colspan','4');
    td.appendChild(span);
    tr1.appendChild(td);
    table.appendChild(tr1);

    var tr=document.createElement('tr');
    for(var i=0; i<3; i++)
    {
        var restid=response.restaurants[i].restaurant.R.res_id;
        var a = document.createElement('a');
        a.setAttribute("href", "restaurants_details.html?r_id="+restid);

        var td=document.createElement('td');

        // table for each restaurant
        var table_near=document.createElement('table');
        table_near.setAttribute('id','table_near');
        var tr1=document.createElement('tr');
        var tr2=document.createElement('tr');
        
         //get featured image of restaurant
         var td1=document.createElement('td');
         
         var img = document.createElement('img');
        if(response.restaurants[i].restaurant.featured_image)
       {
               img.src=response.restaurants[i].restaurant.featured_image;
               img.setAttribute('id', 'near_img');
        }
              else
               { img.src=("default.jpg");
                    img.setAttribute('width','90px');
            }
       
        td1.appendChild(img);
        tr1.appendChild(td1);

        //get restaurant's name
        var td2=document.createElement('td');
        td2.setAttribute('height', '60px');
        td2.setAttribute('width','60px');
        var name=document.createElement('span');
        name.setAttribute('id', 'name_nearby');
        var nt = document.createTextNode(response.restaurants[i].restaurant.name); 
        name.appendChild(nt);
        name.style.color=("rgb(231, 231, 205)");
        td2.appendChild(name);
        tr2.appendChild(td2);

        table_near.appendChild(tr1);
        table_near.appendChild(tr2);
        a.appendChild(table_near);
       td.appendChild(a);
       tr.appendChild(td);
    }
	
    //view more near by restaurants


    var td=document.createElement('td');
    td.setAttribute('width', '100px');
    var a=document.createElement('a');
    a.setAttribute('id', 'seemore');
    a.setAttribute('href',"restaurants_list.html?id=0&pno=1&lat="+latitude+"&lon="+longitude);
    var atext=document.createTextNode('See more');
    a.appendChild(atext);
    td.appendChild(a);
    tr.appendChild(td);
    
    table.appendChild(tr);
    near.appendChild(table);
}

}
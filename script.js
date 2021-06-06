window.addEventListener("load",()=>{
     
    let lon;
    let lat;
    let tempdesc = document.querySelector('.temperature-description');
    let tempdegree = document.querySelector('.temperature-degree');
    let mylocation = document.querySelector('.location-timezone');
    let tempicon = document.querySelector('.icon');
    let temptype = document.querySelector('.button');
    let gtemp_c,gtemp_f;

    let incel = true;
    
    temptype.addEventListener("click",function(){

      
      if(temptype.classList.contains("incelsius"))
      { 
        incel=false;
        temptype.textContent="F";
      }
      else
      {
        incel=true;
        temptype.textContent="C";
      }

      checktemptype();
      temptype.classList.toggle("incelsius");

     });

     function checktemptype(){

      if(incel)
      { 
        tempdegree.textContent = gtemp_c;
      }
      else
      {
        tempdegree.textContent = gtemp_f;
      }
    }
    
    if(navigator.geolocation){

         navigator.geolocation.getCurrentPosition(position => {
            
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            fetch("https://weatherapi-com.p.rapidapi.com/current.json?q=delhi", {
            	"method": "GET",
            	"headers": {
            		"x-rapidapi-key": "88ff51c814msh4bb63e08d84f9c9p19beb2jsn5781ffebd94e",
            		"x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
            	}
            })
            .then(response => {
                return response.json();
            })
            .then(data =>{
               
              const {temp_c,temp_f,condition} = data.current;
              const {name} = data.location;

              gtemp_c=temp_c;
              gtemp_f=temp_f;

              tempdegree.textContent=temp_c;

              mylocation.textContent = name.toUpperCase();
              tempdesc.textContent = condition.text.toUpperCase();
              tempicon.src = condition.icon;
              tempicon.style.transform="scale(2)";

            });
      
         });        
    }


    

});
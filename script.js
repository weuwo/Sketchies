function renderTime(){
  
    //Date
    var mydate = new Date();
    var year = mydate.getYear();
      if(year < 1000){
        year += 1900
      }
    var day = mydate.getDay();
    var month = mydate.getMonth();
    var daym = mydate.getDate();
    var dayarray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    var montharray = new Array("JANURARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER");
    //Date
    
    //Time
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();
      if(h == 24){
        h = 0;
      } else if(h > 12){
        h = h - 0;
      }
      if (h < 10){
        h = "0" + h;
      }
      if (m < 10){
        m = "0" + m;
      }
    if (s < 10){
        s = "0" + s;
      }
    
    document.getElementById("dayDisplay").innerHTML =daym;
    
    document.getElementById("dateDisplay").innerHTML = dayarray[day];
    
    document.getElementById("monthyearDisplay").innerHTML = montharray[month]+" "+year;
    
    document.getElementById("clockDisplay").innerHTML = ""+ h + ":" + m + ":" + s;
    
    setTimeout("renderTime()", 1000);
  }
  renderTime();
  
  document.querySelectorAll('.all-gallery img').forEach(image =>{image.onclick = () =>{
    document.querySelector('.popup-image').style.display = 'block';
    document.querySelector('.popup-image img').src = image.getAttribute('src');
    }
  });
  
  document.querySelector('.popup-image span').onclick = () => {
      document.querySelector('.popup-image').style.display = 'none';
  }
  
  var img = document.querySelector('.tabicon img');
  var tabplant = document.querySelector('label[for="tabplant"]');
  var tabanimal = document.querySelector('#tabanimal');
  var tabhuman = document.querySelector('#tabhuman');
  var tabfood = document.querySelector('#tabfood');
  var tabtype = document.querySelector('#tabtype');
  var taball = document.querySelector('#taball');
    
    
    tabplant.addEventListener('click', () => {
      img.src = 'https://cdn.glitch.global/2dd1e120-c301-42e0-a3f2-e064382ae1e9/mush.png?v=1647318202665';
          img.alt = 'mushroom'
  
      img.style.top = '55%';
      if (window.matchMedia("(max-width: 993px)").matches) {
      img.style.top = '20%';
      }
      
    })
  
    tabanimal.addEventListener('click', () => {
      img.src = 'https://cdn.glitch.global/2dd1e120-c301-42e0-a3f2-e064382ae1e9/frog.png?v=1647318228413';
          img.alt = 'green treefrog'
  
      img.style.top = '70%';
      if (window.matchMedia("(max-width: 993px)").matches) {
      img.style.top = '25%';
      }
  
    })
  
    tabhuman.addEventListener('click', () => {
      img.src = 'https://cdn.glitch.global/2dd1e120-c301-42e0-a3f2-e064382ae1e9/person.png?v=1647318209058';
          img.alt = 'emoji of a yellow smiling face'
  
      img.style.top = '65%';
          if (window.matchMedia("(max-width: 993px)").matches) {
      img.style.top = '20%';
      }
  
    })
    
    tabfood.addEventListener('click', () => {
      img.src = 'https://cdn.glitch.global/2dd1e120-c301-42e0-a3f2-e064382ae1e9/cake.png?v=1647318231791';
          img.alt = 'round cake with white frosting'
  
      img.style.top = '60%';
          if (window.matchMedia("(max-width: 993px)").matches) {
      img.style.top = '20%';
      }
  
    })
    
    tabtype.addEventListener('click', () => {
      img.src = 'https://cdn.glitch.global/2dd1e120-c301-42e0-a3f2-e064382ae1e9/letter.png?v=1647318217386';
      img.alt = '3d rendering of a capital A'
      img.style.top = '60%';
          if (window.matchMedia("(max-width: 993px)").matches) {
      img.style.top = '20%';
      }
  
    })
    
    taball.addEventListener('click', () => {
      img.src = 'https://cdn.glitch.global/2dd1e120-c301-42e0-a3f2-e064382ae1e9/thumbnails%2Fchhichi.png?1647383300809';
      img.alt = 'Monkey toy in a dog costume'
      img.style.top = '60%';
          if (window.matchMedia("(max-width: 993px)").matches) {
      img.style.top = '25%';
      }
    })
  
  
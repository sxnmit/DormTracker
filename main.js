function status_change1() {

  const Home = document.createElement('button');
  Home.textContent = 'Set Home 🏠';
  Home.className = "home";
  document.body.appendChild(Home);

  const Away = document.createElement('button');
  Away.textContent = 'Set Away 🏎️';
  Away.className = "away";
  document.body.appendChild(Away);

  Home.addEventListener('click', e => {
    var statusElement = document.getElementById('status1');
    statusElement.textContent = 'Status: Home';
    Home.style.display = "none";
    Away.style.display = "none";
  });

  Away.addEventListener('click', e => {
    var statusElement = document.getElementById('status1');
    statusElement.textContent = 'Status: Away';
    Home.style.display = "none";
    Away.style.display = "none";
  });
}

function status_change2() {
  const Home = document.createElement('button');
  Home.textContent = 'Set Home 🏠';
  Home.className = "home2";
  document.body.appendChild(Home);

  const Away = document.createElement('button');
  Away.textContent = 'Set Away 🏎️';
  Away.className = "away2";
  document.body.appendChild(Away);

  Home.addEventListener('click', e => {
    var statusElement = document.getElementById('status2');
    statusElement.textContent = 'Status: Home';
    Home.style.display = "none";
    Away.style.display = "none";
  });

  Away.addEventListener('click', e => {
    var statusElement = document.getElementById('status2');
    statusElement.textContent = 'Status: Away';
    Home.style.display = "none";
    Away.style.display = "none";
  });

}
function status_change3() {
  const Home = document.createElement('button');
  Home.textContent = 'Set Home 🏠';
  Home.className = "home3";
  document.body.appendChild(Home);

  const Away = document.createElement('button');
  Away.textContent = 'Set Away 🏎️';
  Away.className = "away3";
  document.body.appendChild(Away);

  Home.addEventListener('click', e => {
    var statusElement = document.getElementById('status3');
    statusElement.textContent = 'Status: Home';
    Home.style.display = "none";
    Away.style.display = "none";
  });

  Away.addEventListener('click', e => {
    var statusElement = document.getElementById('status3');
    statusElement.textContent = 'Status: Away';
    Home.style.display = "none";
    Away.style.display = "none";
  });

}
function status_change4() {
  const Home = document.createElement('button');
  Home.textContent = 'Set Home 🏠';
  Home.className = "home4";
  document.body.appendChild(Home);

  const Away = document.createElement('button');
  Away.textContent = 'Set Away 🏎️';
  Away.className = "away4";
  document.body.appendChild(Away);

  Home.addEventListener('click', e => {
    var statusElement = document.getElementById('status4');
    statusElement.textContent = 'Status: Home';
    Home.style.display = "none";
    Away.style.display = "none";
  });

  Away.addEventListener('click', e => {
    var statusElement = document.getElementById('status4');
    statusElement.textContent = 'Status: Away';
    Home.style.display = "none";
    Away.style.display = "none";
  });

  const socket = io.connect('http://your-flask-server-address:5001');

  // Listen for the 'status_update' event
  socket.on('status_update', function (data) {
    // Access the status variables (pk, ss, sj, am) from the data payload
    const status1 = data.status1;
    const status2 = data.status2;
    const status3 = data.status3;
    const status4 = data.status4;

    // Update your HTML or perform any other actions with the received status data
    console.log('Received status update:', status1, status2, status3, status4);

    // Example: Update HTML elements
    document.getElementById('status1').innerText = status1;
    document.getElementById('status2').innerText = status2;
    document.getElementById('status3').innerText = status3;
    document.getElementById('status4').innerText = status4;

    console.log('hi')
    location.reload()
  });

}
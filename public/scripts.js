const load1 = document.querySelector('#load1');
const send1 = document.querySelector('#send1');
const message = document.getElementById('message');
const output = document.getElementById('output');
let currentId = 1;
const url = 'http://localhost:3000';
const person = {
  name: "John",
  last: "Doe",
  company: "New Discovery"
}

/**
 * Prevouse and Next button GET method
 * ===================================
 */
document.getElementById('prev').addEventListener('click', () => {
  currentId--;
  loadPage(currentId);
});

document.getElementById('next').addEventListener('click', () => {
  currentId++;
  loadPage(currentId);
});

/**
 * This part is for the Form to POST data into db.json
 * ===================================================
 */
document.querySelector('#myForm').addEventListener('submit', e => {
  e.preventDefault();
  const first = document.querySelector('[name="first"]').value;
  const last = document.querySelector('[name="last"]').value;
  const company = document.querySelector('[name="company"]').value;
  let data = 'first=' + first + '&last=' + last + '&company=' + company;
  console.log(first, last, company);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      message.innerHTML = xhr.response;
      console.log(JSON.parse(xhr.response))
    }
  };

  xhr.open('POST', url + '/posts', true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
});

/**
 * this part is for SEARCH QUERY
 * =============================
 */
document.querySelector('#search').addEventListener('click', () => {
  var search = document.querySelector('[name="search"]').value;
  output.innerHTML = '';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      const profileObj = JSON.parse(xhr.response);
      console.log(profileObj);

      for(const [key, value] of Object.entries(profileObj)) {
        output.innerHTML += '<b>' + key + '</b> ' + value.first + ' ' + value.last + ' ' + value.company + '<br>';
        console.log(key, value);
      }
    }
  }

  xhr.open('GET', url + '/posts?q=' + search, true);
  xhr.send();
});

/**
 * To add COMMENT to db.json comment table
 * =======================================
 */
document.querySelector('#addcomment').addEventListener('click', () => {
  var comment = document.querySelector('#comment').value;
  const data = 'postId=' + currentId + '&body=' + comment;
  console.log(comment);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      console.log(xhr.response);
      const commentObj = JSON.parse(xhr.response);
      output.innerHTML += '<b>' + commentObj.id + '</b> ' + commentObj.body + '<br>';
    }
  }
  xhr.open('POST', url + '/comments', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(data);
});

/**
 * -----------------------------------------------
 */
function loadPage(currentId) {
  output.innerHTML = '';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      const profileObj = JSON.parse(xhr.response);
      // console.log(profileObj)
      if(profileObj[0] === undefined) {
        console.log('no more data');
        return;
      }

      for(var key in profileObj[0]) {
        output.innerHTML += '<b>' + key + '</b>: ' + profileObj[0][key] + '<br>';
        console.log(key, profileObj[0][key]);
      }
      loadComments()
    }
  }
  xhr.open('GET', url + '/posts?id=' + currentId, true);
  xhr.send()
}

function makeGet(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      message.innerHTML = xhr.response;
      console.log(JSON.parse(xhr.response))
    }
  };

  xhr.open('GET', urlPosts, true);
  xhr.send()
}

function makePost(url, requestType, data) {
  const data = 'first=' + first + '&last=' + last + '&company=' + company;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      message.innerHTML = xhr.response;
      console.log(JSON.parse(xhr.response))
    }
  };

  xhr.open('POST', url + '/posts', true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data)
}

function loadComments() {
  output.innerHTML += '<p>Comments</p>';
  const xhr = new XMLHttpRequest();
  var strVal = '/comments?postId=' + currentId;

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      var commentObj = JSON.parse(xhr.response);
      console.log(commentObj);
      for(const [key, value] of Object.entries(commentObj)) {
        output.innerHTML += '<b>' + key + '</b> ' + value.body + '<br>';
      }
    }
  }
  xhr.open('GET', url + strVal, true);
  xhr.send();
}


// load1.addEventListener('click', function() {
//   makeRequest(url, 'GET', {})
// });

// send1.addEventListener('click', function() {
//   makeRequest(url, 'POST', stgVal)
// })


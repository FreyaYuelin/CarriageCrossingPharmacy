const log = console.log;

const refillLoginForm = document.getElementById('refillLoginForm');
refillLoginForm.addEventListener('submit', logIn);

const user1 = {
    uname: "david",
    pwd: "liu"
}

 


function logIn(e) {
    e.preventDefault()
    // const url = "/user/index"
    const data = {
        uname: document.getElementById("uname").value,
        pwd: document.getElementById("pwd").value
    }
    log(data.uname);
    if (data.uname === user1.uname && data.pwd === user1.pwd) {
        localStorage.setItem('uname', data.uname);
        window.location.href = "selections.html";
    }
    else {
        window.alert('wrong username or password!');
    }

    // const request = new Request(url, {
    //     method: "POST", 
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //     },
    // });
    // log('fetching request',  data.uname, data.pwd)
    // fetch(request)
    // .then((res) => {
    //     log(res.status)
    //     if (res.status === 200) {
    //     } else {
    //         alert("Incorrect user name or password")
    //     }
    // }).catch((error) => {
    //     console.error(error)
    // })

}
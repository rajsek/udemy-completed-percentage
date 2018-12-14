// var a = $(".progress-bar-default--white")
// if(a.length>0){
//     a.map(e=>{
//         e.innerText= e.style.width;
//     })
// }
debugger;

let jsInitChecktimer;

let status = {
  START: 0,
  STOP: 1,
  WAIT: -1
};

function checkForJS_Finish() {
  if (document.location.pathname !== "/organization/home/") return status.STOP;

  var learningProgress = [
    ...document.getElementsByClassName("ufb-learning-unit")
  ];

  if (learningProgress.length > 0) {
    clearInterval(jsInitChecktimer);

    var a = [...document.getElementsByClassName("progress-bar-default--white")];
    if (a.length > 0) {
      a.map((e,i) => {
        var persentageElement = document.getElementById(`completed_persentage${i}`);
        if (persentageElement) persentageElement.remove();
        e.insertAdjacentHTML(
          "afterend",
          `<div id='completed_persentage${i}'>${e.style.width}</div>`
        );
      });
    }
    return;
  }
  return status.WAIT;
}

function myMain(evt) {
  jsInitChecktimer = setInterval(checkForJS_Finish, 111);
}

window.addEventListener("load", myMain, false);

// var a = $(".progress-bar-default--white")
// if(a.length>0){
//     a.map(e=>{
//         e.innerText= e.style.width;
//     })
// }
let jsInitChecktimer;

let status = {
  START: 0,
  STOP: 1,
  WAIT: -1
};

function checkForJS_Finish() {
  const pathToCheck = ["/learn/v4/overview", "/organization/home"];
  const currentUrl = document.location.pathname;
  const isLearnOverView = currentUrl.includes(pathToCheck[0]);
  const isHome = currentUrl.includes(pathToCheck[1]);
  if (!(isLearnOverView || isHome)) {
    clearInterval(jsInitChecktimer);
    return status.STOP;
  }

  var homeLearningProgress = [
    ...document.getElementsByClassName("ufb-learning-unit")
  ];

  var isLearningOverviewProgress = [
    ...document.querySelectorAll('[data-purpose="course-progress-indicator"]')
  ];
  if ( homeLearningProgress.length > 0 || isLearningOverviewProgress.length > 0) {
    clearInterval(jsInitChecktimer);
    if (isHome) {
      var a = [
        ...document.getElementsByClassName("progress-bar-default--white")
      ];
      if (a.length > 0) {
        a.map((e, i) => {
          var persentageElement = document.getElementById(
            `completed_persentage${i}`
          );
          if (persentageElement) persentageElement.remove();
          e.insertAdjacentHTML(
            "afterend",
            `<div id='completed_persentage${i}'>${e.style.width}</div>`
          );
        });
      }
      return;
    } else if (isLearnOverView) {
      isLearningOverviewProgress[0].parentElement.insertAdjacentHTML(
        "beforebegin",
        `<div id='completed_persentage'>${isLearningOverviewProgress[0].style.width}</div>`
      );
    }
  }
  return status.WAIT;
}

function myMain(evt) {
  jsInitChecktimer = setInterval(checkForJS_Finish, 111);
}

window.addEventListener("load", myMain, false);

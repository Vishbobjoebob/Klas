//P1
function addSubjects1(){
    db.collection("classes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("subject-selection1").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

addSubjects1();

function logSubject1() {
    var selectedSubject = document.getElementById("subject-selection1").options[document.getElementById("subject-selection1").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    console.log(selectedSubject)
    document.getElementById("course-selection1").innerHTML="<option disabled selected>Select Your Course...</option>";
    document.getElementById("teacher-selection1").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("courses").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("course-selection1").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

function logCourse1() {
    var selectedSubject = document.getElementById("subject-selection1").options[document.getElementById("subject-selection1").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    var selectedCourse = document.getElementById("course-selection1").options[document.getElementById("course-selection1").selectedIndex].text;
    selectedCourse = selectedCourse.substring(1, selectedCourse.length-1);
    console.log(selectedCourse)
    document.getElementById("teacher-selection1").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("teachers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("teacher-selection1").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

//P2
function addSubjects2(){
    db.collection("classes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("subject-selection2").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

addSubjects2();

function logSubject2() {
    var selectedSubject = document.getElementById("subject-selection2").options[document.getElementById("subject-selection2").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    console.log(selectedSubject)
    document.getElementById("course-selection2").innerHTML="<option disabled selected>Select Your Course...</option>";
    document.getElementById("teacher-selection2").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("courses").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("course-selection2").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

function logCourse2() {
    var selectedSubject = document.getElementById("subject-selection2").options[document.getElementById("subject-selection2").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    var selectedCourse = document.getElementById("course-selection2").options[document.getElementById("course-selection2").selectedIndex].text;
    selectedCourse = selectedCourse.substring(1, selectedCourse.length-1);
    console.log(selectedCourse)
    document.getElementById("teacher-selection2").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("teachers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("teacher-selection2").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

//P3
function addSubjects3(){
    db.collection("classes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("subject-selection3").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

addSubjects3();

function logSubject3() {
    var selectedSubject = document.getElementById("subject-selection3").options[document.getElementById("subject-selection3").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    console.log(selectedSubject)
    document.getElementById("course-selection3").innerHTML="<option disabled selected>Select Your Course...</option>";
    document.getElementById("teacher-selection3").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("courses").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("course-selection3").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

function logCourse3() {
    var selectedSubject = document.getElementById("subject-selection3").options[document.getElementById("subject-selection3").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    var selectedCourse = document.getElementById("course-selection3").options[document.getElementById("course-selection3").selectedIndex].text;
    selectedCourse = selectedCourse.substring(1, selectedCourse.length-1);
    console.log(selectedCourse)
    document.getElementById("teacher-selection3").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("teachers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("teacher-selection3").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });

    
}

//P4
function addSubjects4(){
    db.collection("classes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("subject-selection4").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

addSubjects4();

function logSubject4() {
    var selectedSubject = document.getElementById("subject-selection4").options[document.getElementById("subject-selection4").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    console.log(selectedSubject)
    document.getElementById("course-selection4").innerHTML="<option disabled selected>Select Your Course...</option>";
    document.getElementById("teacher-selection4").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("courses").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("course-selection4").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

function logCourse4() {
    var selectedSubject = document.getElementById("subject-selection4").options[document.getElementById("subject-selection4").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    var selectedCourse = document.getElementById("course-selection4").options[document.getElementById("course-selection4").selectedIndex].text;
    selectedCourse = selectedCourse.substring(1, selectedCourse.length-1);
    console.log(selectedCourse)
    document.getElementById("teacher-selection4").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("teachers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("teacher-selection4").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

//P5
function addSubjects5(){
    db.collection("classes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("subject-selection5").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

addSubjects5();

function logSubject5() {
    var selectedSubject = document.getElementById("subject-selection5").options[document.getElementById("subject-selection5").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    console.log(selectedSubject)
    document.getElementById("course-selection5").innerHTML="<option disabled selected>Select Your Course...</option>";
    document.getElementById("teacher-selection5").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("courses").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("course-selection5").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

function logCourse5() {
    var selectedSubject = document.getElementById("subject-selection5").options[document.getElementById("subject-selection5").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    var selectedCourse = document.getElementById("course-selection5").options[document.getElementById("course-selection5").selectedIndex].text;
    selectedCourse = selectedCourse.substring(1, selectedCourse.length-1);
    console.log(selectedCourse)
    document.getElementById("teacher-selection5").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("teachers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("teacher-selection5").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

//P6
function addSubjects6(){
    db.collection("classes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("subject-selection6").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

addSubjects6();

function logSubject6() {
    var selectedSubject = document.getElementById("subject-selection6").options[document.getElementById("subject-selection6").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    console.log(selectedSubject)
    document.getElementById("course-selection6").innerHTML="<option disabled selected>Select Your Course...</option>";
    document.getElementById("teacher-selection6").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("courses").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("course-selection6").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

function logCourse6() {
    var selectedSubject = document.getElementById("subject-selection6").options[document.getElementById("subject-selection6").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    var selectedCourse = document.getElementById("course-selection6").options[document.getElementById("course-selection6").selectedIndex].text;
    selectedCourse = selectedCourse.substring(1, selectedCourse.length-1);
    console.log(selectedCourse)
    document.getElementById("teacher-selection6").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("teachers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("teacher-selection6").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

//Write Information Data to Firebase
function saveSchedule() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var schedule = []
            for (let i =1; i <= 6; i++) {
                var selectedSubject = document.getElementById("subject-selection".concat(i.toString())).options[document.getElementById("subject-selection".concat(i.toString())).selectedIndex].text;
                selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
                var selectedCourse = document.getElementById("course-selection".concat(i.toString())).options[document.getElementById("course-selection".concat(i.toString())).selectedIndex].text;
                selectedCourse = selectedCourse.substring(1, selectedCourse.length-1);
                var selectedTeacher = document.getElementById("teacher-selection".concat(i.toString())).options[document.getElementById("teacher-selection".concat(i.toString())).selectedIndex].text;
                selectedTeacher = selectedTeacher.substring(1, selectedTeacher.length-1);
                let id= i.toString() + "!" + selectedCourse + "!" + selectedTeacher;
                schedule.push(id);
            }
            console.log(schedule);
            
            let googleUser=firebase.auth().currentUser;
            let name = googleUser.displayName ;
            let first = name.substring(0, name.indexOf(" "));
            let last = name.substring(name.indexOf(" ") + 1, name.length);
            let photoURL = googleUser.photoURL ;

            db.collection("users").doc(googleUser.uid).update({
                schedule: schedule
            })
        }
        else {
          GoogleLogin()
        }
      })
}

function saveInformation() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let first = document.getElementById("first-name").value;
            let last = document.getElementById("last-name").value;
            let phone = document.getElementById("phone-number").value;
            String.prototype.isNumber = function(){return /^\d+$/.test(this);}
            if (phone.length != 10 || phone.isNumber() == false) {
                window.alert("Please input valid phone number with only digits");
            }
            else {
                phone = "(" + phone.substring(0, 3) + ")" + " " + phone.substring(3, 6) + "-" + phone.substring(6, 10);
                console.log(phone);
                console.log(first);
                console.log(last);
                db.collection("users").doc(firebase.auth().currentUser.uid).update({
                    firstName: first,
                    lastName: last,
                    phoneNumber: phone
                })
            }
        }
        else {
          GoogleLogin()
        }
      })
}
//Buttons
document.getElementById("schedule-save").addEventListener('click', saveSchedule);
document.getElementById("information-save").addEventListener('click', saveInformation);
function addSubjects(){
    db.collection("classes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            document.getElementById("subject-selection").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

addSubjects();

function logSubject() {
    var selectedSubject = document.getElementById("subject-selection").options[document.getElementById("subject-selection").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    console.log(selectedSubject)
    document.getElementById("course-selection").innerHTML="<option disabled selected>Select Your Course...</option>";
    document.getElementById("teacher-selection").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("courses").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("course-selection").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

function logCourse() {
    var selectedSubject = document.getElementById("subject-selection").options[document.getElementById("subject-selection").selectedIndex].text;
    selectedSubject = selectedSubject.substring(1, selectedSubject.length-1);
    var selectedCourse = document.getElementById("course-selection").options[document.getElementById("course-selection").selectedIndex].text;
    selectedCourse = selectedCourse.substring(1, selectedCourse.length-1);
    console.log(selectedCourse)
    document.getElementById("teacher-selection").innerHTML="<option disabled selected>Select Your Teacher...</option>";
    db.collection("classes").doc(selectedSubject).collection("teachers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("teacher-selection").innerHTML+='<option>"' + doc.id + '"</option>'
        });
    });
}

function writeToUserData() {
    
}
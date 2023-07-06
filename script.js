let selectedLine = null

let fullName = document.getElementById('fullname')
let emailId = document.getElementById('emailid')
let button = document.getElementById('btn')
let tbody = document.getElementById('tbody')
let mobile = document.getElementById('mobile')
let age = document.getElementById('age')
let gender = document.getElementsByName('gender')
let hobby = document.getElementsByName('hobby')
let state = document.getElementById('state')
let city = document.getElementById('city')
let tr = document.getElementById('tr')

document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("clicked")
    validation()
})

// const validateField=(field,value,required)=>{
//     if(required &&!value) document.getElementById("name-validation").innerHTML = `${field} is required`

//     switch(field){
//         case "fullName":
//             if (regex.test(fullName.value)) {
//                 document.getElementById("name-validation").innerHTML = ""
//             } else {
//                 document.getElementById("name-validation").innerHTML = "Name is Required"
//             }
//             break;
//     }
// }

// -------------------------- VALIDATION -------------------------- //

const validation = () => {
    let regex = /^[A-Za-z]+$/;
    // validateField("fullName",fullName.value,true)
    if (regex.test(fullName.value)) {
        document.getElementById("name-validation").innerHTML = ""
    } else {
        document.getElementById("name-validation").innerHTML = "Name is Required"
    }
    if (emailId.value == "") {
        document.getElementById("email-validation").innerHTML = "Email id is Required"
    } else {
        document.getElementById("email-validation").innerHTML = ""
    }
    if (mobile.value.length != 10) {
        document.getElementById("mobile-validation").innerHTML = "Mobile no is must be 10 digits"
    } else {
        document.getElementById("mobile-validation").innerHTML = ""
    }
    if (age.value >= 18 && age.value <= 55) {
        document.getElementById("age-validation").innerHTML = ""
    } else {
        document.getElementById("age-validation").innerHTML = "Age is between 18 to 55 "
    }
    if (gender[0].checked == true) {
        document.getElementById("gender-validation").innerHTML = ""
    } else if (gender[1].checked == true) {
        document.getElementById("gender-validation").innerHTML = ""
    } else if (gender[2].checked == true) {
        document.getElementById("gender-validation").innerHTML = ""
    } else {
        document.getElementById("gender-validation").innerHTML = "You must select your Gender!"
    }
    if (hobby[0].checked == true) {
        document.getElementById("hobby-validation").innerHTML = ""
    } else if (hobby[1].checked == true) {
        document.getElementById("hobby-validation").innerHTML = ""
    } else if (hobby[2].checked == true) {
        document.getElementById("hobby-validation").innerHTML = ""
    } else {
        document.getElementById("hobby-validation").innerHTML = "You must select your Hobby!"
    }
    if (state.value == "select state") {
        document.getElementById("state-validation").innerHTML = "Please select a State"
    } else {
        document.getElementById("state-validation").innerHTML = ""
    }
    if (city.value == "select city") {
        document.getElementById("city-validation").innerHTML = "Please select a City"
    } else {
        document.getElementById("city-validation").innerHTML = ""
    }
    dataStore()
    displayData()
}

// -------------------------- DATA STORE IN ARRAY -------------------------- //

let arr = []
const dataStore = () => {
    if (fullName.value !== "" && emailId.value !== "" && mobile.value.length == 10 && age.value >= 18 && age.value <= 55 && state.value !== "select state" && city.value !== "select city" && (hobby[0].checked == true || hobby[1].checked == true || hobby[2].checked == true)) {
        arr["fullName"] = fullName.value
        arr["email"] = emailId.value
        arr["mobile"] = mobile.value
        arr["age"] = age.value
        for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) {
                arr["gender"] = gender[i].value
            }
        }
        // let hobbies = []
        for (let i = 0; i < hobby.length; i++) {
            if (hobby[i].checked) {
                arr["hobby"] = hobby[i].value
                // hobbies.push(hobby[i].value)
            }
        }
        // arr["hobby"] = hobbies
        arr["state"] = state.value
        arr["city"] = city.value

        console.log(arr)

    }
}

// -------------------------- DATA POST IN TABLE -------------------------- //

const displayData = () => {
    if (fullName.value !== "" && emailId.value !== "" && mobile.value.length == 10 && age.value >= 18 && age.value <= 55 && state.value !== "select state" && city.value !== "select city" && (hobby[0].checked == true || hobby[1].checked == true || hobby[2].checked == true)) {
        if (selectedLine == null) {
            tbody.innerHTML += `<tr>
               <td>${arr.fullName}</td>
               <td>${arr.email}</td>
               <td>${arr.mobile}</td>
               <td>${arr.age}</td>
               <td>${arr.gender}</td>
               <td>${arr.hobby}</td>
               <td>${arr.state}</td>
               <td>${arr.city}</td>
               <td><span class="edit"><i class="fa-solid fa-pen-to-square" onclick="rowEdit(this)"></i></span></td>
               <td><span class="delete"><i class="fa-solid fa-trash" onclick="rowDelete(this)"></i></span></td>
               </tr>`
        } else {
            selectedLine.children[0].innerHTML = fullName.value
            selectedLine.children[1].innerHTML = emailId.value
            selectedLine.children[2].innerHTML = mobile.value
            selectedLine.children[3].innerHTML = age.value
            selectedLine.children[4].innerHTML = arr.gender
            selectedLine.children[5].innerHTML = arr.hobby
            selectedLine.children[6].innerHTML = state.value
            selectedLine.children[7].innerHTML = city.value
            selectedLine = null
        }
        resetData()
    }
}

// -------------------------- RESET INPUT VALUE -------------------------- //

const resetData = () => {
    fullName.value = ""
    emailId.value = ""
    mobile.value = ""
    age.value = ""
    for (let i = 0; i < gender.length; i++) {
        gender[i].checked = false;
    }
    for (let i = 0; i < hobby.length; i++) {
        hobby[i].checked = false;
    }
    state.selectedIndex = 0
    city.selectedIndex = 0

    resetValidation()
}

// -------------------------- RESET VALIDATION -------------------------- //

const resetValidation = () => {
    document.getElementById("name-validation").innerHTML = ""
    document.getElementById("email-validation").innerHTML = ""
    document.getElementById("mobile-validation").innerHTML = ""
    document.getElementById("age-validation").innerHTML = ""
    document.getElementById("gender-validation").innerHTML = ""
    document.getElementById("hobby-validation").innerHTML = ""
    document.getElementById("state-validation").innerHTML = ""
    document.getElementById("city-validation").innerHTML = ""
}

// -------------------------- DELETE BUTTON -------------------------- //

const rowDelete = (e) => {
    let text = "Are you sure you want to delete this data ?";
    if (confirm(text) == true) {
        e.parentElement.parentElement.parentElement.remove()
    }
}

// -------------------------- EDIT BUTTON -------------------------- //

const rowEdit = (e) => {
    selectedLine = e.parentElement.parentElement.parentElement
    console.log(selectedLine)

    fullName.value = selectedLine.children[0].innerHTML
    emailId.value = selectedLine.children[1].innerHTML
    mobile.value = selectedLine.children[2].innerHTML
    age.value = selectedLine.children[3].innerHTML

    for (i = 0; i < gender.length; i++) {
        if (gender[i].value == selectedLine.children[4].innerHTML) {
            gender[i].checked = true;
        }
    }
    for (i = 0; i < hobby.length; i++) {
        // debugger
        if (hobby[i].value == selectedLine.children[5].innerHTML) {
            hobby[i].checked = true;
        }
    }

    {/* <td>${hobbies.join(", ")}</td>
    var hobbies = [];
    var hobbiesCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
    );
    for (var i = 0; i < hobbiesCheckboxes.length; i++) {
    hobbies.push(hobbiesCheckboxes[i].value);
    } */}

    state.value = selectedLine.children[6].innerHTML
    city.value = selectedLine.children[7].innerHTML

    resetValidation()
    document.getElementById("clear").style.display = "block";
}

// -------------------------- SEARCHING -------------------------- //

const searchTable = () => {
    let search = document.getElementById("search");
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];

        if (td) {
            if (td.innerText.includes(search.value)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// -------------------------- SORTING -------------------------- //

// const sorting = () => {
//     let table = document.getElementById("table");
//     let tr = table.getElementsByTagName("tr");
//     let isSwitch, i
//     let switching = true

//     while (switching) {
//         switching = false

//         for (i = 1; i < tr.length - 1; i++) {
//             isSwitch = false;

//             let x = tr[i].getElementsByTagName("td")[0]
//             let y = tr[i + 1].getElementsByTagName("td")[0]

//             if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//                 isSwitch = true
//                 break;
//             }
//         }
//         if (isSwitch) {
//             tr[i].parentNode.insertBefore(tr[i + 1], tr[i]);
//             switching = true;
//         }
//     }
// }

// const Descending = () => {
//     let table = document.getElementById("table");
//     let tr = table.getElementsByTagName("tr");
//     let isSwitch, i
//     let switching = true

//     while (switching) {
//         switching = false

//         for (i = 1; i < tr.length - 1; i++) {
//             isSwitch = false;

//             let x = tr[i].getElementsByTagName("td")[0]
//             let y = tr[i + 1].getElementsByTagName("td")[0]

//             if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//                 isSwitch = true
//                 break;
//             }
//         }
//         if (isSwitch) {
//             tr[i].parentNode.insertBefore(tr[i + 1], tr[i]);
//             switching = true;
//         }
//     }
// }

function sortTable() {
    var switching, i, shouldSwitch, switchcount = 0;
    let table = document.getElementById("table");
    switching = true;
    let sort_data = "asc";

    while (switching) {
        switching = false;
        let rows = table.getElementsByTagName("tr");

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            let x = rows[i].getElementsByTagName("td")[0];
            let y = rows[i + 1].getElementsByTagName("td")[0];

            if (sort_data === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (sort_data === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && sort_data === "asc") {
                sort_data = "desc";
                switching = true;
            } else {
                sort_data = "asc"
            }
        }
    }
}

// -------------------------- DROPBOX -------------------------- //

let cityStore = {
    Gujarat: ["Surat", "Ahmedabad", "Vadodara"],
    Delhi: ["Aali", "Alipur", "Asola"],
    Punjab: ["Ludhiana", "Patiala", "Amritsar"]
}

const stateChange = (e) => {
    let cityOption = ""
    for (cityIndex in cityStore[e.value]) {
        cityOption += "<option>" + cityStore[e.value][cityIndex] + "</option>"
    }
    document.getElementById('city').innerHTML = "<option disabled selected>select city</option>" + cityOption
}

// -------------------------- CLEAR -------------------------- //

const clearData = () => {
    resetData()
    document.getElementById("clear").style.display = "none";
    selectedLine = null
}
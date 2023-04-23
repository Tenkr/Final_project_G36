// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = "127.0.0.1:3000";

let itemsData;

// TODO #2.1: Edit group number
const getGroupNumber = () => {
  return 8;
};

// TODO #2.2: Show group members
const showGroupMembers = async () => {
  /* const member_list = document.getElementById("member-list");
  member_list.innerHTML = ""; */
  const member_dropdown = document.getElementById("name-to-add");
  member_dropdown.innerHTML =
    "<option value='0'>status</option>";
  const members = ["Not Started" , "In Progess" , "Waiting on Someone"];
      members.map((member) => {
        //member_list.innerHTML += "<li>" + member + "</li>";
        // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
        member_dropdown.innerHTML += "<option>" + member + "</option>";
        // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
      });
};

// TODO #2.3: Send Get items ("GET") request to backend server and store the response in itemsData variable
const getItemsFromDB = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(`http://${backendIPAddress}/items`, options)
  .then((response) => response.json())
  .then((data) => {
    itemsData = data;
  }).catch((error) => console.error(error)); 
  console.log(44444)
  console.log(itemsData);
};

// TODO #2.4: Show items in table (Sort itemsData variable based on created_date in ascending order)
const showItemsInTable = (itemsData) => {
  const table_body = document.getElementById("main-table-body");
  table_body.innerHTML = "";
  // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
  itemsData.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
  itemsData.map((item) => {
    // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
    table_body.innerHTML += `
        <tr id="${item.item_id}" class ="div_grid">
            <td>${item.item}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><button style="margin-right: 10px; padding-left: 5px ;width: 85px" class="delete-button" onclick="deleteItem('${item.item_id}')">Complete</button></td>
        </tr>
        `;
    // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
  });
};

// TODO #2.5: Send Add an item ("POST") request to backend server and update items in the table
const addItem = async () => {
  const item = document.getElementById("item-to-add").value;
  const name = document.getElementById("name-to-add").value;
  const price = document.getElementById("price-to-add").value;
  const data = {
    item: item, 
    name: name , 
    price:price,
  }
  const options = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(data),
  };
  await fetch(`http://${backendIPAddress}/items`, options)
  .then((response) =>{
    const newItemData = response.json();
    itemsData.push(newItemData);
    const updatedItems = getItemsFromDB(); // Fetch updated items data from backend
    showItemsInTable(updatedItems);
  }).catch((error) => console.error(error)); 
  redrawDOM();
  console.log(
    "This function should fetch 'add item' route from backend server and update items in the table."
  );
};

// TODO 2.6: Send Delete an item ("DELETE") request to backend server and update items in the table
const deleteItem = async (item_id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
  };
  await fetch(`http://${backendIPAddress}/items/${item_id}`, options)
  .then((response) => response.json())
  .then((data) => {
    const updatedItems = getItemsFromDB();
    showItemsInTable(updatedItems);
  }).catch((error) => console.error(error)); 
  redrawDOM()
  console.log(
    "This function should fetch 'delete item' route in backend server and update items in the table."
  );
};

const redrawDOM = () => {
  window.document.dispatchEvent(
    new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true,
    })
  );
  document.getElementById("item-to-add").value = "";
  document.getElementById("name-to-add").value = "0";
  document.getElementById("price-to-add").value = "";
};


document.addEventListener("DOMContentLoaded", async function (event) {
  console.log("Showing group members.");
  await showGroupMembers();
  console.log("Showing items from database.");
  await getItemsFromDB();
  showItemsInTable(itemsData);
});



//---------------------mcv api path-------------------
const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};


// Example: Send Get user profile ("GET") request to backend server and show the response on the webpage
const getUserProfile = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.user);
      document.getElementById(
        "eng-name-info"
      ).innerHTML = `${data.user.title_en} ${data.user.firstname_en} ${data.user.lastname_en}`;
      document.getElementById(
        "thai-name-info"
      ).innerHTML = `${data.user.title_th} ${data.user.firstname_th} ${data.user.lastname_th}`;
    })
    .catch((error) => console.error(error));
};


const getStudent_id = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.user);
      document.getElementById("student-task-id").innerHTML = `${data.user.lastname_en};`
    })
    .catch((error) => console.error(error));
};
const getallcourse_in_thisyear = async()=>{
    const year_data = document.getElementById("year-section").value;
    const year_drop_down = document.getElementById("course-dropdown");
    const semister_dropdown_data = document.getElementById("semister-dropdown").value;
    year_drop_down.innerHTML = " "; // modify 169 170
    //year_drop_down.innerHTML += "<option value='0'>status</option>";
    console.log(year_data);

    const options = {
      method: "GET",
      credentials: "include",
    };
    await fetch(
      `http://${backendIPAddress}/courseville/get_courses`,
      options
    )
    .then((response) => response.json())
    .then((data) => data.data.student)
    .then((course) =>{

       let len = Object.keys(course).length;
       console.log(len)
       console.log(course)
       for(let i = 0 ; i < len ; i++){
          if(course[i].year == year_data && course[i].semester == semister_dropdown_data){
            year_drop_down.innerHTML += `"<option value = ${course[i].cv_cid}> ${course[i].title} </option>"`;
          }
       }
      
    })
    .catch((error) => console.error(error));
};
const createAssignmentTable = async () => {
  let items; 
  
  const table_body = document.getElementById("main-table-body-course");
  table_body.innerHTML = "";
  const cv_cid = document.getElementById("course-dropdown").value;
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_course_assignments/ ${cv_cid}`,
    options
  )
  .then((response) => response.json())
  .then((data) => {
      items = data.data;
  })
  .catch((error) => console.error(error)); 
  /* console.log(items)
  console.log(items.length)
  let arrid = []
  let arrtype = [] */
  console.log(items)
  items.map((item) => {
     table_body.innerHTML += `
     <tr>
         <td>${item.itemid}</td>
         <td>${item.title}</td>
     </tr>
     ` 
  })
}

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};

document.getElementById("group-id").innerHTML = getGroupNumber();
let selectedRowEmail = [];
console.log("hello content js");
const headTag = document.getElementsByTagName("head")[0];
headTag.innerHTML += `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" />`;

const wrapper = document.createElement("div");
wrapper.className = "G-Ni G-aE J-J5-Ji";
wrapper.style.display = "none";
wrapper.style.position = "relative";

const container = document.createElement("div");
container.className = "T-I J-J5-Ji nX T-I-ax7 T-I-Js-Gs mA";
container.setAttribute("role", "button");
container.setAttribute("tabindex", "0");
container.setAttribute("data-tooltip", "Get sender emails");
container.setAttribute("aria-label", "Get sender emails");
container.style.userSelect = "none";
container.addEventListener("mouseover", () => {
  container.classList.add("T-I-JW");
});
container.addEventListener("mouseleave", () => {
  container.classList.remove("T-I-JW");
});
container.addEventListener("click", () => {
  // console.log("hello world from button");
  // fetch

  if (popupContainer.style.display == "none") {
    popupContainer.style.removeProperty("display");
  } else {
    popupContainer.style.display = "none";
  }
});
container.addEventListener("focusin", () => {
  container.classList.add("T-I-JO");
  container.classList.add("T-I-Kq");
});
container.addEventListener("focusout", () => {
  container.classList.remove("T-I-JO");
  container.classList.remove("T-I-Kq");
  // popupContainer.style.display = "none";
});

const iconContainer = document.createElement("div");
iconContainer.className = "asa";

const iconSection = document.createElement("div");
iconSection.className = "T-I-J3 J-J5-Ji material-icons-outlined";
iconSection.innerText = "contact_mail";
iconSection.style.display = "flex";
iconSection.style.alignItems = "center";
iconSection.style.width = "max-content";

iconContainer.appendChild(iconSection);
container.appendChild(iconContainer);
wrapper.appendChild(container);

const popupContainer = document.createElement("div");
popupContainer.className = "J-M aX0 aYO";
popupContainer.role = "menu";
popupContainer.ariaHasPopup = "true";
const popupContainerStyle = {
  "user-select": "none",
  top: "20px",
  left: "30px",
  position: "absolute",
  display: "none",
};
Object.assign(popupContainer.style, popupContainerStyle);

const popup = document.createElement("div");
popup.className = "SK AX";
const popupStyle = {
  "user-select": "none",
  "min-width": "12px",
};
Object.assign(popup.style, popupStyle);

function actions() {
  console.log("started settimeout function");

  const toolbarSection = document.getElementsByClassName("G-tF")[0];
  toolbarSection.appendChild(wrapper);

  addListenerToList();
  setInterval(addListenerToList, 5000);
}

function executeAction() {
  try {
    actions();
  } catch (error) {
    console.log("DOM not ready");
    console.log(error);
    setTimeout(executeAction, 1000);
  }
}

setTimeout(executeAction, 1000);

function addListenerToList() {
  console.log("emails listener check annd add");

  let emailList = document.getElementsByTagName("tbody");
  emailList = emailList[emailList.length - 1];

  const checkbox = [...emailList.querySelectorAll(".oZ-jc.T-Jo.J-J5-Ji")];

  checkbox.forEach((element) => {
    if (!element.getAttribute("listener")) {
      element.setAttribute("listener", "true");
      element.addEventListener("click", (event) => {
        console.log("hello world from checkbox");
        setTimeout(() => {
          getSelectedEmailList(emailList);
        }, 0);
      });
    }
  });
}

function getSelectedEmailList(emailListRef) {
  selectedRowEmail = [];
  const selectedEmailRowList = [...emailListRef.getElementsByClassName("x7")];
  selectedEmailRowList.map((emailRow) => {
    selectedRowEmail.push(
      [...emailRow.querySelectorAll("[email]")].pop().getAttribute("email")
    );
  });

  selectedRowEmail = [...new Set(selectedRowEmail)];

  console.log(selectedRowEmail);

  // Clearing popup to implement latest values
  popup.innerHTML = "";
  popupContainer.innerHTML = "";

  // Implementing latest values
  selectedRowEmail.map((email) => {
    const listItemContainer = document.createElement("div");

    listItemContainer.className = "J-N";

    listItemContainer.role = "menu-item";
    // new changes
    listItemContainer.innerHTML = `<button id="listbtn" value=${email}>${email}</button>`;

    listItemContainer.addEventListener("click", async () => {
      popupContainer.style.display = "none";
      let str = selectedRowEmail.join(",");
      //   var htmlfile = `
      //   <div style="border-radius: 5px;
      //   background-color: #f2f2f2;
      //   padding: 20px;">
      //   <form action="/action_page.php">

      //   <label for="fname">First name:</label><br>
      //   <input style="width: 100%;  padding: 12px 20px;  margin: 8px 0;  display: inline-block;  border: 1px solid #ccc;  border-radius: 4px;  box-sizing: border-box;" type="text" id="fname" name="fname" value=${email} autofocus><br>
      //   <label for="lname">Last name:</label><br>
      //   <input style="width: 100%;  padding: 12px 20px;  margin: 8px 0;  display: inline-block;  border: 1px solid #ccc;  border-radius: 4px;  box-sizing: border-box;" type="text" id="lname" name="lname" value="Doe"><br><br>
      //   <input style=" width: 100%;
      //   background-color: #4CAF50;
      //   color: white;
      //   padding: 14px 20px;
      //   margin: 8px 0;
      //   border: none;
      //   border-radius: 4px;
      //   cursor: pointer;" type="button" value="Submit" class="btn btn-primary"></input>
      // </form></div>`;
      var htmlfile = `
      <div style="border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;">
           <form>

         <p style="color:red"> Are you Sure ! You want to permenently block below Emails?</p>
         <p>${str}</p>

           <input style=" width: 100%;
        background-color: #4CAF50;
        color: white;
        padding:0px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;" type="button" value="Submit" class="btn btn-primary my-submit-btn"">></input>
         </form>
        </div>
      `;
      console.log(document.getElementsByClassName("my-submit-btn"));

      var popupElement = document.createElement("div");
      popupElement.className = "J-M aX0 aYO newPopup";
      popupElement.setAttribute("tabindex", "0");
      popupElement.style.marginTop = "9%";
      popupElement.style.marginLeft = "36%";
      popupElement.style.width = "37%";
      // popupElement.setAttribute("autofocus");
      popupElement.addEventListener("focusout", () => {
        console.log("first");
        popupElement.style.display = "none";
      });
      popupElement.role = "menu";
      popupElement.ariaHasPopup = "true";
      const popupElementStyle = {
        "user-select": "none",
        top: "20px",
        left: "30px",
        position: "absolute",
      };
      Object.assign(popupElement.style, popupElementStyle);
      const headerDiv = document.createElement("div");
      const popup = document.createElement("div");
      popup.innerHTML += htmlfile;
      popup.className = "SK AX";
      const popupStyle = {
        "user-select": "none",
        "min-width": "12px",
      };
      Object.assign(popup.style, popupStyle);
      headerDiv.appendChild(popup);
      popupElement.appendChild(headerDiv);
      document.body.appendChild(popupElement);
      var submitelement = document.getElementsByClassName("my-submit-btn")[0];
      submitelement.addEventListener("click", () => {
        console.log("submit button called ");
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selectedEmails: selectedRowEmail }),
        };
        fetch("192.168.0.253:http://localhost:8000/", requestOptions)
          .then((response) => console.log(response.json()))
          .catch((e) => console.log(e));
      });
    });

    listItemContainer.addEventListener("mouseover", () => {
      listItemContainer.classList.add("J-N-JT");
    });
    listItemContainer.addEventListener("mouseleave", () => {
      listItemContainer.classList.remove("J-N-JT");
    });

    const listItem = document.createElement("div");
    listItem.className = "J-N-Jz";
    listItem.style.userSelect = "none";
    // listItem.innerText = email;

    listItemContainer.appendChild(listItem);
    popup.appendChild(listItemContainer);
  });

  popupContainer.appendChild(popup);
  wrapper.appendChild(popupContainer);
}

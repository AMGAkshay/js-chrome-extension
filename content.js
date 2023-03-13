$(document).ready(function () {
  let selectedRowEmail = [];
  const headTag = document.getElementsByTagName("head")[0];
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
    console.log("hello world from button", selectedRowEmail);
    // console.log(selectedRowEmail.length);
    // let str = selectedRowEmail.join(",");
    let liHtml = "";
    selectedRowEmail.map((mails) => {
      liHtml += `<li>${mails}</li>`;
    });
    console.log(liHtml);
    var htmlfile = `
    <div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div style="border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;">
       <form>
     <p style="color:red"> Are you sure you want to permenently Delete Emails from below addresses?</p>
    <ul>${liHtml}</ul>
       <input style=" width: 100%;
    background-color: #4CAF50;
    color: white;
    padding:0px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;" type="button" value="Submit" class="btn btn-primary my-submit-btn""></input>
  </form>
    </div>
  </div>

</div>
    `;

    var popupElement = document.createElement("div");
    popupElement.className = "J-M aX0 aYO newPopup";
    popupElement.setAttribute("tabindex", "0");
    popupElement.style.marginTop = "9%";
    popupElement.style.marginLeft = "36%";
    popupElement.style.width = "37%";

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
    var modal = document.getElementById("myModal");

    $(".my-submit-btn").click(function () {
      // $(this).hide();
      setTimeout(() => {
        popupElement.style.display = "none";
        modal.style.display = "none";
      }, 2000);
      console.log("after timeout");
      var alertPopup = document.getElementsByClassName("vh")[0];
      alertPopup.style.background = "green";
      alertPopup.innerHTML = `<span class="aT"><span class="bAq">Messages from emails are deleted permenently!</span><span class="bAo">&nbsp;<span class="ag a8k" tabindex="0" role="alert" id="link_undo" param="#thread-a:r-4302120075518949594" idlink="" style="visibility:hidden" aria-live="assertive">Undo</span></span></span><div tabindex="0" role="button" class="bBe"><div class="bBf"></div></div>`;
      const alertpopupParent = document.getElementsByClassName("b8 UC")[0];
      alertpopupParent.classList.add("bAp");
      Object.assign(alertpopupParent.style, { position: "unset" });
      setTimeout(() => {
        alertpopupParent.classList.remove("bAp");
        Object.assign(alertpopupParent.style, { position: "relative" });
      }, 5000);
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

    $(".close").click(function () {
      popupElement.style.display = "none";
      modal.style.display = "none";
    });
  });

  const iconContainer = document.createElement("div");
  iconContainer.className = "asa";

  const iconSection = document.createElement("img");
  iconSection.className = "T-I-J3 J-J5-Ji ";
  iconSection.src = chrome.runtime.getURL("assets/filter-btn.svg");

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
        // oZ-jc T-Jo J-J5-Ji
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

    popup.innerHTML = "";
    popupContainer.innerHTML = "";

    popupContainer.appendChild(popup);
    wrapper.appendChild(popupContainer);
  }
});

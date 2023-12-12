document.addEventListener("DOMContentLoaded", function () {
  const menuList = document.getElementById("menu-list");
  const pageBuilder = document.getElementById("page-builder");

  const editPanel = document.getElementById("edit-panel");
  const editForm = document.getElementById("edit-form");
  const editContentTextarea = document.getElementById("edit-content");
  const saveButton = document.getElementById("save-button");

  let selectedComponent = null;

  // const generateUniqueId = () => {
  //   return "id-" + Date.now();
  // };

  const bootstrapComponents = {
    headerBasic: `<header> <nav class="navbar navbar-expand-lg bg-white"> <div class="container"> <a class="navbar-brand" href="#">Navbar</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" > <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarSupportedContent"> <ul class="navbar-nav ms-auto mb-2 mb-lg-0"> <li class="nav-item"> <a class="nav-link active" aria-current="page" href="#">Home</a> </li> <li class="nav-item"> <a class="nav-link" href="#">About</a> </li> <li class="nav-item"> <a class="nav-link" href="#">Contact</a> </li> </ul> </div> </div> </nav> </header>`,
    cardHri: `<div class="card"> <div class="card-header"> Featured </div> <div class="card-body"> <h5 class="card-title">Special title treatment</h5> <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> <a href="#" class="btn btn-primary">Go somewhere</a> </div></div>`,
    tableBasic: `<table class="table"> <thead> <tr> <th scope="col">#</th> <th scope="col">First</th> <th scope="col">Last</th> <th scope="col">Handle</th> </tr> </thead> <tbody> <tr> <th scope="row">1</th> <td>Mark</td> <td>Otto</td> <td>@mdo</td> </tr> <tr> <th scope="row">2</th> <td>Jacob</td> <td>Thornton</td> <td>@fat</td> </tr> <tr> <th scope="row">3</th> <td colspan="2">Larry the Bird</td> <td>@twitter</td> </tr> </tbody></table>`,
    heroOne: ` <div class="container px-4 py-5"> <div class="row flex-lg-row-reverse align-items-center g-5 py-5"> <div class="col-10 col-sm-8 col-lg-6"> <img src="https://silicon.createx.studio/assets/img/landing/app-showcase-3/categories/business.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" /> </div> <div class="col-lg-6"> <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3"> We ride. We care. We share. </h1> <p class="lead mb-4"> Empower citizens to move with ease and style by sharing sustainable vehicles. </p> <div class="d-grid gap-2 d-md-flex justify-content-md-start"> <button type="button" class="btn btn-primary btn-lg px-4 me-md-2"> Back us on Kickstarter </button> </div> </div> </div> </div>`,
    footer01: ` <svg xmlns="http://www.w3.org/2000/svg" class="d-none"> <symbol id="bootstrap" viewBox="0 0 118 94"> <title>Bootstrap</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path> </symbol> <symbol id="facebook" viewBox="0 0 16 16"> <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path> </symbol> <symbol id="instagram" viewBox="0 0 16 16"> <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path> </symbol> <symbol id="twitter" viewBox="0 0 16 16"> <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path> </symbol> </svg> <div class="container"> <footer class="py-5"> <div class="row"> <div class="col-6 col-md-2 mb-3"> <h5>Section</h5> <ul class="nav flex-column"> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li> </ul> </div> <div class="col-6 col-md-2 mb-3"> <h5>Section</h5> <ul class="nav flex-column"> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li> </ul> </div> <div class="col-6 col-md-2 mb-3"> <h5>Section</h5> <ul class="nav flex-column"> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li> <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li> </ul> </div> <div class="col-md-5 offset-md-1 mb-3"> <form> <h5>Subscribe to our newsletter</h5> <p>Monthly digest of what's new and exciting from us.</p> <div class="d-flex flex-column flex-sm-row w-100 gap-2"> <label for="newsletter1" class="visually-hidden">Email address</label> <input id="newsletter1" type="text" class="form-control" placeholder="Email address"> <button class="btn btn-primary" type="button">Subscribe</button> </div> </form> </div> </div> <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top"> <p>© 2023 Company, Inc. All rights reserved.</p> <ul class="list-unstyled d-flex"> <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li> <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li> <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li> </ul> </div> </footer> </div>`,
  };

  const saveComponentsToLocalStorage = () => {
    const components = Array.from(pageBuilder.children).map(
      (child) => child.outerHTML
    );
    localStorage.setItem("pageBuilderComponents", JSON.stringify(components));
    console.log("Local Storage Updated");
  };

  const createBootstrapComponent = (componentType, componentHTML) => {
    const component = document.createElement("div");
    component.className = "component";
    component.draggable = true;
    component.innerHTML = componentHTML;

    component.classList.add(componentType);

    component.addEventListener("dragstart", function (event) {
      console.log("Drag Start");
      event.dataTransfer.setData("text/plain", "");
    });

    const deleteButton = document.createElement("button");
    // deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger btn-sm admin-delete";
    deleteButton.style.display = "none";
    // Create an img element for the icon
    const iconImage = document.createElement("img");
    iconImage.src = "./delete.svg"; // Replace with the actual path to your icon SVG file
    iconImage.width = 18; // Set the width of the icon
    iconImage.alt = "Delete";

    // Append the img element to the button
    deleteButton.appendChild(iconImage);

    deleteButton.addEventListener("click", function () {
      component.remove();
      selectedComponent = null;
      updateButtonsVisibility();
      saveComponentsToLocalStorage();
    });
    component.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "btn btn-warning btn-sm";
    editButton.style.display = "none";
    editButton.onclick = function () {
      const editPanel = document.getElementById("edit-panel");
      const isPanelVisible = editPanel.classList.contains("show");

      if (!isPanelVisible) {
        editPanel.innerText = componentHTML;
        editPanel.classList.add("show");
      } else {
        editPanel.classList.remove("show");
      }
    };
    component.appendChild(editButton);

    pageBuilder.appendChild(component);
    saveComponentsToLocalStorage();
    handleComponentSelection(component);
  };

  // const handleComponentSelection = (component) => {
  //   if (selectedComponent) {
  //     selectedComponent.classList.remove("selected");
  //     updateButtonsVisibility();
  //   }

  //   if (selectedComponent !== component) {
  //     component.classList.add("selected");
  //     selectedComponent = component;
  //     updateButtonsVisibility();
  //   } else {
  //     selectedComponent = null;
  //   }
  // };

  // Function to handle component selection
  const handleComponentSelection = (componentKey) => {
    deselectCurrentComponent();

    const component = document.getElementById(componentKey);

    if (selectedComponent !== component) {
      selectComponent(component);
      openEditPanel(component, componentKey);
    } else {
      selectedComponent = null;
      closeEditPanel();
    }
  };

  // Function to deselect the currently selected component
  const deselectCurrentComponent = () => {
    if (selectedComponent) {
      selectedComponent.classList.remove("selected");
      updateButtonsVisibility();
    }
  };

  // Function to select a component
  const selectComponent = (component) => {
    component.classList.add("selected");
    selectedComponent = component;
    updateButtonsVisibility();
  };

  // Function to open the edit panel with the selected component's content
  const openEditPanel = (component, componentKey) => {
    if (!editPanel.classList.contains("show")) {
      const editContent = components[componentKey];
      editContentTextarea.value = editContent;
      editPanel.classList.add("show");
    }
  };

  // Function to close the edit panel
  const closeEditPanel = () => {
    editPanel.classList.remove("show");
  };

  // Function to handle save button click
  saveButton.addEventListener("click", function () {
    if (selectedComponent) {
      const componentKey = selectedComponent.id;
      const editedContent = editContentTextarea.value;
      components[componentKey] = editedContent;
      // Save to local storage
      localStorage.setItem("components", JSON.stringify(components));
      // Update the component with the edited content
      selectedComponent.innerHTML = editedContent;
      closeEditPanel();
    }
  });








  const updateButtonsVisibility = () => {
    const components = document.querySelectorAll(".component");
    components.forEach((component) => {
      const deleteButton = component.querySelector(".btn-danger");
      const editButton = component.querySelector(".btn-warning");

      if (deleteButton && editButton) {
        if (selectedComponent === component) {
          component.classList.add("selected");
          deleteButton.style.display = "block";
          // editButton.style.display = "block";
          editButton.style.display = "none";
          deleteButton.onclick = deleteElement;
        } else {
          component.classList.remove("selected");
          deleteButton.style.display = "none";
          editButton.style.display = "none";
        }
      }
    });
  };

  const attachEventListeners = () => {
    document.addEventListener("click", function (event) {
      let clickedComponent = event.target.closest(".component");

      if (!clickedComponent && selectedComponent) {
        selectedComponent.classList.remove("selected");
        selectedComponent = null;
        updateButtonsVisibility();
      }
    });

    pageBuilder.addEventListener("click", function (event) {
      const clickedComponent = event.target.closest(".component");
      if (clickedComponent) {
        handleComponentSelection(clickedComponent);
      }
    });

    menuList.addEventListener("click", function (event) {
      if (event.target.classList.contains("dropdown-item")) {
        const componentType = event.target.dataset.component;
        const componentHTML = bootstrapComponents[componentType];
        createBootstrapComponent(componentType, componentHTML);
      }
    });

    new Sortable(pageBuilder, {
      animation: 150,
      handle: ".component",
      onUpdate: function () {
        saveComponentsToLocalStorage();
      },
    });

    pageBuilder.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
  };

  const loadComponentsFromLocalStorage = () => {
    const savedComponents = JSON.parse(
      localStorage.getItem("pageBuilderComponents")
    );
    if (savedComponents) {
      savedComponents.forEach((componentHTML) => {
        const component = document.createElement("div");
        component.className = "component";
        component.innerHTML = componentHTML;

        component.addEventListener("click", function () {
          handleComponentSelection(component);
        });

        pageBuilder.appendChild(component);
      });

      updateButtonsVisibility();
    }
  };

  loadComponentsFromLocalStorage();
  attachEventListeners();

  function deleteElement() {
    component = document.getElementsByClassName("selected")[0];
    if (component) component.remove();
    saveComponentsToLocalStorage();
  }
});

function downloadPage() {
  // Get the HTML content of the page builder
  const pageBuilderContent = document.getElementById("page-builder").outerHTML;

  // Add HTML boilerplate and your custom styles
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <link rel="stylesheet" href="bulider.css" />
  <link rel="stylesheet" href="theme.css" />
</head>
<body class="admin">
  ${pageBuilderContent}

  <!-- Include Bootstrap JavaScript files -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>
`;

  // Create a Blob containing the HTML content
  const blob = new Blob([htmlContent], { type: "text/html" });

  // Create a download link and trigger the download
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "page-builder.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const exportButton = document.getElementById("export-button");

// Add a click event listener to the export button
exportButton.addEventListener("click", function () {
  downloadPage();
});

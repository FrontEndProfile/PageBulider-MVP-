// document.addEventListener('DOMContentLoaded', function () {
//     const menuList = document.getElementById('menu-list');
//     const pageBuilder = document.getElementById('page-builder');

//     // Load components from local storage
//     const savedComponents = JSON.parse(localStorage.getItem('pageBuilderComponents')) || [];
//     pageBuilder.innerHTML = savedComponents.join('');

//     // Function to create a new component
//     function createComponent(componentType) {
//         const component = document.createElement('div');
//         component.className = 'component';
//         component.draggable = true;
//         component.textContent = componentType;

//         // Add custom styling based on component type
//         component.classList.add(componentType);

//         // Add drag start event listener
//         component.addEventListener('dragstart', function (event) {
//             console.log('Drag Start');
//             event.dataTransfer.setData('text/plain', ''); // Required for Firefox
//         });

//         pageBuilder.appendChild(component);

//         // Save components to local storage
//         saveComponentsToLocalStorage();
//     }

//     // Function to save components to local storage
//     function saveComponentsToLocalStorage() {
//         const components = Array.from(pageBuilder.children).map(child => child.outerHTML);
//         localStorage.setItem('pageBuilderComponents', JSON.stringify(components));
//     }

//     // Add click event listener to menu items
//     menuList.addEventListener('click', function (event) {
//         if (event.target.tagName === 'LI') {
//             const componentType = event.target.dataset.component;
//             createComponent(componentType);
//         }
//     });

//     // Initialize SortableJS on the pageBuilder element
//     new Sortable(pageBuilder, {
//         animation: 150, // ms, animation speed moving items when sorting
//         handle: '.component', // Restricts sort start click/touch to the specified element
//         onUpdate: function () {
//             // Called when the order changes
//             saveComponentsToLocalStorage();
//         },
//     });

//     // Prevent default behavior for the dragover event
//     pageBuilder.addEventListener('dragover', function (event) {
//         event.preventDefault();
//     });
// });


























document.addEventListener('DOMContentLoaded', function () {
    const menuList = document.getElementById('menu-list');
    const pageBuilder = document.getElementById('page-builder');
  
    // Define Bootstrap components with their corresponding HTML
    const bootstrapComponents = {
      headerBasic: '<header> <nav class="navbar navbar-expand-lg bg-white"> <div class="container-fluid"> <a class="navbar-brand" href="#">Navbar</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" > <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarSupportedContent"> <ul class="navbar-nav ms-auto mb-2 mb-lg-0"> <li class="nav-item"> <a class="nav-link active" aria-current="page" href="#">Home</a> </li> <li class="nav-item"> <a class="nav-link" href="#">About</a> </li> <li class="nav-item"> <a class="nav-link" href="#">Contact</a> </li> </ul> </div> </div> </nav> </header>',
      offcanvasBasic: '<header> <nav class="navbar bg-white fixed-top"> <div class="container-fluid"> <a class="navbar-brand" href="#">Offcanvas navbar</a> <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"> <div class="offcanvas-header"> <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5> <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> </div> <div class="offcanvas-body"> <ul class="navbar-nav justify-content-end flex-grow-1 pe-3"> <li class="nav-item"> <a class="nav-link active" aria-current="page" href="#">Home</a> </li> <li class="nav-item"> <a class="nav-link" href="#">Link</a> </li> <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown </a> <ul class="dropdown-menu"> <li><a class="dropdown-item" href="#">Action</a></li> <li><a class="dropdown-item" href="#">Another action</a></li> <li> <hr class="dropdown-divider"> </li> <li><a class="dropdown-item" href="#">Something else here</a></li> </ul> </li> </ul> <form class="d-flex mt-3" role="search"> <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> <button class="btn btn-outline-success" type="submit">Search</button> </form> </div> </div> </div> </nav> </header>',
      button: '<button type="button" class="btn btn-primary">Button</button>',
      alert: '<div class="alert alert-warning" role="alert">This is a warning alert</div>',
      // Add more components as needed
    };
  
    // Load components from local storage
    const savedComponents = JSON.parse(localStorage.getItem('pageBuilderComponents')) || [];
    pageBuilder.innerHTML = savedComponents.join('');
  
    // Function to create a new Bootstrap component
    function createBootstrapComponent(componentType) {
      const componentHTML = bootstrapComponents[componentType];
      if (componentHTML) {
        const component = document.createElement('div');
        component.className = 'component';
        component.draggable = true;
        component.innerHTML = componentHTML;
  
        // Add custom styling based on component type
        component.classList.add(componentType);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm ms-2';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
          deleteComponent(component);
        };
        component.appendChild(deleteButton);
  
        // Add drag start event listener
        component.addEventListener('dragstart', function (event) {
          console.log('Drag Start');
          event.dataTransfer.setData('text/plain', ''); // Required for Firefox
        });
  
        pageBuilder.appendChild(component);
  
        // Save components to local storage
        saveComponentsToLocalStorage();
      }
    }

    // Function to delete a component
    function deleteComponent(component) {
      component.remove();

      // Save components to local storage after deletion
      saveComponentsToLocalStorage();
    }
  
    // Function to save components to local storage
    function saveComponentsToLocalStorage() {
      const components = Array.from(pageBuilder.children).map((child) => child.outerHTML);
      localStorage.setItem('pageBuilderComponents', JSON.stringify(components));
    }
  
    // Add click event listener to menu items
    menuList.addEventListener('click', function (event) {
      if (event.target.tagName === 'LI') {
        const componentType = event.target.dataset.component;
        createBootstrapComponent(componentType);
      }
    });
  
    // Initialize SortableJS on the pageBuilder element
    new Sortable(pageBuilder, {
      animation: 150, // ms, animation speed moving items when sorting
      handle: '.component', // Restricts sort start click/touch to the specified element
      onUpdate: function () {
        // Called when the order changes
        saveComponentsToLocalStorage();
      },
    });
  
    // Prevent default behavior for the dragover event
    pageBuilder.addEventListener('dragover', function (event) {
      event.preventDefault();
    });
  });
  
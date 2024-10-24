# Order Portal

This project is an Angular application for managing orders, products, and users. It includes features such as reviewing orders, linking users to orders, and managing the order process through a wizard interface.

## Install the dependencies:
Development Server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Code Scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Running unit tests
Run ng test to execute the unit tests via Karma.

Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.

## Technical Details

### Singleton Design Pattern
In this project, services are typically implemented as singletons. This means that a single instance of the service is created and shared across the entire application. This is achieved by providing the service in the root injector. The Singleton design pattern ensures that there is only one instance of a service, which can be accessed globally. This is particularly useful for managing state and sharing data between different parts of the application.

### Lazy Loading
Lazy loading is used to improve the performance of the application by loading modules only when they are needed. This reduces the initial load time of the application. In Angular, lazy loading is implemented using the loadChildren property in the route configuration. By splitting the application into multiple modules and loading them on demand, we can optimize the application's performance and resource usage.

### TypeScript
TypeScript is a statically typed superset of JavaScript that adds optional types, classes, and interfaces. It helps in catching errors early during development and provides better tooling support. In this project, TypeScript is used throughout the application to define types for data models, enforce type safety, and improve code readability and maintainability. The use of TypeScript ensures that the code is robust and less prone to runtime errors.

### Services

#### UsersService
Manages user data, including fetching all users and adding new users. This service is responsible for handling user-related operations and maintaining the user state.

#### OrderWizardService
Manages the current wizard order state, including personal information, items, and payment method. This service ensures that the order process is handled smoothly and that the state is maintained across different steps of the wizard.

#### ShoppingCartService
Manages the shopping cart items. This service handles operations related to adding, editing, and deleting items in the shopping cart, as well as clearing the cart when necessary.

## Contributing
Contributions are welcome! Please read the CONTRIBUTING.md for details on the code of conduct, and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
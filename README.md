# Express Setup VS Code Extension

## Description

The **Express Setup** extension for Visual Studio Code simplifies the process of creating a new Express project. With a single command, it automatically generates the necessary project structure, installs essential dependencies, and configures important files for you. This extension is ideal for developers who want to quickly set up a new Express-based backend project without manually setting up the file structure and configurations.

### Key Features

- **Automatic Project Structure**: The extension creates all the standard directories and files typically found in an Express project, such as:

  - `src/config`, `src/controllers`, `src/routes`, `src/middlewares`, `src/models`, etc.
  - `public` folder for static files like CSS, JS, and images.
  - Default `README.md`, `.env`, and `.gitignore` files.

- **Package Setup**: It automatically runs `npm init` to initialize a `package.json` file, and installs core dependencies like **Express** and **Nodemon** for development.

- **Pre-configured Scripts**: The extension adds useful `npm` scripts to the `package.json`:

  - `start`: Runs the app with Node.js.
  - `dev`: Runs the app with Nodemon for auto-reloading during development.

- **Ready-to-Use Default Route**: The extension creates a simple `index.js` file in the routes folder, with a "Hello World" route that you can run immediately after setting up the project.

## How It Works

1. **Create the Project**: Open a folder in Visual Studio Code where you want to set up the Express project.
2. **Run the Command**: Open the command palette (`Ctrl + Shift + P`), search for **Create Express Project**, and run it.
3. **Automatic Setup**: The extension will:
   - Create the project structure.
   - Initialize `npm` and install Express and Nodemon.
   - Modify `package.json` to add start and dev scripts.
   - Generate basic content for each file, including a "Hello World" route.
4. **Start the Project**: After the setup, you can run the project using:
   - `npm run start` (production mode).
   - `npm run dev` (development mode with automatic reloading).

## Why Use It?

This extension eliminates the repetitive and manual setup tasks that are commonly required when starting an Express project. It's perfect for developers who:

- Want to quickly prototype a new Express API.
- Prefer a standard project structure without the hassle of creating directories and writing boilerplate code.
- Need to get a new backend server up and running in just a few steps.

## Installation

1. Install the **Express Setup** extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com).
2. Open your desired folder in VS Code.
3. Run the `Create Express Project` command from the command palette (`Ctrl + Shift + P`).

## After Setup

Once the setup is complete:

- Your project will have a clean and organized file structure.
- You can start developing your Express app, with a basic "Hello World" route already in place.
- Use `npm run start` for production or `npm run dev` for development mode with Nodemon.

## Requirements

- **Node.js**: >= 12.x
- **npm**: >= 6.x

## Contributing

Feel free to contribute to this project! Fork the repository, make your changes, and submit a pull request for any enhancements, bug fixes, or new features.

---

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

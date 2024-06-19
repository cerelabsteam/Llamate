# 🌟 Contribute to Llamate 🌟

Welcome, amazing contributor! We're thrilled to have you here. By contributing to Llmate, you can help make our project better, more fun, and more impactful. Whether you're a coding wizard, a documentation guru, or a design enthusiast, we appreciate your efforts and can't wait to see what you bring to the table.

## 📜 Code of Conduct

Our community is built on respect, inclusivity, and collaboration. Please read and adhere to our [Code of Conduct](https://github.com/cerelabsteam/Llamate/blob/main/CODE_OF_CONDUCT.md) to ensure a welcoming environment for everyone.

## 🚀 Getting Started

Ready to dive in? Awesome! Follow these steps to get set up:

1. **Fork the repository** to your GitHub account.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/cerelabsteam/Llamate.git
   ```
3. **Navigate to the project directory**:
   ```bash
   cd Llamate
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Run the project**:
   ```bash
   npm run dev
   ```

## 💡 How to Contribute

### 🛠️ Submitting Changes

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
2. **Make your changes** in the new branch.
3. **Commit your changes** with a clear and descriptive commit message:
   ```bash
   git commit -m "Add feature-name: Description of your changes"
   ```
4. **Push your changes** to your fork:
   ```bash
   git push origin feature-name
   ```
5. **Create a pull request** from your fork to the main repository. Include a detailed description of your changes and any relevant issues it addresses.

### 🐛 Reporting Issues

Found a bug? Have an idea for a new feature? [Open an issue](https://github.com/cerelabsteam/Llamate/issues) on GitHub. Provide as much detail as possible to help us understand and address it.

### 🐛 Contributing fixes or extensions

If there is a bug and you want to fix it, feel free to do so by submitting a pull request. We will review it proactively. Once it’s approved, we will merge it.

If you’d like to suggest any extension, please submit a pull request.

## 🎨 Style Guides

### 📏 Code Style

- Write clear and descriptive commit messages.
- Ensure your code is properly formatted and linted.

### Recommended Tools and Extensions

To maintain consistency and code quality, we recommend using the following tools and extensions in VSCode:

1. **Prettier - Code Formatter**: Automatically format your code to follow the style guide.

   - Install from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
   - Configure it to format on save by adding the following to your `settings.json`:
     ```json
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
     ```

2. **TypeScript Import Sorter**: Automatically sort your TypeScript imports.
   - Install from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=miclo.sort-typescript-imports).
   - Configure it by adding the following to your `settings.json`:
     ```json
     "typescriptHero.imports.organizeOnSave": true
     ```

### Dependencies

In addition to the recommended tools and extensions, make sure to use the following dependencies for consistent development:

1. **Gitmoji**: Standardize your commit messages with emojis.

   - Install globally using npm:
     ```bash
     npm install -g gitmoji-cli
     ```
   - To use Gitmoji for your commits, run:
     ```bash
     gitmoji -c
     ```

2. **Prettier**: Ensure your code is formatted consistently.

   - Install Prettier as a dev dependency:
     ```bash
     npm install --save-dev prettier
     ```
   - Add a `.prettierrc` configuration file to your project with your preferred settings.

3. **TypeScript Import Sorter**: Ensure your TypeScript imports are sorted.
   - Install as a dev dependency:
     ```bash
     npm install --save-dev typescript-import-sorter
     ```
   - Configure your project to use TypeScript Import Sorter.

### Setup Instructions

1. **Install Recommended Extensions**:

   - Open VSCode.
   - Go to the Extensions view by clicking the Extensions icon in the Sidebar or pressing `Ctrl+Shift+X`.
   - Search for each of the recommended extensions listed above and click "Install".

2. **Configure Settings**:

   - Open your VSCode settings by pressing `Ctrl+,`.
   - Add the recommended settings to your `settings.json` as mentioned above for Prettier and TypeScript Import Sorter.

3. **Install Dependencies**:

   - Install project dependencies by running:
     ```bash
     npm install
     ```

4. **Ensure Code is Properly Linted and Formatted**:
   - Make sure to run your linter and formatter before committing your code.
   - You can add pre-commit hooks to automate this process using tools like `husky`.

By following these steps, you can ensure that your code adheres to the project's style guide and maintains high quality.

Help us maintain high quality by writing and running tests:

1. **Run the tests**:
   ```bash
   npm test
   ```
2. **Add new tests** for any new features or bug fixes.
3. **Ensure** your code coverage is adequate.

## 📬 Additional Information

- **Communication**: For questions or discussions, contact us at contact@cerelabs.com
- **License**: By contributing, you agree that your contributions will be licensed under the project's [LICENSE](https://github.com/cerelabsteam/Llamate/blob/main/LICENSE.md).

## 🌈 Thank You!

We appreciate your time and effort in contributing to Llmate! Your contributions help make this project better for everyone. Let's create something amazing together!

Happy coding! 🚀

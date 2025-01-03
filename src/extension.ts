import * as vscode from 'vscode';
import { exec } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.createExpressProject', async () => {
        const folderPath = vscode.workspace.rootPath;

        if (!folderPath) {
            vscode.window.showErrorMessage('Please open a folder first.');
            return;
        }

        try {
            const directories = [
                'src/config', 'src/controllers', 'src/middlewares', 'src/models', 'src/routes', 'src/services', 'src/utils', 'src/views',
                'public/css', 'public/js', 'public/images'
            ];

            // Check if all directories already exist
            const allDirectoriesExist = directories.every(dir => existsSync(join(folderPath, dir)));

            if (allDirectoriesExist) {
                vscode.window.showWarningMessage('All required folders already exist. No changes made.');
                return;
            }

            // Create directories
            directories.forEach(dir => {
                const dirPath = join(folderPath, dir);
                if (!existsSync(dirPath)) {
                    mkdirSync(dirPath, { recursive: true });
                }
            });

            const files = [
                'src/config/database.js', 'src/config/dotenv.js',
                'src/controllers/userController.js', 'src/controllers/authController.js',
                'src/middlewares/authMiddleware.js',
                'src/models/User.js',
                'src/routes/userRoutes.js', 'src/routes/authRoutes.js', 'src/routes/index.js',
                'src/utils/helpers.js',
                'src/app.js', 'src/server.js',
                '.env', '.gitignore', 'README.md'
            ];

            files.forEach(file => {
                const filePath = join(folderPath, file);
                if (!existsSync(filePath)) {
                    writeFileSync(filePath, '');
                }
            });

            const indexContent = `import { Router } from 'express';
const router = Router();

// Default route
router.get('/', (req, res) => {
    res.send('Hello World');
});

export default router;
`;
            writeFileSync(join(folderPath, 'src/routes/index.js'), indexContent);

            const appContent = `import express from 'express';
import indexRoutes from './routes/index.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', indexRoutes);

export default app;
`;
            writeFileSync(join(folderPath, 'src/app.js'), appContent);

            const serverContent = `import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(\`Server is running on http://localhost:\${PORT}\`);
});
`;
            writeFileSync(join(folderPath, 'src/server.js'), serverContent);

            const envContent = `# Environment Variables
PORT=3000
DATABASE_URL=
SECRET_KEY=
`;
            writeFileSync(join(folderPath, '.env'), envContent);

            const gitignoreContent = `# Node modules
node_modules/

# Environment files
.env

# Logs
logs/
*.log

# Build files
dist/
`;
            writeFileSync(join(folderPath, '.gitignore'), gitignoreContent);

            exec('npm init -y', { cwd: folderPath }, (err, stdout) => {
                if (err) {
                    vscode.window.showErrorMessage('Error initializing npm project.');
                    return;
                }
                console.log(stdout);

                const packageJsonPath = join(folderPath, 'package.json');
                const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
                packageJson.type = 'module'; // Add "type": "module"
                packageJson.scripts = packageJson.scripts || {};
                packageJson.scripts.start = 'node src/server.js';
                packageJson.scripts.dev = 'nodemon src/server.js';
                writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

                exec('npm install express', { cwd: folderPath }, (err, stdout) => {
                    if (err) {
                        vscode.window.showErrorMessage('Error installing express.');
                        return;
                    }
                    console.log(stdout);

                    exec('npm install --save-dev nodemon', { cwd: folderPath }, (err, stdout) => {
                        if (err) {
                            vscode.window.showErrorMessage('Error installing nodemon.');
                            return;
                        }
                        console.log(stdout);

                        vscode.window.showInformationMessage('Express project setup complete!');
                    });
                });
            });
        } catch (error) {
            if (error instanceof Error) {
                vscode.window.showErrorMessage(`Error setting up project: ${error.message}`);
            } else {
                vscode.window.showErrorMessage('An unknown error occurred.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

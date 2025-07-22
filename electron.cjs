const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const waitPort = require('wait-port');

let serverProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  // Point to local SSR server
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(async () => {
  // Start the SSR server
  const serverEntry = path.join(__dirname, 'build/server/index.js');

  serverProcess = spawn('npx', ['react-router-serve', serverEntry], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true, // required for Windows users
    env: {
        ...process.env,
        REACT_ROUTER_SERVE_PORT: '3000'
    }
  });

  const open = await waitPort({ host: 'localhost', port: 3000 });
  if (open) createWindow();
});

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
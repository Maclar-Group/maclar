const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Используйте true в производственном приложении для безопасности
    },
    icon: path.join(__dirname, 'logo.ico')
  });

  mainWindow.loadFile('Index.html');

  // Создание контекстного меню
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Назад',
      click: () => {
        if (mainWindow.webContents.canGoBack()) {
          mainWindow.webContents.goBack();
        }
      }
    },
    {
      label: 'Вперед',
      click: () => {
        if (mainWindow.webContents.canGoForward()) {
          mainWindow.webContents.goForward();
        }
      }
    },
    {
      label: 'Обновить',
      click: () => {
        mainWindow.reload();
      }
    },
    {type: 'separator'},
    {
      label: 'Код элемента',
      click: () => {
        mainWindow.webContents.openDevTools();
      }
    },
    { type: 'separator' }, // Разделитель
    {
      label: 'Закрыть',
      role: 'quit' // Закрывает приложение
    }
  ]);

  // Устанавливаем контекстное меню для окна
  mainWindow.webContents.on('context-menu', (event) => {
    event.preventDefault(); // Предотвращаем стандартное контекстное меню
    contextMenu.popup({ window: mainWindow }); // Показываем наше контекстное меню
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Создание окна при готовности приложения
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Выход из приложения, когда все окна закрыты (кроме macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


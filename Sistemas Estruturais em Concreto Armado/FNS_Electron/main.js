const {app} = require("electron")

const createWindow = ()=>{
    const win = new BrowserWindow({
        width:1024,
        height:720,
        backgroundColor:'rgb(210, 115, 0)',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    }) 
    win.loadFile('index.html')
    win.webContents.openDevTools()
}

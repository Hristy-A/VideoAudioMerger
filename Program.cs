using ElectronNET.API;
using ElectronNET.API.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElectron();
builder.WebHost.UseElectron(args);


if (HybridSupport.IsElectronActive)
{
    var win = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
    {
        Height = 700,
        Width = 800,
        MinHeight = 700,
        MinWidth = 600,
        Center = true,
        Show = false,
    });
    
    win.RemoveMenu();

    win.WebContents.OnDidFinishLoad += () =>
    {
        win.Show();
    };
    
    win.OnClosed += () =>
    {
        Electron.App.Quit();
    };
}

var app = builder.Build();

app.UseFileServer();

app.Run();

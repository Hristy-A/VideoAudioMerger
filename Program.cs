using ElectronNET.API;
using VideoAudioMerger.Services;
using VideoAudioMerger.Windows;
using VideoAudioMerger.Windows.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElectron();
builder.WebHost.UseElectron(args);

var pageUrlResolver = new HttpPageUrlResolver();
builder.Services.AddSingleton<IPageUrlResolver>(pageUrlResolver);

var mainWindow = new MainWindow(pageUrlResolver);
await mainWindow.Open();

var app = builder.Build();

app.UseStaticFiles();

app.Run();

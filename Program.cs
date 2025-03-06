using ElectronNET.API;
using VideoAudioMerger.Services;
using VideoAudioMerger.Windows;
using VideoAudioMerger.Windows.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElectron();
builder.WebHost.UseElectron(args);

var pageUrlResolver = new HttpPageUrlResolver();
builder.Services.AddSingleton<IPageUrlResolver>(pageUrlResolver);

var app = builder.Build();

app.UseStaticFiles();

var mainWindow = new MainWindow(pageUrlResolver);
await mainWindow.Open();

AppDomain.CurrentDomain.UnhandledException += (_, args) =>
{
    Console.WriteLine(args.ExceptionObject);
};

app.Run();



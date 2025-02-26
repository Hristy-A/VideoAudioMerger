using ElectronNET.API;
using ElectronNET.API.Entities;

namespace VideoAudioMerger.Windows.Interfaces;

public interface IWindow
{
    BrowserWindow? BrowserWindow { get; }
    
    Task Open();
    Task Open(BrowserWindowOptions options);
    void Close();
}
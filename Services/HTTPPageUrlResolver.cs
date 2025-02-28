using ElectronNET.API;
using VideoAudioMerger.Windows.Interfaces;

namespace VideoAudioMerger.Services;

public class HttpPageUrlResolver : IPageUrlResolver
{
    public readonly ushort Port;
    public readonly string BaseUrl;

    public HttpPageUrlResolver(): this(ushort.Parse(BridgeSettings.WebPort)) {}
    public HttpPageUrlResolver(ushort port)
    {
        Port = port;
        BaseUrl = $"http://localhost:{port}/pages";
    }
        
    public string GetPageUrl(string page)
    {
        return $"{BaseUrl}/{page}/{page}.html";
    }
}
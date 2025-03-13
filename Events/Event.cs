using ElectronNET.API;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using VideoAudioMerger.Exceptions;

namespace VideoAudioMerger.Events;

public class Event
{
    public const string WindowIdKey = "windowId";
    public readonly int WindowId;
    public readonly BrowserWindow BrowserWindow;

    public Event(object obj)
    {
        if (obj is not JObject jObj) throw new InvalidEventException();
        if (jObj[WindowIdKey] is null) throw new InvalidEventException();

        WindowId = (int)jObj[WindowIdKey]!;
        BrowserWindow = Electron.WindowManager.BrowserWindows.First(w => w.Id == WindowId);
    }
}

public class Event<T> : Event where T : class 
{
    public const string DataKey = "data";
    public readonly T Data = null!;

    public Event(object obj) : base(obj)
    {
        if (obj is not JObject jObj) throw new InvalidEventException();

        var data = jObj[DataKey];
        if (data is null) return;
        
        Data = data.ToObject<T>(new JsonSerializer
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            }
        }) ?? throw new InvalidEventException();
    }
}
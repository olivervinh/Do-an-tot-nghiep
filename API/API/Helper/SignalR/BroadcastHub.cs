using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Helper.SignalR
{
    public interface IHubClient
    {
        Task BroadcastMessage();
    }
    public class BroadcastHub : Hub<IHubClient>
    {
    }
}

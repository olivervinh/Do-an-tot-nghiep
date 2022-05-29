using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Linq;
namespace API.Helper
{
    public static class StringHelper
    {
        public static string RandomString(int length)
        {
            Random random = new Random();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static int XuLyIdSPBT(string s)
        {
            string[] arrListStr = s.Split(" ");
            return int.Parse(arrListStr[1]);
        }
    }
}

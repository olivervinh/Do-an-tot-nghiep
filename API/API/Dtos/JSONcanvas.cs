using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class Object
    {
        public string type { get; set; }
        public string version { get; set; }
        public string originX { get; set; }
        public string originY { get; set; }
        public int left { get; set; }
        public int top { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public string fill { get; set; }
        public object stroke { get; set; }
        public int strokeWidth { get; set; }
        public object strokeDashArray { get; set; }
        public string strokeLineCap { get; set; }
        public int strokeDashOffset { get; set; }
        public string strokeLineJoin { get; set; }
        public bool strokeUniform { get; set; }
        public int strokeMiterLimit { get; set; }
        public double scaleX { get; set; }
        public double scaleY { get; set; }
        public int angle { get; set; }
        public bool flipX { get; set; }
        public bool flipY { get; set; }
        public int opacity { get; set; }
        public object shadow { get; set; }
        public bool visible { get; set; }
        public string backgroundColor { get; set; }
        public string fillRule { get; set; }
        public string paintFirst { get; set; }
        public string globalCompositeOperation { get; set; }
        public int skewX { get; set; }
        public int skewY { get; set; }
        public int cropX { get; set; }
        public int cropY { get; set; }
        public string src { get; set; }
        public object crossOrigin { get; set; }
        public List<object> filters { get; set; }
        public int id { get; set; }
    }
    public class Root
    {
        public string version { get; set; }
        public List<Object> objects { get; set; }
    }
}

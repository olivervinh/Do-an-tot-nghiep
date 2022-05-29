namespace API.Dtos
{
    public class TotalCart
    {
        public TotalCart(int totalQty)
        {
            this.totalQty = totalQty;
        }
        public int totalQty { get; set; }
    }
}

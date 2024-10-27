namespace TaskManager.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string Line1 { get; set; }
        public string? Line2 { get; set; }
        public string City { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}

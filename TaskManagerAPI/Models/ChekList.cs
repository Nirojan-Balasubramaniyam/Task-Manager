namespace TaskManager.Models
{
    public class ChekList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool isChecked { get; set; }
        public int TaskId { get; set; }
        public TaskItem? Task {  get; set; }    
    }
}

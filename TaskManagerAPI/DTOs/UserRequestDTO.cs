﻿using TaskManager.Models;

namespace TaskManager.DTOs
{
    public class UserRequestDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public Role Role { get; set; }
        public Address? Address { get; set; }
        public ICollection<TaskItem>? Tasks { get; set; }
    }
}

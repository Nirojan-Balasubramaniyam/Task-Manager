﻿using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Database
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<TaskItem> Tasks {  get; set; }
        public DbSet<User> Users { get; set; } 
    }
}

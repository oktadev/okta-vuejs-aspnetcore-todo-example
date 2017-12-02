using System;

namespace Vue2Spa.Models
{
    public class TodoItemModel
    {
        public Guid Id { get; set; }

        public string Text { get; set; }

        public bool Completed { get; set; }
    }
}

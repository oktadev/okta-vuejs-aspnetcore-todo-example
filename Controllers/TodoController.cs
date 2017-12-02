using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Vue2Spa.Services;
using Vue2Spa.Models;

namespace Vue2Spa.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class TodoController : Controller
    {
        private readonly ITodoItemService _todoItemService;

        public TodoController(ITodoItemService todoItemService)
        {
            _todoItemService = todoItemService;
        }

        // GET /api/todo
        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (string.IsNullOrEmpty(userId)) return BadRequest();

            var todos = await _todoItemService.GetItems(userId);
            var todosInReverseOrder = todos.Reverse();

            return Ok(todosInReverseOrder);
        }

        // POST /api/todo
        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody]TodoItemModel newTodo)
        {
            if (string.IsNullOrEmpty(newTodo?.Text)) return BadRequest();

            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (string.IsNullOrEmpty(userId)) return BadRequest();

            await _todoItemService.AddItem(userId, newTodo.Text);

            return Ok();
        }

        // POST /api/todo/{id}
        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateTodo(Guid id, [FromBody]TodoItemModel updatedData)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (string.IsNullOrEmpty(userId)) return BadRequest();

            await _todoItemService.UpdateItem(userId, id, updatedData);

            return Ok();
        }

        // DELETE /api/todo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(Guid id)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
            if (string.IsNullOrEmpty(userId)) return BadRequest();

            try
            {
                await _todoItemService.DeleteItem(userId, id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
    }
}

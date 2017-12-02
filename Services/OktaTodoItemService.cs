using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Okta.Sdk;
using Vue2Spa.Models;

namespace Vue2Spa.Services
{
    public class OktaTodoItemService : ITodoItemService
    {
        private const string TodoProfileKey = "todos";

        private readonly IOktaClient _oktaClient;

        public OktaTodoItemService(IOktaClient oktaClient)
        {
            _oktaClient = oktaClient;
        }

        private IEnumerable<TodoItemModel> GetItemsFromProfile(IUser oktaUser)
        {
            if (oktaUser == null)
            {
                return Enumerable.Empty<TodoItemModel>();
            }

            var json = oktaUser.Profile.GetProperty<string>(TodoProfileKey);
            if (string.IsNullOrEmpty(json))
            {
                return Enumerable.Empty<TodoItemModel>();
            }

            return JsonConvert.DeserializeObject<TodoItemModel[]>(json);
        }

        private async Task SaveItemsToProfile(IUser user, IEnumerable<TodoItemModel> todos)
        {
            var json = JsonConvert.SerializeObject(todos.ToArray());

            user.Profile[TodoProfileKey] = json;
            await user.UpdateAsync();
        }

        public async Task AddItem(string userId, string text)
        {
            var user = await _oktaClient.Users.GetUserAsync(userId);

            var existingItems = GetItemsFromProfile(user)
                .ToList();

            existingItems.Add(new TodoItemModel
            {
                Id = Guid.NewGuid(),
                Completed = false,
                Text = text
            });

            await SaveItemsToProfile(user, existingItems);
        }

        public async Task DeleteItem(string userId, Guid id)
        {
            var user = await _oktaClient.Users.GetUserAsync(userId);

            var updatedItems = GetItemsFromProfile(user)
                .Where(item => item.Id != id);

            await SaveItemsToProfile(user, updatedItems);
        }

        public async Task<IEnumerable<TodoItemModel>> GetItems(string userId)
        {
            var user = await _oktaClient.Users.GetUserAsync(userId);
            return GetItemsFromProfile(user);
        }

        public async Task UpdateItem(string userId, Guid id, TodoItemModel updatedData)
        {
            var user = await _oktaClient.Users.GetUserAsync(userId);

            var existingItems = GetItemsFromProfile(user)
                .ToList();

            var itemToUpdate = existingItems
                .FirstOrDefault(item => item.Id == id);
            if (itemToUpdate == null)
            {
                return;
            }

            // Update the item with the new data
            itemToUpdate.Completed = updatedData.Completed;
            if (!string.IsNullOrEmpty(updatedData.Text))
            {
                itemToUpdate.Text = updatedData.Text;
            }

            await SaveItemsToProfile(user, existingItems);
        }
    }
}

using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RoleBackend.Models;

namespace RoleBackend.Services
{
    public class EmployeeServices
    {
        private readonly IMongoCollection<User> _users;

        public EmployeeServices(
        IOptions<UserDatabaseSetting> UserDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                UserDatabaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                UserDatabaseSetting.Value.DatabaseName);

            _users = mongoDatabase.GetCollection<User>(
                UserDatabaseSetting.Value.UserCollectionName);
        }
        public async Task<List<User>> GetUserAsync() =>
        await _users.Find(_ => true).ToListAsync();

        

        public async Task<User> GetUserAsync(string id) =>
            await _users.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<string> CreateUserAsync(User newUser)
        {
            await _users.InsertOneAsync(newUser);
            return newUser.Id;
        }
       

    //public async Task UpdateAsync(string id, Book updatedBook) =>
    //    await _booksCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    //public async Task RemoveAsync(string id) =>
    //    await _booksCollection.DeleteOneAsync(x => x.Id == id);

}
}

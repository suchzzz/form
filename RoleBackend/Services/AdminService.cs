using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RoleBackend.Models;

namespace RoleBackend.Services
{
    public class AdminService
    {

        public GenericClass<User> admin = new GenericClass<User>(UserDatabaseSetting,"UserCollectionName");

        //private readonly IMongoCollection<User> _users;
        //public AdminService(
        //IOptions<UserDatabaseSetting> UserDatabaseSetting)
        //{
        //    var mongoClient = new MongoClient(
        //        UserDatabaseSetting.Value.ConnectionString);

        //    var mongoDatabase = mongoClient.GetDatabase(
        //        UserDatabaseSetting.Value.DatabaseName);
        //    _users = mongoDatabase.GetCollection<User>(
        //        UserDatabaseSetting.Value.UserCollectionName);
        //}
        //public async Task<List<User>> GetAdminAsync() =>
        //    await _users.Find(_ => true).ToListAsync();
        //public async Task<User?> GetAdminAsync(string id) =>
        //    await _users.Find(x => x.Id == id).FirstOrDefaultAsync();

        //public async Task CreateAdminAsync(User newUser)
        //{
        //    await _users.InsertOneAsync(newUser);
        //}
    }
}

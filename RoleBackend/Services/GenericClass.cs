using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RoleBackend.Models;

namespace RoleBackend.Services
{
    public class GenericClass<T> where T : GenericModel
    {
        private readonly IMongoCollection<T> _datas;
        public GenericClass(IOptions<UserDatabaseSetting> UserDatabaseSetting, string collectionName)
        {
            var mongoClient = new MongoClient(
                UserDatabaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                UserDatabaseSetting.Value.DatabaseName);

            var collection = $"UserDatabaseSetting.Value.{collectionName}";
            _datas = mongoDatabase.GetCollection<T>(collection);
        }

        public async Task<List<T>> GetAdminAsync() =>
         await _datas.Find(_ => true).ToListAsync();
        public async Task<T> GetAdminAsync(string id) =>
            await _datas.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAdminAsync(T newUser)   
        {
            await _datas.InsertOneAsync(newUser);
        }
    }
}

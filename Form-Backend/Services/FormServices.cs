using Form_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;

//using MongoDB.Bson;
using MongoDB.Driver;
using static System.Net.Mime.MediaTypeNames;

namespace Form_Backend.Services
{
    public class FormServices
    {
        private readonly IMongoCollection<EmployeeData> _formDatas;

        public FormServices(
        IOptions<FormDatabaseSetting> FormDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                FormDatabaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                FormDatabaseSetting.Value.DatabaseName);

            _formDatas = mongoDatabase.GetCollection<EmployeeData>(
                FormDatabaseSetting.Value.FormCollectionName);
        }

        public class Res2 : Res
        {
            public int totalCount = 10;
        }
        public class Res
        {
            public string Id { get; set; }
            public string EmpId { get; set; }
            public string EmpName { get; set; } = "";
            public string Email { get; set; } = "";

            public string PresentAdress { get; set; } = "";
            public string PhotoUrl { get; set; } = null;
            public string Phone { get; set; }
            public enum BloodGroupEnum
            {
                A, B, O, AB
            }
            public BloodGroupEnum BloodGroup { get; set; }
            public int Sl { get; set; }

        }

        public class GenericList<X> where X : class
        {
            public long count { get; set; }
            public List<X> Response { get; set; }
        }
        public async Task<GenericList<Res>> GetAsync(int page, int show, string query)
        {
            var projection =
            new BsonDocument
            {
                {"_id",new BsonDocument("$toString","$_id") },
                { "EmpId", 1 },
                { "EmpName", 1 },
                { "Email", 1 },
                { "PresentAdress", 1 },
                { "Phone", 1 },
                { "BloodGroup", 1 },
                {"PhotoUrl",1 },
            };

            var slNo = page * show;
            FilterDefinitionBuilder<EmployeeData> filterDefinitionBuilder = Builders<EmployeeData>.Filter;
            FilterDefinition<EmployeeData> filterDefinition =
            filterDefinitionBuilder.Eq(f => f.IsDeleted, false) &
            filterDefinitionBuilder.Regex("EmpName", new BsonRegularExpression($"^{query}", "i"))
            //filterDefinitionBuilder.Where(f =>f.EmpName.StartsWith(query))
            ;
            var filter = _formDatas.Aggregate()
                .Match(filterDefinition);

            //var count =filter.Count();

            long count = _formDatas.CountDocuments(filterDefinition);

            var agg = await filter
                .Skip(page * show)
                .Limit(show)
                .Project<Res>(projection)
                .ToListAsync() ?? [];


            int i = 1;
            foreach (var item in agg)
            {
                item.Sl = (show * page) + i;
                i++;

            }

            GenericList<Res> list1 = new();
            list1.count = count;
            list1.Response = agg;
            //list1.count =await _formDatas.CountAsync();
            //list1.Add(1);
            //list1.Add(agg);

            return list1;
        }

        public async Task<EmployeeData> GetAsync(string id) =>
            await _formDatas.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<string> CreateAsync(EmployeeData newUser)
        {
            await _formDatas.InsertOneAsync(newUser);
            return newUser.Id;
        }

        public async Task<string> UpdateAsync(string id, EmployeeData updatedFormData)
        {
            updatedFormData.Id = id;
            await _formDatas.ReplaceOneAsync(x => x.Id == id, updatedFormData);
            return id;
        }
        //public async Task<string> UpdateAsync(string id, FilesModel updatedFormData)
        //{
        //    updatedFormData.CandidatePhoto
         
        //    return { }
        //    ;
        //}
    }
}

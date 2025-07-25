﻿namespace Form_Backend.Models
{
    public class UserModelDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string UserCollectionName { get; set; } = null!;
        public string JwtKey { get; set; } = null!;
    }
}

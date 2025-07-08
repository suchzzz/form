using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Form_Backend.Models
{
    [BsonIgnoreExtraElements]
    public class FormData
    {
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string EmpName { get; set; }
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("fatherName")]

        public string FatherName { get; set; }
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("birth")]

        public DateTime Birth { get; set; }
        public enum BloodGroupEnum
        {
            A, B, O, AB
        }
        [JsonPropertyName("bloodGroup")]
        [JsonConverter(typeof(JsonStringEnumConverter))]

        public BloodGroupEnum BloodGroup { get; set; }
        public enum MaratialStatusEnum
        {
            Single, Married
        }
        [JsonPropertyName("maratialStatus")]
        [JsonConverter(typeof(JsonStringEnumConverter))]

        public MaratialStatusEnum MaratialStatus { get; set; }
        [JsonPropertyName("aadharNumber")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string AadharNumber { get; set; }

        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("passportNumber")]
        public string PassportNumber { get; set; }
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("phone")]
        public string Phone { get; set; }
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("email")]
        public string Email { get; set; }
        public enum StatusEnum
        {
            Active, Inactive
        }
        [JsonPropertyName("status")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public StatusEnum Status { get; set; }
        [JsonPropertyName("empId")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string EmpId { get; set; }
        public enum RoleEnum
        {
            Employee, Employer
        }

        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("roleType")]
        public RoleEnum RoleType { get; set; }

        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("presentAdress")]
        public string PresentAdress { get; set; } = "";
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("permanentAdress")]
        public string PermanentAdress { get; set; } = "";
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("sameAsPresent")]
        public bool SameAsPresent { get; set; }
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("candidatePhoto")]
        public string CandidatePhoto { get; set; }
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("candidateSign")]
        public string CandidateSign { get; set; }

        //bank
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("bankAccountNumber")]

        public string BankAccountNumber { get; set; }
        [JsonPropertyName("bankName")]
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        public string BankName { get; set; } 
        [JsonPropertyName("ifscCode")]

        public string IfscCode { get; set; }
        [JsonPropertyName("holderName")]
        public string HolderName { get; set; }

        [JsonPropertyName("panNumber")]
        public string PanNumber { get; set; }
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("bankAdd")]
        public string BankAdd { get; set; }
        [BsonIgnoreIfNull, BsonIgnoreIfDefault]
        [JsonPropertyName("editId")]
        public string EditId { get; set; }
    }

    public class EmployeeData : FormData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
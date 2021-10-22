module.exports = {
  "id": {
    "Field": "id",
    "Type": "int",
    "Collation": null,
    "Null": "NO",
    "Key": "PRI",
    "Default": null,
    "Extra": "auto_increment",
    "Privileges": "select,insert,update,references",
    "Comment": ""
  },
  "email": {
    "Field": "email",
    "Type": "varchar(100)",
    "Collation": "utf8mb4_0900_ai_ci",
    "Null": "NO",
    "Key": "PRI",
    "Default": null,
    "Extra": "",
    "Privileges": "select,insert,update,references",
    "Comment": ""
  },
  "username": {
    "Field": "username",
    "Type": "varchar(100)",
    "Collation": "utf8mb4_0900_ai_ci",
    "Null": "YES",
    "Key": "",
    "Default": null,
    "Extra": "",
    "Privileges": "select,insert,update,references",
    "Comment": ""
  },
  "type": {
    "Field": "type",
    "Type": "enum('admin','content_creator')",
    "Collation": "utf8mb4_0900_ai_ci",
    "Null": "YES",
    "Key": "",
    "Default": null,
    "Extra": "",
    "Privileges": "select,insert,update,references",
    "Comment": ""
  }
}
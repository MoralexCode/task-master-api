
CREATE TABLE task_master_projects (
  id int(11) NOT NULL AUTO_INCREMENT,
  
  status tinyint(4) NOT NULL DEFAULT '1',
  enable tinyint(4) NOT NULL DEFAULT '1',
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)  ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

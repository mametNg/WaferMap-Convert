-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: 10.83.41.127    Database: qc_tools
-- ------------------------------------------------------
-- Server version	10.4.22-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `db_users_admin`
--

DROP TABLE IF EXISTS `db_users_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `db_users_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` int(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `img` varchar(255) NOT NULL,
  `dept_code` varchar(45) NOT NULL,
  `role` int(1) NOT NULL,
  `station` varchar(45) NOT NULL,
  `register_date` int(20) NOT NULL,
  `created_date` int(20) NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `update_date` int(20) NOT NULL,
  `update_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `db_users_admin`
--

LOCK TABLES `db_users_admin` WRITE;
/*!40000 ALTER TABLE `db_users_admin` DISABLE KEYS */;
INSERT INTO `db_users_admin` VALUES (1,1,'Rahmat Hidayat','63092353','rahmat_hidayat@utacgroup.com','$2y$10$9YXCumbR/ymESl1QRcbCO.kCGOeWA1rY9mkJUW1h5xh37gkQ7G2hm','63092353.png','10201',3,'Internal',1762307472,1762307472,'63092353',0,''),(2,1,'Dadan Darmawan','63080288','dadan_darmawan@utacgroup.com','$2y$10$l/g05rv9P4wwDzXe5qw8gu2/Rozv6W8FVWzLN73csAmItzyVLBsVy','default.jpg','10501',1,'Internal',1762307472,1762307472,'63092353',1767152560,'63092353'),(3,1,'Nurbaeti','63091135','nurbaeti_1135@utacgroup.com','$2y$10$vEbIO3Cfa.gJO6zyQ8eG9.QlMRpHXP2irCOyZpSmW5KyDfehJY8TO','default.jpg','28056',4,'Internal',1767152670,1767152670,'63092353',0,''),(25,1,'Abdul Rohim','63091174','abdul_rohim@utacgroup.com','$2y$10$vEbIO3Cfa.gJO6zyQ8eG9.QlMRpHXP2irCOyZpSmW5KyDfehJY8TO','default.jpg','28056',4,'Internal',1767152670,1767152670,'63092353',0,' '),(26,1,'Lukman Fadillah','63091200','lukman_padillah@utacgroup.com','$2y$10$vEbIO3Cfa.gJO6zyQ8eG9.QlMRpHXP2irCOyZpSmW5KyDfehJY8TO','default.jpg','28056',1,'Internal',1767152670,1767152670,'63092353',1767746916,'63092353'),(27,1,'Femil Nugrasa','63091228','femil_nugrasa@utacgroup.com','$2y$10$vEbIO3Cfa.gJO6zyQ8eG9.QlMRpHXP2irCOyZpSmW5KyDfehJY8TO','default.jpg','28056',4,'Internal',1767152670,1767152670,'63092353',0,' '),(28,3,'Sunariyati','63091285','aaaaaa@gmail.com','$2y$10$vEbIO3Cfa.gJO6zyQ8eG9.QlMRpHXP2irCOyZpSmW5KyDfehJY8TO','default.jpg','28056',4,'Internal',1767152670,1767152670,'63092353',0,' '),(29,3,'Yoga Koswara','63091791','dasdad@gmail.com','$2y$10$vEbIO3Cfa.gJO6zyQ8eG9.QlMRpHXP2irCOyZpSmW5KyDfehJY8TO','default.jpg','28056',4,'Internal',1767152670,1767152670,'63092353',0,' '),(30,3,'Muhammad Wahiddun','63091999','bfgber@gmail.com','$2y$10$vEbIO3Cfa.gJO6zyQ8eG9.QlMRpHXP2irCOyZpSmW5KyDfehJY8TO','default.jpg','28056',4,'Internal',1767152670,1767152670,'63092353',0,' '),(31,3,'Dini Lestari','63092139','asd2@gmail.com','$2y$10$vEbIO3Cfa.gJO6zyQ8eG9.QlMRpHXP2irCOyZpSmW5KyDfehJY8TO','default.jpg','28056',4,'Internal',1767152670,1767152670,'63092353',0,' '),(32,1,'Rudi','63091603','rudi_1603@utacgroup.com','$2y$10$0QdVYNaPvWqhGUhuMLgTje.Liq2dfCLwPVtJ7NKfcOKthiAeWM/pm','default.jpg','28056',1,'Internal',1768872840,1768872840,'63092353',1768873264,'63092353');
/*!40000 ALTER TABLE `db_users_admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-22  8:34:31

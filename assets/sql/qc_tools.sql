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
-- Table structure for table `addons`
--

DROP TABLE IF EXISTS `addons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` int(1) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addons`
--

LOCK TABLES `addons` WRITE;
/*!40000 ALTER TABLE `addons` DISABLE KEYS */;
INSERT INTO `addons` VALUES (1,0,'maintenance');
/*!40000 ALTER TABLE `addons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `db_departement`
--

DROP TABLE IF EXISTS `db_departement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `db_departement` (
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `flag` int(1) NOT NULL,
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `db_departement`
--

LOCK TABLES `db_departement` WRITE;
/*!40000 ALTER TABLE `db_departement` DISABLE KEYS */;
INSERT INTO `db_departement` VALUES ('10101','Personalia And IR Dept',1),('10102','General Affair Dept',1),('10103','Training And Recruitment Dept',1),('10133','Human Resources Development (HRD) Division',1),('10201','Information System (IS) Dept',1),('10301','Cost Accounting Dept',1),('10302','Tax And Finance Dept',1),('10303','Accounting Dept',1),('10374','Accounting & Finance Division',1),('10401','Supply Management Dept',1),('10501','Quality Control Dept',1),('10586','Quality Control & System Division',1),('10601','PPIC Dept',1),('10701','Customer Engineering Dept',1),('10801','Production Dept',1),('1090008','Corp IT AI',1),('10901','Process Engineering & NPI Dept',1),('10902','Production Engineering Dept',1),('10903','Facility Engineering Dept',1),('11001','Customer Service Dept',1),('13575','PT UTAC Manufacturing Services Indonesia',1),('28056','Quality Control',1),('404','Testing',0),('45637','E',0),('64584','Production',1),('85766','Guest',1);
/*!40000 ALTER TABLE `db_departement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `db_groups`
--

DROP TABLE IF EXISTS `db_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `db_groups` (
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `flag` int(1) NOT NULL,
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `db_groups`
--

LOCK TABLES `db_groups` WRITE;
/*!40000 ALTER TABLE `db_groups` DISABLE KEYS */;
INSERT INTO `db_groups` VALUES ('53753','A',1),('53754','B',1),('53755','C',1),('53756','D',1),('53757','NS',1),('53758','E',0);
/*!40000 ALTER TABLE `db_groups` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `header`
--

DROP TABLE IF EXISTS `header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `header` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `header`
--

LOCK TABLES `header` WRITE;
/*!40000 ALTER TABLE `header` DISABLE KEYS */;
INSERT INTO `header` VALUES (1,'QC Tools','QC-Tools','icon.png','Welcome to QC-Tools UTAC Indonesia');
/*!40000 ALTER TABLE `header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_login`
--

DROP TABLE IF EXISTS `history_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `status` int(1) NOT NULL,
  `ip_address` varchar(20) NOT NULL,
  `device` text NOT NULL,
  `created` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_login`
--

LOCK TABLES `history_login` WRITE;
/*!40000 ALTER TABLE `history_login` DISABLE KEYS */;
INSERT INTO `history_login` VALUES (1,'63092353',0,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',1762137503),(2,'63092353',0,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',1762137530),(3,'63092353',0,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',1762137629),(4,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',1762137640),(5,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',1762144125),(6,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762303225),(7,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762477488),(8,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762496884),(9,'63092080',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762736989),(10,'63092080',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762737002),(11,'63092080',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762737003),(12,'63092080',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762737003),(13,'63092080',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762737042),(14,'63092080',0,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762737051),(15,'63092080',0,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762737259),(16,'63092080',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1762737313),(17,'63092353',1,'192.168.22.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1763624918),(18,'63092353',1,'192.168.22.66','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',1763644949),(19,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1767076960),(20,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1767143547),(21,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1767156086),(22,'63092353',1,'10.83.43.222','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1767165605),(23,'63080288',1,'10.83.43.179','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1767165932),(24,'63091200',2,'10.83.43.153','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767166767),(25,'63091200',2,'10.83.43.153','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767166777),(26,'63092469',2,'10.83.43.153','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767166783),(27,'63092353',1,'10.83.43.74','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1767315090),(28,'63092353',1,'10.83.43.74','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1767337859),(29,'63091533',2,'10.83.41.189','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767600389),(30,'63091533',2,'10.83.41.189','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767600397),(31,'63091533',2,'10.83.41.189','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767600407),(32,'63091533',2,'10.83.41.189','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767600417),(33,'63091200',2,'10.83.43.181','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767686193),(34,'63092353',1,'10.83.43.181','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767686215),(35,'63091200',2,'10.83.43.181','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767686287),(36,'63091200',2,'10.83.43.181','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767686327),(37,'63092353',1,'10.83.43.181','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',1767686345),(38,'63092353',1,'10.83.43.102','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1768872567),(39,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1768878835),(40,'63092353',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',1768879149);
/*!40000 ALTER TABLE `history_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_user`
--

DROP TABLE IF EXISTS `history_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `ip_address` text NOT NULL,
  `device` text NOT NULL,
  `method` varchar(255) NOT NULL,
  `server` text NOT NULL,
  `post` text NOT NULL,
  `get` text NOT NULL,
  `cookie` text NOT NULL,
  `request` text NOT NULL,
  `env` text NOT NULL,
  `session` text NOT NULL,
  `files` text NOT NULL,
  `created` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_user`
--

LOCK TABLES `history_user` WRITE;
/*!40000 ALTER TABLE `history_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspect_outgoing`
--

DROP TABLE IF EXISTS `inspect_outgoing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inspect_outgoing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` int(1) NOT NULL,
  `inspect_date` varchar(20) NOT NULL,
  `outer_no` varchar(255) NOT NULL,
  `lot_id` varchar(255) NOT NULL,
  `carton_condition` varchar(255) NOT NULL,
  `label_shp_condition` varchar(255) NOT NULL,
  `print_condition` varchar(255) NOT NULL,
  `barcode_carton_scan` varchar(255) NOT NULL,
  `barcode_label_read` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `inspect_qa` varchar(255) NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `created_date` int(20) NOT NULL,
  `updated_by` varchar(20) NOT NULL,
  `updated_date` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspect_outgoing`
--

LOCK TABLES `inspect_outgoing` WRITE;
/*!40000 ALTER TABLE `inspect_outgoing` DISABLE KEYS */;
INSERT INTO `inspect_outgoing` VALUES (1,1,'2025-12-31','1','1234','OK','OK','OK','OK','OK','-','DADAN','63080288',1767166033,'',0);
/*!40000 ALTER TABLE `inspect_outgoing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_access_menu`
--

DROP TABLE IF EXISTS `table_access_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `table_access_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` int(1) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `menu` int(11) NOT NULL,
  `submenu` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_access_menu`
--

LOCK TABLES `table_access_menu` WRITE;
/*!40000 ALTER TABLE `table_access_menu` DISABLE KEYS */;
INSERT INTO `table_access_menu` VALUES (1,1,'63092353',3,1),(2,1,'63092353',3,2),(3,1,'63092353',3,3),(4,1,'63092353',3,4),(5,1,'63092353',1,0),(6,1,'63092353',2,5),(7,1,'63092353',2,6),(8,1,'63092353',2,7),(9,1,'63092353',2,8),(10,1,'63092353',2,9),(11,1,'63080288',1,0),(12,1,'63080288',2,5),(13,0,'63080288',2,9),(14,0,'63080288',2,6),(15,0,'63080288',2,7),(16,0,'63080288',2,8),(17,0,'63080288',3,1),(18,1,'63080288',3,2),(19,0,'63080288',3,3),(20,1,'63080288',3,4),(21,1,'63092353',2,10),(22,0,'63080288',2,10),(23,1,'63091135',1,0),(24,1,'63091135',2,5),(25,0,'63091135',2,9),(26,0,'63091135',2,6),(27,0,'63091135',2,7),(28,0,'63091135',2,8),(29,0,'63091135',2,10),(30,0,'63091135',3,1),(31,0,'63091135',3,2),(32,0,'63091135',3,3),(33,0,'63091135',3,4),(34,1,'63091174',1,0),(35,1,'63091174',2,5),(36,0,'63091174',2,9),(37,0,'63091174',2,6),(38,0,'63091174',2,7),(39,0,'63091174',2,8),(40,0,'63091174',2,10),(41,0,'63091174',3,1),(42,0,'63091174',3,2),(43,0,'63091174',3,3),(44,0,'63091174',3,4),(45,1,'63091200',1,0),(46,1,'63091200',2,5),(47,0,'63091200',2,9),(48,0,'63091200',2,6),(49,0,'63091200',2,7),(50,0,'63091200',2,8),(51,0,'63091200',2,10),(52,0,'63091200',3,1),(53,1,'63091200',3,2),(54,0,'63091200',3,3),(55,1,'63091200',3,4),(56,1,'63091228',1,0),(57,1,'63091228',2,5),(58,0,'63091228',2,9),(59,0,'63091228',2,6),(60,0,'63091228',2,7),(61,0,'63091228',2,8),(62,0,'63091228',2,10),(63,0,'63091228',3,1),(64,0,'63091228',3,2),(65,0,'63091228',3,3),(66,0,'63091228',3,4),(67,1,'63092353',4,11),(68,1,'63092353',4,6),(69,1,'63092353',4,7),(70,1,'63092353',4,8),(71,1,'63092353',4,9),(72,1,'63092353',4,10),(73,1,'63091200',4,6),(74,1,'63091200',4,7),(75,1,'63091200',4,8),(76,1,'63091200',4,9),(77,1,'63091200',4,10),(78,1,'63091200',4,11),(79,1,'63092353',4,12),(80,1,'63092353',4,13),(81,1,'63092353',4,14),(82,1,'63092353',4,15),(83,1,'63092353',4,16),(84,1,'63092353',4,17),(85,1,'63091200',4,12),(86,1,'63091200',4,13),(87,1,'63091200',4,14),(88,1,'63091200',4,15),(89,1,'63091200',4,16),(90,1,'63091200',4,17),(91,1,'63092353',4,18),(92,1,'63092353',4,19),(93,1,'63091200',4,18),(94,1,'63091200',4,19),(95,1,'63092353',5,0),(96,1,'63091603',1,0),(97,0,'63091603',4,6),(98,0,'63091603',4,7),(99,0,'63091603',4,8),(100,0,'63091603',4,9),(101,0,'63091603',4,10),(102,0,'63091603',4,11),(103,0,'63091603',4,12),(104,0,'63091603',4,13),(105,0,'63091603',4,14),(106,0,'63091603',4,15),(107,0,'63091603',4,16),(108,0,'63091603',4,17),(109,0,'63091603',4,18),(110,0,'63091603',4,19),(111,0,'63091603',2,5),(112,1,'63091603',5,0),(113,0,'63091603',3,1),(114,1,'63091603',3,2),(115,0,'63091603',3,3),(116,1,'63091603',3,4);
/*!40000 ALTER TABLE `table_access_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_menu`
--

DROP TABLE IF EXISTS `table_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `table_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` int(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `is_submenu` int(1) NOT NULL,
  `order_no` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_menu`
--

LOCK TABLES `table_menu` WRITE;
/*!40000 ALTER TABLE `table_menu` DISABLE KEYS */;
INSERT INTO `table_menu` VALUES (1,1,'Profile','fas fa-fw fa-user','profile','dashboard/menu/profile',0,1),(2,1,'Inspection','fas fa-fw fa-toolbox','inspection','dashboard/menu/inspection',1,3),(3,1,'Management','fas fa-fw fa-cogs','management','dashboard/menu/management',1,99),(4,1,'Wafermap Convert','fas fa-fw fa-toolbox','wafermap-convert','dashboard/menu/wafermap-convert',1,2),(5,1,'ESD Checksheet','fas fa-fw fa-toolbox','esd-checksheet','dashboard/menu/esd-checksheet',0,4);
/*!40000 ALTER TABLE `table_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_submenu`
--

DROP TABLE IF EXISTS `table_submenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `table_submenu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` int(1) NOT NULL,
  `menu` int(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `order_no` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_submenu`
--

LOCK TABLES `table_submenu` WRITE;
/*!40000 ALTER TABLE `table_submenu` DISABLE KEYS */;
INSERT INTO `table_submenu` VALUES (1,1,3,'Web Settings','web-settings','dashboard/submenu/management/web-settings',1),(2,1,3,'Users Management','users-management','dashboard/submenu/management/users-management',2),(3,1,3,'Menu Management','menu-management','dashboard/submenu/management/menu-management',3),(4,1,3,'User Access Menu','user-access-menu','dashboard/submenu/management/user-access-menu',4),(5,1,2,'Outgoing','outgoing','dashboard/submenu/inspection/outgoing',1),(6,1,4,'ABOV','abov','dashboard/submenu/wafermap/abov',1),(7,1,4,'Advanide','advanide','dashboard/submenu/wafermap/advanide',2),(8,1,4,'Advanide EU','advanide-eu','dashboard/submenu/wafermap/advanide-eu',3),(9,1,4,'HID','hid','dashboard/submenu/wafermap/hid',4),(10,1,4,'LEGIC','legic','dashboard/submenu/wafermap/legic',5),(11,1,4,'Linxens','linxens','dashboard/submenu/wafermap/linxens',6),(12,1,4,'Nuvoton','novoton','dashboard/submenu/wafermap/nuvoton',7),(13,1,4,'Sony','sony','dashboard/submenu/wafermap/sony',8),(14,1,4,'STMicro','stm','dashboard/submenu/wafermap/stm',9),(15,1,4,'Melexis','mlx','dashboard/submenu/wafermap/mlx',10),(16,1,4,'Microchip','mchp','dashboard/submenu/wafermap/mchp',11),(17,1,4,'NXP','nxp','dashboard/submenu/wafermap/nxp',12),(18,1,4,'TDK','tdk','dashboard/submenu/wafermap/tdk',12),(19,1,4,'Infineon','infineon','dashboard/submenu/wafermap/infineon',13);
/*!40000 ALTER TABLE `table_submenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_role`
--

DROP TABLE IF EXISTS `users_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_role`
--

LOCK TABLES `users_role` WRITE;
/*!40000 ALTER TABLE `users_role` DISABLE KEYS */;
INSERT INTO `users_role` VALUES (1,'Administrator'),(2,'Guest'),(3,'Development'),(4,'Member');
/*!40000 ALTER TABLE `users_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-22  8:34:29

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-22  8:34:30

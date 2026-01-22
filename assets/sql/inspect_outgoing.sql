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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-22  8:34:32

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-22  8:34:34

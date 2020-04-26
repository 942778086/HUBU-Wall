-- MySQL dump 10.13  Distrib 5.7.29, for macos10.14 (x86_64)
--
-- Host: localhost    Database: hubu_wall
-- ------------------------------------------------------
-- Server version	5.7.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentor` bigint(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `gmt_create` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `demand`
--

DROP TABLE IF EXISTS `demand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `demand` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `price` double DEFAULT NULL,
  `img_url` text,
  `date` datetime DEFAULT NULL,
  `publisher_id` bigint(20) DEFAULT NULL,
  `accepter_id` bigint(20) DEFAULT NULL,
  `is_deal` tinyint(4) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `which_demand` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demand`
--

LOCK TABLES `demand` WRITE;
/*!40000 ALTER TABLE `demand` DISABLE KEYS */;
INSERT INTO `demand` VALUES (12,12,'https://wjxcloud-1258315462.cos.ap-guangzhou.myqcloud.com/wx9122a6cd0208fd3f.o6zAJs3vgId_OOxyQ_a8s3iki_98.G5owNrEoA5ka3578cf993346484ca62bc92850da36df.jpeg','2020-04-22 20:48:36',12,0,0,'细节一',1),(13,11,'https://wjxcloud-1258315462.cos.ap-guangzhou.myqcloud.com/wx9122a6cd0208fd3f.o6zAJs3vgId_OOxyQ_a8s3iki_98.jqJihyoUiDYAd932854b6189fb74a5c62ef36d5ec725.png','2020-04-23 15:45:12',12,0,0,'细节一',1),(14,12,'https://wjxcloud-1258315462.cos.ap-guangzhou.myqcloud.com/wx9122a6cd0208fd3f.o6zAJs3vgId_OOxyQ_a8s3iki_98.0NxYlCBwzH8f8ec063ff1f3f22d161a57e617df20641.jpg,https://wjxcloud-1258315462.cos.ap-guangzhou.myqcloud.com/wx9122a6cd0208fd3f.o6zAJs3vgId_OOxyQ_a8s3iki_98.MXQTKA9HVAfPd932854b6189fb74a5c62ef36d5ec725.png','2020-04-23 16:06:08',12,0,0,'细节三',1);
/*!40000 ALTER TABLE `demand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dynamic`
--

DROP TABLE IF EXISTS `dynamic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dynamic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `article` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `creator` bigint(255) DEFAULT NULL,
  `view_count` int(255) DEFAULT NULL,
  `like_count` int(255) DEFAULT NULL,
  `comment_count` int(255) DEFAULT NULL,
  `gmt_create` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dynamic`
--

LOCK TABLES `dynamic` WRITE;
/*!40000 ALTER TABLE `dynamic` DISABLE KEYS */;
/*!40000 ALTER TABLE `dynamic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `send_id` bigint(20) DEFAULT NULL,
  `receive_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'2020-04-23 17:41:59','啊啊啊啊啊啊啊',13,12),(2,'2020-04-23 18:14:40','啊啊啊2',12,13),(3,'2020-04-23 18:51:55','啊啊啊3',13,12),(4,'2020-04-23 18:52:02','啊啊啊4',13,12),(5,'2020-04-23 20:08:00','111',13,12),(6,'2020-04-23 21:47:18','11',13,12),(7,'2020-04-25 21:24:24','',NULL,1),(8,'2020-04-25 21:27:05','',NULL,2),(9,'2020-04-25 21:29:54','kkk',NULL,2),(10,'2020-04-25 21:30:51','kkk',3,2),(11,'2020-04-25 21:35:41','kkk',3,2),(12,'2020-04-25 22:49:40','kkk',3,2),(13,'2020-04-25 23:15:40','kkk',12,2),(14,'2020-04-25 23:18:52','kkk',12,13),(15,'2020-04-25 23:20:26','kkk',12,13),(16,'2020-04-25 23:24:14','kkk',12,13),(17,'2020-04-25 23:32:48','',12,13),(18,'2020-04-25 23:34:14','',12,13);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `notifer` bigint(20) DEFAULT NULL,
  `receiver` bigint(20) DEFAULT NULL,
  `outer_id` bigint(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `notifer_name` varchar(255) DEFAULT NULL,
  `gmt_create` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `wx_id` varchar(255) DEFAULT NULL,
  `user_new_login` datetime DEFAULT NULL,
  `phone_num` varchar(20) DEFAULT NULL,
  `student_num` varchar(30) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `socket_id` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-21 00:03:37','','','2','Yiyang','Hunan',NULL),(2,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-21 00:05:47','','','2','Yiyang','Hunan',NULL),(3,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-21 00:25:45','','','2','Yiyang','Hunan',NULL),(4,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-22 14:14:26','','','2','Yiyang','Hunan',NULL),(5,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-22 14:36:08','','','2','Yiyang','Hunan',NULL),(6,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-22 14:39:31','','','2','Yiyang','Hunan',NULL),(7,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-22 14:42:47','','','2','Yiyang','Hunan',NULL),(8,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-22 14:44:37','','','2','Yiyang','Hunan',NULL),(9,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-22 14:49:01','','','2','Yiyang','Hunan',NULL),(10,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-22 14:51:38','','','2','Yiyang','Hunan',NULL),(11,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-02-22 14:52:18','','','2','Yiyang','Hunan',NULL),(12,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-03-22 15:06:52','','','2','Yiyang','Hunan','NT5irABUpZjza2aSAAAB'),(13,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','oeWNd5TvCpn3Bo6CLYb3VLzhUsII','2020-04-15 15:22:23','','','2','Yiyang','Hunan',NULL),(14,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-04-15 16:34:59','','','2','Yiyang','Hunan',NULL),(15,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-04-15 22:36:05','','','2','Yiyang','Hunan',NULL),(16,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-04-15 22:36:39','','','2','Yiyang','Hunan',NULL),(17,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-04-15 22:36:41','','','2','Yiyang','Hunan',NULL),(18,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-04-21 21:11:44','','','2','Yiyang','Hunan',NULL),(19,'大朋友','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0QtR5sNOndrpJfszgFYlrAWUzIeiaNYuAQDx64c0jnyoehsL7aywCia1qrlFLfoekhvMWmhY55kA/132','undefined','2020-04-21 21:11:59','','','2','Yiyang','Hunan',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-26  9:38:48

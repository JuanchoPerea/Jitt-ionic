-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: devel_jitt
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

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
-- Table structure for table `QuizQuestionOptionVoted`
--

DROP TABLE IF EXISTS `QuizQuestionOptionVoted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `QuizQuestionOptionVoted` (
  `user_id` varchar(36) NOT NULL DEFAULT '',
  `quiz_id` int(11) unsigned NOT NULL DEFAULT '0',
  `quiz_question_id` int(11) unsigned NOT NULL DEFAULT '0',
  `quiz_question_option_id` int(11) unsigned DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuizQuestionOptionVoted`
--

LOCK TABLES `QuizQuestionOptionVoted` WRITE;
/*!40000 ALTER TABLE `QuizQuestionOptionVoted` DISABLE KEYS */;
INSERT INTO `QuizQuestionOptionVoted` VALUES ('jittuser1',1,1,2,1),('jittuser1',1,2,6,2),('jittuser1',1,3,9,3),('jittuser1',1,4,15,4),('jittuser2',1,1,2,5),('jittuser2',1,2,8,6),('jittuser2',1,3,11,7),('jittuser2',1,4,14,8),('unirresearch-student-01',1,1,3,9),('unirresearch-student-01',1,2,7,10),('unirresearch-student-03',1,1,2,11),('unirresearch-student-03',1,2,6,12),('jittuser1',2,5,18,13),('jittuser2',2,5,19,14),('jittuser3',2,5,17,15),('unirresearch-student-01',2,5,18,16),('unirresearch-student-03',2,5,18,17),('10884346x',13,15,37,18),('47289462j',13,15,37,19),('unirresearch-student-01',13,15,37,20),('unirresearch-student-03',13,15,37,21),('10884346X',20,19,43,22),('10884346X',20,20,47,23),('Unirresearch-student-01',20,19,43,24),('Unirresearch-student-01',20,20,47,25),('unirresearch-student-02',20,19,43,26),('unirresearch-student-02',20,20,47,27),('unirresearch-student-03',20,19,45,28),('unirresearch-student-03',20,20,47,29),('xcastello@uoc.edu',23,22,52,30),('Unirresearch-student-01',25,23,54,31),('Unirresearch-student-01',25,24,59,32),('unirresearch-student-02',25,23,55,33),('unirresearch-student-02',25,24,60,34),('unirresearch-student-03',25,23,54,35),('unirresearch-student-03',25,24,59,36);
/*!40000 ALTER TABLE `QuizQuestionOptionVoted` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-19 13:10:43

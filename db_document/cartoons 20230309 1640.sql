﻿--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.1.22.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 2023.03.09. 16:40:51
-- Server version: 5.5.5-10.4.24-MariaDB
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

DROP DATABASE IF EXISTS cartoons;

CREATE DATABASE IF NOT EXISTS cartoons
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

--
-- Set default database
--
USE cartoons;

DELIMITER $$

--
-- Create function `RandomDate2`
--
CREATE DEFINER = 'root'@'localhost'
FUNCTION IF NOT EXISTS RandomDate2(date_from DATE, date_to DATE)
  RETURNS date
BEGIN 
  DECLARE result DATETIME;
  SET result = ( SELECT
    FROM_UNIXTIME(
    UNIX_TIMESTAMP(date_from) + FLOOR(
    RAND() * (
    UNIX_TIMESTAMP(date_to) - UNIX_TIMESTAMP(date_from) + 1
    )
    )
    ));
  RETURN DATE(result);
END
$$

--
-- Create function `randomInt`
--
CREATE DEFINER = 'root'@'localhost'
FUNCTION IF NOT EXISTS randomInt(min int, max int)
  RETURNS int(11)
BEGIN
set @rand = FLOOR( RAND() * (max-min + 1) + min);
RETURN @rand;
END
$$

--
-- Create function `randomName`
--
CREATE DEFINER = 'root'@'localhost'
FUNCTION IF NOT EXISTS randomName()
  RETURNS varchar(255) CHARSET utf8 COLLATE utf8_hungarian_ci
BEGIN
set @name = ELT(randomInt(1,33),
'Aaahh!!! Real Monsters',
'Adventure Time',
'The Adventures of Jimmy Neutron: Boy Genius',
'The Adventures of Sam & Max: Freelance Police',
'Alvin and the Chipmunks ',
'The Amazing World of Gumball',
'Avatar: The Last Airbender',
'Baby Looney Tunes',
'Ben 10',
'Big Hero 6: The Series',
'Danny Phantom',
'Gravity Falls',
'Kenny the Shark',
'Little Einsteins',
'Mickey Mouse Clubhouse',
'My Life as a Teenage Robot',
'Pet Alien',
'The Simpsons',
'SpongeBob SquarePants',
'Steven Universe',
'Super Robot Monkey Team Hyperforce Go!',
'The Fairly OddParents',
'Catdogs',
'Rugrats',
'Bunsen is a beast',
'The Loud House',
'The Casagrandes',
'Miraculous: Tales of Ladybug & Cat Noir',
'Bubble Guppies',
'Team Umizoomi',
'Ni Hao, Kai-Lan',
'Go Diego, Go!',
'Dora the Explorer'
);

RETURN @name;
END
$$

DELIMITER ;

--
-- Create table `creators`
--
CREATE TABLE IF NOT EXISTS creators (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 13,
AVG_ROW_LENGTH = 1365,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create table `countries`
--
CREATE TABLE IF NOT EXISTS countries (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 13,
AVG_ROW_LENGTH = 1365,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create table `cartoons`
--
CREATE TABLE IF NOT EXISTS cartoons (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  numberOfSeasons INT(11) DEFAULT NULL,
  numberOfEpisodes INT(11) DEFAULT NULL,
  countriesId INT(11) NOT NULL,
  creatorsId INT(11) NOT NULL,
  runningTime INT(11) DEFAULT NULL,
  AiringStart DATE DEFAULT NULL,
  AiringEnd DATE DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 21,
AVG_ROW_LENGTH = 819,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create foreign key
--
ALTER TABLE cartoons 
  ADD CONSTRAINT FK_cartoons_countries_id FOREIGN KEY (countriesId)
    REFERENCES countries(id);

--
-- Create foreign key
--
ALTER TABLE cartoons 
  ADD CONSTRAINT FK_cartoons_creators_id FOREIGN KEY (creatorsId)
    REFERENCES creators(id);

DELIMITER $$

--
-- Create procedure `genStat`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE genStat(db int)
BEGIN
DELETE
  FROM cartoons;
DELETE
  FROM countries;
DELETE
  FROM creators;


INSERT countries (id, name)
  VALUES (1, 'United States'), (2, 'Canada'), (3, 'France'), (4, 'Germany'), (5, 'Netherlands'), (6, 'Hungary'), (7, 'Argentina'), (8, 'Russia'), (9, 'Japan'), (10, 'South Korea'), (11, 'Spain'), (12, 'China');

INSERT creators (id, name)
  VALUES (1, 'Butch Hartman'), (2, 'Stephen Hillenburg'), (3, 'Chris Savino'), (4, 'Gabor Csupo'), (5, 'John Trabbic III'), (6, 'Janice Karman'), (7, 'Pendleton Ward'), (8, 'J. G. Quintel'), (9, 'Ben Bocquelet'), (10, 'Ian Whybrow'), (11, 'Van Partible'), (12, 'Genndy Tartakovsky');

SET @a = 0;
      simple_loop: LOOP
         SET @a=@a+1;

#INSERT tanulo (id, nev, osztId)
#VALUES (@a, randNev(), randInt(1, 12));
INSERT cartoons (id, name, numberOfSeasons, numberOfEpisodes, countriesId, creatorsId, runningTime, AiringStart, AiringEnd)
  VALUES (@a, randomName(), randomInt(1, 25), randomInt(1, 500), randomInt(1, 12), randomInt(1, 12), randomInt(15, 90), RandomDate2('1980-01-01', '1999-12-31'), RandomDate2('2000-1-1', '2023-12-31'));

         IF @a>=db THEN
            LEAVE simple_loop;
         END IF;
   END LOOP simple_loop;

SELECT
  *
FROM cartoons;
SELECT
  *
FROM countries;
SELECT
  *
FROM creators;

END
$$

--
-- Create function `randomDate`
--
CREATE DEFINER = 'root'@'localhost'
FUNCTION IF NOT EXISTS randomDate()
  RETURNS date
BEGIN
SET @MIN = '1962-01-01';
SET @MAX = '2023-04-30';
set @date = TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND, @MIN, @MAX)), @MIN);

RETURN @date;
END
$$

DELIMITER ;

-- 
-- Dumping data for table creators
--
INSERT INTO creators VALUES
(1, 'Butch Hartman'),
(2, 'Stephen Hillenburg'),
(3, 'Chris Savino'),
(4, 'Gabor Csupo'),
(5, 'John Trabbic III'),
(6, 'Janice Karman'),
(7, 'Pendleton Ward'),
(8, 'J. G. Quintel'),
(9, 'Ben Bocquelet'),
(10, 'Ian Whybrow'),
(11, 'Van Partible'),
(12, 'Genndy Tartakovsky');

-- 
-- Dumping data for table countries
--
INSERT INTO countries VALUES
(1, 'United States'),
(2, 'Canada'),
(3, 'France'),
(4, 'Germany'),
(5, 'Netherlands'),
(6, 'Hungary'),
(7, 'Argentina'),
(8, 'Russia'),
(9, 'Japan'),
(10, 'South Korea'),
(11, 'Spain'),
(12, 'China');

-- 
-- Dumping data for table cartoons
--
INSERT INTO cartoons VALUES
(1, 'Catdogs', 22, 153, 12, 10, 87, '1990-07-29', '2018-08-07'),
(2, 'Big Hero 6: The Series', 3, 364, 4, 3, 27, '1984-09-04', '2016-02-15'),
(3, 'The Fairly OddParents', 7, 199, 2, 8, 64, '1987-08-15', '2022-08-25'),
(4, 'Steven Universe', 2, 256, 5, 7, 48, '1991-06-25', '2013-06-26'),
(5, 'The Adventures of Jimmy Neutron: Boy Genius', 19, 245, 3, 7, 16, '1990-11-29', '2015-10-12'),
(6, 'The Fairly OddParents', 8, 230, 6, 11, 84, '1980-10-29', '2010-10-22'),
(7, 'Alvin and the Chipmunks ', 8, 29, 6, 12, 48, '1987-07-27', '2013-09-01'),
(8, 'Rugrats', 22, 71, 2, 3, 78, '1988-08-26', '2015-10-26'),
(9, 'Dora the Explorer', 1, 33, 4, 4, 46, '1986-02-01', '2006-08-15'),
(10, 'My Life as a Teenage Robot', 13, 60, 2, 1, 22, '1985-09-04', '2002-11-22'),
(11, 'Bunsen is a beast', 10, 359, 5, 11, 21, '1996-10-15', '2022-10-25'),
(12, 'Baby Looney Tunes', 9, 458, 8, 4, 54, '1995-09-02', '2008-12-11'),
(13, 'Pet Alien', 12, 346, 2, 7, 28, '1987-10-22', '2009-10-14'),
(14, 'Bubble Guppies', 3, 487, 7, 9, 79, '1984-05-02', '2012-08-04'),
(15, 'Dora the Explorer', 8, 269, 10, 6, 72, '1989-04-20', '2001-06-18'),
(16, 'Ni Hao, Kai-Lan', 10, 46, 5, 7, 61, '1988-08-04', '2007-09-06'),
(17, 'Danny Phantom', 15, 22, 6, 1, 75, '1998-05-18', '2005-02-25'),
(18, 'Danny Phantom', 24, 376, 12, 5, 30, '1996-09-10', '2013-04-23'),
(19, 'Ben 10', 17, 296, 11, 10, 33, '1996-10-13', '2010-12-23'),
(20, 'The Loud House', 12, 33, 11, 4, 80, '1987-04-17', '2005-10-10');

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
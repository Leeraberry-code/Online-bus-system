-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2024 at 04:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online bus registration system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Admin_ID` int(11) NOT NULL,
  `Parent_ID` int(10) DEFAULT NULL,
  `Learner_ID` int(4) DEFAULT NULL,
  `Admin_Initials` varchar(10) DEFAULT NULL,
  `Admin_Surname` varchar(100) DEFAULT NULL,
  `Admin_Passcode` varchar(100) DEFAULT NULL,
  `Admin_Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Admin_ID`, `Parent_ID`, `Learner_ID`, `Admin_Initials`, `Admin_Surname`, `Admin_Passcode`, `Admin_Email`) VALUES
(3, 1, 2, 'LQ', 'Masenya', 'Lerato96*', 'leeramasenya@gmail.com'),
(5, NULL, NULL, 'T', 'Thinane', 'ThinaneTumelo/', 'thinane@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `Bus_ID` int(11) NOT NULL,
  `Admin_ID` int(10) DEFAULT NULL,
  `Route_ID` int(10) DEFAULT NULL,
  `Bus_SpaceStatus` varchar(100) DEFAULT NULL,
  `Bus_Time` time(6) DEFAULT NULL,
  `Bus_Slot` varchar(100) DEFAULT NULL,
  `PickUp_time` time DEFAULT '17:59:59',
  `DropOff_time` time DEFAULT '17:59:59',
  `Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buses`
--

INSERT INTO `buses` (`Bus_ID`, `Admin_ID`, `Route_ID`, `Bus_SpaceStatus`, `Bus_Time`, `Bus_Slot`, `PickUp_time`, `DropOff_time`, `Date`) VALUES
(1, 3, 1, 'Available', '07:30:00.000000', 'Morning', '07:30:00', '08:00:00', '2024-10-01'),
(2, 2, 3, 'Not Available', '07:45:00.000000', 'Morning', '07:00:00', '09:00:00', '2024-10-03'),
(3, 2, 2, 'Available', '14:30:00.000000', 'Afternoon', '18:00:00', '19:00:00', '2024-10-02');

-- --------------------------------------------------------

--
-- Table structure for table `drop_off`
--

CREATE TABLE `drop_off` (
  `DropOff_No` varchar(4) NOT NULL,
  `DropOff_Name` varchar(100) NOT NULL,
  `DropOff_Time` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drop_off`
--

INSERT INTO `drop_off` (`DropOff_No`, `DropOff_Name`, `DropOff_Time`) VALUES
('2A', 'Corner of Reddersburg Street and Mafeking Drive', '14:25:00.000000'),
('2B', 'Corner of Theuns van Niekerkstraat and Roosmarynstraat', '14:30:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `learner`
--

CREATE TABLE `learner` (
  `Learner_ID` int(11) NOT NULL,
  `Bus_ID` int(11) NOT NULL,
  `Admin_ID` int(10) DEFAULT NULL,
  `Learner_Name` varchar(100) DEFAULT NULL,
  `Learner_Surname` varchar(100) DEFAULT NULL,
  `Learner_CellNo` int(10) DEFAULT NULL,
  `Learner_Grade` int(4) DEFAULT NULL,
  `Status` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `learner`
--

INSERT INTO `learner` (`Learner_ID`, `Bus_ID`, `Admin_ID`, `Learner_Name`, `Learner_Surname`, `Learner_CellNo`, `Learner_Grade`, `Status`) VALUES
(1, 1, NULL, 'Carel', 'Smit', NULL, 7, 'Waitlisted'),
(2, 2, NULL, 'Patricia', 'Forbes', 631120386, 8, 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE `parent` (
  `Parent_ID` int(11) NOT NULL,
  `Parent_Name` varchar(100) NOT NULL,
  `Parent_Surname` varchar(100) NOT NULL,
  `Parent_Passcode` varchar(100) NOT NULL,
  `Parent_CellNo` int(10) NOT NULL,
  `Parent_Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent`
--

INSERT INTO `parent` (`Parent_ID`, `Parent_Name`, `Parent_Surname`, `Parent_Passcode`, `Parent_CellNo`, `Parent_Email`) VALUES
(1, 'Johan', 'Smit', 'JohanSmit123@', 833780166, 'tumelothinane13@gmail.com'),
(2, 'Katleho', 'Mafalela', 'katmafalela94@', 791941571, 'katlehomafalela@gmail.com'),
(4, 'Thuso', 'Masenya', 'MASENYAwanga2023/', 731233453, 'thusomasenya@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `parent_student_app_reg`
--

CREATE TABLE `parent_student_app_reg` (
  `Application_No` int(11) NOT NULL,
  `Learner_ID` int(11) DEFAULT NULL,
  `Parent_ID` int(11) DEFAULT NULL,
  `Application_Status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_student_app_reg`
--

INSERT INTO `parent_student_app_reg` (`Application_No`, `Learner_ID`, `Parent_ID`, `Application_Status`) VALUES
(1, 1, 1, 'Waitlisted'),
(2, 2, 2, 'Waitlisted');

-- --------------------------------------------------------

--
-- Table structure for table `pick_up`
--

CREATE TABLE `pick_up` (
  `PickUp_No` varchar(4) NOT NULL,
  `PickUp_Name` varchar(100) NOT NULL,
  `PickUp_Time` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pick_up`
--

INSERT INTO `pick_up` (`PickUp_No`, `PickUp_Name`, `PickUp_Time`) VALUES
('1A', 'Corner of Panorama and Marabou Road', '06:22:00.000000'),
('2B', 'Corner of Kolgansstraat and Skimmerstraat', '06:30:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `Route_ID` int(11) NOT NULL,
  `PickUp_No` varchar(10) NOT NULL,
  `DropOff_No` varchar(10) NOT NULL,
  `Route_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`Route_ID`, `PickUp_No`, `DropOff_No`, `Route_Name`) VALUES
(1, '1A', '2A', 'Rooihuiskraal'),
(2, '2B', '2B', 'Wierdapark'),
(3, '2B', '2B', 'Centurion');

-- --------------------------------------------------------

--
-- Table structure for table `waiting_list`
--

CREATE TABLE `waiting_list` (
  `WaitingList_No` int(11) NOT NULL,
  `Learner_ID` int(10) DEFAULT NULL,
  `Admin_ID` int(10) DEFAULT NULL,
  `Learner_Names` varchar(100) DEFAULT NULL,
  `Learner_CellNo` int(10) DEFAULT NULL,
  `WaitingList_Group` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `waiting_list`
--

INSERT INTO `waiting_list` (`WaitingList_No`, `Learner_ID`, `Admin_ID`, `Learner_Names`, `Learner_CellNo`, `WaitingList_Group`) VALUES
(1, 1, 3, 'Carel Smit', 833780177, 'A'),
(2, 2, 3, 'Jessie Roberts', 786507839, 'B');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Admin_ID`),
  ADD KEY `Learner_ID` (`Learner_ID`),
  ADD KEY `par_ind` (`Parent_ID`);

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`Bus_ID`),
  ADD KEY `Admin_ID` (`Admin_ID`),
  ADD KEY `Route_ID` (`Route_ID`);

--
-- Indexes for table `drop_off`
--
ALTER TABLE `drop_off`
  ADD PRIMARY KEY (`DropOff_No`);

--
-- Indexes for table `learner`
--
ALTER TABLE `learner`
  ADD PRIMARY KEY (`Learner_ID`),
  ADD KEY `Admin_ID` (`Admin_ID`),
  ADD KEY `Bus_ID` (`Bus_ID`);

--
-- Indexes for table `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`Parent_ID`);

--
-- Indexes for table `parent_student_app_reg`
--
ALTER TABLE `parent_student_app_reg`
  ADD PRIMARY KEY (`Application_No`),
  ADD KEY `Learner_ID` (`Learner_ID`),
  ADD KEY `Parent_ID` (`Parent_ID`);

--
-- Indexes for table `pick_up`
--
ALTER TABLE `pick_up`
  ADD PRIMARY KEY (`PickUp_No`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`Route_ID`),
  ADD KEY `PickUp_No` (`PickUp_No`),
  ADD KEY `DropOff_No` (`DropOff_No`);

--
-- Indexes for table `waiting_list`
--
ALTER TABLE `waiting_list`
  ADD PRIMARY KEY (`WaitingList_No`),
  ADD KEY `Learner_ID` (`Learner_ID`),
  ADD KEY `Admin_ID` (`Admin_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `Admin_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `Bus_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `learner`
--
ALTER TABLE `learner`
  MODIFY `Learner_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `parent`
--
ALTER TABLE `parent`
  MODIFY `Parent_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `Route_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `waiting_list`
--
ALTER TABLE `waiting_list`
  MODIFY `WaitingList_No` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `Parent_ID` FOREIGN KEY (`Parent_ID`) REFERENCES `parent` (`Parent_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `Parent_ID_FK` FOREIGN KEY (`Parent_ID`) REFERENCES `parent` (`Parent_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`Parent_ID`) REFERENCES `parent` (`Parent_ID`),
  ADD CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`Learner_ID`) REFERENCES `learner` (`Learner_ID`),
  ADD CONSTRAINT `admin_ibfk_3` FOREIGN KEY (`Parent_ID`) REFERENCES `parent` (`Parent_ID`),
  ADD CONSTRAINT `admin_ibfk_4` FOREIGN KEY (`Learner_ID`) REFERENCES `learner` (`Learner_ID`);

--
-- Constraints for table `buses`
--
ALTER TABLE `buses`
  ADD CONSTRAINT `buses_ibfk_1` FOREIGN KEY (`Route_ID`) REFERENCES `routes` (`Route_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `learner`
--
ALTER TABLE `learner`
  ADD CONSTRAINT `learner_ibfk_1` FOREIGN KEY (`Bus_ID`) REFERENCES `buses` (`Bus_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `parent_student_app_reg`
--
ALTER TABLE `parent_student_app_reg`
  ADD CONSTRAINT `parent_student_app_reg_ibfk_1` FOREIGN KEY (`Learner_ID`) REFERENCES `learner` (`Learner_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `parent_student_app_reg_ibfk_2` FOREIGN KEY (`Parent_ID`) REFERENCES `parent` (`Parent_ID`) ON DELETE CASCADE;

--
-- Constraints for table `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`PickUp_No`) REFERENCES `pick_up` (`PickUp_No`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `routes_ibfk_2` FOREIGN KEY (`DropOff_No`) REFERENCES `drop_off` (`DropOff_No`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `waiting_list`
--
ALTER TABLE `waiting_list`
  ADD CONSTRAINT `waiting_list_ibfk_1` FOREIGN KEY (`Learner_ID`) REFERENCES `learner` (`Learner_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

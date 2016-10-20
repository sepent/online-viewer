-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2016 at 12:37 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viewer`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_uid` varchar(25) NOT NULL,
  `bundleId` varchar(50) NOT NULL,
  `latitude` float(15,6) NOT NULL,
  `longitude` float(15,6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_oauthUid` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `device_type` varchar(10) NOT NULL,
  `device_platform` varchar(20) NOT NULL,
  `device_uid` varchar(50) NOT NULL,
  `event_type` varchar(20) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `event_payload` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_uid`, `bundleId`, `latitude`, `longitude`, `username`, `user_oauthUid`, `city`, `country`, `timestamp`, `device_type`, `device_platform`, `device_uid`, `event_type`, `avatar`, `event_payload`) VALUES
(169, 'user_40', 'overfull.net', 127.615791, -3.127192, 'username40', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(170, 'user_72', 'overfull.net', -56.291111, 18.414246, 'username72', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(171, 'user_31', 'com.akademia.ryokou', -69.153290, 70.827568, 'username31', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(172, 'user_44', 'overfull.net', 147.707993, -39.383587, 'username44', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(173, 'user_23', 'overfull.net', 91.710991, 89.766357, 'username23', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(174, 'user_43', 'com.akademia.ryokou', -161.449707, -141.104263, 'username43', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(175, 'user_83', 'apple.com', 10.434095, -3.074149, 'username83', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(176, 'user_38', 'google.com', -72.413979, 80.434509, 'username38', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(177, 'user_90', 'apple.com', -78.136871, -107.306610, 'username90', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(178, 'user_82', 'apple.com', -139.465744, -74.409027, 'username82', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(179, 'user_34', 'apple.com', 57.522797, -90.903168, 'username34', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(180, 'user_40', 'apple.com', 142.151337, -37.367168, 'username40', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(181, 'user_44', 'apple.com', 173.368271, -151.476593, 'username44', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(182, 'user_90', 'google.com', 101.595711, 41.709610, 'username90', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(183, 'user_90', 'overfull.net', -79.958580, 152.859543, 'username90', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(184, 'user_91', 'overfull.net', 171.318085, -21.908730, 'username91', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(185, 'user_89', 'overfull.net', 48.120087, -59.528488, 'username89', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(186, 'user_34', 'google.com', 69.517632, -149.489944, 'username34', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', ''),
(187, 'user_47', 'com.akademia.ryokou', -41.908226, 125.611374, 'username47', '', '', '', '2016-01-25 00:59:59', 'mobile', 'ios', 'device_', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/2000px-Map_marker.svg.png', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=188;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

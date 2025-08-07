DROP DATABASE IF EXISTS kapao_queen;
CREATE DATABASE IF NOT EXISTS `kapao_queen` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `kapao_queen`;

DROP TABLE IF EXISTS `foodlist`;
CREATE TABLE `foodlist` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `thai_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `search_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `browse_description` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `price` smallint DEFAULT NULL,
  `taglist` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ingredientslist` varchar(600) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `background` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `type` varchar(12) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `foodlist` WRITE;
INSERT INTO `foodlist` VALUES (
1,'Goddess Pad Kaprao','ผัดกะเพราจากนางฟ้า','pad kra pao','Thai favourite stir fry',
'Phat Kaphrao Mu Sap is a traditional Thai dish that boasts a perfect balance of spicy, savory, and aromatic flavors.\nhis delicious stir-fried minced pork dish is cooked with plenty of fresh chili peppers, garlic, and Thai basil leaves, which gives it a distinct and irresistible taste. The tender and juicy pork is minced and cooked until it is lightly browned, and then combined with the spicy and fragrant mixture of herbs and spices.\nThe dish is served hot over a bed of steamed rice and topped with a fried egg, making it a complete and satisfying meal.',
80,'Thai,Rice,Spicy',
'Kaphrao|https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ocimum_tenuiflorum_24_08_2012.JPG/800px-Ocimum_tenuiflorum_24_08_2012.JPG,Pork|https://pngimg.com/d/pork_PNG32.png',
'https://hot-thai-kitchen.com/wp-content/uploads/2022/10/pad-gaprao-beef-sq-2.jpg',
'https://img2.kochrezepte.at/use/19/pad-krapao-schweinefleisch-mit-thai-basilikum_19694.jpg',
'food'),
(2, 'Drunken Spaghetti', 'ผัดขี้เมา', 'pad kee mao', 'The fiery Thai stir-fry that packs a punch',
'Pad Kee Mao Gai is a spicy and flavorful Thai stir-fry that is sure to satisfy your taste buds. This dish is made with tender chicken, wide rice noodles, and a mix of vegetables and aromatic herbs, such as bell peppers, onions, garlic, and Thai basil leaves. The stir-fry is cooked with a spicy chili paste sauce, which gives the dish its signature kick. the combination of textures and flavors make this dish a popular choice among Thai food enthusiasts.',
 70,'Thai,Noodle,Spicy',
 'Spaghetti|https://yimages360.s3.amazonaws.com/products/2020/08/5f467874c732f/1x.jpg',
 'https://img.wongnai.com/p/1920x0/2018/08/04/af5f930f8a0a4c798d903e22bc25d2f8.jpg',
 'https://steakdeknaew.ketshopweb.com/upload-img/steakdeknaew/Spaghetti/file_1.jpg',
 'food'
),
(3,'Bua Loi','บัวลอย','bua loi','Thai dessert of rice flour balls in coconut milk.',
'a traditional Thai dessert made of glutinous rice flour balls cooked in sweetened coconut milk. The rice flour balls can be plain or filled with various ingredients such as black sesame seeds, taro, pumpkin, or mung beans. The coconut milk is often flavored with pandan leaves or jasmine flowers for a fragrant aroma. Bua loi is a creamy, chewy, and satisfying dessert that can be enjoyed hot or cold.',
30,'Thai,Sweet',
'Rice floor|https://img.lovepik.com/free-png/20210919/lovepik-glutinous-rice-flour-png-image_400665763_wh1200.png',
'https://www.tastingtable.com/img/gallery/bua-loy-the-floating-thai-dessert-you-should-know/intro-1661228311.jpg',
'https://cdn.ready-market.com/101/21cd62de//Templates/pic/ANKO-Bua-Loi-1200x1200.jpg?v=d5d6ff4c',
'dessert'),
(4,'Creamy noodle of the north','ข้าวซอย','khao soi','satisfying noodle dish',
'a spicy and tangy Thai noodle soup with coconut milk and juicy chicken. It is topped with crispy fried noodles, pickled shallots, and fresh herbs for a burst of flavor and texture. Khao soi is a delicious and satisfying dish that originates from Northern Thailand',
120,'Thai,Noodle,Northern',
'',
'https://iamafoodblog.b-cdn.net/wp-content/uploads/2019/02/15-minute-khao-soi-6916w-2.jpg',
'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/11/10/0/DV2709H_Kaosoi_s4x3.jpg.rend.hgtvcom.616.462.suffix/1510328620514.jpeg',
'food'
),
('5', 'Nutty Himaphan Cake', 'เค้กหิมพานต์', 'Himaphan Cake', 'Nutty, smooth Himaphan Cake.',
 'As you take your first bite, you are immediately hit with the sweetness of the cake, followed by a subtle nuttiness that comes from the acorn flour used in the batter. 
 The texture is dense and moist, with a slight crumb that adds to the overall rustic feel of the cake. 
 As you continue to eat, you notice a variety of different flavors and textures that are all perfectly balanced. 
 The wild blueberries that are scattered throughout the cake add a burst of tartness, while the chopped hazelnuts give it a satisfying crunch.',
 150,
'Thai, Sweet, Dessert, Cake',
'Cheese|https://cdn.pixabay.com/photo/2016/03/05/19/24/cheese-1238395__340.jpg,Parsley|https://cdn.pixabay.com/photo/2016/09/12/18/27/parsley-1665402__340.jpg,Nut|https://cdn.pixabay.com/photo/2016/08/04/15/12/nut-1569252__340.jpg',
'https://cdn.pixabay.com/photo/2016/10/13/05/53/pecan-1736875_960_720.jpg',
'https://cdn.pixabay.com/photo/2016/10/13/05/53/pecan-1736875_960_720.jpg',
 'dessert'
 ),
 ('6', 'Fresh Lanna tea', 'ชาล้านนา', 'Lanna tea', 'Tea taken deep within lanna jungle', 
 'Lanna Tea is a soothing and comforting beverage that is both delicious and healthful. 
 As you take your first sip, you re immediately struck by the warm, earthy aroma of the tea, which is infused with the sweet and spicy flavor of holy basil.
 The tea itself is a rich, amber color, with a slight cloudiness that hints at its natural origins. As you take another sip, you feel the warmth of the tea spreading throughout your body, soothing your nerves and calming your mind.
 The flavor of the tea is complex and layered, with notes of cinnamon, cloves, and nutmeg dancing across your tongue. The holy basil adds a sweet and spicy flavor that lingers on your palate, leaving you with a feeling of peace and tranquility.',
   120,
'Drink, Tea, Dessert, Healthy',
'Stinging nettle|https://cdn.pixabay.com/photo/2015/05/26/20/30/stinging-nettle-785292__340.jpg',
'https://cdn.pixabay.com/photo/2017/03/01/05/12/tea-cup-2107599_960_720.jpg',
'https://cdn.pixabay.com/photo/2017/03/01/05/12/tea-cup-2107599_960_720.jpg',
   'dessert'
),
('7', 'Premium Rice Mango','ข้าวเหนียวมะม่วง','Rice Mango','The perfect dessert to end any Thai feast', 
 'Mango Sticky Rice is a popular Thai dessert that is both sweet and satisfying
  This dish is made with sticky rice that is cooked in coconut milk and served with ripe mangoes and a sprinkle of toasted sesame seeds. 
  The combination of the sweet, creamy coconut milk and the fresh, juicy mangoes makes for a mouth-watering dessert that is loved by locals and tourists alike.
  The dish is typically served at room temperature, which allows the flavors to blend together perfectly.',
40,
'Dessert, Sweet, Thai, fruit',
'Sticky rice|https://cdn.pixabay.com/photo/2020/02/08/14/55/rice-4830325_960_720.jpg,Mango|https://cdn.pixabay.com/photo/2018/03/18/15/50/food-3237172__340.jpg,Coconut milk|https://cdn.pixabay.com/photo/2016/08/27/04/03/coconut-milk-1623611_960_720.jpg',
'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mango_sticy_rice_%283859549574%29.jpg/1280px-Mango_sticy_rice_%283859549574%29.jpg',
'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mango_sticy_rice_%283859549574%29.jpg/1280px-Mango_sticy_rice_%283859549574%29.jpg',
  'dessert'
),
('8','premium thai salad', 'ผัดไทย', 'Thai salad', 'Experience the explosive flavors of Isan ', 
 'Som Tam is a popular and spicy salad from Isan that is bursting with bold flavors
Made with shredded unripe papaya, chili peppers, garlic, fish sauce, lime juice, and palm sugar, this dish offers a perfect balance of sweet, sour, and spicy tastes. The salad is typically garnished with peanuts and tomatoes, adding a crunchy texture to the dish.
Som Tam is a delicious and satisfying salad that is perfect for those who love a bit of heat in their food.',
40,
'Thai, Salad, stir fried',
'Papaya|https://cdn.pixabay.com/photo/2014/04/24/11/41/papaya-331280_960_720.jpg,Tomato|https://cdn.pixabay.com/photo/2016/03/26/16/44/tomatoes-1280859_960_720.jpg',
'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Som_tam_thai.JPG/1024px-Som_tam_thai.JPG',
'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Som_tam_thai.JPG/1024px-Som_tam_thai.JPG',
  'Main Courses'
),
('9','Mama spicy Mix', 'ยำมาม่า', 'Mama Mix', 'The ultimate noodle salad sensation!', 
 'Yum Mama is a Thai street food classic that offers a delicious and tangy mix of flavors and textures his dish is made with Mama noodles, a type of instant noodles that are popular in Thailand, and is combined with a mix of vegetables, herbs, and a zesty dressing. The dish is served cold and makes for a refreshing and light meal that is perfect for hot summer days.
  The combination of the noodles, crunchy vegetables, and the zesty dressing make Yum Mama a must-try dish for anyone who loves Thai food.',
40,
 'Thai, Spicy, noodle',
'Mama noodle|https://cdn.pixabay.com/photo/2021/11/18/13/26/ramen-6806423_960_720.jpg,Sausage|https://cdn.pixabay.com/photo/2014/12/04/11/55/sausage-556491__340.jpg,Tomato|https://cdn.pixabay.com/photo/2011/03/16/16/01/tomatoes-5356__340.jpg',
'https://img.wongnai.com/p/1920x0/2018/06/03/a4d569965f15488b89bc3cae6732a4d1.jpg',
'https://img.wongnai.com/p/1920x0/2018/06/03/a4d569965f15488b89bc3cae6732a4d1.jpg',
  'Main Courses'
),
('10','Drunken thai spaghetti',  'สปาเกตตี้ผัดขี้เมา', 'Thai spaghetti', 'The fiery Thai stir-fry that packs a punch', 
 'Pad Kee Mao Gai is a spicy and flavorful Thai stir-fry that is sure to satisfy your taste buds.
 This dish is made with tender chicken, wide rice noodles, and a mix of vegetables and aromatic herbs, such as bell peppers, onions, garlic, and Thai basil leaves. The stir-fry is cooked with a spicy chili paste sauce, which gives the dish its signature kick.
 the combination of textures and flavors make this dish a popular choice among Thai food enthusiasts.',
45,
  'Thai, Spicy, pasta',
'Pasta|https://cdn.pixabay.com/photo/2016/06/17/19/09/pasta-1463917__340.jpg,Chicken|https://cdn.pixabay.com/photo/2018/03/09/17/41/chicken-3212144__340.jpg,Chili|https://cdn.pixabay.com/photo/2020/08/22/04/57/cooking-5507511__340.jpg',
'https://cdn.pixabay.com/photo/2019/01/01/19/12/spaghetti-3907295_960_720.jpg',
'https://cdn.pixabay.com/photo/2022/05/03/09/51/spaghetti-7171375__340.jpg',
  'Main Courses'
),
('11','Sudacha special', 'อาหารลับ อาม่าสุดดาชา', 'Sudacha Curry', 'The mysterious curry of Sudacha', 
 'Sudacha special is a curry fill with secret ingredient that can not be found any where in the world
  As you take your first bite of this mysterious curry, your taste buds are immediately hit with a burst of flavor that is both familiar and exotic. The curry is rich and fragrant, with a complex blend of spices that you can not quite put your finger on.
  The sauce is thick and creamy, coating the tender pieces of meat in a luxurious blanket of flavor. The meat itself is tender and succulent, falling apart at the slightest touch of your fork. As you chew, the spices continue to reveal themselves, each bite offering a slightly different combination of flavors.',
  599,
  'Thai, curry, Spicy, soup',
  '',
'https://cdn.pixabay.com/photo/2022/06/07/20/52/curry-7249247__340.jpg',
'https://cdn.pixabay.com/photo/2022/06/07/20/52/curry-7249247__340.jpg',
  'Main Courses'
)
;
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `is_admin` tinyint NOT NULL DEFAULT '0',
  `fname` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `lname` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'Admin','$2b$10$/f13aj3DuQL.jkBY2vLRveDFfw3M5/PvrpupGVr8jSSeFbx89TaCW',1,'test','admin',NULL,NULL);
UNLOCK TABLES;

-- Dump completed on 2023-04-25 15:59:25

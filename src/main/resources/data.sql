INSERT INTO `socbook1`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `socbook1`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `socbook1`.`user_status`(`type`) VALUES ('STATUS_ACTIVE');
INSERT INTO `socbook1`.`user_status`(`type`) VALUES ('STATUS_INACTIVE');

INSERT INTO `socbook1`.`tag`(`name`) VALUES ('fast');
INSERT INTO `socbook1`.`tag`(`name`) VALUES ('modern');
INSERT INTO `socbook1`.`tag`(`name`) VALUES ('dope');

INSERT INTO `socbook1`.`category`(`name`) VALUES ('Search engine');
INSERT INTO `socbook1`.`category`(`name`) VALUES ('Social network');
INSERT INTO `socbook1`.`category`(`name`) VALUES ('Video-sharing');
 
INSERT INTO `socbook1`.`user`(`username`,`password`,`first_name`,`last_name`,`email`,`status_id`) VALUES ('admin','admin','Milos','Petrovic','admin@socbook1.com', 1);
INSERT INTO `socbook1`.`user`(`username`,`password`,`first_name`,`last_name`,`email`,`status_id`) VALUES ('user1','user1','Pera','Teodorovic','user1@socbook1.com', 1);
INSERT INTO `socbook1`.`user`(`username`,`password`,`first_name`,`last_name`,`email`,`status_id`) VALUES ('user2','user2','Jovan','Stevanovic','user2@socbook1.com', 1);
 
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (1,1);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (1,2);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (2,2);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (3,2);

INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`) VALUES ('Google', 'http://www.google.com', '9999-12-31 23:59:59', 'Google home page', TRUE, FALSE, 1, 1);
INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`) VALUES ('Facebook', 'http://www.facebook.com', '9999-12-31 23:59:59', 'Facebook home page', TRUE, FALSE, 2, 2);
INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`) VALUES ('Instagram', 'http://www.instagram.com', '9999-12-31 23:59:59', 'Instagram home page', TRUE, FALSE, 2, 3);
INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`) VALUES ('YouTube', 'http://www.youtube.com', '9999-12-31 23:59:59', 'YouTube home page', TRUE, FALSE, 3, 1);
INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`) VALUES ('Twitter', 'http://www.twitter.com', '9999-12-31 23:59:59', 'Twitter home page', TRUE, FALSE, 2, 3);

INSERT INTO `socbook1`.`comment`(`content`, `bookmark_id`) VALUES ('Super kewl search engine', 1);
INSERT INTO `socbook1`.`comment`(`content`, `bookmark_id`) VALUES ('Super kewl social network', 2);
INSERT INTO `socbook1`.`comment`(`content`, `bookmark_id`) VALUES ('Super kewl selfie cringe', 3);
INSERT INTO `socbook1`.`comment`(`content`, `bookmark_id`) VALUES ('Super kewl cat videos', 4);
INSERT INTO `socbook1`.`comment`(`content`, `bookmark_id`) VALUES ('Super kewl flame wars', 4);

INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (1,1);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (2,1);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (2,2);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (3,2);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (4,1);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (5,2);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (5,3);
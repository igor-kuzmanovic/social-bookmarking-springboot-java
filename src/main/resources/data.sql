INSERT INTO `socbook1`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `socbook1`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `socbook1`.`user_status`(`type`) VALUES ('STATUS_ACTIVE');
INSERT INTO `socbook1`.`user_status`(`type`) VALUES ('STATUS_INACTIVE');

INSERT INTO `socbook1`.`tag`(`name`) VALUES ('fast');
INSERT INTO `socbook1`.`tag`(`name`) VALUES ('modern');
INSERT INTO `socbook1`.`tag`(`name`) VALUES ('cool');

INSERT INTO `socbook1`.`category`(`name`) VALUES ('Search engine');
INSERT INTO `socbook1`.`category`(`name`) VALUES ('Social network');
INSERT INTO `socbook1`.`category`(`name`) VALUES ('Video-sharing');
INSERT INTO `socbook1`.`category`(`name`) VALUES ('Uncategorized');
 
INSERT INTO `socbook1`.`user`(`username`,`password`,`first_name`,`last_name`,`email`,`status_id`) VALUES ('admin','admin','Milos','Petrovic','admin@socbook1.com', 1);
INSERT INTO `socbook1`.`user`(`username`,`password`,`first_name`,`last_name`,`email`,`status_id`) VALUES ('user1','user1','Pera','Teodorovic','user1@socbook1.com', 1);
INSERT INTO `socbook1`.`user`(`username`,`password`,`first_name`,`last_name`,`email`,`status_id`) VALUES ('user2','user2','Jovan','Stevanovic','user2@socbook1.com', 1);
 
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (1,1);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (1,2);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (2,2);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (3,1);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (3,2);

INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`, `times_rated`, `rating`) VALUES ('Google', 'https://www.google.com', '2012-07-15 23:59:59', 'Google home page', TRUE, FALSE, 1, 1, 0, 0);
INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`, `times_rated`, `rating`) VALUES ('Facebook', 'https://www.facebook.com', '2013-01-12 23:59:59', 'Facebook home page', TRUE, FALSE, 2, 2, 0, 0);
INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`, `times_rated`, `rating`) VALUES ('Instagram', 'https://www.instagram.com', '2015-11-02 23:59:59', 'Instagram home page', TRUE, FALSE, 2, 3, 0, 0);
INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`, `times_rated`, `rating`) VALUES ('YouTube', 'https://www.youtube.com', '2016-12-03 23:59:59', 'YouTube home page', TRUE, FALSE, 3, 1, 0, 0);
INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `is_public`, `imported`, `category_id`, `user_id`, `times_rated`, `rating`) VALUES ('Twitter', 'https://www.twitter.com', '2011-05-29 23:59:59', 'Twitter home page', TRUE, FALSE, 2, 3, 0, 0);

INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (1,1);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (2,1);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (2,2);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (3,2);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (4,1);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (5,2);
INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (5,3);

INSERT INTO `socbook1`.`comment`(`content`,`date`,`user_id`) VALUES ('bookmark is good','2016-12-03 23:59:59',1);
INSERT INTO `socbook1`.`comment`(`content`,`date`,`user_id`) VALUES ('bookmark is better','2016-12-03 23:59:59',1);

INSERT INTO `socbook1`.`bookmark_comments`(`bookmark_id`,`comment_id`) VALUES (1,1);
INSERT INTO `socbook1`.`bookmark_comments`(`bookmark_id`,`comment_id`) VALUES (1,2);
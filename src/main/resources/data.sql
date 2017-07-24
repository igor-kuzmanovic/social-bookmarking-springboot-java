INSERT INTO `socbook1`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `socbook1`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `socbook1`.`user_status`(`type`) VALUES ('STATUS_ACTIVE');
INSERT INTO `socbook1`.`user_status`(`type`) VALUES ('STATUS_INACTIVE');

INSERT INTO `socbook1`.`tag`(`name`) VALUES ('fast');

INSERT INTO `socbook1`.`category`(`name`) VALUES ('search engine');
 
INSERT INTO `socbook1`.`user`(`username`,`password`,`first_name`,`last_name`,`email`,`status_id`) VALUES ('admin','admin','Milos','Petrovic','admin@socbook1.com', 1);
 
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (1,1);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (1,2);

INSERT INTO `socbook1`.`bookmark`(`title`, `url`, `date`, `description`, `visibility`, `category_id`, `user_id`) VALUES ('google', 'google.com', '9999-12-31 23:59:59', 'asdasdasdasd', TRUE, 1, 1);

INSERT INTO `socbook1`.`comment`(`content`, `bookmark_id`) VALUES ('adasdsadasd', 1);

INSERT INTO `socbook1`.`bookmark_tags`(`bookmark_id`,`tag_id`) VALUES (1,1);
INSERT INTO `socbook1`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `socbook1`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `socbook1`.`user_status`(`type`) VALUES ('STATUS_ACTIVE');
INSERT INTO `socbook1`.`user_status`(`type`) VALUES ('STATUS_INACTIVE');
 
INSERT INTO `socbook1`.`user`(`username`,`password`,`first_name`,`last_name`,`email`,`status_id`) VALUES ('admin','admin','Milos','Petrovic','admin@socbook1.com',1);
 
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (1,1);
INSERT INTO `socbook1`.`user_roles`(`user_id`,`role_id`) VALUES (1,2);
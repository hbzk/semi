-- USER DUMMY ============================================================

INSERT IGNORE INTO USER (EMAIL, PASSWORD, GENDER, AGE, JOB, SALARY, SPEND, SCHOLAR, MARRY)

VALUES 
("semil@semil.com", SHA1(1234), 1, 27, 3, 3, 180, 3, 2)

,("java@java.com", SHA1(1234), 1, 24, 3, 5, 500, 3, 2);

 



-- LOG DUMMY ============================================================
INSERT IGNORE INTO LOG (USER_NO, ACTION, START_TIME, END_TIME, DURATION)
VALUES 

 (1, "gamepad", "2014-07-07T07:00:00.332Z", NOW(), 21600)
, (1, "moon", "2014-07-07T13:00:00.011Z", NOW(), 36000)
, (1, "code", "2014-07-07T19:00:31.333Z", NOW(), 3600)





, (2, "code", "2014-07-07T07:00:23.011Z", NOW(), 18000)
, (2, "gamepad", "2014-07-07T13:00:00.332Z", NOW(), 3600)
, (2, "code", "2014-07-07T14:00:23.011Z", NOW(), 10800)
, (2, "book", "2014-07-07T18:00:31.333Z", NOW(), 3600)
, (2, "moon", "2014-07-07T22:32:02.152Z", NOW(), 21600)
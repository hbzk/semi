-- USER DUMMY ============================================================

INSERT IGNORE INTO USER (EMAIL, PASSWORD, GENDER, AGE, JOB, SALARY, SPEND, SCHOLAR, MARRY)

VALUES 
("semil@semil.com", 1234, 1, 27, 3, 3, 180, 3, 2)

,("java@java.com", 1234, 1. 24, 3, 5, 500, 3, 2)

 



-- LOG DUMMY ============================================================
INSERT IGNORE INTO LOG (USER_NO, ACTION, START_TIME, END_TIME, DURATION)
VALUES 

 (12, "gamepad", "2014-07-07T07:00:00.332Z", NOW(), 21600)
, (12, "moon", "2014-07-07T13:00:00.011Z", NOW(), 36000)
, (12, "code", "2014-07-07T19:00:31.333Z", NOW(), 3600)





, (13, "code", "2014-07-07T07:00:23.011Z", NOW(), 18000)
, (13, "gamepad", "2014-07-07T13:00:00.332Z", NOW(), 3600)
, (13, "code", "2014-07-07T14:00:23.011Z", NOW(), 10800)
, (13, "book", "2014-07-07T18:00:31.333Z", NOW(), 3600)
, (13, "moon", "2014-07-07T22:32:02.152Z", NOW(), 21600)
-- 사용자
DROP TABLE IF EXISTS `USER` RESTRICT;

-- 일
DROP TABLE IF EXISTS `ACTION` RESTRICT;

-- 기록
DROP TABLE IF EXISTS `LOG` RESTRICT;

-- 사용자
CREATE TABLE `USER` (
	`USER_NO`  INTEGER      NOT NULL COMMENT '사용자번호', -- 사용자번호
	`EMAIL`    VARCHAR(40)  NULL     COMMENT '이메일', -- 이메일
	`PASSWORD` VARCHAR(255) NULL     COMMENT '암호', -- 암호
	`GENDER`   INTEGER      NULL     COMMENT '성별', -- 성별
	`AGE`      INTEGER      NULL     COMMENT '나이', -- 나이
	`JOB`      VARCHAR(255) NULL     COMMENT '직업', -- 직업
	`SALARY`   INTEGER      NULL     COMMENT '연봉', -- 연봉
	`SPEND`    INTEGER      NULL     COMMENT '지출', -- 지출
	`SCHOLAR`  INTEGER      NULL     COMMENT '학력', -- 학력
	`MARRY`    INTEGER      NULL     COMMENT '결혼여부' -- 결혼여부
)
COMMENT '사용자';

-- 사용자
ALTER TABLE `USER`
	ADD CONSTRAINT `PK_USER` -- 사용자 기본키
		PRIMARY KEY (
			`USER_NO` -- 사용자번호
		);

-- 사용자 유니크 인덱스
CREATE UNIQUE INDEX `UIX_USER`
	ON `USER` ( -- 사용자
		`EMAIL` ASC -- 이메일
	);

ALTER TABLE `USER`
	MODIFY COLUMN `USER_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '사용자번호';

-- 일
CREATE TABLE `ACTION` (
	`ACTION_ID` INTEGER      NOT NULL COMMENT '일번호', -- 일번호
	`TITLE`     VARCHAR(50)  NOT NULL COMMENT '영문이름', -- 영문이름
	`TIMER_VAL` INTEGER      NULL     COMMENT '기본설정시간', -- 기본설정시간
	`ICON_FILE` VARCHAR(255) NULL     COMMENT '아이콘파일위치' -- 아이콘파일위치
)
COMMENT '일';

-- 일
ALTER TABLE `ACTION`
	ADD CONSTRAINT `PK_ACTION` -- 일 기본키
		PRIMARY KEY (
			`ACTION_ID` -- 일번호
		);

-- 일 인덱스
CREATE INDEX `IX_ACTION`
	ON `ACTION`( -- 일
		`TITLE` ASC -- 영문이름
	);

ALTER TABLE `ACTION`
	MODIFY COLUMN `ACTION_ID` INTEGER NOT NULL AUTO_INCREMENT COMMENT '일번호';

-- 기록
CREATE TABLE `LOG` (
	`USER_NO`    INTEGER      NOT NULL COMMENT '사용자번호', -- 사용자번호
	`START_TIME` DATETIME     NOT NULL COMMENT '시작시간', -- 시작시간
	`END_TIME`   DATETIME     NULL     COMMENT '종료시간', -- 종료시간
	`ACTION`     VARCHAR(255) NOT NULL COMMENT '행동', -- 행동
	`DURATION`   INTEGER      NULL     COMMENT '사용시간' -- 사용시간
)
COMMENT '기록';

-- 기록
ALTER TABLE `LOG`
	ADD CONSTRAINT `PK_LOG` -- 기록 기본키
		PRIMARY KEY (
			`USER_NO`,    -- 사용자번호
			`START_TIME`  -- 시작시간
		);

-- 기록
ALTER TABLE `LOG`
	ADD CONSTRAINT `FK_USER_TO_LOG` -- 사용자 -> 기록
		FOREIGN KEY (
			`USER_NO` -- 사용자번호
		)
		REFERENCES `USER` ( -- 사용자
			`USER_NO` -- 사용자번호
		),
	ADD INDEX `FK_USER_TO_LOG` (
		`USER_NO` ASC -- 사용자번호
	);



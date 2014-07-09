-- 페이지
CREATE TABLE PAGES (
	NO  INTEGER      NOT NULL, -- 넘버
	URL VARCHAR(255) NOT NULL  -- 주소
);

-- 페이지 기본키
CREATE UNIQUE INDEX PK_PAGES
	ON PAGES ( -- 페이지
		NO ASC -- 넘버
	);

-- 페이지
ALTER TABLE PAGES
	MODIFY COLUMN NO INTEGER NOT NULL AUTO_INCREMENT,
	ADD
		CONSTRAINT PK_PAGES -- 페이지 기본키
		PRIMARY KEY (
			NO -- 넘버
		);

-- 새 테이블
CREATE TABLE LOG (
	NO    INTEGER      NOT NULL, -- 넘버
	TITLE VARCHAR(255) NOT NULL, -- 제목
	COLOR VARCHAR(255) NOT NULL, -- 색
	VALUE INTEGER      NOT NULL  -- 초
);

-- 새 테이블 기본키
CREATE UNIQUE INDEX PK_LOG
	ON LOG ( -- 새 테이블
		NO ASC -- 넘버
	);

-- 새 테이블
ALTER TABLE LOG
	ADD
		CONSTRAINT PK_LOG -- 새 테이블 기본키
		PRIMARY KEY (
			NO -- 넘버
		);

-- 새 테이블
ALTER TABLE LOG
	ADD
		CONSTRAINT FK_PAGES_TO_LOG -- 페이지 -> 새 테이블
		FOREIGN KEY (
			NO -- 넘버
		)
		REFERENCES PAGES ( -- 페이지
			NO -- 넘버
		);
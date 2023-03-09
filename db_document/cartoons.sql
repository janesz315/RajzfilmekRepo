SELECT *
FROM cartoons;
SELECT *
FROM countries;
SELECT *
FROM creators;
call genStat(20);

select randomDate();
select randomDate2('1983-01-01','1989-10-20');

SELECT FROM_UNIXTIME(
    UNIX_TIMESTAMP('2014-1-1') + FLOOR(
        RAND() * (
            UNIX_TIMESTAMP('2018-12-31') - UNIX_TIMESTAMP('2014-1-1') + 1
        )
    )
)

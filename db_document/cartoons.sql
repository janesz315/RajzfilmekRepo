SELECT *
FROM cartoons;
SELECT *
FROM countries;
SELECT *
FROM creators;
call genStat(20);

select randomDate();
select randomDate2('1983-01-01','1989-10-20');



SELECT co.id, co.name ,cr.id , cr.name FROM countries co
    INNER JOIN creators cr on co.id = cr.id
    order by cr.name, co.name;

SELECT countries.name from countries
  outer join creators
  

SELECT *
FROM cartoons;
SELECT *
FROM countries;
SELECT *
FROM creators;
call genStat(20);

select randomDate();
select randomDate2('1983-01-01','1989-10-20');


#get cartoons
SELECT cartoons.id, cartoons.name,numberOfSeasons,numberOfEpisodes,countries.name countriesId,creators.name creatorsId,runningTime,DATE_FORMAT(AiringStart, '%Y. %m. %d') AiringStart, DATE_FORMAT(AiringEnd, '%Y. %m. %d') AiringEnd FROM cartoons
  INNER JOIN countries on countriesId = countries.id
  INNER JOIN creators on creatorsId = creators.id
;


  ;
#get cartoons/:id
SELECT cartoons.id, cartoons.name,numberOfSeasons,numberOfEpisodes,countries.name countriesName, countries.id countriesId,creators.name creatorsName, creators.id creatorsId, runningTime,DATE_FORMAT(AiringStart, '%Y-%m-%d') AiringStart, DATE_FORMAT(AiringEnd, '%Y-%m-%d') AiringEnd FROM cartoons
    INNER JOIN countries on countriesId = countries.id
    INNER JOIN creators on creatorsId = creators.id
    WHERE cartoons.id = 6
  ;


#countriesAbc
SELECT name, id from countries
  order by name;

#creatorsAbc

SELECT name, id from creators
  order by name;
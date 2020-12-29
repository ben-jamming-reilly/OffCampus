SELECT U.user_name, U.user_id, R.review, R.rating, COUNT(Up.upvoter_user_id) as likes
FROM User U JOIN Review R USING(user_id) 
    LEFT JOIN Upvote Up Using(user_id, zip, city, street)
WHERE R.zip = 99163 AND R.city = "Spokane" AND R.street  = "123 XYZ RD"
GROUP BY R.user_id 
ORDER BY likes DESC;

SELECT U.user_name, U.user_id, R.review, R.rating, COUNT(Up.upvoter_user_id) as likes
FROM User U JOIN Review R USING(user_id) 
    LEFT JOIN Upvote Up Using(user_id, zip, city, street)
WHERE R.zip = 99163 AND R.city = "Spokane" AND R.street  = "123 XYZ RD"
GROUP BY R.user_id 
ORDER BY likes DESC;

SELECT pid, SUM(beds) AS beds, SUM(baths) AS baths, ROUND(acreage * 43560, 0) AS area
FROM ParcelData
    JOIN ParcelFloor USING(pid)
WHERE street = "733 E INDIANA AVE" AND city = "SPOKANE" AND zip = "99207"  
GROUP BY street, city, zip \G

-- Fuzzy parcel search

SELECT *
FROM ParcelData
WHERE zip = "99207"
    AND city = "SPOKANE"
    AND street SOUNDS LIKE "733 E INDIANA AVE"
ORDER BY STRCMP(SOUNDEX(street), SOUNDEX("733 E INDIANA AVE"))
\G
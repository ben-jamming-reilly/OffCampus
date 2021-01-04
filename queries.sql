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
GROUP BY street, city, zip, pid \G

-- Fuzzy parcel search

SELECT *
FROM ParcelData
WHERE zip = "99207"
    AND city = "SPOKANE"
    AND street SOUNDS LIKE "733 E INDIANA AVE"
ORDER BY STRCMP(SOUNDEX(street), SOUNDEX("733 E INDIANA AVE"))
\G



-- asdfasfdsdafa 

SELECT pid, SUM(beds) as beds, SUM(baths) as baths, 43560 * acreage as area
        FROM ParcelData JOIN ParcelFloor USING(pid) 
        WHERE street = ? AND city = ? AND zip = ? 
        GROUP BY street, city, zip; 

INSERT INTO Property 
(street, city, zip, state, type, next_lease_date, beds, baths, area, rent, file_name, pic_link, verified)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); 


INSERT INTO Property (street, city, zip, state, beds, baths, area, pic_link, verified) 
SELECT street, city, zip, 'WA', SUM(beds) as beds, SUM(baths) as baths, 43560 * acreage as area, CONCAT('https://cp.spokanecounty.org/Assessor/ParcelImages/default.aspx?txtSelParcel=', pid) as pic_link, true 
FROM ParcelData JOIN ParcelFloor USING(pid)
WHERE street = ANY(
    SELECT street
    FROM ParcelData PD1
        JOIN ParcelData PD2 using(street, city, zip)
    GROUP BY street, city, zip
    HAVING COUNT(*) = 1
)
GROUP BY street, city, zip, pid; 



SELECT street
FROM Property
WHERE SOUNDEX(street) LIKE CONCAT('%', SUBSTRING(SOUNDEX('733 E INDIANA AVE'), 2), '%')
ORDER BY ABS(CAST(SUBSTRING(street, 1, 4) AS SIGNED) - CAST(SUBSTRING('733 E INDIANA AVE', 1, 4) AS SIGNED))
LIMIT 10, 10
\G
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
insert into cafes (name, description, location) values
  ('Central Café','Downtown hub','Downtown'),
  ('Eastside Eats','Cozy corner','East');

insert into employees (id,name,email_address,phone_number,gender) values
  ('UI0000001','Alice','alice@example.com','91234567','Female'),
  ('UI0000002','Bob','bob@example.com','82345678','Male');

insert into employments (employee_id,cafe_id,start_date) select
  e.id, c.id, now() - interval '10 days'
from employees e join cafes c on c.name='Central Café' where e.id='UI0000001';

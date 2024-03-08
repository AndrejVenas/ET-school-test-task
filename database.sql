create TABLE company(
  c_id SERIAL PRIMARY KEY,
  c_name VARCHAR(255)
);

create TABLE typeMedicine(
  tm_id SERIAL PRIMARY KEY,
  tm_type VARCHAR(255)
);

create TABLE product(
  p_id SERIAL PRIMARY KEY,
  p_name VARCHAR(255),
  p_company INTEGER,
  p_type INTEGER,
  p_price DECIMAL,
  FOREIGN KEY (p_company) REFERENCES company (c_id),
  FOREIGN KEY (p_type) REFERENCES typeMedicine (tm_id)
);

create TABLE ticket(
  t_id SERIAL PRIMARY KEY,
  t_status INTEGER,
  tu_name VARCHAR(100),
  tu_surname VARCHAR(100),
  tu_mail VARCHAR(100),
  tu_phone VARCHAR(10),
  tu_adress VARCHAR(150)
);

create TABLE orders(
  o_id SERIAL PRIMARY KEY,
  o_count INTEGER,
  o_product INTEGER,
  o_ticket INTEGER,
  FOREIGN KEY (o_product) REFERENCES product (p_id),
  FOREIGN KEY (o_ticket) REFERENCES ticket (t_id)
);
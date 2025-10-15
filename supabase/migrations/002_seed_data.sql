/*
  # Seed Data for Food Delivery App

  Populates the database with sample restaurants and menu items.
*/

-- Insert sample restaurants
INSERT INTO restaurants (name, description, image_url, cuisine_type, rating, delivery_time, delivery_fee, min_order, is_open) VALUES
('Pizza Palace', 'Authentic Italian pizza with fresh ingredients', 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400', 'Italian', 4.5, '25-35 min', 2.99, 15, true),
('Burger House', 'Juicy burgers and crispy fries', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', 'American', 4.3, '20-30 min', 1.99, 10, true),
('Sushi Tokyo', 'Fresh sushi and Japanese cuisine', 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400', 'Japanese', 4.7, '30-40 min', 3.99, 20, true),
('Taco Fiesta', 'Authentic Mexican street food', 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400', 'Mexican', 4.4, '15-25 min', 1.49, 12, true),
('Thai Spice', 'Traditional Thai dishes with bold flavors', 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=400', 'Thai', 4.6, '25-35 min', 2.49, 15, true),
('Dragon Wok', 'Chinese cuisine and dim sum', 'https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=400', 'Chinese', 4.2, '30-40 min', 2.99, 18, true),
('Mediterranean Grill', 'Fresh Mediterranean and Greek specialties', 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400', 'Mediterranean', 4.5, '20-30 min', 2.49, 15, true),
('Indian Palace', 'Aromatic Indian curries and tandoori', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', 'Indian', 4.6, '30-40 min', 2.99, 20, true);

-- Insert menu items for Pizza Palace
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Margherita Pizza', 'Classic tomato, mozzarella, and basil', 12.99, 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400', 'Pizza', true),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Pepperoni Pizza', 'Loaded with pepperoni and cheese', 14.99, 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400', 'Pizza', true),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Quattro Formaggi', 'Four cheese blend pizza', 15.99, 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400', 'Pizza', true),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Caesar Salad', 'Fresh romaine with parmesan and croutons', 7.99, 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400', 'Salad', true),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Garlic Bread', 'Toasted bread with garlic butter', 4.99, 'https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg?auto=compress&cs=tinysrgb&w=400', 'Appetizer', true);

-- Insert menu items for Burger House
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Classic Burger', 'Beef patty with lettuce, tomato, and sauce', 9.99, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', 'Burger', true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Cheese Burger', 'Double cheese and beef patty', 11.99, 'https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=400', 'Burger', true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Bacon Burger', 'Crispy bacon and cheddar cheese', 12.99, 'https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&w=400', 'Burger', true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'French Fries', 'Crispy golden fries', 3.99, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', 'Side', true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Onion Rings', 'Crispy battered onion rings', 4.99, 'https://images.pexels.com/photos/209542/pexels-photo-209542.jpeg?auto=compress&cs=tinysrgb&w=400', 'Side', true),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Milkshake', 'Vanilla, chocolate, or strawberry', 5.99, 'https://images.pexels.com/photos/108370/pexels-photo-108370.jpeg?auto=compress&cs=tinysrgb&w=400', 'Drink', true);

-- Insert menu items for Sushi Tokyo
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Sushi Tokyo'), 'California Roll', 'Crab, avocado, and cucumber', 8.99, 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400', 'Roll', true),
((SELECT id FROM restaurants WHERE name = 'Sushi Tokyo'), 'Spicy Tuna Roll', 'Tuna with spicy mayo', 10.99, 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400', 'Roll', true),
((SELECT id FROM restaurants WHERE name = 'Sushi Tokyo'), 'Dragon Roll', 'Eel, avocado, and cucumber', 13.99, 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400', 'Roll', true),
((SELECT id FROM restaurants WHERE name = 'Sushi Tokyo'), 'Salmon Sashimi', 'Fresh salmon slices (8 pieces)', 14.99, 'https://images.pexels.com/photos/3763816/pexels-photo-3763816.jpeg?auto=compress&cs=tinysrgb&w=400', 'Sashimi', true),
((SELECT id FROM restaurants WHERE name = 'Sushi Tokyo'), 'Miso Soup', 'Traditional Japanese soup', 3.99, 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=400', 'Soup', true),
((SELECT id FROM restaurants WHERE name = 'Sushi Tokyo'), 'Edamame', 'Steamed soybeans with sea salt', 4.99, 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=400', 'Appetizer', true);

-- Insert menu items for Taco Fiesta
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Beef Tacos', 'Three tacos with seasoned beef', 8.99, 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400', 'Taco', true),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Chicken Tacos', 'Grilled chicken with salsa', 8.99, 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=400', 'Taco', true),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Fish Tacos', 'Crispy fish with cabbage slaw', 9.99, 'https://images.pexels.com/photos/2610788/pexels-photo-2610788.jpeg?auto=compress&cs=tinysrgb&w=400', 'Taco', true),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Burrito Bowl', 'Rice, beans, meat, and toppings', 11.99, 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=400', 'Bowl', true),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Quesadilla', 'Cheese and chicken quesadilla', 9.99, 'https://images.pexels.com/photos/6941021/pexels-photo-6941021.jpeg?auto=compress&cs=tinysrgb&w=400', 'Main', true),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Nachos', 'Loaded nachos with cheese and toppings', 10.99, 'https://images.pexels.com/photos/7251769/pexels-photo-7251769.jpeg?auto=compress&cs=tinysrgb&w=400', 'Appetizer', true);

-- Insert menu items for Thai Spice
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Thai Spice'), 'Pad Thai', 'Stir-fried noodles with shrimp', 12.99, 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=400', 'Noodles', true),
((SELECT id FROM restaurants WHERE name = 'Thai Spice'), 'Green Curry', 'Spicy coconut curry with chicken', 13.99, 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=400', 'Curry', true),
((SELECT id FROM restaurants WHERE name = 'Thai Spice'), 'Tom Yum Soup', 'Hot and sour Thai soup', 8.99, 'https://images.pexels.com/photos/4518844/pexels-photo-4518844.jpeg?auto=compress&cs=tinysrgb&w=400', 'Soup', true),
((SELECT id FROM restaurants WHERE name = 'Thai Spice'), 'Spring Rolls', 'Fresh vegetables wrapped in rice paper', 6.99, 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400', 'Appetizer', true),
((SELECT id FROM restaurants WHERE name = 'Thai Spice'), 'Mango Sticky Rice', 'Sweet sticky rice with mango', 6.99, 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400', 'Dessert', true);

-- Insert menu items for Dragon Wok
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Dragon Wok'), 'Kung Pao Chicken', 'Spicy chicken with peanuts', 11.99, 'https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=400', 'Main', true),
((SELECT id FROM restaurants WHERE name = 'Dragon Wok'), 'Sweet and Sour Pork', 'Crispy pork in sweet sauce', 12.99, 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400', 'Main', true),
((SELECT id FROM restaurants WHERE name = 'Dragon Wok'), 'Beef Lo Mein', 'Stir-fried noodles with beef', 11.99, 'https://images.pexels.com/photos/4518844/pexels-photo-4518844.jpeg?auto=compress&cs=tinysrgb&w=400', 'Noodles', true),
((SELECT id FROM restaurants WHERE name = 'Dragon Wok'), 'Fried Rice', 'Vegetable fried rice', 8.99, 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400', 'Rice', true),
((SELECT id FROM restaurants WHERE name = 'Dragon Wok'), 'Dumplings', 'Steamed or fried dumplings (6 pieces)', 7.99, 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=400', 'Appetizer', true);

-- Insert menu items for Mediterranean Grill
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Mediterranean Grill'), 'Chicken Shawarma', 'Marinated chicken with tahini sauce', 10.99, 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400', 'Main', true),
((SELECT id FROM restaurants WHERE name = 'Mediterranean Grill'), 'Falafel Wrap', 'Crispy falafel in pita bread', 9.99, 'https://images.pexels.com/photos/6275171/pexels-photo-6275171.jpeg?auto=compress&cs=tinysrgb&w=400', 'Wrap', true),
((SELECT id FROM restaurants WHERE name = 'Mediterranean Grill'), 'Greek Salad', 'Fresh vegetables with feta cheese', 8.99, 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=400', 'Salad', true),
((SELECT id FROM restaurants WHERE name = 'Mediterranean Grill'), 'Hummus Plate', 'Creamy hummus with pita bread', 6.99, 'https://images.pexels.com/photos/5938|/pexels-photo-5938.jpeg?auto=compress&cs=tinysrgb&w=400', 'Appetizer', true),
((SELECT id FROM restaurants WHERE name = 'Mediterranean Grill'), 'Baklava', 'Sweet pastry with nuts and honey', 5.99, 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=400', 'Dessert', true);

-- Insert menu items for Indian Palace
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
((SELECT id FROM restaurants WHERE name = 'Indian Palace'), 'Butter Chicken', 'Creamy tomato curry with chicken', 13.99, 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', 'Curry', true),
((SELECT id FROM restaurants WHERE name = 'Indian Palace'), 'Tikka Masala', 'Spicy curry with paneer or chicken', 13.99, 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=400', 'Curry', true),
((SELECT id FROM restaurants WHERE name = 'Indian Palace'), 'Biryani', 'Fragrant rice with meat and spices', 14.99, 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400', 'Rice', true),
((SELECT id FROM restaurants WHERE name = 'Indian Palace'), 'Naan Bread', 'Soft flatbread (plain or garlic)', 2.99, 'https://images.pexels.com/photos/6275171/pexels-photo-6275171.jpeg?auto=compress&cs=tinysrgb&w=400', 'Bread', true),
((SELECT id FROM restaurants WHERE name = 'Indian Palace'), 'Samosas', 'Crispy pastry with potato filling (3 pieces)', 5.99, 'https://images.pexels.com/photos/14477896/pexels-photo-14477896.jpeg?auto=compress&cs=tinysrgb&w=400', 'Appetizer', true),
((SELECT id FROM restaurants WHERE name = 'Indian Palace'), 'Mango Lassi', 'Sweet mango yogurt drink', 4.99, 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=400', 'Drink', true);

-- ============================================================
-- CHOCOLATES WEB - Datos Iniciales (Seed)
-- ============================================================
-- Solo datos esenciales para el funcionamiento del sistema.
-- El resto de contenido (productos, categorías, tags, posts,
-- eventos, testimonios, etc.) se crea desde el panel admin.
-- ============================================================

-- Roles
INSERT INTO roles (name, description) VALUES
('ROLE_ADMIN', 'Control total del sistema'),
('ROLE_EDITOR', 'Puede crear y editar contenido'),
('ROLE_MARKETING', 'Gestiona productos y campañas');

-- Usuario administrador por defecto
-- Password: Admin123! (BCrypt encoded)
INSERT INTO users (username, email, password, first_name, last_name, enabled) VALUES
('admin', 'admin@chocolates.com', '$2a$10$uex8a1eyjQlYXwpEU2dE7uPbSyy5vGVOkTNnaMUvowEl3gnYSmb8O', 'Administrador', 'Sistema', TRUE);

-- Asignar roles al admin
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), (1, 2), (1, 3);

-- Configuraciones del sitio
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Chocolates Web', 'STRING', 'Nombre del sitio'),
('site_description', 'Los mejores chocolates artesanales, elaborados con pasión y los ingredientes más finos.', 'TEXT', 'Descripción del sitio'),
('site_logo', '/uploads/logo.png', 'STRING', 'URL del logo'),
('site_favicon', '/uploads/favicon.ico', 'STRING', 'URL del favicon'),
('contact_email', 'contacto@chocolates.com', 'STRING', 'Correo de contacto'),
('contact_phone', '+51 999 888 777', 'STRING', 'Teléfono de contacto'),
('contact_address', 'Av. Chocolate 123, Lima, Perú', 'STRING', 'Dirección'),
('map_latitude', '-12.046374', 'STRING', 'Latitud del mapa'),
('map_longitude', '-77.042793', 'STRING', 'Longitud del mapa'),
('primary_color', '#4A0E4E', 'STRING', 'Color primario de la marca'),
('secondary_color', '#D4A017', 'STRING', 'Color secundario de la marca'),
('whatsapp_number', '+51999888777', 'STRING', 'Número de WhatsApp'),
('facebook_url', 'https://facebook.com/chocolates', 'STRING', 'URL de Facebook'),
('instagram_url', 'https://instagram.com/chocolates', 'STRING', 'URL de Instagram'),
('youtube_url', 'https://youtube.com/@chocolates', 'STRING', 'URL de YouTube'),
('tiktok_url', 'https://tiktok.com/@chocolates', 'STRING', 'URL de TikTok'),
('visitor_counter', '0', 'NUMBER', 'Contador de visitantes');

-- Redes sociales
INSERT INTO site_social_links (platform, url, icon, sort_order) VALUES
('Facebook', 'https://facebook.com/chocolates', 'facebook', 1),
('Instagram', 'https://instagram.com/chocolates', 'instagram', 2),
('YouTube', 'https://youtube.com/@chocolates', 'youtube', 3),
('TikTok', 'https://tiktok.com/@chocolates', 'tiktok', 4),
('WhatsApp', 'https://wa.me/51999888777', 'whatsapp', 5);

-- Menú principal
INSERT INTO navigation_menus (name, location) VALUES ('Menú Principal', 'HEADER');
INSERT INTO navigation_menus (name, location) VALUES ('Menú Footer', 'FOOTER');

INSERT INTO navigation_items (menu_id, parent_id, title, url, sort_order) VALUES
(1, NULL, 'Inicio', '/', 1),
(1, NULL, 'Productos', '/productos', 2),
(1, NULL, 'Galería', '/galeria', 3),
(1, NULL, 'Blog', '/blog', 4),
(1, NULL, 'Eventos', '/eventos', 5),
(1, NULL, 'Contacto', '/contacto', 6);

INSERT INTO navigation_items (menu_id, parent_id, title, url, sort_order) VALUES
(2, NULL, 'Inicio', '/', 1),
(2, NULL, 'Productos', '/productos', 2),
(2, NULL, 'Blog', '/blog', 3),
(2, NULL, 'Contacto', '/contacto', 4),
(2, NULL, 'Términos y Condiciones', '/terminos', 5),
(2, NULL, 'Política de Privacidad', '/privacidad', 6);

-- Estadísticas iniciales
INSERT INTO daily_stats (stat_date, total_visits, unique_visitors) VALUES
(CURRENT_DATE, 0, 0);

INSERT INTO monthly_stats (stat_year, stat_month, total_visits, unique_visitors) VALUES
(EXTRACT(YEAR FROM CURRENT_DATE)::INT, EXTRACT(MONTH FROM CURRENT_DATE)::INT, 0, 0);

-- ============================================================
-- CHOCOLATES WEB - Esquema Completo de Base de Datos
-- Motor: PostgreSQL 16
-- ============================================================

-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLAS DE SEGURIDAD Y AUTENTICACION
-- ============================================================

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    enabled BOOLEAN DEFAULT TRUE,
    account_non_locked BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(500) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expiry_date TIMESTAMP NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(500) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expiry_date TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLAS DE CATALOGO DE PRODUCTOS
-- ============================================================

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    parent_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    image_url VARCHAR(500),
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(250) NOT NULL UNIQUE,
    category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    short_description VARCHAR(300),
    full_description TEXT,
    ingredients TEXT,
    nutritional_info JSONB,
    reference_price DECIMAL(10, 2),
    discount_price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'PEN',
    stock INT DEFAULT 0,
    weight_grams DECIMAL(8, 2),
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'DRAFT')),
    likes_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    sales_count INT DEFAULT 0,
    video_url VARCHAR(500),
    meta_title VARCHAR(200),
    meta_description VARCHAR(300),
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE product_tags (
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(200),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    file_size BIGINT,
    mime_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_likes (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    session_id VARCHAR(100),
    ip_address VARCHAR(45),
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_product_like UNIQUE (product_id, COALESCE(user_id, 0), COALESCE(session_id, ''))
);

-- ============================================================
-- TABLAS DE CONTENIDO (BLOG, NOTICIAS, EVENTOS)
-- ============================================================

CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) NOT NULL UNIQUE,
    summary TEXT,
    content TEXT,
    post_type VARCHAR(20) DEFAULT 'BLOG' CHECK (post_type IN ('BLOG', 'NEWS', 'STORY')),
    featured_image VARCHAR(500),
    video_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED')),
    scheduled_at TIMESTAMP,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    author_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

CREATE TABLE post_comments (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(100),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) NOT NULL UNIQUE,
    event_type VARCHAR(30) DEFAULT 'FAIR' CHECK (event_type IN ('FAIR', 'TASTING', 'LAUNCH', 'WORKSHOP', 'OTHER')),
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    location VARCHAR(300),
    address TEXT,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    featured_image VARCHAR(500),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'CANCELLED', 'FINISHED')),
    views_count INT DEFAULT 0,
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_gallery (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(200),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_registrations (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(200),
    additional_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLAS DE BANNERS Y CARRUSELES
-- ============================================================

CREATE TABLE banners (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    banner_type VARCHAR(30) DEFAULT 'PRINCIPAL' CHECK (banner_type IN ('PRINCIPAL', 'PROMOTION', 'CAMPAIGN')),
    image_url VARCHAR(500) NOT NULL,
    mobile_image_url VARCHAR(500),
    video_url VARCHAR(500),
    title VARCHAR(200),
    subtitle VARCHAR(300),
    description TEXT,
    link_url VARCHAR(500),
    link_text VARCHAR(100),
    sort_order INT DEFAULT 0,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carousels (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(50) DEFAULT 'HOME' CHECK (location IN ('HOME', 'PRODUCTS', 'GALLERY', 'ABOUT')),
    auto_play BOOLEAN DEFAULT TRUE,
    interval_ms INT DEFAULT 5000,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carousel_items (
    id BIGSERIAL PRIMARY KEY,
    carousel_id BIGINT NOT NULL REFERENCES carousels(id) ON DELETE CASCADE,
    title VARCHAR(200),
    subtitle VARCHAR(300),
    description TEXT,
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    link_url VARCHAR(500),
    link_text VARCHAR(100),
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLAS DE MENSAJES DE CONTACTO
-- ============================================================

CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(300),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'READ', 'REPLIED', 'CLOSED')),
    assigned_to BIGINT REFERENCES users(id) ON DELETE SET NULL,
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE message_replies (
    id BIGSERIAL PRIMARY KEY,
    message_id BIGINT NOT NULL REFERENCES contact_messages(id) ON DELETE CASCADE,
    reply TEXT NOT NULL,
    replied_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLAS DE MEDIA / GALERIA MULTIMEDIA
-- ============================================================

CREATE TABLE media_folders (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    parent_id BIGINT REFERENCES media_folders(id) ON DELETE CASCADE,
    path VARCHAR(500),
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE media (
    id BIGSERIAL PRIMARY KEY,
    folder_id BIGINT REFERENCES media_folders(id) ON DELETE SET NULL,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    media_type VARCHAR(20) CHECK (media_type IN ('IMAGE', 'VIDEO', 'PDF', 'DOCUMENT', 'OTHER')),
    mime_type VARCHAR(100),
    file_size BIGINT,
    width INT,
    height INT,
    alt_text VARCHAR(200),
    title VARCHAR(200),
    description TEXT,
    storage_type VARCHAR(20) DEFAULT 'LOCAL' CHECK (storage_type IN ('LOCAL', 'MINIO', 'YOUTUBE', 'EXTERNAL')),
    external_id VARCHAR(200),
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery_albums (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    cover_image_url VARCHAR(500),
    album_type VARCHAR(20) DEFAULT 'GALLERY' CHECK (album_type IN ('GALLERY', 'PROMOTIONAL', 'EVENT', 'PRODUCT')),
    active BOOLEAN DEFAULT TRUE,
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery_media (
    album_id BIGINT NOT NULL REFERENCES gallery_albums(id) ON DELETE CASCADE,
    media_id BIGINT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    sort_order INT DEFAULT 0,
    PRIMARY KEY (album_id, media_id)
);

-- ============================================================
-- TABLAS DE TESTIMONIOS
-- ============================================================

CREATE TABLE testimonials (
    id BIGSERIAL PRIMARY KEY,
    client_name VARCHAR(200) NOT NULL,
    client_title VARCHAR(200),
    client_company VARCHAR(200),
    client_photo VARCHAR(500),
    content TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLAS DE ANALITICA Y METRICAS
-- ============================================================

CREATE TABLE page_visits (
    id BIGSERIAL PRIMARY KEY,
    page_url VARCHAR(500) NOT NULL,
    page_type VARCHAR(50),
    reference_id BIGINT,
    session_id VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_type VARCHAR(50),
    browser VARCHAR(100),
    browser_version VARCHAR(50),
    os VARCHAR(100),
    country VARCHAR(100),
    city VARCHAR(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    referrer_url VARCHAR(500),
    visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE daily_stats (
    id BIGSERIAL PRIMARY KEY,
    stat_date DATE NOT NULL,
    total_visits INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    products_viewed INT DEFAULT 0,
    posts_viewed INT DEFAULT 0,
    likes_received INT DEFAULT 0,
    messages_received INT DEFAULT 0,
    new_users INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_stat_date UNIQUE (stat_date)
);

CREATE TABLE monthly_stats (
    id BIGSERIAL PRIMARY KEY,
    stat_year INT NOT NULL,
    stat_month INT NOT NULL,
    total_visits INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    products_viewed INT DEFAULT 0,
    posts_viewed INT DEFAULT 0,
    likes_received INT DEFAULT 0,
    messages_received INT DEFAULT 0,
    new_users INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_year_month UNIQUE (stat_year, stat_month)
);

-- ============================================================
-- TABLAS DE CONFIGURACION Y SITIO
-- ============================================================

CREATE TABLE site_settings (
    id BIGSERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'STRING' CHECK (setting_type IN ('STRING', 'NUMBER', 'BOOLEAN', 'JSON', 'TEXT')),
    description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE site_social_links (
    id BIGSERIAL PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL,
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE navigation_menus (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE navigation_items (
    id BIGSERIAL PRIMARY KEY,
    menu_id BIGINT NOT NULL REFERENCES navigation_menus(id) ON DELETE CASCADE,
    parent_id BIGINT REFERENCES navigation_items(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(500),
    target VARCHAR(10) DEFAULT '_self',
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLA DE AUDITORIA / HISTORIAL DE CAMBIOS
-- ============================================================

CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(100) NOT NULL,
    entity_id BIGINT NOT NULL,
    action VARCHAR(50) NOT NULL,
    changes JSONB,
    performed_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_versions (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    title VARCHAR(300),
    content TEXT,
    summary TEXT,
    change_notes TEXT,
    version_number INT NOT NULL,
    saved_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- INDICES PARA OPTIMIZACION
-- ============================================================

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_code ON products(code);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_created ON products(created_at DESC);
CREATE INDEX idx_products_views ON products(views_count DESC);
CREATE INDEX idx_products_likes ON products(likes_count DESC);

CREATE INDEX idx_product_images_primary ON product_images(product_id, is_primary);

CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_type ON posts(post_type);
CREATE INDEX idx_posts_published ON posts(published_at DESC) WHERE status = 'PUBLISHED';
CREATE INDEX idx_posts_author ON posts(author_id);

CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(start_date);
CREATE INDEX idx_events_type ON events(event_type);

CREATE INDEX idx_banners_active ON banners(active) WHERE active = TRUE;
CREATE INDEX idx_banners_type ON banners(banner_type);
CREATE INDEX idx_banners_dates ON banners(start_date, end_date);

CREATE INDEX idx_page_visits_date ON page_visits(visit_time DESC);
CREATE INDEX idx_page_visits_page ON page_visits(page_url);
CREATE INDEX idx_page_visits_session ON page_visits(session_id);
CREATE INDEX idx_page_visits_reference ON page_visits(reference_id, page_type);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);

CREATE INDEX idx_media_type ON media(media_type);
CREATE INDEX idx_media_folder ON media(folder_id);

CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_date ON audit_log(created_at DESC);

-- Full-text search con PostgreSQL (GIN index sobre tsvector)
CREATE INDEX idx_products_search ON products
  USING GIN(to_tsvector('spanish', coalesce(name, '') || ' ' || coalesce(short_description, '') || ' ' || coalesce(full_description, '')));

CREATE INDEX idx_posts_search ON posts
  USING GIN(to_tsvector('spanish', coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content, '')));
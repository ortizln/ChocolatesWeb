-- ============================================================
-- CHOCOLATES WEB - Actualizar passwords de usuarios
-- ============================================================
-- Todos los usuarios usan la contraseña: Admin123!
-- Hash BCrypt generado para Admin123!:
-- $2a$10$uex8a1eyjQlYXwpEU2dE7uPbSyy5vGVOkTNnaMUvowEl3gnYSmb8O
-- ============================================================

UPDATE users
SET password = '$2a$10$uex8a1eyjQlYXwpEU2dE7uPbSyy5vGVOkTNnaMUvowEl3gnYSmb8O'
WHERE username IN ('admin', 'editor1', 'marketing1');

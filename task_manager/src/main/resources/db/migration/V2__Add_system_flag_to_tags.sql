ALTER TABLE tag
ADD COLUMN is_system BOOLEAN DEFAULT FALSE;

ALTER TABLE category
ADD COLUMN is_system BOOLEAN DEFAULT FALSE;

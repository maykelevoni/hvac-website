-- Add password reset fields to admins table
ALTER TABLE admins
ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP WITH TIME ZONE;

-- Add index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_admins_reset_token ON admins(reset_token) WHERE reset_token IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN admins.reset_token IS 'Secure token for password reset, expires after use';
COMMENT ON COLUMN admins.reset_token_expires IS 'Expiration timestamp for reset token (typically 1 hour from creation)';

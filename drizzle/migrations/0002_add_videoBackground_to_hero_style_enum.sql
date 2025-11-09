-- Migration: Add 'videoBackground' to hero_style enum if it doesn't exist
-- This fixes the Hero Section save error when trying to use videoBackground style

DO $$
BEGIN
    -- Check if videoBackground value already exists in the enum
    IF NOT EXISTS (
        SELECT 1
        FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'hero_style'
        AND e.enumlabel = 'videoBackground'
    ) THEN
        -- Add videoBackground to the enum
        ALTER TYPE hero_style ADD VALUE 'videoBackground';
        RAISE NOTICE 'Added videoBackground to hero_style enum';
    ELSE
        RAISE NOTICE 'videoBackground already exists in hero_style enum';
    END IF;
END$$;

/*
  # Create complaints table for CitySolve application

  1. New Tables
    - `complaints`
      - `id` (text, primary key) - Unique complaint identifier
      - `name` (text) - Reporter's full name
      - `email` (text) - Reporter's email address
      - `phone` (text, optional) - Reporter's phone number
      - `ward` (text, optional) - Ward/area information
      - `type` (text) - Type of complaint (Pothole, Garbage, etc.)
      - `description` (text) - Detailed description of the issue
      - `priority` (text) - Priority level (Low, Medium, High)
      - `location_lat` (decimal) - Latitude coordinate
      - `location_lng` (decimal) - Longitude coordinate
      - `location_address` (text) - Human-readable address
      - `image_url` (text, optional) - URL to uploaded image
      - `status` (text) - Current status (pending, in_progress, resolved, rejected)
      - `date_reported` (text) - Date when complaint was reported
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `complaints` table
    - Add policies for public read access and authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS complaints (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  ward text,
  type text NOT NULL,
  description text NOT NULL,
  priority text NOT NULL DEFAULT 'Low',
  location_lat decimal NOT NULL,
  location_lng decimal NOT NULL,
  location_address text NOT NULL,
  image_url text,
  status text NOT NULL DEFAULT 'pending',
  date_reported text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Policy for public read access (anyone can view complaints)
CREATE POLICY "Anyone can view complaints"
  ON complaints
  FOR SELECT
  TO public
  USING (true);

-- Policy for public insert (anyone can submit complaints)
CREATE POLICY "Anyone can submit complaints"
  ON complaints
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for authenticated users to update complaints (admin functionality)
CREATE POLICY "Authenticated users can update complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_type ON complaints(type);
CREATE INDEX IF NOT EXISTS idx_complaints_priority ON complaints(priority);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_ward ON complaints(ward);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON complaints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
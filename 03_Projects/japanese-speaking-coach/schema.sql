-- schema.sql - Cloudflare D1 Database Schema for JN60101 Speaking Coach
-- Tables: users, user_configs, exam_history

-- 1. Users Table (Google OAuth & PIM Identity)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  picture TEXT,
  is_pim_student INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Configs Table (Exam Profile & Preferences)
CREATE TABLE IF NOT EXISTS user_configs (
  user_id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  hobby_name TEXT NOT NULL,
  show_romaji INTEGER DEFAULT 1,
  show_thai_hints INTEGER DEFAULT 1,
  speech_rate REAL DEFAULT 0.9,
  enable_sfx INTEGER DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Exam History Table (Scores & AI Feedback Log)
CREATE TABLE IF NOT EXISTS exam_history (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  total_score INTEGER NOT NULL,
  part1_score INTEGER NOT NULL,
  part2_score INTEGER NOT NULL,
  part3_score INTEGER NOT NULL,
  feedback_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for fast query
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_exam_history_user ON exam_history(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_history_created ON exam_history(created_at DESC);
